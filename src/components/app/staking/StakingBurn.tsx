import { useState } from "react";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { Icon } from "@iconify/react";
import { useAccount, useReadContracts, useWalletClient } from "wagmi";
import { formatEther, parseEther } from "viem";
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";
import SBXContractABI from "../../../config/abis/IsbxABi.json";
import PriceOracleABI from "../../../config/abis/IPriceOracle.json";
import StakingABI from "../../../config/abis/IStaking.json";

const regex = /^$|^[0-9]+(\.[0-9]*)?$/;

const LightTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    maxWidth: 274,
    backgroundColor: "#283C50",
    color: "#fff",
    boxShadow: theme.shadows[1],
    fontSize: 14,
    fontWeight: "400",
    fontFamily: "Barlow ,sans-serif",
    padding: "10px",
    borderRadius: "8px",
    lineHeight: "1em",
  },
  [`& .${tooltipClasses.arrow}::before`]: {
    backgroundColor: "#283C50",
  },
}));

const StakingBurn = () => {
  const { address } = useAccount();
  const [sbxAmount, setSBXAmount] = useState<number>(0);
  const [sUSDAmount, setSUSDAmount] = useState<number>(0);
  const { data: walletClient } = useWalletClient();
  const StakingContract = {
    address: "0x2CC278b0137A8E0de188D2839Be3c47082136EFc",
    abi: StakingABI,
  } as const;

  const SBXContract = {
    address: "0x91a14891bC882561aabeFC1e2b1626C13b38f37C",
    abi: SBXContractABI,
  } as const;

  const PriceOracleContract = {
    address: "0xd8BEFC60fd1F1b799357791f5ff7814679f264F1",
    abi: PriceOracleABI,
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
        functionName: "getTokenPrice",
        args: [0x91a14891bc882561aabefc1e2b1626c13b38f37c],
      },
    ],
  });

  const formattedSBXAmount = data
    ? parseFloat(formatEther(data?.[0].result as bigint))
    : 0;

  const setSBXAmountHandler = (percent: number) => {
    const newAmount = (formattedSBXAmount * percent) / 100;
    setSBXAmount(newAmount);
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    setState: React.Dispatch<React.SetStateAction<number>>
  ) => {
    if (regex.test(event.target.value)) {
      setState(parseFloat(event.target.value));
    }
  };

  const BurnHandler = () => {
    console.log("SBX Amount:", parseEther(sbxAmount.toString()));
    walletClient?.writeContract({
      ...StakingContract,
      functionName: "burn",
      args: [parseEther(sbxAmount.toString())],
    });
  };

  const isDisabled = sbxAmount || sUSDAmount;

  return (
    <>
      <div className="relative pt-12 lg:pb-[112px] pb-8 sm: w-full min-h-screen font-Barlow px-5 md:px-10 lg:px-5">
        <div className="max-w-[1276px] mx-auto w-full flex flex-col gap-[30px] items-center">
          <div className="flex flex-col gap-4 items-center">
            <p className="lg:text-[24px] md:text-[22px] text-[20px] leading-[1em] font-medium text-white">
              Burn Debt
            </p>
            <span className="max-w-[695px] text-center lg:text-[16px] text-[14px] font-normal leading-[1.1em] inline-block text-secondaryText">
              Burn your sUSD debt to unlock your staked SNX. This will increase
              your Collateralization Ratio and reduce your debt.&nbsp;
              <span className="text-white">Learn more.</span>
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
                      BURN
                    </span>
                    <LightTooltip
                      title="Burn Your sUSD or Staked SBX"
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
                  <span className="lg:text-[16px] text-[12px] font-medium leading-[1em] text-white">
                    Burn sUSD or Staked SBX
                  </span>
                </div>
                <div className="flex flex-col gap-2 flex-[1_0_0] items-end">
                  <div className="flex flex-row gap-2 flex-[1_0_0] items-center">
                    <span className="flex flex-row gap-1 items-center">
                      <span className="text-secondaryText lg:text-[14px] text-[12px] font-semibold leading-[1em]">
                        SBX PRICE
                      </span>
                    </span>
                    <span className="lg:text-[16px] text-[14px] font-medium leading-[1em] text-[#2DFF8C]">
                      $4.16
                    </span>
                  </div>
                  <div className="flex flex-row gap-2 flex-[1_0_0] items-center">
                    <span className="flex flex-row gap-1 items-center">
                      <span className="text-secondaryText lg:text-[14px] text-[12px] font-semibold leading-[1em]">
                        sUSD PRICE
                      </span>
                    </span>
                    <span className="lg:text-[16px] text-[14px] font-medium leading-[1em] text-[#2DFF8C]">
                      $1.12
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
                          current &lt; 160%
                        </span>
                        <LightTooltip
                          title="You maybe flagged for liquidation"
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
                          Target 4000%
                        </span>
                        <LightTooltip
                          title="Required to claim rewards"
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
                    <div className="relative w-full h-3 bg-[#ffffff0f]">
                      <div className="absolute w-[1px] h-10 bg-[#303037] left-5 bottom-[-15px]"></div>
                      <div className="absolute w-[1px] h-10 bg-[#303037] right-10 bottom-[-15px]"></div>
                    </div>
                  </div>
                  <div className="lg:w-[40%] flex flex-col w-full rounded-[4px] border border-primaryBoxColor bg-black">
                    <div className="flex flex-row justify-between items-center pt-3 px-4 pb-4">
                      <div className="flex flex-row gap-1 items-center">
                        <span className="text-white lg:text-[16px] text-[14px] font-semibold leading-[1em]">
                          Current Health
                        </span>
                        <LightTooltip
                          title="Your Current C-ratio"
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
                      <div className="w-12 h-5 rounded-sm anim-colorExchange"></div>
                    </div>
                    <div className="w-full opacity-60 bg-[#303037] h-[1px]"></div>
                    <div className="flex flex-row justify-between items-center pt-2 px-4 pb-10">
                      <div className="flex flex-row gap-1 items-center">
                        <span className="text-white lg:text-[14px] text-[14px] font-semibold leading-[1em]">
                          Target Health
                        </span>
                        <LightTooltip
                          title="Target Health"
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
                      Burn sUSD
                    </span>
                    <LightTooltip
                      title="Burn sUSD to increase your C-ratio"
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
                      value={sbxAmount || ""}
                      onChange={(e) => handleInputChange(e, setSBXAmount)}
                      className="relative bg-primaryBoxColor py-[13px] pl-4 w-full rounded-lg text-white border border-[transparent] focus:outline-none focus:border-primaryButtonColor focus:shadow-primary hidden-scrollbar"
                      placeholder="Enter Amount"
                    />
                    <div className="flex flex-col gap-1 absolute pr-4">
                      <div className="text-white text-[14px] leading-[1em] font-bold text-right">
                        sUSD
                      </div>
                      <div className="text-secondaryText text-[12px] leading-[1em] font-normal text-right">
                        Active debt : {formattedSBXAmount} &nbsp; sUSD Balance:
                        0.00
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-row lg:gap-3 sm:gap-2 gap-1 items-center w-full">
                    <button className="w-1/2 rounded-[18px] justify-center border border-[#33485E] items-center flex py-[18px] text-[#C3E6FF] font-bold sm:text-[14px] text-[12px] leading-[1em] hover:bg-[rgba(255,255,255,0.08)] focus:border-[#EE2D82] focus:shadow-primary h-8 px-4 sm:px-8 md:px-6">
                      Burn Max
                    </button>
                    <button className="w-1/2 rounded-[18px] justify-center border border-[#33485E] items-center flex py-[18px] text-[#C3E6FF] font-bold sm:text-[14px] text-[12px] leading-[1em] hover:bg-[rgba(255,255,255,0.08)] focus:border-[#EE2D82] focus:shadow-primary h-8 px-4 sm:px-8 md:px-6">
                      Burn To Target
                    </button>
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  <span className="flex flex-row gap-1 items-center">
                    <span className="text-white sm:text-[16px] text-[14px] font-normal leading-[1em]">
                      Unstaking
                    </span>
                    <LightTooltip
                      title="When your c-ratio is below target, all your SBX is staked"
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
                      value={sUSDAmount || ""}
                      onChange={(e) => handleInputChange(e, setSUSDAmount)}
                      className="relative bg-primaryBoxColor py-[13px] pl-4 w-full rounded-lg text-white border border-[transparent] focus:outline-none focus:border-primaryButtonColor focus:shadow-primary"
                      placeholder="Enter Amount"
                    />
                    <div className="flex flex-col gap-1 absolute pr-4">
                      <div className="text-white text-[14px] leading-[1em] font-bold text-right">
                        SBX
                      </div>
                      <div className="text-secondaryText text-[12px] leading-[1em] font-normal text-right">
                        Staked SBX : 0.00
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-row w-full justify-between items-center">
                  <span className="text-white text-[16px] font-normal leading-[1em]">
                    Gas Price
                  </span>
                  <div className="">
                    <span className="text-white text-[16px] font-normal leading-[1em] flex items-center justify-center">
                      {parseFloat((Math.random() * 1).toString()).toFixed(2)}
                      &nbsp;BNB :&nbsp;
                      {parseFloat((Math.random() * 5).toString()).toFixed(2)}
                      &nbsp;$
                    </span>
                  </div>
                </div>
                <div className="flex justify-center">
                  <button
                    disabled={!isDisabled}
                    onClick={BurnHandler}
                    className={`rounded-[60px] bg-primaryButtonColor w-80 h-10 justify-center text-white text-[16px] font-bold leading-[1em] ${
                      !isDisabled ? "opacity-50" : "opacity-100"
                    }`}
                  >
                    Burn
                  </button>
                </div>
              </div>
            </div>
            <div className="w-full flex lg:flex-row flex-col">
              <Link
                to="/guide/staking"
                className="sm:p-5 p-4 border border-[#293745] lg:w-1/2 w-full lg:border-r-0 border-r lg:rounded-l-xl rounded-l-none rounded-tr-xl lg:rounded-tr-none rounded-tl-xl bg-[#0a1a2a] flex flex-col gap-2 hover:bg-[rgba(255,255,255,0.08)]"
              >
                <span className="text-white text-[16px] sm:font-bold font-semibold leading-[1em]">
                  Staking Guide
                </span>
                <span className="text-secondaryText leading-[1em] text-[14px] font-normal">
                  Guide your through the processes
                </span>
              </Link>
              <Link
                to="/staking/self-liquidation"
                className="sm:p-5 p-4 border border-[#293745] lg:w-1/2 w-full rounded-tr-none border-t-0 lg:border-t bg-[#0a1a2a] flex flex-col gap-2 hover:bg-[rgba(255,255,255,0.08)]"
              >
                <span className="text-white text-[16px] sm:font-bold font-semibold leading-[1em]">
                  Hedge Debt
                </span>
                <span className="text-secondaryText leading-[1em] text-[14px] font-normal">
                  Buy dSBX to hedge
                </span>
              </Link>
              <Link
                to="/staking/self-liquidation"
                className="sm:p-5 p-4 border border-[#293745] lg:w-1/2 w-full rounded-r-xl lg:rounded-tr-xl rounded-tr-none border-t-0 lg:border-t rounded-bl-xl lg:rounded-bl-none bg-[#0a1a2a] flex flex-col gap-2 hover:bg-[rgba(255,255,255,0.08)]"
              >
                <span className="text-white text-[16px] sm:font-bold font-semibold leading-[1em]">
                  Self Liquidate
                </span>
                <span className="text-secondaryText leading-[1em] text-[14px] font-normal">
                  Self Liquidate SBX Collateral
                </span>
              </Link>
            </div>
          </div>
        </div>
        <Link
          to="/staking"
          className="absolute top-0 left-5 lg:hidden flex flex-row gap-2 items-center"
        >
          <Icon icon="iconamoon:arrow-left-1" className="text-white w-4 h-4" />
          <span className="text-[14px] leading-[1em] font-medium text-white">
            Back
          </span>
        </Link>
      </div>
    </>
  );
};

export default StakingBurn;
