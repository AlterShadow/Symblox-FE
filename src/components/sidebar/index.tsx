import type React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { LANG_MAPPING } from "../../consts/lang";

interface SidebarProps {
  isOpen: boolean;
  closeSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, closeSidebar }) => {
  const { t, i18n } = useTranslation();

  const [selectedLang, setSelectedLang] = useState("en");

  const sidebarItems = [
    {
      id: 1,
      name: t("navigation.home"),
      link: "/home",
    },
    {
      id: 2,
      name: t("navigation.perpetual"),
      link: "/perpetual",
    },
    {
      id: 3,
      name: t("navigation.governance"),
      link: "/governance",
    },
  ];

  const changeLanguage = (lang: string) => {
    setSelectedLang(lang);
    i18n.changeLanguage(lang);
  };

  useEffect(() => {
    let lang = i18n.language;
    if (!lang) {
      lang = "en";
    }
    setSelectedLang(lang);
  }, [i18n.language]);

  return (
    <div
      className={`fixed inset-y-0 right-0 z-50 flex flex-col w-64 bg-primaryBoxColor shadow-md transform transition-transform ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {/* Close button */}
      <button
        type="button"
        className="p-3 ml-auto text-white"
        onClick={closeSidebar}
      >
        {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      {/* Menu content */}
      <div className="px-5 py-3">
        {sidebarItems.map((item) => (
          <Link
            to={item.link}
            key={item.id}
            className="block py-2 px-4 text-white text-lg font-medium hover:bg-gray-800"
          >
            {item.name}
          </Link>
        ))}
        <hr className="text-white opacity-20 mt-4 mb-6" />
        <select
          className="bg-primaryBoxColor text-white outline-none mr-4 px-3"
          value={selectedLang}
          onChange={(e) => changeLanguage(e.target.value)}
        >
          {Object.keys(LANG_MAPPING).map((lang, index) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
            <option key={index} value={lang}>
              {LANG_MAPPING[lang as keyof typeof LANG_MAPPING]}
            </option>
          ))}
        </select>
        <Link
          to="/staking"
          className="flex py-2 px-6 mt-4 mx-4 items-center justify-center rounded-full bg-primaryButtonColor text-white font-bold"
        >
          {t("navigation.stakingApp")}
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
