import React, { useState, useEffect } from "react";
import "../../global.css";
import AOS from "aos";
import "aos/dist/aos.css";
import shape from "../../assets/patterns/ssshape.svg";
import { sanityClient } from "sanity:client";
import { useStore } from "@nanostores/react";
import { locale, t } from "../../i18n";
import imageUrlBuilder from "@sanity/image-url";
import hth_fall_theme from "../../assets/SVGs/hth_fall_theme.svg";
import calendar from "/src/assets/icons/calendar.svg";
import Button from "../Button/Button";

export default function BlogPage({ posts }) {
	const $locale = useStore(locale);
	const builder = imageUrlBuilder(sanityClient);

	function urlFor(source) {
		return builder.image(source);
	}

	useEffect(() => {
		AOS.init({ once: false, duration: 700 });
	}, []);

	return (
		<div className="flex justify-center items-center w-full bg-background-dark relative overflow-hidden">
			<div className="flex flex-col w-10/12 h-full justify-center items-center gap-20 py-36 text-left max-w-2xl z-[1] md:w-11/12">
				<div className="flex flex-col text-left w-full" data-aos="fade-up">
					<h1 data-aos="fade-up">Blog</h1>
				</div>
				{posts?.length !== 0 && (
					<ul className="grid grid-cols-2 lg:flex lg:flex-wrap justify-between w-full max-w-2xl auto-rows-[1fr]">
						{posts?.map((post, i) => (
							<li
								key={i}
								className="basis-1/2 lg:basis-full p-3 md:mb-4 md:border md:border-primary md:rounded-3xl md:p-0 hover:cursor-pointer transition-all duration-300"
								onClick={() => (window.location.href = `/blog/${post.slug.current}`)}
								data-aos="fade-up"
								data-aos-offset={i >= 2 ? "-100" : "0"}
							>
								<div
									className={`flex flex-col h-full justify-between gap-2 p-4 rounded-3xl relative overflow-hidden ${
										i % 3 === 0 ? "bg-blur-svg" : "bg-dark"
									}`}
								>
									<div className="flex flex-col gap-4">
										<div className="rounded-xl w-full h-48 overflow-hidden flex items-center justify-center bg-shade-9 relative shadow-small-glow">
											<img
												src={
													post?.coverImage
														? urlFor(post?.coverImage?.asset).url()
														: hth_fall_theme.src
												}
												className="w-full h-full object-cover"
											/>
											<div className="absolute z-10 bg-black bg-opacity-20 w-full h-full"></div>
										</div>
										<div>
											<h4 className="mt-4 line-clamp-2 text-2xl lg:text-lg">
												{post.title?.[`${$locale}`]}
											</h4>
										</div>
									</div>
									<div className="p-2 w-full">
										<p className="mt-4 text-base lg:text-sm">{`${t("blog.author_prefix")} ${
											post?.author
										}`}</p>
										<div className="w-full flex justify-between items-center mt-4">
											<div className="text-base lg:text-sm font-bold flex flex-row gap-2 items-center">
												<img src={calendar.src} alt="calendar" className="w-4 h-4 mr-2" />
												{new Date(post.publishedAt).toLocaleDateString(
													$locale === "en" ? "en-US" : "fr-CA",
													{
														year: "numeric",
														month: "long",
														day: "numeric",
													},
												)}
											</div>
											<Button
												onClick={() => (window.location.href = `/blog/${post.slug.current}`)}
												fill={true}
											>
												{t("blog.read")}
											</Button>
										</div>
									</div>
								</div>
							</li>
						))}
					</ul>
				)}
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
