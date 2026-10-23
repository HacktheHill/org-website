## 2026-08-17 - [Reverse Tabnabbing Security Enhancement]

**Vulnerability:** Found `target="_blank"` missing `rel="noopener noreferrer"` in navigation components.
**Learning:** React automatically adds this for static links, but standard anchors or some UI components might still need it explicitly, especially in older codebases or when bypassing framework defaults.
**Prevention:** Always add `rel="noopener noreferrer"` when using `target="_blank"`.

## 2024-05-15 - Unsanitized User-Provided URLs in Anchor Hrefs

**Vulnerability:** XSS (Cross-Site Scripting) vulnerability found in `src/components/Team/TeamPage.jsx`. User-provided URLs (like linkedin, github, and website links from the CMS) were directly used in `href` attributes without validation, allowing potential `javascript:` or `data:` payloads.
**Learning:** The project pattern is to fetch content from Sanity CMS, which means URLs supplied by users could be malicious. The codebase already had a utility (`src/utils/safeUrl.js`) to mitigate this risk, but it was not applied consistently across all components that render external links.
**Prevention:** Always use the `safeUrl` utility when rendering dynamic URLs in `href` or `src` attributes, especially for data fetched from external sources or a CMS. Ensure that components check if the sanitized URL is valid (truthy) before rendering the anchor tag.

## 2026-10-23 - XSS Vulnerability in PortableText

**Vulnerability:** Sanity CMS rich text content rendered with `@portabletext/react` can contain malicious URI schemas like `javascript:` in links, leading to Cross-Site Scripting (XSS).
**Learning:** The default configuration of `@portabletext/react` does not sanitize link `href` attributes. User-provided content must always be explicitly sanitized, even when using established rich text libraries.
**Prevention:** Always pass a custom components object to `PortableText` that overrides `marks.link` and sanitizes `value.href` using the project's `safeUrl` utility before rendering.
