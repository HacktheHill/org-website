import React, { useState, useEffect } from "react";
import "../../global.css";
import shape from "../../assets/patterns/ssshape.svg";

import { sanityClient } from "sanity:client";
import imageUrlBuilder from "@sanity/image-url";

export default function BlogPost({ data }) {
	const builder = imageUrlBuilder(sanityClient);

	function urlFor(source) {
		return builder.image(source);
	}

	return (
		<div className="flex justify-center items-center w-full h-screen bg-background-dark relative overflow-hidden">
			<div className="flex flex-col w-10/12 h-full justify-center items-center gap-20 py-36 text-left max-w-2xl z-[1]">
				<div className="flex flex-col items-start gap-10 p-8 rounded-3xl bg-[#020106] relative w-1/2 lg:w-full mt-32">
					<h2 className="mt-8">{data.title}</h2>
					<p>{data.publishedAt}</p>
					<p>{data.author}</p>
					<div className="w-full">
						<img src={urlFor(data.coverImage.asset).url()} width="10%" />
					</div>
					{data.body.map((block, index) => {
						if (block._type === "block") {
							return <p key={index}>{block.children[0].text}</p>;
						}
						if (block._type === "image") {
							return <img key={index} src={block.asset.url} alt={block.alt} />;
						}
						return null;
					})}
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
