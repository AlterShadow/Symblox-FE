import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAccount } from "wagmi";

const AppHeader = () => {
  const { t } = useTranslation();
  const { address } = useAccount();

  return (
    <>
      <div className="fixed z-50 w-full font-Barlow border-b border-[rgba(255,255,255,0.2)] px-5 sm:px-5 md:px-10">
        <div className="py-6 sm:py-3 md:py-3 flex items-center justify-between max-w-[1276px] w-full mx-auto font-Barlow bg-primaryBackground">
          <div className="flex flex-row gap-[15px] items-center sm:gap-2 md:gap-[10px]">
            <Link to="/">
              <img
                src="/logo.png"
                alt="logo"
                className="lg:block w-[180px] hidden"
              />
              <img
                src="/favicon.svg"
                alt="logo"
                className="w-8 h-8 lg:hidden block"
              />
            </Link>
            <div className="h-6 sm:h-4 md:h-5 bg-primaryButtonColor inline-flex py-1 px-2 items-center justify-center gap-[10px] rounded-[4px] text-white text-[12px] leading-[1em] font-normal uppercase sm:text-[10px] sm:font-medium md:font-medium">
              {t("header.staking")}
            </div>
          </div>
          <div className="flex flex-row items-center gap-[31px] sm:gap-3 md:gap-5">
            <div id="wallet-button">
              <ConnectButton label={t("header.connectWallet")} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AppHeader;
