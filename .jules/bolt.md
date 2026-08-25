## 2024-03-21 - i18n hook usage within components

**Learning:** In this codebase, the translation function `t()` exported from `src/i18n.ts` is not a simple utility function but a React hook (`useT` under the hood) that subscribes to a nanostore.
**Action:** Be extremely careful when using `t()` inside arrays of objects or data structures within a component's render body. Each call creates a separate subscription. Try to extract static data outside the component or `useMemo` these arrays, and pass localized strings directly instead of calling the hook multiple times if it causes performance issues, or better yet, avoid recreating large arrays that use `t()` on every render.

## 2024-03-22 - Extracted t() calls from child components

**Learning:** When using the \`t()\` hook inside child components that render in a list (like \`Event\` in \`Calendar.jsx\`), it creates O(n) nanostore subscriptions. Additionally, conditionally calling \`t()\` inside \`if/else\` statements violates the Rules of Hooks.
**Action:** Extract all \`t()\` calls to the top level of the parent component, assign them to constants, and pass the resolved values down to the child components as props.
