import { useState } from "react";
import { useTranslation } from "react-i18next";
import useScrollVisibility from "../../hooks/useScrollVisibility";

const RoadmapFragment = () => {
	const { t } = useTranslation();

	const [activeItem, setActiveItem] = useState(0);
	const isVisible = useScrollVisibility("roadmap-fragment", 0);

	const handlePrev = () => {
		if (activeItem !== 0)
			setActiveItem((prev) => (prev - 1 + RoadMaps.length) % RoadMaps.length);
	};

	const handleNext = () => {
		if (activeItem !== RoadMaps.length - 1)
			setActiveItem((prev) => (prev + 1) % RoadMaps.length);
	};

	const RoadMaps = [
		{
			title: t("roadmap.1stQuarter"),
			content: t("roadmap.1stQuarter.desc"),
		},
		{
			title: t("roadmap.2ndQuarter"),
			content: t("roadmap.2ndQuarter.desc"),
		},
		{
			title: t("roadmap.3rdQuarter"),
			content: t("roadmap.3rdQuarter.desc"),
		},
	];

	return (
		<div
			id="roadmap-fragment"
			className="px-6 md:px-24 lg:px-36 font-Barlow relative"
		>
			<img
				className="absolute inset-0 m-auto -z-10"
				src="/assets/SVG/RoadMapEllipse.svg"
				alt="arrow"
			/>
			<div
				className={`transition-all duration-500 ease-in ${
					isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
				} mt-24 flex flex-col justify-center items-center`}
			>
				<p className="text-white font-semibold text-4xl">
					{t("roadmap.roadmap")}
				</p>
				<p className="text-primaryText text-center mt-4">
					{t("roadmap.expandingAssets")}
				</p>
			</div>
			<div
				className={
					"mt-12 md:hidden overflow-hidden flex md:grid gap-8 md:grid-cols-3"
				}
			>
				<div
					className="flex transition-transform duration-500"
					style={{ transform: `translateX(-${activeItem * 100}%)` }}
				>
					{RoadMaps.map((item, index) => (
						<div
							className="min-w-full flex flex-col font-Barlow gap-y-4"
							key={index}
						>
							<img
								className="w-full"
								src="/assets/SVG/RoadMapHeaderArrow.svg"
								alt="arrow"
							/>
							<p className="text-white text-xl">{item.title}</p>
							<p className="text-primaryText">{item.content}</p>
						</div>
					))}
				</div>
			</div>
			<div
				className={`transition-all duration-500 ease-in delay-300 ${
					isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
				}  mt-12 hidden md:flex overflow-hidden grid gap-8 grid-cols-3`}
			>
				{RoadMaps.map((item, index) => (
					<div className="flex flex-col font-Barlow gap-y-4" key={index}>
						<img
							className="w-full"
							src="/assets/SVG/RoadMapHeaderArrow.svg"
							alt="arrow"
						/>
						<p className="text-white text-xl">{item.title}</p>
						<p className="text-primaryText">{item.content}</p>
					</div>
				))}
			</div>
			<div className="flex md:hidden justify-center gap-x-4 mt-8 items-center">
				<button type="button" onClick={handlePrev}>
					<img
						className={`w-10 ${
							activeItem === 0 ? "-translate-y-[1px]" : "rotate-180"
						}`}
						src={
							activeItem === 0
								? "/assets/SVG/RoadMapArrowGray.svg"
								: "/assets/SVG/RoadMapArrowWhite.svg"
						}
						alt="Previous"
					/>
				</button>
				<button onClick={handleNext}>
					<img
						className={`w-10 ${
							activeItem === RoadMaps.length - 1
								? "rotate-180 translate-y-[1px]"
								: ""
						}`}
						src={
							activeItem === RoadMaps.length - 1
								? "/assets/SVG/RoadMapArrowGray.svg"
								: "/assets/SVG/RoadMapArrowWhite.svg"
						}
						alt="Next"
					/>
				</button>
			</div>
		</div>
	);
};

export default RoadmapFragment;
