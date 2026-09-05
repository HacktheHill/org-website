import { useStore } from "@nanostores/react";
import { useEffect, useState } from "react";
import { locale, t } from "../../i18n";
import logo from "../../assets/Logos/HtH/HtH_red_glow.svg";

export default function Navigation(props) {
	const $locale = useStore(locale);
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const [isScrolled, setIsScrolled] = useState(false);

	useEffect(() => {
		const handleScroll = () => setIsScrolled(window.scrollY > 0);
		const handleResize = () => {
			if (window.innerWidth > 1024) {
				setSidebarOpen(false);
			}
		};

		handleScroll();
		window.addEventListener("scroll", handleScroll, { passive: true });
		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("scroll", handleScroll);
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	return (
		<div className="fixed top-0 h-24 w-screen z-50 flex justify-center items-center lg:h-16">
			<nav
				className={`flex h-2/3 w-11/12 justify-between items-center box-border border-transparent rounded-2xl transition-all duration-500 lg:bg-navbar lg:backdrop-blur-xl lg:w-full lg:rounded-none lg:pr-4 lg:h-full xs:pr-2 ${
					isScrolled ? "bg-navbar backdrop-blur-xl" : "bg-transparent backdrop-blur-none"
				}`}
				aria-label={t("navbar.aria_label")}
			>
				<div className="flex flex-row gap-4 items-center xs:gap-1">
					<a
						href="/"
						aria-label={t("seo.site_name")}
						className="flex h-full items-center bg-transparent border-none p-4 xs:p-2 cursor-pointer transition-all duration-100 opacity-85 hover:opacity-100 focus-visible:opacity-100"
					>
						<img {...logo} alt="" aria-hidden="true" className="w-[75px] xs:w-14" />
					</a>
					<button
						className="flex h-full w-16 xs:w-12 items-center bg-transparent border-none p-4 xs:p-2 cursor-pointer font-bold transition-all duration-100 hover:text-shade-1 focus-visible:text-shade-1"
						type="button"
						aria-label={t("navbar.language_toggle")}
						onClick={() => {
							locale.set($locale === "en" ? "fr" : "en");
						}}
					>
						{`${$locale === "en" ? "fr" : "en"}`.toUpperCase()}
					</button>
					<a
						href="https://2024.hackthehill.com"
						target="_blank"
						rel="noopener noreferrer"
						className="flex h-8 w-24 xs:w-16 justify-center items-center bg-2024-bg bg-cover bg-top border-none rounded-xl p-4 xs:p-2 text-bg-2024 cursor-pointer font-bold transition-all duration-100 opacity-85 hover:opacity-100 focus-visible:opacity-100"
					>
						2024
					</a>
				</div>
				<div>
					<button
						id="menu"
						type="button"
						aria-label={t("navbar.menu_aria_label")}
						aria-expanded={sidebarOpen}
						aria-controls="sidebar"
						className="hidden h-full bg-transparent border-none cursor-pointer p-2 lg:block"
						onClick={() => {
							setSidebarOpen(open => !open);
						}}
					>
						{Array.from({ length: 3 }).map((_, i) => (
							<div
								key={i}
								className={`w-7 h-1 bg-shade-3 my-1 mx-0 transition-all duration-500 rounded-md ${
									sidebarOpen
										? i === 0
											? "translate-y-2 rotate-45"
											: i === 1
												? "opacity-0"
												: "-translate-y-2 -rotate-45"
										: ""
								}`}
							></div>
						))}
					</button>
					<div
						id="sidebar"
						className={
							sidebarOpen
								? "absolute flex flex-col top-16 right-0 z-50 border bg-shade-9 border-shade-7 transition-all duration-500 lg:rounded-bl-xl lg:border-t-0 lg:border-r-0 lg:shadow-md"
								: "flex flex-row gap-4 items-center lg:hidden"
						}
					>
						{["events", "blog", "team", "documents"].map(link => {
							const isCurrentPage = props.pathName === `/${link}`;
							return (
								<a
									href={link ? `/${link}` : "#"}
									className={`flex h-full items-center border-none p-4 cursor-pointer font-bold transition-all duration-100 lg:border lg:rounded-xl hover:text-shade-1 focus-visible:text-shade-1 ${
										isCurrentPage ? "text-shade-1" : "text-shade-3"
									}`}
									aria-current={isCurrentPage ? "page" : undefined}
									key={link}
								>
									{t(`navbar.links.${link}`)}
								</a>
							);
						})}
					</div>
				</div>
			</nav>
		</div>
	);
}
