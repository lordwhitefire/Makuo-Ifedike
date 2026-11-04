# TASK-007 — Task list

Spec: `openspec/tasks/TASK-007-polish-and-ops/task.md`. Plan: `developer-workspace/plans/TASK-007-plan.md`.
Seven commits, no push, no deploy. Every commit green on `tsc` + `validate:content` + `build`.

## 0. Plan
- [x] Grilling rounds complete; decisions recorded
- [x] Plan written
- [x] Task list written
- [x] Commit `TASK-007: plan and task breakdown`

## 1. `domain` — Truespec live URL
- [x] `curl -sI https://truespec.duckdns.org/` → 200 + Truespec page
- [x] `content-workspace/pieces/llms-txt.md` updated
- [x] `content-workspace/pieces/person-jsonld.md` updated
- [x] `src/content/projects.ts` — `liveUrl` + `caseStudy.liveLink`
- [x] `public/llms.txt` updated
- [x] `structured-data.ts` confirmed derived, not edited
- [x] `grep -rn "truespec-k4y6" src/ public/ content-workspace/pieces/` empty
- [x] Canonical / identity / sitemap / robots unchanged; drafts + history untouched
- [x] Commit `TASK-007: move Truespec to its live domain`

## 2. `a11y` — WCAG AA
### structure, focus, motion
- [x] `<header>`/`SiteNav` moved outside `<main>`; `id="main"` + `tabIndex={-1}`
- [x] Skip link first focusable, hidden until focused, visible on focus
- [x] One global `:focus-visible` rule, visible on dark and orange; no outline removed
- [x] Prompt close returns focus to the launcher (all paths)
- [x] Reduced motion: static ring, instant prompt transitions
### contrast, hit areas
- [x] axe desktop + mobile baseline recorded
- [x] Flagged contrast fixed with existing tokens; no new colours
- [x] Prompt ×, launcher, BackToTop, form × ≥44×44 with glyph unchanged
- [x] axe re-run: zero serious/critical
- [x] Keyboard walk + skip link + focus visibility verified
- [x] Commit `TASK-007: accessibility to WCAG AA`

## Checkpoint: after 1–2
- [ ] `tsc`, `validate:content`, `build` green
- [ ] axe counts and keyboard results recorded

## 3. `perf` — portrait + budget
- [x] `content-workspace/assets/` created; original + `.bak` moved out of `public/`
- [x] `public/images/portrait.webp` <300 KB, hero points at it
- [x] `public/images/portrait.png` re-encoded <300 KB at the same path (OG/JSON-LD untouched)
- [x] Hero crop/position unchanged at 390 and 1440
- [x] Lighthouse mobile ×3 median + desktop: LCP / CLS / score recorded
- [x] Commit `TASK-007: bring the portrait and the budget inside limits`

## 4. `monitoring` — error logging
- [ ] `src/app/error.tsx` + `global-error.tsx` (fallback, reload link, console.error + report POST)
- [ ] `src/app/api/client-errors/route.ts` (204 / 413 / 400, one JSON line, four fields)
- [ ] `src/components/ErrorReporter.tsx`, mounted in `layout.tsx`, max 5 per load
- [ ] Inquiry route failure path logs context without visitor data
- [ ] Deliberate throw → fallback + one JSON line in the server log
- [ ] Curls: valid 204, 9 KB 413, no `message` 400
- [ ] Commit `TASK-007: error monitoring on Vercel logs`

## Checkpoint: after 3–4
- [ ] Build green; Lighthouse numbers recorded; reporter verified

## 5. `smoke` — Playwright
- [ ] `@playwright/test` added; `test:e2e` script
- [ ] `playwright.config.ts`, port 3100 production `webServer`
- [ ] `data-featured` on the Truespec card
- [ ] 8 checks in `tests/smoke.spec.ts`
- [ ] Break Athletica URL → check 7 fails → revert
- [ ] CI step + timeout checked
- [ ] Commit `TASK-007: browser smoke test in CI`

## 6. `docs` — README + workflow
- [ ] `README.md` per spec, links `SETUP.md` (unmodified)
- [ ] `docs/content-workflow.md` (16 checks, how to add one)
- [ ] Every README command run as written
- [ ] Commit `TASK-007: README and content workflow`

## Final
- [ ] Full `testing.md` run recorded in the report (pass/fail, raw numbers, commit tested)
- [ ] Working tree clean apart from owner files
