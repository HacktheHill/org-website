## 2026-08-17 - [Reverse Tabnabbing Security Enhancement]

**Vulnerability:** Use of target="\_blank" without noopener.
**Learning:** The application had several target="\_blank" links combined with rel="noreferrer" only. In older browsers or spec interpretations, leaving out noopener might still allow the linked page partial access to window.opener, enabling reverse tabnabbing attacks.
**Prevention:** Always use rel="noopener noreferrer" together on target="\_blank" anchor tags to ensure comprehensive protection against reverse tabnabbing and referrer leakage.

## 2026-08-18 - [Preventing XSS in User-Provided Social Links]
**Vulnerability:** User-provided URLs for social profiles (like LinkedIn, GitHub, and personal websites) fetched from Sanity CMS were rendered directly into the `href` attribute in `TeamPage.jsx`. This lack of sanitization creates a potential Cross-Site Scripting (XSS) vulnerability if a user inputs a `javascript:`, `vbscript:`, or `data:` URL.
**Learning:** Even internal API responses and CMS data should be treated as untrusted input. Directly mapping these strings to sensitive attributes like `href` without a sanitation step exposes the application.
**Prevention:** Always use the `safeUrl()` utility function to validate and sanitize URLs before rendering them in `href` attributes, especially when the data originates from a CMS or user input.
