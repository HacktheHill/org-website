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
	const [selectedYear, setSelectedYear] = useState(teams?.sort((a, b) => b.year - a.year)?.[0]?.year.toString());
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
		setSubTeams({});
		teams
			?.filter(currTeam => currTeam?.year?.toString() === selectedYear)?.[0]
			?.members.map(member => {
				const subTeam =
					member.teamName === "executive" || specialRoleCases.includes(member.position?.[suf])
						? "executive"
						: member.teamName?.[suf] || "other";

				setSubTeams(prevState => {
					const newState = { ...prevState };
					newState[subTeam] = [...(prevState[subTeam] || []), member];
					return newState;
				});

				return null;
			});

		setSubTeams(prevState => {
			const newState = { ...prevState };
			Object.keys(newState).forEach(subTeam => {
				newState[subTeam] = newState[subTeam].sort((a, b) => {
					if (a.position?.[suf] === "president") return -1;
					if (b.position?.[suf] === "president") return 1;
					if (a.position?.[suf] === "execVP") return -1;
					if (b.position?.[suf] === "execVP") return 1;
					if (a.position?.[suf] === "directorAtLarge") return -1;
					if (b.position?.[suf] === "directorAtLarge") return 1;
					if (a.position?.[suf] === "secretary") return -1;
					if (b.position?.[suf] === "secretary") return 1;
					if (a.position?.[suf] === "director") return -1;
					if (b.position?.[suf] === "director") return 1;
					if (a.position?.[suf] === "VP") return -1;
					if (b.position?.[suf] === "VP") return 1;
					if (a.position?.[suf] === "manager") return -1;
					if (b.position?.[suf] === "manager") return 1;
					if (a.position?.[suf] === "coordinator") return -1;
					if (b.position?.[suf] === "coordinator") return 1;
					if (a.position?.[suf] === "advisor") return -1;
					if (b.position?.[suf] === "advisor") return 1;
					if (a.name < b.name) return -1;
					if (a.name > b.name) return 1;
					return 0;
				});
			});
			return newState;
		});
	}, [selectedYear]);

	const memberCard = (member, i) => (
		<li key={i} className="basis-1/5 xl:basis-1/3 md:basis-1/2 p-4" data-aos="fade-up">
			<div
				className={`flex flex-col text-center gap-2 p-4 rounded-3xl overflow-hidden  border border-theme-red ${
					i % 2 === 0 ? "bg-blur-svg" : "bg-dark"
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
					className="w-full h-full object-cover rounded-[50%] shadow-small-glow"
				/>

				<h6>{member.name}</h6>

				{member?.position?.[suf] && member?.teamName?.[suf] && member?.teamName.[suf] !== "executive" ? (
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
				<div className="w-full flex flex-row justify-center items-center gap-4 text-xl">
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
		<Construction />
		/*
		<div className="flex justify-center items-center w-full bg-background-dark relative overflow-hidden">
			<div className="flex flex-col w-10/12 h-full justify-center items-center gap-20 py-36 text-left max-w-2xl z-[1] md:w-11/12">
				<div className="flex flex-row justify-between items-center text-left w-full" data-aos="fade-up">
					<h1 data-aos="fade-up">{t("team.title")}</h1>
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
				</div>
				<ul className="flex flex-wrap justify-evenly w-10/12 max-w-2xl gap-16">
					{subTeams &&
						Object.keys(subTeams).map((subTeam, i) => (
							<li key={i} className="w-full">
								<h2>{$locale === "en" ? subTeam : t_teamNames[subTeam].split(" ").slice(-1)[0]}</h2>
								<ul className="flex flex-wrap justify-between w-full mt-2">
									{subTeams[subTeam].map((member, i) => memberCard(member, i))}
								</ul>
							</li>
						))}
				</ul>
			</div>
			<img
				src={shape.src}
				alt="shape"
				className="w-full max-w-bg-deco opacity-25 absolute z-[0] -translate-x-1/2 -translate-y-1/4"
			/>
			<img
				src={shape.src}
				alt="shape"
				className="w-full max-w-bg-deco opacity-25 absolute z-[0] translate-x-1/2 translate-y-[10%] -scale-y-75 scale-x-75"
			/>
		</div>
		*/
	);
}
