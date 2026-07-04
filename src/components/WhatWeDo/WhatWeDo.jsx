import { t } from "../../i18n";

export default function WhatWeDo() {
	return (
		<section className="w-full flex justify-center items-center bg-background-dark relative z-[2]">
			<div className="flex flex-col w-10/12 h-full justify-center items-center gap-16 py-36 text-left max-w-2xl md:w-11/12">
				<div className="flex flex-col text-start w-full" data-aos="fade-up">
					<h1>{t("what_we_do.title")}</h1>
					<h2 className="text-shadow_text">{t("what_we_do.subtitle")}</h2>
				</div>
				<div className="grid grid-cols-3 gap-6 w-full lg:grid-cols-1">
					{t("what_we_do.pillars").map((pillar, index) => (
						<div
							className="flex flex-col gap-4 bg-blur-svg rounded-3xl p-8 border border-shade-7 hover:border-primary transition-colors duration-300"
							data-aos="fade-up"
							data-aos-delay={index * 100}
							key={pillar.title}
						>
							<h3 className="font-bold">{pillar.title}</h3>
							<p className="text-shade-4">{pillar.description}</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
