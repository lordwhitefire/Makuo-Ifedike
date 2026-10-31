# Report — Production build + runtime-parity check (2026-10-31)

**Status:** CSS bug found and fixed (verified). Reference-vs-build parity verdict: FAIL — and on this
project it cannot pass by design. Owner decision required on direction (see below).

## What was done

1. **Discarded the disguise experiment.** Restored `src/app/page.tsx`, `src/app/layout.tsx`,
   `next.config.ts` from the last commit (`b212495`) and removed the copy route
   `src/app/andle-portfolio/`. Verified the homepage is the real React rebuild again.
2. **First real production build** (`npm run build`, Next 16.4.3 Turbopack) and served the
   standalone artifact on `:3009` (`PORT=3009 bun .next/standalone/server.js`). Reference served
   from `developer-workspace/reference/` on `:3211`.
3. **Ran the runtime-parity job** (scenario 1, two sites), after recreating the tagged browser
   tabs per the browser-attach discipline (`recreate`).

## Finding 1 — the production build shipped with NO CSS (fixed)

- The served page had **no stylesheet link**; `.next/static/css/` was empty.
- `src/app/globals.css` contained only `@import "tailwindcss";` and there was **no
  `postcss.config.*` at the project root**, so the import was never expanded into rules.
- **Fix:** added `postcss.config.mjs` with `@tailwindcss/postcss` (exactly per
  `node_modules/next/dist/docs/.../getting-started/11-css.md`), rebuilt.
- **Verified after rebuild:** `<link rel="stylesheet" href="/_next/static/chunks/1r9xo5qeiq-5v.css">`
  in the served HTML; the chunk returns HTTP 200, 102,018 bytes.
- Root cause of it going unnoticed: every earlier check ran against `next dev`, which compiles CSS
  on the fly. This was the project's first production build — precisely the bug class the
  runtime-parity build-not-dev rule exists to catch.

## Finding 2 — parity FAILs, and on this project it structurally cannot pass

Run `20261031-031858` verdict:

```
reference : http://localhost:3211/andle-portfolio.html   — 834 nodes
build     : http://localhost:3009/                      — 138 nodes
structure : FAIL — first split at body/0/0 (reference div, build has no node)
verdict   : FAIL
```

Three separate blockers, in order:

1. **First split `body/0/0`:** the build's `body/0` is Next's App Router streaming marker
   (`<div hidden><!--$--><!--/$--></div>`); the reference's `body/0` is its content container.
2. **Plumbing cannot absorb it:** the plumbing grammar requires an exact selector, and the capture
   records only `href`, `type`, `alt`, `src` attributes (`scripts/lib/rules.mjs` ATTRS).
   `div[hidden=""]` is therefore not a legal entry; the streaming div has no recorded attribute to
   select on.
3. **The node-count rule:** *"a build with a lower count has failed; a lower count is never a
   framework difference"* (`references/extraction.md`). 138 ≠ 834 — and the gap is the rebuild's
   deliberate architecture (semantic React + Tailwind vs the reference's Bootstrap div soup),
   already documented as intentional in the TASK-002 handoff.

### Finding 3 — the streaming marker is unavoidable framework chrome (verified)

`<div hidden><!--$--><!--/$--></div>` sits at `body/0` on **every route of this app** — checked
`.next/server/app/index.html` (prerendered) and `.next/server/app/_not-found.html` (different tree)
plus the dev server. It is React Flight's empty root Suspense boundary, emitted by the App Router
itself; no page-level or config-level change removes it.

Consequences, all verified against the skill's own code:
- It blocks pairing at the first node on every run, whatever the page renders.
- Plumbing cannot absorb it: the selector grammar allows only a dashed custom-element tag or a
  predicate on `href` / `type` / `alt` / `src` (`scripts/plumbing.mjs`, `ATTRS`), and the marker
  records none of those.
- The skill states *"nothing is removed before comparing"* — a static-HTML reference can never
  carry App Router chrome, so the two trees cannot pair at body/0 by any sanctioned means.

Conclusion: scenario 1 (compare reference to build) can never PASS on this project. This is an
architecture limit, not a defect to fix — and it stands even if the rebuild's DOM were reshaped to
mirror the reference exactly.

## What the tool DID buy us (both real)

- Exposed the missing-CSS production bug before anything shipped.
- Caught that the Oct 30 runs had been measuring the disguise, not the site.

## Owner decision required — direction for the standing check

- **Option A (recommended) — govern the rebuild, not the old page.** Use the skill's scenario 2
  (gate): capture a confirmed Runtime Map of the rebuilt site, then re-check the build against it
  on every change. Add scenario 3 (claim) checks for the content invariants already in
  `procedures/browser-check.md` (title, footer credit, 8 stack marks, counters, no `wa.me/`).
- **Option B — keep the reference comparison** and accept FAIL as the standing state (records only;
  a FAIL that is never cleared violates the skill's own "no work while a FAIL is in scope").
- **Option C — narrow the reference comparison** to a declared scope (e.g. footer + identity nodes)
  where both trees are comparable.

## Current state on disk

- Discarded: page/layout/next.config restored; copy route removed.
- New: `postcss.config.mjs` (verified fix). Modified: `developer-workspace/scripts/parity-job.json`
  (build URL now `:3009`).
- Servers: standalone build on `:3009`, reference on `:3211`, both up. Automation Chrome on `:9222`
  attached and verified.
- Uncommitted changes exist (postcss.config.mjs, parity-job.json, procedures doc, parity scripts).
  Nothing committed without owner instruction.
