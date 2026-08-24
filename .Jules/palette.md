## 2024-05-23 - Avoid Duplicating Nav ARIA Labels

**Learning:** Found a common accessibility pitfall: a mobile hamburger menu button was using the same `aria-label` ("Navigation Bar") as its parent `<nav>` element. This creates confusion for screen reader users as they hear the exact same label for both the container and the control that toggles it. Another improvement was adding an aria-label to the language toggler ("EN"/"FR"), which without a label, just reads "E N" out of context.
**Action:** When implementing mobile menus, always ensure the toggle button has a distinct, action-oriented label (e.g., "Toggle Navigation Menu") separate from the landmark label of the `<nav>` element itself. Always provide context to language togglers.

## 2026-08-24 - Navigation Active State A11y

**Learning:** Relying solely on text color or font weight for active state in navigation isn't sufficient for screen readers. Using `aria-current="page"` communicates the active page semantically.
**Action:** Always verify that navigation menus include `aria-current` when styling active links.
