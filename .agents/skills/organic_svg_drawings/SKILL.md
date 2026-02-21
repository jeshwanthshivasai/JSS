---
name: Organic SVG & Rough Drawings
description: Techniques for creating hand-drawn, sketch-like aesthetics using SVG path manipulation and Rough.js.
---

# Organic SVG & Rough Drawings

Perfect geometric shapes (`<rect>`, `<circle>`) look rigid and computerized. An emerging trend in premium web design is the "kinesthetic" or human touch—making digital elements look like they were hand-drawn or sketched with a pencil in real-time.

## 1. Introduction to Rough.js

The industry standard library for this aesthetic is **Rough.js**. It takes standard SVG/Canvas coordinates and outputs sketchy, hand-drawn equivalents.

### Basic Implementation (React):

Instead of rendering a standard SVG `<rect>`, you use Rough.js to generate the path data on mount:

```javascript
import { useEffect, useRef } from 'react';
import rough from 'roughjs/bundled/rough.cjs';

const SketchyButton = ({ children }) => {
  const svgRef = useRef(null);

  useEffect(() => {
    if (!svgRef.current) return;
    
    // Initialize rough attached to our SVG
    const rc = rough.svg(svgRef.current);
    
    // Draw a rectangle with "hachure" (pencil shading) fill
    const node = rc.rectangle(2, 2, 196, 46, { 
      fill: 'red', 
      fillStyle: 'hachure', // cross-hatch, solid, zigzag, etc.
      roughness: 1.5,       // How "messy" the line is
      bowing: 1             // How curved the straight lines become
    });
    
    svgRef.current.appendChild(node);
  }, []);

  return (
    <div style={{ position: 'relative', width: 200, height: 50 }}>
      {/* The sketchy background */}
      <svg ref={svgRef} width="200" height="50" style={{ position: 'absolute' }} />
      {/* The actual text */}
      <span style={{ position: 'relative', zIndex: 1 }}>{children}</span>
    </div>
  );
};
```

## 2. SVG Line Drawing Animation

A classic Awwwards effect is having a pencil stroke draw itself as the user scrolls or when a section enters the viewport.

**The Technique (Stroke Dash Array):**
1. Get an SVG `<path>`.
2. Measure its total length using javascript: `const length = path.getTotalLength();`
3. Set CSS properties: 
   `stroke-dasharray: length;`
   `stroke-dashoffset: length;` (This hides the line completely).
4. Animate `stroke-dashoffset` down to `0` (This reveals the line from start to finish).

**With Framer Motion:**
Framer Motion handles this math for you instantly using the `pathLength` property.

```javascript
import { motion } from 'framer-motion';

// This will draw a squiggly line from left to right over 2 seconds
<motion.path
  d="M10 80 Q 52.5 10, 95 80 T 180 80"
  stroke="black"
  strokeWidth="3"
  fill="transparent"
  initial={{ pathLength: 0 }}
  animate={{ pathLength: 1 }}
  transition={{ duration: 2, ease: "easeInOut" }}
/>
```

## 3. "Boiling" / Squigglevision Effect

In traditional hand-drawn animation, holding a static frame looks dead. Animators redraw the same frame 3 times loosely so the lines jitter or "boil".

You can achieve this in CSS/SVG using an **SVG Displacement Filter** combined with a `<animate>` tag inside an `<feTurbulence>`.

```html
<svg>
  <filter id="squiggle">
    <!-- Generate organic noise -->
    <feTurbulence baseFrequency="0.05" numOctaves="3" result="noise" seed="0">
      <!-- Animate the seed rapidly to create the jitter -->
      <animate attributeName="seed" values="0;1;2;3;4" dur="0.5s" repeatCount="indefinite" />
    </feTurbulence>
    <!-- Apply the noise to displace the graphic -->
    <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" xChannelSelector="R" yChannelSelector="G" />
  </filter>
</svg>

<!-- Apply it to any HTML or SVG element -->
<div style="filter: url(#squiggle);">
  I look like I was drawn by hand!
</div>
```

## 4. Best Practices for the Organic Look

- **Imperfect Geometry**: If creating an avatar frame, do not use a perfect circle. Use an SVG blob or a path with slightly irregular bezier control points.
- **Variable Stroke Width**: Real pens press harder in some areas. If designing custom SVGs in Illustrator/Figma, use varying stroke pressure profiles.
- **Mix Media**: Contrast is key. Do not make *everything* sketchy. Pair a hand-drawn, messy SVG underline with Razor-sharp, perfectly geometric San-Serif typography (like Inter or Helvetica) for massive visual impact.
