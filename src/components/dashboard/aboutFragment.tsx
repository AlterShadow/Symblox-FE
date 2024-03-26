const AboutFragment = () => {
  return (
    <>
      <div className="w-full py-16 px-0 justify-center items-center gap-[58px] flex flex-row font-Barlow">
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
    </>
  );
};

export default AboutFragment;
