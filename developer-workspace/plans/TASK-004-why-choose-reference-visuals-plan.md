# TASK-004 — Why-Choose: reference visuals, build copy

## Goal
Bring the Why-Choose section and its counters to reference visual parity at 1200×800, keeping the
build's four titles/descriptions.

Owner ruling (2026-11-01): **copy = build; visuals = reference.** Reference icon glyphs and
Helvetica Neue counter digits are in scope because they are visual.

## Change points
- `src/app/page.tsx` — Why-Choose section, currently ~lines 173–262.
- `src/app/globals.css` — add a scoped `#why-choose` block ported from the reference.
- `public/fonts/fa-solid-900.woff2`, `public/fonts/icofont.woff2` — vendored icon fonts.

## Target values (reference, 1200×800, scrollbar 15 → content 1155)
- Section: `.section-padding-02` pt 120 at 1200–1599 (160 at ≥1600, 100 at 992–1199, 80 at
  768–991, 60 below); `.mt-n3` −15px on heading+cards; height 822.
- Container: `width:100%; max-width:1200px; padding:0 15px; margin:0 auto`.
- Heading: x15, section top +105, 1155×62; Zilla Slab 52/700/1.2, `#89715b`, uppercase, left,
  margin-bottom 8px; no subtitle.
- Cards: 4 × 290×330 at x14/303/592/880; `#090909`, 1px `#313131`, p30, no radius, flex column
  `space-between`, `margin-left:-1px`; `::before` bronze `scaleX(0)` → `scaleX(1)`.
- Card content: h4 mb8; title `<a>` Poppins 20/1.5 600 white uppercase; p 14/1.714 `.75` white,
  margin-top 15; icon block at bottom, 48px/1 bronze; `More` 14/600 white uppercase, margin-top
  35, no arrow.
- Active: default index 1; hover only, persists; border bronze; `::before` scaleX(1); p + icon
  white.
- Counters: border-top 1px `rgba(255,255,255,.15)`, pt70; 3 equal columns (385); `.counter-box`
  flex row, align center, wrap, pt25; `.count` Helvetica Neue 50/600/1 bronze; `.counter-content`
  pl25; p 16/1.4 600 uppercase `.75`; two-line labels via `<br>`.
- Copy (build): Marketing sites / Web apps / Fix slow systems / Small business focus with their
  existing descriptions.
- Icons (reference): FA6 solid bullhorn `\f0a1`; IcoFont ruler-compass-alt `\ebfc`, credit-card
  `\eef4`, live-support `\ef77`.
- Reveals: cards keep fadeInUp 2s at .3/.5/.7/.9. Counters keep the existing odometer observer.

## Steps
1. Copy the two woff2 files into `public/fonts/`.
2. Add `@font-face` + scoped `#why-choose` CSS to `globals.css`.
3. Replace the Why-Choose JSX: container, heading, 4-card grid, reference card classes, icons,
   counters. `activeIndex` initial 1.
4. Build and restart :3009 with `/tmp/opencode/restart3009.sh`; confirm the PID changed.
5. Verify at 1200×800 via CDP: section box, heading box/style, card boxes/styles, icon font load,
   active hover, counter boxes/fonts/labels/values.
6. Write the report; do not commit until instructed.

## Notes / risks
- The saved reference's icon fonts 404 (`/fonts/fa-solid-900.woff2`, `/fonts/icofont.woff2`), so its
  glyphs are invisible there. Vendoring the same glyphs makes them render in the build.
- The build's Why-Choose starts at y1500 vs reference y1520 (upstream About offset); internal
  geometry is matched, absolute y stays 20px earlier.
- Section height grows 808 → 822; Work and later sections shift down 14px.
