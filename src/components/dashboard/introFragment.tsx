import { useTranslation } from 'react-i18next';

const IntroFragment = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center">
      <div className="flex pt-56 md:pt-0 md:items-center justify-center font-Barlow w-full h-screen relative">
        <div className="flex gap-8 flex-col px-8 md:px-36 w-full mx-auto">
          <div className="flex flex-col justify-start md:gap-5">
            <div className="absolute w-[1024px]">
            <img src="/assets/SVG/HowItWorksEllipse.svg" alt="ellipse"/>
          </div>
            <span className="text-[20px] font-normal leading-[20px] text-white">
              {t("intro.globalAssets")}
            </span>
            <span className="text-white text-[42px] md:text-[56px] font-bold leading-[50px] md:leading-[61.6px] md:max-w-[643px]">
            {t("intro.symbloxTrade")}
              <div className="flex">
                <span className="inline-block text-gradient">
                {t("intro.syntheticAssets")}
                </span>
                <p className="hidden md:flex">&nbsp;{t("intro.easily")}</p>
              </div>
              <p className="md:hidden">{t("intro.easily")}</p>
            </span>
            <span className="text-primaryText text-[18px] mt-4 md:text-[16px] font-normal leading-[20px]">
            {t("intro.mintAndTrade")}
            </span>
          </div>
          <button className="flex items-center w-[205px] h-[56px] py-[18px] px-10 gap-[10px] bg-[#EE2D82] rounded-[60px] text-white font-bold leading-[20px] text-[20px]">
          {t("intro.discoverMore")}
          </button>
        </div>
        <div className="md:pt-[115px] -z-10 pb-0 md:px-[54px] absolute bottom-0 md:right-[calc(5%)]">
          <img src="/assets/Image/IntroBackground.png" alt="IntroBackground" />
        </div>
        <div className="absolute bottom-14 -left-8 w-[512px]">
            <img src="/assets/SVG/HowItWorksEllipse.svg" alt="ellipse"/>
          </div>
      </div>
      <div
        className=" w-full h-[1px] mx-auto"
        style={{
          background:
            "linear-gradient(90deg, rgba(55, 95, 136, 0.00) 0%, #375F88 32%, #375F88 76.5%, rgba(55, 95, 136, 0.00) 100%)",
        }}
      ></div>
    </div>
  );
};

export default IntroFragment;
