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

import LoadingButton from "../../widgets/LoadingButton";
import LightTooltip from "../../widgets/LightTooltip";
import ProgressBar from "@ramonak/react-progress-bar";

const StakingBurn = () => {
  const { t } = useTranslation();
  const { address } = useAccount();
  const [sbxAmount, setSBXAmount] = useState<string>("");
  const [sUSDAmount, setSUSDAmount] = useState<string>("");
  const [gasPrice, setGasPrice] = useState<string>("");
  const [burnLoading, setBurnLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { writeContractAsync } = useWriteContract();
  const publicClient = usePublicClient();
  const BNBPrice = BNBToUSDTPrice();

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

  const { data } = useReadContracts({
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
        functionName: "balanceOf",
        args: [address],
      },
      {
        ...StakingContract,
        functionName: "getStakerCRatio",
        args: [address],
      },
      {
        ...StakingContract,
        functionName: "getGlobalCRatio",
      },
    ],
  });

  const sbxPrice = data
    ? Number.parseFloat(formatEther(data?.[1].result as bigint) ?? 0n)
    : 0;

  const formattedSUSDAmount = data
    ? Number.parseFloat(formatEther(data?.[2].result as bigint) ?? 0n)
    : 0;

  const stakedSBXAmount = data
    ? Number.parseFloat(formatEther(data?.[3].result as bigint) ?? 0n)
    : 0;

  const stakerCRatio = data
    ? Number.parseFloat(formatEther(data?.[4].result as bigint) ?? 0n)
    : 0;

  const globalCRatio = data
    ? Number.parseFloat(formatEther(data?.[5].result as bigint) ?? 0n)
    : 0;

  console.log("StakerCRatio", data, globalCRatio / stakerCRatio);

  const currentCRatio = globalCRatio / stakerCRatio;

  const BurnHandler = async () => {
    try {
      setBurnLoading(true);

      // biome-ignore lint/suspicious/noImplicitAnyLet: <explanation>
      let hash;

      let allowance = (await publicClient?.readContract({
        ...sUSDContract,
        functionName: "allowance",
        args: [address, StakingCA],
      })) as bigint;

      if (allowance < parseEther(sUSDAmount.toString())) {
        hash = await writeContractAsync({
          ...sUSDContract,
          functionName: "approve",
          args: [StakingCA, parseEther(sUSDAmount.toString())],
        });
        // biome-ignore lint/style/noNonNullAssertion: <explanation>
        await publicClient?.waitForTransactionReceipt({ hash: hash! });
      }

      allowance = (await publicClient?.readContract({
        ...sUSDContract,
        functionName: "allowance",
        args: [address, StakingCA],
      })) as bigint;

      if (allowance >= parseEther(sbxAmount.toString())) {
        hash = await writeContractAsync({
          ...StakingContract,
          functionName: "unstake",
          args: [parseEther(sUSDAmount.toString())],
        });

        // biome-ignore lint/style/noNonNullAssertion: <explanation>
        await publicClient?.waitForTransactionReceipt({ hash: hash! });
      } else {
        setError("Insufficient allowance");
      }
    } catch (error) {
      setError("An error occurred during the migration process");
      console.error(error);
    } finally {
      setBurnLoading(false);
    }
  };

  const sbxAmountHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSBXAmount(e.target.value); // Use Math.floor if you want to round down, or Math.round for rounding to the nearest whole number
  };

  const sUSDAmountHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSUSDAmount(e.target.value); // Use Math.floor if you want to round down, or Math.round for rounding to the nearest whole number
  };

  const setBurnMaxHandler = () => {
    setSBXAmount(stakedSBXAmount.toString()); // Use Math.floor if you want to round down, or Math.round for rounding to the nearest whole number
  };

  const setBurnTargetHandler = () => {
    setSBXAmount(stakedSBXAmount.toString()); // Use Math.floor if you want to round down, or Math.round for rounding to the nearest whole numberSBXAmount(sta.toString()); // Use Math.floor if you want to round down, or Math.round for rounding to the nearest whole number
  };

  const getEstimateGas = async () => {
    const data = encodeFunctionData({
      ...SBXContract,
      functionName: "approve",
      args: [StakingCA, parseEther(sbxAmount.toString())],
    });
    const estimatedApproveGas = await publicClient!.estimateGas({
      data,
      account: address,
      to: SBXContract.address,
    });

    const gasPrice = await publicClient!.getGasPrice();

    setGasPrice(formatEther(estimatedApproveGas * gasPrice));
  };

  const getBurnableAmount = async (amount: string) => {
    if (amount) {
      let data = await publicClient?.readContract({
        ...StakingContract,
        functionName: "getBurningAmount",
        args: [amount, address],
      });

      console.log("Burnable Amount:", data);
      return data;
    }
  };

  useEffect(() => {
    if (
      sbxAmount === "0" ||
      sbxAmount === undefined ||
      sbxAmount === null ||
      sbxAmount === ""
    ) {
      setSUSDAmount("");
    } else {
      getBurnableAmount(sbxAmount).then((data) => {
        if (data) {
          const burnableAmount = Number.parseFloat(
            formatEther((data as bigint) ?? 0n)
          );
          setSUSDAmount(burnableAmount.toString());
        }
      });
    }
  }, [sbxAmount]);

  useEffect(() => {
    if (address) {
      getEstimateGas();
    }
  }, [address]);

  const isDisabled = !(sbxAmount && sUSDAmount);

  return (
    <>
      <div className="relative pt-12 lg:pb-[112px] pb-8 sm: w-full min-h-screen font-Barlow px-5 md:px-10 lg:px-5">
        <div className="max-w-[1276px] mx-auto w-full flex flex-col gap-[30px] items-center">
          <div className="flex flex-col gap-4 items-center">
            <p className="lg:text-[24px] md:text-[22px] text-[20px] leading-[1em] font-medium text-white">
              {t("stakingBurn.title")}
            </p>
            <span className="max-w-[695px] text-center lg:text-[16px] text-[14px] font-normal leading-[1.1em] inline-block text-secondaryText">
              {t("stakingBurn.description")}
            </span>
          </div>
          <div className="flex flex-col lg:gap-6 gap-4 max-w-[1024px] w-full items-center">
            <div className="flex flex-col w-full">
              <div
                className="px-6 sm:px-5 py-4 w-full flex flex-row bg-[#17283B] rounded-t-[14px] border-b border-[#293745]"
                id="burn-header"
              >
                <div className="flex flex-col gap-2 flex-[1_0_0] items-start">
                  <span className="flex flex-row gap-1 items-center">
                    <span className="text-secondaryText lg:text-[14px] text-[12px] font-semibold leading-[1em]">
                      {t("stakingBurn.burn")}
                    </span>
                    <LightTooltip
                      title={t("stakingBurn.burnTooltip")}
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
                  <span className="lg:text-[16px] text-[12px] font-medium leading-[1em] text-white hidden tiny:flex">
                    {t("stakingBurn.burnSUSDOrStakedSBX")}
                  </span>
                </div>
                <div className="flex flex-col gap-2 flex-[1_0_0] items-end">
                  <div className="flex flex-row gap-2 flex-[1_0_0] items-center">
                    <span className="flex flex-row gap-1 items-center">
                      <span className="text-secondaryText lg:text-[14px] text-[12px] font-semibold leading-[1em]">
                        {t("stakingBurn.sbxPrice")}
                      </span>
                    </span>
                    <span className="lg:text-[16px] text-[14px] font-medium leading-[1em] text-[#2DFF8C]">
                      ${sbxPrice}
                    </span>
                  </div>
                  <div className="flex flex-row gap-2 flex-[1_0_0] items-center">
                    <span className="flex flex-row gap-1 items-center">
                      <span className="text-secondaryText lg:text-[14px] text-[12px] font-semibold leading-[1em]">
                        {t("stakingBurn.sUSDPrice")}
                      </span>
                    </span>
                    <span className="lg:text-[16px] text-[14px] font-medium leading-[1em] text-[#2DFF8C]">
                      ${1.000112}
                    </span>
                  </div>
                </div>
              </div>
              <div
                className="sm:px-6 sm:py-8 px-4 py-5 flex flex-col gap-6 w-full rounded-b-[14px] border border-[#293745] border-t-0 bg-[#0a1a2a]"
                id="burn-body"
              >
                <div className="w-full md:flex flex-row hidden justify-between">
                  <div className="lg:w-[58%] w-full flex flex-col py-5 px-4 rounded-[4px] border border-primaryBoxColor bg-black gap-8">
                    <div className="w-full flex flex-row justify-between items-center">
                      <div className="flex flex-row gap-1 items-center">
                        <span className="text-[#63636E] sm:text-[10px] text-[12px] font-normal leading-[1em]">
                          {t("stakingBurn.current")} &lt; 160%
                        </span>
                        <LightTooltip
                          title={t("stakingBurn.minHealthState")}
                          arrow
                          placement="bottom-start"
                        >
                          <span className="w-[12px] h-[12px]">
                            <img
                              src="/assets/Icon/question-mark.svg"
                              alt="question-mark"
                              className="mt-[1px]"
                            />
                          </span>
                        </LightTooltip>
                      </div>
                      <div className="flex flex-row gap-1 items-center">
                        <span className="text-[#63636E] sm:text-[10px] text-[12px] font-normal leading-[1em]">
                          {t("stakingBurn.target")} 4000%
                        </span>
                        <LightTooltip
                          title={t("stakingBurn.maxHealthState")}
                          arrow
                          placement="bottom-start"
                        >
                          <span className="w-[12px] h-[12px]">
                            <img
                              src="/assets/Icon/question-mark.svg"
                              alt="question-mark"
                              className="mt-[1px]"
                            />
                          </span>
                        </LightTooltip>
                      </div>
                    </div>
                    <div className="" id="RatioBar">
                      <ProgressBar
                        completed={currentCRatio}
                        className="wrapper"
                        barContainerClassName="container"
                        labelClassName="label"
                        maxCompleted={4000}
                      />
                    </div>
                    {/* <div className="relative w-full h-3 bg-[#ffffff0f]">
                      <div className="absolute w-[1px] h-10 bg-[#303037] left-5 bottom-[-15px]" />
                      <div className="absolute w-[1px] h-10 bg-[#303037] right-10 bottom-[-15px]" />
                    </div> */}
                  </div>
                  <div className="lg:w-[40%] flex flex-col w-full rounded-[4px] border border-primaryBoxColor bg-black">
                    <div className="flex flex-row justify-between items-center pt-3 px-4 pb-4">
                      <div className="flex flex-row gap-1 items-center">
                        <span className="text-white lg:text-[16px] text-[14px] font-semibold leading-[1em]">
                          {t("stakingBurn.currentHealth")}
                        </span>
                        <LightTooltip
                          title={t("stakingBurn.currentCRatio")}
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
                      {currentCRatio ? (
                        <div className="text-white">{currentCRatio}%</div>
                      ) : (
                        <div className="w-12 h-5 rounded-sm anim-colorExchange" />
                      )}
                    </div>
                    <div className="w-full opacity-60 bg-[#303037] h-[1px]" />
                    <div className="flex flex-row justify-between items-center pt-2 px-4 pb-10">
                      <div className="flex flex-row gap-1 items-center">
                        <span className="text-white lg:text-[14px] text-[14px] font-semibold leading-[1em]">
                          {t("stakingBurn.targetHealth")}
                        </span>
                        <LightTooltip
                          title={t("stakingBurn.targetHealth")}
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
                      <span className="lg:text-[20px] text-[16px] text-[#2DFF8C] font-medium leading-[1em]">
                        4,000%
                      </span>
                    </div>
                  </div>
                </div>
                <div className="gap-3 flex flex-col w-full">
                  <div className="flex flex-row gap-1 items-center">
                    <span className="text-white lg:text-[14px] text-[14px] font-normal leading-[1em]">
                      {t("stakingBurn.burnSUSD")}
                    </span>
                    <LightTooltip
                      title={t("stakingBurn.burnInputExplanation")}
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
                      value={sUSDAmount || ""}
                      onChange={sUSDAmountHandler}
                      className="relative bg-primaryBoxColor py-[13px] pl-4 w-full rounded-lg text-white border border-[transparent] focus:outline-none focus:border-primaryButtonColor focus:shadow-primary hidden-scrollbar text-[14px] sm:text-[16px]"
                      placeholder="Enter Amount"
                    />
                    <div className="flex flex-col gap-1 absolute pr-4">
                      <div className="text-white text-[14px] leading-[1em] font-bold text-right">
                        sUSD
                      </div>
                      <div className="text-secondaryText text-[12px] leading-[1em] font-normal text-right">
                        sUSD {t("stakingBurn.balance")}:&nbsp;
                        {formattedSUSDAmount}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-row lg:gap-3 sm:gap-2 gap-1 items-center w-full">
                    <button
                      type="button"
                      onClick={setBurnMaxHandler}
                      className="w-1/2 rounded-[18px] justify-center border border-[#33485E] items-center flex py-[18px] text-[#C3E6FF] font-bold sm:text-[14px] text-[12px] leading-[1em] hover:bg-[rgba(255,255,255,0.08)] focus:border-[#EE2D82] focus:shadow-primary h-8 px-4 sm:px-8 md:px-6"
                    >
                      {t("stakingBurn.burnMax")}
                    </button>
                    <button
                      type="button"
                      onClick={setBurnTargetHandler}
                      className="w-1/2 rounded-[18px] justify-center border border-[#33485E] items-center flex py-[18px] text-[#C3E6FF] font-bold sm:text-[14px] text-[12px] leading-[1em] hover:bg-[rgba(255,255,255,0.08)] focus:border-[#EE2D82] focus:shadow-primary h-8 px-4 sm:px-8 md:px-6"
                    >
                      {t("stakingBurn.burnToTarget")}
                    </button>
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  <span className="flex flex-row gap-1 items-center">
                    <span className="text-white sm:text-[16px] text-[14px] font-normal leading-[1em]">
                      {t("stakingBurn.unstaking")}
                    </span>
                    <LightTooltip
                      title={t("stakingBurn.stakeInputExplanation")}
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
                      type="number"
                      value={sbxAmount}
                      onChange={sbxAmountHandler}
                      className="relative bg-primaryBoxColor py-[13px] pl-4 w-full rounded-lg text-white border border-[transparent] focus:outline-none focus:border-primaryButtonColor focus:shadow-primary text-[14px] sm:text-[16px]"
                      placeholder="Enter Amount"
                    />
                    <div className="flex flex-col gap-1 absolute pr-4">
                      <div className="text-white text-[14px] leading-[1em] font-bold text-right">
                        SBX
                      </div>
                      <div className="text-secondaryText text-[12px] leading-[1em] font-normal text-right">
                        {t("stakingBurn.staked")} SBX : {stakedSBXAmount}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-row w-full justify-between items-center">
                  <span className="text-white text-[16px] font-normal leading-[1em]">
                    {t("stakingBurn.gasPrice")}
                  </span>
                  <div className="">
                    <span className="text-white text-[16px] font-normal leading-[1em] flex items-center justify-center">
                      {gasPrice}
                      &nbsp;BNB :&nbsp;
                      {BNBPrice !== null &&
                        Number.parseFloat(
                          (Number(gasPrice) * BNBPrice).toString()
                        ).toFixed(4)}
                      &nbsp;$
                    </span>
                  </div>
                </div>
                <div className="flex justify-center">
                  {burnLoading ? (
                    <LoadingButton bgColor="#EE2D82" />
                  ) : (
                    <>
                      <button
                        type="button"
                        disabled={isDisabled}
                        onClick={BurnHandler}
                        className={`rounded-[60px] bg-primaryButtonColor w-full sm:w-80 h-10 justify-center text-white text-[16px] font-bold leading-[1em] ${
                          isDisabled
                            ? "opacity-50 hover:cursor-not-allowed"
                            : "opacity-100 hover:scale-[1.02] hover:cursor-pointer active:scale-[0.95]"
                        }`}
                      >
                        {t("stakingBurn.burn")}
                      </button>
                      {error && (
                        <div className="text-primaryButtonColor">{error}</div>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="w-full flex lg:flex-row flex-col">
              <Link
                to="/guide/staking"
                className="sm:p-5 p-4 border border-[#293745] lg:w-1/2 w-full lg:border-r-0 border-r lg:rounded-l-xl rounded-l-none rounded-tr-xl lg:rounded-tr-none rounded-tl-xl bg-[#0a1a2a] flex flex-col gap-2 hover:bg-[rgba(255,255,255,0.08)]"
              >
                <span className="text-white text-[16px] sm:font-bold font-semibold leading-[1em]">
                  {t("stakingBurn.stakingGuide")}
                </span>
                <span className="text-secondaryText leading-[1em] text-[14px] font-normal">
                  {t("stakingBurn.guideDescription")}
                </span>
              </Link>
              {/* <Link
                to="/staking/self-liquidation"
                className="sm:p-5 p-4 border border-[#293745] lg:w-1/2 w-full rounded-tr-none border-t-0 lg:border-t bg-[#0a1a2a] flex flex-col gap-2 hover:bg-[rgba(255,255,255,0.08)]"
              >
                <span className="text-white text-[16px] sm:font-bold font-semibold leading-[1em]">
                  {t("stakingBurn.hedgeDebt")}
                </span>
                <span className="text-secondaryText leading-[1em] text-[14px] font-normal">
                  {t("stakingBurn.hedgeDebtDescription")}
                </span>
              </Link> */}
              <Link
                to="/staking/self-liquidation"
                className="sm:p-5 p-4 border border-[#293745] lg:w-1/2 w-full rounded-r-xl lg:rounded-tr-xl rounded-tr-none border-t-0 lg:border-t rounded-bl-xl lg:rounded-bl-none bg-[#0a1a2a] flex flex-col gap-2 hover:bg-[rgba(255,255,255,0.08)]"
              >
                <span className="text-white text-[16px] sm:font-bold font-semibold leading-[1em]">
                  {t("stakingBurn.selfLiquidate")}
                </span>
                <span className="text-secondaryText leading-[1em] text-[14px] font-normal">
                  {t("stakingBurn.selfLiquidateDescription")}
                </span>
              </Link>
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
    </>
  );
};

export default StakingBurn;
