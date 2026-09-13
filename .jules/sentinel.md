## 2026-08-17 - [Reverse Tabnabbing Security Enhancement]
**Vulnerability:** Use of target="_blank" without noopener.
**Learning:** The application had several target="_blank" links combined with rel="noreferrer" only. In older browsers or spec interpretations, leaving out noopener might still allow the linked page partial access to window.opener, enabling reverse tabnabbing attacks.
**Prevention:** Always use rel="noopener noreferrer" together on target="_blank" anchor tags to ensure comprehensive protection against reverse tabnabbing and referrer leakage.
## 2024-05-18 - XSS Risks in User-Provided URLs
**Vulnerability:** User-provided URLs from Sanity CMS were being rendered directly in `href` attributes in `TeamPage.jsx` and `Sponsors.jsx`, introducing potential XSS risks via `javascript:` or `data:` URLs.
**Learning:** React does not automatically sanitize `href` attributes. A malicious user with CMS access could inject harmful scripts.
**Prevention:** Always use the `safeUrl` utility (which uses the native URL API to parse and filter dangerous protocols) when rendering user-provided or external URLs in `href` attributes.
