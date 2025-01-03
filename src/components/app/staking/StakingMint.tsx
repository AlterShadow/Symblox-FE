import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import {
  useAccount,
  usePublicClient,
  useReadContracts,
  useWriteContract,
} from "wagmi";
import { encodeFunctionData, formatEther, parseEther } from "viem";
import {
  PriceOracleCA,
  StakingCA,
  SymbloxTokenCA,
  xUSDCA,
} from "../../../config/params/contractAddresses";
import {
  sUSDABI,
  StakingABI,
  PriceOracleABI,
  SBXContractABI,
} from "../../../config/abis";
import { useTranslation } from "react-i18next";
import { BNBToUSDTPrice } from "../../../hooks/BNBToUSDTPrice";

import LightTooltip from "../../widgets/LightTooltip";
import LoadingButton from "../../widgets/LoadingButton";
import formatterDecimal from "../../../utils/formatters/formatterDecimal";
import { timeFormatter } from "../../../utils/formatters/timeFormatter";

const StakingMint = () => {
  const { t } = useTranslation();
  const { address } = useAccount();
  const [sbxAmount, setSBXAmount] = useState("");
  const [sUSDAmount, setSUSDAmount] = useState<string>("");
  const [stakingLoading, setStakingLoading] = useState<boolean>(false);
  const [gasPrice, setGasPrice] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const { writeContractAsync } = useWriteContract();
  const BNBPrice = BNBToUSDTPrice();
  const publicClient = usePublicClient();

  const StakingContract = {
    address: StakingCA,
    abi: StakingABI,
  } as const;

  const SBXContract = {
    address: SymbloxTokenCA,
    abi: SBXContractABI,
  } as const;

  const PriceOracleContract = {
    address: PriceOracleCA,
    abi: PriceOracleABI,
  } as const;

  const sUSDContract = {
    address: xUSDCA,
    abi: sUSDABI,
  } as const;

  const { data, refetch: readRefetch } = useReadContracts({
    contracts: [
      {
        ...SBXContract,
        functionName: "balanceOf",
        args: [address],
      },
      {
        ...PriceOracleContract,
        functionName: "getUnderlyingPrice",
        args: [SymbloxTokenCA],
      },
      {
        ...sUSDContract,
        functionName: "balanceOf",
        args: [address],
      },
      {
        ...StakingContract,
        functionName: "periodFinish",
      },
    ],
  });

  const formattedSBXAmount = (data?.[0].result as bigint) ?? 0n;

  const sbxPrice = (data?.[1].result as bigint) ?? 0n;

  const formattedSUSDAmount = (data?.[2].result as bigint) ?? 0n;

  const periodFinish = Number(data?.[3].result as bigint) ?? 0n;

  const remainingTime =
    periodFinish * 1000 >= Date.now() ? periodFinish * 1000 - Date.now() : 0;

  const setSBXAmountHandler = (percent: number) => {
    const newAmount = (formattedSBXAmount * BigInt(percent)) / 100n;
    setSBXAmount(formatEther(newAmount));
  };

  const sbxAmountHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSBXAmount(e.target.value); // Use Math.floor if you want to round down, or Math.round for rounding to the nearest whole number
  };

  const sUSDAmountHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSUSDAmount(e.target.value); // Use Math.floor if you want to round down, or Math.round for rounding to the nearest whole number
  };

  const MintHandler = async () => {
    try {
      setStakingLoading(true);

      // biome-ignore lint/suspicious/noImplicitAnyLet: <explanation>
      let hash;

      let allowance = (await publicClient?.readContract({
        ...SBXContract,
        functionName: "allowance",
        args: [address, StakingCA],
      })) as bigint;

      if (allowance < parseEther(sbxAmount.toString())) {
        hash = await writeContractAsync({
          ...SBXContract,
          functionName: "approve",
          args: [StakingCA, parseEther(sbxAmount.toString())],
        });
        // biome-ignore lint/style/noNonNullAssertion: <explanation>
        await publicClient?.waitForTransactionReceipt({ hash: hash! });
      }

      allowance = (await publicClient?.readContract({
        ...SBXContract,
        functionName: "allowance",
        args: [address, StakingCA],
      })) as bigint;

      if (allowance >= parseEther(sbxAmount.toString())) {
        hash = await writeContractAsync({
          ...StakingContract,
          functionName: "stake",
          args: [parseEther(sbxAmount.toString())],
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
      setStakingLoading(false);
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

  const getBorrowableAmount = async (amount: string): Promise<bigint> => {
    if (!amount) return 0n;

    const data = await publicClient?.readContract({
      ...StakingContract,
      functionName: "getBorrowableAmount",
      args: [parseEther(amount)],
    });

    return (data as bigint) ?? 0n;
  };

  useEffect(() => {
    if (address) {
      getEstimateGas();
    }
  }, [address]);

  useEffect(() => {
    if (!sbxAmount) {
      setSUSDAmount("");
    } else {
      getBorrowableAmount(sbxAmount).then((borrowableAmount) => {
        setSUSDAmount(Number(formatEther(borrowableAmount)).toString());
      });
    }
  }, [sbxAmount]);

  const isDisabled = sbxAmount === "" || Number(sbxAmount) === 0;

  return (
    <div id="staking-mint">
      <div className="relative pt-12 lg:pb-[112px] pb-8 sm: w-full min-h-screen font-Barlow px-5 md:px-10 lg:px-5">
        <div className="max-w-[1276px] mx-auto w-full flex flex-col gap-[30px] items-center">
          <div className="flex flex-col gap-4 items-center">
            <p className="lg:text-[24px] md:text-[22px] text-[20px] leading-[1em] font-medium text-white">
              {t("stakingMint.stakeSBX")}
            </p>
            <span className="max-w-[695px] text-center lg:text-[16px] text-[14px] font-normal leading-[1.1em] inline-block text-secondaryText">
              {t("stakingMint.mintSUSD")}&nbsp;
              <span className="text-white">
                {t("stakingMint.yourStakedSBX")}
              </span>
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
                      {t("stakingMint.epoch")}
                    </span>
                    <LightTooltip
                      title={t("stakingMint.timeToNextEpoch")}
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
                    {timeFormatter(remainingTime)}
                  </span>
                </div>
                <div className="flex flex-col gap-2 flex-[1_0_0] items-end">
                  <span className="flex flex-row gap-1 items-center">
                    <span className="text-secondaryText lg:text-[14px] text-[12px] font-semibold leading-[1em]">
                      {t("stakingMint.sbxPrice")}
                    </span>
                  </span>
                  <span className="lg:text-[16px] text-[14px] font-medium leading-[1em] text-[#2DFF8C]">
                    $
                    {formatterDecimal(Number(formatEther(sbxPrice)).toString())}
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
                      {t("stakingMint.howMuchSBX")}
                    </span>
                    <LightTooltip
                      title={t("stakingMint.howMuchSBXYouStake")}
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
                      type="text"
                      value={formatterDecimal(sbxAmount)}
                      onChange={sbxAmountHandler}
                      className="relative bg-primaryBoxColor py-[16px] pl-4 w-full rounded-lg text-white border border-[transparent] focus:outline-none focus:border-primaryButtonColor focus:shadow-primary hidden-scrollbar text-[14px] sm:text-[16px]"
                      placeholder="Enter Amount"
                    />
                    <div className="flex flex-col gap-[6px] absolute pr-4">
                      <div className="text-white text-[14px] leading-[1em] font-bold text-right">
                        SBX
                      </div>
                      <div className="text-secondaryText text-[12px] leading-[1em] font-normal text-right mt-[1px]">
                        {t("stakingMint.unstaked")} SBX :{" "}
                        {formatterDecimal(
                          formatEther(formattedSBXAmount).toString()
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-row lg:gap-3 sm:gap-2 gap-1 items-center w-full">
                    {[25, 50, 75, 100].map((percentage) => (
                      <button
                        type="button"
                        key={percentage}
                        onClick={() => setSBXAmountHandler(percentage)}
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
                      {t("stakingMint.borrowing")}
                    </span>
                    <LightTooltip
                      title={t("stakingMint.howMuchSBXYouStake")}
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
                      type="text"
                      value={formatterDecimal(sUSDAmount)}
                      onChange={sUSDAmountHandler}
                      className="relative bg-primaryBoxColor py-4 pl-4 w-full rounded-lg text-white border border-[transparent] focus:outline-none focus:border-primaryButtonColor focus:shadow-primary text-[14px] sm:text-[16px]"
                      placeholder="0"
                    />
                    <div className="flex flex-col gap-1 absolute pr-4">
                      <div className="text-white text-[14px] leading-[1em] font-bold text-right">
                        sUSD
                      </div>
                      <div className="text-secondaryText text-[12px] leading-[1em] font-normal text-right">
                        sUSD {t("stakingMint.balance")} :&nbsp;
                        {formatterDecimal(formatEther(formattedSUSDAmount))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-row w-full justify-between items-center">
                  <span className="text-white text-[16px] font-normal leading-[1em]">
                    {t("stakingMint.gasPrice")}
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
                <div className="flex justify-center">
                  {stakingLoading ? (
                    <LoadingButton bgColor="#EE2D82" />
                  ) : (
                    <div className="flex flex-col gap-3">
                      <button
                        type="button"
                        disabled={isDisabled}
                        onClick={MintHandler}
                        className={`rounded-[60px] bg-primaryButtonColor w-36 sm:w-80 h-10 justify-center text-white text-[16px] font-bold leading-[1em] transition-all duration-300 ease-in-out ${
                          isDisabled
                            ? "opacity-50 hover:cursor-not-allowed"
                            : "opacity-100 hover:scale-[1.02] hover:cursor-pointer active:scale-[0.95]"
                        }`}
                      >
                        {t("stakingMint.mint")}
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
            <div className="w-full flex lg:flex-row flex-col">
              <Link
                to="/guide/staking"
                className="sm:p-5 p-4 border border-[#293745] lg:w-full w-full border-r rounded-xl bg-[#0a1a2a] flex flex-col gap-2 hover:bg-[rgba(255,255,255,0.08)]"
              >
                <span className="text-white text-[16px] sm:font-bold font-semibold leading-[1em]">
                  {t("stakingMint.stakingGuide")}
                </span>
                <span className="text-secondaryText leading-[1em] text-[14px] font-normal">
                  {t("stakingMint.guideYour")}
                </span>
              </Link>
              {/* <Link
                to="/guide/debt"
                className="sm:p-5 p-4 border border-[#293745] lg:w-1/2 w-full rounded-r-xl lg:rounded-tr-xl rounded-tr-none border-t-0 lg:border-t rounded-bl-xl lg:rounded-bl-none bg-[#0a1a2a] flex flex-col gap-2 hover:bg-[rgba(255,255,255,0.08)]"
              >
                <span className="text-white text-[16px] sm:font-bold font-semibold leading-[1em]">
                  {t("stakingMint.hedgeDebt")}
                </span>
                <span className="text-secondaryText leading-[1em] text-[14px] font-normal">
                  {t("stakingMint.buydSBX")}
                </span>
              </Link> */}
            </div>
          </div>
        </div>
        <Link
          to="/staking"
          className="absolute top-0 left-5 lg:left-8 flex flex-row gap-2 items-center mt-5 sm:mt-0"
        >
          <Icon icon="iconamoon:arrow-left-1" className="text-white w-4 h-4" />
          <span className="text-[14px] leading-[1em] font-medium text-white">
            {t("common.back")}
          </span>
        </Link>
      </div>
    </div>
  );
};

export default StakingMint;
