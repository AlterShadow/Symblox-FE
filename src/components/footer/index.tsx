import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";

const Footer = () => {
  return (
    <>
      <div className="pt-10 px-0 pb-16 flex items-start justify-center gap-10 font-Barlow w-full border-t border-[#ffffff33]">
        <div className="w-[560px] flex flex-col items-start gap-8">
          <Link to="/">
            <img src="/logo.png" alt="logo" className="w-[160px]" />
          </Link>
          <span className="max-w-[490px] text-primaryText text-[16px] font-normal leading-[16px]">
            Symblox links traditional finance and DeFi with transparency and
            community power. Simple, decentralized, and forward-thinking.
          </span>
          <span className="text-[#7F93A2] text-[14px] font-normal leading-[14px]">
            Copyright © 2024 Symblox. All rights reserved.
          </span>
        </div>
        <div className="w-[200px] flex flex-col items-start gap-[29px]">
          <span className="text-white text-[14px] font-normal leading-[14px] tracking-[2px]">
            SYMBLOX
          </span>
          <div className="flex flex-col items-start gap-4 text-primaryText">
            <Link to="/" className="text-[16px] leading-[16px] font-normal">
              Home
            </Link>
            <Link to="/faq" className="text-[16px] leading-[16px] font-normal">
              FAQ
            </Link>
            <Link
              to="/contact"
              className="text-[16px] leading-[16px] font-normal"
            >
              Contact
            </Link>
          </div>
        </div>
        <div className="w-[200px] flex flex-col items-start gap-[29px]">
          <span className="text-white text-[14px] font-normal leading-[14px] tracking-[2px]">
            SYMBLOX
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
        <div className="w-[200px] flex flex-col items-end gap-[19px] text-white">
          <span className="text-[14px] font-normal leading-[14px] tracking-[2px]">
            GET CONNECTED
          </span>
          <div className="flex justify-end items-center gap-6">
            <Link to="/">
              <Icon icon="mingcute:telegram-fill" color="white" width={24} />
            </Link>
            <Link to="/">
              <img src="/assets/Icon/twitter.svg" alt="twitter" />
            </Link>
            <Link to="/">
              <img src="/assets/Icon/github.svg" alt="github" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
