import { useStore } from "@nanostores/react";
import { PortableText } from "@portabletext/react";
import { createImageUrlBuilder } from "@sanity/image-url";
import { sanityClient } from "sanity:client";
import shape from "../../assets/patterns/ssshape.svg";
import HtH_fall_theme from "../../assets/SVGs/HtH_fall_theme.svg";
import { locale, t } from "../../i18n";
import Button from "../Button/Button";
import "./BlogStyle.css";

export default function BlogPost({ data }) {
	const $locale = useStore(locale);
	const builder = createImageUrlBuilder(sanityClient);
	const authorName = data?.author?.toUpperCase();

	function urlFor(source) {
		return builder.image(source);
	}

	return (
		<div id="post" className="flex justify-center items-center w-full bg-background-dark relative overflow-hidden">
			<div className="flex flex-col w-10/12 h-full justify-center items-center gap-20 py-36 md:pt-16 md:pb-0 text-left max-w-2xl z-[1] md:w-full">
				<div className="flex flex-col items-start justify-between gap-4 px-32 py-16 lg:px-4 rounded-3xl md:rounded-none relative overflow-hidden bg-dark w-full">
					<div className="absolute top-0 left-0 p-6">
						<Button href="/blog" fill={false} flip={true}>
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
							{data?.authorLink ? (
								<a
									className="text-primary cursor-pointer"
									href={data.authorLink}
									target="_blank"
									rel="noopener noreferrer"
								>
									{authorName}&nbsp;
								</a>
							) : (
								<span className="text-primary">{authorName}&nbsp;</span>
							)}
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
							src={data?.coverImage ? urlFor(data?.coverImage?.asset).url() : HtH_fall_theme.src}
							className="w-full h-full object-cover"
							alt={data?.title?.[`${$locale}`] ?? t("blog.title")}
						/>
						<div className="absolute inset-0 z-10 bg-black/20" aria-hidden="true"></div>
					</div>
					<div className="blog-content w-full mt-16 mb-32">
						<PortableText value={data?.body?.[`${$locale}`]} />
					</div>
					<div className="absolute bottom-0 right-0 p-6 mt-16">
						<Button href="/blog" fill={false}>
							{t("blog.enjoyed")}
						</Button>
					</div>
				</div>
			</div>
			<img
				src={shape.src}
				alt=""
				aria-hidden="true"
				className="w-full max-w-bg-deco opacity-25 absolute z-[0] -translate-x-1/2 -translate-y-1/4"
			/>
			<img
				src={shape.src}
				alt=""
				aria-hidden="true"
				className="w-full max-w-bg-deco opacity-25 absolute z-[0] translate-x-1/2 translate-y-[10%] -scale-y-75 scale-x-75"
			/>
		</div>
	);
}
