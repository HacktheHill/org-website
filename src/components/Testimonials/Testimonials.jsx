import beaver4 from "../../assets/beavar/Beaver4.svg";
import quote from "../../assets/icons/quote.svg";
import blob from "../../assets/patterns/blob.svg";
import { t } from "../../i18n";
import Button from "../Button/Button";

export default function Testimonials() {
	const tTestimonials = t("testimonials");
	const testimonialData = [
		{
			id: 3,
			name: tTestimonials.t3.name,
			content: tTestimonials.t3.content,
			role: tTestimonials.t3.role,
			img: "https://cdn1.hackthehill.com/testimonials/britt-hayman.webp",
		},
		{
			id: 6,
			name: tTestimonials.t6.name,
			content: tTestimonials.t6.content,
			role: tTestimonials.t6.role,
			img: "https://cdn1.hackthehill.com/testimonials/greg-suignard.webp",
		},
		{
			id: 7,
			name: tTestimonials.t7.name,
			content: tTestimonials.t7.content,
			role: tTestimonials.t7.role,
			img: "https://cdn1.hackthehill.com/testimonials/elmira-khani.webp",
		},
		{
			id: 1,
			name: tTestimonials.t1.name,
			content: tTestimonials.t1.content,
			role: tTestimonials.t1.role,
			img: "https://cdn1.hackthehill.com/testimonials/maddie-whibbs.webp",
		},
		{
			id: 2,
			name: tTestimonials.t2.name,
			content: tTestimonials.t2.content,
			role: tTestimonials.t2.role,
			img: "https://cdn1.hackthehill.com/testimonials/adam-laderoute.webp",
		},
	];

	return (
		<div className="flex justify-center items-center w-full bg-background-dark">
			<div className="relative flex flex-col w-10/12 h-full justify-center items-center gap-20 py-36 text-left max-w-2xl overflow-hidden md:w-11/12">
				<div className="flex flex-col text-left w-full z-[1]" data-aos="fade-up">
					<h1>{tTestimonials.title}</h1>
					<h2 className="text-shadow_text">{tTestimonials.subtitle}</h2>
				</div>
				<div className="grid gap-4 grid-rows-12 grid-cols-12 w-full max-w-2xl xl:flex xl:flex-col xl:px-4 xl:gap-2 z-[1]">
					<div
						className="flex flex-col justify-between items-start gap-8 bg-blur-svg rounded-3xl p-8 row-start-1 col-start-8 row-end-10 col-end-13"
						data-aos="fade-left"
					>
						<div className="flex flex-row items-center gap-4">
							<img
								className="box-border h-20 w-20 aspect-square object-cover rounded-[50%]"
								src={testimonialData[2].img}
								alt={testimonialData[2].name}
							/>
							<div>
								<h4>{testimonialData[2].name}</h4>
								<p>{testimonialData[2].role}</p>
							</div>
						</div>
						<div className="flex flex-row gap-6">
							<img
								{...quote}
								alt=""
								aria-hidden="true"
								className="w-6 aspect-square self-start opacity-85 md:w-3"
							/>
							<p>{testimonialData[2].content}</p>
							<img
								{...quote}
								alt=""
								aria-hidden="true"
								className="-scale-100 w-6 aspect-square self-end opacity-85 md:w-3"
							/>
						</div>
						<div className="absolute -top-16 right-0 h-24">
							<img src={beaver4.src} alt="" aria-hidden="true" className="h-full" />
						</div>
					</div>
					<div
						className="flex flex-col justify-between items-start gap-8 bg-dark overflow-hidden rounded-3xl p-8 row-start-1 col-start-1 row-end-8 col-end-8"
						data-aos="fade-right"
					>
						<div className="flex flex-row items-center gap-4">
							<img
								className="box-border h-20 w-20 aspect-square object-cover rounded-[50%] shadow-glow"
								src={testimonialData[0].img}
								alt={testimonialData[0].name}
							/>
							<div>
								<h4>{testimonialData[0].name}</h4>
								<p>{testimonialData[0].role}</p>
							</div>
						</div>
						<div className="flex flex-row gap-6">
							<img
								{...quote}
								alt=""
								aria-hidden="true"
								className="w-6 aspect-square self-start opacity-85 md:w-3"
							/>
							<p>{testimonialData[0].content}</p>
							<img
								{...quote}
								alt=""
								aria-hidden="true"
								className="-scale-100 w-6 aspect-square self-end opacity-85 md:w-3"
							/>
						</div>
					</div>
					<div
						className="flex flex-col justify-between items-start gap-8 bg-blur-svg overflow-hidden rounded-3xl p-8 row-start-8 col-start-1 row-end-13 col-end-8"
						data-aos="fade-up"
					>
						<div className="flex flex-row items-center gap-4">
							<img
								className="box-border h-20 w-20 aspect-square object-cover rounded-[50%]"
								src={testimonialData[1].img}
								alt={testimonialData[1].name}
							/>
							<div>
								<h4>{testimonialData[1].name}</h4>
								<p>{testimonialData[1].role}</p>
							</div>
						</div>
						<div className="flex flex-row gap-6">
							<img
								{...quote}
								alt=""
								aria-hidden="true"
								className="w-6 aspect-square self-start opacity-85 md:w-3"
							/>
							<p>{testimonialData[1].content}</p>
							<img
								{...quote}
								alt=""
								aria-hidden="true"
								className="-scale-100 w-6 aspect-square self-end opacity-85 md:w-3"
							/>
						</div>
					</div>
					<div
						className="flex flex-col justify-center items-end text-end bg-dark rounded-3xl p-8 row-start-10 col-start-8 row-end-13 col-end-13"
						data-aos="fade-up"
					>
						<div className="self-end">
							<Button href="https://www.instagram.com/hackthehill" fill={false}>
								{tTestimonials.button_text}
							</Button>
						</div>
					</div>
				</div>
				<img
					src={blob.src}
					alt=""
					aria-hidden="true"
					className="w-full max-w-bg-deco opacity-35 absolute translate-y-24 scale-[1.25] pointer-events-none md:hidden"
				/>
			</div>
		</div>
	);
}
