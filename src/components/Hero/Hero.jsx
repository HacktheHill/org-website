import parliament from "../../assets/SVGs/parliament.svg";
import { t } from "../../i18n";
import Button from "../Button/Button";

export default function Hero() {
	return (
		<div className="flex min-h-dvh w-full justify-center items-center bg-square-svg bg-center bg-cover bg-no-repeat bg-fixed relative md:bg-scroll">
			<div className="flex flex-col justify-center items-center gap-12 translate-y-8 z-10 md:gap-6 max-w-2xl">
				<div id="title" className="flex items-center justify-center" data-aos="fade-up">
					<h1 className="text-[clamp(2rem,8vw,6rem)] leading-[1.05] text-pretty px-4 text-center tracking-wide">
						{t("hero.title")}
					</h1>
				</div>
				<div id="content" className="flex flex-col w-full justify-center items-center gap-8 px-4 md:gap-4">
					<h3 className="font-medium text-3xl text-center md:text-lg" data-aos="fade-up" data-aos-delay="100">
						{t("hero.subtitle")}
					</h3>
					<div data-aos="fade-up" data-aos-delay="200">
						<Button href={t("hero.cta_url")} target="_blank" rel="noopener noreferrer">
							{t("hero.cta_label")}
						</Button>
					</div>
				</div>
			</div>
			<div id="parliament" className="absolute bottom-0 left-0 pointer-events-none w-full">
				<img className="w-full bottom-0" {...parliament} alt="" aria-hidden="true"></img>
			</div>
		</div>
	);
}
