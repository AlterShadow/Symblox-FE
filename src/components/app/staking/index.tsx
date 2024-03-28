const Staking = () => {
  return (
    <div className="pt-[55px] w-full min-h-screen font-Barlow">
      <div className="max-w-[1276px] mx-auto w-full flex flex-col gap-11">
        <div className="flex flex-row justify-between items-center gap-6">
          <div className="flex flex-col min-h-[268px] gap-4 flex-[1_0_0] bg-primaryBoxColor py-[34px] px-6 rounded-2xl items-start justify-between">
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
            <button className="h-10 py-[18px] px-6 flex items-center gap-[10px] rounded-[60px] bg-primaryButtonColor text-white text-[16px] font-bold leading-[16px]">
              Connect Wallet
            </button>
          </div>
          <div className="flex flex-col min-h-[268px] gap-4 flex-[1_0_0] bg-primaryBoxColor py-[34px] px-6 rounded-xl items-start justify-between opacity-50">
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
                Use the burn feature to maintain your c-ratio or completely pay
                off debt and unstake your SNX.
              </p>
            </div>
            <button className="h-10 py-[18px] px-6 flex items-center gap-[10px] rounded-[60px] text-white text-[16px] font-bold leading-[16px] border border-white">
              C-Ratio explained
            </button>
          </div>
          <div className="flex flex-col min-h-[268px] gap-4 flex-[1_0_0] bg-primaryBoxColor py-[34px] px-6 rounded-xl items-start justify-between opacity-50">
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
            <button className="h-10 py-[18px] px-6 flex items-center gap-[10px] rounded-[60px] text-white text-[16px] font-bold leading-[16px] border border-white">
              Rewards explained
            </button>
          </div>
        </div>
        <div className="w-full flex flex-row mx-auto justify-center">
          <div className="w-1/4 p-5 flex flex-col gap-2 border border-[#293745] rounded-bl-xl rounded-tl-xl">
            <p className="text-[14px] leading-[1em] font-normal text-white">
              Estimated APR
            </p>
            <p className="text-[20px] leading-[1em] font-bold text-white">
              ••••%
            </p>
            <p className="text-[14px] leading-[1em] font-normal text-[#7F93A2]">
              Connect wallet first to reveal the APR
            </p>
          </div>
          <div className="w-1/4 p-5 flex flex-col gap-2 border border-[#293745] border-l-0 justify-center">
            <p className="text-[20px] leading-[1em] font-bold text-white">
              SNX Bridge
            </p>
            <p className="text-[14px] leading-[1em] font-normal text-[#7F93A2]">
              Transfer Asset between blockchains
            </p>
          </div>
          <div className="w-1/4 p-5 flex flex-col gap-2 border border-[#293745] border-l-0 justify-center">
            <p className="text-[20px] leading-[1em] font-bold text-white">
              Hedge Debt
            </p>
            <p className="text-[14px] leading-[1em] font-normal text-[#7F93A2]">
              Buy dSNX to hedge
            </p>
          </div>
          <div className="w-1/4 p-5 flex flex-col gap-2 border border-[#293745] border-l-0 rounded-br-xl rounded-tr-xl justify-center">
            <p className="text-[20px] leading-[1em] font-bold text-white">
              Help
            </p>
            <p className="text-[14px] leading-[1em] font-normal text-[#7F93A2]">
              Learn more about Synthetix
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Staking;
