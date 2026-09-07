/** Allow web, email, telephone and relative links from CMS content. */
export function safeUrl(value) {
	if (typeof value !== "string" || !value.trim()) return undefined;
	try {
		const url = new URL(value, "https://ctn-rtc.org");
		return ["http:", "https:", "mailto:", "tel:"].includes(url.protocol) ? value : undefined;
	} catch {
		return undefined;
	}
}
