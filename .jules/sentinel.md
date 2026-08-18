## 2026-08-17 - [Reverse Tabnabbing Security Enhancement]
**Vulnerability:** Use of target="_blank" without noopener.
**Learning:** The application had several target="_blank" links combined with rel="noreferrer" only. In older browsers or spec interpretations, leaving out noopener might still allow the linked page partial access to window.opener, enabling reverse tabnabbing attacks.
**Prevention:** Always use rel="noopener noreferrer" together on target="_blank" anchor tags to ensure comprehensive protection against reverse tabnabbing and referrer leakage.
