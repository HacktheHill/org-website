import React, { useEffect } from "react";
import tower from "../../assets/SVGs/stats_tower.svg?raw";
import { t } from "../../i18n";
import "./Tower.css";

export default function Tower() {
	useEffect(() => {
		//get groups with id containing the string `panel`, darken the children of the group, on hover lighten the children of the group
		const groups = document.querySelectorAll("g[id*='panel']");
		//foreach doesnt work
		for (let i = 0; i < groups.length; i++) {
			const originalColor = groups[i].querySelector("path").style.fill;
			groups[i].querySelectorAll("path").forEach(path => {
				path.style.transition = "fill 0.3s";
			});
			groups[i].addEventListener("mouseenter", () => {
				groups[i].querySelectorAll("path").forEach(path => {
					//darken all other groups
					groups.forEach((group, index) => {
						if (index !== i) {
							group.querySelectorAll("path").forEach(path => {
								path.style.fill = "#70211c";
							});
						}
					});
				});
			});
			groups[i].addEventListener("mouseleave", () => {
				groups[i].querySelectorAll("path").forEach(path => {
					path.style.fill = originalColor;
				});
				//reset all other groups
				groups.forEach((group, index) => {
					if (index !== i) {
						group.querySelectorAll("path").forEach(path => {
							path.style.fill = originalColor;
						});
					}
				});
			});
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
