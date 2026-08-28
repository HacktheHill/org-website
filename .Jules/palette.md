## 2024-05-23 - Avoid Duplicating Nav ARIA Labels

**Learning:** Found a common accessibility pitfall: a mobile hamburger menu button was using the same `aria-label` ("Navigation Bar") as its parent `<nav>` element. This creates confusion for screen reader users as they hear the exact same label for both the container and the control that toggles it. Another improvement was adding an aria-label to the language toggler ("EN"/"FR"), which without a label, just reads "E N" out of context.
**Action:** When implementing mobile menus, always ensure the toggle button has a distinct, action-oriented label (e.g., "Toggle Navigation Menu") separate from the landmark label of the `<nav>` element itself. Always provide context to language togglers.

## 2024-08-18 - Communicating State on Custom Toggle Buttons

**Learning:** Found several custom toggle buttons (e.g., calendar day selectors, event filters, gallery album selectors) that visually indicate their active/selected state using classes, but fail to communicate this state to screen readers.
**Action:** When building custom toggle buttons that control UI state, always include `aria-pressed="true|false"` (for toggle buttons) or `aria-selected="true|false"` (for tab-like selectors) to ensure assistive technologies can announce the current state.

## 2024-05-24 - Hiding Duplicate Marquee Content from Assistive Technologies

**Learning:** Found a common issue where infinite CSS marquees are implemented by duplicating a block of content in the DOM. This causes screen readers to read everything twice, and creates double the tab stops for keyboard users, making the navigation extremely tedious.
**Action:** When creating infinite marquees using duplicated DOM content, ensure the duplicate elements have `aria-hidden="true"` so screen readers ignore them, and `tabIndex="-1"` on any interactive elements inside the duplicates so keyboard users aren't forced to tab through the same items twice.
