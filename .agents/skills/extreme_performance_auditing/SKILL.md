---
name: Extreme Performance Auditing
description: Web Worker offloading, texture compression, layout thrashing prevention for 60/120FPS rendering.
---

# Extreme Performance & Auditing

Awwwards judges (and discerning users) will instantly spot frame drops. A beautiful WebGL site that stutters is heavily penalized. Your goal: 60FPS on a 5-year-old mobile device, 120FPS on modern desktops.

## 1. 3D Texture & Asset Compression

The largest bottleneck in WebGL is VRAM (Video RAM) allocation when loading textures.
- **NEVER use Raw JPEGs/PNGs for 3D Textures**: Use specialized GPU compression formats (KTX2 / Basis Universal). 
  - Why? A 10MB JPEG must be decompressed entirely into raw pixels (potentially taking 100MB+ in GPU memory). A KTX2 file stays compressed *on the GPU*, dropping memory overhead by 90%.
- **Draco Compression**: For 3D geometry (GLTF/GLB models), use Draco compression. It mathematically reconstructs the mesh on the client, turning 20MB files into 2MB files.

## 2. Main Thread Freedom (Web Workers)

React (and Three.js) run on the main thread. If you perform intense calculations (e.g., sorting 10,000 particles, running a physics engine), the UI freezes.
- **Offscreen Canvas**: Draw the WebGL scene completely in a Web Worker (if the browser supports it, e.g., via `@react-three/offscreen`).
- **Physics Calculation**: Run Cannon-es or Rapier engines inside a worker. Send the position matrix back to the main thread via `postMessage`.

## 3. Layout Thrashing (DOM Repaints)

Even if your WebGL is optimized, poorly written CSS/JS will thrash the browser layout engine.
- Reading layout properties (`elem.offsetHeight`, `elem.getBoundingClientRect()`) forces the browser to synchronously calculate layout.
- **The Rule**: If you write to the DOM, and immediately read from the DOM, you cause a reflow. 
- Batch all reads together, then batch all writes (`fastdom` library or React's batching).

## 4. React Pre-Optimization

Awwwards portfolios use heavy hooks and contexts. 
- Do not let a high-up context change cause 50 heavy 3D components to re-render.
- **Proxy Contexts / Zustand**: Use Zustand instead of React Context for things like scroll position or cursor coordinates. Zustand allows components to selectively subscribe to state slices *without* triggering React re-renders for the entire component tree.

## 5. Preloading & The Initial Render

- **The "Awake" State**: Don't just show a spinner until everything is loaded. Load the basic CSS/HTML structure, load a highly compressed WebP image of the hero section for instant feedback. 
- Only trigger the "Enter Site" animation once the massive GLB models and audio stems have been fully pre-fetched via `<link rel="preload" as="fetch" />`. Let the user dictate the final GPU initialization by clicking "Enter".
