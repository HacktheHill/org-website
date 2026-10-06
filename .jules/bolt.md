## 2024-03-21 - i18n hook usage within components

**Learning:** In this codebase, the translation function `t()` exported from `src/i18n.ts` is not a simple utility function but a React hook (`useT` under the hood) that subscribes to a nanostore.
**Action:** Be extremely careful when using `t()` inside arrays of objects or data structures within a component's render body. Each call creates a separate subscription. Try to extract static data outside the component or `useMemo` these arrays, and pass localized strings directly instead of calling the hook multiple times if it causes performance issues, or better yet, avoid recreating large arrays that use `t()` on every render.

## 2024-05-15 - Lazy loading lists and LCP

**Learning:** Unconditionally applying `loading="lazy"` to all images in a `.map()` list loop can negatively impact Largest Contentful Paint (LCP) if the first few items are above-the-fold, as the browser will unnecessarily delay fetching them.
**Action:** Always conditionally apply lazy loading in lists (e.g., `loading={i > 2 ? "lazy" : undefined}`) to intentionally skip lazy loading for the first few items that are likely to be visible on initial load.
