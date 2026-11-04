# TASK-007 — Polish and ops: implementation plan

Spec: `openspec/tasks/TASK-007-polish-and-ops/task.md` (owner-edited, commit `34d65bd`).
Tests: `openspec/tasks/TASK-007-polish-and-ops/testing.md`.

## What is being built

Six pieces, one commit each, each green on `npx tsc --noEmit`, `npm run validate:content`,
`npm run build`:

0. `domain` — Truespec live URL moves to `https://truespec.duckdns.org/`.
1. `a11y` — skip link, global focus ring, contrast, 44×44 hit areas, focus return, reduced motion.
2. `perf` — portrait to WebP under 300 KB + a small PNG at the same OG path; measure then fix.
3. `monitoring` — app error boundaries, `/api/client-errors`, client listener, inquiry-route logging.
4. `smoke` — `@playwright/test`, config, 8 smoke checks, CI step, `npm run test:e2e`.
5. `docs` — `README.md` and `docs/content-workflow.md`.

Plus the `plan` commit that carries this file and the task list. Seven commits, no push, no deploy.

## Decisions settled in the grilling

| # | Decision |
|---|---|
| 1 | Plan commit first, then six part commits; nothing pushed. |
| 2 | Stop the owner's dev server for the production runs on 3000; restart it afterwards. |
| 3 | If `truespec.duckdns.org` does not return 200, skip part 0, do parts 1–5, report it blocked. |
| 4 | The portrait is **moved**, never deleted: originals to `content-workspace/assets/`. |
| 5 | Error boundaries also POST to `/api/client-errors` so the error really lands in Vercel logs. |
| 6 | A budget miss is reported with raw numbers, never paid for with design or copy changes. |
| 7 | Fix all serious/critical axe violations and all contrast failures; name moderate/minor leftovers with a reason. |
| 8 | `content-workspace/` edits: `pieces/llms-txt.md` and `pieces/person-jsonld.md` only. `drafts/` untouched. |
| 9 | `data-featured` on the Truespec card as a plain attribute; no badge, no copy. |
| 10 | Empty-submit test asserts native validation + no request; no inline error added. |
| 11 | `SiteNav`/`<header>` moves outside `<main>` (DOM only; it is fixed, so nothing moves visually). |
| 12 | Every prompt close returns focus to the launcher. |
| 13 | Hero uses `portrait.webp`; `portrait.png` stays at the same path, re-encoded under 300 KB, for OG/JSON-LD. |
| 14 | If `@axe-core/cli` cannot run, run axe-core inside Playwright and say which tool produced the result. |
| 15 | README is the front door and links `SETUP.md`, which is not modified. |

## Approach

- One thin slice at a time; run `tsc` + `validate:content` after each slice, `build` before each commit.
- Two hats: structure changes (header move, focus/ARIA) and visual changes (contrast, hit areas) are separate
  slices even where they share a commit — the spec fixes the commit boundary at one per part.
- Nothing in the new code talks to a product from memory: Next 16 App Router docs in
  `node_modules/next/dist/docs/` are read before writing `error.tsx`, the route handler, and the Playwright
  `webServer`.
- Verification for each part is the relevant block of `testing.md`, executed for real, with raw numbers recorded
  in `developer-workspace/reports/TASK-007-completion-report.md`.

## Tasks

### Task 0 — Plan and task list (S: 2 files)

**Files:** `developer-workspace/plans/TASK-007-plan.md`, `developer-workspace/tasks/TASK-007-todo.md`

**Acceptance:** plan states every settled decision, the six commit boundaries, and each task's verification.
**Verification:** `git show --stat HEAD` after commit; working tree clean except owner's `design-workspace/`.
**Depends on:** none. **Commit:** `TASK-007: plan and task breakdown`.

---

### Task 1 — `domain`: Truespec live URL (M: 4 files + read-only confirmation)

**Files:** `content-workspace/pieces/llms-txt.md`, `content-workspace/pieces/person-jsonld.md`,
`src/content/projects.ts` (`truespec.liveUrl`, `truespec.caseStudy.liveLink`), `public/llms.txt`.

