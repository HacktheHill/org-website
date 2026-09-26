## 2024-05-23 - Avoid Duplicating Nav ARIA Labels

**Learning:** Found a common accessibility pitfall: a mobile hamburger menu button was using the same `aria-label` ("Navigation Bar") as its parent `<nav>` element. This creates confusion for screen reader users as they hear the exact same label for both the container and the control that toggles it. Another improvement was adding an aria-label to the language toggler ("EN"/"FR"), which without a label, just reads "E N" out of context.
**Action:** When implementing mobile menus, always ensure the toggle button has a distinct, action-oriented label (e.g., "Toggle Navigation Menu") separate from the landmark label of the `<nav>` element itself. Always provide context to language togglers.

## 2024-08-18 - Communicating State on Custom Toggle Buttons

**Learning:** Found several custom toggle buttons (e.g., calendar day selectors, event filters, gallery album selectors) that visually indicate their active/selected state using classes, but fail to communicate this state to screen readers.
**Action:** When building custom toggle buttons that control UI state, always include `aria-pressed="true|false"` (for toggle buttons) or `aria-selected="true|false"` (for tab-like selectors) to ensure assistive technologies can announce the current state.

## 2024-09-26 - Primary Navigation Focus Indicators

**Learning:** The primary navigation menu is often the first interaction point for keyboard users, making explicit and consistent focus states critical. In this app, many navigation elements relied only on subtle visual shifts (like text color changes) which were insufficient for clear accessibility. Applying standard focus ring patterns across _all_ primary navigation items greatly improves the initial keyboard-navigating experience.
**Action:** Always ensure top-level navigation components (links, toggles, menu buttons) have robust, high-contrast `focus-visible` styles (e.g., `focus-visible:ring-2`) to create a cohesive accessible experience right from the top of the page.
