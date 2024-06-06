import { useState } from "react";
import { useTranslation } from "react-i18next";

const PrivacyModal = () => {
  const { t } = useTranslation();
  const [show, setShow] = useState(
    localStorage.getItem("showModal") !== "false"
  );
  const [agree, setAgree] = useState(false);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;
    setAgree(scrollTop + clientHeight >= scrollHeight);
  };

  const handleClose = () => {
    localStorage.setItem("showModal", "false");
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed top-0 left-0 w-[100vw] h-[100vh] z-50 flex bg-[#0008] backdrop-blur-[2px]">
      <div className="m-auto sm:w-[480px] w-[335px] p-8 sm:p-5 gap-4 flex flex-col items-center sm:rounded-[16px] rounded-xl border border-[#293745] bg-primaryBoxColor font-Barlow">
        <div className="text-white sm:text-[20px] text-[18px] font-bold leading-[1em]">
          {t("privacy.symbloxStaking")}
        </div>
        <div className="text-primaryText sm:text-[16px] text-[14px] leading-[1em] font-normal">
          {t("privacy.byClickingIAgree")}
        </div>
        <div
          className="overflow-y-auto will-change-scroll"
          onScroll={handleScroll}
        >
          <ul className="sm:h-[400px] h-[310px] sm:pl-[1.5em] pl-[1em] gap-[10px] flex flex-col items-center self-stretch">
            <li className="text-secondaryText sm:text-[16px] text-[14px] leading-[1em] font-normal list-disc">
              {t("privacy.symbloxIsABlockchain")}
            </li>
            <li className="text-secondaryText text-[14px] sm:text-[16px] leading-[1em] font-normal list-disc">
              {t("privacy.symbloxIsOffered")}
            </li>
            <li className="text-secondaryText text-[14px] sm:text-[16px] leading-[1em] font-normal list-disc">
              {t("privacy.noCentralEntity")}
            </li>
            <li className="text-secondaryText text-[14px] sm:text-[16px] leading-[1em] font-normal list-disc">
              {t("privacy.symbloxDAO")}
            </li>
            <li className="text-secondaryText text-[14px] sm:text-[16px] leading-[1em] font-normal list-disc">
              {t("privacy.youCanParticipate")}
            </li>
            <li className="text-secondaryText text-[14px] sm:text-[16px] leading-[1em] font-normal list-disc">
              {t("privacy.theRules")}
            </li>
            <li className="text-secondaryText text-[14px] sm:text-[16px] leading-[1em] font-normal list-disc">
              {t("privacy.yourUseOfSymblox")}
            </li>
            <li className="text-secondaryText text-[14px] sm:text-[16px] leading-[1em] font-normal list-disc">
              {t("privacy.theLawsThatApply")}
            </li>
            <li className="text-secondaryText text-[14px] sm:text-[16px] leading-[1em] font-normal list-disc">
              {t("privacy.byEntering")}
            </li>
            <li className="text-secondaryText text-[14px] sm:text-[16px] leading-[1em] font-normal list-disc">
              {t("privacy.youHereby")}
            </li>
            <li className="text-secondaryText text-[14px] sm:text-[16px] leading-[1em] font-normal list-disc">
              {t("privacy.youAgree")}
            </li>
            <li className="text-secondaryText text-[14px] sm:text-[16px] leading-[1em] font-normal list-disc">
              {t("privacy.youAreNot")}
            </li>
          </ul>
        </div>
        <button
          type="button"
          disabled={!agree}
          onClick={handleClose}
          className={`w-full px-8 py-[18px] justify-center items-center transition-all duration-300 ease-in-out h-10 flex rounded-[60px] border border-[#fff] text-[16px] font-bold leading-[1em] text-white ${
            !agree ? "opacity-50 hover:cursor-not-allowed" : "opacity-100"
          }`}
        >
          {t("privacy.iAgree")}
        </button>
      </div>
    </div>
  );
};

export default PrivacyModal;
