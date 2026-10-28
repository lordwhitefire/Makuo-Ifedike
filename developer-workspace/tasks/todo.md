# Task List — TASK-002 System Foundation (Group 2)

## Checkpoint: Foundation
- [ ] Task 1: Commit dirty git tree and verify .gitignore
- [ ] Task 2: Scaffold pure Next.js 16 App Router — replace redirect with React component

## Checkpoint: Typecheck + static page retired
- [ ] Task 3: Retire public/andle-portfolio.html and remove redirect
- [ ] Task 4: Set ignoreBuildErrors: false + reactStrictMode: true

## Checkpoint: Dependencies cleaned
- [ ] Task 5: Audit and remove unused dependencies

## Checkpoint: Complete
- [ ] Task 6: Set up Vercel project and domain makuo-ifedike.vercel.app
- [ ] Task 7: Add runtime checklist as CI

---

## Task Details

### Task 1: Commit dirty git tree and verify .gitignore
**Description:** Commit all current Group 1 changes so Group 2 starts from a clean tree. Verify .gitignore excludes node_modules/, .next/, dev.log, server.log, build artifacts.
**Dependencies:** None
**Acceptance criteria:** git status clean; .gitignore excludes node_modules/, .next/, dev.log, server.log, *.log, build artifacts
**Verification:** git status clean; git log --oneline -1 shows baseline commit

### Task 2: Scaffold pure Next.js 16 App Router — replace redirect with React component
**Description:** Replace src/app/page.tsx so / no longer redirects to /andle-portfolio.html. Render cleaned-up portfolio content as React components.
**Dependencies:** Task 1
**Acceptance criteria:** page.tsx does not redirect; renders React components; next dev starts on :3009; / returns 200 with Makuo Ifedike content
**Verification:** curl http://localhost:3009/ returns 200; grep confirms no redirect

### Task 3: Retire public/andle-portfolio.html and remove redirect
**Description:** Delete public/andle-portfolio.html (move to reference/archive first). Remove redirect from page.tsx or next.config.ts.
**Dependencies:** Task 2
**Acceptance criteria:** public/andle-portfolio.html does not exist; no redirect from /; GET / renders Next.js app
**Verification:** ls public/andle-portfolio.html fails; curl http://localhost:3009/ returns React-rendered page

### Task 4: Set ignoreBuildErrors: false + reactStrictMode: true
**Description:** Update next.config.ts: typescript.ignoreBuildErrors to false, reactStrictMode to true.
**Dependencies:** Task 3
**Acceptance criteria:** next.config.ts shows both values; tsc --noEmit passes; next build succeeds
**Verification:** next build exit code 0; tsc --noEmit exit code 0

### Task 5: Audit and remove unused dependencies
**Description:** Audit package.json against codebase usage. Remove unused packages (Prisma, next-auth, tanstack, unused radix, recharts, mdxeditor, etc.).
**Dependencies:** Task 4
**Acceptance criteria:** Each removed package verified unused; package.json updated; next build succeeds; tsc passes
**Verification:** next build exit code 0; tsc --noEmit exit code 0

### Task 6: Set up Vercel project and domain makuo-ifedike.vercel.app
**Description:** Create Vercel project, link to git repo, configure domain with HTTPS and preview deploys.
**Dependencies:** Task 1, Task 3
**Acceptance criteria:** Vercel project linked to repo; domain configured; site reachable over HTTPS
**Verification:** curl -I https://makuo-ifedike.vercel.app/ returns 200

### Task 7: Add runtime checklist as CI
**Description:** Create agent-run runtime checklist (install → typecheck → build → link check → runtime divergence). No GitHub Actions workflow.
**Dependencies:** Task 6
**Acceptance criteria:** Checklist file exists; covers all steps; runtime divergence run (build == reference); handoff report written
**Verification:** Checklist items have PASS/FAIL/NOT RUN with evidence

---

**Plan:** developer-workspace/plans/TASK-002-system-foundation-plan.md