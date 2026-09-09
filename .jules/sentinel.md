## 2026-08-17 - [Reverse Tabnabbing Security Enhancement]

**Vulnerability:** Use of target="_blank" without noopener.
**Learning:** The application had several target="_blank" links combined with rel="noreferrer" only. In older browsers or spec interpretations, leaving out noopener might still allow the linked page partial access to window.opener, enabling reverse tabnabbing attacks.
**Prevention:** Always use rel="noopener noreferrer" together on target="_blank" anchor tags to ensure comprehensive protection against reverse tabnabbing and referrer leakage.

## 2026-09-09 - [Fix XSS Vulnerability in CMS-Provided URLs]
**Vulnerability:** Unsanitized rendering of user-provided URLs (from CMS) in `href` attributes inside `TeamPage.jsx`.
**Learning:** CMS content, like any user input, must not be implicitly trusted. Passing user-provided strings like `member.website` directly to `href` can lead to XSS attacks (e.g. `javascript:alert(1)`) if a malicious or compromised CMS payload is deployed.
**Prevention:** Always sanitize user-provided URLs (e.g., using `safeUrl`) before rendering them in `href` attributes, especially if the data originates from a CMS where content editors might be compromised.
