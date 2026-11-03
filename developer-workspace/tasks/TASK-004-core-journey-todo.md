# TASK-004 Core Journey — Task List

**Plan:** `developer-workspace/plans/TASK-004-core-journey-plan.md`

## Phase 1 — Form journey

- [x] Task 0: Plan, brief, notes, baseline commit
- [x] Task 1: Hide engagement, remove card tooltips, add contact launcher + privacy + honest 503
- [x] Task 2: Inquiry model, validation, adapters, env example, wire route

### Checkpoint A
- [x] Form opens, validates, submits (503 with fallback when unconfigured)
- [x] `/privacy` loads
- [x] No engagement prompt renders
- [x] Typecheck and build pass

## Phase 2 — Visible data + discovery

- [x] Task 3: Real work filters, one card per view
- [x] Task 4: SEO metadata, 404, robots, sitemap
- [x] Task 5: JSON-LD graph and llms.txt

### Checkpoint B
- [x] Filters verified in browser
- [x] 404 / robots / sitemap verified
- [x] JSON-LD parses with 7 nodes
- [x] llms.txt verified
- [x] Typecheck and build pass

## Phase 3 — Gate

- [x] Task 6: Content validator checks
- [ ] Task 7: Full verification + honest report

### Final
- [ ] `npx tsc --noEmit`
- [ ] `npm run validate:content`
- [ ] `npx next build`
- [ ] Dev-server route checks
- [ ] Browser pass
- [ ] Report written; live sends marked NOT VERIFIED
