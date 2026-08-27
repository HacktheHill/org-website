## 2024-03-21 - i18n hook usage within components

**Learning:** In this codebase, the translation function `t()` exported from `src/i18n.ts` is not a simple utility function but a React hook (`useT` under the hood) that subscribes to a nanostore.
**Action:** Be extremely careful when using `t()` inside arrays of objects or data structures within a component's render body. Each call creates a separate subscription. Try to extract static data outside the component or `useMemo` these arrays, and pass localized strings directly instead of calling the hook multiple times if it causes performance issues, or better yet, avoid recreating large arrays that use `t()` on every render.
## 2024-08-27 - Caching Date objects in React useMemo dependencies

**Learning:** When using `useMemo` for derived date calculations (e.g. mapping/filtering lists of events with `date-fns` `parseISO`), passing newly instantiated `Date` objects as dependencies (e.g., `firstDayCurrentMonth = parse(currentMonth, "MMM-yyyy", new Date())` or `today = startOfToday()`) causes the `useMemo` hooks to run on every render because the referential equality check (`Object.is`) fails.
**Action:** Always memoize derived `Date` objects or primitive values representing them (like `getTime()`) when using them as dependencies in `useMemo` or `useEffect` arrays to prevent redundant computation cycles.
