import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { useStore } from "@nanostores/react";
import { createImageUrlBuilder } from "@sanity/image-url";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect, useState } from "react";

import shape from "../../assets/patterns/ssshape.svg";
import { sanityClient } from "sanity:client";
import { locale, t } from "../../i18n";

const executiveRoles = ["President", "ExecutiveVP", "VPOperations", "CoDirector", "DirectorAtLarge", "Secretary"];

const redCardRoles = new Set([
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
]);

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

const contributors = new Set(["Sacha Arseneault", "Erik Ang", "Daniel Thorp", "Surendar Pala Danasekaran"]);

const normalize = str => str?.trim().toLowerCase() ?? "";
const isExecutivePosition = pos => executiveRoles.map(normalize).includes(normalize(pos));
const isExecutiveTeam = team => normalize(team) === "executive";
const getKey = m => m._id ?? `${m.name}-${m.assignment?.position ?? ""}-${m.assignment?.teamName ?? ""}`;
const stripFrenchTeamPrefix = teamName => teamName?.replace(/^(de la|des|du|de l'|de)\s+/i, "") ?? teamName;
const compareTeamGroups = (a, b) => {
	if (a === "Executive") return -1;
	if (b === "Executive") return 1;
	return a.localeCompare(b);
};
const sortRank = rank => {
	if (rank === -1) return Infinity;
	return rank;
};

function TeamMemberCard({
	member,
	suf,
	selectedYear,
	teams,
	getTitle,
	urlFor,
	fallbackAlt,
	linkedinLabel,
	githubLabel,
	websiteLabel,
}) {
	const fallbackAsset = teams.find(t => t.year.toString() === selectedYear)?.fallbackPhoto?.asset;
	const photoAsset = member?.photo?.[suf]?.asset ?? fallbackAsset;
	const photoUrl = photoAsset ? urlFor(photoAsset).url() : "";

	return (
		<li
			className="basis-1/4 xl:basis-1/3 md:!basis-1/2 xs:!basis-full p-4 md:p-1 min-h-[22rem] md:min-h-[14rem] xs:!min-h-[20rem]"
			data-aos="fade-up"
		>
			<div
				className={`flex justify-between flex-col h-full text-center gap-2 md:gap-1 p-4 md:p-2 rounded-3xl overflow-hidden border border-theme-red transition-all ease-in-out duration-300 hover:-translate-y-2 hover:border-primary focus-within:-translate-y-2 focus-within:border-primary ${
					redCardRoles.has(member.assignment?.position) ? "bg-blur-svg" : "bg-dark"
				} ${contributors.has(member.name) ? "hover:animate-glow" : ""}`}
			>
				<img
					src={photoUrl}
					alt={member?.name || fallbackAlt}
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
							rel="noopener noreferrer"
							aria-label={linkedinLabel}
							className="transition-all duration-300 text-white hover:opacity-100 focus-visible:opacity-100 opacity-80"
						>
							<Icon icon={faLinkedin} />
						</a>
					)}
					{member.github && (
						<a
							href={member.github}
							target="_blank"
							rel="noopener noreferrer"
							aria-label={githubLabel}
							className="transition-all duration-300 text-white hover:opacity-100 focus-visible:opacity-100 opacity-80"
						>
							<Icon icon={faGithub} />
						</a>
					)}
					{member.website && (
						<a
							href={member.website}
							target="_blank"
							rel="noopener noreferrer"
							aria-label={websiteLabel}
							className="transition-all duration-300 text-white hover:opacity-100 focus-visible:opacity-100 opacity-80"
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
	// ⚡ Bolt Optimization: Extracted store subscriptions (t() calls) to the parent component.
	// Passing them as static strings to TeamMemberCard prevents up to O(n) unnecessary
	// store subscriptions where n is the number of team members (100+).
	// Impact: Significantly reduces React hook overhead during list renders.
	const $locale = useStore(locale);
	const t_teamNames = t("team.teams");
	const t_positions = t("team.positions");
	const memberLabel = t("team.member");
	const fallbackAlt = t("team.fallbackPhotoAlt");
	const linkedinLabel = t("accessibility.linkedin");
	const githubLabel = t("accessibility.github");
	const websiteLabel = t("accessibility.website");

	const builder = createImageUrlBuilder(sanityClient);
	const urlFor = source => builder.image(source);

	const defaultYear = teams[0]?.year.toString() ?? "";
	const [selectedYear, setSelectedYear] = useState(() => {
		if (typeof globalThis.window !== "undefined") {
			const param = new URLSearchParams(globalThis.location.search).get("year");
			const validYears = teams.map(t => t.year.toString());
			return validYears.includes(param) ? param : defaultYear;
		}
		return defaultYear;
	});

	const suf = `year_${selectedYear}`;
	const [subTeams, setSubTeams] = useState({});

	// Sync year param in URL
	useEffect(() => {
		const params = new URLSearchParams(globalThis.location.search);
		if (selectedYear === defaultYear) {
			params.delete("year");
		} else {
			params.set("year", selectedYear);
		}
		const queryString = params.toString();
		const newUrl = queryString ? `${globalThis.location.pathname}?${queryString}` : globalThis.location.pathname;
		globalThis.history.replaceState({}, "", newUrl);
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
					if (!newSubTeams["Executive"]) {
						newSubTeams["Executive"] = [];
					}
					newSubTeams["Executive"].push({ ...member, assignment: effectiveExec });
				}
			}

			for (const a of assignments) {
				const teamName = a?.teamName?.trim();
				if (teamName && !isExecutiveTeam(teamName)) {
					if (!newSubTeams[teamName]) {
						newSubTeams[teamName] = [];
					}
					newSubTeams[teamName].push({ ...member, assignment: a });
				}
			}
		}

		Object.entries(newSubTeams).forEach(([key, members]) => {
			newSubTeams[key] = members.sort((a, b) => {
				const rankA = rankOrder.indexOf(a.assignment?.position?.trim() ?? "");
				const rankB = rankOrder.indexOf(b.assignment?.position?.trim() ?? "");
				return sortRank(rankA) - sortRank(rankB);
			});
		});

		setSubTeams(newSubTeams);
	}, [selectedYear, teams]);

	const getTitle = member => {
		const a = member.assignment;
		if (!a) return memberLabel;

		const team = a.teamName?.trim();
		const pos = a.position?.trim();
		if (!pos) return memberLabel;

		const teamLabel = t_teamNames?.[team] ?? team ?? "";
		const positionLabel = t_positions?.[pos] ?? pos ?? "";

		if (isExecutiveTeam(team)) return positionLabel;
		if (["vp", "co-vp"].includes(normalize(pos))) {
			if ($locale === "en") return `${positionLabel} of ${teamLabel}`;
			return `${positionLabel} ${teamLabel}`;
		}

		if ($locale === "en") return `${teamLabel} ${positionLabel}`;
		return `${positionLabel} ${teamLabel}`;
	};

	return (
		<div className="flex justify-center items-center w-full bg-background-dark relative overflow-hidden">
			<div className="flex flex-col w-10/12 h-full justify-center items-center gap-20 py-36 text-left max-w-2xl z-[1] md:w-11/12">
				<div
					className="flex flex-row justify-between items-center text-left w-full xs:flex-col xs:items-start xs:gap-4"
					data-aos="fade-up"
				>
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

				<ul className="flex flex-wrap justify-evenly w-10/12 md:w-full max-w-2xl gap-16 md:gap-10">
					{Object.keys(subTeams)
						.sort(compareTeamGroups)
						.map(subTeam => (
							<li key={subTeam} className="w-full">
								<h2>
									{$locale === "en"
										? t_teamNames[subTeam]
										: stripFrenchTeamPrefix(t_teamNames[subTeam])}
								</h2>
								<ul className="flex flex-wrap justify-start w-full mt-2">
									{subTeams[subTeam].map(member => (
										<TeamMemberCard
											fallbackAlt={fallbackAlt}
											linkedinLabel={linkedinLabel}
											githubLabel={githubLabel}
											websiteLabel={websiteLabel}
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
				alt=""
				aria-hidden="true"
				className="w-full md:w-[200%] md:translate-x-0 md:-translate-y-1/3 top-0 max-w-bg-deco opacity-25 absolute z-[0] -translate-x-1/2 -translate-y-1/4"
			/>
			<img
				src={shape.src}
				alt=""
				aria-hidden="true"
				className="w-full md:w-[200%] md:translate-x-0 md:translate-y-1/3 top-0 max-w-bg-deco opacity-25 absolute z-[0] translate-x-1/2 translate-y-[10%] -scale-y-75 scale-x-75"
			/>
		</div>
	);
}
