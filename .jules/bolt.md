## 2024-03-21 - i18n hook usage within components

**Learning:** In this codebase, the translation function `t()` exported from `src/i18n.ts` is not a simple utility function but a React hook (`useT` under the hood) that subscribes to a nanostore.
**Action:** Be extremely careful when using `t()` inside arrays of objects or data structures within a component's render body. Each call creates a separate subscription. Try to extract static data outside the component or `useMemo` these arrays, and pass localized strings directly instead of calling the hook multiple times if it causes performance issues, or better yet, avoid recreating large arrays that use `t()` on every render.

## 2024-11-20 - Pre-parsing expensive date properties

**Learning:** Calling `parseISO` continuously in `.some()`, `.filter()`, and within sub-components creates unnecessary, repetitive computational load on every single React render pass, which can significantly decrease performance over hundreds of elements.
**Action:** Lift the parsing logic outside these iterators and parse strings onto array items early using `useMemo`. Iterate over and reference the pre-parsed properties rather than computing them dynamically.
