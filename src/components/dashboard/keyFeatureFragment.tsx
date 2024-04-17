import React from "react";
import { useTranslation } from 'react-i18next';
import useScrollVisibility from "../../hooks/useScrollVisibility";

// Define a type for the feature items
type FeatureItem = {
  icon: string;
  alt: string;
  title: string;
  description: string;
};

const KeyFeatureFragment: React.FC = () => {
  const { t } = useTranslation();
  const isVisible = useScrollVisibility('key-feature-fragment', 0);

  // Create a constant array with the feature items
  const featureItems: FeatureItem[] = [
    {
      icon: "/assets/Icon/minting.svg",
      alt: "minting",
      title: t("keyFeature.mintingAndTrading"),
      description: t("keyFeature.mintingAndTrading.desc"),
    },
    {
      icon: "/assets/Icon/liquidity.svg",
      alt: "liquidity",
      title: t("keyFeature.liquidityOptions"),
      description: "Dive into deep liquidity pools.",
    },
    {
      icon: "/assets/Icon/oracle.svg",
      alt: "oracle",
      title: t("keyFeature.decentralizedOracle"),
      description: "Real-world data meets DeFi.",
    },
    {
      icon: "/assets/Icon/governance.svg",
      alt: "governance",
      title: t("keyFeature.governanceAndStaking"),
      description: "Your voice, your governance.",
    },
  ];

  return (
    <div className="flex md:pt-16 pb-[120px] px-6 md:px-36 gap-6 items-start justify-center relative font-Barlow">
      <div id="key-feature-fragment" className="flex flex-col lg:grid lg:grid-cols-3 gap-6 items-start justify-center mx-auto w-full">
        <div className="flex flex-col py-8 lg:py-16 items-start gap-6 flex-[1_0_0] self-stretch">
          <div className={`transition-all duration-1000 ease-in ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"} flex flex-col w-full items-center lg:items-start lg:gap-6 relative`}>
            <div className="absolute -z-10 bottom-[-109.716px]">
              <img
                src="/assets/Image/KeyFeatureStar.svg"
                alt="keyFeatureStar"
              />
            </div>
            <div className="hidden lg:flex flex-col items-start gap-1 text-[48px] font-bold leading-[48px]">
              <span className="text-white">{t("keyFeature.key")}</span>
              <span className="text-gradient">{t("keyFeature.features")}</span>
            </div>
            <div className="flex lg:hidden justify-center items-center text-2xl font-bold leading-[48px]">
              <span className="text-white">{t("keyFeature.key")}</span>
              <span className="text-gradient">&nbsp;{t("keyFeature.features")}</span>
            </div>
            <span className="text-center lg:text-start lg:max-w-[308px] text-md leading-[16px] font-normal text-primaryText">
              {t("keyFeature.experienceTheCore")}
            </span>
          </div>
        </div>
        <div className="col-span-2 grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8 items-start justify-start w-full">
          {featureItems.map((item, index) => (
            <div
              key={index}
              className={`transition-all duration-1000 delay-[${(index + 1) * 200}ms] ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"} flex flex-col gap-2 lg:gap-4 items-start p-6 lg:p-10 h-full w-full rounded-[12px] bg-primaryBoxColor`}
            >
              <div className="w-16 md:w-[96px] h-[96px]">
                <img
                  src={item.icon}
                  alt={item.alt}
                  className="w-[96px] h-[96px]"
                />
              </div>
              <div className="flex flex-col items-start gap-3">
                <span className="text-lg md:text-[24px] leading-[24px] font-semibold text-white">
                  {item.title}
                </span>
                <span className="text-md md:text-[16px] leading-[16px] font-normal text-primaryText">
                  {item.description}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="-z-10 absolute bottom-12 md:bottom-0 h-[124px] w-[1924px] md:w-full max-w-[1924px]">
        <img src="/assets/Image/KeyFeatureEllipse.svg" alt="KeyFeature" />
      </div>
    </div>
  );
};

export default KeyFeatureFragment;
