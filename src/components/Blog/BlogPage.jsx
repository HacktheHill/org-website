import React, { useState, useEffect } from "react";
import "../../global.css";
import Construction from "../Construction/Construction";
import AOS from "aos";
import "aos/dist/aos.css";
import shape from "../../assets/patterns/ssshape.svg";
import { sanityClient } from "sanity:client";
import { useStore } from "@nanostores/react";
import { locale } from "../../i18n";

export default function BlogPage() {
	const $locale = useStore(locale);
	const [posts, setPosts] = useState([]);
	const query = `*[_type == "blog" && defined(slug)] | order(publishedAt desc)`;

	useEffect(() => {
		AOS.init({ once: false, duration: 700 });

		sanityClient.fetch(query).then(posts => {
			setPosts(posts);
		});
	}, []);

	return (
		<div className="flex justify-center items-center w-full h-screen bg-background-dark relative overflow-hidden">
			<div className="flex flex-col w-10/12 h-full justify-center items-center gap-20 py-36 text-left max-w-2xl z-[1]">
				<div className="flex flex-col items-start gap-10 p-8 rounded-3xl bg-blur-svg relative w-1/2 lg:w-full mt-32">
					<h2 className="mt-8">Blog</h2>
					<p>{`You are seeing ${posts.length} blog posts`}</p>
					<ul>
						{posts?.map((post, i) => (
							<li key={i}>
								<a href={"/blog/" + post.slug.current} className="post-link">
									{post.title?.[`${$locale}`]}
								</a>
							</li>
						))}
					</ul>
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
