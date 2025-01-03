import { useState } from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import {
  useAccount,
  usePublicClient,
  useReadContracts,
  useWalletClient,
  useWriteContract,
} from "wagmi";
import { formatEther } from "viem";
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
import { LinearProgress, type LinearProgressProps } from "@mui/material";
import { useTranslation } from "react-i18next";
import { timeFormatter } from "../../../utils/formatters/timeFormatter";
import { isDisabled } from "@testing-library/user-event/dist/utils";
import LoadingButton from "../../widgets/LoadingButton";
import ClaimLoadingButton from "../../widgets/ClaimLoadingButton";
import ProgressBar from "@ramonak/react-progress-bar";
import formatterDecimal from "../../../utils/formatters/formatterDecimal";

interface ProgressBarProps extends LinearProgressProps {
  totalTimeStamp: number;
  currentTimeStamp: number;
}
const RewardProgressBar: React.FC<ProgressBarProps> = ({
  totalTimeStamp,
  currentTimeStamp,
  ...linearProgressProps
}) => {
  const progress = (currentTimeStamp / totalTimeStamp) * 100;

  return (
    <LinearProgress
      variant="determinate"
      value={progress}
      {...linearProgressProps}
    />
  );
};

const RewardItem = () => {
  const { t } = useTranslation();
  const { address } = useAccount();
  const { writeContractAsync } = useWriteContract();
  const [claimLoading, setClaimLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const publicClient = usePublicClient();

  const StakingContract = {
    address: StakingCA,
    abi: StakingABI,
  } as const;

  const { data } = useReadContracts({
    contracts: [
      {
        ...StakingContract,
        functionName: "stakeInfos",
        args: [address],
      },
      {
        ...StakingContract,
        functionName: "LOCK_TIME",
      },
    ],
  });

  const StakerInfo = (data?.[0].result as any) ?? {};

  const lock_time = (data?.[1].result as bigint) ?? 0n;

  const stakerLastTime = (StakerInfo?.[4] as bigint) ?? 0n;

  const claimableReward = (StakerInfo?.[1] as bigint) ?? 0n;

  const remainingTime =
    Number(stakerLastTime + lock_time) * 1000 >= Date.now()
      ? Number(stakerLastTime + lock_time) * 1000 - Date.now()
      : 0;

  const ClaimHandler = async () => {
    try {
      setClaimLoading(true);

      let hash;

      hash = await writeContractAsync({
        ...StakingContract,
        functionName: "claimReward",
      });

      // biome-ignore lint/style/noNonNullAssertion: <explanation>
      await publicClient?.waitForTransactionReceipt({ hash: hash! });
    } catch (error) {
      setError((error as any)?.shortMessage);
    } finally {
      setClaimLoading(false);
    }
  };

  const isDisabled = remainingTime > 0;

  return (
    <>
      <div className="w-full flex flex-row pb-2 md1:pb-0 justify-between items-center">
        <div className="flex flex-row gap-2 mx-auto tiny:mx-0">
          <div>
            <div className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full mr-4 bg-gradient-to-b from-pink-500 to-cyan-500">
              <div className="w-[38px] h-[38px] bg-[white] rounded-full items-center justify-center flex">
                <img className="w-8 h-8" src="/favicon.svg" alt="logo" />
              </div>
            </div>
          </div>
          <div className="flex flex-row">
            <div className="min-w-[120px] mr-4 flex flex-col justify-center">
              <span className=" text-white text-[14px] sm:font-bold font-semibold leading-[1em]">
                Symblox
              </span>
              <span className="mt-1 text-secondaryText leading-[1em] text-[13px] font-medium">
                {t("stakingReward.stakingRewards")}
              </span>
            </div>
            <div className="min-w-20 flex flex-col justify-center">
              <span className=" text-white text-[14px] sm:font-bold font-semibold leading-[1em]">
                0.08%
              </span>
              <span className="mt-1 text-secondaryText leading-[1em] text-[13px] font-medium">
                {t("stakingReward.estimateAPR")}
              </span>
            </div>
          </div>
        </div>

        <div className="hidden tiny:flex flex-col mx-5 justify-center">
          <RewardProgressBar currentTimeStamp={100} totalTimeStamp={1000} />
          <div className="flex flex-row justify-between items-center mt-[10px] gap-2">
            <span className="text-secondaryText leading-[1em] text-[14px] font-bold">
              {t("stakingReward.timeRemaining")}
            </span>
            <span className="text-[#47FAC2] font-bold leading-[1.2em] text-[0.75rem]">
              {timeFormatter(remainingTime)}
            </span>
          </div>
        </div>
        <div className="hidden sm:flex flex-row justify-between items-center">
          {claimLoading ? (
            <ClaimLoadingButton bgColor="#EE2D82" />
          ) : (
            <button
              type="button"
              disabled={isDisabled}
              onClick={ClaimHandler}
              className={`min-w-20 h-10 ml-4 text-white bg-primaryButtonColor rounded-[4px] font-bold ${
                isDisabled
                  ? "opacity-50 hover:cursor-not-allowed"
                  : "opacity-90 hover:cursor-pointer hover:opacity-100 active:opacity-100"
              }`}
            >
              {t("stakingReward.claim")}
            </button>
          )}
        </div>
      </div>
      <div className="tiny:hidden flex flex-col mx-5 justify-center">
        <RewardProgressBar currentTimeStamp={100} totalTimeStamp={1000} />
        <div className="flex flex-row justify-evenly items-center mt-[10px] gap-2">
          <span className="text-secondaryText leading-[1em] text-[14px] font-bold">
            {t("stakingReward.timeRemaining")}
          </span>
          <span className="text-[#47FAC2] font-bold leading-[1.2em] text-[0.75rem]">
            {timeFormatter(remainingTime)}
          </span>
        </div>
      </div>
      <div className="sm:hidden flex mx-auto">
        {claimLoading ? (
          <ClaimLoadingButton bgColor="#EE2D82" />
        ) : (
          <button
            type="button"
            disabled={isDisabled}
            onClick={ClaimHandler}
            className={`min-w-[120px] h-8 ml-4 text-white bg-primaryButtonColor rounded-[4px] font-medium ${
              isDisabled
                ? "opacity-50 hover:cursor-not-allowed"
                : "opacity-90 hover:cursor-pointer hover:opacity-100 active:opacity-100"
            }`}
          >
            {t("stakingReward.claim")}
          </button>
        )}
      </div>
    </>
  );
};

const StakingEarn = () => {
  const { t } = useTranslation();
  const { address } = useAccount();

  const StakingContract = {
    address: StakingCA,
    abi: StakingABI,
  } as const;

  const PriceOracleContract = {
    address: PriceOracleCA,
    abi: PriceOracleABI,
  } as const;

  const { data } = useReadContracts({
    contracts: [
      {
        ...StakingContract,
        functionName: "stakeInfos",
        args: [address],
      },
      {
        ...StakingContract,
        functionName: "LOCK_TIME",
      },
      {
        ...PriceOracleContract,
        functionName: "getUnderlyingPrice",
        args: [SymbloxTokenCA],
      },
    ],
  });

  const StakerInfo = (data?.[0].result as any) ?? {};

  const claimableReward = (StakerInfo?.[1] as bigint) ?? 0n;

  const StakedBalance = (StakerInfo?.[0] as bigint) ?? 0n;

  const sbxPrice = (data?.[2].result as bigint) ?? 0n;

  const rewardPerTokenPaid = (StakerInfo?.[3] as bigint) ?? 0n;

  return (
    <div id="staking-reward">
      <div className="relative pt-12 lg:pb-[112px] pb-8 sm: w-full min-h-screen font-Barlow px-5 md:px-10 lg:px-5">
        <div className="max-w-[1276px] mx-auto w-full flex flex-col gap-[30px] items-center">
          <div className="flex flex-col gap-4 items-center">
            <p className="lg:text-[24px] md:text-[22px] text-[20px] leading-[1em] font-medium text-white">
              {t("stakingReward.rewardSBX")}
            </p>
            <span className="max-w-[695px] text-center lg:text-[16px] text-[14px] font-normal leading-[1.1em] inline-block text-secondaryText">
              {t("stakingReward.earnSBX")} &nbsp;
              <Link to="/" className="text-white hover:underline">
                {t("stakingReward.yourRewardSBX")}
              </Link>
            </span>
          </div>
          <div className="flex flex-col lg:gap-6 gap-4 max-w-[1024px] w-full items-center">
            <div className="w-full flex md:flex-row flex-col gap-3 justify-between">
              <div className="sm:p-5 p-4 border border-[#293745] rounded-[4px] lg:w-1/3 w-full bg-[#0a1a2a] flex flex-col items-start gap-2 hover:bg-[rgba(255,255,255,0.08)]">
                <span className="text-secondaryText leading-[1em] text-[14px] font-normal">
                  {t("stakingReward.claimReward")}
                </span>
                <span className="mt-1 text-white text-[24px] sm:font-bold font-semibold leading-[1em]">
                  $&nbsp;
                  {formatterDecimal(
                    (
                      Number(formatEther(claimableReward)) *
                      Number(formatEther(sbxPrice))
                    ).toString()
                  )}
                </span>
              </div>
              <div className="sm:p-5 p-4 border border-[#293745] rounded-[4px] lg:w-1/3 w-full bg-[#0a1a2a] flex flex-col md:items-center items-start gap-2 hover:bg-[rgba(255,255,255,0.08)]">
                <span className="text-secondaryText leading-[1em] text-[14px] font-normal">
                  {t("stakingReward.earning")}
                </span>
                <span className="mt-1 text-white text-[24px] sm:font-bold font-semibold leading-[1em]">
                  {formatterDecimal(
                    (
                      (100 * Number(formatEther(claimableReward))) /
                      Number(formatEther(StakedBalance))
                    ).toString()
                  )}
                  %
                </span>
              </div>
              <div className="sm:p-5 p-4 border border-[#293745] rounded-[4px] lg:w-1/3 w-full bg-[#0a1a2a] flex flex-col md:items-end items-start gap-2 hover:bg-[rgba(255,255,255,0.08)]">
                <span className="text-secondaryText leading-[1em] text-[14px] font-normal">
                  {t("stakingReward.lifetimeReward")}
                </span>
                <span className="mt-1 text-white text-[24px] sm:font-bold font-semibold leading-[1em]">
                  $
                  {formatterDecimal(
                    (
                      Number(formatEther(StakedBalance)) *
                      Number(formatEther(sbxPrice)) *
                      Number(formatEther(rewardPerTokenPaid))
                    ).toString()
                  )}
                </span>
              </div>
            </div>
          </div>
          <div className="w-full flex flex-col gap-4">
            <hr className="border-[#293745]" />
            <RewardItem />
            <hr className="border-[#293745]" />
            <RewardItem />
            <hr className="border-[#293745]" />
          </div>
          {/* <div className="w-full flex md:flex-row flex-col mt-8 gap-3 justify-between">
            <div className="sm:p-5 p-4 border border-[#293745] rounded-[4px] lg:w-1/3 w-full bg-[#0a1a2a] flex flex-col items-start gap-2 hover:bg-[rgba(255,255,255,0.08)]">
              <span className="text-secondaryText leading-[1em] text-[14px] font-normal">
                {t("stakingReward.lastEpochFeeBurned")}
              </span>
              <span className="mt-1 text-white text-[24px] sm:font-bold font-semibold leading-[1em]">
                $0.0
              </span>
            </div>
            <div className="sm:p-5 p-4 border border-[#293745] rounded-[4px] lg:w-1/3 w-full bg-[#0a1a2a] flex flex-col md:items-center items-start gap-2 hover:bg-[rgba(255,255,255,0.08)]">
              <span className="text-secondaryText leading-[1em] text-[14px] font-normal">
                {t("stakingReward.earning")}
              </span>
              <span className="mt-1 text-white text-[24px] sm:font-bold font-semibold leading-[1em]">
                0.08%
              </span>
            </div>
            <div className="sm:p-5 p-4 border border-[#293745] rounded-[4px] lg:w-1/3 w-full bg-[#0a1a2a] flex flex-col md:items-end items-start gap-2 hover:bg-[rgba(255,255,255,0.08)]">
              <span className="text-secondaryText leading-[1em] text-[14px] font-normal">
                {t("stakingReward.lifetimeFeesBurned")}
              </span>
              <span className="mt-1 text-white text-[24px] sm:font-bold font-semibold leading-[1em]">
                $0.00
              </span>
            </div>
          </div> */}
          {/* <div className="w-full flex flex-col gap-4">
            <hr className="border-[#293745]" />
            <RewardItem />
          </div> */}
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

export default StakingEarn;
