const StakingMint = () => {
  return (
    <>
      <div className="pt-10 pb-8 w-full min-h-screen font-Barlow px-5 sm:px-5 md:px-10">
        <div className="max-w-[1276px] mx-auto w-full flex flex-col gap-[30px] items-center">
          <div className="flex flex-col gap-4 items-center">
            <p className="text-[24px] leading-[1em] font-medium text-white">
              Stake SNX By Miniting sUSD
            </p>
            <span className="max-w-[695px] text-center text-[16px] font-normal leading-[1em] inline-block text-secondaryText">
              Mint sUSD by staking your SNX. SNX stakers earn weekly staking
              rewars in exchange for managing their Collateralization Ratio and
              debt.&nbsp;
              <span className="text-white">
                Your staked SNX will be locked for 7 days.
              </span>
            </span>
          </div>
          <div className="flex flex-col gap-6 max-w-[1024px] w-full items-center">
            <div className="flex flex-col w-full">
              <div
                className="px-6 py-4 w-full flex flex-row bg-[#17283B] rounded-t-[14px] border-b border-[#293745]"
                id="mint-header"
              >
                <div className="flex flex-col gap-2 flex-[1_0_0] items-start">
                  <span className="flex flex-row gap-1 items-center">
                    <span className="text-secondaryText text-[14px] font-semibold leading-[1em]">
                      EPOCH
                    </span>
                    <span className="w-[14px] h-[14px]">
                      <img
                        src="/assets/Icon/question-mark.svg"
                        alt="question-mark"
                      />
                    </span>
                  </span>
                  <span className="text-[16px] font-medium leading-[1em] text-white">
                    02D 20H 42M
                  </span>
                </div>
                <div className="flex flex-col gap-2 flex-[1_0_0] items-end">
                  <span className="flex flex-row gap-1 items-center">
                    <span className="text-secondaryText text-[14px] font-semibold leading-[1em]">
                      SNX PRICE
                    </span>
                  </span>
                  <span className="text-[16px] font-medium leading-[1em] text-[#2DFF8C]">
                    $4.16
                  </span>
                </div>
              </div>
              <div
                className="px-6 py-8 flex flex-col gap-6 w-full rounded-b-[14px] border border-[#293745] border-t-0"
                id="mint-body"
              >
                <div className="gap-3 flex flex-col w-full">
                  <div className="flex flex-row gap-1 items-center">
                    <span className="text-white text-[16px] font-normal leading-[1em]">
                      How much SNX do you want to stake?
                    </span>
                    <img
                      src="/assets/Icon/question-mark.svg"
                      className="mt-[2px]"
                      alt="question-mark"
                    />
                  </div>
                  <div className="flex flex-row py-[13px] px-4 gap-3">
                    <div className=""></div>
                    <div className="flex flex-col gap-1">
                      <div className="text-white text-[14px] leading-[1em] font-bold">
                        SNX
                      </div>
                      <div className="text-secondaryText text-[12px] leading-[1em] font-normal text-right">
                        Unstaked SNX : 0.00
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-row gap-3 items-center w-full">
                    <div className="w-1/4 rounded-[60px] justify-center border border-[#293745] items-center flex py-[18px] px-8 text-[#C3E6FF] font-bold text-[14px] leading-[1em]">
                      25%
                    </div>
                    <div className="w-1/4 rounded-[60px] justify-center border border-[#293745] items-center flex py-[18px] px-8 text-[#C3E6FF] font-bold text-[14px] leading-[1em]">
                      50%
                    </div>
                    <div className="w-1/4 rounded-[60px] justify-center border border-[#293745] items-center flex py-[18px] px-8 text-[#C3E6FF] font-bold text-[14px] leading-[1em]">
                      75%
                    </div>
                    <div className="w-1/4 rounded-[60px] justify-center border border-[#293745] items-center flex py-[18px] px-8 text-[#C3E6FF] font-bold text-[14px] leading-[1em]">
                      100%
                    </div>
                  </div>
                </div>
                <div className=""></div>
                <div className=""></div>
                <div className=""></div>
              </div>
            </div>
            <div className=""></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StakingMint;
