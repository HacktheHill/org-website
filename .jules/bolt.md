## 2024-03-21 - i18n hook usage within components

**Learning:** In this codebase, the translation function `t()` exported from `src/i18n.ts` is not a simple utility function but a React hook (`useT` under the hood) that subscribes to a nanostore.
**Action:** Be extremely careful when using `t()` inside arrays of objects or data structures within a component's render body. Each call creates a separate subscription. Try to extract static data outside the component or `useMemo` these arrays, and pass localized strings directly instead of calling the hook multiple times if it causes performance issues, or better yet, avoid recreating large arrays that use `t()` on every render.

## 2024-03-22 - Expensive Data Parsing Inside Render Cycles

**Learning:** `parseISO` from `date-fns` was being called continuously inside array loops (`.filter`, `.some`, etc.) on every render in components handling events (like `Calendar.jsx`). This leads to unnecessary computational overhead and can degrade performance if the events array is large. Moreover, explicitly falling back to `null` with ternary operator logic causes data filtering edge cases because `null < new Date()` implicitly returns `true` (as it coerces `null` to `0`), whereas `Invalid Date < new Date()` (original behavior with `parseISO(undefined)`) correctly evaluates to `false`.
**Action:** Always pre-parse dates into intermediate formats onto the actual object once during initial setup using `useMemo` so loops and render methods have instant access to values without triggering string parsing on every cycle. Always pass `undefined` object properties to `parseISO` directly rather than defaulting missing dates to `null` to avoid unintentional `null`-coerced true logic bugs.
