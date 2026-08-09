import { useState } from "react";
import chevron from "../../assets/icons/chevron.svg";
import chevron_white from "../../assets/icons/chevron_white.svg";
import "./Button.css";

export default function Button({ children, onClick, disabled = false, fill = true, flip = false, href, target, rel }) {
	const [isHovered, setIsHovered] = useState(false);
	const isExternalHref = /^https?:\/\//.test(href ?? "");
	const linkTarget = target ?? (isExternalHref ? "_blank" : undefined);
	const linkRel = rel ?? (linkTarget === "_blank" ? "noopener noreferrer" : undefined);
	const className = [
		"backface flex flex-col items-center justify-center border-none no-underline text-center rounded-md transition-all duration-200 py-2",
		fill
			? `text-black bg-white ${disabled ? "" : "hover:bg-button_hover focus-visible:bg-button_hover"}`
			: "text-white bg-transparent",
		disabled ? "opacity-50 cursor-default" : "cursor-pointer",
	]
		.filter(Boolean)
		.join(" ");
	const content = (
		<span className={`flex justify-center items-center gap-1.5 ${fill ? "pl-6 pr-4" : ""}`}>
			{flip && (
				<span className="h-full w-6 flex justify-center items-center gap-1">
					<img
						src={fill ? chevron.src : chevron_white.src}
						alt=""
						aria-hidden="true"
						className={`backface transition-all duration-200 -scale-x-100 ${
							isHovered ? "opacity-100 translate-x-1" : "opacity-0 translate-x-2"
						}`}
						width="8px"
					/>
					<img
						src={fill ? chevron.src : chevron_white.src}
						alt=""
						aria-hidden="true"
						className={`backface transition-all duration-200 -scale-x-100 ${
							isHovered ? "-translate-x-0" : "-translate-x-1"
						}`}
						width="8px"
					/>
				</span>
			)}
			<span className={`font-medium text-sm h-full ${!fill ? "translate-y-[0.2rem]" : ""}`}>
				{children}
				{!fill && (
					<span
						aria-hidden="true"
						className={`backface block w-full h-0.5 mt-1 rounded-sm transition-all duration-200 ${
							isHovered ? "bg-white" : "bg-transparent"
						}`}
					/>
				)}
			</span>
			{!flip && (
				<span className="h-full w-6 flex justify-center items-center gap-1">
					<img
						src={fill ? chevron.src : chevron_white.src}
						alt=""
						aria-hidden="true"
						className={`backface transition-all duration-200 scale-100 ${
							isHovered ? "opacity-100 translate-x-1" : "opacity-0 translate-x-2"
						}`}
						width="8px"
					/>
					<img
						src={fill ? chevron.src : chevron_white.src}
						alt=""
						aria-hidden="true"
						className={`backface transition-all duration-200 scale-100 ${
							isHovered ? "-translate-x-0" : "-translate-x-1"
						}`}
						width="8px"
					/>
				</span>
			)}
		</span>
	);

	if (href && !disabled) {
		return (
			<a
				className={className}
				href={href}
				target={linkTarget}
				rel={linkRel}
				onClick={onClick}
				onMouseEnter={() => setIsHovered(true)}
				onMouseLeave={() => setIsHovered(false)}
				onFocus={() => setIsHovered(true)}
				onBlur={() => setIsHovered(false)}
			>
				{content}
			</a>
		);
	}

	return (
		<button
			className={className}
			onClick={onClick}
			disabled={disabled}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			onFocus={() => setIsHovered(true)}
			onBlur={() => setIsHovered(false)}
		>
			{content}
		</button>
	);
}
