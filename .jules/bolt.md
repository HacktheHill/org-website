## 2024-03-21 - i18n hook usage within components

**Learning:** In this codebase, the translation function `t()` exported from `src/i18n.ts` is not a simple utility function but a React hook (`useT` under the hood) that subscribes to a nanostore.
**Action:** Be extremely careful when using `t()` inside arrays of objects or data structures within a component's render body. Each call creates a separate subscription. Try to extract static data outside the component or `useMemo` these arrays, and pass localized strings directly instead of calling the hook multiple times if it causes performance issues, or better yet, avoid recreating large arrays that use `t()` on every render.

## 2024-10-23 - Conditionally Lazy Load Images for LCP Protection

**Learning:** While lazy loading images defers network requests and improves initial page load performance, applying it blindly to all images in a list (like `.map()` loops for blog posts) can negatively impact Largest Contentful Paint (LCP) if the first few images are above the fold.
**Action:** Conditionally apply `loading="lazy"` only to images that are likely off-screen (e.g., `loading={i > 2 ? "lazy" : undefined}`) to optimize network usage while intentionally excluding above-the-fold content to preserve LCP metrics.
