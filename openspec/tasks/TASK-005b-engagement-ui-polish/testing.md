# TASK-005b Testing — Engagement UI polish

## What must be checked

A separate tester session checks the visual-only changes from TASK-005b. It did not do the building.

## How the tester knows it passed

### 1. The popup no longer touches the orange button

- Temporarily set `ENGAGEMENT_ENABLED = true` locally.
- Open the site at 390×844 and 1440×900.
- Measure or inspect the popup's rectangle and the orange button's rectangle.
- Pass: they do not intersect, and there is at least 16px of clear space between the popup's bottom edge and the button's top edge.
- Fail: they touch, overlap, or the gap is smaller than 16px.

### 2. The orange button is unchanged

- At both sizes, the button is in the same place, same size, same orange, same chat icon.
- Clicking it opens the contact form.
- Pass: same position and size as before; the form opens.
- Fail: it moved, resized, changed color or icon, or no longer opens the form.

### 3. The popup look

- The popup has a thin light border and square corners.
- The orange "Ifedike" header, the message, the close X, and the three links are present and unchanged.
- The three links are still one solid orange and two outlined.
- Pass: all of the above.
- Fail: any text, link, or button changed; a new element appeared; corners are rounded.

### 4. The form look and behavior

- The dialog panel has a thin light border and square corners.
- The name, email, need, budget, timeline, and message fields all have the same height.
- The dropdown matches the text inputs.
- Labels are visible, the focus border is orange, the submit button is orange.
- Submit with empty required fields → the same validation errors as before.
- With no provider keys → the same 503 fallback as before.
- The success state still works (mock a 200 response if needed).
- Pass: all of the above.
- Fail: any field, label, copy, option, validation message, API behavior, analytics event, consent, cooldown, or state changed.

### 5. No copy or behavior changes

- Compare the diff.
- Pass: only `className` values and, if used, a narrow presentation rule in `src/app/globals.css` changed.
- Fail: any text, link, handler, state, timer, storage key, API call, analytics call, or constant changed.

### 6. The flag stayed off

- `ENGAGEMENT_ENABLED` is `false` in the final diff and in the working tree.
- Pass: `false`.
- Fail: `true`, or the temporary change was not reverted.

### 7. Viewport check

- Check 320, 375, 430, 768, 1024, and 1440.
- Pass: no horizontal scroll; the popup and form fit; nothing is clipped.
- Fail: horizontal scroll or clipped content.

### 8. Build

- `npx tsc --noEmit` passes.
- `npx next build` passes.

## Pass / fail

- **Pass:** all eight checks above are true.
- **Fail:** the popup still touches the button; the button moved; any copy or behavior changed; the flag is left on; the diff contains logic changes; a build fails.

## Notes

- The popup is off in normal use. The temporary local enable is for checking only; it must be reverted.
- The banner, idle panel, exit modal, toast, confetti, and greeting are out of scope. Do not judge them in this task.
- If the tester is not allowed to flip the flag, report the popup checks as `NOT VERIFIED` instead of guessing.
