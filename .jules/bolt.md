## 2024-03-21 - i18n hook usage within components

**Learning:** In this codebase, the translation function `t()` exported from `src/i18n.ts` is not a simple utility function but a React hook (`useT` under the hood) that subscribes to a nanostore.
**Action:** Be extremely careful when using `t()` inside arrays of objects or data structures within a component's render body. Each call creates a separate subscription. Try to extract static data outside the component or `useMemo` these arrays, and pass localized strings directly instead of calling the hook multiple times if it causes performance issues, or better yet, avoid recreating large arrays that use `t()` on every render.

## 2025-02-23 - Intentional Eager Loading for LCP Optimization

**Learning:** While native lazy loading (`loading="lazy"`) is a simple and effective performance win for images, blindly applying it to all images in a list (e.g. within a `.map()` loop) can negatively impact the Largest Contentful Paint (LCP) if the first few items appear above the fold.
**Action:** Always conditionally apply lazy loading within lists based on the index (e.g. `loading={i > 2 ? "lazy" : undefined}`) to ensure above-the-fold assets are loaded eagerly while preserving bandwidth and rendering speed for off-screen items.
