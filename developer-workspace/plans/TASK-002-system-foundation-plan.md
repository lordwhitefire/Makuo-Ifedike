# Implementation Plan: TASK-002 System Foundation (Group 2)

## Overview

Replace the static Andle HTML page (`public/andle-portfolio.html` served behind a Next.js redirect) with a pure Next.js 16 App Router app. Move the current static HTML to a reference location so it becomes the exact source of truth for runtime divergence verification. Enforce typecheck, remove unused dependencies, set up Vercel project and domain, and replace automatic CI with an agent-run runtime checklist.

## Authority

- `openspec/tasks/TASK-002/task.md` — the 7 task entries and benchmarks
- `openspec/changes/makuo-ifedike-portfolio/proposal.md` — architecture rationale
- `developer-workspace/procedures/browser-check.md` — standing browser procedure (attach-only, no screenshots, no new tab)
- TrueSpec `LAUNCH-001-runtime-checklist.md` — CI model (agent-run checklist, not GitHub Actions)
- Owner confirmation: runtime divergence skill must confirm Next.js build == reference at runtime

## Architecture Decisions

| Decision | Rationale |
|----------|-----------|
| Move `public/andle-portfolio.html` to reference/archive before building | It is the source of truth; the Next.js app must replicate it exactly at runtime |
| Page.tsx redirects to static page currently; must become a React component rendering same content | Group 2 boundary: visible product must be Next.js app, not static HTML |
| `ignoreBuildErrors: false` + `reactStrictMode: true` | Task requirement; typecheck enforced |
| CI = agent-run runtime checklist (not GitHub Actions) | Owner ruling: "our CI pipeline is a series of checklists... drive and whatever that's wrong will now be driven by you to check everything in the checklist" |
| Vercel domain `makuo-ifedike.vercel.app` | Owner-confirmed spelling (2026-10-28) |
| Runtime divergence skill confirms Next.js build == reference at runtime | Owner requirement: "you must always make sure that their code at runtime is the same thing" |

## Dependency Graph

```
Git clean + .gitignore verified
    │
    ▼
Next.js app scaffolded (page.tsx no longer redirects)
    │
    ├─► Retire public/andle-portfolio.html + remove redirect
    ├─► ignoreBuildErrors: false + reactStrictMode: true
    │
    ▼
Unused dependencies removed (build must still succeed)
    │
    ▼
Vercel project + domain configured (needs clean git to link repo)
    │
    ▼
Runtime checklist as CI (depends on all above being complete)
```

## Task List

### Phase 1: Foundation

### [ ] Task 1: Commit dirty git tree and verify .gitignore

**Description:** Commit all current Group 1 changes (4 modified files, 3 untracked entries) so Group 2 starts from a clean tree. Verify `.gitignore` excludes `node_modules/`, `.next/`, `dev.log`, `server.log`, and build artifacts.

**Acceptance criteria:**
- [ ] `git status` shows clean working tree on `master`
- [ ] `.gitignore` excludes `node_modules/`, `.next/`, `dev.log`, `server.log`, `*.log`, build artifacts
- [ ] Initial Group 2 baseline commit exists

**Verification:** `git status` clean; `git log --oneline -1` shows baseline commit

**Dependencies:** None

**Files likely touched:** `.gitignore` (may add entries), all current modified/untracked files (commit)

**Estimated scope:** S

### [ ] Task 2: Scaffold pure Next.js 16 App Router — replace redirect with React component

**Description:** Replace `src/app/page.tsx` so `/` no longer redirects to `/andle-portfolio.html`. Instead, render the cleaned-up portfolio content (identity, My Stack grid, counters, footer, etc.) as React components. Keep `layout.tsx` fonts and metadata. Use Next.js 16 App Router, TypeScript, dark Andle look preserved.

**Acceptance criteria:**
- [ ] `src/app/page.tsx` does not redirect to `/andle-portfolio.html`
- [ ] `src/app/page.tsx` renders React components for home page
- [ ] `src/app/layout.tsx` unchanged (fonts, metadata intact)
- [ ] `next dev` starts on port 3009 and `/` renders the page
- [ ] Page shows "Makuo Ifedike" identity, My Stack grid, counters, footer

**Verification:** `curl http://localhost:3009/` returns 200 with React-rendered content; `grep` confirms no redirect

**Dependencies:** Task 1

**Files likely touched:** `src/app/page.tsx`, `src/app/layout.tsx` (may create new component files)

**Estimated scope:** M

## Checkpoint: Foundation

- [ ] Git tree clean, committed
- [ ] Next.js app renders home page on `:3009`
- [ ] Review with human before proceeding to content changes

---

### Phase 2: Retire static page + enforce typecheck

### [ ] Task 3: Retire `public/andle-portfolio.html` and remove redirect

**Description:** Delete `public/andle-portfolio.html` (move to reference/archive first). Remove any redirect/rewrite in `page.tsx` or `next.config.ts` that sends `/` to `/andle-portfolio.html`. The visible product is the Next.js app.

**Acceptance criteria:**
- [ ] `public/andle-portfolio.html` does not exist (moved to reference location)
- [ ] No redirect from `/` to `/andle-portfolio.html` in page.tsx or next.config.ts
- [ ] `GET /` renders Next.js app, not static HTML
- [ ] Reference copy preserved at archive location

