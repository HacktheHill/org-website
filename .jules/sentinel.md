## 2026-08-17 - [Reverse Tabnabbing Security Enhancement]
**Vulnerability:** Found `target="_blank"` missing `rel="noopener noreferrer"` in navigation components.
**Learning:** React automatically adds this for static links, but standard anchors or some UI components might still need it explicitly, especially in older codebases or when bypassing framework defaults.
**Prevention:** Always add `rel="noopener noreferrer"` when using `target="_blank"`.

## 2024-05-15 - Unsanitized User-Provided URLs in Anchor Hrefs
**Vulnerability:** XSS (Cross-Site Scripting) vulnerability found in `src/components/Team/TeamPage.jsx`. User-provided URLs (like linkedin, github, and website links from the CMS) were directly used in `href` attributes without validation, allowing potential `javascript:` or `data:` payloads.
**Learning:** The project pattern is to fetch content from Sanity CMS, which means URLs supplied by users could be malicious. The codebase already had a utility (`src/utils/safeUrl.js`) to mitigate this risk, but it was not applied consistently across all components that render external links.
**Prevention:** Always use the `safeUrl` utility when rendering dynamic URLs in `href` or `src` attributes, especially for data fetched from external sources or a CMS. Ensure that components check if the sanitized URL is valid (truthy) before rendering the anchor tag.
## 2024-10-20 - XSS in PortableText Default Link Rendering
**Vulnerability:** XSS vulnerability through unsanitized URL links via `@portabletext/react` default rendering behavior.
**Learning:** PortableText defaults to unsanitized `<a href={value.href}>` tags when rendering user-provided URLs from Sanity CMS, introducing XSS risks if malicious values like `javascript:` are used.
**Prevention:** Always define custom components for PortableText overriding `marks.link` to pass `value.href` through the `safeUrl` utility before rendering them in `href` attributes.
