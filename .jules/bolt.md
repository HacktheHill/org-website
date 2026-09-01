## 2024-03-21 - i18n hook usage within components

**Learning:** In this codebase, the translation function `t()` exported from `src/i18n.ts` is not a simple utility function but a React hook (`useT` under the hood) that subscribes to a nanostore.
**Action:** Be extremely careful when using `t()` inside arrays of objects or data structures within a component's render body. Each call creates a separate subscription. Try to extract static data outside the component or `useMemo` these arrays, and pass localized strings directly instead of calling the hook multiple times if it causes performance issues, or better yet, avoid recreating large arrays that use `t()` on every render.
## 2024-03-22 - Conditional Hook Execution with `t()`

**Learning:** Calling `t()` (which operates as a hook) conditionally inside components (e.g. inside `if/else` logic) causes unpredictable nanostore subscriptions and violates React's Rules of Hooks. This can cause redundant re-subscriptions or React errors like "Rendered fewer hooks than expected".
**Action:** Always hoist `t()` calls unconditionally to the top level of the component and use the resolved variables within conditional rendering logic.
