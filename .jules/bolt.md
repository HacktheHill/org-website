## 2024-03-21 - i18n hook usage within components

**Learning:** In this codebase, the translation function `t()` exported from `src/i18n.ts` is not a simple utility function but a React hook (`useT` under the hood) that subscribes to a nanostore.
**Action:** Be extremely careful when using `t()` inside arrays of objects or data structures within a component's render body. Each call creates a separate subscription. Try to extract static data outside the component or `useMemo` these arrays, and pass localized strings directly instead of calling the hook multiple times if it causes performance issues, or better yet, avoid recreating large arrays that use `t()` on every render.

## 2026-09-04 - Avoid expensive date parsing in render cycles/loops

**Learning:** Calling `parseISO` on every render or inside `.filter` / `.map` loops causes significant performance bottlenecks, especially as the size of the event list grows.
**Action:** Pre-parse date properties onto data arrays once and memoize the result with `useMemo` to prevent unnecessary re-computations and optimize filtering and rendering logic.