**Verification:** `ls public/andle-portfolio.html` fails; `curl http://localhost:3009/` returns React-rendered page; reference file exists at archive location

**Dependencies:** Task 2

**Files likely touched:** `public/andle-portfolio.html` (deleted/moved), `src/app/page.tsx`

**Estimated scope:** S

### [ ] Task 4: Set `ignoreBuildErrors: false` + `reactStrictMode: true`

**Description:** Update `next.config.ts`: `typescript.ignoreBuildErrors` to `false`, `reactStrictMode` to `true`. Verify typecheck passes.

**Acceptance criteria:**
- [ ] `next.config.ts` shows `ignoreBuildErrors: false`
- [ ] `next.config.ts` shows `reactStrictMode: true`
- [ ] `tsc --noEmit` passes (or `next build` typecheck step passes)
- [ ] No TypeScript errors introduced

**Verification:** `next build` completes without typecheck errors; `tsc --noEmit` exit code 0

**Dependencies:** Task 3

**Files likely touched:** `next.config.ts`

**Estimated scope:** XS

## Checkpoint: Typecheck + static page retired

- [ ] `public/andle-portfolio.html` deleted, reference preserved
- [ ] Typecheck enforced (`ignoreBuildErrors: false`)
- [ ] Build succeeds
- [ ] Review with human before proceeding to dependency cleanup

---

### Phase 3: Dependency cleanup

### [ ] Task 5: Audit and remove unused dependencies

**Description:** Audit `package.json` dependencies against actual usage in codebase. Remove packages with no usage (candidates: Prisma, next-auth, TanStack Query/Table, unused Radix components, Recharts, MDX editor, etc.). Verify each removal doesn't break the build.

**Acceptance criteria:**
- [ ] Each removed package verified as unused in codebase
- [ ] `package.json` updated (dependencies + devDependencies)
- [ ] `next build` succeeds after removals
- [ ] `tsc --noEmit` passes
- [ ] `package-lock.json` updated

**Verification:** `next build` exit code 0; `tsc --noEmit` exit code 0; `grep` confirms no imports of removed packages

**Dependencies:** Task 4

**Files likely touched:** `package.json`, `package-lock.json`

**Estimated scope:** M

## Checkpoint: Dependencies cleaned

- [ ] Unused dependencies removed
- [ ] Build and typecheck pass
- [ ] Review with human before proceeding to Vercel + CI

---

### Phase 4: Deploy + CI

### [ ] Task 6: Set up Vercel project and domain `makuo-ifedike.vercel.app`

**Description:** Create Vercel project, link to git repo, configure domain `makuo-ifedike.vercel.app` (owner-confirmed spelling). Enable HTTPS and preview deploys.

**Acceptance criteria:**
- [ ] Vercel project created and linked to git repo
- [ ] Domain `makuo-ifedike.vercel.app` configured
- [ ] Site reachable at `https://makuo-ifedike.vercel.app` over HTTPS
- [ ] Preview deploys enabled

**Verification:** `curl -I https://makuo-ifedike.vercel.app/` returns 200 over HTTPS

**Dependencies:** Task 1 (git clean), Task 3 (static page retired)

**Files likely touched:** `vercel.json` (may create), Vercel project settings (external)

**Estimated scope:** M

### [ ] Task 7: Add runtime checklist as CI

**Description:** Replace automatic CI with agent-run runtime checklist (TrueSpec model). Create checklist covering: install, typecheck, build, link check, runtime divergence vs reference. Checklist lives in `developer-workspace/procedures/` and results recorded in `developer-workspace/reports/`. Owner decides whether to push.

**Acceptance criteria:**
- [ ] Runtime checklist file exists in `developer-workspace/procedures/`
- [ ] Checklist covers install → typecheck → build → link check → runtime divergence
- [ ] Runtime divergence check run: Next.js build == reference at runtime
- [ ] Handoff report written (`developer-workspace/reports/`)
- [ ] No GitHub Actions workflow created (owner ruling: checklist replaces CI gate)

**Verification:** Checklist items each have PASS/FAIL/NOT RUN with evidence; divergence report shows build matches reference at runtime

**Dependencies:** Task 6

**Files likely touched:** `developer-workspace/procedures/`, `developer-workspace/reports/`

**Estimated scope:** M

## Checkpoint: Complete

- [ ] All 7 tasks complete
- [ ] Runtime divergence confirms Next.js build == reference at runtime
- [ ] Working tree clean, committed
- [ ] Handoff report written; owner decides whether to push

## Risks and Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| React port of HTML introduces visual/structural drift | High | Runtime divergence skill confirms build == reference at runtime; fix until match |
| Removing a dependency that is actually used | High | Grep for imports before each removal; run `next build` after each |
| Vercel domain spelling | Med | Use confirmed `makuo-ifedike.vercel.app` (2026-10-28) |
| `ignoreBuildErrors: false` exposes pre-existing errors | Med | Run typecheck before setting to false; fix errors first if any |

## Open Questions

None — all decisions settled by grill (all confirmed "yes").

---

**Plan location:** `developer-workspace/plans/TASK-002-system-foundation-plan.md` (project convention: plans in `developer-workspace/plans/`)

## Task Tracker

The task list tracker is at `developer-workspace/tasks/todo.md` (project convention: `developer-workspace/` since no `tasks/` directory exists).