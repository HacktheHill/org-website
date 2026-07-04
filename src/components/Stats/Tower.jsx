import { useEffect } from "react";
import tower from "../../assets/SVGs/stats_tower.svg?raw";
import { t } from "../../i18n";
import "./Tower.css";

const setPathTransition = paths => {
	paths.forEach(path => {
		path.style.transition = "fill 0.3s";
	});
};

const darkenOtherGroups = (groups, currentIndex) => {
	groups.forEach((group, index) => {
		if (index !== currentIndex) {
			group.querySelectorAll("path").forEach(path => {
				path.style.fill = "#70211c";
			});
		}
	});
};

const resetGroupColors = (groups, currentIndex, originalColor) => {
	groups.forEach((group, index) => {
		if (index !== currentIndex) {
			group.querySelectorAll("path").forEach(path => {
				path.style.fill = originalColor;
			});
		}
	});
};

const setupGroupListeners = (group, index, groups, originalColor) => {
	group.addEventListener("mouseenter", () => {
		darkenOtherGroups(groups, index);
	});
	group.addEventListener("mouseleave", () => {
		group.querySelectorAll("path").forEach(path => {
			path.style.fill = originalColor;
		});
		resetGroupColors(groups, index, originalColor);
	});
};

export default function Tower() {
	useEffect(() => {
		const groups = document.querySelectorAll("g[id*='panel']");
		for (let i = 0; i < groups.length; i++) {
			const originalColor = groups[i].querySelector("path").style.fill;
			const paths = groups[i].querySelectorAll("path");
			setPathTransition(paths);
			setupGroupListeners(groups[i], i, groups, originalColor);
		}
	}, []);

	return (
		<div className="w-full flex flex-col gap-16 justify-center items-center">
			<div className="flex flex-col px-8 gap-4 text-center basis-1/2 lg:mt-16">
				<h1>{t("stats.title")}</h1>
				<h2>{t("stats.subtitle")}</h2>
			</div>
			<div className="relative flex justify-end ">
				<div
					className="tower-img border"
					dangerouslySetInnerHTML={{
						__html: tower,
					}}
				></div>
			</div>
		</div>
	);
}
