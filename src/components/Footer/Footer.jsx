import { faFacebook, faInstagram, faLinkedin, faTiktok, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import beaver from "../../assets/beavar/Beaver.svg";
import { t } from "../../i18n";

export default function Footer() {
	const [isMouseLeaving, setIsMouseLeaving] = useState(null);
	const [isHeartActive, setIsHeartActive] = useState(false);
	const [isBeaverActive, setIsBeaverActive] = useState(false);

	const handleMouseLeave = iconName => {
		setIsMouseLeaving(iconName);
		setTimeout(() => setIsMouseLeaving(null), 250);
	};

	const toggleHeart = () => {
		if (!isHeartActive) {
			setIsHeartActive(true);
			setTimeout(() => setIsHeartActive(false), 3000);
		}
	};

	const toggleBeaver = () => {
		if (!isBeaverActive) {
			setIsBeaverActive(true);
			setTimeout(() => setIsBeaverActive(false), 6000);
		}
	};

	return (
		<div className="h-auto w-full flex relative overflow-hidden pt-20 bg-background-dark">
			<button
				type="button"
				aria-label={t("accessibility.beaver")}
				className={`h-24 z-[1] absolute bottom-0 left-16 lg:hidden cursor-pointer bg-transparent border-none p-0 ${
					isBeaverActive ? "animate-beaver" : ""
				}`}
				onClick={toggleBeaver}
			>
				<img src={beaver.src} alt="" aria-hidden="true" className="h-full" />
			</button>
			<div className="flex flex-row w-full justify-between items-center gap-8 pl-64 pr-16 py-4 flex-wrap lg:px-8 md:justify-center bg-background-light ">
				<div className="flex flex-row gap-8 justify-start items-center flex-wrap lg:justify-center">
					<p className="text-white text-xs whitespace-nowrap md:whitespace-normal md:text-center">
						{t("footer.copyright")}
					</p>
					<div className="flex gap-4 text-xl">
						<a
							href="https://www.facebook.com/canadascapitalhackathon"
							target="_blank"
							rel="noreferrer"
							aria-label={t("accessibility.facebook")}
							className={`transition-all duration-300 hover:animate-shake-rotate text-white hover:opacity-100 focus-visible:opacity-100 opacity-85 ${
								isMouseLeaving === "facebook" ? "animate-shake-end" : ""
							}`}
							onMouseLeave={() => handleMouseLeave("facebook")}
						>
							<Icon icon={faFacebook} />
						</a>
						<a
							href="https://www.linkedin.com/company/hackthehill"
							target="_blank"
							rel="noreferrer"
							aria-label={t("accessibility.linkedin")}
							className={`transition-all duration-300 hover:animate-shake-rotate text-white hover:opacity-100 focus-visible:opacity-100 opacity-80 ${
								isMouseLeaving === "linkedin" ? "animate-shake-end" : ""
							}`}
							onMouseLeave={() => handleMouseLeave("linkedin")}
						>
							<Icon icon={faLinkedin} />
						</a>
						<a
							href="https://www.instagram.com/hackthehill"
							target="_blank"
							rel="noreferrer"
							aria-label={t("accessibility.instagram")}
							className={`transition-all duration-300 hover:animate-shake-rotate text-white hover:opacity-100 focus-visible:opacity-100 opacity-80 ${
								isMouseLeaving === "instagram" ? "animate-shake-end" : ""
							}`}
							onMouseLeave={() => handleMouseLeave("instagram")}
						>
							<Icon icon={faInstagram} />
						</a>
						<a
							href="https://twitter.com/hackthehill_"
							target="_blank"
							rel="noreferrer"
							aria-label={t("accessibility.twitter")}
							className={`transition-all duration-300 hover:animate-shake-rotate text-white hover:opacity-100 focus-visible:opacity-100 opacity-80 ${
								isMouseLeaving === "twitter" ? "animate-shake-end" : ""
							}`}
							onMouseLeave={() => handleMouseLeave("twitter")}
						>
							<Icon icon={faTwitter} />
						</a>
						<a
							href="https://www.tiktok.com/@hackthehill"
							target="_blank"
							rel="noreferrer"
							aria-label={t("accessibility.tiktok")}
							className={`transition-all duration-300 hover:animate-shake-rotate text-white hover:opacity-100 focus-visible:opacity-100 opacity-80 ${
								isMouseLeaving === "tiktok" ? "animate-shake-end" : ""
							}`}
							onMouseLeave={() => handleMouseLeave("tiktok")}
						>
							<Icon icon={faTiktok} />
						</a>
					</div>
				</div>
				<div className="flex items-center gap-0.5">
					<p className="text-white text-sm whitespace-nowrap font-bold">{t("footer.message")}</p>
					<button
						type="button"
						className={`self-center text-white text-sm whitespace-nowrap font-bold bg-transparent border-none p-0 ${
							isHeartActive ? "animate-heart" : ""
						}`}
						onClick={toggleHeart}
					>
						<span role="img" aria-label={t("accessibility.heart")} className="cursor-pointer">
							❤️
						</span>
					</button>
				</div>
			</div>
		</div>
	);
}
