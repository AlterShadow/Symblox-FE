import { Link } from "react-router-dom";

const AppHeader = () => {
  return (
    <>
      <div className="fixed z-50 w-full font-Barlow border-b border-[rgba(255,255,255,0.2)]">
        <div className="py-6 px-0 flex items-center justify-between max-w-[1276px] w-full mx-auto font-Barlow bg-primaryBackground">
          <div className="flex flex-row gap-[15px] items-center">
            <Link to="/">
              <img src="/logo.png" alt="logo" className="w-[180px]" />
            </Link>
            <div className="h-6 bg-primaryButtonColor inline-flex py-1 px-2 items-center justify-center gap-[10px] rounded-[4px] text-white text-[12px] leading-[12px] font-normal uppercase">
              staking
            </div>
          </div>
          <div className="flex flex-row items-center gap-[31px]">
            <div className="flex flex-row gap-2 items-center hover:cursor-pointer">
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
            <button className="h-10 py-[18px] px-6 flex items-center gap-[10px] rounded-[60px] bg-primaryButtonColor text-white text-[16px] font-bold leading-[16px]">
              Connect Wallet
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AppHeader;
