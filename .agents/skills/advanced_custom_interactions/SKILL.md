---
name: Advanced Custom Interactions
description: Moving beyond vanilla scrolling: magnetic buttons, custom cursors, and kinesthetic UI.
---

# Advanced Custom Interactions

Standard web design relies on immediate, 1:1 mouse movement. Award-winning design introduces "Kinesthetics"—the feeling of weight, tension, and magnetism.

## 1. Custom Cursors

Default pointers are boring. An Awwwards cursor acts as a guide for what to do.
- **The Follower**: Hide the default cursor (`cursor: none;`) and render a div that follows the mouse coordinates. But critically, add *drag/spring* to it so it slightly lags behind the actual physical mouse movement to simulate weight.
- **Contextual Morphing**: When hovering over text, the custom cursor turns into a thin caret. When hovering over an image, it expands into a large circle containing the word "VIEW" or "DRAG". 
- **Blend Modes**: Apply `mix-blend-mode: difference;` to your custom cursor so it always contrasts against the background perfectly (turns white on black backgrounds, black on white).

## 2. Magnetic Buttons

Instead of a button lighting up when you hover over it, the button should physically pull toward your mouse.

**The Physics:**
1. Calculate the center coordinates of the button.
2. Calculate the distance from the mouse to that center.
3. If the mouse is within a specific radius (e.g., 50px outside the button border), apply a `transform: translate(x, y)` to the button.
4. The translation amount should be proportional to the distance (e.g., pulling the button `20px` maximum toward the cursor).

## 3. Horizontal & Locomotive Scrolling

Normal vertical scrolling can feel repetitive.

**Smooth Scroll (Lenis):**
Always override the jagged default browser scroll wheel. Use **Lenis** (by Studio Freight) to add momentum/inertia to the entire page scroll.

**Horizontal Scroll Sections:**
If presenting a gallery of projects, pin the vertical scroll and convert the user's mouse-wheel delta into horizontal translation. 
*Rule*: Ensure the user knows they are stuck in a horizontal section. Provide a visual progress bar or "Scroll to explore" text.

## 4. The Parallax Trap
Amateur parallax moves random elements at different speeds. 
**Pro Parallax**: 
- Tie `transform: translateY` directly to scroll velocity. When the user scrolls fast, elements skew diagonally. When they stop, the elements spring back to zero.
- Image clipping: Scroll an image 20% slower than its container div, creating a window effect.

## 5. Implementation Rules
- Never use complex custom interactions on mobile. Revert to standard scrolling and no custom cursors on `< 768px`. Touch devices do not have hover states.
- Ensure performance. Update custom cursors tracking using `requestAnimationFrame`—NEVER use throttling or generic React State updates tied directly to the `onMouseMove` event (this causes severe stuttering).
