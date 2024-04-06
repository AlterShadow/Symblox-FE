import { useState } from "react";
import { useTranslation } from 'react-i18next';

const PrivacyModal = () => {
  const { t } = useTranslation();

  const [showModal, setShowModal] = useState<boolean>(true);
  const [agreeActive, setAgreeActive] = useState<boolean>(false);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;
    const scrollPosition = scrollTop + clientHeight;
    const isScrollReached = scrollPosition >= scrollHeight;
    setAgreeActive(isScrollReached);
  };

  const handlerShowModal = () => {
    setShowModal(false);
  };

  if (!showModal) {
    return null; // Return null to hide the modal when `showModal` is false
  }

  return (
    <div className="fixed top-0 left-0 w-[100vw] h-[100vh] z-50 flex bg-[#0008] backdrop-blur-[2px]">
      <div className="m-auto w-[480px] sm:w-[335px] p-8 sm:p-5 gap-4 flex flex-col items-center rounded-[16px] sm:rounded-xl border border-[#293745] bg-primaryBoxColor font-Barlow">
        <div className="text-white text-[20px] sm:text-[18px] font-bold leading-[1em]">
          {t("privacy.symbloxStaking")}
        </div>
        <div className="text-primaryText text-[16px] sm:text-[14px] leading-[1em] font-normal">
          {t("privacy.byClickingIAgree")}:
        </div>
        <div
          className="overflow-y-auto will-change-scroll"
          onScroll={handleScroll}
        >
          <ul className="h-[400px] sm:h-[310px] pl-[1.5em] sm:pl-[1em] gap-[10px] flex flex-col items-center self-stretch">
            <li className="text-secondaryText text-[16px] sm:text-[14px] leading-[1em] font-normal list-disc">
              {t("privacy.symbloxIsABlockchain")}
            </li>
            <li className="text-secondaryText text-[16px] sm:text-[14px] leading-[1em] font-normal list-disc">
              {t("privacy.symbloxIsOffered")}
            </li>
            <li className="text-secondaryText text-[16px] sm:text-[14px] leading-[1em] font-normal list-disc">
              {t("privacy.noCentralEntity")}
            </li>
            <li className="text-secondaryText text-[16px] sm:text-[14px] leading-[1em] font-normal list-disc">
              {t("privacy.symbloxDAO")}
            </li>
            <li className="text-secondaryText text-[16px] sm:text-[14px] leading-[1em] font-normal list-disc">
              {t("privacy.youCanParticipate")}
            </li>
            <li className="text-secondaryText text-[16px] sm:text-[14px] leading-[1em] font-normal list-disc">
              {t("privacy.theRules")}
            </li>
            <li className="text-secondaryText text-[16px] sm:text-[14px] leading-[1em] font-normal list-disc">
              {t("privacy.yourUseOfSymblox")}
            </li>
            <li className="text-secondaryText text-[16px] sm:text-[14px] leading-[1em] font-normal list-disc">
              {t("privacy.theLawsThatApply")}
            </li>
            <li className="text-secondaryText text-[16px] sm:text-[14px] leading-[1em] font-normal list-disc">
              {t("privacy.byEntering")}
            </li>
            <li className="text-secondaryText text-[16px] sm:text-[14px] leading-[1em] font-normal list-disc">
              {t("privacy.youHereby")}
            </li>
            <li className="text-secondaryText text-[16px] sm:text-[14px] leading-[1em] font-normal list-disc">
              {t("privacy.youAgree")}
            </li>
            <li className="text-secondaryText text-[16px] sm:text-[14px] leading-[1em] font-normal list-disc">
              {t("privacy.youAreNot")}
            </li>
          </ul>
        </div>
        <button
          disabled={!agreeActive}
          onClick={handlerShowModal}
          className={`w-full px-8 py-[18px] justify-center items-center transition-all duration-300 ease-in-out h-10 flex rounded-[60px] border border-[#fff] text-[16px] font-bold leading-[1em] text-white ${
            !agreeActive ? "opacity-50 hover:cursor-not-allowed" : "opacity-100"
          }`}
        >
          {t("privacy.iAgree")}
        </button>
      </div>
    </div>
  );
};

export default PrivacyModal;
