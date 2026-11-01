# Report — Why-Choose reference visuals (build copy kept)

Date: 2026-11-01
Server: standalone build on `:3009`, verified at 1200×800
Reference: `public/andle-portfolio.html` on `:3211`

## Built

- **Why-Choose section** rebuilt to the reference geometry, keeping the build's four
  titles/descriptions:
  - Section top padding 120 at 1200 (160 at ≥1600, 100 at 992–1199, 80 at 768–991,
    60 below), container `max-width:1200px; padding:0 15px`.
  - Heading `why choose me`: Zilla Slab 52/700/1.2, uppercase, bronze `#89715b`, left
    aligned, margin-bottom 8; subtitle removed.
  - Four cards 290×330 at x14/303/592/880, `#090909`, 1px `#313131`, padding 30, no
    radius, flex column `space-between`, `margin-left:-1px`; bronze `::before` fill.
  - Card title Poppins 20/1.5 600 white uppercase, description 14/1.714 white-75,
    icon 48px/1 bronze, `More` 14/600 white uppercase with **no arrow**.
  - Default active card **2**; hover moves the active fill and it persists after the
    mouse leaves; active border/icon/description turn bronze/white.
- **Icons** — reference glyphs, vendored locally so they actually render:
  - `public/fonts/fa-solid-900.woff2` (FA6 Free solid) → `fa-bullhorn` `\f0a1`.
  - `public/fonts/icofont.woff2` (IcoFont 1.0.0) → `ruler-compass-alt` `\ebfc`,
    `credit-card` `\eef4`, `live-support` `\ef77`.
  - `@font-face` + scoped glyph rules in `globals.css`.
- **Counters** — hairline top border `rgba(255,255,255,.15)`, padding-top 70; three
  columns 365 wide with 30px column gap at x15/410/805; number 50px Helvetica Neue
  600 bronze; label 16/1.4 600 uppercase white-75 with two-line labels, padding-left 25.
  Values 4 / 2 / 2 animate via the existing per-element odometer observer.

## Verified (measured on `:3009` after rebuild, PID 138445)

- Build + TypeScript pass (`next build`), no console errors, no failed requests while
  scrolling the whole page.
- Section `#why-choose`: **y1500, h822** (reference y1520, h822 — the 20px upstream
  offset from About remains, as before).
- Heading: x15, y1605, 1155×62; 52px/700/1.2, `rgb(137,113,91)`, uppercase, left.
- Cards: 290×330 at x14/303/592/880; `rgb(9,9,9)`, `1px solid rgb(49,49,49)`,
  padding 30, radius 0, flex column space-between.
- Default active: card 2 (`Web apps`) has border `rgb(137,113,91)`, `::before`
  `scaleX(1)`, white icon. Hovering card 3 moves the active state; after the mouse
  leaves, card 3 remains active.
- Icons: FA6 Free and IcoFont both report loaded; `::before` content is the correct
  codepoint; computed family/weight correct; 48px, bronze on inactive, white on active.
- `More`: 14px/600, white, margin-top 35, text is `More` (no arrow).
- Counters: section 1155×152 at y2170; boxes 365×81 at x15/410/805; number 28×56
  (50px/600 Helvetica Neue, `rgb(137,113,91)`); labels at x68/463/858, two lines,
  16px/600/1.4, white-75; values **4 / 2 / 2** after scroll.
- Section height now 822, so Work moved 2308 → 2322, Contact 3749 → 3763; page height
  4466 → 4480. Work/Milestones/Contact were re-checked: no layout break, no errors.

## Not verified / open notes

- Glyph **appearance** was verified by loaded font + codepoint + computed styles, not by
  screenshot (Playwright screenshots hang on these pages; raw CDP screenshots are
  available but the owner's eyes are the visual check).
- Absolute section y remains 20px earlier than the reference because of the upstream
  About offset — not changed, out of scope.
- The reference page's counters read `0` in automation (its jQuery odometer did not
  fire under synthetic scrolling); the build's counters do reach 4/2/2. The reference
  was previously seen at 4/2/2 by the owner.
- **Icon semantics:** the reference glyph order is used as-is. Card 3 (`Fix slow
  systems`) therefore gets the `credit-card` glyph, which is semantically odd. If the
  owner wants semantic mapping instead (e.g. a tool/wrench for fixing), say so and I
  will swap only that glyph.
- Adding the fonts under `public/fonts/` also repairs the saved reference page's own
  missing fonts (it now loads FA5 Pro alias + IcoFont), so both pages show icons.

## Files

- `src/app/page.tsx` — Why-Choose markup (cards, icons, counters), default active 1.
- `src/app/globals.css` — `@font-face` + scoped `#why-choose` rules (294 lines).
- `public/fonts/fa-solid-900.woff2`, `public/fonts/icofont.woff2`.
- `developer-workspace/plans/TASK-004-why-choose-reference-visuals-plan.md`.

Prior work (#1–#12) was committed as `0b7fb4d`. **This Why-Choose change is
uncommitted** pending owner instruction.

- **Counter reveal:** the reference wraps each counter box in `wow fadeInUp`
  (delays .3/.6/.9, duration 2s); the build's counter boxes are not wrapped in a
  fade reveal (only the numbers animate via the odometer observer). This was outside
  the approved plan; say if you want the three counter boxes to fade up too.
