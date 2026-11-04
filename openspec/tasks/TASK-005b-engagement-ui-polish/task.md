# TASK-005b — Engagement UI polish

## What this is

A visual-only follow-up to TASK-004 and TASK-005. It fixes the collision between the hidden engagement popup and the orange contact button, then gives the popup and the contact form the same finished look as the rest of the site.

This task does not add a prompt, change copy, change behavior, or turn anything on. `ENGAGEMENT_ENABLED` stays `false` in the committed code.

## Why

Two things are wrong today:

1. The popup and the orange button share the bottom-right corner. The popup is `bottom-6 right-6`; the button is `bottom-[70px] right-[20px]` on phones and `bottom-[115px] right-[50px]` on desktop. They use the same `z-[9999]`, and the button renders after the popup, so the button sits on top of the popup's lower-right area. The popup is off today, so visitors do not see it — but the moment it is enabled, it looks broken.
2. The popup and the form are visually plainer than the rest of the site: the popup has no border, the form panel has no border, and the dropdown does not line up with the text fields.

## What to change

### 1. Stop the popup and the button from touching

- Leave the orange button exactly where it is. Same position, same size, same icon, same click handler.
- Move the popup up so it clears the button:
  - phones: `bottom-[145px]`
  - from 576px up: `min-[576px]:bottom-[190px]`
- Keep the popup's `right-6`, width, and `max-w-[calc(100vw-3rem)]` as they are.
- Keep `z-[9999]`.

**Benchmark:** after this change, with the popup temporarily visible, the popup and the orange button do not intersect at 390×844 or 1440×900. There is at least 16px of clear space between the bottom of the popup and the top of the button.

### 2. Popup look

- Add a thin border: `border border-white/15`.
- Keep the corners square. The site's cards are square; do not turn it into a rounded chat widget.
- Keep the existing `shadow-2xl`, padding, orange `Ifedike` header, message, close X, and the three links exactly as they are.
- The three links are already correct: one solid orange, two outlined. Do not change them.
- Do not add a new pill, new text, new button, or new icon.

**Benchmark:** after this change, the popup has a visible thin border, square corners, and the same content, links, and shadow as before. Nothing inside it has moved except the whole panel moving up.

### 3. Form look

- Add a thin border to the dark dialog panel: `border border-white/15`. Keep the corners square. Keep the existing padding and shadow.
- Give every field the same height: add `min-h-[42px]` to the shared field class in `ContactLauncher.tsx`. The dropdown is the one that currently looks shorter.
- Keep the existing labels, orange focus border, orange submit button, spacing, scrolling, and all states (validation, 503 fallback, success, error).
- Do not change any field, option, copy, validation rule, request, API call, analytics event, consent text, cooldown, or submitted-state logic.

**Benchmark:** after this change, the name, email, need, budget, timeline, and message fields all line up at the same height; the dropdown matches the text inputs; the panel has a thin border. Submitting behaves exactly as before — empty fields still show the same validation errors, and the no-keys route still returns the same 503 fallback.

## Boundaries

- `ENGAGEMENT_ENABLED` must stay `false` in the committed code.
- Do not touch the scroll banner, idle panel, exit-intent modal, footer toast, confetti, or the time-of-day greeting.
- Do not add a new color, font, animation, component, or behavior.
- Do not refactor the components. Change class names and, only if necessary, add a narrow presentation rule in `src/app/globals.css`.
- Do not change any text. Not one word.
- Do not move or restyle the orange button.
- Do not modify `src/content/inquiries.ts` or the inquiry API route.

## How to verify the hidden popup

The popup is off, so it cannot be seen in the normal build.

1. Set `ENGAGEMENT_ENABLED = true` locally only.
2. Run the dev server and check 390×844 and 1440×900 (plus 320 and 768 if quick).
3. Confirm the popup and the button do not touch.
4. Set `ENGAGEMENT_ENABLED = false` again.
5. Confirm the final diff does not contain the flag change.

If a temporary local flip is not allowed, the popup cannot be checked visually. Say that honestly; do not claim it was verified.

## Done when

- The popup clears the orange button by at least 16px at both sizes.
- The orange button is unchanged.
- The popup has a thin border and square corners; its content and links are unchanged.
- The form panel has a thin border; all fields are the same height; all behavior and copy are unchanged.
- The diff contains only styling changes.
- `ENGAGEMENT_ENABLED` is still `false`.
