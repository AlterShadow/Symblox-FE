import { useTranslation } from 'react-i18next';

const GetStartedFragment = () => {
    const { t } = useTranslation();

    return (
        <div className="px-6 md:px-24 font-Barlow mt-[120px] mb-16 lg:px-36">
            <div className="flex flex-col text-white bg-primaryBoxColor rounded-[12px] p-6">
                <span className="font-semibold text-xl">{t("getStarted.getStarted")}</span>
                <span className="mt-2 text-primaryText text-md">{t("getStarted.startTrading")}</span>
                <div className="flex mt-2">
                <button className="py-2 bg-[#EE2D82] rounded-[60px] px-10 text-white font-bold">{t("getStarted.learnMore")}</button>
                </div>
            </div>
        </div>
    )
}

export default GetStartedFragment;