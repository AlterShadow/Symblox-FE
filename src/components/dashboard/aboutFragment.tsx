const AboutFragment = () => {
  return (
    <>
      <div className="hidden lg:flex w-full py-16 px-0 justify-center items-center gap-[58px] flex-row font-Barlow">
        <div className="">
          <img src="/assets/Image/AboutBackground.png" alt="aboutBackground" />
        </div>
        <div className="flex flex-col items-start gap-[26px]">
          <span className="text-white text-[48px] font-bold leading-[48px]">
            About Symblox
          </span>
          <span className="text-[16px] font-normal leading-[16px] text-primaryText max-w-[625px]">
            Symblox links traditional finance and DeFi with transparency and
            community power. Simple, decentralized, and forward-thinking.
          </span>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center lg:hidden py-16">
        <div className="flex items-start relative">
          <img className='absolute inset-0 m-auto -z-10' src="/assets/Image/AboutBackground.png" alt="aboutBackground" />
          <div className="flex flex-col items-center justify-center gap-y-2 text-center px-4 pt-72">
            <span className="text-white text-2xl font-bold leading-[48px]">
              About Symblox
            </span>
            <span className="text-md font-normal leading-[18px] text-primaryText max-w-[625px]">
              Symblox links traditional finance and DeFi with transparency and
              community power. Simple, decentralized, and forward-thinking.
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutFragment;
