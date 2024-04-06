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
      <div className="pt-[55px] pb-8 w-full min-h-screen font-Barlow px-5 sm:px-5 md:px-10">
        <div className="max-w-[1276px] mx-auto w-full flex flex-col gap-11">
          <div className="flex flex-row justify-between items-center gap-6 sm:flex-col md:flex-col sm:gap-4 md:gap-5">
            <div className="flex flex-col h-[268px] sm:h-full md:h-full gap-4 flex-[1_0_0] bg-primaryBoxColor py-[34px] px-6 rounded-2xl items-start justify-between w-full">
              <div className="flex flex-col gap-3 pr-14 items-start self-stretch relative">
                <div className="absolute right-0 top-0">
                  <img
                    src="/assets/Icon/governance.svg"
                    alt="governance"
                    className="w-[62.9px] h-16"
                  />
                </div>
                <p className="text-white text-[14px] font-normal leading-[1em]">
                  Step 1
                </p>
                <p className="text-white text-[24px] font-bold leading-[1em]">
                  Stake & Borrow
                </p>
                <p className="text-white text-[16px] font-normal leading-[1em]">
                  Borrow sUSD by staking your SNX.
                </p>
              </div>
              {isConnected ? (
                <button
                  className="h-10 py-[18px] sm:px-8 md:px-8 px-6 flex items-center gap-[10px] rounded-[60px] bg-primaryButtonColor text-white text-[16px] font-bold leading-[16px] sm:min-w-[190px] md:min-w-[190px] text-center justify-center hover:scale-[1.02]"
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
              } flex flex-col h-[268px] sm:h-full md:h-full gap-4 flex-[1_0_0] bg-primaryBoxColor py-[34px] px-6 rounded-xl items-start justify-between w-full`}
            >
              <div className="flex flex-col gap-3 pr-14 items-start self-stretch relative">
                <div className="absolute right-0 top-0">
                  <img
                    src="/assets/Icon/collateral.svg"
                    alt="collateral"
                    className="w-16 h-16"
                  />
                </div>
                <p className="text-white text-[14px] font-normal leading-[1em]">
                  Step 2
                </p>
                <p className="text-white text-[24px] font-bold leading-[1em] self-stretch">
                  Maintain Collateralization Ratio
                </p>
                <p className="text-white text-[16px] font-normal leading-[1em]">
                  Use the burn feature to maintain your c-ratio or completely
                  pay off debt and unstake your SNX.
                </p>
              </div>
              <button
                disabled={!isConnected}
                className="h-10 py-[18px] sm:px-8 md:px-8 px-6 flex items-center gap-[10px] rounded-[60px] text-white text-[16px] font-bold leading-[16px] border border-white sm:min-w-[190px] md:min-w-[190px] hover:scale-[1.02]"
              >
                C-Ratio explained
              </button>
            </div>
            <div
              className={`${
                isConnected ? "opacity-100" : "opacity-50"
              } flex flex-col h-[268px] sm:h-full md:h-full gap-4 flex-[1_0_0] bg-primaryBoxColor py-[34px] px-6 rounded-xl items-start justify-between w-full`}
            >
              <div className="flex flex-col gap-3 pr-14 items-start self-stretch relative">
                <div className="absolute right-0 top-0">
                  <img
                    src="/assets/Icon/reward.svg"
                    alt="reward"
                    className="w-16 h-16"
                  />
                </div>
                <p className="text-white text-[14px] font-normal leading-[1em]">
                  Step 3
                </p>
                <p className="text-white text-[24px] font-bold leading-[1em] self-stretch">
                  Collect Rewards
                </p>
                <p className="text-white text-[16px] font-normal leading-[1em]">
                  Maintain your target C-Ratio to collect your weekly rewards.
                </p>
              </div>
              <button
                disabled={!isConnected}
                className="h-10 py-[18px] sm:px-8 md:px-8 px-6 flex items-center gap-[10px] rounded-[60px] text-white text-[16px] font-bold leading-[16px] border border-white sm:min-w-[190px] md:min-w-[190px] hover:scale-[1.02]"
              >
                Rewards explained
              </button>
            </div>
          </div>
          <div className="w-full flex flex-row sm:flex-col md:flex-col mx-auto justify-center">
            <Link
              to="/"
              className="w-1/4 sm:w-full md:w-full p-5 flex flex-col gap-2 border border-[#293745] rounded-bl-xl rounded-tl-xl sm:rounded-bl-none md:rounded-bl-none sm:rounded-tr-xl md:rounded-tr-xl hover:bg-[rgba(255,255,255,0.03)]"
            >
              <p className="text-[14px] leading-[1em] font-normal text-white">
                Estimated APR
              </p>
              <p className="text-[20px] leading-[1em] font-bold text-white">
                ••••%
              </p>
              <p className="text-[14px] leading-[1em] font-normal text-secondaryText">
                Connect wallet first to reveal the APR
              </p>
            </Link>
            <Link
              to="/"
              className="w-1/4 sm:w-full md:w-full p-5 flex flex-col gap-2 border border-[#293745] border-l-0 justify-center sm:border-l md:border-l hover:bg-[rgba(255,255,255,0.03)]"
            >
              <p className="text-[20px] leading-[1em] font-bold text-white">
                SNX Bridge
              </p>
              <p className="text-[14px] leading-[1em] font-normal text-secondaryText">
                Transfer Asset between blockchains
              </p>
            </Link>
            <Link
              to="/"
              className="w-1/4 sm:w-full md:w-full p-5 flex flex-col gap-2 border border-[#293745] border-l-0 justify-center sm:border-l md:border-l hover:bg-[rgba(255,255,255,0.03)]"
            >
              <p className="text-[20px] leading-[1em] font-bold text-white">
                Hedge Debt
              </p>
              <p className="text-[14px] leading-[1em] font-normal text-secondaryText">
                Buy dSNX to hedge
              </p>
            </Link>
            <Link
              to="/"
              className="w-1/4 sm:w-full md:w-full p-5 flex flex-col gap-2 border border-[#293745] border-l-0 rounded-br-xl rounded-tr-xl sm:rounded-tr-none md:rounded-tr-none sm:border-l md:border-l sm:rounded-bl-xl md:rounded-bl-xl justify-center hover:bg-[rgba(255,255,255,0.03)]"
            >
              <p className="text-[20px] leading-[1em] font-bold text-white">
                Help
              </p>
              <p className="text-[14px] leading-[1em] font-normal text-secondaryText">
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
