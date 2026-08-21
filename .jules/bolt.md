## 2024-03-21 - i18n hook usage within components

**Learning:** In this codebase, the translation function `t()` exported from `src/i18n.ts` is not a simple utility function but a React hook (`useT` under the hood) that subscribes to a nanostore.
**Action:** Be extremely careful when using `t()` inside arrays of objects or data structures within a component's render body. Each call creates a separate subscription. Try to extract static data outside the component or `useMemo` these arrays, and pass localized strings directly instead of calling the hook multiple times if it causes performance issues, or better yet, avoid recreating large arrays that use `t()` on every render.

## 2024-05-18 - Avoid repeated translation hook calls in arrays/objects

**Learning:** The `t()` function from `src/i18n.ts` is a React hook (`useT`) that subscribes to a nanostore. Calling it repeatedly inside static array or object definitions inside a component's render body causes excessive store subscriptions (and violates the Rules of Hooks conceptually when inside loops, though not strictly here, it's still heavy).
**Action:** Always fetch the parent translation object once (`const tData = t("parent_path")`) and then access properties from it directly (e.g. `tData.child_prop`). Use `useMemo` for any derived arrays/objects.
