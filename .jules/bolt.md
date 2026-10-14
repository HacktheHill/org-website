## 2024-03-21 - i18n hook usage within components

**Learning:** In this codebase, the translation function `t()` exported from `src/i18n.ts` is not a simple utility function but a React hook (`useT` under the hood) that subscribes to a nanostore.
**Action:** Be extremely careful when using `t()` inside arrays of objects or data structures within a component's render body. Each call creates a separate subscription. Try to extract static data outside the component or `useMemo` these arrays, and pass localized strings directly instead of calling the hook multiple times if it causes performance issues, or better yet, avoid recreating large arrays that use `t()` on every render.

## 2024-05-18 - Conditional Lazy Loading in Dynamic Lists

**Learning:** Automatically adding `loading="lazy"` to all items in a dynamic list (like `.map()`) defers Above-The-Fold image requests, negatively impacting Largest Contentful Paint (LCP). Conversely, loading all off-screen items eagerly causes unnecessary network requests, wasting bandwidth.
**Action:** Always apply `loading="lazy"` conditionally based on index (e.g., `loading={i > 2 ? "lazy" : undefined}`) when rendering image-heavy lists (like blog posts or gallery items) to balance LCP preservation with off-screen resource deferral.
