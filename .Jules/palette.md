## 2024-05-23 - Avoid Duplicating Nav ARIA Labels

**Learning:** Found a common accessibility pitfall: a mobile hamburger menu button was using the same `aria-label` ("Navigation Bar") as its parent `<nav>` element. This creates confusion for screen reader users as they hear the exact same label for both the container and the control that toggles it. Another improvement was adding an aria-label to the language toggler ("EN"/"FR"), which without a label, just reads "E N" out of context.
**Action:** When implementing mobile menus, always ensure the toggle button has a distinct, action-oriented label (e.g., "Toggle Navigation Menu") separate from the landmark label of the `<nav>` element itself. Always provide context to language togglers.

## 2024-08-18 - Communicating State on Custom Toggle Buttons

**Learning:** Found several custom toggle buttons (e.g., calendar day selectors, event filters, gallery album selectors) that visually indicate their active/selected state using classes, but fail to communicate this state to screen readers.
**Action:** When building custom toggle buttons that control UI state, always include `aria-pressed="true|false"` (for toggle buttons) or `aria-selected="true|false"` (for tab-like selectors) to ensure assistive technologies can announce the current state.

## 2024-10-23 - ARIA Label Placement on Interactive Elements

**Learning:** Found a button containing an emoji (❤️) where the `aria-label` and `role="img"` were placed on the inner `<span>` instead of the `<button>` itself. This can lead to screen readers not announcing the button correctly or duplicating the announcement (e.g. "button, heart image, heart"). The button was also missing focus visibility styles.
**Action:** Always place `aria-label`s directly on the interactive elements (e.g., `<button>`, `<a>`) rather than on their static inner children to ensure reliable and non-duplicated screen reader announcements. Add `aria-hidden="true"` to the inner static children if they are purely visual icons/emojis. Additionally, ensure all interactive elements have keyboard focus visibility.
