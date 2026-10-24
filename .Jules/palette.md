## 2024-05-23 - Avoid Duplicating Nav ARIA Labels

**Learning:** Found a common accessibility pitfall: a mobile hamburger menu button was using the same `aria-label` ("Navigation Bar") as its parent `<nav>` element. This creates confusion for screen reader users as they hear the exact same label for both the container and the control that toggles it. Another improvement was adding an aria-label to the language toggler ("EN"/"FR"), which without a label, just reads "E N" out of context.
**Action:** When implementing mobile menus, always ensure the toggle button has a distinct, action-oriented label (e.g., "Toggle Navigation Menu") separate from the landmark label of the `<nav>` element itself. Always provide context to language togglers.

## 2024-08-18 - Communicating State on Custom Toggle Buttons

**Learning:** Found several custom toggle buttons (e.g., calendar day selectors, event filters, gallery album selectors) that visually indicate their active/selected state using classes, but fail to communicate this state to screen readers.
**Action:** When building custom toggle buttons that control UI state, always include `aria-pressed="true|false"` (for toggle buttons) or `aria-selected="true|false"` (for tab-like selectors) to ensure assistive technologies can announce the current state.
## 2024-05-14 - Fix ARIA label placement for icon-only buttons
**Learning:** Screen readers may not announce `aria-label` reliably if it's placed on an inner static child (like a `<span role="img">`) inside a `<button>`. Also, this can cause duplicated or skipped announcements.
**Action:** Always place the `aria-label` directly on the interactive element (e.g., the `<button>`) and add `aria-hidden="true"` to the purely visual inner static children (like icons or emojis). This provides a reliable and clean single announcement for screen readers. Ensure to also add standard focus ring classes for keyboard accessibility.
