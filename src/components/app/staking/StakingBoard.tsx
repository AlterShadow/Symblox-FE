import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';

import PrivacyModal from "../modal/privacy";

const StakingBoard = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();
  const stakingHandler = () => {
    navigate("/staking/mint");
  };
  return (
    <>
      <div className="pt-[55px] pb-8 w-full min-h-screen font-Barlow px-5 sm:px-5 md:px-10">
        <div className="max-w-[1276px] mx-auto w-full flex flex-col gap-11">
          <div className="flex flex-row justify-between items-center gap-6 sm:flex-col md:flex-col sm:gap-4 md:gap-5">
            <div className="flex flex-col h-[268px] sm:h-full md:h-full gap-4 flex-[1_0_0] bg-primaryBoxColor py-[34px] px-6 rounded-2xl items-start justify-between w-full">
              <div className="flex flex-col gap-3 pr-14 items-start self-stretch relative">
                <div className="absolute right-0 top-0">
                  <img
                    src="/assets/Icon/governance.svg"
                    alt="governance"
                    className="w-[62.9px] h-16"
                  />
                </div>
                <p className="text-white text-[14px] font-normal leading-[1em]">
                  {t("stakingBoard.step1")}
                </p>
                <p className="text-white text-[24px] font-bold leading-[1em]">
                  {t("stakingBoard.stakeAndBorrow")}
                </p>
                <p className="text-white text-[16px] font-normal leading-[1em]">
                  {t("stakingBoard.borrowSUSD")}
                </p>
              </div>
              <button
                className="h-10 py-[18px] sm:px-8 md:px-8 px-6 flex items-center gap-[10px] rounded-[60px] bg-primaryButtonColor text-white text-[16px] font-bold leading-[16px] sm:min-w-[190px] md:min-w-[190px] text-center justify-center"
                onClick={stakingHandler}
              >
                {t("stakingBoard.startStaking")}
              </button>
            </div>
            <div className="flex flex-col h-[268px] sm:h-full md:h-full gap-4 flex-[1_0_0] bg-primaryBoxColor py-[34px] px-6 rounded-xl items-start justify-between opacity-50 w-full">
              <div className="flex flex-col gap-3 pr-14 items-start self-stretch relative">
                <div className="absolute right-0 top-0">
                  <img
                    src="/assets/Icon/collateral.svg"
                    alt="collateral"
                    className="w-16 h-16"
                  />
                </div>
                <p className="text-white text-[14px] font-normal leading-[1em]">
                  {t("stakingBoard.step2")}
                </p>
                <p className="text-white text-[24px] font-bold leading-[1em] self-stretch">
                  {t("stakingBoard.maintainCollateralization")}
                </p>
                <p className="text-white text-[16px] font-normal leading-[1em]">
                  {t("stakingBoard.useTheBurn")}
                </p>
              </div>
              <button className="h-10 py-[18px] sm:px-8 md:px-8 px-6 flex items-center gap-[10px] rounded-[60px] text-white text-[16px] font-bold leading-[16px] border border-white sm:min-w-[190px] md:min-w-[190px]">
                {t("stakingBoard.cRatioExplained")}
              </button>
            </div>
            <div className="flex flex-col h-[268px] sm:h-full md:h-full gap-4 flex-[1_0_0] bg-primaryBoxColor py-[34px] px-6 rounded-xl items-start justify-between opacity-50 w-full">
              <div className="flex flex-col gap-3 pr-14 items-start self-stretch relative">
                <div className="absolute right-0 top-0">
                  <img
                    src="/assets/Icon/reward.svg"
                    alt="reward"
                    className="w-16 h-16"
                  />
                </div>
                <p className="text-white text-[14px] font-normal leading-[1em]">
                  {t("stakingBoard.step3")}
                </p>
                <p className="text-white text-[24px] font-bold leading-[1em] self-stretch">
                  {t("stakingBoard.collectRewards")}
                </p>
                <p className="text-white text-[16px] font-normal leading-[1em]">
                  {t("stakingBoard.maintainYourTarget")}
                </p>
              </div>
              <button className="h-10 py-[18px] sm:px-8 md:px-8 px-6 flex items-center gap-[10px] rounded-[60px] text-white text-[16px] font-bold leading-[16px] border border-white sm:min-w-[190px] md:min-w-[190px]">
                {t("stakingBoard.rewardsExplained")}
              </button>
            </div>
          </div>
          <div className="w-full flex flex-row sm:flex-col md:flex-col mx-auto justify-center">
            <Link
              to="/"
              className="w-1/4 sm:w-full md:w-full p-5 flex flex-col gap-2 border border-[#293745] rounded-bl-xl rounded-tl-xl sm:rounded-bl-none md:rounded-bl-none sm:rounded-tr-xl md:rounded-tr-xl"
            >
              <p className="text-[14px] leading-[1em] font-normal text-white">
                {t("stakingBoard.estimatedAPR")}
              </p>
              <p className="text-[20px] leading-[1em] font-bold text-white">
                ••••%
              </p>
              <p className="text-[14px] leading-[1em] font-normal text-secondaryText">
                {t("stakingBoard.connectWalletFirst")}
              </p>
            </Link>
            <Link
              to="/"
              className="w-1/4 sm:w-full md:w-full p-5 flex flex-col gap-2 border border-[#293745] border-l-0 justify-center sm:border-l md:border-l"
            >
              <p className="text-[20px] leading-[1em] font-bold text-white">
                {t("stakingBoard.SNXBridge")}
              </p>
              <p className="text-[14px] leading-[1em] font-normal text-secondaryText">
                {t("stakingBoard.transferAsset")}
              </p>
            </Link>
            <Link
              to="/"
              className="w-1/4 sm:w-full md:w-full p-5 flex flex-col gap-2 border border-[#293745] border-l-0 justify-center sm:border-l md:border-l"
            >
              <p className="text-[20px] leading-[1em] font-bold text-white">
                {t("stakingBoard.hedgeDebt")}
              </p>
              <p className="text-[14px] leading-[1em] font-normal text-secondaryText">
                {t("stakingBoard.buyDSNX")}
              </p>
            </Link>
            <Link
              to="/"
              className="w-1/4 sm:w-full md:w-full p-5 flex flex-col gap-2 border border-[#293745] border-l-0 rounded-br-xl rounded-tr-xl sm:rounded-tr-none md:rounded-tr-none sm:border-l md:border-l sm:rounded-bl-xl md:rounded-bl-xl justify-center "
            >
              <p className="text-[20px] leading-[1em] font-bold text-white">
                {t("stakingBoard.help")}
              </p>
              <p className="text-[14px] leading-[1em] font-normal text-secondaryText">
                {t("stakingBoard.learnMoreAbout")}
              </p>
            </Link>
          </div>
        </div>
      </div>
      <PrivacyModal />
    </>
  );
};

export default StakingBoard;
