import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useStore } from "@nanostores/react";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import imageUrlBuilder from "@sanity/image-url";

import "../../global.css";
import shape from "../../assets/patterns/ssshape.svg";

import { sanityClient } from "sanity:client";
import { locale, t } from "../../i18n";

const executiveRoles = ["President", "ExecutiveVP", "VPOperations", "CoDirector", "DirectorAtLarge", "Secretary"];

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

const contributors = ["Sacha Arseneault", "Erik Ang", "Daniel Thorp", "Surendar Pala Danasekaran"];

const normalize = str => str?.trim().toLowerCase() ?? "";
const isExecutivePosition = pos => executiveRoles.map(normalize).includes(normalize(pos));
const isExecutiveTeam = team => normalize(team) === "executive";
const getKey = m => m._id ?? `${m.name}-${m.assignment?.position ?? ""}-${m.assignment?.teamName ?? ""}`;

function TeamMemberCard({ member, suf, selectedYear, teams, getTitle, urlFor }) {
	const fallbackAsset = teams.find(t => t.year.toString() === selectedYear)?.fallbackPhoto?.asset;
	const photoAsset = member?.photo?.[suf]?.asset ?? fallbackAsset;
	const photoUrl = photoAsset ? urlFor(photoAsset).url() : "";

	return (
		<li
			className="basis-1/4 xl:basis-1/3 md:basis-1/2 p-4 md:p-1 min-h-[22rem] md:min-h-[14rem]"
			data-aos="fade-up"
		>
			<div
				className={`flex justify-between flex-col h-full text-center gap-2 md:gap-1 p-4 md:p-2 rounded-3xl overflow-hidden border border-theme-red transition-all ease-in-out duration-300 hover:-translate-y-2 hover:border-primary ${
					redCardRoles.includes(member.assignment?.position) ? "bg-blur-svg" : "bg-dark"
				} ${contributors.includes(member.name) ? "hover:animate-glow" : ""}`}
			>
				<img
					src={photoUrl}
					alt={member?.name || t("team.fallbackPhotoAlt")}
					loading="lazy"
					className="aspect-square object-cover rounded-[50%] shadow-small-glow"
				/>
				<h6 className="mt-2">{member.name}</h6>
				<h5>{getTitle(member)}</h5>
				<div className="w-full flex justify-center gap-4 text-xl h-8">
					{member.linkedin && (
						<a
							href={member.linkedin}
							target="_blank"
							rel="noreferrer"
							aria-label="LinkedIn"
							className="transition-all duration-300 text-white hover:opacity-100 opacity-80"
						>
							<Icon icon={faLinkedin} />
						</a>
					)}
					{member.github && (
						<a
							href={member.github}
							target="_blank"
							rel="noreferrer"
							aria-label="GitHub"
							className="transition-all duration-300 text-white hover:opacity-100 opacity-80"
						>
							<Icon icon={faGithub} />
						</a>
					)}
					{member.website && (
						<a
							href={member.website}
							target="_blank"
							rel="noreferrer"
							aria-label="Website"
							className="transition-all duration-300 text-white hover:opacity-100 opacity-80"
						>
							<Icon icon={faGlobe} />
						</a>
					)}
				</div>
			</div>
		</li>
	);
}

