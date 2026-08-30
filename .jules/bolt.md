## 2024-03-21 - i18n hook usage within components

**Learning:** In this codebase, the translation function `t()` exported from `src/i18n.ts` is not a simple utility function but a React hook (`useT` under the hood) that subscribes to a nanostore.
**Action:** Be extremely careful when using `t()` inside arrays of objects or data structures within a component's render body. Each call creates a separate subscription. Try to extract static data outside the component or `useMemo` these arrays, and pass localized strings directly instead of calling the hook multiple times if it causes performance issues, or better yet, avoid recreating large arrays that use `t()` on every render.

## 2024-05-18 - Hoisting nanostore hooks in mapped components

**Learning:** The `t()` translation function from `src/i18n.ts` operates as a React hook (`useT` under the hood) that subscribes to a nanostore. Calling it inside components that are rendered in a loop (like `TeamMemberCard` using `.map`) creates O(n) store subscriptions, which degrades memory and performance scaling with list size.
**Action:** Always hoist `t()` calls to parent components and pass the resolved string results down as props when rendering child components in a list to avoid excessive nanostore subscriptions.
