## 2024-05-23 - Avoid Duplicating Nav ARIA Labels

**Learning:** Found a common accessibility pitfall: a mobile hamburger menu button was using the same `aria-label` ("Navigation Bar") as its parent `<nav>` element. This creates confusion for screen reader users as they hear the exact same label for both the container and the control that toggles it. Another improvement was adding an aria-label to the language toggler ("EN"/"FR"), which without a label, just reads "E N" out of context.
**Action:** When implementing mobile menus, always ensure the toggle button has a distinct, action-oriented label (e.g., "Toggle Navigation Menu") separate from the landmark label of the `<nav>` element itself. Always provide context to language togglers.

## 2024-08-18 - Communicating State on Custom Toggle Buttons

**Learning:** Found several custom toggle buttons (e.g., calendar day selectors, event filters, gallery album selectors) that visually indicate their active/selected state using classes, but fail to communicate this state to screen readers.
**Action:** When building custom toggle buttons that control UI state, always include `aria-pressed="true|false"` (for toggle buttons) or `aria-selected="true|false"` (for tab-like selectors) to ensure assistive technologies can announce the current state.

## 2024-10-24 - Consistent Focus States on Custom UI Elements

**Learning:** Found several UI elements like custom dropdowns (select tags) and icon-only social media links lacking visible focus states when navigating by keyboard. Native focus rings are sometimes stripped by reset stylesheets or custom styling (`outline: none`), rendering keyboard navigation invisible to users.
**Action:** Always ensure that every interactive element has a clear and consistent focus state. Reintroduce a visible focus ring utilizing Tailwind's `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary` utility classes to guarantee that keyboard users can track their position on the page. Add `focus-visible:rounded-sm` or similar to tailor the focus ring shape to match the element.
