## 2024-03-21 - i18n hook usage within components

**Learning:** In this codebase, the translation function `t()` exported from `src/i18n.ts` is not a simple utility function but a React hook (`useT` under the hood) that subscribes to a nanostore.
**Action:** Be extremely careful when using `t()` inside arrays of objects or data structures within a component's render body. Each call creates a separate subscription. Try to extract static data outside the component or `useMemo` these arrays, and pass localized strings directly instead of calling the hook multiple times if it causes performance issues, or better yet, avoid recreating large arrays that use `t()` on every render.

## 2026-10-08 - Conditionally lazy load mapped images

**Learning:** When adding `loading="lazy"` to images in lists (like `.map()`), applying it unconditionally can hurt LCP (Largest Contentful Paint) if the first few items are above the fold.
**Action:** Conditionally apply lazy loading (e.g., `loading={i > 2 ? "lazy" : undefined}`) to skip above-the-fold elements and only defer network requests for truly off-screen images.
