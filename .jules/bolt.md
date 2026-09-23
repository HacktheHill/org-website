## 2024-03-21 - i18n hook usage within components

**Learning:** In this codebase, the translation function `t()` exported from `src/i18n.ts` is not a simple utility function but a React hook (`useT` under the hood) that subscribes to a nanostore.
**Action:** Be extremely careful when using `t()` inside arrays of objects or data structures within a component's render body. Each call creates a separate subscription. Try to extract static data outside the component or `useMemo` these arrays, and pass localized strings directly instead of calling the hook multiple times if it causes performance issues, or better yet, avoid recreating large arrays that use `t()` on every render.

## 2024-05-24 - Conditionally Lazy Load Blog Images

**Learning:** Applying lazy loading to all images inside a list (e.g. `.map()` loop) blindly can inadvertently cause above-the-fold images to load lazily, degrading LCP metrics.
**Action:** When adding `loading="lazy"` in loops for mapped lists (like blog posts), conditionally apply it (e.g., `loading={i > 2 ? "lazy" : undefined}`) to ensure that only off-screen images defer network requests.
