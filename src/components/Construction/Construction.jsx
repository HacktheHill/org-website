import Button from "../Button/Button";
import { t } from "../../i18n";
import beaver_construction from "../../assets/beavar/beaver_construction.svg";
import shape from "../../assets/patterns/ssshape.svg";

export default function Construction({ pageNotFound = false }) {
	return (
		<div className="flex justify-center items-center w-full h-screen bg-background-dark relative overflow-hidden">
			<div className="flex flex-col w-10/12 h-full justify-center items-center gap-20 py-36 text-left max-w-2xl z-[1]">
				<div
					className="flex flex-col items-start gap-10 p-8 rounded-3xl bg-blur-svg relative w-1/2 lg:w-full mt-32"
					data-aos="fade-up"
				>
					<h2 className="mt-8">{pageNotFound ? t("fourofour.title") : t("construction.title")}</h2>
					<p>{pageNotFound ? t("fourofour.subtitle") : t("construction.subtitle")}</p>

					<div className="self-end">
						<Button fill={false} href="/">
							{t("construction.home_btn")}
						</Button>
					</div>
					<div className="absolute -top-[8.5rem] right-1/2 h-48">
						<img src={beaver_construction.src} alt="" aria-hidden="true" className="h-full" />
					</div>
				</div>
			</div>
			<img
				src={shape.src}
				alt=""
				aria-hidden="true"
				className="w-full max-w-bg-deco opacity-25 absolute z-[0] -translate-x-1/2 -translate-y-1/4"
			/>
			<img
				src={shape.src}
				alt=""
				aria-hidden="true"
				className="w-full max-w-bg-deco opacity-25 absolute z-[0] translate-x-1/2 translate-y-[10%] -scale-y-75 scale-x-75"
			/>
		</div>
	);
}
