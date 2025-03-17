import React, { useEffect, useState } from "react";
import { t } from "../../i18n";
//Sponsors
import Blackberry from "/src/assets/Logos/Partners/Blackberry.svg";
import CSE from "/src/assets/Logos/Partners/CSE.svg";
import CanadianTire from "/src/assets/Logos/Partners/CanadianTire.svg";
import Ciena from "/src/assets/Logos/Partners/Ciena.svg";
import DigitalOcean from "/src/assets/Logos/Partners/DigitalOcean.svg";
import Google from "/src/assets/Logos/Partners/Google.svg";
import GitHub from "/src/assets/Logos/Partners/GitHub.svg";
import lonehaven from "/src/assets/Logos/Partners/Lonehaven.svg";
import Vercel from "/src/assets/Logos/Partners/Vercel.svg";
import balsamiq from "/src/assets/Logos/Partners/Balsamiq.svg";
import echo3d from "/src/assets/Logos/Partners/Echo3d.svg";
import voiceflow from "/src/assets/Logos/Partners/Voiceflow.svg";
import StickerMule from "/src/assets/Logos/Partners/StickerMule.svg";
import OpenProject from "/src/assets/Logos/Partners/OpenProject.svg";
import RedBull from "/src/assets/Logos/Partners/Redbull.svg";
import PnG from "/src/assets/Logos/Partners/P&G.svg";
import Ross from "/src/assets/Logos/Partners/Ross.svg";
import LiquidIV from "/src/assets/Logos/Partners/LiquidIV.png";

//Collaborators
import BTA from "/src/assets/Logos/Collaborators/BTA.svg";
import Carleton from "/src/assets/Logos/Collaborators/Carleton.svg";
import CarletonIEEE from "/src/assets/Logos/Collaborators/CarletonIEEE.svg";
import CCSS from "/src/assets/Logos/Collaborators/CCSS.png";
import CSSA from "/src/assets/Logos/Collaborators/CSSA.svg";
import EEF from "/src/assets/Logos/Collaborators/EEF.svg";
import IEEE from "/src/assets/Logos/Collaborators/IEEE.svg";
import MakerJam from "/src/assets/Logos/Collaborators/MakerJam.svg";
import SCESoc from "/src/assets/Logos/Collaborators/SCESoc.svg";
import uOCyberSec from "/src/assets/Logos/Collaborators/uOCyberSec.svg";
import uOttawa from "/src/assets/Logos/Collaborators/uOttawa.svg";
import uOttawaGDC from "/src/assets/Logos/Collaborators/uOttawaGDC.svg";
import WIE from "/src/assets/Logos/Collaborators/WIE.svg";

import "./Sponsors.css";
import waves from "../../assets/patterns/wavesOpacity.svg";
import union from "../../assets/patterns/uuunion.svg";

