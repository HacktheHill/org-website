## 2024-03-21 - i18n hook usage within components

**Learning:** In this codebase, the translation function `t()` exported from `src/i18n.ts` is not a simple utility function but a React hook (`useT` under the hood) that subscribes to a nanostore.
**Action:** Be extremely careful when using `t()` inside arrays of objects or data structures within a component's render body. Each call creates a separate subscription. Try to extract static data outside the component or `useMemo` these arrays, and pass localized strings directly instead of calling the hook multiple times if it causes performance issues, or better yet, avoid recreating large arrays that use `t()` on every render.
## 2024-10-16 - List image rendering

**Learning:** When rendering dynamic lists with map loops, conditionally adding \`loading="lazy"\` specifically for items visually off-screen ensures performance optimization without negatively impacting above-the-fold content metrics like LCP.
**Action:** When implementing lazy loading in lists, calculate an index threshold to load eager elements to improve load performance safely.
