---
name: Remotion Skills
description: Best practices for programmatic video generation using React and Remotion.
---

# Remotion: Programmatic Video in React

Remotion allows you to write React components that render to MP4/WebM videos frame-by-frame. 

## 1. Core Concepts

### Time is State
Everything in Remotion is driven by the `useCurrentFrame()` hook.
- A 30 FPS video means frame 30 is exactly 1 second in.
- Your components must be deterministic. Given `frame=30`, the component should always render exactly the same output. Do not rely on `Date.now()`, `Math.random()`, or network latency without seeding/caching.

### Composition
Use `<Composition />` to define distinct video assets.
- `id`: The name you use to render it.
- `component`: The React component.
- `durationInFrames`: How long the video is.
- `fps`: Frames per second (usually 30 or 60).
- `width` / `height`: Resolution (e.g., 1920x1080 for HD, 1080x1920 for TikTok/Shorts).

## 2. Animation Data & Interpolation

Use `interpolate(input, inputRange, outputRange, options)` heavily.

```javascript
import { interpolate, useCurrentFrame } from "remotion";

const frame = useCurrentFrame();
// Element fades in from frame 10 to 30, and fades out from 60 to 80.
const opacity = interpolate(
  frame, 
  [0, 10, 30, 60, 80], 
  [0, 0, 1, 1, 0], 
  { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
);
```

### Springs
Use `spring()` for natural motion. It requires `fps` and `frame`.
```javascript
import { spring, useCurrentFrame, useVideoConfig } from "remotion";

const { fps } = useVideoConfig();
const frame = useCurrentFrame();

const scale = spring({
  fps,
  frame,
  config: { damping: 10, mass: 0.5, stiffness: 100 }
});
```

## 3. Data Fetching & Randomness

- **Fetching**: Use `delayRender()` and `continueRender()` to pause the rendering engine while fetching fonts, images, or JSON data.
- **Randomness**: Use Remotion's `random(seed)` utility, which guarantees the same "random" number is generated for the same seed every time.

## 4. Sequence & Audio

- **Sequence**: Use `<Sequence from={30} durationInFrames={60}>` to offset when a component appears in the timeline. DO NOT use manual `if (frame > 30)` logic; `<Sequence>` handles relative frames and performance optimizations.
- **Audio**: Use `<Audio src={mySound} />`. You can offset audio playback using sequences just like visual elements.

## 5. Composition Architecture
Treat complex videos like SPAs. Group related visuals into their own components. Use `AbsoluteFill` (a built-in styled `div`) heavily to layer elements on top of each other.
