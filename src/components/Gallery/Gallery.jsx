import { useState, useMemo } from "react";
import beaver3 from "../../assets/beavar/Beaver3.svg";
import ciena1 from "../../assets/gallery/ciena1.webp";
import ciena2 from "../../assets/gallery/ciena2.webp";
import hackhers1 from "../../assets/gallery/hackhers1.webp";
import hackhers2 from "../../assets/gallery/hackhers2.webp";
import HtH1 from "../../assets/gallery/HtH1.webp";
import HtH2 from "../../assets/gallery/HtH2.webp";
import HtH24 from "../../assets/gallery/HtH24.jpg";
import HtH241 from "../../assets/gallery/HtH241.jpg";
import panel1 from "../../assets/gallery/panel1.webp";
import panel2 from "../../assets/gallery/panel2.webp";
import roast1 from "../../assets/gallery/roast1.webp";
import roast2 from "../../assets/gallery/roast2.webp";
import cube from "../../assets/icons/cube.svg";
import cv from "../../assets/icons/cv.svg";
import hacker from "../../assets/icons/hacker.svg";
import handshake from "../../assets/icons/handshake.svg";
import team from "../../assets/icons/team.svg";
import { t } from "../../i18n";
import Button from "../Button/Button";

export default function Gallery() {
	const [activeFolder, setActiveFolder] = useState("hackhers");
	const [selectedAlbum, setSelectedAlbum] = useState("hackhers");

	const albums = [
		{
			tag: "2024",
			card_title: t("gallery.albums.twentytwentyfour.card_title"),
			title: t("gallery.albums.twentytwentyfour.title"),
			description: t("gallery.albums.twentytwentyfour.description"),
			img1: HtH24,
			img2: HtH241,
			link: "https://2024.hackthehill.com",
			statNumber: "800+",
			statDescription: t("gallery.albums.twentytwentyfour.stat"),
			icon: hacker,
		},
		{
			tag: "2023",
			card_title: t("gallery.albums.twentytwentythree.card_title"),
			title: t("gallery.albums.twentytwentythree.title"),
			description: t("gallery.albums.twentytwentythree.description"),
			img1: HtH1,
			img2: HtH2,
			link: "https://2023.hackthehill.com",
			statNumber: "600+",
			statDescription: t("gallery.albums.twentytwentythree.stat"),
			icon: hacker,
		},
		{
			tag: "hackhers",
			card_title: t("gallery.albums.hackhers.card_title"),
			title: t("gallery.albums.hackhers.title"),
			description: t("gallery.albums.hackhers.description"),
			img1: hackhers1,
			img2: hackhers2,
			link: "https://hackhers24.hackthehill.com",
			statNumber: "15+",
			statDescription: t("gallery.albums.hackhers.stat"),
			icon: cube,
		},
		{
			tag: "panel",
			card_title: t("gallery.albums.panel.card_title"),
			title: t("gallery.albums.panel.title"),
			description: t("gallery.albums.panel.description"),
			img1: panel1,
			img2: panel2,
			link: "https://www.linkedin.com/posts/hackthehill_step-into-the-tech-world-mark-your-calendars-activity-7125703991358836738-cpfF/?utm_source=share&utm_medium=member_desktop",
			statNumber: "5",
			statDescription: t("gallery.albums.panel.stat"),
			icon: team,
		},
		{
			tag: "roast",
			card_title: t("gallery.albums.roast.card_title"),
			title: t("gallery.albums.roast.title"),
			description: t("gallery.albums.roast.description"),
			img1: roast1,
			img2: roast2,
			link: "https://www.linkedin.com/posts/hackthehill_ignite-your-career-potential-at-resume-activity-7115750458224189440-7U2-/",
			statNumber: "50+",
			statDescription: t("gallery.albums.roast.stat"),
			icon: cv,
		},
		{
			tag: "ciena",
			card_title: t("gallery.albums.ciena.card_title"),
			title: t("gallery.albums.ciena.title"),
			description: t("gallery.albums.ciena.description"),
			img1: ciena1,
			img2: ciena2,
			link: "https://www.linkedin.com/posts/cuscesoc_cienanetworkingevent-networkingopportunities-ugcPost-7117633554410262528-tRz9/?utm_source=share&utm_medium=member_desktop",
			statNumber: "200+",
			statDescription: t("gallery.albums.ciena.stat"),
			icon: handshake,
		},
	];

	const handleCardClick = tag => {
		setActiveFolder(tag);
		const frames = document.querySelectorAll(".aos-frame");
		frames.forEach(frame => {
			frame.classList.remove("aos-animate");
		});
		setTimeout(() => {
			frames.forEach(frame => {
				frame.classList.add("aos-animate");
			});
			setSelectedAlbum(tag);
		}, 500);
	};

	const selectedAlbumData = useMemo(
		() => albums?.find(album => album.tag === selectedAlbum),
		[selectedAlbum], // don't depend on albums which changes every render
	);

	return (
		<div className="w-full flex bg-background-light justify-center items-center">
			<div className="flex flex-col w-10/12 h-full justify-center items-center gap-20 py-36 text-left max-w-2xl md:w-11/12">
				<div className="flex flex-col text-left w-full" data-aos="fade-up">
					<h1>{t("gallery.title")}</h1>
					<h2 className="text-shadow_text">{t("gallery.subtitle")}</h2>
				</div>
				<div className="flex h-4/6 flex-row justify-between items-center gap-16 2xl:flex-wrap xl:flex-col xl:w-full">
					<div className="flex px-16 justify-start items-start flex-wrap gap-x-8 gap-y-6 md:gap-x-3 2xl:justify-center 2xl:w-full md:px-2">
						{albums.map(album => (
							<button
								type="button"
								key={album.tag}
								aria-pressed={album.tag === activeFolder}
								onClick={() => {
									handleCardClick(album.tag);
								}}
								className="group flex flex-col justify-start items-center gap-3 w-28 min-h-28 cursor-pointer bg-transparent border-none px-1 pb-2"
							>
								<div className="relative mt-3">
									<div
										className={`relative w-14 h-14 border rounded-xl md:w-12 md:h-12 ${
											album.tag === activeFolder
												? "border-primary/50 bg-blur-svg"
												: "border-white/50 bg-transparent"
										}`}
									>
										<div
											className={`absolute inset-0 w-14 h-14 border rounded-xl md:w-12 md:h-12 transition-all duration-300 ${
												album.tag === activeFolder
													? "border-primary/50 bg-blur-svg -translate-y-3 -translate-x-3"
													: "border-white/50 bg-white/10 -translate-y-1.5 -translate-x-1.5 group-hover:-translate-y-2 group-hover:-translate-x-2 group-focus-visible:-translate-y-2 group-focus-visible:-translate-x-2"
											}`}
										></div>
									</div>
								</div>
								<p
									className={`cursor-pointer text-sm text-center leading-tight ${
										album.tag === activeFolder ? "text-white font-bold" : ""
									}`}
								>
									{album.card_title}
								</p>
							</button>
						))}
					</div>
					<div
						className="aspect-[5/3] grid grid-rows-12 grid-cols-12 gap-4 xl:aspect-auto xl:basis-full xl:w-full xl:flex xl:flex-col aos-frame"
						data-aos="zoom-in"
						data-aos-offset="-200"
					>
						<div className="rounded-3xl bg-blur-svg gap-4 flex flex-col justify-between col-start-1 col-end-7 row-start-1 row-end-8 p-8">
							<div className="flex flex-col justify-start items-start gap-8">
								<h3 className="font-bold text-left">{selectedAlbumData?.title}</h3>
								<p className="text-start 2xl:text-[1rem]">{selectedAlbumData?.description}</p>
							</div>
							<div className="flex justify-end">
								<Button href={selectedAlbumData?.link} fill={false}>
									{t("gallery.button_text")}
								</Button>
							</div>
							<div className="absolute -top-16 left-0 h-24">
								<img src={beaver3.src} alt="" aria-hidden="true" className="h-full -scale-x-100" />
							</div>
						</div>
						<div
							className="rounded-3xl bg-dark row-start-8 col-start-1 row-end-13 col-end-9 p-4 md:p-2 xl:aspect-video aos-frame"
							data-aos="zoom-in"
							data-aos-offset="-200"
						>
							<img
								src={selectedAlbumData?.img2.src}
								alt={selectedAlbumData?.title}
								className="w-full h-full object-cover object-left rounded-2xl"
							/>
						</div>
						<div
							className="rounded-3xl bg-dark row-start-1 col-start-7 row-end-8 col-end-13 p-4 md:p-2 xl:aspect-video z-10 aos-frame"
							data-aos="zoom-in"
							data-aos-offset="-200"
						>
							<img
								src={selectedAlbumData?.img1.src}
								alt={selectedAlbumData?.title}
								className="w-full h-full object-cover object-left rounded-2xl"
							/>
						</div>
						<div className="bg-blur-svg rounded-3xl row-start-8 col-start-9 row-end-13 col-end-13 flex flex-col md:flex-row justify-between items-start gap-8 p-8 text-left overflow-hidden">
							<img
								className="box-border h-20 w-20 aspect-square object-cover rounded-[50%] shadow-glow"
								src={selectedAlbumData?.icon.src}
								alt=""
								aria-hidden="true"
							/>
							<div className="md:text-end md:self-center ">
								<h2>{selectedAlbumData?.statNumber}</h2>
								<h4>{selectedAlbumData?.statDescription}</h4>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
