## 2024-05-23 - Avoid Duplicating Nav ARIA Labels

**Learning:** Found a common accessibility pitfall: a mobile hamburger menu button was using the same `aria-label` ("Navigation Bar") as its parent `<nav>` element. This creates confusion for screen reader users as they hear the exact same label for both the container and the control that toggles it. Another improvement was adding an aria-label to the language toggler ("EN"/"FR"), which without a label, just reads "E N" out of context.
**Action:** When implementing mobile menus, always ensure the toggle button has a distinct, action-oriented label (e.g., "Toggle Navigation Menu") separate from the landmark label of the `<nav>` element itself. Always provide context to language togglers.

## 2024-08-18 - Communicating State on Custom Toggle Buttons

**Learning:** Found several custom toggle buttons (e.g., calendar day selectors, event filters, gallery album selectors) that visually indicate their active/selected state using classes, but fail to communicate this state to screen readers.
**Action:** When building custom toggle buttons that control UI state, always include `aria-pressed="true|false"` (for toggle buttons) or `aria-selected="true|false"` (for tab-like selectors) to ensure assistive technologies can announce the current state.

## 2026-10-20 - Place ARIA Labels on Interactive Elements

**Learning:** Found an accessibility anti-pattern where an `aria-label` was placed on a static inner `<span>` element with `role="img"` instead of the parent `<button>` element. This can cause screen readers to announce the label inconsistently or duplicate it, and fails to give the interactive control an accessible name.
**Action:** Always place `aria-label` directly on the interactive control (e.g., `<button>` or `<a>`) and use `aria-hidden="true"` on its purely decorative or icon-based child elements to ensure clear, single-announcement context for screen reader users.
