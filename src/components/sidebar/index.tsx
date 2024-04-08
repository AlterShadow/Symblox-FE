import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';

interface SidebarProps {
  isOpen: boolean;
  closeSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, closeSidebar }) => {
  const { t } = useTranslation();

  const sidebarItems = [
    {
      name: t("navigation.home"),
      link: "/home",
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

  return (
    <div
      className={`fixed inset-y-0 right-0 z-50 flex flex-col w-64 bg-primaryBoxColor shadow-md transform transition-transform ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {/* Close button */}
      <button className="p-3 ml-auto text-white" onClick={closeSidebar}>
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
        {sidebarItems.map((item, index) => (
          <Link
            to={item.link}
            key={index}
            className="block py-2 px-4 text-white text-lg font-medium hover:bg-gray-800"
          >
            {item.name}
          </Link>
        ))}
        <hr className="text-white opacity-20 mt-4 mb-6"/>
        <Link
          target="_blank"
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