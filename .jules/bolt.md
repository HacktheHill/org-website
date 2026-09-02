## 2024-03-21 - i18n hook usage within components

**Learning:** In this codebase, the translation function `t()` exported from `src/i18n.ts` is not a simple utility function but a React hook (`useT` under the hood) that subscribes to a nanostore.
**Action:** Be extremely careful when using `t()` inside arrays of objects or data structures within a component's render body. Each call creates a separate subscription. Try to extract static data outside the component or `useMemo` these arrays, and pass localized strings directly instead of calling the hook multiple times if it causes performance issues, or better yet, avoid recreating large arrays that use `t()` on every render.

## 2024-05-18 - Avoid useEffect for derived state

**Learning:** Derived state calculated in `useEffect` and set via `useState` causes unnecessary double renders and can briefly display incorrect data to the user. `useEffect` runs _after_ the initial render with updated prop/state values.
**Action:** Use `useMemo` instead of `useState` and `useEffect` when state is purely derived from props or other state values. This calculates the derived value _during_ the render phase and eliminates the second render.
