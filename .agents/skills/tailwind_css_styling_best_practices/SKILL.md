---
name: Tailwind CSS Styling Best Practices
description: Creating clean, scalable, and premium components using Tailwind CSS, class composition, and CSS variables.
---

# Tailwind CSS Styling & UI Best Practices

Writing good Tailwind is about avoiding HTML bloat, ensuring maintainability, and creating premium UI without writing generic-looking code.

## 1. Class Organization & Composition

A messy Tailwind component is unreadable. Adopt a strict standard.

### Sorting (The Prettier Standard)
Always use the `prettier-plugin-tailwindcss` to automatically sort classes. The standard order is:
1. Base positioning (`absolute`, `relative`, `block`, `flex`).
2. Box model & Spacing (`w`, `h`, `p`, `m`).
3. Typography & Text (`text`, `font`, `leading`).
4. Backgrounds & Borders (`bg`, `border`, `rounded`).
5. Effects & Interactions (`shadow`, `opacity`, `transition`, `hover:`).

### Merging Classes (clsx & twMerge)
When building React/Astro components that accept a `className` prop, **never use basic string concatenation** (`className={`p-4 ${props.className}`}`). 

Use a utility function combining `clsx` (for conditional logic) and `tailwind-merge` (to resolve conflicts).

```javascript
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Usage:
// <Button className="bg-red-500" /> -> Overrides default bg-blue-500 perfectly
export const Button = ({ className, active }) => (
  <button className={cn(
    "px-4 py-2 rounded bg-blue-500 text-white transition-colors",
    active && "ring-2 ring-blue-300",
    className
  )} />
)
```

## 2. Dynamic Theming (CSS Variables + Tailwind)

Don't hardcode specific Hex codes in tailwind config if you intend to offer Light/Dark modes or easily skinnable templates.

1. Define Semantic CSS Variables in your global styles:
```css
@layer base {
  :root {
    --background: 0 0% 100%; /* HSL values without the hsl() wrapper */
    --foreground: 222.2 84% 4.9%;
    --primary: 221.2 83.2% 53.3%;
  }
  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    /* ... */
  }
}
```

2. Map them in `tailwind.config.mjs`:
```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: "hsl(var(--primary))",
      }
    }
  }
}
```
*Usage*: `bg-background text-foreground bg-primary` -> Works perfectly in light AND dark mode automatically.

## 3. High-End UI Techniques in Tailwind

- **Glassmorphism**: 
  Combine `bg-white/10` (or black), `backdrop-blur-md`, and a crisp inset border:
  `className="bg-white/10 backdrop-blur-md border border-white/20 shadow-xl"`
- **Subtle Gradients**: 
  Use radial gradients for glowing backgrounds behind cards.
  `className="bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-background to-background"`
- **Inset Shadows / Inner Glows**:
  To make a dark mode card look premium, don't use heavy drop shadows. Use an inner border glow via standard shadows:
  `className="shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)]"`

## 4. Anti-Patterns
- 🚫 **Arbitrary values everywhere**: Do not use `w-[325px] h-[19px]` constantly. Stick to the spacing scale (`w-80`) unless absolutely strictly required for a pixel-perfect layout match.
- 🚫 **Extracted `@apply` classes**: Avoid writing `.btn { @apply px-4 py-2 bg-blue-500; }` in your CSS unless targeting raw markdown HTML that you cannot edit. It defeats the purpose of utility-first CSS and increases CSS bundle size. Extract logic to a React/Astro *Component* instead.
- 🚫 **Massive Responsive Strings**: If a mobile div needs 5 classes, and desktop needs an entirely different 8 classes, consider splitting it into two separate DOM elements toggled via `hidden md:block` and `md:hidden` rather than writing a 300-character unwieldy string.
