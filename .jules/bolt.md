## 2024-03-21 - i18n hook usage within components

**Learning:** In this codebase, the translation function `t()` exported from `src/i18n.ts` is not a simple utility function but a React hook (`useT` under the hood) that subscribes to a nanostore.
**Action:** Be extremely careful when using `t()` inside arrays of objects or data structures within a component's render body. Each call creates a separate subscription. Try to extract static data outside the component or `useMemo` these arrays, and pass localized strings directly instead of calling the hook multiple times if it causes performance issues, or better yet, avoid recreating large arrays that use `t()` on every render.

## 2024-09-17 - Lazy Loading Images in Galleries

**Learning:** Image galleries often have large files that load simultaneously. Since some elements are located below the fold, rendering all of them immediately can cause performance issues such as slower page load time.
**Action:** Adding `loading="lazy"` defers the loading of off-screen images until the user actually scrolls to them, saving both network resources and improving page load speed.
