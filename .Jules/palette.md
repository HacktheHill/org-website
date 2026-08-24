## 2024-05-23 - Avoid Duplicating Nav ARIA Labels

**Learning:** Found a common accessibility pitfall: a mobile hamburger menu button was using the same `aria-label` ("Navigation Bar") as its parent `<nav>` element. This creates confusion for screen reader users as they hear the exact same label for both the container and the control that toggles it. Another improvement was adding an aria-label to the language toggler ("EN"/"FR"), which without a label, just reads "E N" out of context.
**Action:** When implementing mobile menus, always ensure the toggle button has a distinct, action-oriented label (e.g., "Toggle Navigation Menu") separate from the landmark label of the `<nav>` element itself. Always provide context to language togglers.

## 2024-05-23 - Interactive List Items Acting as Cards Need Keyboard Support

**Learning:** Interactive list items (`<li>`) acting as navigational cards (with `onClick` handlers) are completely inaccessible to keyboard and screen reader users by default. Mouse users can click anywhere on the card, but keyboard users are unable to focus or trigger the card.
**Action:** Always add `tabIndex={0}`, `role="link"` (or `role="button"` if appropriate), `onKeyDown` handlers (for `Enter` and `Space`), and explicit `focus-visible` styles to any non-native interactive element (like `<li>` or `<div>`) that serves as a clickable card. This ensures functional parity between mouse and keyboard users.
