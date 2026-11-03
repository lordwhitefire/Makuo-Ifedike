# TASK-005 Analytics Events — Task List

**Plan:** `developer-workspace/plans/TASK-005-analytics-plan.md`

## Phase 1 — Foundation
- [ ] Task 1: Install `@vercel/analytics` and create `trackEvent` helper
- [ ] Task 2: Fire `page_view` from root layout via client Analytics component

### Checkpoint: Foundation
- [ ] `npx tsc --noEmit` passes
- [ ] `npx next build` passes
- [ ] `page_view` fires on home page load (browser check)

## Phase 2 — Project card events
- [ ] Task 3: Fire `project_view` via IntersectionObserver on project cards
- [ ] Task 4: Fire `outbound_project_click` on project card live links

### Checkpoint: Project card events
- [ ] `npx tsc --noEmit` passes
- [ ] `npx next build` passes
- [ ] `project_view` fires when card enters viewport, `outbound_project_click` fires on link click (browser check)

## Phase 3 — ContactLauncher events + verification
- [ ] Task 5: Fire `cta_click`, `inquiry_start`, `inquiry_submit` in ContactLauncher
- [ ] Task 6: Re-run route benchmarks + full verification (build, typecheck, validate:content, browser pass)

### Checkpoint: Complete
- [ ] All six events fire on corresponding actions (browser check)
- [ ] Route benchmarks pass: invalid→400, honeypot→200, rate limit→429, valid→503
- [ ] `validate-content: ALL CHECKS PASSED`
- [ ] Ready for commit (no push)
