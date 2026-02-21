---
name: React & Astro Best Practices
description: Modern development standards for React and Astro applications, focusing on performance, architecture, and developer experience.
---

# React & Astro Best Practices

A guide to building scalable, performant, and maintainable applications using React and Astro.

## 🚀 Astro Core Concepts

1. **Islands Architecture**: Default to zero client-side JavaScript. Only hydrate components that strictly require interactivity using `client:load`, `client:visible`, `client:media`, or `client:idle`.
   - Prefer `client:visible` for most below-the-fold interactive components.
   - Use `client:idle` for low-priority interactivity (like complex tracking).
2. **HTML & CSS First**: Whenever possible, build UI using Astro components (`.astro`) with scoped CSS. Only reach for React (`.tsx`) when you need complex client-side state hooks.
3. **Content Collections**: Always use Astro Content Collections (`src/content/config.ts`) with Zod schemas for type-safe Markdown/MDX content.
4. **View Transitions**: Utilize Astro's built-in View Transitions (`<ViewTransitions />`) for SPA-like navigation between pages without full reloads.

## ⚛️ React Modern Standards

### Component Architecture
- **Server Components First** (in Next.js/RSC environments): Keep components as Server Components by default. Add `'use client'` only when using hooks (`useState`, `useEffect`), browser APIs, or event listeners.
- **Composition over Configuration**: Prefer passing `children` or render props instead of drilling dozens of props down through deeply nested components.

### State & Hooks
- **Avoid `useEffect` for Data Fetching**: Use modern tools like React Query (TanStack Query), SWR, or framework-integrated data loading (like Astro's `getStaticPaths` or Next.js's component-level `await`).
- **Derived State**: Don't put values in `useState` if they can be calculated from existing state/props during the render phase.
- **Zustand over Redux/Context**: For global state, prefer lightweight solutions like Zustand or Jotai over complex Redux setups unless dealing with massive enterprise state.

### Performance Optimization
- **Memoization**: Do not pre-optimize with `useMemo` and `useCallback` unless you identify an actual performance bottleneck or are passing objects/functions as props to heavily memoized child components.
- **Refs for Mutable Data**: Use `useRef` to store mutable values that do not require re-renders when updated (e.g., storing a previous value, or a timeout ID).

## Styling Integrations
- **Tailwind CSS**: The preferred styling solution for both Astro and React. Keep classes ordered (using Prettier plugin) for readability.
- **Utility Classes strategy**: For complex components, use utility libraries like `clsx` or `tailwind-merge` (`twMerge`) to cleanly compose conditional classes.

## Anti-Patterns to Avoid
- 🚫 deeply nested inline ternary operators (extract them or use early returns).
- 🚫 Prop drilling deeper than 2-3 levels.
- 🚫 Using Astro components inside React components (it only works the other way around: React inside Astro).
