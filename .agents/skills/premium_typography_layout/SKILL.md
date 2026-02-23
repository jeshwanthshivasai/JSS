---
name: Premium Typography & Layout
description: Best practices for high-end digital editorial design, focusing on hierarchy, spacing, and readability.
---

# Premium Typography & Layout

Typography is the backbone of award-winning digital experiences. It communicates tone, urgency, and luxury.

## 1. Modular Scales
Don't choose font sizes at random. Use a modular scale (e.g., 1.250 Major Third or 1.414 Augmented Fourth) to ensure a mathematical relationship between all text elements.
- **H1 / Display**: Massive, often with tight `letter-spacing` (`tracking-tighter`).
- **Body**: Generous `line-height` (1.6 - 1.8) to ensure readability against dark backgrounds.

## 2. Intentional White Space (Negative Space)
In Awwwards-level design, white space is not "empty"—it is a structural element.
- **Macro-spacing**: Use large margins between sections (e.g., `15vh` to `25vh`) to let the content breathe.
- **Micro-spacing**: Use consistent `gap` values and `padding` to create clear groupings.

## 3. The "Editorial" Look
- **Serif/Sans-Serif Pairing**: Use a bold, geometric Sans-Serif for headers and a high-contrast Serif (like Playfair Display or Georgia) for descriptive "Sketchbook" or editorial notes.
- **Overlapping Elements**: Allow text to overlap images or 3D canvases slightly (using `z-index` and `mix-blend-mode`) to create depth.

## 4. Break the Grid
While the foundation should be a 12-column grid, "Awwwards" winners often break it intentionally.
- **Offset Columns**: Shift elements by a few pixels or a fraction of a column to create a more organic, less "bootstrap" feel.
- **Floating Labels**: Place metadata (dates, roles) in asymmetrical positions.

## 5. Performance & Readability
- Avoid using custom fonts for everything. Use system fonts for UI elements and load high-quality web fonts only for the "Hero" and "Display" text.
- Contrast check: Background `#050505` needs text to be at least `#e0e0e0` for comfortable reading.
