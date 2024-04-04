import React from "react";

// Define a type for the feature items
type FeatureItem = {
  icon: string;
  alt: string;
  title: string;
  description: string;
};

// Create a constant array with the feature items
const featureItems: FeatureItem[] = [
  {
    icon: "/assets/Icon/minting.svg",
    alt: "minting",
    title: "Minting and Trading",
    description: "Create and exchange assets effortlessly.",
  },
  {
    icon: "/assets/Icon/liquidity.svg",
    alt: "liquidity",
    title: "Liquidity Options",
    description: "Dive into deep liquidity pools.",
  },
  {
    icon: "/assets/Icon/oracle.svg",
    alt: "oracle",
    title: "Decentralized Oracle",
    description: "Real-world data meets DeFi.",
  },
  {
    icon: "/assets/Icon/governance.svg",
    alt: "governance",
    title: "Governance & Staking",
    description: "Your voice, your governance.",
  },
];

const KeyFeatureFragment: React.FC = () => {
  return (
    <div className="flex md:pt-16 pb-[120px] px-6 md:px-36 gap-6 items-start justify-center relative font-Barlow">
      <div className="flex flex-col lg:grid lg:grid-cols-3 gap-6 items-start justify-center mx-auto w-full">
        <div className="flex flex-col py-8 lg:py-16 items-start gap-6 flex-[1_0_0] self-stretch">
          <div className="flex flex-col w-full items-center lg:items-start lg:gap-6 relative">
            <div className="absolute -z-10 bottom-[-109.716px]">
              <img
                src="/assets/Image/KeyFeatureStar.svg"
                alt="keyFeatureStar"
              />
            </div>
            <div className="hidden lg:flex flex-col items-start gap-1 text-[48px] font-bold leading-[48px]">
              <span className="text-white">Key</span>
              <span className="text-gradient">Features</span>
            </div>
            <div className="flex lg:hidden justify-center items-center text-2xl font-bold leading-[48px]">
              <span className="text-white">Key</span>
              <span className="text-gradient">&nbsp;Features</span>
            </div>
            <span className="text-center lg:text-start lg:max-w-[308px] text-md leading-[16px] font-normal text-primaryText">
              Experience the core of our platform's Key Features, providing a
              dynamic array of tools and opportunities.
            </span>
          </div>
        </div>
        <div className="col-span-2 grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8 items-start justify-start w-full">
          {featureItems.map((item, index) => (
            <div
              key={index}
              className="flex flex-col gap-2 lg:gap-4 items-start p-6 lg:p-10 h-full w-full rounded-[12px] bg-primaryBoxColor"
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
