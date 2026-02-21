---
name: Interaction Design Principles
description: Core principles of interaction design (IxD), focusing on affordances, feedback loops, and intuitive state management.
---

# Interaction Design Principles (IxD)

Interaction Design is the dialogue between a person and a product. While UI is how it looks, IxD is how it *feels* to use.

## 1. Affordance & Signifiers

- **Affordance**: What an object can actually do. (A button *can* be clicked).
- **Signifier**: The visual clue that tells the user about the affordance. (The button looks raised, has a different color, and the cursor changes to a pointer).

*Rule*: Never create "false signifiers". If text looks like a link (e.g., it is blue and underlined), it MUST be clickable. If a card has a hover effect, clicking it MUST trigger an action.

## 2. Feedback Loops

Every action a user takes must have an immediate, perceptible reaction. 
Without feedback, the user assumes the system is broken and will click again.

### The 4 States of Interactive Elements:
1. **Default**: The resting state.
2. **Hover**: Mentally prepares the user. ("Yes, you are aiming at the right thing.")
3. **Active/Pressed**: Physical confirmation of the action. (The element scales down slightly, simulating physical pressure).
4. **Focused**: Crucial for keyboard accessibility (`:focus-visible`). Provide a clear, high-contrast ring around the element.

## 3. The Psychology of Waiting (Latency)

Humans perceive time differently depending on what they are looking at.

- **0 - 100ms**: Feels instantaneous. (Ideal for hover states, expanding accordions).
- **100ms - 300ms**: Noticeable delay, but acceptable. (Ideal for page transitions).
- **300ms - 1000ms**: The user knows the machine is working. You MUST show a loading indicator (spinner, skeleton screen).
- **> 1000ms**: The user will context switch. You must show a *progress* indicator (e.g., "Uploading... 45%", not just an infinite spinner) so they know the system hasn't frozen.

## 4. Fitts's Law & Touch Targets

The time required to rapidly move to a target area is a function of the ratio between the distance to the target and the width of the target.
*Translation*: Make important things big, and put them near where the user's cursor/thumb already is.

- **Mobile Targets**: A minimum of 44x44 CSS pixels (Apple's HIG standard). Never place two destructive/important buttons closer than 8px together.
- **Infinite Edges**: A button pinned to the absolute bottom edge of a mobile screen is technically "infinitely tall" because the user's thumb cannot physically scroll past the glass edge. Use this for primary CTAs.

## 5. Preventing Errors (Poka-Yoke)

Good IxD prevents the user from making a mistake before it happens.
- Disable the "Submit" button until all required fields are filled out correctly. Provide inline validation *as they type*, not after they submit.
- If an action is highly destructive (Deactivating an Account), force the user to type the word "DELETE" to confirm. A simple pop-up alert is easily dismissed by muscle memory.

## 6. The Principle of Consistency

- **Internal Consistency**: If swiping left deletes an item on one screen, swiping left MUST delete items on all other screens in your app. Do not change interaction patterns within the same ecosystem.
- **External Consistency (Jakob's Law)**: Users spend most of their time on *other* websites. They expect your site to work like the others they already know. Don't invent a new way to scroll or a completely novel icon for a shopping cart just to be "creative".
