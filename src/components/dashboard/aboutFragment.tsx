import { useTranslation } from "react-i18next";
import useScrollVisibility from "../../hooks/useScrollVisibility";

const AboutFragment = () => {
	const { t } = useTranslation();
	const isVisible = useScrollVisibility("about-fragment", 0);

	return (
		<>
			<div
				id="about-fragment"
				className="hidden lg:flex w-full py-16 px-0 justify-center items-center gap-[58px] flex-row font-Barlow"
			>
				<div
					className={`${
						isVisible
							? "opacity-100 translate-x-0"
							: "opacity-0 -translate-x-10"
					} transition-all duration-500 ease-in`}
				>
					<img src="/assets/Image/AboutBackground.png" alt="aboutBackground" />
				</div>
				<div
					className={`${
						isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-20"
					} flex flex-col items-start gap-[26px] transition-all duration-500 ease delay-300`}
				>
					<span className="text-white text-[48px] font-bold leading-[48px]">
						{t("about.aboutSymblox")}
					</span>
					<span className="text-[16px] font-normal leading-[16px] text-primaryText max-w-[625px]">
						{t("about.aboutDesc")}
					</span>
				</div>
			</div>
			<div className="flex flex-col justify-center items-center lg:hidden py-16">
				<div className="flex items-start relative">
					<img
						className="absolute inset-0 m-auto -z-10"
						src="/assets/Image/AboutBackground.png"
						alt="aboutBackground"
					/>
					<div className="flex flex-col items-center justify-center gap-y-2 text-center px-4 pt-72">
						<span className="text-white text-2xl font-bold leading-[48px]">
							{t("about.aboutSymblox")}
						</span>
						<span className="text-md font-normal leading-[18px] text-primaryText max-w-[625px]">
							{t("about.aboutDesc")}
						</span>
					</div>
				</div>
			</div>
		</>
	);
};

export default AboutFragment;