export default function Sponsors() {
	const data = {
		sponsors: [
			{ href: "https://ciena.ca/", ...Ciena, alt: "Ciena" },
			{ href: "https://blackberry.com/", ...Blackberry, alt: "Blackberry" },
			{ href: "https://canadiantire.ca/", ...CanadianTire, alt: "Canadian Tire" },
			{ href: "https://lonehaven.com/", ...lonehaven, alt: "Lonehaven" },
			{ href: "https://www.cse-cst.gc.ca/", ...CSE, alt: "CSE / CST" },
			{ href: "https://vercel.com/", ...Vercel, alt: "Vercel" },
			{ href: "https://github.com/", ...GitHub, alt: "GitHub" },
			{ href: "https://www.digitalocean.com/", ...DigitalOcean, alt: "DigitalOcean" },
			{ href: "https://www.echo3d.com/", ...echo3d, alt: "echo3D" },
			{ href: "https://balsamiq.com/", ...balsamiq, alt: "balsamiq" },
			{ href: "https://www.voiceflow.com/", ...voiceflow, alt: "Voiceflow" },
			{ href: "https://about.google", ...Google, alt: "Google" },
			{ href: "https://www.openproject.org/", ...OpenProject, alt: "OpenProject" },
			{ href: "https://mule.to/p5ni", ...StickerMule, alt: "StickerMule" },
			{ href: "https://www.redbull.com/ca-en/", ...RedBull, alt: "Red Bull" },
			{ href: "https://www.pg.com/", ...PnG, alt: "P&G" },
			{ href: "https://liquid-iv.com/", ...LiquidIV, alt: "Liquid IV" },
			{ href: "https://www.rossvideo.com/", ...Ross, alt: "Ross Video" },
		],
		collaborators: [
			{ href: "https://www.instagram.com/telferbta/", ...BTA, alt: "BTA" },
			{ href: "https://carleton.ca/", ...Carleton, alt: "Carleton University" },
			{ href: "https://www.instagram.com/ieeecarleton/", ...CarletonIEEE, alt: "IEEE Carleton" },
			{ href: "https://ccss.carleton.ca/", ...CCSS, alt: "CCSS" },
			{ href: "https://cssa-aei.ca/", ...CSSA, alt: "CSSA" },
			{ href: "https://www.facebook.com/uottawaeeffdg/", ...EEF, alt: "EEF" },
			{ href: "https://ieeeuottawa.ca/", ...IEEE, alt: "IEEE" },
			{ href: "https://www.uottawa.ca/faculty-engineering/events/maker-jam", ...MakerJam, alt: "MakerJam" },
			{ href: "https://scesoc.ca/", ...SCESoc, alt: "SCESoc" },
			{ href: "https://uocybersec.com/", ...uOCyberSec, alt: "uOttawa CyberSec" },
			{ href: "https://www.uottawa.ca/", ...uOttawa, alt: "uOttawa" },
			{ href: "https://www.instagram.com/uogamedev/", ...uOttawaGDC, alt: "uOttawa GDC" },
			{ href: "https://wie.ieeeottawa.ca/", ...WIE, alt: "WIE" },
		],
	};

	const [hovered, setHovered] = useState(-1);
	const [hovered2, setHovered2] = useState(-1);

	const marqueeGroup = (dataGroup, index, group, pauseAnimation, startAnimation, setHoverGroup) => {
		return (
			<div
				id={`marquee${index}_${group}`}
				className={`marquee-group${group}`}
				onMouseEnter={() => pauseAnimation(group)}
				onMouseLeave={() => startAnimation(group)}
				onFocus={() => pauseAnimation(group)}
				onBlur={() => startAnimation(group)}
			>
				{dataGroup.map((sponsor, i) => (
					<a
						key={i}
						href={sponsor.href}
						target="_blank"
						rel="noreferrer"
						className={`sponsor flex aspect-[3/2] justify-center items-center rounded-lg h-40 md:h-24 p-8 md:p-4 transition-all duration-200
					 ${
							group === 1
								? hovered !== -1 && hovered !== i
									? "opacity-25 translate-x-1 translate-y-1"
									: "bg-opacity-35 translate-x-0 translate-y-0"
								: hovered2 !== -1 && hovered2 !== i
								? "opacity-25 translate-x-1 translate-y-1"
								: "bg-opacity-35 translate-x-0 translate-y-0"
						}`}
						onMouseEnter={() => setHoverGroup(i)}
						onMouseLeave={() => setHoverGroup(-1)}
						onBlur={() => setHoverGroup(-1)}
					>
						<img {...sponsor} alt={`${sponsor.alt} logo`} className="max-w-full max-h-full"></img>
					</a>
				))}
			</div>
		);
	};

	function pauseAnimation(group) {
		document.getElementById(`marquee1_${group}`).style.animationPlayState = "paused";
		document.getElementById(`marquee2_${group}`).style.animationPlayState = "paused";
	}

	function startAnimation(group) {
		document.getElementById(`marquee1_${group}`).style.animationPlayState = "running";
		document.getElementById(`marquee2_${group}`).style.animationPlayState = "running";
	}

	return (
		<div className="w-full flex flex-col gap-8 items-center justify-center">
			<h2 className="mb-12">{t("sponsors.title")}</h2>
			<div className="w-full flex justify-center items-center relative bg-theme-gradient">
				<div className="flex flex-col w-10/12 h-full justify-center items-center gap-20 py-28 text-left max-w-2xl z-[2]">
					<div className="carousel-track z-[2]">
						{marqueeGroup(data.sponsors, 1, 1, pauseAnimation, startAnimation, setHovered)}
						{marqueeGroup(data.sponsors, 2, 1, pauseAnimation, startAnimation, setHovered)}
					</div>
				</div>
				<img src={waves.src} className="absolute top-0 w-full h-20 z-[1]  -translate-y-[1px]" alt="waves"></img>
				<img
					src={waves.src}
					className="absolute bottom-0 w-full h-20 z-[1] -scale-y-100 -scale-x-100 translate-y-[1px]"
					alt="waves"
				></img>
			</div>
			<h2 className="my-8">{t("collaborators.title")}</h2>
			<div className="w-full flex justify-center items-center relative bg-theme-gradient">
				<div className="flex flex-col w-10/12 h-full justify-center items-center gap-20 py-28 text-left max-w-2xl z-[2]">
					<div className="carousel-track z-[2]">
						{marqueeGroup(data.collaborators, 1, 2, pauseAnimation, startAnimation, setHovered2)}
						{marqueeGroup(data.collaborators, 2, 2, pauseAnimation, startAnimation, setHovered2)}
					</div>
				</div>
				<img src={waves.src} className="absolute top-0 w-full h-20 z-[1]  -translate-y-[1px]" alt="waves"></img>
				<img
					src={waves.src}
					className="absolute bottom-0 w-full h-20 z-[1] -scale-y-100 -scale-x-100 translate-y-[1px]"
					alt="waves"
				></img>
			</div>
		</div>
	);
}
