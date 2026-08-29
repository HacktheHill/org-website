## 2024-08-29 - Nanostore Subscriptions in Lists

**Learning:** Using the translation hook `t()` (which subscribes to a nanostore under the hood) directly inside a component mapped over a large list (like `TeamMemberCard` for the whole team) causes O(n) store subscriptions. This severely impacts React's render performance and can cause significant delays during mount or state changes.
**Action:** Always hoist `t()` hook calls that use nanostores (or any other global store subscriptions) up to the nearest list parent component. Create a static `labels` object and pass it down as a prop to O(1) subscriptions.
