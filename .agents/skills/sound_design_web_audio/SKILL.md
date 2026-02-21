---
name: Sound Design & Web Audio API
description: Integrating purposeful, ambient, and interactive audio to elevate portfolio immersion.
---

# Sound Design & Web Audio

Sound creates emotion. Awwwards-winning websites often use sound design to ground digital elements with physical presence.

## 1. Principles of Web Audio

- **The Golden Rule**: Start Muted. Browsers strictly enforce autoplay policies. You **must** have a clear "Unmute / Enter Experience" button driven by a user interaction (click/tap) before audio can play.
- **Subtlety over volume**: UI sounds should be felt more than heard. A hover click should be incredibly brief and low-volume.
- **Contextual**: High-pitched sounds feel "lighter" and "faster". Low-pitched sounds feel "heavy" and "mechanical".

## 2. Typical Audio Stems Required

1. **The Drone/Ambient Track**: A 2-3 minute looping, non-intrusive soundscape. Not music with a beat, but atmospheric noise (wind, distant machinery, synth pads).
2. **The Hover Tick**: The sound when the cursor enters an interactive element. Usually a very fast, high-frequency "tick" or "pop" (< 50ms).
3. **The Active/Click State**: A slightly deeper, longer sound confirming an action.
4. **The Transition Swoosh**: A riser or swoosh sound that masks the dead-time between two pages loading.

## 3. Implementation Tools

Do not use raw `<audio>` tags for interaction. The latency is too high.
Use **Howler.js** or the native **Web Audio API** for zero-latency playback.

```javascript
import { Howl, Howler } from 'howler';

// Setup an audio sprite (One MP3 file containing all UI sounds to save network requests)
const uiSounds = new Howl({
  src: ['/assets/ui-sounds.webm', '/assets/ui-sounds.mp3'],
  sprite: {
    hover: [0, 100],        // starts at 0ms, lasts 100ms
    click: [200, 300],      // starts at 200ms, lasts 300ms
    transition: [600, 2000] // starts at 600ms, lasts 1.4s
  }
});

// Triggered on React onMouseEnter
const playHoverSound = () => uiSounds.play('hover');
```

## 4. Dynamic Audio (Advanced)
Use the Web Audio API to manipulate sounds in real-time based on user action:
- **Low-pass filter on scroll**: As the user scrolls down into "deeper" content, muffle the ambient track using a Web Audio `BiquadFilterNode` to simulate going underwater.
- **Spatial Audio (3D Panning)**: If an element is on the left side of the screen, use a `PannerNode` so the interaction sound only plays in the user's left ear/speaker.

## 5. Accessibility & Respect
- Always provide a global "Mute" toggle button in a predictable location (usually top right or bottom right corner) that persists across all pages.
- Ensure audio does not conflict with screen readers.
