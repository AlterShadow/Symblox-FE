import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";

const Footer = () => {
  return (
    <>
      <div className="pt-10 px-5 pb-16 flex items-start justify-center gap-10 sm:gap-8 font-Barlow w-full border-t border-[#ffffff33] sm:px-5 md:px-10 sm:flex-col">
        <div className="sm:hidden w-[560px] flex flex-col items-start gap-8 sm:gap-4 md:gap-6 sm:w-full md:w-full">
          <Link to="/">
            <img
              src="/logo.png"
              alt="logo"
              className="w-[160px] sm:w-[100px] md:w-[120px]"
            />
          </Link>
          <span className="max-w-[490px] text-primaryText text-[16px] sm:text-[14px] md:text-[14px] font-normal leading-[1em]">
            Symblox links traditional finance and DeFi with transparency and
            community power. Simple, decentralized, and forward-thinking.
          </span>
          <span className="text-[#7F93A2] text-[14px] font-normal leading-[1em] md:text-[12px] sm:text-[12px]">
            Copyright © 2024 Symblox. All rights reserved.
          </span>
        </div>
        <div className="w-[200px] flex flex-col items-start gap-[29px] sm:gap-4 md:gap-6">
          <span className="text-white text-[14px] font-normal leading-[14px] tracking-[2px]">
            SYMBLOX
          </span>
          <div className="flex flex-col items-start gap-4 text-primaryText">
            <Link
              to="/"
              className="text-[16px] sm:text-[14px] leading-[1em] font-normal"
            >
              Home
            </Link>
            <Link
              to="/faq"
              className="text-[16px] sm:text-[14px] leading-[1em] font-normal"
            >
              FAQ
            </Link>
            <Link
              to="/contact"
              className="text-[16px] sm:text-[14px] leading-[1em] font-normal"
            >
              Contact
            </Link>
          </div>
        </div>
        <div className="w-[200px] flex flex-col items-start gap-[29px] sm:gap-4 md:gap-6">
          <span className="text-white text-[14px] font-normal leading-[14px] tracking-[2px]">
            DAPPS
          </span>
          <div className="flex flex-col items-start gap-4 text-primaryText">
            <Link
              to="/staking"
              className="text-[16px] leading-[16px] font-normal"
            >
              Staking
            </Link>
            <Link
              to="/vault"
              className="text-[16px] leading-[16px] font-normal"
            >
              Vault
            </Link>
          </div>
        </div>
        <div className="w-[200px] flex flex-col items-end sm:items-start gap-[19px] sm:gap-3 text-white">
          <span className="text-[14px] font-normal leading-[1em] tracking-[2px]">
            GET CONNECTED
          </span>
          <div className="flex justify-end items-center gap-6">
            <Link to="/">
              <Icon
                icon="mingcute:telegram-fill"
                color="white"
                className="w-6 h-6 md:w-4"
              />
            </Link>
            <Link to="/">
              <img
                src="/assets/Icon/twitter.svg"
                alt="twitter"
                className="w-6 h-6 md:w-4"
              />
            </Link>
            <Link to="/">
              <img
                src="/assets/Icon/github.svg"
                alt="github"
                className="w-6 h-6 md:w-4"
              />
            </Link>
          </div>
        </div>
        <div className="hidden w-[560px] sm:flex flex-col items-start gap-8 sm:gap-4 md:gap-6 sm:w-full md:w-full">
          <Link to="/">
            <img
              src="/logo.png"
              alt="logo"
              className="w-[160px] sm:w-[100px] md:w-[120px]"
            />
          </Link>
          <span className="max-w-[490px] text-primaryText text-[16px] sm:text-[14px] md:text-[14px] font-normal leading-[1em]">
            Symblox links traditional finance and DeFi with transparency and
            community power. Simple, decentralized, and forward-thinking.
          </span>
          <span className="text-[#7F93A2] text-[14px] font-normal leading-[1em] md:text-[12px] sm:text-[12px]">
            Copyright © 2024 Symblox. All rights reserved.
          </span>
        </div>
      </div>
    </>
  );
};

export default Footer;
