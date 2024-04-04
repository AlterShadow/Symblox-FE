const RewardFragment = () => {
  return (
    <>
      <div className="pt-20 pb-16 mx-auto w-full font-Barlow">
        <div className="px-24 lg:px-36 mx-auto hidden lg:flex flex-col items-center justify-center">
          <div className="grid grid-cols-2 items-start gap-16">
            <div className="relative p-12 gap-5 h-full w-full items-start bg-primaryBoxColor rounded-[20px]">
              <div className="pr-36 flex flex-col">
                <span className="text-white font-bold text-[24px] leading-[24px]">
                  Differentiation
                </span>
                <span className="text-primaryText font-normal leading-[18px] text-[18px] ">
                  Unique collateral methods, community-led, and VELAS-powered for
                  unmatched efficiency and security.
                </span>
                <span className="absolute w-[220px] right-[-23.334px] top-[-28.903px] rotate-[167.59]">
                  <img
                    src="/assets/Icon/differentiation.svg"
                    alt="differentiation"
                    className="w-[220px] h-[243px]"
                  />
                </span>
              </div>
            </div>
            <div className="relative p-12 gap-5 h-full w-full items-start bg-primaryBoxColor rounded-[20px]">
              <div className="pr-36 flex flex-col">
                <span className="text-white font-bold text-[24px] leading-[24px]">
                  Security
                </span>
                <span className="text-primaryText font-normal leading-[18px] text-[18px] max-w-[329px]">
                  Top-notch security with audits, transparent operations, and
                  robust risk controls.
                </span>
                <span className="absolute w-[220px] h-[243px] right-[-23.334px] top-[-30px] rotate-[167.59]">
                  <img
                    src="/assets/Image/RewardSecurity.svg"
                    className="w-[220px] h-[243px]"
                    alt="keySecurity"
                  />
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full md:px-24 lg:hidden px-6 flex flex-col">
          <div className="relative mt-16 h-[191px] flex flex-col p-6 gap-5 items-start flex-[1_0_0] bg-primaryBoxColor rounded-[20px]">
            <span className="text-white mt-20 font-bold text-lg leading-[24px]">
              Differentiation
            </span>
            <span className="text-primaryText font-normal leading-[18px] text-md max-w-[329px]">
              Unique collateral methods, community-led, and VELAS-powered for
              unmatched efficiency and security.
            </span>
            <span className="absolute -top-28 w-[150px] inset-0 m-auto rotate-[167.59]">
              <img
                src="/assets/Icon/differentiation.svg"
                alt="differentiation"
                className="w-[220px] h-[243px]"
              />
            </span>
          </div>
          <div className="relative mt-24 flex flex-col p-6 gap-5 items-start flex-[1_0_0] bg-primaryBoxColor rounded-[20px]">
            <span className="text-white mt-20 font-bold text-lg leading-[24px]">
              Security
            </span>
            <span className="text-primaryText font-normal leading-[18px] text-md max-w-[329px]">
              Top-notch security with audits, transparent operations, and
              robust risk controls.
            </span>
            <span className="absolute -top-28 w-[150px] inset-0 m-auto rotate-[167.59]">
              <img
                src="/assets/Image/RewardSecurity.svg"
                className="w-[220px] h-[243px]"
                alt="keySecurity"
              />
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default RewardFragment;
