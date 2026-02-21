---
name: WebGL Custom Shaders
description: Best practices for implementing award-winning GLSL Fragment and Vertex shaders for premium visual effects.
---

# WebGL Custom Shaders (GLSL)

Shaders are the secret weapon to achieving an Awwwards-level portfolio. They allow for per-pixel image manipulation, liquid distortions, and cinematic grading that standard CSS cannot achieve.

## 1. When to use Custom Shaders
- **Image Hover Effects**: Instead of a simple CSS `scale: 1.05`, use a fragment shader to create a ripple effect, chromatic aberration, or a "page peel" transition when hovering over project thumbnails.
- **Backgrounds**: Instead of a static image, generate an infinite, slowly evolving Perlin noise gradient or fluid simulation.
- **Scroll Hijacking**: Tie the user's scroll velocity to a `u_distortion` uniform in your vertex shader, bending images physically as they scroll fast.

## 2. Core Structure in React Three Fiber

Always pass time, mouse/scroll position, and textures as Uniforms.

```javascript
import { shaderMaterial } from '@react-three/drei'
import { extend } from '@react-three/fiber'

// Setup the custom material
const DistortionMaterial = shaderMaterial(
  {
    u_time: 0,
    u_texture: null,
    u_hoverState: 0,
  },
  // Vertex Shader (Manipulates shape)
  `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // Fragment Shader (Manipulates color/pixels)
  `
    uniform float u_time;
    uniform sampler2D u_texture;
    varying vec2 vUv;
    
    void main() {
      // Add a simple sine wave distortion to the UVs based on time
      vec2 distortedUv = vUv;
      distortedUv.y += sin(distortedUv.x * 10.0 + u_time) * 0.05;
      
      gl_FragColor = texture2D(u_texture, distortedUv);
    }
  `
)

extend({ DistortionMaterial }) // Makes <distortionMaterial /> available in JSX
```

## 3. The "Holy Trinity" Effects
To immediately elevate a portfolio, learn to code these three GLSL effects:
1. **Perlin Noise Displacement**: Using `snoise` functions to randomly displace vertices to create landscapes, or displacing UVs to create "melting" image effects.
2. **RGB Split (Chromatic Aberration)**: Sampling the `R`, `G`, and `B` channels of a texture independently and shifting them based on mouse movement or scroll speed.
3. **Film Grain & Vignette**: Add mathematical noise over the entire output in post-processing. Pure solid colors in WebGL look fake and plastic. Always add 1-2% grain.

## 4. Performance Optimizations
- **PRECISION**: Use `precision mediump float;` instead of `highp` on mobile devices.
- **MATH**: Avoid `sin()`, `cos()`, and `pow()` inside the fragment shader if possible, as they must execute millions of times per frame. Try to pre-calculate these or move them to the Vertex shader.
- **IF Statements**: Branching (`if/else`) inside GLSL is terrible for performance. Try to use mathematical functions like `step(), smoothstep(), mix(), clamp()` instead.
