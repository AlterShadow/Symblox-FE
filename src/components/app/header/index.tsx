import { Link } from "react-router-dom";

const AppHeader = () => {
  return (
    <>
      <div className="fixed z-50 w-full font-Barlow border-b border-[rgba(255,255,255,0.2)] px-5 sm:px-5 md:px-10">
        <div className="py-6 sm:py-3 md:py-3 flex items-center justify-between max-w-[1276px] w-full mx-auto font-Barlow bg-primaryBackground">
          <div className="flex flex-row gap-[15px] items-center sm:gap-2 md:gap-[10px]">
            <Link to="/">
              <img
                src="/logo.png"
                alt="logo"
                className="w-[180px] sm:hidden md:hidden"
              />
              <img
                src="/favicon.svg"
                alt="logo"
                className="w-8 h-8 sm:block md:block hidden"
              />
            </Link>
            <div className="h-6 sm:h-4 md:h-5 bg-primaryButtonColor inline-flex py-1 px-2 items-center justify-center gap-[10px] rounded-[4px] text-white text-[12px] leading-[1em] font-normal uppercase sm:text-[10px] sm:font-medium md:font-medium">
              staking
            </div>
          </div>
          <div className="flex flex-row items-center gap-[31px] sm:gap-3 md:gap-5">
            <div className="flex sm:hidden md:hidden flex-row gap-2 items-center hover:cursor-pointer">
              <span className="">
                <img src="/assets/Icon/ethereum.svg" alt="chain-logo" />
              </span>
              <span className="text-white text-[16px] leading-[16px] font-medium">
                Ethereum
              </span>
              <span className="">
                <img src="/assets/Icon/chevron-down.svg" alt="down-arrow" />
              </span>
            </div>
            <div className="sm:flex md:flex hidden w-6 h-6 md:w-7 md:h-7">
              <img src="/assets/Icon/ethereum.svg" alt="chain-logo" />
            </div>
            <button className="h-10 sm:h-8 md:h-8 py-[18px] px-6 sm:px-4 md:px-4 flex items-center gap-[10px] rounded-[60px] bg-primaryButtonColor text-white text-[16px] font-bold leading-[1em] sm:text-[12px] md:text-[14px]">
              Connect Wallet
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AppHeader;
