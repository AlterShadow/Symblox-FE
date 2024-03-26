const IntroFragment = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center justify-center font-Barlow w-full h-[960px] relative">
        <div className="flex gap-8 flex-col w-[1280px] mx-auto">
          <div className="flex flex-col justify-start gap-5">
            <span className="text-[20px] font-normal leading-[20px] text-white">
              Global assets access simplified
            </span>
            <span className="text-white text-[56px] font-bold leading-[61.6px] max-w-[643px]">
              Symblox - Trade
              <span className="inline-block text-gradient">
                Synthetic Assets
              </span>
              &nbsp;Easily
            </span>
            <span className="text-primaryText text-[16px] font-normal leading-[20px]">
              Mint and trade synthetic assets like crypto, commodities, and
              stocks easily.
            </span>
          </div>
          <button className="flex items-center w-[205px] h-[56px] py-[18px] px-10 gap-[10px] bg-[#EE2D82] rounded-[60px] text-white font-bold leading-[20px] text-[20px]">
            Discover More
          </button>
        </div>
        <div className="pt-[115px] pb-0 px-[54px] absolute bottom-0 right-[260px]">
          <img src="/assets/Image/IntroBackground.png" alt="IntroBackground" />
        </div>
      </div>
      <div
        className="max-w-[1514px] w-full h-[1px] mx-auto"
        style={{
          background:
            "linear-gradient(90deg, rgba(55, 95, 136, 0.00) 0%, #375F88 32%, #375F88 76.5%, rgba(55, 95, 136, 0.00) 100%)",
        }}
      ></div>
    </div>
  );
};

export default IntroFragment;