export default function TeamPage({ teams }) {
	const $locale = useStore(locale);
	const t_teamNames = t("team.teams");
	const t_positions = t("team.positions");

	const builder = imageUrlBuilder(sanityClient);
	const urlFor = source => builder.image(source);

	const defaultYear = teams[0]?.year.toString() ?? "";
	const [selectedYear, setSelectedYear] = useState(() => {
		if (typeof window !== "undefined") {
			const param = new URLSearchParams(window.location.search).get("year");
			const validYears = teams.map(t => t.year.toString());
			return validYears.includes(param) ? param : defaultYear;
		}
		return defaultYear;
	});

	const suf = `year_${selectedYear}`;
	const [subTeams, setSubTeams] = useState({});

	// Sync year param in URL
	useEffect(() => {
		const params = new URLSearchParams(window.location.search);
		if (selectedYear === defaultYear) {
			params.delete("year");
		} else {
			params.set("year", selectedYear);
		}
		const newUrl = `${window.location.pathname}${params.toString() ? `?${params.toString()}` : ""}`;
		window.history.replaceState({}, "", newUrl);
	}, [selectedYear, defaultYear]);

	// Init AOS
	useEffect(() => {
		AOS.init({ once: false, duration: 700 });
	}, []);

	// Organize subTeams
	useEffect(() => {
		const teamObj = teams.find(t => t.year.toString() === selectedYear);
		if (!teamObj) return setSubTeams({});

		const newSubTeams = {};

		for (const member of teamObj.members || []) {
			const assignments = member.assignments?.[suf] ?? [];

			const isExec = assignments.some(a => isExecutivePosition(a?.position) || isExecutiveTeam(a?.teamName));

			if (isExec) {
				const effectiveExec =
					assignments.find(a => isExecutivePosition(a?.position)) ||
					assignments.find(a => a?.position) ||
					assignments[0];
				if (effectiveExec) {
					(newSubTeams["Executive"] ??= []).push({ ...member, assignment: effectiveExec });
				}
			}

			for (const a of assignments) {
				const teamName = a?.teamName?.trim();
				if (teamName && !isExecutiveTeam(teamName)) {
					const group = teamName || "Member";
					(newSubTeams[group] ??= []).push({ ...member, assignment: a });
				}
			}
		}

		Object.entries(newSubTeams).forEach(([key, members]) => {
			newSubTeams[key] = members.sort((a, b) => {
				const rankA = rankOrder.indexOf(a.assignment?.position?.trim() ?? "");
				const rankB = rankOrder.indexOf(b.assignment?.position?.trim() ?? "");
				return (rankA === -1 ? Infinity : rankA) - (rankB === -1 ? Infinity : rankB);
			});
		});

		setSubTeams(newSubTeams);
	}, [selectedYear, teams]);

	const getTitle = member => {
		const a = member.assignment;
		if (!a) return t_positions?.member;

		const team = a.teamName?.trim();
		const pos = a.position?.trim();
		if (!pos) return t_positions?.member;

		const teamLabel = t_teamNames?.[team] ?? team ?? "";
		const positionLabel = t_positions?.[pos] ?? pos ?? "";

		if (isExecutiveTeam(team)) return positionLabel;
		if (["vp", "co-vp"].includes(normalize(pos))) return `${positionLabel} of ${teamLabel}`;

		return $locale === "en" ? `${teamLabel} ${positionLabel}` : `${positionLabel} ${teamLabel}`;
	};

	return (
		<div className="flex justify-center items-center w-full bg-background-dark relative overflow-hidden">
			<div className="flex flex-col w-10/12 h-full justify-center items-center gap-20 py-36 text-left max-w-2xl z-[1] md:w-11/12">
				<div className="flex flex-row justify-between items-center text-left w-full" data-aos="fade-up">
					<h1>{t("team.title")}</h1>
					<select
						className="w-auto h-10 py-2 px-4 rounded-lg bg-blur-svg cursor-pointer"
						onChange={e => setSelectedYear(e.target.value)}
						value={selectedYear}
						aria-label={t("team.selectYear")}
					>
						{teams.map(team => (
							<option key={team.year} value={String(team.year)}>
								{team.year}
							</option>
						))}
					</select>
				</div>

				<ul className="flex flex-wrap justify-evenly w-10/12 max-w-2xl gap-16">
					{Object.keys(subTeams)
						.sort((a, b) => (a === "Executive" ? -1 : b === "Executive" ? 1 : a.localeCompare(b)))
						.map(subTeam => (
							<li key={subTeam} className="w-full">
								<h2>
									{subTeam === "Executive"
										? t_teamNames[subTeam]
										: $locale === "en"
										? t_teamNames[subTeam]
										: t_teamNames[subTeam]?.split(" ").slice(-1)[0]}
								</h2>
								<ul className="flex flex-wrap justify-start w-full mt-2">
									{subTeams[subTeam].map(member => (
										<TeamMemberCard
											key={getKey(member)}
											member={member}
											suf={suf}
											selectedYear={selectedYear}
											teams={teams}
											getTitle={getTitle}
											urlFor={urlFor}
										/>
									))}
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
