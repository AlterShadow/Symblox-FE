import { useTranslation } from "react-i18next";
import useScrollVisibility from "../../hooks/useScrollVisibility";

const Perpetual = () => {
	const { t } = useTranslation();
	const isVisibleMain = useScrollVisibility("perpetual-main", 0);
	const isVisiblePerps = useScrollVisibility("perpetual-symblox-perps", 0);
	const isVisibleProtocol = useScrollVisibility(
		"perpetual-protocol-features",
		0,
	);
	const isVisibleIntegrate = useScrollVisibility(
		"perpetual-integrate-symblox",
		0,
	);

	const protocolFeatures = [
		{
			img: "/assets/Image/Perpetual/Perpetual1.svg",
			title: t("perpetual.deepLiquidity"),
			desc: t("perpetual.deepLiquidity.desc"),
		},
		{
			img: "/assets/Image/Perpetual/Perpetual2.svg",
			title: t("perpetual.wideVariety"),
			desc: t("perpetual.wideVariety.desc"),
		},
		{
			img: "/assets/Image/Perpetual/Perpetual3.svg",
			title: t("perpetual.revenueShare"),
			desc: t("perpetual.revenueShare.desc"),
		},
		{
			img: "/assets/Image/Perpetual/Perpetual4.svg",
			title: t("perpetual.capitalEfficient"),
			desc: t("perpetual.capitalEfficient.desc"),
		},
		{
			img: "/assets/Image/Perpetual/Perpetual5.svg",
			title: t("perpetual.supportedLaunch"),
			desc: t("perpetual.supportedLaunch.desc"),
		},
	];

	return (
		<div className="min-h-screen overflow-x-hidden w-full text-white px-6 xl:px-36 font-Barlow">
			<div
				id="perpetual-main"
				className="flex flex-col pt-36 xl:pt-0 xl:h-screen xl:flex-row gap-x-8"
			>
				<div className="flex flex-col justify-center items-center text-center xl:text-start xl:items-start">
					<div
						className={`transition-all duration-500 ${
							isVisibleMain ? "scale-100" : "scale-50"
						} `}
					>
						<span className="text-white text-3xl sm:text-5xl font-bold max-w-[643px] mr-2">
							{t("perpetual.decentralized")}
						</span>
						<div className="text-white text-3xl sm:text-5xl font-bold max-w-[643px]">
							<span className="inline-block text-gradient">
								{t("perpetual.perpetual")}
							</span>
							<span className="mr-2">&nbsp;{t("perpetual.futures")}</span>
						</div>
					</div>
					<div
						className={`transition-all duration-500 ease-in delay-300 ${
							isVisibleMain
								? "opacity-100 translate-y-0"
								: "opacity-0 translate-y-20"
						} text-primaryText text-sm sm:text-base mt-4 max-w-[550px]`}
					>
						{t("perpetual.header.desc")}
					</div>
				</div>
				<div className="-z-10 pt-16 xl:pt-0 xl:absolute xl:top-0 xl:right-0">
					<img
						src="/assets/Image/Perpetual/PerpetualMain.png"
						alt="PerpetualMain"
						className="w-full w-fit xl:max-w-[1210px]"
					/>
				</div>
			</div>
			<div
				id="perpetual-symblox-perps"
				className={
					"text-center mt-24 xl:mt-16 w-full flex flex-col justify-content items-center mb-36"
				}
			>
				<div
					className={`transition-all duration-500 ease-in ${
						isVisiblePerps
							? "opacity-100 translate-y-0"
							: "opacity-0 translate-y-20"
					} mb-3`}
				>
					{t("perpetual.symbloxPerps").toUpperCase()}
				</div>
				<div
					className={`transition-all duration-500 ease-in delay-300 ${
						isVisiblePerps
							? "opacity-100 translate-y-0"
							: "opacity-0 translate-y-20"
					} text-gradient text-3xl max-w-[1218px] sm:text-4xl font-bold`}
				>
					<span className="text-primaryText">
						{t("perpetual.symbloxPerps.start")}
					</span>
					{t("perpetual.symbloxPerps.perpetualFutures")}
					<span className="text-primaryText">
						{t("perpetual.symbloxPerps.descMid")}
					</span>
					{t("perpetual.symbloxPerps.deepLiquidity")}
					<span className="text-primaryText">
						{t("perpetual.symbloxPerps.end")}
					</span>
				</div>
			</div>
			<div className="mb-20">
				<div
					id="perpetual-protocol-features"
					className={`transition-all duration-500 ease-in ${
						isVisibleProtocol
							? "opacity-100 translate-y-0"
							: "opacity-0 translate-y-20"
					} font-semibold text-center text-2xl sm:text-4xl mb-10`}
				>
					{t("perpetual.protocolFeatures")}
				</div>
				<div className="grid grid-cols-1 lg:grid-cols-4 xl:grid-cols-6 gap-6">
					{protocolFeatures.map((item, index) => (
						<div
							key={index}
							className={`flex-col ${
								index === 4 ? "lg:col-start-2 xl:col-start-4" : ""
							} ${
								index === 3 ? "md:col-span-2 xl:col-start-2" : "md:col-span-2"
							} bg-primaryBoxColor p-10 w-full h-full rounded-xl transition-all duration-500 ease-in delay-[${
								(index + 1) * 200
							}ms] ${
								isVisibleProtocol
									? "opacity-100 translate-y-0"
									: "opacity-0 translate-y-20"
							} `}
						>
							<img
								src={item.img}
								alt={item.title}
								className="w-[72px] h-[72px] mb-4"
							/>
							<div className="text-white text-2xl font-medium mb-2">
								{item.title}
							</div>
							<div className="text-primaryText leading-tight">{item.desc}</div>
						</div>
					))}
				</div>
				<div
					id="perpetual-integrate-symblox"
					className={` transition-all duration-500 ease-in delay-200 ${
						isVisibleIntegrate
							? "opacity-100 translate-y-0"
							: "opacity-0 translate-y-20"
					} flex flex-col justify-center items-center lg:pr-72 text-center lg:justify-start lg:items-start lg:text-start font-[18px] relative bg-primaryBoxColor p-8 rounded-2xl mt-32`}
				>
					<div className="text-white text-[32px] mt-24 text-center lg:text-start lg:mt-0 font-semibold max-w-sm">
						{t("perpetual.integrateSymblox")}
					</div>
					<div className="text-primaryText md:max-w-lg lg:max-w-xl">
						{t("perpetual.integrateSymblox.desc")}
						<span className="text-gradient">
							&nbsp;{t("perpetual.integrateSymblox.discord")}
						</span>
					</div>
					<div className="absolute lg:inset-auto inset-0 items-center justify-center flex -top-72 lg:right-6 lg:-top-8">
						<img
							src="/assets/Image/Perpetual/wallet.png"
							alt="PerpetualMain"
							className="w-64"
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Perpetual;
