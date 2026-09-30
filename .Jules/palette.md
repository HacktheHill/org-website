## 2024-05-23 - Avoid Duplicating Nav ARIA Labels

**Learning:** Found a common accessibility pitfall: a mobile hamburger menu button was using the same `aria-label` ("Navigation Bar") as its parent `<nav>` element. This creates confusion for screen reader users as they hear the exact same label for both the container and the control that toggles it. Another improvement was adding an aria-label to the language toggler ("EN"/"FR"), which without a label, just reads "E N" out of context.
**Action:** When implementing mobile menus, always ensure the toggle button has a distinct, action-oriented label (e.g., "Toggle Navigation Menu") separate from the landmark label of the `<nav>` element itself. Always provide context to language togglers.

## 2024-08-18 - Communicating State on Custom Toggle Buttons

**Learning:** Found several custom toggle buttons (e.g., calendar day selectors, event filters, gallery album selectors) that visually indicate their active/selected state using classes, but fail to communicate this state to screen readers.
**Action:** When building custom toggle buttons that control UI state, always include `aria-pressed="true|false"` (for toggle buttons) or `aria-selected="true|false"` (for tab-like selectors) to ensure assistive technologies can announce the current state.

## 2024-03-24 - Consistent Focus States on Shared Custom Components
**Learning:** Shared custom interactive UI elements like the `Button` component lacked the standardized `focus-visible` ring pattern. This causes keyboard users to lose visual tracking when navigating through the primary interaction elements of the site, while standard semantic links (like those in Navigation) or inputs had explicit focus rules set via Tailwind classes elsewhere.
**Action:** Always ensure that fundamental design system components (e.g. Buttons, Custom Inputs) include the application's standard focus ring (`focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2`) so keyboard accessibility is inherited site-wide by default.
