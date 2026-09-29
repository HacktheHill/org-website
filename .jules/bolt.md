## 2024-03-21 - i18n hook usage within components

**Learning:** In this codebase, the translation function `t()` exported from `src/i18n.ts` is not a simple utility function but a React hook (`useT` under the hood) that subscribes to a nanostore.
**Action:** Be extremely careful when using `t()` inside arrays of objects or data structures within a component's render body. Each call creates a separate subscription. Try to extract static data outside the component or `useMemo` these arrays, and pass localized strings directly instead of calling the hook multiple times if it causes performance issues, or better yet, avoid recreating large arrays that use `t()` on every render.

## $(date +%Y-%m-%d) - Defer Off-Screen Images Without Impacting LCP
**Learning:** Adding `loading="lazy"` blindly to all images in a `.map()` loop can unintentionally defer above-the-fold images, worsening Largest Contentful Paint (LCP).
**Action:** Always conditionally apply `loading="lazy"` (e.g., `loading={i > 2 ? "lazy" : undefined}`) when rendering lists of images to ensure critical early assets load eagerly while still optimizing off-screen content.
