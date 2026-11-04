# TASK-006 — One engagement gate

## What this is

Five prompts currently run on five independent timers. Nothing coordinates them, so with the flag on they can appear on top of each other, and each one writes its "already shown" session key whether or not it actually appeared. This task replaces that with one shared gate and makes "show a prompt" a single, honest question that every prompt asks the same way.

## Why

- **No stacking.** Only one prompt may be on screen at a time.
- **No lying.** A prompt that never appeared must not be marked as seen, or the visitor loses it for the session.
- **No waiting list.** If a trigger fires while something else is showing, or during the cooldown, that attempt is skipped. Nothing is remembered for later. A prompt that is skipped can still appear if its trigger happens again after the cooldown.

## The rule in one sentence

Every prompt calls one function — `tryShow(id)` — and renders only if it returns `true`.

`tryShow(id)` returns `true` only when **all five** are true:

1. the form is not open;
2. the visitor has not submitted an inquiry this session;
3. no prompt is currently showing;
4. the 120-second cooldown is over;
5. this prompt's session key is not set.

If any one fails, it returns `false`. Nothing is queued, no timer is set, no key is written.

When it returns `true`, it does three things before returning: sets the active prompt to `id`, writes that prompt's session key, and records the cooldown start time as "not yet running" (the cooldown starts when the prompt closes).

## The two cooldowns — do not merge them

| Cooldown | Length | What it gates | Where it lives |
|---|---|---|---|
| Prompt cooldown | **120 seconds** | prompts only | `EngagementProvider` |
| Launcher guard + ring | **20 seconds** (unchanged) | the orange button only | `ContactLauncher` |

The orange launcher is **not** a prompt. It stays visible and usable during the prompt cooldown. Its existing 20-second ring stays exactly as it is; the ring must not be driven by the 120-second value, or it will drain over two minutes and look broken.

The prompt cooldown starts when any prompt closes, is dismissed, has a link clicked, or auto-dismisses. Opening the form also dismisses the active prompt (its key is already written, so it does not come back); closing the form starts the 120-second cooldown.

## What changes, file by file

### 1. New — `src/components/EngagementProvider.tsx`

State only; it renders nothing but its children.

- `activePrompt: string | null`
- `cooldownUntil: number` (epoch ms; 0 means no cooldown)
- `formOpen: boolean`
- `submitted: boolean`
- `tryShow(id: string): boolean` — the five checks above.
- `closePrompt()` — clears the active prompt and sets `cooldownUntil = Date.now() + PROMPT_COOLDOWN_MS`.
- `requestOpenForm(options?: { needType?: string }): boolean` — refuses if `submitted`; otherwise closes any active prompt, sets `formOpen`, fires `cta_click` and `inquiry_start`, and records the optional preset need type for the form to read.
- `notifyFormClosed()` / `notifySubmitted()` — called by `ContactLauncher`.
- Export `PROMPT_COOLDOWN_MS = 120_000` from this file.

`tryShow`, `closePrompt` and `requestOpenForm` must be stable (`useCallback`) so effects that depend on them do not re-run.

The provider must not read or write storage itself; session keys are read and written inside `tryShow` using the same key names already in use (`bubble_shown`, `scroll50_shown`, `idle_shown`, `exit_intent_shown`, plus a new footer key).

### 2. `src/app/page.tsx`

Wrap `EngagementLayer` and `ContactLauncher` in the provider. `BackToTop` stays outside it. No other change on this page.

### 3. `src/components/EngagementLayer.tsx`

