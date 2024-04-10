import { Link } from "react-router-dom";
import Sidebar from "../sidebar";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { LANG_MAPPING } from "../../consts/lang";

const Header = () => {
  const { t, i18n } = useTranslation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  // const [selectedLang, setSelectedLang] = useState("en");

  const navigationItems = [
    {
      name: t("navigation.home"),
      link: "/",
    },
    {
      name: t("navigation.perpetual"),
      link: "/perpetual",
    },
    {
      name: t("navigation.governance"),
      link: "/governance",
    },
  ];

  const changeLanguage = (lang: string) => {
    setSelectedLang(lang);
    i18n.changeLanguage(lang);
  };

  const openSidebar = () => {
    setIsSidebarOpen(true);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  useEffect(() => {
    let lang = i18n.language;
    if (!lang) {
      lang = "en";
    }
    setSelectedLang(lang);
  }, [i18n.language]);

  return (
    <div className="fixed z-50 w-full">
      <div className="py-6 px-6 flex items-center container-xl w-full mx-auto font-Barlow bg-primaryBackground">
        <Link to="/">
          <img src="/logo.png" alt="logo" className="w-[115px] sm:w-[160px]" />
        </Link>
        <div className="hidden md:flex flex-row gap-8 items-start ml-8">
          {navigationItems.map((item, index) => (
            <Link
              to={item.link}
              key={index}
              className="text-[16px] font-medium leading-[16px] text-white"
            >
              {item.name}
            </Link>
          ))}
        </div>
        <div className="ml-auto flex">
          <select
            className="hidden md:block bg-primaryBackground text-white outline-none mr-4"
            value={selectedLang}
            onChange={(e) => changeLanguage(e.target.value)}
          >
            {Object.keys(LANG_MAPPING).map((lang, index) => (
              <option key={index} value={lang}>
                {LANG_MAPPING[lang as keyof typeof LANG_MAPPING]}
              </option>
            ))}
          </select>
          <Link
            target="_blank"
            to="/staking"
            className="hidden md:flex py-2 px-6 items-center rounded-full bg-primaryButtonColor text-white font-bold"
          >
            {t("navigation.stakingApp")}
          </Link>
          <img
            src="/assets/Icon/filter.svg"
            alt="filter"
            className="md:hidden w-[30px] h-[30px] cursor-pointer"
            onClick={openSidebar}
          />
        </div>
      </div>
      <Sidebar isOpen={isSidebarOpen} closeSidebar={closeSidebar} />
    </div>
  );
};

export default Header;
