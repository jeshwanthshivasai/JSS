---
name: Responsiveness Skills
description: Modern techniques for building adaptable layouts that work fluidly across all devices and screen sizes.
---

# Responsive Design & Fluidity

Responsive design is no longer just "add a media query at 768px". It's about intrinsic sizing, fluid typography, and container awareness.

## 1. Mobile-First Mindset

Always write CSS for small screens first, then build up to desktop using `min-width` media queries. 
- *Why?* Mobile browsers shouldn't have to download and parse complex desktop layout rules only to override them.
- *Default state*: Single column. No floats, flex-wrap where necessary.

```css
/* Bad: Desktop first */
.card { display: flex; }
@media (max-width: 768px) { .card { display: block; } }

/* Good: Mobile first */
.card { display: block; }
@media (min-width: 768px) { .card { display: flex; } }
```

## 2. Fluid Typography & Spacing (clamp)

Stop defining fixed pixel sizes for every breakpoint. 
Use CSS `clamp(min, preferred, max)` to smoothly linearly interpolate sizes.

```css
h1 {
  /* Starts at 2rem (32px), scales dynamically based on viewport width (5vw), maxes out at 4rem (64px) */
  font-size: clamp(2rem, 5vw, 4rem);
}
.section {
  padding-block: clamp(3rem, 10vh, 6rem);
}
```

## 3. CSS Grid > Flexbox (for Layouts)

- Use **Flexbox** for 1-dimensional layouts (aligning items in a single row or column, like a nav bar).
- Use **CSS Grid** for 2-dimensional layouts (full page structures, cards).

**The Holy Grail Responsive Grid (No Media Queries):**
```css
.card-grid {
  display: grid;
  /* Auto-fit creates columns automatically. Min width: 300px. Max: stretch to fill 1fr */
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}
```

## 4. Container Queries

The future of responsiveness. Instead of changing a component based on the size of the whole screen, change it based on the size of its parent *container*.

```css
.card-container {
  container-type: inline-size;
}

.card {
  display: flex;
  flex-direction: column;
}

/* If the parent container is larger than 500px, change the layout */
@container (min-width: 500px) {
  .card {
    flex-direction: row;
  }
}
```
This makes components truly modular and drop-in anywhere.

## 5. Touch Targets & Device Specifics

- **No Hover on Mobile**: Ensure critical functionality isn't hidden behind a `:hover` state.
- **Overscroll Behavior**: Use `overscroll-behavior: none` on fixed modals/sidebars to prevent pulling the main document underneath.
- **Safe Areas**: Use `env(safe-area-inset-bottom)` to prevent critical sticky navs from being hidden by iOS home bars or notches.
