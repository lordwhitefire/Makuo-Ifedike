# TASK-006 — Completion report

Spec: `openspec/tasks/TASK-006-engagement-queue/task.md` (owner's, not edited)
Tests: `openspec/tasks/TASK-006-engagement-queue/testing.md` (owner's, not edited)
Plan: `developer-workspace/plans/TASK-006-plan.md`

## What was built

One gate in `src/components/EngagementProvider.tsx`. Every prompt calls
`tryShow(id)` when its trigger fires; the gate refuses unless all five conditions
hold (no prompt active, no form open, nothing submitted, cooldown passed, that
prompt's session key unset), writes the key only on `true`, and writes nothing on a
skip.

- `EngagementProvider` — `activePrompt` (one id, no queue), `cooldownUntil`,
  `formOpen`, `submitted`, `tryShow`, `closePrompt`, `requestOpenForm`,
  `notifyFormClosed`, `notifySubmitted`, `consumePendingNeedType`,
  `useEngagement()`, `PROMPT_COOLDOWN_MS`. Refs are the gate's truth so two
  triggers in one tick cannot both win; state mirrors them for render. Storage is
  read and written only inside `tryShow`.
- `EngagementLayer` — bubble at 8s with the new returning line, banner retrying
  after a skip, idle panel retrying after a skip, desktop-only exit modal after a
  20s dwell with a 20s auto-dismiss, footer toast + confetti behind `footer_shown`.
  Every close path calls `closePrompt()`. Hidden prompts are unmounted. `Talk` is a
  button; the exit primary button opens the form with `needType: "fix"`;
  `Email instead` closes then follows the mailto.
- Hover/focus pause — one `usePausableDismiss` hook freezes the remaining time for
  the bubble (14s) and the exit modal (20s); it never restarts a full timer.
- Reduced motion — the footer observer skips confetti when
  `prefers-reduced-motion: reduce`; the toast still shows. No CSS change.
- `ContactLauncher` — reads `formOpen` from the gate (a form opened from `Talk` or
  the exit modal renders the same dialog), opens through `requestOpenForm`, reports
  close/submit to the gate, applies the preset need type, starts its own 20s ring
  when the form closes.
- `page.tsx` — provider wraps `EngagementLayer` and `ContactLauncher`; `BackToTop`
  stays outside.

Commits (local only, nothing pushed):

| Commit | What |
|---|---|
| `07f1f45` | plan and task breakdown (+ the owner's TASK-006 spec folder, not edited) |
| `3e4b5bb` | one engagement gate for all five prompts |
| `19e2858` | freeze prompt auto-dismiss on hover and focus |
| `ac965bf` | keep the footer toast, drop the confetti under reduced motion |
| `1d68d4e` | keep the success panel open after a submit |
| report | this file and the ticked task list |

## Final values in the committed tree

- `ENGAGEMENT_ENABLED = false` (`src/components/EngagementLayer.tsx:51`)
- `PROMPT_COOLDOWN_MS = 120_000` (`src/components/EngagementProvider.tsx:26`)
- `COOLDOWN_MS = 20_000` (launcher ring, unchanged)

Both temporary flips were reverted before the last build; `git diff` is empty for
those files.

## How it was verified

- `npx tsc --noEmit`, `npm run validate:content`, `npx next build` — run after each
  commit, all clean.
- Real Chrome attached over CDP against the dev server. No screenshots: every check
  is a measured value (element present/absent, `sessionStorage`, computed styles,
  `matchMedia`, select values).
- The flag was temporarily `true` and `PROMPT_COOLDOWN_MS` temporarily `5_000` for
  the scenario run; the 8s bubble, 14s bubble dismiss, 20s exit dwell, 20s exit
  auto-dismiss and 45s idle timers were the real values.
- The test harness parks the pointer away from where a prompt will mount before
  triggering exit intent; otherwise Chrome fires a real `pointerenter` on the
  newly mounted modal and the pause rule correctly freezes it.

## Scenarios

| # | Result | Evidence |
|---|---|---|
| 1 | pass | at 3s: no `#engagement-bubble`, no keys; at 8.5s: bubble up, default copy, `bubble_shown=1`; at 23s: gone (14s dismiss) |
| 2 | pass | bubble up + scrolled to 62%: no banner, no `scroll50_shown`; after closing and 5s: banner up, `scroll50_shown=1` |
| 3 | pass | bubble closed, then scroll + mouse-out inside the cooldown: nothing; at 45s idle, after the cooldown: idle panel up |
| 4 | pass | visit count 5 → "Welcome back. Are you here to see the work, or talk about a project?" |
| 5 | pass | exit before 20s (and during a prompt): nothing; after 20s: modal once; auto-dismissed at exactly 20s; Escape closes; CTA → form with `needType="fix"`; `Email instead` → `mailto:mifedike@gmail.com` |
| 6 | pass | mouse-out during the bubble: skipped, `exit_intent_shown` unset; during the cooldown: skipped; after 20s and the cooldown: modal shows, key written |
| 7 | pass | form open from the launcher: no bubble at 8s, no banner at 62%, no idle panel at 45s, no footer toast at the bottom, `keys={}`; after closing + 5s the banner shows (skipped triggers stay eligible); footer variant: blocked while open, toast + 60 confetti after the cooldown |
| 8 | pass | closed at ~1.5s: nothing inside the cooldown, prompting resumed after it (bubble at 8s); submitted via a stubbed 200: success panel stays open, `ifedike_inquiry_submitted=1`, and afterwards no bubble, banner, footer, exit or second submit |
| 9 | pass | bubble dismissed, launcher clicked during the prompt cooldown: dialog opens, ring opacity 0, `aria-disabled=false`; on close: opacity 1, `contact-ring-drain`, `aria-disabled=true`; mid: still draining; at 20s: opacity 0, `aria-disabled=false` |
| 10 | pass | footer toast once with 60 pieces, `footer_shown=1`; second pass: no toast, no confetti; reduced motion: toast yes, confetti 0, key written |
| 11 | pass | one session: bubble → banner → idle panel, each after the cooldown; reload keeps all three keys and none returns |
| 12 | pass | bubble: 16s of focus then 20s of hover past its 14s timer — still up; after leaving, gone only after the remainder. Exit modal: hovered past 20s — still up; 1s after leaving — still up; gone after the remainder. Escape still closes |
| 13 | pass | see below |

Preset need type (owner's Q4 rule), measured:

- applied `fix` from the exit CTA, changed the select to `web-app`, reopened from
  the launcher → still `web-app` (the change cleared the memory);
- applied `fix`, left it untouched, reopened → `""` (cleared);
- other fields keep their values across opens.

Final diff (scenario 13): `src/app/globals.css` untouched; the launcher's form
border, field height and hidden scrollbar untouched; the bubble keeps
`bottom-[145px] min-[576px]:bottom-[190px]` and its thin border; no animation
added (the existing slide-in is preserved by mounting one frame off-screen); one
`activePrompt` id, no queue; the only copy line replaced is the returning bubble
line, and the exit modal keeps its text with the spec's two buttons.

Touch gating: with touch emulation, `matchMedia("(hover: hover) and (pointer: fine)").matches`
is `false`; after 22.7s (past the dwell, bubble gone) a mouse-out opened no exit
modal. On desktop the same query is `true` and the modal opens.

## Behaviour worth knowing

- On a hands-off fresh visit the bubble owns 8–22s, so an exit attempt at 21s is
  skipped by the gate (skip rule, no key written). The modal is reachable once the
  bubble is dismissed and the cooldown has passed — verified.
- `notifySubmitted` was corrected during verification to leave the form open so the
  success panel is visible; it only flips the gate to "never prompt again".
- The visit counter is now bumped once per mount (a StrictMode double effect would
  otherwise show the returning copy to a first-time visitor in dev).

## Not verified

- Real touch hardware — gating checked with emulated touch media, not a physical
  phone.
- The 120s prompt cooldown itself (shortened to 5s for the run); the constant is
  restored and `tsc`/`next build` pass on that value.
- Analytics on the wire — `cta_click` / `inquiry_start` / `inquiry_submit` code
  paths are exercised, but no network capture of the events was taken.
- No independent tester pass yet, and nothing was pushed or deployed.
