## 2024-03-21 - i18n hook usage within components

**Learning:** In this codebase, the translation function `t()` exported from `src/i18n.ts` is not a simple utility function but a React hook (`useT` under the hood) that subscribes to a nanostore.
**Action:** Be extremely careful when using `t()` inside arrays of objects or data structures within a component's render body. Each call creates a separate subscription. Try to extract static data outside the component or `useMemo` these arrays, and pass localized strings directly instead of calling the hook multiple times if it causes performance issues, or better yet, avoid recreating large arrays that use `t()` on every render.

## 2026-10-13 - Conditional Lazy Loading in Lists

**Learning:** When implementing lazy loading in lists (e.g., .map() loops for blog posts), unconditionally adding loading='lazy' to all images can negatively impact LCP (Largest Contentful Paint) for above-the-fold content.
**Action:** Conditionally apply lazy loading (e.g., loading={i > 2 ? 'lazy' : undefined}) to intentionally exclude above-the-fold images.
