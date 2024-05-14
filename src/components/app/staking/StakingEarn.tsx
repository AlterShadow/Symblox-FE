import { useState } from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import { useAccount, useReadContracts, useWalletClient } from "wagmi";
import { formatEther, parseEther } from "viem";
import { SymbloxTokenCA } from "../../../config/params/contractAddresses";
import SBXContractABI from "../../../config/abis/SymbloxABI.json";
import PriceOracleABI from "../../../config/abis/PriceOracleABI.json";
import StakingABI from "../../../config/abis/IStaking.json";
import LightTooltip from "../../widgets/LightTooltip";
import { LinearProgress, LinearProgressProps } from "@mui/material";
import { onlyNumberRegex } from "../../../utils/formatter";
import { useTranslation } from "react-i18next";

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
  return (
    <>
      <div className="w-full flex flex-row">
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
              Staking Rewards
            </span>
          </div>
          <div className="w-[210px] min-w-20 flex flex-col justify-center">
            <span className=" text-white text-[14px] sm:font-bold font-semibold leading-[1em]">
              0.08%
            </span>
            <span className="mt-1 text-secondaryText leading-[1em] text-[13px] font-medium">
              Est.APR
            </span>
          </div>
        </div>
        <div className="w-[210px] flex flex-col mx-5 justify-center">
          <RewardProgressBar currentTimeStamp={100} totalTimeStamp={1000} />
          <div className="flex flex-row justify-between items-center mt-[10px]">
            <span className="text-secondaryText leading-[1em] text-[14px] font-bold">
              Time Remaining
            </span>
            <span className="text-[#47FAC2] font-bold leading-[1.2em] text-[0.75rem]">
              02D 04H 52M
            </span>
          </div>
        </div>
        <div className="flex flex-grow justify-between items-center">
          <div className="min-w-[182px] flex flex-col ml-7"></div>
          <button className="min-w-20 h-10 ml-4 text-[#7a7a85] bg-[#303037] rounded-[4px] font-bold">
            Claim
          </button>
        </div>
      </div>
    </>
  );
};

const StakingEarn = () => {
  const { t } = useTranslation();
  const { address } = useAccount();
  const [sbxAmount, setSBXAmount] = useState<number>(0);
  const [sUSDAmount, setSUSDAmount] = useState<number>(0);
  const { data: walletClient } = useWalletClient();

  const isDisabled = sbxAmount || sUSDAmount;

  return (
    <>
      <div className="relative pt-12 lg:pb-[112px] pb-8 sm: w-full min-h-screen font-Barlow px-5 md:px-10 lg:px-5">
        <div className="max-w-[1276px] mx-auto w-full flex flex-col gap-[30px] items-center">
          <div className="flex flex-col gap-4 items-center">
            <p className="lg:text-[24px] md:text-[22px] text-[20px] leading-[1em] font-medium text-white">
              Earn Reward
            </p>
            <span className="max-w-[695px] text-center lg:text-[16px] text-[14px] font-normal leading-[1.1em] inline-block text-secondaryText">
              Earn Rewards Staking SNX tokens offers weekly rewards in both
              inflationary SNX and sUSD from trading fees. &nbsp;
              <Link to="/" className="text-white hover:underline">
                Learn more
              </Link>
            </span>
          </div>
          <div className="flex flex-col lg:gap-6 gap-4 max-w-[1024px] w-full items-center">
            <div className="w-full flex md:flex-row flex-col gap-3 justify-between">
              <div className="sm:p-5 p-4 border border-[#293745] rounded-[4px] lg:w-1/3 w-full bg-[#0a1a2a] flex flex-col items-start gap-2 hover:bg-[rgba(255,255,255,0.08)]">
                <span className="text-secondaryText leading-[1em] text-[14px] font-normal">
                  Claimable Rewards
                </span>
                <span className="mt-1 text-white text-[24px] sm:font-bold font-semibold leading-[1em]">
                  $0.0
                </span>
              </div>
              <div className="sm:p-5 p-4 border border-[#293745] rounded-[4px] lg:w-1/3 w-full bg-[#0a1a2a] flex flex-col md:items-center items-start gap-2 hover:bg-[rgba(255,255,255,0.08)]">
                <span className="text-secondaryText leading-[1em] text-[14px] font-normal">
                  Earning
                </span>
                <span className="mt-1 text-white text-[24px] sm:font-bold font-semibold leading-[1em]">
                  0.08%
                </span>
              </div>
              <div className="sm:p-5 p-4 border border-[#293745] rounded-[4px] lg:w-1/3 w-full bg-[#0a1a2a] flex flex-col md:items-end items-start gap-2 hover:bg-[rgba(255,255,255,0.08)]">
                <span className="text-secondaryText leading-[1em] text-[14px] font-normal">
                  Lifetime Rewards
                </span>
                <span className="mt-1 text-white text-[24px] sm:font-bold font-semibold leading-[1em]">
                  $0.00
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
          <div className="w-full flex md:flex-row flex-col mt-8 gap-3 justify-between">
            <div className="sm:p-5 p-4 border border-[#293745] rounded-[4px] lg:w-1/3 w-full bg-[#0a1a2a] flex flex-col items-start gap-2 hover:bg-[rgba(255,255,255,0.08)]">
              <span className="text-secondaryText leading-[1em] text-[14px] font-normal">
                Last Epoch Fees Burned
              </span>
              <span className="mt-1 text-white text-[24px] sm:font-bold font-semibold leading-[1em]">
                $0.0
              </span>
            </div>
            <div className="sm:p-5 p-4 border border-[#293745] rounded-[4px] lg:w-1/3 w-full bg-[#0a1a2a] flex flex-col md:items-center items-start gap-2 hover:bg-[rgba(255,255,255,0.08)]">
              <span className="text-secondaryText leading-[1em] text-[14px] font-normal">
                Earning
              </span>
              <span className="mt-1 text-white text-[24px] sm:font-bold font-semibold leading-[1em]">
                0.08%
              </span>
            </div>
            <div className="sm:p-5 p-4 border border-[#293745] rounded-[4px] lg:w-1/3 w-full bg-[#0a1a2a] flex flex-col md:items-end items-start gap-2 hover:bg-[rgba(255,255,255,0.08)]">
              <span className="text-secondaryText leading-[1em] text-[14px] font-normal">
                Lifetime Fees Burned
              </span>
              <span className="mt-1 text-white text-[24px] sm:font-bold font-semibold leading-[1em]">
                $0.00
              </span>
            </div>
          </div>
          <div className="w-full flex flex-col gap-4">
            <hr className="border-[#293745]" />
            <RewardItem />
          </div>
        </div>
        <Link
          to="/staking"
          className="absolute top-0 left-5 lg:hidden flex flex-row gap-2 items-center mt-5 sm:mt-0"
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

export default StakingEarn;
