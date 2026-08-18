## 2024-03-21 - i18n hook usage within components

**Learning:** In this codebase, the translation function `t()` exported from `src/i18n.ts` is not a simple utility function but a React hook (`useT` under the hood) that subscribes to a nanostore.
**Action:** Be extremely careful when using `t()` inside arrays of objects or data structures within a component's render body. Each call creates a separate subscription. Try to extract static data outside the component or `useMemo` these arrays, and pass localized strings directly instead of calling the hook multiple times if it causes performance issues, or better yet, avoid recreating large arrays that use `t()` on every render.

## 2024-05-18 - Optimized nanostore subscriptions in React components
**Learning:** Calling the `t()` translation function (which uses `useStore` internally) multiple times inside object definitions or large arrays within a React component's render body causes excessive store subscriptions and violates the Rules of Hooks if the array size is dynamic.
**Action:** Extract the translation object once at the top of the component (e.g., `const tTestimonials = t("testimonials");`) and reference its properties, reducing multiple nanostore subscriptions to a single hook call.
