import React, { useState, useEffect } from "react";
import "../../global.css";
import shape from "../../assets/patterns/ssshape.svg";
import { sanityClient } from "sanity:client";
import { useStore } from "@nanostores/react";
import { locale, t } from "../../i18n";
import imageUrlBuilder from "@sanity/image-url";
import AOS from "aos";
import "aos/dist/aos.css";
import { faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import Construction from "../Construction/Construction";

export default function TeamPage({ teams }) {
	const [selectedYear, setSelectedYear] = useState(teams?.sort((a, b) => b.year - a.year)?.[0]?.year?.toString());
	const $locale = useStore(locale);
	const builder = imageUrlBuilder(sanityClient);
	const suf = `year_${selectedYear}`;
	const t_teamNames = t("team.teams");
	const t_positions = t("team.positions");
	const [subTeams, setSubTeams] = useState({});

	function urlFor(source) {
		return builder.image(source);
	}

	useEffect(() => {
		AOS.init({ once: false, duration: 700 });
	}, []);

	const specialRoleCases = ["President", "ExecutiveVP", "CoDirector", "DirectorAtLarge", "Secretary"];

	useEffect(() => {
		const newSubTeams = {};
		teams
			?.filter(currTeam => currTeam?.year?.toString() === selectedYear)?.[0]
			?.members?.forEach(member => {
				const subTeam = specialRoleCases?.includes(member?.position?.[suf])
					? "Executive"
					: member.teamName?.[suf] || "other";

				if (!newSubTeams[subTeam]) {
					newSubTeams[subTeam] = [];
				}
				newSubTeams[subTeam].push(member);
			});
		setSubTeams(newSubTeams);

		setSubTeams(prevState => {
			const newState = { ...prevState };
			Object.keys(newState).forEach(subTeam => {
				newState[subTeam] = newState[subTeam].sort((a, b) => {
					if (a.position?.[suf] === "President") return -1;
					if (b.position?.[suf] === "President") return 1;
					if (a.position?.[suf] === "ExecutiveVP") return -1;
					if (b.position?.[suf] === "ExecutiveVP") return 1;
					if (a.position?.[suf] === "DirectorAtLarge") return -1;
					if (b.position?.[suf] === "DirectorAtLarge") return 1;
					if (a.position?.[suf] === "Secretary") return -1;
					if (b.position?.[suf] === "Secretary") return 1;
					if (a.position?.[suf] === "Director") return -1;
					if (b.position?.[suf] === "Director") return 1;
					if (a.position?.[suf] === "CoDirector") return -1;
					if (b.position?.[suf] === "CoDirector") return 1;
					if (a.position?.[suf] === "VP") return -1;
					if (b.position?.[suf] === "VP") return 1;
					if (a.position?.[suf] === "Manager") return -1;
					if (b.position?.[suf] === "Manager") return 1;
					if (a.position?.[suf] === "Coordinator") return -1;
					if (b.position?.[suf] === "Coordinator") return 1;
					if (a.position?.[suf] === "Advisor") return -1;
					if (b.position?.[suf] === "Advisor") return 1;
					if (a.name < b.name) return -1;
					if (a.name > b.name) return 1;
					return 0;
				});
			});
			return newState;
		});
	}, [selectedYear]);

	const memberCard = (member, i) => (
		<li
			key={i}
			className="basis-1/4 xl:basis-1/3 md:basis-1/2 p-4 md:p-1 min-h-[22rem] md:min-h-[14rem]"
			data-aos="fade-up"
		>
			<div
				className={`flex justify-between flex-col h-full text-center gap-2 md:gap-1 p-4 md:p-2 rounded-3xl overflow-hidden border border-theme-red ${
					member?.position?.[suf] == "VP" ||
					member?.position?.[suf] == "Director" ||
					member?.position?.[suf] == "Manager" ||
					member?.position?.[suf] == "President"
						? "bg-blur-svg"
						: "bg-dark"
				}`}
			>
				<img
					src={
						member?.photo?.[suf]
							? urlFor(member?.photo?.[suf].asset).url()
							: urlFor(
									teams?.filter(currTeam => currTeam?.year?.toString() === selectedYear)[0]
										?.fallbackPhoto?.asset,
							  ).url()
					}
					className="aspect-square object-cover rounded-[50%] shadow-small-glow"
				/>
				<h6 className="mt-2">{member.name}</h6>

				{member?.position?.[suf] && member?.teamName?.[suf] && member?.teamName?.[suf] !== "Executive" ? (
					$locale === "en" ? (
						<h5>{`${t_teamNames[member?.teamName?.[suf]]} ${t_positions[member?.position?.[suf]]}`}</h5>
					) : (
						<h5>{`${t_positions[member?.position?.[suf]]} ${t_teamNames[member?.teamName?.[suf]]} `}</h5>
					)
				) : member?.position?.[suf] ? (
					<h5>{t_positions[member?.position?.[suf]]}</h5>
				) : (
					<h5>{t("team.member")}</h5>
				)}
				<div className="w-full flex flex-row justify-center items-center gap-4 text-xl h-8">
					{member?.linkedin && (
						<a
							href={member?.linkedin}
							target="_blank"
							rel="noreferrer"
							aria-label="LinkedIn"
							className="transition-all duration-300 text-white hover:opacity-100 opacity-80"
						>
							<Icon icon={faLinkedin} />
						</a>
					)}
					{member?.github && (
						<a
							href={member?.github}
							target="_blank"
							rel="noreferrer"
							aria-label="LinkedIn"
							className="transition-all duration-300 text-white
							hover:opacity-100 opacity-80"
						>
							<Icon icon={faGithub} />
						</a>
					)}
					{member?.website && (
						<a
							href={member?.website}
							target="_blank"
							rel="noreferrer"
							aria-label="LinkedIn"
							className="transition-all duration-300 text-white hover:opacity-100 opacity-80"
						>
							<Icon icon={faGlobe} />
						</a>
					)}
				</div>
			</div>
		</li>
	);

	return (
		<div className="flex justify-center items-center w-full bg-background-dark relative overflow-hidden">
			<div className="flex flex-col w-10/12 h-full justify-center items-center gap-20 py-36 text-left max-w-2xl z-[1] md:w-11/12">
				<div className="flex flex-row justify-between items-center text-left w-full" data-aos="fade-up">
					<h1 data-aos="fade-up">{t("team.title")}</h1>
					{/* 
					<select
						className="w-auto h-10 py-2 px-4 rounded-lg bg-blur-svg cursor-pointer"
						onChange={e => setSelectedYear(e.target.value)}
						value={selectedYear}
					>
						{teams
							?.sort((a, b) => b.year - a.year)
							.map((team, i) => (
								<option key={i} value={team.year.toString()}>
									{team.year.toString()}
								</option>
							))}
					</select>
					*/}
				</div>
				<ul className="flex flex-wrap justify-evenly w-10/12 max-w-2xl gap-16">
					{subTeams &&
						Object.keys(subTeams)
							.sort((a, b) => (a === "Executive" ? -1 : b === "Executive" ? 1 : a.localeCompare(b)))
							.map((subTeam, i) => (
								<li key={i} className="w-full">
									<h2>
										{$locale === "en" ? subTeam : t_teamNames?.[subTeam]?.split(" ").slice(-1)[0]}
									</h2>
									<ul className="flex flex-wrap justify-start w-full mt-2">
										{subTeams[subTeam].map((member, i) => memberCard(member, i))}
									</ul>
								</li>
							))}
				</ul>
			</div>
			<img
				src={shape.src}
				alt="shape"
				className="w-full md:w-[200%] md:translate-x-0 md:-translate-y-1/3 top-0 max-w-bg-deco opacity-25 absolute z-[0] -translate-x-1/2 -translate-y-1/4"
			/>
			<img
				src={shape.src}
				alt="shape"
				className="w-full md:w-[200%] md:translate-x-0 md:translate-y-1/3 top-0 max-w-bg-deco opacity-25 absolute z-[0] translate-x-1/2 translate-y-[10%] -scale-y-75 scale-x-75"
			/>
		</div>
	);
}
