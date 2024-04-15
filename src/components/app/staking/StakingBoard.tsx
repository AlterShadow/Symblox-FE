import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";

import PrivacyModal from "../modal/privacy";

const StakingBoard = () => {
  const { isConnected } = useAccount();

  console.log("Connect State:", isConnected);

  const navigate = useNavigate();
  const stakingHandler = () => {
    navigate("/staking/mint");
  };
  return (
    <>
      <div className="pt-[55px] pb-8 w-full min-h-screen font-Barlow px-5 md:px-10 lg:px-5">
        <div className="max-w-[1276px] mx-auto w-full flex flex-col gap-11">
          <div className="flex lg:flex-row justify-between items-center flex-col lg:gap-6 gap-4">
            <div className="flex flex-col lg:h-[268px] h-full gap-4 flex-[1_0_0] bg-primaryBoxColor py-[34px] px-6 rounded-2xl items-start justify-between w-full">
              <div className="flex flex-col gap-3 pr-12 items-start self-stretch relative">
                <div className="absolute right-0 top-0">
                  <img
                    src="/assets/Icon/governance.svg"
                    alt="governance"
                    className="w-[62.9px] h-16"
                  />
                </div>
                <p className="text-white lg:text-[14px] text-[12px] font-normal leading-[1em]">
                  Step 1
                </p>
                <p className="text-white lg:text-[22px] text-[20px] font-bold leading-[1em]">
                  Stake & Borrow
                </p>
                <p className="text-white lg:text-[16px] text-[14px] font-normal leading-[1em]">
                  Borrow sUSD by staking your SBX.
                </p>
              </div>
              {isConnected ? (
                <button
                  className="h-10 py-[18px] px-8 lg:px-6 flex items-center gap-[10px] rounded-[60px] bg-primaryButtonColor text-white text-[16px] font-bold leading-[16px] min-w-[190px] text-center justify-center hover:scale-[1.02]"
                  onClick={stakingHandler}
                >
                  Start Staking
                </button>
              ) : (
                <button id="wallet-button">
                  <ConnectButton label="Connect Wallet" />
                </button>
              )}
            </div>
            <div
              className={`${
                isConnected ? "opacity-100" : "opacity-50"
              } flex flex-col lg:h-[268px] h-full gap-4 flex-[1_0_0] bg-primaryBoxColor py-[34px] px-6 rounded-xl items-start justify-between w-full`}
            >
              <div className="flex flex-col gap-3 pr-12 items-start self-stretch relative">
                <div className="absolute right-0 top-0">
                  <img
                    src="/assets/Icon/collateral.svg"
                    alt="collateral"
                    className="w-16 h-16"
                  />
                </div>
                <p className="text-white lg:text-[14px] text-[12px] font-normal leading-[1em]">
                  Step 2
                </p>
                <p className="text-white lg:text-[22px] text-[20px] font-bold leading-[1em] self-stretch">
                  Maintain Collateralization Ratio
                </p>
                <p className="text-white lg:text-[16px] text-[14px] font-normal leading-[1em]">
                  Use the burn feature to maintain your c-ratio or completely
                  pay off debt and unstake your SBX.
                </p>
              </div>
              <button
                disabled={!isConnected}
                className="h-10 py-[18px] flex justify-center items-center gap-[10px] rounded-[60px] text-white text-[16px] font-bold leading-[16px] border border-white min-w-[190px] hover:scale-[1.02]"
              >
                C-Ratio explained
              </button>
            </div>
            <div
              className={`${
                isConnected ? "opacity-100" : "opacity-50"
              } flex flex-col lg:h-[268px] h-full gap-4 flex-[1_0_0] bg-primaryBoxColor py-[34px] px-6 rounded-xl items-start justify-between w-full`}
            >
              <div className="flex flex-col gap-3 pr-12 items-start self-stretch relative">
                <div className="absolute right-0 top-0">
                  <img
                    src="/assets/Icon/reward.svg"
                    alt="reward"
                    className="w-16 h-16"
                  />
                </div>
                <p className="text-white lg:text-[14px] text-[12px] font-normal leading-[1em]">
                  Step 3
                </p>
                <p className="text-white lg:text-[22px] text-[20px] font-bold leading-[1em] self-stretch">
                  Collect Rewards
                </p>
                <p className="text-white lg:text-[16px] text-[14px] font-normal leading-[1em]">
                  Maintain your target C-Ratio to collect your weekly rewards.
                </p>
              </div>
              <button
                disabled={!isConnected}
                className="h-10 py-[18px] flex justify-center items-center gap-[10px] rounded-[60px] text-white text-[16px] font-bold leading-[16px] border border-white min-w-[190px] hover:scale-[1.02]"
              >
                Rewards explained
              </button>
            </div>
          </div>
          <div className="w-full flex lg:flex-row flex-col mx-auto justify-center">
            <Link
              to="/"
              className="lg:w-1/4 w-full p-5 flex flex-col gap-2 border border-[#293745] lg:rounded-bl-xl rounded-tl-xl rounded-bl-none lg:rounded-tr-none rounded-tr-xl border-b-0 lg:border-b hover:bg-[rgba(255,255,255,0.03)]"
            >
              <p className="lg:text-[14px] text-[12px] leading-[1em] font-normal text-white">
                Estimated APR
              </p>
              <p className="lg:text-[20px] text-[16px] leading-[1em] font-bold text-white">
                ••••%
              </p>
              <p className="lg:text-[14px] text-[12px] leading-[1em] font-normal text-secondaryText">
                Connect wallet first to reveal the APR
              </p>
            </Link>
            <Link
              to="/"
              className="lg:w-1/4 w-full p-5 flex flex-col gap-2 border border-[#293745] lg:border-l-0 justify-center border-l border-b-0 lg:border-b hover:bg-[rgba(255,255,255,0.03)]"
            >
              <p className="lg:text-[20px] text-[16px] leading-[1em] font-bold text-white">
                SBX Bridge
              </p>
              <p className="lg:text-[14px] text-[12px] leading-[1em] font-normal text-secondaryText">
                Transfer Asset between blockchains
              </p>
            </Link>
            <Link
              to="/"
              className="lg:w-1/4 w-full p-5 flex flex-col gap-2 border border-[#293745] lg:border-l-0 justify-center border-l border-b-0 lg:border-b hover:bg-[rgba(255,255,255,0.03)]"
            >
              <p className="lg:text-[20px] text-[16px] leading-[1em] font-bold text-white">
                Hedge Debt
              </p>
              <p className="lg:text-[14px] text-[12px] leading-[1em] font-normal text-secondaryText">
                Buy dSNX to hedge
              </p>
            </Link>
            <Link
              to="/"
              className="lg:w-1/4 w-full p-5 flex flex-col gap-2 border border-[#293745] lg:border-l-0 rounded-br-xl lg:rounded-tr-xl rounded-tr-none border-l rounded-bl-xl lg:rounded-bl-none justify-center hover:bg-[rgba(255,255,255,0.03)]"
            >
              <p className="lg:text-[20px] text-[16px] leading-[1em] font-bold text-white">
                Help
              </p>
              <p className="lg:text-[14px] text-[12px] leading-[1em] font-normal text-secondaryText">
                Learn more about Synthetix
              </p>
            </Link>
          </div>
        </div>
      </div>
      <PrivacyModal />
    </>
  );
};

export default StakingBoard;
