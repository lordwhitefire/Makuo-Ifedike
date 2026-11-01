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

## Stack/About hairline (fixed 2026-10-31)

The reference has exactly one line in this area: `.client-wrapper`'s
`border-bottom: 1px solid rgba(255,255,255,0.15)` at y=1027, x=45→1170 (scan found no hr,
no pseudo-element lines, no other borders between y=700 and 1650). Our About section starts 15px
above the stack section's bottom and carried an opaque `bg-card`, so it painted over the hairline.
Fix: stack + About now share the reference's dark wrapper (`div.bg-card`), both sections are
transparent, and the stack section carries the reference's `.client-section` stacking rule
(`position: relative; z-index: 2`) so the hairline paints ABOVE the About portrait rather than under
it. Verified with `elementsFromPoint` on the border pixel at x=80, 300 (over the portrait) and 900:
the topmost element at all three is the stack wrapper carrying the 1px border — the line runs the
full width, exactly as in the reference.

## About — reference treatment (done 2026-10-31, verified at runtime)

Rebuilt to the reference's layout: a plain 593×595 image block flush left (background
`portrait.png`, `contain`, anchored bottom-right, no radius/border/shadow) that starts **82px above**
the section and ends at its bottom edge; text in the right half only, 563px wide at x=608, top-aligned
to the 120px section padding. h3 "Makuo Ifedike" — Zilla Slab 48/700, bronze `#89715b`, **uppercase**,
36px above the lead; lead Poppins 20/400 lh 32; body Poppins 14/400 lh 24 with 25px gaps and a 25px
bottom margin. Section `#090909`, margin `-15px 0 -5px`, responsive padding 60/80/100/120 via
`.about-padding` (Tailwind's `min-[1200px]` lost the cascade to `lg:` — plain CSS wins predictably).
The text reveals with the reference's wow.js `fadeInRight` (2s, .5s delay, from 100% right) via
`src/components/Reveal.tsx` — observer on a stationary wrapper, since observing the translated element
itself never intersects; disabled under `prefers-reduced-motion`.

Verified: section 513px tall, padding 120, image 593×595 at x=0 ending flush with the section,
heading x=608 w=563, 36/25/25 gaps, reveal fires on scroll (hidden → shown, opacity 1, transform 0),
no horizontal overflow.

## My Stack — reference treatment (done 2026-10-31, verified at runtime)

Rebuilt as the reference's bare logo strip, not a titled card grid. `src/components/TechStrip.tsx`:
8 logos, 56×56, at 50% opacity → 100% on hover (0.3s), 5 per view at desktop with 40px gaps
(2/20, 3/30 at 576, 4/40 at 768, 5/40 at 992 — the reference's Swiper breakpoints), overflow hidden,
drag with the mouse or swipe on touch; no autoplay, no loop, no dots. Section: `#090909`,
`padding-left:30px`, wrapper 1125px at x=45 with `padding:75px 0` and a
`1px rgba(255,255,255,.15)` bottom hairline. No heading or subtitle (reference has neither; the
section keeps `aria-label="My Stack"`). Verified: section 207px tall, track 1125×56, slides 193px,
gap 40, 5 visible, logo opacity .5, drag of 200px scrolls 200px (max 699).

## Navigation — reference treatment (done 2026-10-31, verified at runtime)

Runtime check of the reference (`:3211`) proved there is **no visible nav bar**: the four links live
in a 300px white off-canvas drawer (`translateX(101%)`, fixed, z-1130) opened by a hamburger at the
header's right; an overlay (`rgba(0,0,0,0.9)`, z-1120) dims the page; the drawer opens with a 500ms
delay then a 0.7s slide. Measured: panel x=1188 in a 1185px viewport at rest, x=885 when open.

Build now matches (`src/components/SiteNav.tsx`): header is brand left + hamburger right (reference
x=1147, build x=1146); drawer is 300px white, links 15px/600 uppercase `#404040`, padding 14px 20px,
border rgba(0,0,0,0.1); overlay black/90; same 500ms open delay; Escape/overlay/× close; focus moves
to the close button on open and back to the hamburger on close; body scroll locked while open;
drawer is `inert` when closed. Socials stay in the footer (the reference header has none either).
Verified at runtime on the build: at rest only the brand is visible in the header, drawer links sit
at x=1188 (off-screen), click opens to x=900, close returns it to x=1188.

## Maintenance note

Hero screenshots go stale silently when a project site changes. Re-capture and update the parity
run whenever a project ships a visible change.

## Servers / tooling state

- Build: standalone production build on `:3009` (`PORT=3009 bun .next/standalone/server.js`).
- Reference: `python3 -m http.server 3211` rooted at `public/` (assets resolve there).
- Parity job: `developer-workspace/scripts/parity-job.json` (ref :3211, build :3009).
- Browser: automation Chrome on `:9222` attached, tagged tabs recreated.

## 2026-10-31 — Full reference map (new)

- `developer-workspace/notes/2026-10-31-reference-full-map.md` — the whole reference
  page, mapped section by section, written as findings were made (not reconstructed
  at the end). Covers page order, header, off-canvas + overlay, hero, stack strip,
  About, Why Choose + counters, Work, Milestones, contact/footer, back-to-top, and
  the 9-touchpoint engagement layer, plus a full states inventory and the breakpoints.
- Verification standard: layout values measured live at 1200×800; every hover, scroll,
  click and engagement trigger exercised this session; source-only claims (form
  `:focus/:active/:disabled`, reduced-motion rules, per-breakpoint values, referrer
  branch, 1500ms scroll animation, odometer mid-animation digits) are labelled as
  such in the file's "Verification status" block.
- Notable findings for future work: the four Work tabs do not filter (identical panes);
  the reference's Interior-deco Work image 404s and collapses its card to 24px; the
  hero has no autoplay and no dotted counter; the time-of-day greeting only rides the
  Athletica slide; the Why-Choose service boxes keep the last hovered box active; the
  counters run 4 / 2 / 2, not 80.

## 2026-10-31 — Build state map (what is in our build now)

- `developer-workspace/notes/2026-10-31-build-state-map.md` — the live production build
  on :3009 mapped the same way: source composition, runtime geometry for every section,
  every state that exists (and the ones that don't), plus a per-section delta table
  against the reference map.
- Matches the reference: stack strip geometry, About geometry + copy + reveal, footer
  info box + mail + copyright, drawer treatment (plus Escape/scroll-lock additions).
- Missing vs reference: sticky header, Why-Choose icons/More links/bronze active fill and
  the whole counter block, the year-based Milestones rows, Work tabs + carousel, footer
  hover states, back-to-top, wow reveals, odometer, and all nine engagement touchpoints.
- Still broken in the build: the Interior-deco unsplash image (naturalWidth 0) in the
  Work cards — the same 404 URL the reference uses.
- Owner-directed deviations, left as-is: hero showreel (4 screenshot slides, autoplay,
  counter, eyebrow, gradient + hairline grid), Athletica localhost link (TODO deploy).

## 2026-10-31 — Approved items #1–#12 executed (hero #13 untouched)

All twelve approved convergence items were built and verified at runtime on `:3009` at
1200×800. Verification was by measured values (not assumption); the stale-server trap
(an old `bun` process holding :3009 while a fresh build sat on disk) was fixed by
`/tmp/opencode/restart3009.sh`, which kills the exact listener PID, builds, copies
static+public into `.next/standalone/`, then starts and confirms the new PID.

| # | Item | Verified build values |
|---|------|-----------------------|
| 1 | Sticky header, text logo kept | transparent/149px at top → `rgb(17,17,17)` #111 / 87px scrolled; inner padding 53→22 |
| 2 | Nav drawer x | opens at **x=885**, 300 wide (right edge = 1185 content width) |
| 3 | Escape-to-close removed | Escape leaves drawer open (x stays 885) |
| 4 | Why-Choose icons + More + bronze active fill | 4 SVGs, 4 "More →"; hovered card `rgb(137,113,91)`, last hovered stays active, moves on new hover |
| 5 | Why-Choose counter row | 3 counters 4/2/2, 50px/600 `#89715b`; labels PROJECTS LIVE / COMPLETE & SHIPPED / IN ACTIVE DEVELOPMENT, 16px/600 uppercase white-75; hairline rgba(255,255,255,.15), padding-top 70 |
| 6 | Milestones year rows | 2022/2025/2026, sub-labels Founded/Growth/Today, titles, links `#about`/`#work`/external, 3 columns |
| 7 | Work tabs + carousel + 52px heading | heading 52px/700 bronze Zilla; 4 tabs; 2 arrows; 4 cards per view at 216px; bronze hover panel opacity 0→1 |
| 8 | Footer hover states | mail #89715b→#fff; Twitter #00ccff→#89715b; LinkedIn/Github white-75→#89715b |
| 9 | Back-to-top | hidden at top; 50×50 #090909 z28, bottom 50 / right 50 (layout), 35×35 at ≤575; visible >600px; hover #89715b; click → 0 in 1500ms |
| 10 | wow reveals | 10 Reveal nodes; Why-Choose 2s delays .3/.5/.7/.9; Milestones 1.5s .3/.5/.7; footer h4 2s/.3 + mail 2s/.5; About fadeInRight 2s/.5; hidden until scrolled |
| 11 | Odometer | each `.odometer` observed individually; 4/2/2 counters 0→4/2/2; year rows 0→2022/2025/2026 |
| 12 | Engagement layer ×9 | bubble 3s/340px/#1a1613/z9999, auto-dismiss 14s; returning msg; greeting on Athletica only; 50% banner 1185×68/z9998; 45s idle panel 340px/z9999; exit modal 440px/z10000 + Escape; 60 confetti + 8s toast; 4 work tooltips; LinkedIn/Twitter referrer branch |

**Structural fix:** section order was Why-Choose → Milestones → Work; the reference is
Why-Choose → Work → Milestones → Contact. The two sections were swapped so the runtime
order now matches: Hero → About → Why-Choose (1500, 808) → Work (2308, 887) →
Milestones (3195, 554) → Contact (3749, 717); page height 4466 (hero still 800, the
owner-approved deviation).

**Not exercised:** nothing in the twelve is unverified. The referrer branch was exercised
with a LinkedIn referer (`document.referrer` set, bubble showed the LinkedIn opener).

## 2026-11-01 — Why-Choose reference visuals (build copy kept)

Owner ruling: copy = build, visuals = reference. Rebuilt the Why-Choose section and its
counters to reference geometry on `:3009` at 1200×800.

| Check | Build value | Reference |
|-------|-------------|-----------|
| Section | y1500, 1185×822 | y1520, 1185×822 (20px upstream offset) |
| Heading | x15, 1155×62, 52/700/1.2, `rgb(137,113,91)`, uppercase, left | same |
| Cards | 290×330 at x14/303/592/880, `#090909`, 1px `#313131`, p30, radius 0 | same |
| Default active | card 2, border bronze, `::before` scaleX(1), white icon | same |
| Hover | moves active; persists after mouse leaves | same |
| Icons | FA6 solid bullhorn; IcoFont ruler-compass-alt, credit-card, live-support; 48px | same glyphs |
| More | 14/600 white uppercase, mt35, no arrow | same |
| Counters | 365×81 at x15/410/805; 50/600 Helvetica Neue bronze; labels 16/600/1.4 two-line; 4/2/2 | same |
| Errors | none (build, TypeScript, console, requests) | — |

Fonts vendored at `public/fonts/fa-solid-900.woff2` and `public/fonts/icofont.woff2`.
Section height 808→822; Work 2308→2322; Contact 3749→3763; page 4466→4480.

Open: card 3 uses the reference `credit-card` glyph for "Fix slow systems" (reference
order kept); swap only if the owner asks. Change uncommitted pending instruction.
