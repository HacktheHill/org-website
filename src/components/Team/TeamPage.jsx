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
	const t_teamNames = t("team.teams");
	const t_positions = t("team.positions");
	let suf = `year_${selectedYear}`;
	const [subTeams, setSubTeams] = useState({});

	function urlFor(source) {
		return builder.image(source);
	}

	useEffect(() => {
		AOS.init({ once: false, duration: 700 });
	}, []);

	const executiveRoles = ["President", "ExecutiveVP", "VPOperations", "CoDirector", "DirectorAtLarge", "Secretary"];

	useEffect(() => {
		const newSubTeams = {};
		const teamObj = teams?.find(currTeam => currTeam?.year?.toString() === selectedYear);
		teamObj?.members?.forEach(member => {
			const assignmentsForYear = member.assignments?.[suf] || [];
			const hasExecutive = assignmentsForYear.some(
				a => executiveRoles.includes(a.position) || a.teamName === "Executive",
			);
			if (hasExecutive) {
				// For board of directors, determine the effective assignment:
				// Use the assignment whose position is in executiveRoles
				let effectiveExec = assignmentsForYear.find(a => executiveRoles.includes(a.position));
				if (!effectiveExec) {
					const alternative = assignmentsForYear.find(
						a => !executiveRoles.includes(a.position) && a.position,
					);
					effectiveExec = alternative || assignmentsForYear.find(a => executiveRoles.includes(a.position));
				}
				if (!newSubTeams["Executive"]) {
					newSubTeams["Executive"] = [];
				}
				// Force grouping under 'Executive' for board of directors
				newSubTeams["Executive"].push({ ...member, assignment: effectiveExec });
			}
			// For assignments that are not part of the Executive grouping, add them normally
			assignmentsForYear.forEach(assignment => {
				if (assignment.teamName !== "Executive") {
					const group = assignment.teamName || "Member";
					if (!newSubTeams[group]) {
						newSubTeams[group] = [];
					}
					newSubTeams[group].push({ ...member, assignment });
				}
			});
		});

		Object.keys(newSubTeams).forEach(subTeam => {
			newSubTeams[subTeam] = newSubTeams[subTeam].sort((a, b) => {
				const rankOrder = [
					"President",
					"VPOperations",
					"ExecutiveVP",
					"DirectorAtLarge",
					"Secretary",
					"Director",
					"CoDirector",
					"Co-VP",
					"VP",
					"Manager",
					"Coordinator",
					"Advisor",
				];
				const rankA =
					rankOrder.indexOf(a.assignment.position) !== -1
						? rankOrder.indexOf(a.assignment.position)
						: Infinity;
				const rankB =
					rankOrder.indexOf(b.assignment.position) !== -1
						? rankOrder.indexOf(b.assignment.position)
						: Infinity;
				if (rankA !== rankB) return rankA - rankB;
				return a.name.localeCompare(b.name);
			});
		});

		setSubTeams(newSubTeams);
	}, [selectedYear, teams]);

	const redCardRoles = [
		"President",
		"VPOperations",
		"ExecutiveVP",
		"Director",
		"VP",
		"Co-VP",
		"Manager",
		"CoDirector",
		"DirectorAtLarge",
		"Secretary",
	];

	const memberCard = (member, i) => (
		<li
			key={i}
			className="basis-1/4 xl:basis-1/3 md:basis-1/2 p-4 md:p-1 min-h-[22rem] md:min-h-[14rem]"
			data-aos="fade-up"
		>
			<div
				className={`flex justify-between flex-col h-full text-center gap-2 md:gap-1 p-4 md:p-2 rounded-3xl overflow-hidden border border-theme-red transition-all ease-in-out duration-300 hover:-translate-y-2 hover:border-primary ${
					redCardRoles.includes(member.assignment.position) ? "bg-blur-svg" : "bg-dark"
				} ${(member.name === "Sacha Arseneault" || member.name === "Erik Ang") && "hover:animate-glow"}`}
			>
				<img
					src={
						member?.photo?.[suf]
							? urlFor(member?.photo?.[suf].asset).url()
							: urlFor(
									teams?.find(currTeam => currTeam?.year?.toString() === selectedYear)?.fallbackPhoto
										?.asset,
							  ).url()
					}
					loading="lazy"
					alt={member.name}
					className="aspect-square object-cover rounded-[50%] shadow-small-glow"
				/>
				<h6 className="mt-2">{member.name}</h6>

				{member.assignment && member.assignment.teamName && member.assignment.position ? (
					member.assignment.teamName === "Executive" ? (
						<h5>{t_positions[member.assignment.position]}</h5>
					) : member.assignment.position === "VP" || member.assignment.position === "CoVP" ? (
						<h5>{`${t_positions[member.assignment.position]} of ${
							t_teamNames[member.assignment.teamName]
						}`}</h5>
					) : $locale === "en" ? (
						<h5>{`${t_teamNames[member.assignment.teamName]} ${
							t_positions[member.assignment.position]
						}`}</h5>
					) : (
						<h5>{`${t_positions[member.assignment.position]} ${
							t_teamNames[member.assignment.teamName]
						}`}</h5>
					)
				) : member.assignment && member.assignment.position ? (
					<h5>{t_positions[member.assignment.position]}</h5>
				) : (
					<h5>{t_positions?.member}</h5>
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
							className="transition-all duration-300 text-white hover:opacity-100 opacity-80"
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
						Object.keys(subTeams)
							.sort((a, b) => (a === "Executive" ? -1 : b === "Executive" ? 1 : a.localeCompare(b)))
							.map((subTeam, i) => (
								<li key={i} className="w-full">
									<h2>
										{subTeam === "Executive"
											? t_teamNames?.[subTeam]
											: $locale === "en"
											? t_teamNames?.[subTeam]
											: t_teamNames?.[subTeam]?.split(" ").slice(-1)[0]}
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
