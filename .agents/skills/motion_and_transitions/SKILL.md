---
name: Motion and Transitions
description: Advanced choreography, easing functions, and spatial awareness for UI transitions.
---

# Motion & UI Choreography

Transitions shouldn't just look pretty—they need to orient the user in virtual space and reduce perceived latency.

## 1. Spatial Mental Models

When elements move off-screen, the user subconsciously maps where they went. 
- A "Next" button should pull the new page in from the Right and push the old page out to the Left.
- An "Up" button should pull content from above.
- A modal should scale up from its trigger button.

If a modal drops from the top of the screen but the button clicked was at the bottom, the mental model is broken.

## 2. Easing Curves (The Secret to Premium Feel)

Never use `linear` easing unless simulating mechanical rotation.
Avoid generic `ease-in` or `ease-out`. 
Define custom cubic-beziers.

**The "Snappy but Smooth" standard:**
`cubic-bezier(0.25, 1, 0.5, 1)` (Often called Deceleration curve. Starts fast, gently settles).

**The "Premium Apple/Stripe" feel:**
`cubic-bezier(0.16, 1, 0.3, 1)` (Very aggressive initial speed, very long tail).

**Rule of Thumb:**
- **Entering items**: Use Ease-Out (Start fast, slow down). They are arriving, so they friction against the newly occupied space.
- **Exiting items**: Use Ease-In (Start slow, speed up). They are leaving, so gravity pulls them away quickly.

## 3. Page Transitions

When moving between routes (e.g., using Astro View Transitions or Framer Motion `<AnimatePresence>`):

- **Crossfading is cheap**: Only use generic crossfades as a last resort.
- **Shared Elements**: If an image on Page A is the hero image on Page B, morph its bounding box seamlessly between the two states (like `layoutId` in Framer Motion).
- **The "Elevator Doors"**: Slide old content out while sliding new content in simultaneously. 
- **Stagger the Exit**: Don't wait for the entire new page to load to hide the old page. Animate the old page's opacity down instantly to provide immediate click feedback.

## 4. Perceived Performance

Motion masks slowness.
- *Skeleton screens* fading in left-to-right signify loading progress better than a static spinner.
- An element scaling up over `300ms` gives the browser `300ms` of free time to fetch the image that will appear inside of it. 
- Start data fetching *before* the transition finishes.

## 5. Layout Animations

When items are added or removed from a list (e.g., deleting a row), the surrounding items should smoothly glide into their new positions, not snap.
In Framer Motion, this is simply the `layout` prop. In Vanilla JS, utilize FLIP (First, Last, Invert, Play) techniques.
