## 2024-03-21 - i18n hook usage within components

**Learning:** In this codebase, the translation function `t()` exported from `src/i18n.ts` is not a simple utility function but a React hook (`useT` under the hood) that subscribes to a nanostore.
**Action:** Be extremely careful when using `t()` inside arrays of objects or data structures within a component's render body. Each call creates a separate subscription. Try to extract static data outside the component or `useMemo` these arrays, and pass localized strings directly instead of calling the hook multiple times if it causes performance issues, or better yet, avoid recreating large arrays that use `t()` on every render.

## 2026-09-08 - Added Lazy Loading to Components
**Learning:** Native lazy loading using `loading="lazy"` on image elements is a measurable performance enhancement that's fully supported by modern browsers without breaking anything and limits loading of off-screen resources until they approach viewport, making initial load faster.
**Action:** When adding images to galleries, blogs, or sections that contain multiple images out-of-viewport, natively lazily load those elements using the `loading="lazy"` attribute.
