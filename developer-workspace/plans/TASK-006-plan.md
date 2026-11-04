# Implementation Plan: TASK-006 — One engagement gate

## Overview

Replace five independent prompt timers with one shared gate in a new
`EngagementProvider`, make every prompt ask `tryShow(id)` before rendering, and align
the five prompts with the triggers the task already specifies (8s bubble, 20s exit
dwell/auto-dismiss, desktop-only exit intent, `footer_shown` key, `Talk` opening the
form). Form open/close/submit are reported to the gate by `ContactLauncher`. Two
cooldowns stay separate: prompts 120s in the provider, the launcher ring 20s in the
launcher.

Source of truth: `openspec/tasks/TASK-006-engagement-queue/task.md` and
`testing.md`. Those files are the owner's; this work does not edit them.

## Architecture decisions

1. **One provider, storage-free.** `EngagementProvider` holds `activePrompt`,
   `cooldownUntil`, `formOpen`, `submitted`, plus the pending preset need type. The
   only storage access is the five session keys inside `tryShow`.
2. **Refs are the gate's truth, state is its mirror.** `tryShow` must be stable and
   must reject a second prompt in the same tick. The provider keeps
   `stateRef` authoritative, writes it synchronously, then mirrors into `useState`
   for rendering. `tryShow`, `closePrompt`, `requestOpenForm`, `notifyFormClosed`,
   `notifySubmitted` are all `useCallback([])`.
3. **The launcher does not own "is the form open".** `ContactLauncher` reads
   `formOpen` from the provider instead of its local `open` state, so a form opened
   from `Talk` or the exit modal renders the same dialog. The launcher keeps its own
   `submitted` state for the success panel and its own 20s ring guard.
4. **Ring timing unchanged.** The 20s launcher guard starts in `closeDialog` (when
   the form closes), as the owner corrected in `task.md`.
5. **Prompts render only when active.** Each prompt is mounted only while
   `activePrompt` is its id — this is the accessibility fix. A one-frame reveal hook
   keeps the existing slide-in transition working without leaving hidden prompts
   mounted (the frame is off-screen and `pointer-events-none`).
6. **Pause freezes, never restarts.** One small `usePausableDismiss` hook holds
   `remaining` in a ref; hover (`pointerenter`/`pointerleave`) and focus inside
   (`focus`/`blur` with `contains(relatedTarget)`) both freeze it. Used by the bubble
   (14s) and the exit modal (20s).
7. **Preset rule.** `requestOpenForm({ needType })` records the pending value; the
   launcher applies it and remembers it. Any `change` event on that select clears the
   memory. On a later open with no preset, the value is cleared only if it still
   equals the remembered preset. The rest of the form keeps its values, as today.
8. **Reduced motion by JS, no new CSS.** The footer observer skips generating
   confetti when `matchMedia("(prefers-reduced-motion: reduce)").matches`; the toast
   still shows. `globals.css` is not touched.

## Task list

### Phase 0 — Paperwork

**Task 0 — Write plan and task list** (XS, 2 files)
- Files: `developer-workspace/plans/TASK-006-plan.md`,
  `developer-workspace/tasks/TASK-006-todo.md`
- Accept: both files exist, every task has criteria and verification; commit on its
  own.

### Phase 1 — The gate (the whole feature path, one working commit)

**Task 1 — Provider, page wiring, prompt rewrite, launcher integration** (M, 4 files)
- Files: `src/components/EngagementProvider.tsx` (new), `src/app/page.tsx`,
  `src/components/EngagementLayer.tsx`, `src/components/ContactLauncher.tsx`
- Work:
  - Provider with `activePrompt`, `cooldownUntil`, `formOpen`, `submitted`,
    `tryShow`, `closePrompt`, `requestOpenForm`, `notifyFormClosed`,
    `notifySubmitted`, `useEngagement()`, exported `PROMPT_COOLDOWN_MS = 120_000`.
  - `page.tsx` wraps `EngagementLayer` and `ContactLauncher`; `BackToTop` stays out.
  - `EngagementLayer` rewritten to ask `tryShow`: bubble at 8s with the new returning
    copy (referrer only for new visitors), banner retries after a skip, idle retries
    after a skip, exit modal desktop-only after 20s with 20s auto-dismiss, footer
    toast+confetti behind `footer_shown`. All close paths call `closePrompt()`.
    `Talk` becomes a button; exit primary button opens the form with `needType:"fix"`;
    `Email instead` closes then follows the mailto.
  - `ContactLauncher` reads `formOpen`, `openDialog` goes through
    `requestOpenForm`, `closeDialog` calls `notifyFormClosed` and starts the 20s
    ring, success calls `notifySubmitted`, mount reports an existing
    `ifedike_inquiry_submitted`, preset applied via the pending need type.
