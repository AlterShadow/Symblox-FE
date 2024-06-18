import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import {
  useAccount,
  useConnect,
  usePublicClient,
  useReadContracts,
  useWriteContract,
} from "wagmi";
import { encodeFunctionData, formatEther, parseEther } from "viem";
import {
  MigrationCA,
  StakingCA,
  SymbloxTokenCA,
  SYXCA,
} from "../../../config/params/contractAddresses";
import {
  SBXContractABI,
  PriceOracleABI,
  ERC20ABI,
  MigrationABI,
} from "../../../config/abis";
import { onlyNumberRegex } from "../../../utils/formatters/inputNumFormatter";
import { useTranslation } from "react-i18next";
import { BNBToUSDTPrice } from "../../../hooks/BNBToUSDTPrice";

import LightTooltip from "../../widgets/LightTooltip";
import LoadingButton from "../../widgets/LoadingButton";
import { bscTestnet } from "viem/chains";
import { injected } from "wagmi/connectors";
import { watch } from "fs";
import formatterDecimal from "../../../utils/formatters/formatterDecimal";

const Migration = () => {
  const { t } = useTranslation();
  const { address } = useAccount();
  const { connectAsync } = useConnect();
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>

  const [sbxAmount, setSBXAmount] = useState<string>("");
  const [syxAmount, setSYXAmount] = useState<string>("");
  const [gasPrice, setGasPrice] = useState<string>("");
  const [migrateLoading, setMigrateLoading] = useState<boolean>(false);
  const [releaseLoading, setReleaseLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { writeContractAsync } = useWriteContract();
  const BNBPrice = BNBToUSDTPrice();
  const publicClient = usePublicClient();

  const SYXContract = {
    address: SYXCA,
    abi: ERC20ABI,
  } as const;

  const MigrationContract = {
    address: MigrationCA,
    abi: MigrationABI,
  } as const;

  const SBXContract = {
    address: SymbloxTokenCA,
    abi: SBXContractABI,
  } as const;

  const PriceOracleContract = {
    address: "0xd8BEFC60fd1F1b799357791f5ff7814679f264F1",
    abi: PriceOracleABI,
  } as const;

  const { data, refetch: readRefetch } = useReadContracts({
    contracts: [
      {
        ...SYXContract,
        functionName: "balanceOf",
        args: [address],
      },
      {
        ...SBXContract,
        functionName: "balanceOf",
        args: [address],
      },
      {
        ...MigrationContract,
        functionName: "owner",
      },
      {
        ...MigrationContract,
        functionName: "lockedAmount",
        args: [address],
      },
      {
        ...MigrationContract,
        functionName: "getClaimableAmount",
        args: [address],
      },
      {
        ...PriceOracleContract,
        functionName: "getTokenPrice",
        args: [0x91a14891bc882561aabefc1e2b1626c13b38f37c],
      },
    ],
  });

  const formattedSYXAmount = (data?.[0].result as bigint) ?? 0n;

  const formattedSBXAmount = (data?.[1].result as bigint) ?? 0n;

  const migrationOwner = data ? data?.[2].result : "";

  const lockedBalance = (data?.[3].result as bigint) ?? 0n;

  const claimableAmount = (data?.[4].result as bigint) ?? 0n;

  const setSYXAmountHandler = (percent: number) => {
    const newSYXAmount =
      (Number(formatEther(formattedSYXAmount)) * percent) / 100;
    setSYXAmount(newSYXAmount.toString());

    const newSBXAmount =
      address === migrationOwner ? newSYXAmount : (newSYXAmount * 20) / 100;
    setSBXAmount(newSBXAmount.toString());
  };

  const handleSYXAmountChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    if (onlyNumberRegex.test(value)) {
      setSYXAmount(value);
      if (address === migrationOwner) setSBXAmount(value);
      else {
        setSBXAmount(((Number(value) * 20) / 100).toString());
      }
    }
  };

  const MigrateHandler = async () => {
    try {
      setMigrateLoading(true);

      // biome-ignore lint/suspicious/noImplicitAnyLet: <explanation>
      let hash;

      let allowance = (await publicClient?.readContract({
        ...SYXContract,
        functionName: "allowance",
        args: [address, MigrationCA],
      })) as bigint;

      if (allowance < parseEther(syxAmount.toString())) {
        hash = await writeContractAsync({
          ...SYXContract,
          functionName: "approve",
          args: [MigrationCA, parseEther(syxAmount.toString())],
        });
        // biome-ignore lint/style/noNonNullAssertion: <explanation>
        await publicClient?.waitForTransactionReceipt({ hash: hash! });
      }

      allowance = (await publicClient?.readContract({
        ...SYXContract,
        functionName: "allowance",
        args: [address, MigrationCA],
      })) as bigint;

      if (allowance >= parseEther(syxAmount.toString())) {
        hash = await writeContractAsync({
          ...MigrationContract,
          functionName: "migrate",
          args: [parseEther(syxAmount.toString())],
        });

        // biome-ignore lint/style/noNonNullAssertion: <explanation>
        await publicClient?.waitForTransactionReceipt({ hash: hash! });
        await readRefetch();
      } else {
        setError("Insufficient allowance");
      }
    } catch (error) {
      setError((error as any)?.shortMessage);
      console.error(error);
    } finally {
      setMigrateLoading(false);
    }
  };

  const getEstimateGas = async () => {
    const data = encodeFunctionData({
      ...SBXContract,
      functionName: "approve",
      args: [StakingCA, parseEther(sbxAmount.toString())],
    });
    const estimatedGas = await publicClient!.estimateGas({
      data,
      account: address,
      to: SBXContract.address,
    });
    const gasPrice = await publicClient!.getGasPrice();
    setGasPrice(formatEther(estimatedGas * gasPrice));
  };

  const ReleaseHandler = async () => {
    try {
      setReleaseLoading(true);
      await writeContractAsync({
        ...MigrationContract,
        functionName: "claim",
      });
    } catch (error) {
      setError("An error occured during the release process");
      console.error(error);
    } finally {
      setReleaseLoading(false);
    }
  };

  const isDisabled = syxAmount === "" || Number(syxAmount) === 0;
  const releaseButtonState: boolean = claimableAmount === 0n;

  const ConnectHandler = async () => {
    await connectAsync({ chainId: bscTestnet.id, connector: injected() });
  };

  useEffect(() => {
    if (address) {
      getEstimateGas();
    } else {
      ConnectHandler();
    }
  }, [address]);

  return (
    <>
      <div className="pt-[88px] lg:pb-[112px] pb-8 sm:w-full font-Barlow px-5 md:px-10 lg:px-5">
        <div className="max-w-[1276px] mx-auto w-full flex flex-col gap-[48px] items-center relative">
          <Link
            to="/staking"
            className="absolute top-2 left-5 flex flex-row gap-2 items-center mt-5 sm:mt-0"
          >
            <Icon
              icon="iconamoon:arrow-left-1"
              className="text-white w-4 h-4"
            />
            <span className="text-[14px] leading-[1em] font-medium text-white">
              {t("migration.backwards")}
            </span>
          </Link>
          <div className="flex flex-col gap-4 items-center pt-[50px]">
            <p className="lg:text-[24px] md:text-[22px] text-[20px] leading-[1em] font-medium text-white">
              {t("migration.migrateSYX")}
            </p>
            <span className="max-w-[695px] text-center lg:text-[16px] text-[14px] font-normal leading-[1.1em] inline-block text-secondaryText">
              {t("migration.migrateContent")}&nbsp;
              <span className="text-white">{t("migration.migrateGuide")}</span>
            </span>
          </div>
          <div className="flex flex-col lg:gap-6 gap-4 max-w-[1024px] w-full items-center">
            <div className="flex flex-col w-full">
              <div
                className="px-6 sm:px-5 py-4 w-full flex flex-row bg-[#17283B] rounded-t-[14px] border-b border-[#293745]"
                id="mint-header"
              >
                <div className="flex flex-col gap-2 flex-[1_0_0] items-start">
                  <span className="flex flex-row gap-1 items-center">
                    <span className="text-secondaryText lg:text-[14px] text-[12px] font-semibold leading-[1em]">
                      {t("migration.claimableAmount")}
                    </span>
                    <LightTooltip
                      title={t("migration.claimableAmountTooltip")}
                      arrow
                      placement="right"
                    >
                      <span className="w-[14px] h-[14px]">
                        <img
                          src="/assets/Icon/question-mark.svg"
                          alt="question-mark"
                        />
                      </span>
                    </LightTooltip>
                  </span>
                  <span className="lg:text-[16px] text-[14px] font-medium leading-[1em] text-white">
                    {formatterDecimal(formatEther(claimableAmount))}
                  </span>
                </div>
              </div>
              <div
                className="sm:px-6 sm:py-8 px-4 py-5 flex flex-col gap-6 w-full rounded-b-[14px] border border-[#293745] border-t-0 bg-[#0a1a2a]"
                id="mint-body"
              >
                <div className="gap-3 flex flex-col w-full">
                  <div className="flex flex-row gap-1 items-center">
                    <span className="text-white lg:text-[16px] text-[14px] font-normal leading-[1em]">
                      {t("migration.migrationHeader")}
                    </span>
                    <LightTooltip
                      title={t("migration.migrationHeaderTooltip")}
                      arrow
                      placement="bottom-start"
                    >
                      <img
                        src="/assets/Icon/question-mark.svg"
                        className="mt-[2px]"
                        alt="question-mark"
                      />
                    </LightTooltip>
                  </div>
                  <div className="flex flex-row gap-3 items-center justify-end">
                    <input
                      type="number"
                      value={syxAmount}
                      onChange={handleSYXAmountChange}
                      className="relative bg-primaryBoxColor py-[13px] pl-4 w-full rounded-lg text-white border border-[transparent] focus:outline-none focus:border-primaryButtonColor focus:shadow-primary hidden-scrollbar text-[14px] sm:text-[16px]"
                      placeholder={sbxAmount ? "" : t("migration.placeholder")}
                    />
                    <div className="flex flex-col gap-1 absolute pr-4">
                      <div className="text-white text-[14px] leading-[1em] font-bold text-right">
                        SYX
                      </div>
                      <div className="text-secondaryText text-[12px] leading-[1em] font-normal text-right">
                        {t("migration.availableSYX")} :&nbsp;
                        {formatterDecimal(formatEther(formattedSYXAmount))}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-row lg:gap-3 sm:gap-2 gap-1 items-center w-full">
                    {[25, 50, 75, 100].map((percentage) => (
                      <button
                        type="button"
                        key={percentage}
                        onClick={() => setSYXAmountHandler(percentage)}
                        className="w-1/4 rounded-[60px] justify-center border border-[#33485E] items-center flex py-[18px] text-[#C3E6FF] font-bold sm:text-[14px] text-[12px] leading-[1em] hover:bg-[rgba(255,255,255,0.08)] focus:border-[#EE2D82] focus:shadow-primary h-8 px-4 sm:px-8 md:px-6"
                      >
                        {percentage}%
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  <span className="flex flex-row gap-1 items-center">
                    <span className="text-white sm:text-[16px] text-[14px] font-normal leading-[1em]">
                      {t("migration.sbxAmountGet")}
                    </span>
                    <LightTooltip
                      title={t("migration.sbxAmountTooltip")}
                      arrow
                      placement="bottom-start"
                    >
                      <span className="w-[14px] h-[14px]">
                        <img
                          src="/assets/Icon/question-mark.svg"
                          alt="question-mark"
                          className="mt-[1px]"
                        />
                      </span>
                    </LightTooltip>
                  </span>
                  <div className="flex flex-row gap-3 items-center justify-end">
                    <input
                      readOnly
                      type="number"
                      value={sbxAmount}
                      className="relative bg-primaryBoxColor py-[13px] pl-4 w-full rounded-lg text-white border border-[transparent] focus:outline-none focus:border-primaryButtonColor focus:shadow-primary text-[14px] sm:text-[16px]"
                      placeholder="0"
                    />
                    <div className="flex flex-col gap-1 absolute pr-4">
                      <div className="flex flex-row gap-1 justify-end">
                        <div className="text-[#7f93a2] text-[12px] lg:text-[14px] leading-[1em] font-normal text-right">
                          {formatterDecimal(formatEther(formattedSBXAmount))}
                        </div>
                        <div className="text-white text-[14px] leading-[1em] font-bold text-right">
                          SBX
                        </div>
                      </div>
                      <div className="text-secondaryText text-[12px] leading-[1em] font-normal text-right">
                        {t("migration.lockedSBX")} :&nbsp;
                        {formatterDecimal(formatEther(lockedBalance))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-row w-full justify-between items-center">
                  <span className="text-white text-[16px] font-normal leading-[1em]">
                    {t("migration.gasPrice")}
                  </span>
                  <div className="">
                    <span className="text-white text-[16px] font-normal leading-[1em] flex items-center justify-center">
                      {formatterDecimal(gasPrice)}
                      &nbsp;BNB :&nbsp;
                      {BNBPrice &&
                        formatterDecimal(
                          (Number(gasPrice) * BNBPrice).toString()
                        )}
                      &nbsp;$
                    </span>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row justify-evenly items-center gap-5">
                  {migrateLoading ? (
                    <LoadingButton bgColor="#EE2D82" />
                  ) : (
                    <>
                      <button
                        type="button"
                        disabled={isDisabled}
                        onClick={MigrateHandler}
                        className={`rounded-[60px] bg-primaryButtonColor w-36 sm:w-80 h-10 justify-center text-white text-[16px] font-bold leading-[1em] transition-all duration-300 ease-in-out ${
                          isDisabled
                            ? "opacity-50 hover:cursor-not-allowed"
                            : "opacity-100 hover:scale-[1.02] hover:cursor-pointer active:scale-[0.95]"
                        }`}
                      >
                        {t("migration.migrate")}
                      </button>
                      {error && (
                        <div className="text-primaryButtonColor">{error}</div>
                      )}
                    </>
                  )}

                  {releaseLoading ? (
                    <LoadingButton bgColor="#4C80C2" />
                  ) : (
                    <div className="flex flex-col gap-3">
                      <button
                        type="button"
                        disabled={releaseButtonState}
                        onClick={ReleaseHandler}
                        className={`rounded-[60px] bg-[#4C80C2] w-36 sm:w-80 h-10 justify-center text-white text-[16px] font-bold leading-[1em] transition-all duration-300 ease-in-out ${
                          releaseButtonState
                            ? "opacity-50 hover:cursor-not-allowed"
                            : "opacity-100 hover:scale-[1.02] hover:cursor-pointer active:scale-[0.95]"
                        }`}
                      >
                        {t("migration.claim")}
                      </button>
                      {error && (
                        <div className="text-primaryButtonColor flex flex-row justify-center items-center">
                          {error}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Migration;
