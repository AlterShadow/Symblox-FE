import { useState, useEffect } from "react";
import Loader from "./Loader";
import NextBack from "./NextBack";
import { useTranslation } from "react-i18next";

const Escrow = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("staking");
  const [clickedTab, setClickedTab] = useState("");

  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName);
    setClickedTab(tabName);
  };

  useEffect(() => {
    setClickedTab("staking");
  }, []);
  return (
    <div className="relative pt-[138px] lg:pb-[112px] pb-8 sm: w-full font-Barlow px-5 md:px-10 lg:px-5">
      <div className="max-w-[1276px] mx-auto w-full flex gap-[48px] items-center">
        <div className="flex flex-col justify-center items-center md:pt-0 pt-10 md:h-screen h-full w-full md:w-screen">
          <div className="flex md:flex-row flex-col md:gap-0 gap-5 items-center lg:w-[60%] md:w-[70%] w-[90%] justify-around">
            <div className="flex flex-col items-center justify-center">
              <h2 className="text-[#31D8A4] pb-[5px] text-[14px] font-bold">
                {t("escrow.totalAvailableSBX")}
              </h2>
              <p className="text-[24px] font-semibold text-white">0.00</p>
            </div>
            <div className="flex flex-col items-center justify-center">
              <h2 className="text-[#31D8A4] pb-[5px] text-[14px] font-bold">
                {t("escrow.totalSBXEscrowed")}
              </h2>
              <p className="text-[32px] font-semibold text-shadow">0.00</p>
            </div>
            <div className="flex flex-col items-center justify-center">
              <h2 className="text-[#31D8A4] pb-[5px] text-[14px] font-bold">
                {t("escrow.totalSBXVested")}
              </h2>
              <p className="text-[24px] font-semibold text-white">0.00</p>
            </div>
          </div>

          <div className="flex md:flex-row flex-col gap-5 lg:w-[60%] pt-10 md:w-[70%] w-[90%]">
            <div className="flex flex-col shadow-lg shadow-black md:w-[50%] w-full mt-4">
              <div className="flex">
                <button
                  type="button"
                  className={`focus:outline-none font-bold text-[14px] h-[60px] w-full ${
                    activeTab === "staking"
                      ? "border-t-2 border-[#00d1ff] text-white"
                      : "border-t-2 border-transparent text-white hover:border-[#00d1ff]"
                  }`}
                  onClick={() => handleTabClick("staking")}
                >
                  {t("escrow.stakingRewards")}
                </button>
                <button
                  type="button"
                  className={`focus:outline-none font-bold text-[14px] h-[60px w-full ${
                    activeTab === "tokenSale"
                      ? "border-t-2 border-[#FC8738] text-white"
                      : "border-t-2 border-transparent text-white hover:border-[#FC8738]"
                  }`}
                  onClick={() => handleTabClick("tokenSale")}
                >
                  {t("escrow.tokenSale")}
                </button>
              </div>
              {clickedTab && (
                <div className="mt-4 text-white">
                  <div className="flex flex-col pt-10 items-center justify-center gap-2">
                    <div>
                      <img
                        src="/favicon.svg"
                        className="rounded-full w-10 h-10"
                        alt=""
                      />
                    </div>
                    <h2 className="text-[24px] text-white font-bold">
                      0.00 SBX
                    </h2>
                  </div>
                  <div className="flex items-center border-b border-white border-opacity-20 px-4 pb-2 pt-10 justify-between">
                    <p className="text-white font-bold text-opacity-40">
                      {t("escrow.gasPrice")}
                    </p>
                    <div className="font-bold">
                      -{" "}
                      <button
                        type="button"
                        className="text-[14px] font-semibold text-[#00d1ff]"
                      >
                        {t("escrow.edit")}
                      </button>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="bg-[#00d1ff80] h-[40px] w-full rounded-[4px] cursor-not-allowed mt-10"
                  >
                    {t("escrow.validateSBX")}
                  </button>
                </div>
              )}
            </div>
            <div className="md:w-[50%] w-full mt-4">
              <div>
                <h2 className="font-bold text-[14px] pb-3 text-white">
                  {t("escrow.vestYourSBX")}
                </h2>
                <p className="text-[14px] text-white text-opacity-40">
                  {t("escrow.vestSBXExlain")}
                </p>
              </div>
              <div className="flex items-center border-b border-t border-white border-opacity-20 pb-5 mt-10 pt-8 justify-between">
                <p className="text-white font-bold text-opacity-40">
                  {t("escrow.vestingDate")}
                </p>
                <p className="text-white font-bold text-opacity-40">SBX</p>
              </div>
              <div className="flex justify-center items-center pt-10">
                <Loader />
              </div>

              <div>
                <NextBack />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Escrow;
