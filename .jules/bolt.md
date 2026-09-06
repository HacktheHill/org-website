## 2024-03-21 - i18n hook usage within components

**Learning:** In this codebase, the translation function `t()` exported from `src/i18n.ts` is not a simple utility function but a React hook (`useT` under the hood) that subscribes to a nanostore.
**Action:** Be extremely careful when using `t()` inside arrays of objects or data structures within a component's render body. Each call creates a separate subscription. Try to extract static data outside the component or `useMemo` these arrays, and pass localized strings directly instead of calling the hook multiple times if it causes performance issues, or better yet, avoid recreating large arrays that use `t()` on every render.

## 2024-06-25 - Expensive Date Parsing in Render Loops

**Learning:** `parseISO` from `date-fns` is computationally expensive to call continuously inside array methods (`filter`, `some`) during React render cycles.
**Action:** Always pre-parse string date representations onto arrays of objects once and memoize the result with `useMemo`. Reference these pre-parsed `Date` objects in loops and nested components to optimize rendering performance.
