
## 2024-03-21 - i18n hook usage within components
**Learning:** In this codebase, the translation function `t()` exported from `src/i18n.ts` is not a simple utility function but a React hook (`useT` under the hood) that subscribes to a nanostore. Calling it multiple times inside lists (e.g., mapped components) creates O(n) re-subscriptions and severely impacts performance.
**Action:** Hoist `t()` calls out of list render bodies and pass localized strings directly to child components via props instead.
