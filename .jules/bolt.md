## 2024-03-21 - i18n hook usage within components

**Learning:** In this codebase, the translation function `t()` exported from `src/i18n.ts` is not a simple utility function but a React hook (`useT` under the hood) that subscribes to a nanostore.
**Action:** Be extremely careful when using `t()` inside arrays of objects or data structures within a component's render body. Each call creates a separate subscription. Try to extract static data outside the component or `useMemo` these arrays, and pass localized strings directly instead of calling the hook multiple times if it causes performance issues, or better yet, avoid recreating large arrays that use `t()` on every render.
## 2024-05-18 - Conditional Lazy Loading in Lists
**Learning:** Adding unconditional `loading="lazy"` to images in mapped arrays can defer the loading of above-the-fold content, worsening the Largest Contentful Paint (LCP). This was identified as an anti-pattern when rendering lists of content (like blog posts or team members).
**Action:** When implementing lazy loading in mapped lists, use index-based conditional loading (e.g., `loading={i > 2 ? "lazy" : undefined}`) to ensure above-the-fold content loads eagerly while off-screen images defer.
