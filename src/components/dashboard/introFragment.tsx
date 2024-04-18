import { useTranslation } from "react-i18next";
import useScrollVisibility from "../../hooks/useScrollVisibility";

const IntroFragment = () => {
  const { t } = useTranslation();
  const isVisible = useScrollVisibility("intro-fragment", 0);

  return (
    <div id="intro-fragment" className="flex flex-col items-center">
      <div className="flex pt-56 md:pt-0 md:items-center justify-center font-Barlow w-full h-screen relative">
        <div className="flex gap-8 flex-col px-8 md:px-36 w-full mx-auto">
          <div className="flex flex-col justify-start md:gap-5">
            <div className="absolute w-[1024px] select-none">
              <img src="/assets/SVG/HowItWorksEllipse.svg" alt="ellipse" />
            </div>
            <span
              className={`transition-all duration-500 ease-in delay-300 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 -translate-y-5"
              } text-[20px] font-normal leading-[20px] text-white`}
            >
              {t("intro.globalAssets")}
            </span>
            <span
              className={`transition-all duration-500 ${
                isVisible ? "scale-100" : "scale-50"
              } text-white text-[42px] md:text-[56px] font-bold leading-[50px] md:leading-[61.6px] md:max-w-[643px]`}
            >
              {t("intro.symbloxTrade")}
              <div className="flex md:flex-col lg:flex-row">
                <span className="inline-block text-gradient">
                  {t("intro.syntheticAssets")}
                </span>
                <p className="hidden md:flex">&nbsp;{t("intro.easily")}</p>
              </div>
              <p className="md:hidden">{t("intro.easily")}</p>
            </span>
            <span
              className={`transition-all duration-500 delay-[600ms] ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-5"
              } text-primaryText text-[18px] mt-4 md:text-[16px] font-normal leading-[20px]`}
            >
              {t("intro.mintAndTrade")}
            </span>
          </div>
          <button
            className={`transition-all duration-500 delay-[900ms] ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            } flex items-center w-[205px] h-[56px] py-[18px] px-10 gap-[10px] bg-[#EE2D82] rounded-[60px] text-white font-bold leading-[20px] text-[20px]`}
          >
            {t("intro.discoverMore")}
          </button>
        </div>
        <div className="md:pt-[115px] -z-10 pb-0 md:px-[54px] absolute bottom-0 md:right-[calc(5%)] select-none pointer-events-none">
          <img src="/assets/Image/IntroBackground.png" alt="IntroBackground" />
        </div>
        <div className="absolute bottom-14 -left-8 w-[512px] select-none ">
          <img src="/assets/SVG/HowItWorksEllipse.svg" alt="ellipse" />
        </div>
      </div>
      <div
        className=" w-full h-[1px] mx-auto select-none"
        style={{
          background:
            "linear-gradient(90deg, rgba(55, 95, 136, 0.00) 0%, #375F88 32%, #375F88 76.5%, rgba(55, 95, 136, 0.00) 100%)",
        }}
      ></div>
    </div>
  );
};

export default IntroFragment;
