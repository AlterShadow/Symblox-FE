import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="fixed z-50 w-full">
      <div className="py-6 px-0 flex items-center justify-between max-w-[1276px] w-full mx-auto font-Barlow bg-primaryBackground">
        <Link to="/">
          <img src="/logo.png" alt="logo" className="w-[180px]" />
        </Link>
        <div className="flex flex-row gap-8 items-start">
          <Link
            to="/staking"
            target="_blank"
            className="text-[16px] font-medium leading-[16px] text-white"
          >
            Staking
          </Link>
          <Link
            to="/"
            className="text-[16px] font-medium leading-[16px] text-white"
          >
            Menu Item
          </Link>
          <Link
            to="/"
            className="text-[16px] font-medium leading-[16px] text-white"
          >
            Menu Item
          </Link>
          <Link
            to="/vault"
            className="text-[16px] font-medium leading-[16px] text-white"
          >
            Vault
          </Link>
        </div>
        <Link
          target="_blank"
          to="/staking"
          className="h-10 py-[18px] px-6 flex items-center gap-[10px] rounded-[60px] bg-primaryButtonColor text-white text-[16px] font-bold leading-[16px]"
        >
          Staking App
        </Link>
      </div>
    </div>
  );
};

export default Header;
