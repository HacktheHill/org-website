## 2024-05-23 - Avoid Duplicating Nav ARIA Labels

**Learning:** Found a common accessibility pitfall: a mobile hamburger menu button was using the same `aria-label` ("Navigation Bar") as its parent `<nav>` element. This creates confusion for screen reader users as they hear the exact same label for both the container and the control that toggles it. Another improvement was adding an aria-label to the language toggler ("EN"/"FR"), which without a label, just reads "E N" out of context.
**Action:** When implementing mobile menus, always ensure the toggle button has a distinct, action-oriented label (e.g., "Toggle Navigation Menu") separate from the landmark label of the `<nav>` element itself. Always provide context to language togglers.

## 2024-08-18 - Communicating State on Custom Toggle Buttons

**Learning:** Found several custom toggle buttons (e.g., calendar day selectors, event filters, gallery album selectors) that visually indicate their active/selected state using classes, but fail to communicate this state to screen readers.
**Action:** When building custom toggle buttons that control UI state, always include `aria-pressed="true|false"` (for toggle buttons) or `aria-selected="true|false"` (for tab-like selectors) to ensure assistive technologies can announce the current state.

## 2026-08-31 - Enhancing Custom Navigation Accessibility

**Learning:** When building custom navigation menus (like mobile sidebars), users expect standard interactions and explicit state announcements. Forgetting to bind the `Escape` key to close temporary overlays forces keyboard users to hunt for the toggle button. Furthermore, merely styling the active link doesn't help screen reader users identify their current location in the site.
**Action:** Always add a global `Escape` key listener to close custom modals/sidebars, and apply `aria-current="page"` to the currently active navigation link to semantically communicate state.
