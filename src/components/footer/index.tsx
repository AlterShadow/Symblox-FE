import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import { useTranslation } from "react-i18next";

const Footer = () => {
	const { t } = useTranslation();
	const date = new Date();
	const year = date.getFullYear();

	return (
		<>
			<div className="pt-10 px-5 pb-16 flex flex-col sm:flex-row items-start justify-center gap-10 sm:gap-8 font-Barlow w-full border-t border-[#ffffff33] sm:px-5 md:px-10">
				<div className="flex flex-col items-start gap-4 md:gap-6 order-last sm:order-1">
					<Link to="/">
						<img
							src="/logo.png"
							alt="logo"
							className="w-[100px] md:w-[120px]"
						/>
					</Link>
					<span className="max-w-[450px] text-primaryText text-sm sm:text-base font-normal leading-[1em]">
						{t("footer.symbloxLinks")}
					</span>
					<span className="text-secondaryText text-sm font-normal leading-[1em] md:text-[12px] sm:text-[12px]">
						{t("footer.copyright")} © {year} {t("productTitle")}.
						{t("footer.allRightsReserved")}.
					</span>
				</div>
				<div className="w-[200px] flex flex-col items-start order-2">
					<span className="text-white text-sm font-normal leading-[14px] tracking-[2px] mb-4 sm:mb-6">
						{t("productTitle").toUpperCase()}
					</span>
					<div className="flex flex-col items-start gap-4 text-primaryText">
						<Link
							to="/"
							className="text-[16px] sm:text-sm leading-[1em] font-normal"
						>
							{t("footer.home")}
						</Link>
						<Link
							to="/faq"
							className="text-[16px] sm:text-sm leading-[1em] font-normal"
						>
							{t("footer.faq")}
						</Link>
						<Link
							to="/contact"
							className="text-[16px] sm:text-sm leading-[1em] font-normal"
						>
							{t("footer.contact")}
						</Link>
					</div>
				</div>
				<div className="w-[200px] flex flex-col items-start order-3">
					<span className="text-white text-sm font-normal leading-[14px] tracking-[2px] mb-4 sm:mb-6">
						{t("footer.dapps")}
					</span>
					<div className="flex flex-col items-start gap-4 text-primaryText">
						<Link
							to="/staking"
							target="_blank"
							className="text-[16px] leading-[16px] font-normal"
						>
							{t("footer.staking")}
						</Link>
					</div>
				</div>
				<div className="w-[200px] flex flex-col items-start gap-[19px] sm:gap-3 text-white order-4">
					<span className="text-sm font-normal leading-[1em] tracking-[2px]">
						{t("footer.getConnected").toUpperCase()}
					</span>
					<div className="flex justify-end items-center gap-6">
						<Link to="https://t.me/Symblox" target="_blank">
							<Icon
								icon="mingcute:telegram-fill"
								color="white"
								className="w-6 h-6 md:w-4"
							/>
						</Link>
						<Link
							to="https://x.com/symbloxdefi?s=21&t=ViM4bnDBQrOq-0pfk1MQgA"
							target="_blank"
						>
							<img
								src="/assets/Icon/twitter.svg"
								alt="twitter"
								className="w-6 h-6 md:w-4"
							/>
						</Link>
						<Link to="https://github.com/symbloxdao" target="_blank">
							<img
								src="/assets/Icon/github.svg"
								alt="github"
								className="w-6 h-6 md:w-4"
							/>
						</Link>
					</div>
				</div>
			</div>
		</>
	);
};

export default Footer;
