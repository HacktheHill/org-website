## 2024-03-21 - i18n hook usage within components

**Learning:** In this codebase, the translation function `t()` exported from `src/i18n.ts` is not a simple utility function but a React hook (`useT` under the hood) that subscribes to a nanostore.
**Action:** Be extremely careful when using `t()` inside arrays of objects or data structures within a component's render body. Each call creates a separate subscription. Try to extract static data outside the component or `useMemo` these arrays, and pass localized strings directly instead of calling the hook multiple times if it causes performance issues, or better yet, avoid recreating large arrays that use `t()` on every render.
## 2024-03-24 - Prettier and auto-formatting files

**Learning:** When using `pnpm format`, it affects all files, changing format in many unrelated files. Committing these pollutes the diff and violates the rule to keep changes under 50 lines.
**Action:** When running formatting tools, use tools targeting the specific file or carefully use git checkout and git reset to stage and commit only files that were intentionally modified, rejecting other formatting changes.
