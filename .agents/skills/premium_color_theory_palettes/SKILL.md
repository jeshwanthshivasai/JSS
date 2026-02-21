---
name: Premium Color Theory & Palettes
description: Guidelines for generating award-winning color combinations, avoiding muddy gradients, and establishing high-end visual aesthetics.
---

# Premium Color Theory & Palettes

Great web design rarely uses default, highly saturated hex codes. Awwwards-winning portfolios rely on sophisticated, curated palettes that evoke emotion and feel expensive.

## 1. The 60-30-10 Layout Rule
When applying colors to a page, follow this ratio:
- **60% Dominant Color**: The background. Usually a deep, rich dark tone (Dark Mode) or a very soft, off-white (Light Mode).
- **30% Secondary Color**: Cards, secondary backgrounds, large typography.
- **10% Accent Color**: CTAs (Call to Actions), vital links, hover states, and micro-interactions. This is the only place you should use high saturation.

## 2. Ditching RGB/HEX for HSL
Always think and color-pick in **HSL (Hue, Saturation, Lightness)**.
- **Hue (0-360)**: The base root color (Red, Blue, Green).
- **Saturation (0-100%)**: How intense the color is.
- **Lightness (0-100%)**: How close to black (0%) or white (100%) it is.

*Why HSL?* It allows you to create harmonious shades instantly. Need a hover state for a button? Don't pick a new Hex code. Just take the existing HSL value and drop the Lightness by 10%.

## 3. The "Expensive" Dark Mode
Never use pure black (`#000000`). It causes extreme eye strain against white text and looks generic.
- **Tinted Blacks**: Always mix your dominant accent color into your background black.
- *Example*: If your brand color is Blue, use a dark navy `#0A0F1A` (HSL: `221, 44%, 7%`).
- **Text in Dark Mode**: Never use pure white text (`#FFFFFF`) on dark backgrounds. Use off-whites like `#E2E8F0` or `#F3F4F6` (HSL Lightness around 85-95%) to reduce halation (the glowing blur effect in the eye).

## 4. The "Expensive" Light Mode
Never use pure white (`#FFFFFF`) as an expansive background.
- **Paper/Canvas Tones**: Use very subtle warm grays (`#F8F9FA` or `#FDFDFD`) to simulate premium paper.
- **Text in Light Mode**: Never use pure black text (`#000000`). It's too harsh. Use `#111827` or `#1A202C` (HSL Lightness around 10-15%).

## 5. Better Gradients
Default CSS gradients often look muddy in the middle because they interpolate straight through the RGB color space.

- **The Muddy Problem**: A gradient from Blue to Yellow will pass through an ugly, muddy grey-green in the exact middle.
- **The Solution (Color Spaces)**: In modern CSS, use `color-mix` or specify the `in oklch` or `in oklab` color space for beautiful, vibrant transitions.
```css
/* Bad: Muddy middle */
background: linear-gradient(to right, blue, yellow);

/* Good: Vibrant, perceptually uniform transition */
background: linear-gradient(in oklch to right, blue, yellow);
```
- **The Soft Stop**: Don't just fade `Color A -> Color B`. Fade `Color A -> Color B (0% opacity)`. This blends the gradient smoothly into the surrounding background.

## 6. Monochromatic & Analogous Palettes
When in doubt, use these two foolproof, high-end schemes:
1. **Monochromatic**: Pick one Hue (e.g., 220 Blue). Keep Saturation constant. Only change the Lightness. This is the most professional, safest corporate aesthetic.
2. **Analogous**: Pick your base Hue. Then pick one Hue 30 degrees to the left, and one 30 degrees to the right. This creates a very organic, natural feeling (like a sunset or a forest).
