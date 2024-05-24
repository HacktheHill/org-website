import React, { useEffect } from "react";
import hacker from "../../assets/icons/hacker.svg";
import team from "../../assets/icons/team.svg";
import cash from "../../assets/icons/cash.svg";
import drink from "../../assets/icons/drink.svg";
import tool from "../../assets/icons/tool.svg";
import { t } from "../../i18n";
import whirl from "../../assets/patterns/wwwhirl.svg";
import beaver2 from "../../assets/beavar/Beaver2.svg";

export default function Stats() {
	return (
		<div className="w-full flex justify-center items-center bg-background-light z-[2] relative">
			<div className="flex flex-col w-10/12 h-full justify-center items-center gap-20 py-36 text-left max-w-2xl z-[4] ">
				<div className="flex flex-col text-start w-full" data-aos="fade-up">
					<h1>{t("stats.title")}</h1>
					<h2 className="text-shadow_text">{t("stats.subtitle")}</h2>
				</div>
				<div className="grid gap-4 grid-rows-12 grid-cols-12 w-full max-w-2xl md:flex md:flex-col xl:px-4 md:gap-2">
					<div
						className="flex flex-col md:flex-row justify-start items-between bg-blur-svg rounded-3xl p-8 row-start-1 col-start-6 row-end-5 col-end-13 relative"
						data-aos="fade-left"
					>
						<h2>{t("stats.description")}</h2>
						<div className="absolute -top-16 right-0 h-24">
							<img src={beaver2.src} alt="Beaver" className="h-full" />
						</div>
					</div>
					<div
						className="flex flex-col md:flex-row justify-between items-start gap-8 bg-[#020106] overflow-hidden rounded-3xl p-8 row-start-1 col-start-1 row-end-6 col-end-6"
						data-aos="fade-right"
					>
						<img
							className="box-border h-20 w-20 aspect-square object-cover rounded-[50%] shadow-glow"
							src={hacker.src}
							alt={"Hacker"}
						/>
						<div className="md:text-end md:self-center">
							<h2>600+</h2>
							<p>Hackers</p>
						</div>
					</div>
					<div
						className="flex flex-col md:flex-row justify-between items-start gap-8 bg-blur-svg md:bg-none md:bg-[#020106] overflow-hidden rounded-3xl p-8 row-start-6 col-start-1 row-end-11 col-end-6"
						data-aos="fade-right"
					>
						<img
							className="box-border h-20 w-20 aspect-square object-cover rounded-[50%] shadow-glow"
							src={team.src}
							alt={"Team"}
						/>
						<div className="md:text-end md:self-center">
							<h2>15+</h2>
							<p>{t("stats.sponsors")}</p>
						</div>
					</div>
					<div
						className="flex flex-col md:flex-row justify-between items-start gap-8 bg-[#020106] overflow-hidden rounded-3xl p-8 row-start-5 col-start-6 row-end-9 col-end-10"
						data-aos="fade-up"
					>
						<img
							className="box-border h-20 w-20 aspect-square object-cover rounded-[50%] shadow-glow"
							src={team.src}
							alt={"Team"}
						/>
						<div className="md:text-end md:self-center">
							<h2>100+</h2>
							<p>{t("stats.volunteers")}</p>
						</div>
					</div>
					<div
						className="flex flex-col md:flex-row justify-between items-start gap-8 bg-[#020106] overflow-hidden rounded-3xl p-8 row-start-5 col-start-10 row-end-9 col-end-13"
						data-aos="fade-left"
					>
						<img
							className="box-border h-20 w-20 aspect-square object-cover rounded-[50%] shadow-glow"
							src={cash.src}
							alt={"Cash"}
						/>
						<div className="md:text-end md:self-center">
							<h2>$35k+</h2>
							<p>{t("stats.prizes")}</p>
						</div>
					</div>
					<div
						className="flex flex-row justify-between items-start gap-8 bg-[#020106] overflow-hidden rounded-3xl p-8 row-start-9 col-start-6 row-end-11 col-end-13"
						data-aos="fade-left"
					>
						<img
							className="box-border h-20 w-20 aspect-square object-cover rounded-[50%] shadow-glow"
							src={tool.src}
							alt={"Tool"}
						/>
						<div className="text-end self-center">
							<h2>5+</h2>
							<p>{t("stats.workshops")}</p>
						</div>
					</div>
					<div
						className="flex flex-row justify-between items-start gap-8 bg-[#020106] overflow-hidden rounded-3xl p-8 row-start-11 col-start-1 row-end-13 col-end-13"
						data-aos="fade-up"
					>
						<img
							className="box-border h-20 w-20 aspect-square object-cover rounded-[50%] shadow-glow"
							src={drink.src}
							alt={"Drink"}
						/>
						<div className="text-end self-center">
							<h2>1000+</h2>
							<p>{t("stats.redbulls")}</p>
						</div>
					</div>
				</div>
			</div>
			<img
				src={whirl.src}
				className="absolute z-[3] h-full w-full object-cover opacity-35 -scale-y-100 max-w-[3500px] translate-y-[15%]"
				alt="Quad"
			/>
		</div>
	);
}