**Steps:**
1. `curl -sI https://truespec.duckdns.org/` → 200 and the Truespec page. If not, skip the whole task and record it blocked.
2. Edit the two `pieces/` files (source of truth), then `projects.ts`, then `public/llms.txt`.
3. Confirm `src/content/structured-data.ts` derives `url: project.liveUrl` — no edit.

**Acceptance:** `grep -rn "truespec-k4y6" src/ public/ content-workspace/pieces/` returns nothing; JSON-LD and
`llms.txt` show the new domain; canonical, `identity.url`, `identity.image`, `sitemap`, `robots` unchanged;
`drafts/` and historical records untouched.
**Verification:** grep above; `curl` the rendered JSON-LD from the built page; `npm run validate:content`.
**Depends on:** Task 0. **Commit:** `TASK-007: move Truespec to its live domain`.

---

### Task 2 — `a11y`: WCAG AA (M delivered in two slices, one commit)

**Slice 2a — structure, focus, motion (no visual change on load):**
- Move `<header>`/`SiteNav` out of `<main>` in `src/app/page.tsx`; `<main id="main" tabIndex={-1}>`.
- Skip link as the first focusable element, visually hidden until focused (small bar, top left).
- One global `:focus-visible` rule in `src/app/globals.css`, visible on dark and on orange; no outline removals.
- Prompts return focus to the launcher on every close path (`EngagementLayer.tsx`).
- Reduced motion: static launcher ring, instant prompt transitions (`globals.css`).

**Slice 2b — contrast and hit areas (visual, measured):**
- Axe audit first (CLI, or axe-core in Playwright with the substitution recorded), desktop + mobile.
- Raise opacity / reuse existing tokens only for the flagged text (`text-white/30`, `/35`, `/50`, footer and
  milestone secondary text); no new colours.
- 44×44 targets on prompt ×, launcher (already 56), BackToTop (35 on mobile) and form close ×, via padding or an
  invisible after-element; visible glyphs unchanged.

**Files:** `src/app/page.tsx`, `src/app/globals.css`, `src/components/EngagementLayer.tsx`,
`src/components/ContactLauncher.tsx`, `src/components/BackToTop.tsx` (+ `layout.tsx` only if the skip link lives there).

**Acceptance:** axe zero serious/critical at 390×844 and 1440×900; Tab-first stop is the skip link and Enter lands
in content past the nav; form and prompts close on Escape and return focus; every focus stop visibly ringed; every
icon-only target ≥44×44; reduced motion shows no ring drain, no slide, no auto-advance.
**Verification:** the Part 1 checklist of `testing.md`, with contrast ratios, measured rectangles and axe counts in the report.
**Depends on:** Task 1. **Commit:** `TASK-007: accessibility to WCAG AA`.

---

### Task 3 — `perf`: portrait and measured budget (S: 2 code files + assets)

**Steps:**
1. Create `content-workspace/assets/`; `git mv` `public/images/portrait.png` and `portrait.png.bak` there.
2. Produce `public/images/portrait.webp` (hero, <300 KB) and a re-encoded `public/images/portrait.png`
   (same 1122×1402 path for OG, <300 KB). Conversion tool: first available of `cwebp`, ImageMagick, `npx sharp-cli`.
3. Point the hero `bg-[url('/images/portrait.webp')]` in `src/app/page.tsx`; leave `identity.image` alone.
4. Lighthouse mobile ×3 (median), desktop ×1 against the production build; fix only what the report names.

**Acceptance:** portrait request <300 KB; `public/images/` has no `.bak` and no oversized original; hero identical in
crop/position at 390 and 1440; no layout shift; mobile LCP <2.5 s, CLS <0.1, score ≥90 — or the raw numbers reported
without a design change.
**Verification:** `ls -l public/images/`, network size in Chrome, Lighthouse JSON numbers, before/after hero rectangles.
**Depends on:** Task 2. **Commit:** `TASK-007: bring the portrait and the budget inside limits`.

---

### Task 4 — `monitoring`: boundaries and a log line that exists (M: 5 files, one commit)

**Slice 4a:** `src/app/error.tsx`, `src/app/global-error.tsx` (on-brand fallback, one reload link, `console.error` +
fire-and-forget POST to `/api/client-errors`), `src/app/api/client-errors/route.ts` (8 KB cap → 413, missing
`message` → 400, one JSON `console.error` line, 204, four allowed fields only), `src/components/ErrorReporter.tsx`
(`window.error` + `unhandledrejection`, max 5 per load, no form values).

