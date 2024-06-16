import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import PrivacyModal from "../modal/privacy";
import { bscTestnet } from "viem/chains";
import { injected } from "wagmi/connectors";
import {
  useAccount,
  usePublicClient,
  useReadContracts,
  useWriteContract,
  useConnect,
  useSwitchChain,
} from "wagmi";
import { encodeFunctionData, formatEther, parseEther } from "viem";
import {
  PriceOracleCA,
  StakingCA,
  SymbloxTokenCA,
  xUSDCA,
  SYXCA,
} from "../../../config/params/contractAddresses";
import {
  sUSDABI,
  StakingABI,
  PriceOracleABI,
  SBXContractABI,
  ERC20ABI,
} from "../../../config/abis";
import { useEffect } from "react";

const StakingBoard = () => {
  const { t } = useTranslation();
  const { isConnected, address } = useAccount();
  const { switchChain } = useSwitchChain();
  const { connectAsync } = useConnect();

  const navigate = useNavigate();

  const stakingHandler = () => {
    navigate("/staking/mint");
  };

  const walletConnectHandler = async () => {
    try {
      await connectAsync({ connector: injected() });
      await switchChain({ chainId: bscTestnet.id });
    } catch (error) {
      console.error("Failed to connect wallet", error);
    }
  };

  const ratiohandler = () => {
    navigate("/staking/burn");
  };

  const rewardButtonHandler = () => {
    navigate("/staking/reward");
  };

  const migrationHandler = async () => {
    if (!address)
      await connectAsync({ chainId: bscTestnet.id, connector: injected() });
    else navigate("/migration");
  };

  const StakingContract = {
    address: StakingCA,
    abi: StakingABI,
  } as const;

  const SBXContract = {
    address: SymbloxTokenCA,
    abi: SBXContractABI,
  } as const;

  const PriceOracleContract = {
    address: PriceOracleCA,
    abi: PriceOracleABI,
  } as const;

  const sUSDContract = {
    address: xUSDCA,
    abi: sUSDABI,
  } as const;

  const SYXContract = {
    address: SYXCA,
    abi: ERC20ABI,
  } as const;

  const { data } = useReadContracts({
    contracts: [
      {
        ...SBXContract,
        functionName: "balanceOf",
        args: [address],
      },
      {
        ...PriceOracleContract,
        functionName: "getTokenPrice",
        args: [SymbloxTokenCA],
      },
      {
        ...sUSDContract,
        functionName: "balanceOf",
        args: [address],
      },
      {
        ...SYXContract,
        functionName: "balanceOf",
        args: [address],
      },
    ],
  });

  const formattedSBXAmount = data
    ? Number.parseFloat(formatEther((data?.[0].result as bigint) ?? 0n))
    : 0;

  const sbxPrice = data
    ? Number.parseFloat(formatEther((data?.[1].result as bigint) ?? 0n))
    : 0;

  const formattedSUSDAmount = data
    ? Number.parseFloat(formatEther((data?.[2].result as bigint) ?? 0n))
    : 0;

  const formattedSYXAmount = data
    ? Number.parseFloat(formatEther((data?.[3].result as bigint) ?? 0n))
    : 0;

  return (
    <>
      <div className=" md1:pt-[55px] pt-[0px] pb-8 w-full min-h-screen font-Barlow px-5 md:px-10 lg:px-5">
        {address && (
          <div className="text-white max-w-[1276px] mx-auto w-full px-10 mb-5 py-[10px] flex flex-row flex-wrap justify-evenly items-center bg-primaryBoxColor rounded-lg gap-3">
            <div className="">
              SYX Amount :&nbsp;{Number(formattedSYXAmount.toFixed(8))}
            </div>
            <div className="">
              SBX Amount :&nbsp;{Number(formattedSBXAmount.toFixed(8))}
            </div>
            <div className="">
              sUSD Amount :&nbsp;{Number(formattedSUSDAmount.toFixed(8))}
            </div>
            <div className="">
              SBX Price :&nbsp;{Number(sbxPrice.toFixed(8))}&nbsp;$
            </div>
          </div>
        )}
        <div className="max-w-[1276px] mx-auto w-full flex flex-col gap-11 mt-3">
          <div className="w-full flex">
            <div className="w-full flex flex-row overflow-auto pb-2">
              <div className="w-full h-full flex flex-col flex-[1_0_0] items-start justify-between gap-4 bg-primaryBoxColor py-[34px] pl-6 pr-10 rounded-xl">
                <div className="relative flex flex-col gap-3 pr-12 items-start self-stretch">
                  <div className="absolute right-0 top-0 lg:right-3">
                    <img
                      src="/assets/Image/Perpetual/Perpetual1.svg"
                      alt="migrationImg"
                      className="w-full h-full lg:w-[160px]"
                    />
                  </div>
                  <p className="text-white lg:text-[14px] text-[12px] font-normal leading-[1em]">
                    {t("stakingBoard.coreStep")}
                  </p>
                  <p className="text-white lg:text-[22px] text-[20px] font-bold leading-[1em]">
                    {t("stakingBoard.migrateSYX")}
                  </p>
                  <p className="text-white lg:text-[16px] text-[14px] font-normal leading-[1em]">
                    {t("stakingBoard.migrateContent")}
                  </p>
                </div>
                <button
                  onClick={migrationHandler}
                  type="button"
                  className="h-10 py-[18px] px-8 lg:px-6 flex items-center mt-8 gap-[10px] rounded-[60px] bg-[#4C80C2] text-white text-[16px] font-bold leading-[16px] min-w-[190px] text-center justify-center hover:scale-[1.02]"
                >
                  {t("stakingBoard.migration")}
                </button>
              </div>
            </div>
          </div>
          <div className="w-full flex flex-col lg:flex-row justify-between items-center lg:gap-6 gap-4">
            <div className="flex flex-col lg:h-[268px] h-full gap-4 flex-[1_0_0] bg-primaryBoxColor py-[34px] px-6 rounded-2xl items-start justify-between w-full">
              <div className="flex flex-col gap-3 pr-12 items-start self-stretch relative">
                <div className="absolute right-0 top-0">
                  <img
                    src="/assets/Icon/governance.svg"
                    alt="governance"
                    className="w-[62.9px] h-16"
                  />
                </div>
                <p className="text-white lg:text-[14px] text-[12px] font-normal leading-[1em]">
                  {t("stakingBoard.step1")}
                </p>
                <p className="text-white lg:text-[22px] text-[20px] font-bold leading-[1em]">
                  {t("stakingBoard.stakeAndBorrow")}
                </p>
                <p className="text-white lg:text-[16px] text-[14px] font-normal leading-[1em]">
                  {t("stakingBoard.borrowSUSD")}
                </p>
              </div>
              {isConnected ? (
                <button
                  type="button"
                  className="h-10 py-[18px] px-8 lg:px-6 flex items-center gap-[10px] rounded-[60px] bg-primaryButtonColor text-white text-[16px] font-bold leading-[16px] min-w-[190px] text-center justify-center hover:scale-[1.02]"
                  onClick={stakingHandler}
                >
                  {t("stakingBoard.startStaking")}
                </button>
              ) : (
                // <div id="wallet-button">
                //   <ConnectButton label="Connect Wallet" />
                // </div>
                <button
                  type="button"
                  onClick={walletConnectHandler}
                  className="h-10 py-[18px] px-8 lg:px-6 flex items-center gap-[10px] rounded-[60px] bg-primaryButtonColor text-white text-[16px] font-bold leading-[16px] min-w-[190px] text-center justify-center hover:scale-[1.02]"
                >
                  Connect Wallet
                </button>
              )}
            </div>
            <div
              className={`${
                isConnected ? "opacity-100" : "opacity-50"
              } flex flex-col lg:h-[268px] h-full gap-4 flex-[1_0_0] bg-primaryBoxColor py-[34px] px-6 rounded-xl items-start justify-between w-full`}
            >
              <div className="flex flex-col gap-3 pr-12 items-start self-stretch relative">
                <div className="absolute right-0 top-0">
                  <img
                    src="/assets/Icon/collateral.svg"
                    alt="collateral"
                    className="w-16 h-16"
                  />
                </div>
                <p className="text-white lg:text-[14px] text-[12px] font-normal leading-[1em]">
                  {t("stakingBoard.step2")}
                </p>
                <p className="text-white lg:text-[22px] text-[20px] font-bold leading-[1em] self-stretch">
                  {t("stakingBoard.maintainCollateralization")}
                </p>
                <p className="text-white lg:text-[16px] text-[14px] font-normal leading-[1em]">
                  {t("stakingBoard.useTheBurn")}
                </p>
              </div>
              <button
                type="button"
                disabled={!isConnected}
                onClick={ratiohandler}
                className="h-10 py-[18px] px-8 lg:px-6 flex items-center gap-[10px] rounded-[60px] bg-primaryButtonColor text-white text-[16px] font-bold leading-[16px] min-w-[190px] text-center justify-center hover:scale-[1.02]"
              >
                {t("stakingBoard.cRatioExplained")}
              </button>
            </div>
            <div
              className={`${
                isConnected ? "opacity-100" : "opacity-50"
              } flex flex-col lg:h-[268px] h-full gap-4 flex-[1_0_0] bg-primaryBoxColor py-[34px] px-6 rounded-xl items-start justify-between w-full`}
            >
              <div className="flex flex-col gap-3 pr-12 items-start self-stretch relative">
                <div className="absolute right-0 top-0">
                  <img
                    src="/assets/Icon/reward.svg"
                    alt="reward"
                    className="w-16 h-16"
                  />
                </div>
                <p className="text-white lg:text-[14px] text-[12px] font-normal leading-[1em]">
                  {t("stakingBoard.step3")}
                </p>
                <p className="text-white lg:text-[22px] text-[20px] font-bold leading-[1em] self-stretch">
                  {t("stakingBoard.collectRewards")}
                </p>
                <p className="text-white lg:text-[16px] text-[14px] font-normal leading-[1em]">
                  {t("stakingBoard.maintainYourTarget")}
                </p>
              </div>
              <button
                type="button"
                onClick={rewardButtonHandler}
                disabled={!isConnected}
                className="h-10 py-[18px] px-8 lg:px-6 flex items-center gap-[10px] rounded-[60px] bg-primaryButtonColor text-white text-[16px] font-bold leading-[16px] min-w-[190px] text-center justify-center hover:scale-[1.02]"
              >
                {t("stakingBoard.rewardsExplained")}
              </button>
            </div>
          </div>
          <div className="w-full flex lg:flex-row flex-col mx-auto justify-center">
            <Link
              to="/"
              className="lg:w-1/2 w-full p-5 flex flex-col gap-2 border border-[#293745] lg:rounded-bl-xl rounded-tl-xl rounded-bl-none lg:rounded-tr-none rounded-tr-xl border-b-0 lg:border-b hover:bg-[rgba(255,255,255,0.03)]"
            >
              <p className="lg:text-[14px] text-[12px] leading-[1em] font-normal text-white">
                {t("stakingBoard.estimatedAPR")}
              </p>
              <p className="lg:text-[20px] text-[16px] leading-[1em] font-bold text-white">
                ••••%
              </p>
              <p className="lg:text-[14px] text-[12px] leading-[1em] font-normal text-secondaryText">
                {t("stakingBoard.connectWalletFirst")}
              </p>
            </Link>
            {/* <Link
              to="/"
              className="lg:w-1/4 w-full p-5 flex flex-col gap-2 border border-[#293745] lg:border-l-0 justify-center border-l border-b-0 lg:border-b hover:bg-[rgba(255,255,255,0.03)]"
            >
              <p className="lg:text-[20px] text-[16px] leading-[1em] font-bold text-white">
                {t("stakingBoard.SBXBridge")}
              </p>
              <p className="lg:text-[14px] text-[12px] leading-[1em] font-normal text-secondaryText">
                {t("stakingBoard.transferAsset")}
              </p>
            </Link>
            <Link
              to="/"
              className="lg:w-1/4 w-full p-5 flex flex-col gap-2 border border-[#293745] lg:border-l-0 justify-center border-l border-b-0 lg:border-b hover:bg-[rgba(255,255,255,0.03)]"
            >
              <p className="lg:text-[20px] text-[16px] leading-[1em] font-bold text-white">
                {t("stakingBoard.hedgeDebt")}
              </p>
              <p className="lg:text-[14px] text-[12px] leading-[1em] font-normal text-secondaryText">
                {t("stakingBoard.buydSBX")}
              </p>
            </Link> */}
            <Link
              to="/"
              className="lg:w-1/2 w-full p-5 flex flex-col gap-2 border border-[#293745] lg:border-l-0 rounded-br-xl lg:rounded-tr-xl rounded-tr-none border-l rounded-bl-xl lg:rounded-bl-none justify-center hover:bg-[rgba(255,255,255,0.03)]"
            >
              <p className="lg:text-[20px] text-[16px] leading-[1em] font-bold text-white">
                {t("stakingBoard.help")}
              </p>
              <p className="lg:text-[14px] text-[12px] leading-[1em] font-normal text-secondaryText">
                {t("stakingBoard.learnMoreAbout")}
              </p>
            </Link>
          </div>
        </div>
      </div>
      <PrivacyModal />
    </>
  );
};

export default StakingBoard;
