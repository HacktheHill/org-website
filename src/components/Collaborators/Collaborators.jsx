import "./Collaborators.css";
import MountainFlags from "./MountainFlags";

const data = [
	{ id: "wie", href: "https://wie.ieeeottawa.ca/" },
	{ id: "ieee", href: "https://ieeeuottawa.ca/" },
	{ id: "sesa", href: "https://www.uottawasesa.ca/" },
	{ id: "cssa", href: "https://www.cssa-aei.ca/" },
	{ id: "ess", href: "https://www.essaeg.ca/" },
];

function Collaborators() {
	return (
		<div id="Collaborators" className="Collaborators">
			<h1>Collaborators </h1>
			<MountainFlags data={data} />
		</div>
	);
}

export default Collaborators;