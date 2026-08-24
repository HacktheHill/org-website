## 2024-03-21 - i18n hook usage within components

**Learning:** In this codebase, the translation function `t()` exported from `src/i18n.ts` is not a simple utility function but a React hook (`useT` under the hood) that subscribes to a nanostore.
**Action:** Be extremely careful when using `t()` inside arrays of objects or data structures within a component's render body. Each call creates a separate subscription. Try to extract static data outside the component or `useMemo` these arrays, and pass localized strings directly instead of calling the hook multiple times if it causes performance issues, or better yet, avoid recreating large arrays that use `t()` on every render.

## 2024-08-19 - i18n hook usage within large list items

**Learning:** Building on the previous observation, calling the `t()` hook inside components that are rendered in large arrays (like `TeamMemberCard` rendered for every member) spawns a massive amount of nanostore subscriptions ($M \times N$ subscriptions for $M$ hook calls over $N$ items), which can measurably degrade performance during rendering and language switching.
**Action:** Extract static translation strings into the parent component (e.g. `TeamPage`) where they are evaluated exactly once, and pass them down as a single `labels` prop object to child list items.
