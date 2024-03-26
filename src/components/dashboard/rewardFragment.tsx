const RewardFragment = () => {
  return (
    <>
      <div className="pt-20 pb-16 px-0 max-w-[1920px] mx-auto w-full font-Barlow">
        <div className="w-full max-w-[1280px] mx-auto flex flex-col gap-16 items-center justify-center">
          <div className="flex flex-row items-center justify-center"></div>
          <div className="absolute w-full flex items-center justify-center">
            <div className="w-[726px] h-[352px] rounded-[726px] blur-[80px] bg-[rgba(215, 73, 136, 0.16)]" />
          </div>
          <div className="flex flex-row items-start gap-16">
            <div className="relative h-[191px] flex flex-col p-12 gap-5 items-start flex-[1_0_0] bg-primaryBoxColor rounded-[20px] max-w-[608px] w-[608px]">
              <span className="text-white font-bold text-[24px] leading-[24px]">
                Differentiation
              </span>
              <span className="text-primaryText font-normal leading-[18px] text-[18px] max-w-[329px]">
                Unique collateral methods, community-led, and VELAS-powered for
                unmatched efficiency and security.
              </span>
              <span className="absolute w-[220px] h-[243px] right-[-23.334px] top-[-18.903px] rotate-[167.59]">
                <img
                  src="/assets/Icon/differentiation.svg"
                  alt="differentiation"
                  className="w-[220px] h-[243px]"
                />
              </span>
            </div>
            <div className="relative h-[191px] flex flex-col p-12 gap-5 items-start flex-[1_0_0] bg-primaryBoxColor rounded-[20px] max-w-[608px] w-[608px]">
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
    </>
  );
};

export default RewardFragment;
