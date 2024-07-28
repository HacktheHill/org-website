import React, { useState, useEffect } from "react";
import "../../global.css";
import shape from "../../assets/patterns/ssshape.svg";
import hth_fall_theme from "../../assets/SVGs/hth_fall_theme.svg";
import { sanityClient } from "sanity:client";
import imageUrlBuilder from "@sanity/image-url";
import { PortableText } from "@portabletext/react";
import { useStore } from "@nanostores/react";
import { locale, t } from "../../i18n";
import calendar from "../../assets/icons/calendar.svg";
import Button from "../Button/Button";
import "./BlogStyle.css";

export default function BlogPost({ data }) {
	const $locale = useStore(locale);
	const builder = imageUrlBuilder(sanityClient);

	function urlFor(source) {
		return builder.image(source);
	}

	return (
		<div id="post" className="flex justify-center items-center w-full bg-background-dark relative overflow-hidden">
			<div className="flex flex-col w-10/12 h-full justify-center items-center gap-20 py-36 text-left max-w-2xl z-[1] md:w-11/12">
				<div className="flex flex-col items-start justify-between gap-4 px-32 py-16 lg:px-4 rounded-3xl relative overflow-hidden bg-dark w-full">
					<div className="absolute top-0 left-0 p-6">
						<Button onClick={() => (window.location.href = "/blog")} fill={false} flip={true}>
							{t("blog.back")}
						</Button>
					</div>

					<h1 className="mt-16">{data?.title?.[`${$locale}`]}</h1>
					{data?.subheader?.[`${$locale}`] && (
						<h2 className="text-shadow_text">{data?.subheader?.[`${$locale}`]}</h2>
					)}
					<div className="flex flex-row items-center mt-8 mb-4">
						<span className="text-base lg:text-sm font-bold space-x-1">
							<span>{`${t("blog.author_prefix").toUpperCase()} `}</span>
							<span
								className={`text-primary ${data?.authorLink && "cursor-pointer"}`}
								onClick={() => {
									data?.authorLink && window.open(data?.authorLink, "_blank");
								}}
							>
								{`${data?.author?.toUpperCase()}`}&nbsp;
							</span>
							<span>{"•"}</span>
							<span>
								{new Date(data?.publishedAt)
									.toLocaleDateString($locale === "en" ? "en-US" : "fr-CA", {
										year: "numeric",
										month: "long",
										day: "numeric",
									})
									.toUpperCase()}
							</span>
						</span>
					</div>
					<div className="rounded-xl w-full overflow-hidden flex items-center justify-center bg-shade-9 relative shadow-small-glow aspect-[2/1]">
						<img
							src={data?.coverImage ? urlFor(data?.coverImage?.asset).url() : hth_fall_theme.src}
							className="w-full h-full object-cover"
						/>
						<div className="absolute z-10 bg-black bg-opacity-20 w-full h-full"></div>
					</div>
					<div className="w-full justify-between items-center mt-16 mb-32 px-16 md:px-0">
						<PortableText value={data?.body?.[`${$locale}`]} />
					</div>
					<div className="absolute bottom-0 right-0 p-6 mt-16">
						<Button onClick={() => (window.location.href = "/blog")} fill={false}>
							{t("blog.enjoyed")}
						</Button>
					</div>
				</div>
			</div>
			<img
				src={shape.src}
				alt="shape"
				className="w-full max-w-bg-deco opacity-25 absolute z-[0] -translate-x-1/2 -translate-y-1/4"
			/>
			<img
				src={shape.src}
				alt="shape"
				className="w-full max-w-bg-deco opacity-25 absolute z-[0] translate-x-1/2 translate-y-[10%] -scale-y-75 scale-x-75"
			/>
		</div>
	);
}