- Delete the local `bubbleVisible` / `bannerVisible` / `panelVisible` / `exitVisible` / `toastVisible` booleans as the source of truth. The provider's `activePrompt` decides what renders. Render **only** the active prompt; do not keep hidden prompts mounted.
- Each prompt calls `tryShow(id)` at the moment its trigger fires and renders only on `true`.
- Every close path calls `closePrompt()` — the × buttons, Escape, backdrop click, the 20-second auto-dismiss, and any in-prompt link (`See the work`, `About me`, `Yes, show me`, `Jump to projects`, and the exit modal's `Email instead` mailto).
- `Talk` becomes a `<button>` that calls `requestOpenForm()` instead of an `<a href="#contact">`.
- Session key names: `bubble_shown`, `scroll50_shown`, `idle_shown`, `exit_intent_shown`, `footer_shown`.
- Keep the TASK-005b visuals untouched: `bottom-[145px] min-[576px]:bottom-[190px]`, the thin border, the panel styling.

**Bubble.** Fires at 8 seconds (not 3). Copy: returning visitor gets "Welcome back. Are you here to see the work, or talk about a project?"; new visitor gets the existing default copy; the referrer variant applies only to a new visitor. Auto-dismiss after 14 seconds. The 14-second timer pauses while the pointer is over the bubble or focus is inside it, and resumes with the remaining time.

**50%-scroll banner.** Trigger unchanged — the existing 1.5-second delay and the scroll listener. On a skip, do **not** set the local `fired` flag and do **not** write the session key; leave the listener running so a later crossing can show it.

**45-second idle panel.** Same rule: only set `idleFired` when `tryShow` returns `true`, and keep the activity listeners resetting the 45-second timer so it can fire again after the cooldown.

**Exit modal.** Desktop only, gated with `matchMedia("(hover: hover) and (pointer: fine)")` — not user-agent sniffing. Only attempted after 20 seconds on the page. If `tryShow` returns `false`, do not remove the listener and do not write the key; a later exit attempt may show it. Auto-dismiss after 20 seconds, pausable on hover/focus like the bubble, and Escape closes it. Primary button "Tell me what's broken" calls `requestOpenForm({ needType: "fix" })`; secondary "Email instead" stays the mailto link. Every close path calls `closePrompt()`.

**Footer toast + confetti.** One prompt, one gate, one session key (`footer_shown`). If `tryShow` returns `false`, neither the toast nor the confetti appears. The confetti is suppressed under `prefers-reduced-motion: reduce`; the toast still appears.

Keep `ENGAGEMENT_ENABLED = false` while building and testing. The owner authorized enabling the layer on 2026-11-04 (`afdbcd5`), so `true` is the accepted value in the final tree.

### 4. `src/components/ContactLauncher.tsx`

- Report to the provider: opening the form, closing it, and a successful submit (`notifyFormClosed`, `notifySubmitted`).
- `openDialog` goes through `requestOpenForm` so analytics and the submitted check live in one place.
- The launcher keeps its **own** 20-second guard, set when the form it opened is closed, so the ring still means something. That guard must not block `requestOpenForm` calls that come from Talk or the exit modal.
- Remove the old `COOLDOWN_MS = 20_000` coupling to prompt timing; the prompt cooldown comes from the provider.
- If the form is opened with a preset need type (`fix` from the exit modal), preselect it and remember that the value came from the preset. Any change event on that select clears the memory. On a later open that supplies no preset, clear the value if it still equals the remembered preset value; a value the visitor chose stays. The rest of the form keeps its values across opens, as it does today.
- Do not change the form's fields, validation, success/error states, or the header/scrollbar work from TASK-005b.

### 5. `src/app/globals.css`

Only if needed for the reduced-motion confetti rule. No new animation. The existing `@keyframes eng-fall` and `.eng-confetti-piece` stay for everyone else.

## Accessibility

- Hidden prompts are not rendered at all, so their links are never tabbable. This removes the current "aria-hidden container with focusable children" problem.
- Pause means **freeze the remaining time**, not restart the full timer.
- Escape closes the exit modal and counts as a close (cooldown starts).
- The exit modal's focus behaviour, backdrop click and close button stay as they are.

## Known consequence — do not "fix" it

If a visitor is already past 50% of the page, the scroll banner can show at 1.5 seconds. The bubble's 8-second trigger then finds another prompt showing, is skipped, and because its trigger never fires again, the bubble is lost for that session. This is the agreed rule: skipped is skipped. Do not add a waiting list, a retry, or a "hold the banner until 8s" special case.

## Benchmarks

After this change, all of these must be true:

1. **Fresh visit, hands off.** Load the page. At 8 seconds the bubble appears with the default copy. It does not appear at 3 seconds.
2. **Scroll while the bubble shows.** Scroll past 50% while the bubble is up. No banner appears. Scroll away and back past 50% after the cooldown — the banner appears then.
3. **Close anything.** Close the bubble. Scroll past 50%, go idle 45 seconds, and move the mouse out of the window. Nothing appears for 120 seconds. After 120 seconds, the next eligible trigger can show.
4. **Returning visitor.** With `ifedike_visit_count` already above 1, the bubble shows "Welcome back. Are you here to see the work, or talk about a project?" — not the Athletica line, and not the referrer line.
5. **Exit modal.** On desktop, before 20 seconds on the page, moving the pointer out does nothing. After 20 seconds it shows once, auto-dismisses after 20 seconds, closes on Escape, and its primary button opens the form with need type "fix". Its "Email instead" link is a mailto. On a touch device it never appears.
6. **Exit during a prompt or cooldown.** Show a prompt, then move the pointer out. The exit modal does not appear and is not marked as shown; after the cooldown, a later exit attempt can show it.
7. **Form open.** Open the form from the launcher, from Talk, and from the exit modal. While it is open, no prompt, banner, panel, toast or confetti appears — including the 8-second bubble.
8. **Form close.** Close the form. No prompt appears for 120 seconds.
9. **Submit.** Submit the form. No prompt appears for the rest of the session, on any trigger.
10. **Launcher during cooldown.** Dismiss a prompt, then click the launcher. The form opens. The ring is not draining, and the button is not disabled by the 120-second cooldown.
11. **Reload.** Prompts already shown stay shown. A prompt that was skipped before the reload is still eligible. There is no cap on how many prompts can appear in a session.
12. **Reduced motion.** With `prefers-reduced-motion: reduce`, the footer toast appears and no confetti falls.
13. **Final diff.** `ENGAGEMENT_ENABLED` was `false` for the build and test, then the owner enabled it (`afdbcd5`, 2026-11-04); no work-card tooltip was restored; the time-of-day greeting in the hero is unchanged; there is no pending/queue list anywhere in the code; the TASK-005b visuals are intact.

## Out of scope

- Any change to the prompts' copy beyond the two named lines, or to the prompt visuals.
- The hero greeting, the work-card tooltip, the case-study modal, the form's fields or validation.
- Persisting the cooldown across reloads, or storing anything new in localStorage.
- Analytics beyond the existing events.
- Group 7 work (reduced-motion for the launcher ring, performance, monitoring).
