---
name: UI/UX Design Skills
description: Core principles of user interface and user experience design, focusing on usability, visual hierarchy, and cognitive psychology.
---

# UI/UX Best Practices

Design is how it works, not just how it looks.

## 1. Visual Hierarchy & Spacing

Hierarchy tells the user what's important instantly without them needing to read.
- **Size & Weight**: The most important element (H1, CTA) should be the thickest or largest.
- **Color Contrast**: Only use high-saturation accent colors for primary actions. Everything else should be muted or neutral.
- **Whitespace (Negative Space)**: Do not fear empty space. Group related elements close together and push unrelated elements far apart (Gestalt Principle of Proximity). Use a structured spacing system (e.g., increments of 4px or 8px: `8, 16, 24, 32, 48, 64`).

## 2. Typography Rules

- **Line Length**: A comfortable reading width is 60-80 characters per line. Max width for text containers should be around `65ch`.
- **Line Height (Leading)**: 
  - Body text: 1.5 - 1.6
  - Headings: 1.1 - 1.3 (Headings need tighter spacing or they look disconnected).
- **Hierarchy of Fonts**: Stick to 2 fonts maximum. Often, 1 font with diverse font-weights (e.g., Inter, Roboto, SF Pro) is superior.

## 3. Cognitive Load

Don't make the user think.
- **The Magical Number 7**: Human working memory holds about 7 items. Don't put 15 links in a top nav bar; group them into categories.
- **Progressive Disclosure**: Hide complex settings until requested. Show a simple interface first, with an "Advanced Options" toggle.
- **Fitts's Law**: The time to acquire a target is a function of the distance to and size of the target. Make important buttons absolutely massive and put them near where the user's cursor/thumb already is.

## 4. UI Patterns & Affordances

- **Affordance**: A button must *look* clickable. Use soft drop shadows, distinct background colors, and hover states.
- **Consistency**: Don't use a red button for "Save" on one page and "Delete" on another.
- **Primary vs. Secondary CTAs**: 
  - Primary: Solid background color.
  - Secondary: Outline (ghost button) or simple text link.

## 5. Accessibility (A11y) Foundations

- **Contrast Ratios**: Text must have at least a 4.5:1 contrast against its background.
- **Color Independence**: Never convey critical information (like error states) *only* through color. Always include an icon or text label.
- **Tap Targets**: Mobile buttons and links must be at least 44x44 pixels.
