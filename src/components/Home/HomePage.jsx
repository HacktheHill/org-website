import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import "../../global.css";
import About from "../About/About";
import Gallery from "../Gallery/Gallery";
import Hero from "../Hero/Hero";
import Sponsors from "../Sponsors/Sponsors";
import Stats from "../Stats/Stats";
import Testimonials from "../Testimonials/Testimonials";
import WhatWeDo from "../WhatWeDo/WhatWeDo";

export default function HomePage() {
	useEffect(() => {
		AOS.init({ once: false, duration: 700 });
	}, []);
	return (
		<div className="w-full flex flex-col items-center justify-center overflow-x-hidden relative">
			<Hero />
			<About />
			<WhatWeDo />
			<Stats />
			<Sponsors />
			<Gallery />
			<Testimonials />
			{/*<Contact />*/}
		</div>
	);
}
