## 2024-05-23 - Avoid Duplicating Nav ARIA Labels

**Learning:** Found a common accessibility pitfall: a mobile hamburger menu button was using the same `aria-label` ("Navigation Bar") as its parent `<nav>` element. This creates confusion for screen reader users as they hear the exact same label for both the container and the control that toggles it. Another improvement was adding an aria-label to the language toggler ("EN"/"FR"), which without a label, just reads "E N" out of context.
**Action:** When implementing mobile menus, always ensure the toggle button has a distinct, action-oriented label (e.g., "Toggle Navigation Menu") separate from the landmark label of the `<nav>` element itself. Always provide context to language togglers.

## 2024-08-18 - Communicating State on Custom Toggle Buttons

**Learning:** Found several custom toggle buttons (e.g., calendar day selectors, event filters, gallery album selectors) that visually indicate their active/selected state using classes, but fail to communicate this state to screen readers.
**Action:** When building custom toggle buttons that control UI state, always include `aria-pressed="true|false"` (for toggle buttons) or `aria-selected="true|false"` (for tab-like selectors) to ensure assistive technologies can announce the current state.

## 2024-11-23 - Focus Styles for Keyboard Accessibility

**Learning:** Interactive elements such as links and buttons within the `Navigation` component lacked a visible focus state, making it difficult for keyboard users to track where they are on the page. The repository already utilizes a standard focus pattern elsewhere (e.g., `BlogPage.jsx`) which leverages Tailwind CSS.
**Action:** When adding or updating interactive elements, consistently apply the standard focus pattern `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary` (along with appropriate `rounded-*` classes for aesthetics) to ensure clear visual feedback during keyboard navigation without disrupting mouse/pointer interactions.
