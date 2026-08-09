import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import Construction from "../Construction/Construction";

export default function FourOFour() {
	useEffect(() => {
		AOS.init({ once: false, duration: 700 });
	}, []);
	return <Construction pageNotFound={true} />;
}
