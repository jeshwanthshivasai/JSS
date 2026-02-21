---
name: 3D Visuals & React Three Fiber
description: Best practices for building performant 3D experiences on the web using R3F and Three.js.
---

# 3D Visuals & React Three Fiber (R3F)

Building 3D experiences requires strict performance management. The web is not a specialized game console.

## 1. Scene Setup & Fundamentals
- **The Canvas**: Always wrap your R3F scene in `<Canvas>`. Use `eventSource` attached to a parent DOM element if you need HTML overlays to not block orbit controls.
- **Lighting**: Start simple. One `ambientLight` and one `directionalLight` (for shadows) is often enough. Avoid dozens of point lights unless using deferred rendering (which is advanced).
- **Environment**: Use `@react-three/drei`'s `<Environment preset="city" />` for instant, realistic PBR reflections without manually placing lights.

## 2. Performance & Optimization (CRITICAL)

### Instancing
If you need 100+ of the same object (trees, particles, boxes), NEVER loop and create individual raw meshes. 
- Use `<InstancedMesh>` or Drei's `<Instances>` component. This reduces 100 draw calls to 1.

### Geometry & Materials
- Use low-poly models whenever possible.
- Avoid `<meshPhysicalMaterial>` unless you strictly need clearcoat/glass. Use `<meshStandardMaterial>` or `<meshBasicMaterial>` (cheapest, no lighting calculations) where appropriate.
- Share geometries and materials across meshes to reuse memory. R3F does this automatically for primitives like `<boxGeometry>`, but you must do it manually for loaded models.

### Suspense & Loading
- Wrap 3D assets (textures, GLTF models) in `<Suspense>`. 
- Use Drei's `<useGLTF.preload(path)>` to fetch models before they are needed.
- Use Drei's `<Loader>` component for a nice, built-in loading screen overlay.

## 3. Camera & Controls
- **OrbitControls**: Use Drei's `<OrbitControls makeDefault />` for standard inspection. Enable `enableDamping={true}` for smooth drag.
- **Scroll Controls**: Use Drei's `<ScrollControls>` to scrub through animations or camera positions as the user scrolls the page.

## 4. Post-Processing
- Use `@react-three/postprocessing` (not the default Three.js examples).
- Post-processing is extremely heavy. Only use essential effects (like Bloom or Vignette). 
- Combine passes efficiently. Multiple passes = drastic frame drop on low-end devices.

## 5. HTML Overlays
- Use Drei's `<Html>` to attach text or UI elements directly to 3D coordinates.
- Be careful: heavy DOM updates inside the `<Html>` component can cause the 3D scene to stutter due to main thread blocking.

## 6. The 3D Golden Rule
**If it can be faked, fake it.** 
A highly detailed baked texture on a low-poly sphere is vastly superior to a high-poly sphere calculating lighting in real-time.
