## 2024-03-21 - i18n hook usage within components

**Learning:** In this codebase, the translation function `t()` exported from `src/i18n.ts` is not a simple utility function but a React hook (`useT` under the hood) that subscribes to a nanostore.
**Action:** Be extremely careful when using `t()` inside arrays of objects or data structures within a component's render body. Each call creates a separate subscription. Try to extract static data outside the component or `useMemo` these arrays, and pass localized strings directly instead of calling the hook multiple times if it causes performance issues, or better yet, avoid recreating large arrays that use `t()` on every render.

## 2024-05-18 - Avoid adding non-explicit dependencies
**Learning:** Running general commands like `pnpm install` can automatically generate lockfiles (e.g. `pnpm-lock.yaml`) or modify `package.json` which violates the negative constraint of not modifying these files without explicit instructions.
**Action:** Avoid blindly running package manager install commands or formatting tools (e.g. `pnpm format`) across the whole project. Only run formatters on modified files.
