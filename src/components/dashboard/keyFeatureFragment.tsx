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
    <div className="flex pt-16 pb-[120px] px-0 gap-6 items-start justify-center relative font-Barlow">
      <div className="flex flex-row gap-6 items-start justify-center max-w-[1280px] mx-auto w-full">
        <div className="flex flex-col py-16 items-start gap-6 flex-[1_0_0] self-stretch">
          <div className="flex flex-col items-start gap-6 relative">
            <div className="absolute bottom-[-109.716px]">
              <img
                src="/assets/Image/KeyFeatureStar.svg"
                alt="keyFeatureStar"
              />
            </div>
            <div className="flex flex-col items-start gap-1 text-[48px] font-bold leading-[48px]">
              <span className="text-white">Key</span>
              <span className="text-gradient">Features</span>
            </div>
            <span className="max-w-[308px] text-[16px] leading-[16px] font-normal text-primaryText">
              Experience the core of our platform's Key Features, providing a
              dynamic array of tools and opportunities.
            </span>
          </div>
        </div>
        <div className="flex flex-wrap items-start justify-start gap-6 w-full max-w-[828px]">
          {featureItems.map((item, index) => (
            <div
              key={index}
              className="flex flex-col gap-5 items-start p-10 rounded-[12px] bg-primaryBoxColor w-[399px]"
            >
              <div className="w-[96px] h-[96px]">
                <img
                  src={item.icon}
                  alt={item.alt}
                  className="w-[96px] h-[96px]"
                />
              </div>
              <div className="flex flex-col items-start gap-3">
                <span className="text-[24px] leading-[24px] font-semibold text-white">
                  {item.title}
                </span>
                <span className="text-[16px] leading-[16px] font-normal text-primaryText">
                  {item.description}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="absolute bottom-0 h-[124px] w-full max-w-[1924px]">
        <img src="/assets/Image/KeyFeatureEllipse.svg" alt="KeyFeature" />
      </div>
    </div>
  );
};

export default KeyFeatureFragment;
