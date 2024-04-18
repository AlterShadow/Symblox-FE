import { useTranslation } from 'react-i18next';
import useScrollVisibility from '../../hooks/useScrollVisibility';

const RewardFragment = () => {
  const { t } = useTranslation();
  const isVisible = useScrollVisibility("reward-fragment", 0);

  return (
    <>
      <div id="reward-fragment" className="pt-20 pb-16 mx-auto w-full font-Barlow">
        <div className="px-24 lg:px-36 mx-auto hidden lg:flex flex-col items-center justify-center">
          <div className="grid grid-cols-2 items-start gap-16">
            <div className={`transition-all duration-500 ease-in ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-20"} relative p-12 gap-5 h-full w-full items-start bg-primaryBoxColor rounded-[20px]`}>
              <div className="pr-36 flex flex-col">
                <span className="text-white font-bold font-Barlow text-[24px] leading-[24px]">
                  {t("reward.differentiation")}
                </span>
                <span className="text-primaryText font-Barlow leading-[18px] text-[18px] ">
                  {t("reward.uniqueCollateral")}
                </span>
                <span className="absolute w-[220px] right-[-23.334px] top-[-28.903px] rotate-[167.59]">
                  <img
                    src="/assets/Icon/differentiation.svg"
                    alt="differentiation"
                    className="w-[220px] h-[243px]"
                  />
                </span>
              </div>
            </div>
            <div className={`transition-all duration-500 ease-in delay-300 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-20"} relative p-12 gap-5 h-full w-full items-start bg-primaryBoxColor rounded-[20px]`}>
              <div className="pr-36 flex flex-col">
                <span className="text-white font-bold text-[24px] leading-[24px]">
                  {t("reward.security")}
                </span>
                <span className="text-primaryText font-normal leading-[18px] text-[18px] max-w-[329px]">
                  {t("reward.topNotchSecurity")}
                </span>
                <span className="absolute w-[220px] h-[243px] right-[-23.334px] top-[-30px] rotate-[167.59]">
                  <img
                    src="/assets/Image/RewardSecurity.svg"
                    className="w-[220px] h-[243px]"
                    alt="keySecurity"
                  />
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full md:px-24 font-Barlow lg:hidden px-6 flex flex-col">
          <div className={`transition-all duration-500 ease-in ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-20"} relative mt-16 h-[191px] flex flex-col p-6 gap-5 items-start flex-[1_0_0] bg-primaryBoxColor rounded-[20px]`}>
            <span className="text-white mt-20 font-bold text-lg leading-[24px]">
              {t("reward.differentiation")}
            </span>
            <span className="text-primaryText font-Barlow leading-[18px] text-md max-w-[329px]">
              {t("reward.uniqueCollateral")}
            </span>
            <span className="absolute -top-28 w-[150px] inset-0 m-auto rotate-[167.59]">
              <img
                src="/assets/Icon/differentiation.svg"
                alt="differentiation"
                className="w-[220px] h-[243px]"
              />
            </span>
          </div>
          <div className={`transition-all duration-500 ease-in delay-300 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-20"} relative mt-24 flex flex-col p-6 gap-5 items-start flex-[1_0_0] bg-primaryBoxColor rounded-[20px]`}>
            <span className="text-white mt-20 font-bold text-lg leading-[24px]">
              {t("reward.security")}
            </span>
            <span className="text-primaryText font-Barlow leading-[18px] text-md max-w-[329px]">
              {t("reward.topNotchSecurity")}
            </span>
            <span className="absolute -top-28 w-[150px] font-Barlow inset-0 m-auto rotate-[167.59]">
              <img
                src="/assets/Image/RewardSecurity.svg"
                className="w-[220px] h-[243px]"
                alt="keySecurity"
              />
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default RewardFragment;
