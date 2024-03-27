const Staking = () => {
  return (
    <div className="pt-[55px] w-full min-h-screen font-Barlow">
      <div className="max-w-[1276px] mx-auto w-full flex flex-col gap-11">
        <div className="flex flex-row justify-between items-center gap-6">
          <div className="flex flex-col min-h-[268px] gap-4 flex-[1_0_0] bg-primaryBoxColor py-[34px] px-6 rounded-xl items-start justify-between">
            <div className="flex flex-col gap-3 pr-14 items-start self-stretch relative">
              <div className="absolute right-0 top-0">
                <img
                  src="/assets/Icon/governance.svg"
                  alt="governance"
                  className="w-[62.9px] h-16"
                />
              </div>
              <p className="text-white text-[14px] font-normal leading-[14px]">
                Step 1
              </p>
              <p className="text-white text-[24px] font-bold leading-[14px]">
                Stake & Borrow
              </p>
              <p className="text-white text-[16px] font-normal leading-[14px]">
                Borrow sUSD by staking your SNX.
              </p>
            </div>
            <button className="h-10 py-[18px] px-6 flex items-center gap-[10px] rounded-[60px] bg-primaryButtonColor text-white text-[16px] font-bold leading-[16px]">
              Connect Wallet
            </button>
          </div>
          <div className="flex flex-col gap-4 flex-[1_0_0] bg-primaryBoxColor py-[34px] px-6 rounded-xl items-start justify-between min-h-[268px] opacity-50"></div>
          <div className="flex flex-col gap-4 flex-[1_0_0] bg-primaryBoxColor py-[34px] px-6 rounded-xl items-start justify-between min-h-[268px] opacity-50"></div>
        </div>
        <div className="w-full flex flex-row">
          <div className=""></div>
          <div className=""></div>
          <div className=""></div>
          <div className=""></div>
        </div>
      </div>
    </div>
  );
};

export default Staking;
