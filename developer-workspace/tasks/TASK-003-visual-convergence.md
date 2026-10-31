# TASK-003 — Visual convergence to the reference (2026-10-31)

**Standard:** `developer-workspace/reference/andle-portfolio.html`, served with assets on `:3211`
(from `public/`), captured as the reference Runtime Map. Owner watches live on `:3009` and calls stop.

**Owner ruling on parity:** the rebuild must be *like the reference*; the runtime-parity verdict is
accepted as FAIL (framework marker + count rule make a static-HTML-vs-App-Router compare
impossible — see `reports/2026-10-31-parity-runtime-check-report.md`). Verification is by capture
values against the reference map plus the owner's eyes.

## Done — verified against the reference map (run 20261031-041153+)

| Item | Reference value | Build now | Verified |
|------|----------------|-----------|----------|
| Base font | Poppins 14px, line-height ~24px | Poppins 14px / 1.714 | PASS |
| Body text color | rgba(255,255,255,0.75) | same | PASS |
| Page background | #141414 (sections #090909) | #141414 / #090909 | PASS |
| Hero eyebrow | Inter 13.6px 500, white-55% | Inter 13px 500, white-55% | PASS |
| Hero h1 | Zilla Slab 100px 700 white | Zilla Slab 100px 700 white | PASS |
| Hero paragraph | Inter 18px white | Inter 18px white | PASS |
| Hairline grid | 3 × 1px white-35% at 25/50/75% | same | PASS |
| About name | Zilla Slab 48px 700 bronze | Zilla Slab 48px 700 bronze | PASS |
| About lead | Poppins 20px 400 white | Poppins 20px 400 white | PASS |
| Why Choose heading | Zilla Slab 52px 700 bronze | same | PASS |
| Card titles | Poppins 20px 600 white | same | PASS |
| Milestones heading | Zilla Slab 52px 700 bronze, centered | same | PASS |
| Card link "See project" | Zilla Slab 20px 700 white | same | PASS |
| "Let's work together" | Inter 24px 400 white-50% | same | PASS |
| Contact email | Zilla Slab 60px 700 bronze | same | PASS |
| Footer credit | Poppins 14px white-75% | same | PASS |

## Root fixes made

1. `postcss.config.mjs` added — the build had emitted **no CSS at all** (Tailwind never ran).
2. `src/app/globals.css` rewritten — the design system (dark palette, three-font mapping) did not
   exist; the page's tokens (`bg-background`, `text-primary`, …) resolved to nothing.
3. `src/app/page.tsx` converged section by section as above.

## Remaining gaps (not yet done — structural, larger than styling)

- Work section: reference is a looping swiper carousel of project cards; build is a static grid.
- Why-choose cards: reference has an icon + "More" link per card; build is text-only (approved).
- Header: reference header rhythm (144px, transparent over hero) partially converged.
- Section inner widths use `container` (Tailwind defaults) vs reference's fixed 1155px.

## DEPLOY BLOCKERS — resolve before any production deploy

- **Athletica hero slide links to a LOCAL URL** (`http://localhost:3011/product/adidas-predator-elite-ft-fg-white-light-green`, noted in `src/components/HeroCarousel.tsx`). It is not deployed; replace with the production URL at deploy time or visitors hit a dead link.
- Hero slide screenshots are frozen captures of live sites — re-shoot when a project changes (see maintenance note below).

## Hero — featured-projects showreel (done 2026-10-31, verified in capture run 20261031-0427xx)

Built per owner ruling: the hero's job is proof, not identity. `src/components/HeroCarousel.tsx` —
four slides cycling every 5.5s (auto-rotation off under `prefers-reduced-motion`), full-bleed
screenshots captured from the live sites, dark gradient overlay for legibility, hairline grid at
25/50/75%, slide counter ("1 / 4"), Poppins category line, Zilla Slab 100px project name, Inter 18px
description, Zilla Slab 700 "See project →" link. Assets in `public/projects/`
(truespec, interior-deco, athletica, cp3-legacy — all 1280×800, captured via the shared visible
Chrome; notes in `scrape-workspace/hero-capture-2026-10-31.md`).

## Maintenance note

Hero screenshots go stale silently when a project site changes. Re-capture and update the parity
run whenever a project ships a visible change.

## Servers / tooling state

- Build: standalone production build on `:3009` (`PORT=3009 bun .next/standalone/server.js`).
- Reference: `python3 -m http.server 3211` rooted at `public/` (assets resolve there).
- Parity job: `developer-workspace/scripts/parity-job.json` (ref :3211, build :3009).
- Browser: automation Chrome on `:9222` attached, tagged tabs recreated.
