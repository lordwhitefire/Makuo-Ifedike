# TASK-006 — Task list

Plan: `developer-workspace/plans/TASK-006-plan.md`
Spec: `openspec/tasks/TASK-006-engagement-queue/task.md` (owner's, read-only)
Tests: `openspec/tasks/TASK-006-engagement-queue/testing.md` (owner's, read-only)
Commits: local only. No push.

## Phase 0

- [ ] **Task 0 — Plan and task list**
  - [ ] Plan file written with every task's criteria and verification
  - [ ] This list exists
  - [ ] Committed on its own

## Phase 1

- [ ] **Task 1 — Provider, page wiring, prompt rewrite, launcher integration** (M, 4 files)
  - [ ] `EngagementProvider.tsx`: `activePrompt`, `cooldownUntil`, `formOpen`,
        `submitted`, `tryShow`, `closePrompt`, `requestOpenForm`,
        `notifyFormClosed`, `notifySubmitted`, `PROMPT_COOLDOWN_MS = 120_000`
  - [ ] `tryShow` checks all five conditions; on false writes nothing
  - [ ] `page.tsx` wraps `EngagementLayer` + `ContactLauncher`, `BackToTop` outside
  - [ ] Bubble at 8s, new returning copy, referrer only for new visitors
  - [ ] Banner: skip leaves `fired` false and no key; later crossing retries
  - [ ] Idle panel: skip leaves `idleFired` false; listeners keep resetting
  - [ ] Exit modal: desktop-only, 20s dwell, 20s auto-dismiss, skipped = not marked
  - [ ] Footer toast+confetti behind `footer_shown`
  - [ ] Every close path calls `closePrompt()`
  - [ ] `Talk` and exit primary button open the form (`needType:"fix"`); `Email instead` closes then mails
  - [ ] Launcher: `formOpen` from provider, `openDialog` via `requestOpenForm`, close starts the 20s ring
  - [ ] `submitted` reported on mount before the 8s trigger
  - [ ] Preset applied once, memory cleared on `change`, cleared on a later open only if untouched
  - [ ] `npx tsc --noEmit`, `npm run validate:content`, `npx next build` all clean
  - [ ] Committed

### Checkpoint A
- [ ] Gate is the only path to a prompt
- [ ] No key written on a skip

## Phase 2

- [ ] **Task 2 — Pause on hover and focus** (S, 1 file)
  - [ ] `usePausableDismiss` freezes remaining time
  - [ ] Bubble 14s and exit modal 20s both use it
  - [ ] Hover 30s keeps the bubble; leave resumes the remainder
  - [ ] Focus inside behaves like hover
  - [ ] `npx tsc --noEmit`, `npx next build` clean
  - [ ] Committed

- [ ] **Task 3 — Reduced-motion confetti** (XS, 1 file)
  - [ ] `prefers-reduced-motion: reduce` → no pieces generated, toast still shows
  - [ ] Normal motion unchanged
  - [ ] `npx tsc --noEmit`, `npx next build` clean
  - [ ] Committed

### Checkpoint B
- [ ] Pause and reduced motion proven in the browser
- [ ] 8s and 20s timings untouched

## Phase 3

- [ ] **Task 4 — 13-scenario run and report** (S, 1 file)
  - [ ] `PROMPT_COOLDOWN_MS` temporarily `5_000`, `ENGAGEMENT_ENABLED` `true`
  - [ ] Scenarios 1–13 run and recorded pass/fail with what was seen
  - [ ] Touch check via `matchMedia("(hover: hover) and (pointer: fine)").matches === false`
  - [ ] Exit-modal Escape check clears `exit_intent_shown` between attempts
  - [ ] Both constants restored; `git diff` proves `false` and `120_000`
  - [ ] Report says what was verified and what was not
  - [ ] Committed
