## 2026-08-17 - [Reverse Tabnabbing Security Enhancement]

**Vulnerability:** Use of target="\_blank" without noopener.
**Learning:** The application had several target="\_blank" links combined with rel="noreferrer" only. In older browsers or spec interpretations, leaving out noopener might still allow the linked page partial access to window.opener, enabling reverse tabnabbing attacks.
**Prevention:** Always use rel="noopener noreferrer" together on target="\_blank" anchor tags to ensure comprehensive protection against reverse tabnabbing and referrer leakage.
## 2025-03-09 - [Prevent XSS in User-Provided URLs]
**Vulnerability:** External URLs originating from the CMS were passed directly to `href` attributes in `BlogPost.jsx` and `Button.jsx`, opening a vector for XSS attacks via `javascript:` schemas.
**Learning:** React escapes text content but inherently trusts URLs passed to `href`. All dynamic links sourced from an external system must be validated.
**Prevention:** Implement a URL sanitization function utilizing the native `URL` constructor (e.g., `new URL(url, "http://localhost")`) to enforce safe protocols and filter out `javascript:`, `vbscript:`, and `data:` schemes before rendering.
