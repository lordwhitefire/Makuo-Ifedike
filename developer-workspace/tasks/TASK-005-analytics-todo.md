# TASK-005 Analytics Events — Task List

**Plan:** `developer-workspace/plans/TASK-005-analytics-plan.md`

## Phase 1 — Foundation
- [x] Task 1: Install `@vercel/analytics` and create `trackEvent` helper
- [x] Task 2: Fire `page_view` from root layout via client Analytics component

### Checkpoint: Foundation
- [x] `npx tsc --noEmit` passes
- [x] `npx next build` passes
- [x] `page_view` fires on home page load (browser check)

## Phase 2 — Project card events
- [x] Task 3: Fire `project_view` via IntersectionObserver on project cards
- [x] Task 4: Fire `outbound_project_click` on project card live links

### Checkpoint: Project card events
- [x] `npx tsc --noEmit` passes
- [x] `npx next build` passes
- [x] `project_view` fires when card enters viewport, `outbound_project_click` fires on link click (browser check)

## Phase 3 — ContactLauncher events + verification
- [x] Task 5: Fire `cta_click`, `inquiry_start`, `inquiry_submit` in ContactLauncher
- [x] Task 6: Re-run route benchmarks + full verification (build, typecheck, validate:content, browser pass)

### Checkpoint: Complete
- [x] All six events fire on corresponding actions (browser check)
- [x] Route benchmarks pass: invalid→400, honeypot→200, rate limit→429, valid→503
- [x] `validate-content: ALL CHECKS PASSED`
- [x] Ready for commit (no push)
