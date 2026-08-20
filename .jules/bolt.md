## 2023-08-20 - Excessive Nanostore Subscriptions from i18n Translation Hook

**Learning:** In this codebase, the translation function `t()` from `src/i18n.ts` is secretly a React hook (it wraps `@nanostores/react`'s `useStore`). Calling `t()` repeatedly inside lists or inside object definitions constructed during render creates massive amounts of redundant nanostore subscriptions. Additionally, conditionally calling it violates React's Rules of Hooks.
**Action:** Always evaluate translations at the top level of a component. For list items, pass the evaluated translations as static props instead of calling `t()` inside the item component. For configuration arrays, evaluate the parent object once (e.g., `const translations = t("section");`) and access its properties.
