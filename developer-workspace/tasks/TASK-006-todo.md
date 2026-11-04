# TASK-006 — Task list

Plan: `developer-workspace/plans/TASK-006-plan.md`
Spec: `openspec/tasks/TASK-006-engagement-queue/task.md` (owner's, read-only)
Tests: `openspec/tasks/TASK-006-engagement-queue/testing.md` (owner's, read-only)
Commits: local only. No push.

## Phase 0

- [x] **Task 0 — Plan and task list**
  - [x] Plan file written with every task's criteria and verification
  - [x] This list exists
  - [x] Committed on its own

## Phase 1

- [x] **Task 1 — Provider, page wiring, prompt rewrite, launcher integration** (M, 4 files)
  - [x] `EngagementProvider.tsx`: `activePrompt`, `cooldownUntil`, `formOpen`,
        `submitted`, `tryShow`, `closePrompt`, `requestOpenForm`,
        `notifyFormClosed`, `notifySubmitted`, `PROMPT_COOLDOWN_MS = 120_000`
  - [x] `tryShow` checks all five conditions; on false writes nothing
  - [x] `page.tsx` wraps `EngagementLayer` + `ContactLauncher`, `BackToTop` outside
  - [x] Bubble at 8s, new returning copy, referrer only for new visitors
  - [x] Banner: skip leaves `fired` false and no key; later crossing retries
  - [x] Idle panel: skip leaves `idleFired` false; listeners keep resetting
  - [x] Exit modal: desktop-only, 20s dwell, 20s auto-dismiss, skipped = not marked
  - [x] Footer toast+confetti behind `footer_shown`
  - [x] Every close path calls `closePrompt()`
  - [x] `Talk` and exit primary button open the form (`needType:"fix"`); `Email instead` closes then mails
  - [x] Launcher: `formOpen` from provider, `openDialog` via `requestOpenForm`, close starts the 20s ring
  - [x] `submitted` reported on mount before the 8s trigger
  - [x] Preset applied once, memory cleared on `change`, cleared on a later open only if untouched
  - [x] `npx tsc --noEmit`, `npm run validate:content`, `npx next build` all clean
  - [x] Committed

### Checkpoint A
- [x] Gate is the only path to a prompt
- [x] No key written on a skip

## Phase 2

- [x] **Task 2 — Pause on hover and focus** (S, 1 file)
  - [x] `usePausableDismiss` freezes remaining time
  - [x] Bubble 14s and exit modal 20s both use it
  - [x] Hover 30s keeps the bubble; leave resumes the remainder
  - [x] Focus inside behaves like hover
  - [x] `npx tsc --noEmit`, `npx next build` clean
  - [x] Committed

- [x] **Task 3 — Reduced-motion confetti** (XS, 1 file)
  - [x] `prefers-reduced-motion: reduce` → no pieces generated, toast still shows
  - [x] Normal motion unchanged
  - [x] `npx tsc --noEmit`, `npx next build` clean
  - [x] Committed

### Checkpoint B
- [x] Pause and reduced motion proven in the browser
- [x] 8s and 20s timings untouched

## Phase 3

- [x] **Task 4 — 13-scenario run and report** (S, 1 file)
  - [x] `PROMPT_COOLDOWN_MS` temporarily `5_000`, `ENGAGEMENT_ENABLED` `true`
  - [x] Scenarios 1–13 run and recorded pass/fail with what was seen
  - [x] Touch check via `matchMedia("(hover: hover) and (pointer: fine)").matches === false`
  - [x] Exit-modal Escape check clears `exit_intent_shown` between attempts
  - [x] Both constants restored; `git diff` proves `false` and `120_000`
  - [x] Report says what was verified and what was not
  - [x] Committed