**Slice 4b:** mount the reporter in `src/app/layout.tsx`; add contextual `console.error` to
`src/app/api/inquiries/route.ts` failure path (no body contents, no visitor data).

**Acceptance:** deliberate client throw renders the fallback and produces one JSON line in the server log;
valid POST → 204 + one line; 9 KB → 413 + no line; no `message` → 400; failed inquiry logs context with no name,
email, or message; no new dependency.
**Verification:** the three curls from `testing.md`, a temporary throw, `git diff package.json`.
**Depends on:** Task 3. **Commit:** `TASK-007: error monitoring on Vercel logs`.

---

### Task 5 — `smoke`: Playwright (M: 5 files)

**Files:** `package.json` (+`@playwright/test`, `test:e2e`), `playwright.config.ts`, `tests/smoke.spec.ts`,
`src/app/page.tsx` (`data-featured` on the Truespec card), `.github/workflows/ci.yml`.

**Steps:**
1. Add `@playwright/test`; config with one Chromium project, `baseURL http://localhost:3100`,
   `webServer` running the production build on 3100 (honours `PORT`), `reuseExistingServer: false` in CI.
2. Add `data-featured={p.featured ? "true" : undefined}` to the card `<article>`.
3. Write the eight checks exactly as the spec lists them; empty-submit asserts `checkValidity() === false`,
   `name.validationMessage !== ""`, and no `/api/inquiries` request.
4. CI: `npx playwright install --with-deps chromium` + `npx playwright test`; raise `timeout-minutes` only if
   the measured runtime needs it.
5. Break the Athletica URL, watch check 7 fail, revert.

**Acceptance:** `npm run test:e2e` passes against a fresh production build; the deliberately broken URL fails the
suite; CI runs install → typecheck → build → validate → link check → smoke.
**Verification:** local run twice; the break/revert run; CI runtime recorded.
**Depends on:** Task 4. **Commit:** `TASK-007: browser smoke test in CI`.

---

### Task 6 — `docs`: README and content workflow (S: 2 files)

**Files:** `README.md`, `docs/content-workflow.md`.

**Acceptance:** every script and path in the README exists and runs as written; env table matches `.env.example`;
folder map matches the repo; `SETUP.md` linked and unmodified; workflow doc describes the real
`validate:content` checks (16) and how to add one; `grep -rn "ifedemakuo" README.md docs/` clean (correct spelling
`ifedikemakuo`).
**Verification:** run each README command in a clean shell; walk the workflow doc by changing a summary and
reverting; grep.
**Depends on:** Task 5. **Commit:** `TASK-007: README and content workflow`.

## Checkpoints

- **After Task 2** — `tsc`, `validate:content`, `build` green; axe counts recorded; keyboard walk passes.
- **After Task 4** — build green; Lighthouse numbers recorded; the three reporter curls pass.
- **After Task 6** — full `testing.md` run (all parts) executed and recorded; working tree clean; seven commits.

## Risks and mitigations

| Risk | Impact | Mitigation |
|---|---|---|
| Contrast changes ripple into the palette | Med | Opacity/token changes only, measured against the same backgrounds; axe re-run after. |
| Header move changes stacking/fixed layout | Med | Header is fixed; verify hero/scroll positions at 390 and 1440 before/after. |
| No image encoder installed | Med | `cwebp` → ImageMagick → `npx sharp-cli`; verify bytes and visual crop each time. |
| Lighthouse noise | Med | Three mobile runs, median; record every run's numbers. |
| `@axe-core/cli` cannot drive Chrome | Low | axe-core inside Playwright; state the tool in the report. |
| Playwright `webServer` fights the standalone build (`bun`, `PORT`) | Med | Read the actual `server.js`/docs first; fall back to `node .next/standalone/server.js` on 3100 with `PORT`. |
| CI job timeout (15 min) exceeded by browser install | Low | Measure; raise only if the run needs it, and note the change. |

## Open questions

None — all sixteen decisions are settled in the grilling.
