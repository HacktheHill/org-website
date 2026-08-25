## 2024-05-23 - Avoid Duplicating Nav ARIA Labels

**Learning:** Found a common accessibility pitfall: a mobile hamburger menu button was using the same `aria-label` ("Navigation Bar") as its parent `<nav>` element. This creates confusion for screen reader users as they hear the exact same label for both the container and the control that toggles it. Another improvement was adding an aria-label to the language toggler ("EN"/"FR"), which without a label, just reads "E N" out of context.
**Action:** When implementing mobile menus, always ensure the toggle button has a distinct, action-oriented label (e.g., "Toggle Navigation Menu") separate from the landmark label of the `<nav>` element itself. Always provide context to language togglers.

## 2026-08-25 - Add ARIA Labels to Sponsor Carousels

**Learning:** Found that sponsor and collaborator image carousels are missing alt text/ARIA descriptions for users on screen readers. Because many of these links consist purely of an image element with no visible text, it is crucial for a11y to ensure that they have a clear aria-label or textual fallback. The data object in Sponsors.jsx actually contains 'alt' tags for the images but isn't passing them down to aria-label for the anchor tags.
**Action:** Adding `aria-label` to link tags that contain images in the sponsor/collaborator lists.
