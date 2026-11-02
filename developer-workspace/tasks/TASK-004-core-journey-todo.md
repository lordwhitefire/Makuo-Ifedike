# TASK-004 Core Journey — Task List

**Plan:** `developer-workspace/plans/TASK-004-core-journey-plan.md`

## Phase 1 — Form journey

- [ ] Task 0: Plan, brief, notes, baseline commit
- [ ] Task 1: Hide engagement, remove card tooltips, add contact launcher + privacy + honest 503
- [ ] Task 2: Inquiry model, validation, adapters, env example, wire route

### Checkpoint A
- [ ] Form opens, validates, submits (503 with fallback when unconfigured)
- [ ] `/privacy` loads
- [ ] No engagement prompt renders
- [ ] Typecheck and build pass

## Phase 2 — Visible data + discovery

- [ ] Task 3: Real work filters, one card per view
- [ ] Task 4: SEO metadata, 404, robots, sitemap
- [ ] Task 5: JSON-LD graph and llms.txt

### Checkpoint B
- [ ] Filters verified in browser
- [ ] 404 / robots / sitemap verified
- [ ] JSON-LD parses with 7 nodes
- [ ] llms.txt verified
- [ ] Typecheck and build pass

## Phase 3 — Gate

- [ ] Task 6: Content validator checks
- [ ] Task 7: Full verification + honest report

### Final
- [ ] `npx tsc --noEmit`
- [ ] `npm run validate:content`
- [ ] `npx next build`
- [ ] Dev-server route checks
- [ ] Browser pass
- [ ] Report written; live sends marked NOT VERIFIED
