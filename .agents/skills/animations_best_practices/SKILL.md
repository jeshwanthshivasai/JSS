---
name: Animations Best Practices
description: Guidelines for high-performance, accessible, and delightful web animations.
---

# Animations Best Practices

Animations are crucial for user experience, but bad animations can annoy users and drain battery life. Follow these standards.

## 1. Performance First (The 60FPS Rule)

Animate **only** the compositor-friendly properties:
- `transform` (translate, scale, rotate)
- `opacity`
- `filter` (sometimes, use with caution)

**NEVER Animate:**
- `width`, `height`, `margin`, `padding`, `top`, `left` (These trigger Layout recalculations on every frame).
- `box-shadow` (Highly expensive, animate the opacity of a pseudo-element containing the shadow instead).

## 2. Timing and Physics

- **Use Springs, Not Easing**: Whenever possible (via Framer Motion or react-spring), use spring physics (stiffness, damping, mass) instead of bezier curves. Springs look more natural and adapt gracefully to interruptions.
- **Keep it Snappy**: UI animations should be fast. 
  - Micro-interactions (hover, click): `100ms - 200ms`
  - Screen transitions: `300ms - 500ms`
  - Loading sequences: > `500ms`
- **Asymmetry**: Exiting animations should often be faster than entering animations.

## 3. Staggering & Orchestration

Don't animate everything at once. 
- Use sensible staggering (e.g., `delay: i * 0.05` in Framer Motion) to guide the user's eye across lists or grids.
- Coordinate entering and exiting elements so they don't overlap awkwardly.

## 4. Accessibility (A11y)

**Always respect user preferences.**
Check for `prefers-reduced-motion` and disable or severely tone down animations if it's true.

**CSS Example:**
```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

**Framer Motion Example:**
```javascript
import { useReducedMotion } from "framer-motion"

const MyComponent = () => {
  const shouldReduceMotion = useReducedMotion()
  return (
    <motion.div animate={{ opacity: 1, y: shouldReduceMotion ? 0 : -50 }} />
  )
}
```

## 5. Micro-interactions
- Buttons should have distinct `hover`, `active` (pressed), and `focus-visible` states.
- Consider transform-based active states (e.g., `scale: 0.95`) to provide tactile feedback.

## 6. Meaningful Motion
Motion should have a purpose. It should:
1. Show hierarchy and connection (where did this element come from?).
2. Provide feedback (was an action successful?).
3. Reduce cognitive load (guiding the eye smoothly).

*Avoid motion just for the sake of motion.*
