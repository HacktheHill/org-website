## 2024-03-21 - i18n hook usage within components

**Learning:** In this codebase, the translation function `t()` exported from `src/i18n.ts` is not a simple utility function but a React hook (`useT` under the hood) that subscribes to a nanostore.
**Action:** Be extremely careful when using `t()` inside arrays of objects or data structures within a component's render body. Each call creates a separate subscription. Try to extract static data outside the component or `useMemo` these arrays, and pass localized strings directly instead of calling the hook multiple times if it causes performance issues, or better yet, avoid recreating large arrays that use `t()` on every render.

## 2024-05-14 - Conditional Lazy Loading in Lists

**Learning:** Adding `loading="lazy"` to off-screen images is a quick performance win, but in `.map()` loops, applying it to ALL images negatively impacts LCP if the first few items appear above the fold.
**Action:** When implementing lazy loading in lists (e.g., blog posts, gallery items), always conditionally apply it (e.g., `loading={i > 2 ? "lazy" : undefined}`) to intentionally exclude above-the-fold images.
