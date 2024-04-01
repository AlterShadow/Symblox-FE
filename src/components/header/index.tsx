import { Link } from "react-router-dom";
import Sidebar from "../sidebar";
import { useState } from "react";

const sidebarItems = [
  {
    name: "Staking",
    link: "/staking",
  },
  {
    name: "Menu Item",
    link: "/",
  },
  {
    name: "Menu Item",
    link: "/",
  },
  {
    name: "Vault",
    link: "/vault",
  },
];

const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const openSidebar = () => {
    setIsSidebarOpen(true);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="fixed z-50 w-full">
      <div className="py-6 px-6 flex items-center justify-between container-xl w-full mx-auto font-Barlow bg-primaryBackground">
        <Link to="/">
          <img src="/logo.png" alt="logo" className="w-[115px] sm:w-[160px]" />
        </Link>
        <div className="hidden md:flex flex-row gap-8 items-start">
          {sidebarItems.map((item, index) => (
            <Link
              to={item.link}
              key={index}
              className="text-[16px] font-medium leading-[16px] text-white"
            >
              {item.name}
            </Link>
          ))}
        </div>
        <Link
          target="_blank"
          to="/staking"
          className="hidden md:flex py-2 px-6 items-center rounded-full bg-primaryButtonColor text-white font-bold"
        >
          Staking App
        </Link>
        <img
          src="/assets/Icon/filter.svg"
          alt="filter"
          className="md:hidden w-[30px] h-[30px] cursor-pointer"
          onClick={openSidebar}
        />
      </div>
      <Sidebar isOpen={isSidebarOpen} closeSidebar={closeSidebar} />
    </div>
  );
};

export default Header;
