## 2024-03-21 - i18n hook usage within components

**Learning:** In this codebase, the translation function `t()` exported from `src/i18n.ts` is not a simple utility function but a React hook (`useT` under the hood) that subscribes to a nanostore.
**Action:** Be extremely careful when using `t()` inside arrays of objects or data structures within a component's render body. Each call creates a separate subscription. Try to extract static data outside the component or `useMemo` these arrays, and pass localized strings directly instead of calling the hook multiple times if it causes performance issues, or better yet, avoid recreating large arrays that use `t()` on every render.

## 2024-10-01 - Add conditional lazy loading to lists

**Learning:** When adding `loading="lazy"` to images in a mapped list (like blog posts or cards), applying it unconditionally can defer the loading of above-the-fold images, negatively impacting the Largest Contentful Paint (LCP).
**Action:** Conditionally apply `loading="lazy"` based on the loop index (e.g., `loading={i > 2 ? "lazy" : undefined}`) to ensure only below-the-fold images are deferred while critical, visible images load immediately.
