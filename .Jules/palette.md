## 2024-05-23 - Avoid Duplicating Nav ARIA Labels

**Learning:** Found a common accessibility pitfall: a mobile hamburger menu button was using the same `aria-label` ("Navigation Bar") as its parent `<nav>` element. This creates confusion for screen reader users as they hear the exact same label for both the container and the control that toggles it. Another improvement was adding an aria-label to the language toggler ("EN"/"FR"), which without a label, just reads "E N" out of context.
**Action:** When implementing mobile menus, always ensure the toggle button has a distinct, action-oriented label (e.g., "Toggle Navigation Menu") separate from the landmark label of the `<nav>` element itself. Always provide context to language togglers.

## 2024-08-18 - Communicating State on Custom Toggle Buttons

**Learning:** Found several custom toggle buttons (e.g., calendar day selectors, event filters, gallery album selectors) that visually indicate their active/selected state using classes, but fail to communicate this state to screen readers.
**Action:** When building custom toggle buttons that control UI state, always include `aria-pressed="true|false"` (for toggle buttons) or `aria-selected="true|false"` (for tab-like selectors) to ensure assistive technologies can announce the current state.

## 2024-10-24 - Screen Reader Compatibility for Icon-Only Buttons

**Learning:** Found an icon-only button where the `aria-label` was placed on an inner `<span>` instead of the `<button>` element itself. This pattern can cause screen readers to announce the button incorrectly or inconsistently, as they look for labels on the interactive element. Additionally, it lacked focus-visible outlines, making it inaccessible for keyboard users.
**Action:** Always place `aria-label` directly on the `<button>` or interactive element itself, and use `aria-hidden="true"` on inner decorative content. Always ensure standard focus rings (`focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary`) are applied to interactive elements.
