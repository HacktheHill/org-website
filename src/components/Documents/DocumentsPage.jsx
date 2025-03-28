import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import beaver5 from "../../assets/beavar/Beaver5.svg";
import cv from "../../assets/icons/cv.svg";
import shape from "../../assets/patterns/ssshape.svg";
import "../../global.css";
import { t } from "../../i18n";
import Button from "../Button/Button";

export default function DocumentsPage() {
	useEffect(() => {
		AOS.init({ once: false, duration: 700 });
	}, []);

	return (
		<div className="flex justify-center items-center w-full bg-background-dark relative overflow-hidden">
			<div className="flex flex-col w-10/12 h-fu	ll justify-center items-center gap-20 py-36 text-left max-w-2xl z-[1] md:w-11/12">
				<div className="flex flex-col text-left w-full" data-aos="fade-up">
					<h1 data-aos="fade-up">{t("documents.title")}</h1>
				</div>
				<div className="grid grid-rows-3 grid-cols-2 gap-8 w-10/12 max-w-2xl xl:flex xl:flex-wrap">
					<div
						className="flex flex-col items-start justify-between gap-32 md:gap-8 p-8 rounded-3xl bg-blur-svg relative"
						data-aos="fade-right"
					>
						<div className="flex flex-row justify-between items-center w-full gap-4 flex-wrap">
							<h2>{t("documents.constitution")}</h2>
							<img
								className="box-border h-20 w-20 aspect-square object-cover rounded-[50%] shadow-glow md:h-12 md:w-12"
								src={cv.src}
								alt="Document"
							/>
						</div>
						<div>
							<p>{t("documents.constitution_desc")}</p>
							<div className="w-full flex justify-end mt-4">
								<a
									href="https://cdn1.hackthehill.com/legal/constitution.pdf"
									target="_blank"
									rel="noreferrer"
								>
									<Button fill={false}>{t("documents.constitution_btn")}</Button>
								</a>
							</div>
						</div>
						<div className="absolute -top-16 right-0 h-24">
							<img src={beaver5.src} alt="Beaver" className="h-full" />
						</div>
					</div>
					<div
						className="flex flex-col items-start justify-between gap-32 md:gap-8 p-8 rounded-3xl bg-dark overflow-hidden"
						data-aos="fade-left"
					>
						<div className="flex flex-row justify-between items-center w-full gap-4 flex-wrap">
							<h2>{t("documents.policies")}</h2>
							<img
								className="box-border h-20 w-20 aspect-square object-cover rounded-[50%] shadow-glow md:h-12 md:w-12"
								src={cv.src}
								alt="Document"
							/>
						</div>
						<div>
							<p>{t("documents.policies_desc")}</p>
							<div className="w-full flex justify-end mt-4">
								<a
									href="https://cdn1.hackthehill.com/legal/policies-manual.pdf"
									target="_blank"
									rel="noreferrer"
								>
									<Button fill={false}>{t("documents.policies_btn")}</Button>
								</a>
							</div>
						</div>
					</div>
					<div
						className="flex flex-col items-start justify-between gap-32 md:gap-8 p-8 rounded-3xl bg-dark overflow-hidden"
						data-aos="fade-right"
					>
						<div className="flex flex-row justify-between items-center w-full gap-4 flex-wrap">
							<h2>{t("documents.financials")}</h2>
							<img
								className="box-border h-20 w-20 aspect-square object-cover rounded-[50%] shadow-glow md:h-12 md:w-12"
								src={cv.src}
								alt="Document"
							/>
						</div>
						<div>
							<p>{t("documents.financials_desc")}</p>
							<div className="w-full flex justify-end mt-4">
								<a
									href="https://cdn1.hackthehill.com/legal/financials.pdf"
									target="_blank"
									rel="noreferrer"
								>
									<Button fill={false}>{t("documents.financials_btn")}</Button>
								</a>
							</div>
						</div>
					</div>
					<div
						className="flex flex-col items-start justify-between gap-32 md:gap-8 p-8 rounded-3xl bg-dark overflow-hidden"
						data-aos="fade-left"
					>
						<div className="flex flex-row justify-between items-center w-full gap-4 flex-wrap">
							<h2>{t("documents.ledger")}</h2>
							<img
								className="box-border h-20 w-20 aspect-square object-cover rounded-[50%] shadow-glow md:h-12 md:w-12"
								src={cv.src}
								alt="Document"
							/>
						</div>
						<div>
							<p>{t("documents.ledger_desc")}</p>
							<div className="w-full flex justify-end mt-4">
								<a
									href="https://cdn1.hackthehill.com/legal/general-ledger.pdf"
									target="_blank"
									rel="noreferrer"
								>
									<Button fill={false}>{t("documents.ledger_btn")}</Button>
								</a>
							</div>
						</div>
					</div>
					<div
						className="flex flex-col items-start justify-between gap-32 md:gap-8 p-8 rounded-3xl bg-dark overflow-hidden"
						data-aos="fade-right"
					>
						<div className="flex flex-row justify-between items-center w-full gap-4 flex-wrap">
							<h2>{t("documents.privacy")}</h2>
							<img
								className="box-border h-20 w-20 aspect-square object-cover rounded-[50%] shadow-glow md:h-12 md:w-12"
								src={cv.src}
								alt="Document"
							/>
						</div>
						<div>
							<p>{t("documents.privacy_desc")}</p>
							<div className="w-full flex justify-end mt-4">
								<a
									href="https://cdn1.hackthehill.com/legal/privacy-policy.pdf"
									target="_blank"
									rel="noreferrer"
								>
									<Button fill={false}>{t("documents.privacy_btn")}</Button>
								</a>
							</div>
						</div>
					</div>
					<div
						className="flex flex-col items-start justify-between gap-32 md:gap-8 p-8 rounded-3xl bg-blur-svg overflow-hidden"
						data-aos="fade-left"
					>
						<div className="flex flex-row justify-between items-center w-full gap-4 flex-wrap">
							<h2>{t("documents.conduct")}</h2>
							<img
								className="box-border h-20 w-20 aspect-square object-cover rounded-[50%] shadow-glow md:h-12 md:w-12"
								src={cv.src}
								alt="Document"
							/>
						</div>
						<div>
							<p>{t("documents.conduct_desc")}</p>
							<div className="w-full flex justify-end mt-4">
								<a
									href="https://cdn1.hackthehill.com/legal/code-of-conduct.pdf"
									target="_blank"
									rel="noreferrer"
								>
									<Button fill={false}>{t("documents.conduct_btn")}</Button>
								</a>
							</div>
						</div>
					</div>
					<div
						className="flex flex-col items-start justify-between gap-32 md:gap-8 p-8 rounded-3xl bg-dark overflow-hidden"
						data-aos="fade-right"
					>
						<div className="flex flex-row justify-between items-center w-full gap-4 flex-wrap">
							<h2>{t("documents.service")}</h2>
							<img
								className="box-border h-20 w-20 aspect-square object-cover rounded-[50%] shadow-glow md:h-12 md:w-12"
								src={cv.src}
								alt="Document"
							/>
						</div>
						<div>
							<p>{t("documents.service_desc")}</p>
							<div className="w-full flex justify-end mt-4">
								<a
									href="https://cdn1.hackthehill.com/legal/terms-of-service.pdf"
									target="_blank"
									rel="noreferrer"
								>
									<Button fill={false}>{t("documents.service_btn")}</Button>
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
			<img
				src={shape.src}
				alt="shape"
				className="w-full md:w-[200%] md:translate-x-0 md:-translate-y-1/3 max-w-bg-deco opacity-25 absolute z-[0] -translate-x-1/2 -translate-y-1/4"
			/>
			<img
				src={shape.src}
				alt="shape"
				className="w-full md:w-[200%] md:translate-x-0 md:translate-y-1/3 max-w-bg-deco opacity-25 absolute z-[0] translate-x-1/2 translate-y-[10%] -scale-y-75 scale-x-75"
			/>
		</div>
	);
}