- Accept:
  - `npx tsc --noEmit` clean, `npm run validate:content` passes, `npx next build`
    succeeds.
  - With the flag on locally: bubble appears at 8s and not at 3s; closing it blocks
    the banner/panel/exit for the cooldown; form opened from launcher, `Talk` and the
    exit modal suppresses every prompt and closes any active one; `footer_shown` is
    written once; no prompt is marked seen when skipped.
- Verify: the three commands; one scripted browser pass of scenarios 1, 3, 6, 7, 8,
  10, 11.

### Checkpoint A (after Task 1)
- Builds clean, the gate is the only path to a prompt, no key written on a skip.

### Phase 2 — Finish the two spec behaviours

**Task 2 — Pause on hover and focus** (S, 1 file)
- Files: `src/components/EngagementLayer.tsx`
- Work: `usePausableDismiss`; wire bubble (14s) and exit modal (20s); Escape still
  closes and starts the cooldown.
- Accept: pointer on the bubble 30s keeps it; leaving resumes with the remaining
  time, not a fresh 14s; keyboard focus inside does the same; same for the exit
  modal.
- Verify: scenario 12 by hand; `npx tsc --noEmit`; `npx next build`.

**Task 3 — Reduced-motion confetti** (XS, 1 file)
- Files: `src/components/EngagementLayer.tsx`
- Work: skip piece generation under `prefers-reduced-motion: reduce`; toast still
  shows.
- Accept: emulated reduce → toast appears, zero `.eng-confetti-piece` nodes; no
  emulation → confetti still falls once.
- Verify: scenario 10 by hand; `npx tsc --noEmit`; `npx next build`.

### Checkpoint B (after Tasks 2–3)
- Both behaviours proven in the visible browser; timings unchanged.

### Phase 3 — Proof and handover

**Task 4 — Full 13-scenario run and report** (S, 1 file)
- Files: `developer-workspace/reports/TASK-006-completion-report.md`
- Work: run every scenario in `testing.md` with `PROMPT_COOLDOWN_MS = 5_000` and
  `ENGAGEMENT_ENABLED = true`; restore both; record pass/fail, what was done and
  seen, plus the final values of both constants. Touch check by
  `matchMedia("(hover: hover) and (pointer: fine)").matches === false`. Note the
  exit-modal Escape check needs `exit_intent_shown` cleared between attempts.
- Accept: all 13 reported honestly (pass or fail with evidence); diff shows
  `ENGAGEMENT_ENABLED = false` and `PROMPT_COOLDOWN_MS = 120_000`.
- Verify: `git diff` shows restored constants; `npx tsc --noEmit`;
  `npx next build`.

## Risks and mitigations

| Risk | Impact | Mitigation |
|---|---|---|
| Two triggers firing in one tick both see an empty gate | High (stacking) | `stateRef` written synchronously inside `tryShow` before `setState` |
| Hidden prompts left mounted (a11y regression) | Med | Render only `activePrompt`; one-frame reveal only |
| Entry slide lost by mount-on-show | Low | `useReveal` one-frame mount, off-screen and `pointer-events-none` |
| Launcher ring coupled to the 120s value | High (looks broken) | Two separate constants and code paths; ring set only in `closeDialog` |
| Preset wipes a deliberate choice | Med | Memory cleared by `change` event, per the owner's rule |
| Exit intent on touch devices | Med | `matchMedia("(hover: hover) and (pointer: fine)")`, not UA |
| Testing 120s takes 20 min | Low | 5s for tests, real 8s/20s, restore proved in the diff |
| Dev server state during flag flips | Low | Reload between scenarios; clear storage per `testing.md` |

## Open questions

None. All ten decisions were settled with the owner in the two grilling rounds.
