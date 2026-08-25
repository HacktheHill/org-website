## 2024-03-21 - i18n hook usage within components

**Learning:** In this codebase, the translation function `t()` exported from `src/i18n.ts` is not a simple utility function but a React hook (`useT` under the hood) that subscribes to a nanostore.
**Action:** Be extremely careful when using `t()` inside arrays of objects or data structures within a component's render body. Each call creates a separate subscription. Try to extract static data outside the component or `useMemo` these arrays, and pass localized strings directly instead of calling the hook multiple times if it causes performance issues, or better yet, avoid recreating large arrays that use `t()` on every render.

## 2026-08-22 - Optimizing i18n hook subscriptions

**Learning:** The `t()` function from `src/i18n.ts` behaves as a React hook tied to a nanostore. Calling it repeatedly inside an object definition or large array inside a component's render body can cause excessive store subscriptions and unnecessary re-renders. We optimized `Testimonials.jsx` by fetching the parent translation object once (`const tData = t('testimonials')`) and wrapping the resulting data array in a `useMemo` hook.
**Action:** When a component requires many localized strings from a common parent namespace (e.g. `testimonials`), fetch the parent object once and use dot-notation for its children. If the derived data is an array of objects, wrap it in a `useMemo` hook depending on that parent object to prevent unnecessary recreation and subscriptions on every render.
