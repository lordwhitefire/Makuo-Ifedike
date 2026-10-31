# Build state map — what is in the Next.js build right now

Source of truth: production standalone build on **:3009** (`cd .next/standalone && PORT=3009 bun server.js`), cross-checked against the source in `src/`.
Viewport for measurements: 1200×800 unless noted. Measured live in Chrome on :9222.

This file is written **as findings are made**, section by section — nothing held back for a final write-up.
Reference for comparison: `developer-workspace/notes/2026-10-31-reference-full-map.md`.

---

## 0. Composition (source + runtime)

Source: `src/app/page.tsx` (277 lines) + `src/components/{HeroCarousel,SiteNav,TechStrip,Reveal}.tsx`.

Build section order in source: header (L60–69) · HeroCarousel · stack (L78–84) · About (L87–116) · Why Choose (L120–158) · counters/Milestones (L160–183) · Work (L185–221) · footer (L223–275).

Not in the build at all: engagement layer (all nine touchpoints), wow.js reveals (only `Reveal` on About), odometer, back-to-top, tab filtering, hero arrows.

### Global (measured, 1200x800)

- Page height **4084** (reference 4789).
- `main` background **rgb(20,20,20)** = #141414 - matches the reference's `.main-wrapper`.
- Body font **Poppins**, text **rgba(255,255,255,.75)** - matches.
- Footer background **#090909** - matches.
- **Absent entirely:** back-to-top, wow.js elements (0), odometer (0), and the whole engagement
  layer - no `style[data-engagement]`, no bubble/banner/panel/exit-modal/confetti/toast. The
  build has **none of the nine touchpoints**.
- Only one reveal exists at all: `Reveal` on the About text.

### Measured page order (runtime)

| # | Element | y / height | Heading inside | Heading style |
|---|---|---|---|---|
| 0 | `header` (fixed, transparent) | 0 / 149 | text logo | - |
| 1 | `section#hero` | 0 / **800** | h4 20px Poppins white | "1 / 4" counter, eyebrow "Portfolio - Onitsha, Nigeria" |
| 2 | stack + About wrapper `div.bg-card` | 800 / **705** | h3 "Makuo Ifedike" | Zilla 48/700 #89715b uppercase (matches) |
| 3 | `section#why-choose` | 1500 / **570** | h2 "Why Choose Me" | Zilla 52/700 bronze, **centred** |
| 4 | `section#counters` | 2070 / **458** | h2 "Milestones" | Zilla 52/700 bronze, centred |
| 5 | `section#work` | 2528 / **839** | h2 "Work" | **Poppins 14px/400 white-75** (reference: 52px bronze) |
| 6 | `footer#contact` | 3367 / **717** | h4 "Let's work together" | Inter 24/400 white-37 |

Deltas visible already: hero 800 tall (reference 820) with a screenshot + "1 / 4" counter;
Why Choose has **no counters, no icons**; Milestones holds the 2/2 counter cards (reference has
2022/2025/2026 rows); Work is a 4-card grid (reference: tabs + 4-per-view carousel); no
engagement layer; page 705px shorter than the reference.


## 1. Header + navigation (SiteNav.tsx)

- `header`, fixed, z-50, **bg-transparent, 1185x149** (`max-w-[1185px] px-4 py-[53px]`).
  Logo is **text**: "Makuo Ifedike" (xl bold tracking-tighter) at the left (reference: a
  35x38 image logo, and a 144-tall header).
- Hamburger: a `<button>` 23x43, three 1.5px bars with 5px gaps (matches reference
  position/size at x=1147, y=49).
- **State — sticky: none.** Scrolling leaves it transparent at full 149 height. The
  reference darkens to #111 and shrinks to 88 — the build has no sticky behaviour at all.
- Drawer `aside#site-drawer`: 300px white, z-1130, fixed right, `transition-transform`
  0.7s; closed `translate-x-[101%]` measured at **x=1188**; open **x=900** (reference 885
  — same 300px width, 15px off from the reference's 885).
  - `role="dialog"`, `aria-modal`, `inert` when closed (measured true), aria-expanded on
    the toggler, focus moves to the close button on open and back to the toggler on close,
    **body scroll lock** (`overflow: hidden`) while open.
  - Close x at top-right (30x30, text-2xl black "x").
  - Drawer logo is **text** "Makuo Ifedike" (reference: same image logo again).
  - Links: **Home `/`** (reference `#top`), Work `#work`, About `#about`, Contact
    `#contact` — 15px semibold uppercase, #404040, `py-[14px]` rows 52px tall, top y=95
    (reference y=104).
  - **Escape closes the drawer** (measured: x back to 1188, overflow cleared) — an
    addition over the reference, which has no Escape handler.
  - Links are also separated by black/10 borders (styling addition).

## 2. Hero (HeroCarousel.tsx) — owner-directed showreel

- `section#hero`, **800 tall** (h-screen min-h-[700px]; reference 820), full-bleed.
- **4 slides, all unique projects**: Interior-deco, Truespec, Athletica, CP3-legacy —
  background images `bg-cover bg-center` from **`/projects/*.png`** (local screenshots of
  the real sites). Reference: text-only, 3 projects.
- **Autoplay every 5.5s**, no way to pause; disabled when the user prefers reduced
  motion. Verified: after 6.2s the counter reads "2 / 4" and the h1 reads "Truespec".
  The reference has **no autoplay** — it is arrows only.
- Transition: opacity crossfade 1s (`transition-opacity duration-1000`), not the
  reference's 600ms Swiper fade.
- Overlays: a gradient `from-background via-background/70 to-background/40` on top of the
  screenshots, plus a hairline grid of 3 vertical white/35 lines at 25% / 50% / 75%
  (only at `md` and up). Neither exists in the reference.
- Counter **"1 / 4"** top-right (right-4, top-24, 14px) — the reference has none.
- Content sits at the **bottom** (`justify-end`, pb-[140px]), x=16:
  - eyebrow "Portfolio — Onitsha, Nigeria", Inter 13px medium, white-55
    (reference: no eyebrow here; the greeting is time-of-day).
  - h4 category 20px Poppins white at y=359.
  - h1 `clamp(48px,9vw,100px)` Zilla bold, line-height 1, tracking-tight — renders
    **100px** at 1200, y=395 (reference y=306).
  - p Inter 18px, line-height **28** (reference 30.85), `max-w-2xl` = 672px wide
    (reference: full 1155), mt-10.
  - "See project →" Zilla 20px bold white, hover primary; Athletica's href is
    **http://localhost:3011/product/adidas-predator-elite-ft-fg-white-light-green** with
    `target="_self"` and a `TODO(deploy)` (all others `target="_blank"`).
- No arrows, no drag, no counter dots, no social row (reference has arrows + bottom-left
  social row).

## 3. Stack strip (TechStrip.tsx)

- `section#my-stack` 1185x207 at y=800 (identical geometry to the reference), `pl-[30px]`,
  `relative z-[2]`.
- Wrapper `border-b border-white/15 py-[75px]`, 1125 wide at x=45 — hairline identical.
- Track `overflow-x-auto` (scrollbars hidden), 1125x56 at x=45 y=875, scrollWidth **1824**,
  max scrollLeft **699**; **8 items x 193px**, gap **40px** at lg / 30 at >=576 / 20 below;
  **5 in view**.
- Logos 56x56 at opacity **.5 -> 1** on hover (.3s) — matches.
- Logos are **not links** (title attribute only); the reference dead-links them.
- Drag: **mouse pointer drag scrolls 1:1** — 100px drag -> scrollLeft 100, 200 -> 200,
  stays after release, max 699 (measured). Touch/pen fall through to native scrolling
  (`e.pointerType !== "mouse"` bails out).
- No autoplay, no loop, no dots.

## 4. About

- y=992 (reference 1012 — the whole build sits 20px higher because its hero is 20px
  shorter), 513 tall, `padding: 120px 0`, margins `-15px 0 -5px`.
- Image: absolute, 593x595 at x=0 y=910 (reference 930 — same 20px shift), `contain`,
  anchored bottom-right; no radius/border/shadow.
- Text column: x=593 w=593 (right half), `px-[15px]` -> content **x=608 w=563** — matches.
- h3 "Makuo Ifedike": Zilla **48/700 #89715b uppercase**, y=1112, w=563, h=58.
- Lead p: 20px/32, y=1206 (**36px below the heading**). Body p's: 14px/24, y=1263 and
  1336 (**25px gaps**) — matches the reference exactly.
- Reveal (`Reveal.tsx`): IntersectionObserver (threshold 0.2) on a stationary wrapper;
  inner carries `data-reveal-state hidden -> shown`; measured `shown` after scrolling in,
  and the section is `visibility: hidden`-gated only through this. No-op under
  `prefers-reduced-motion`.

## 5. Why Choose — `section#why-choose`

- y=1500 h=570, `padding: 120px 0`, background **#141414**.
- h2 **"Why Choose Me"** 52px Zilla bronze, **centred**, plus a subtitle **"What I bring
  to every project"** — the reference has a left-aligned lowercase "why choose me" and
  **no subtitle**.
- 4 cards, **224x174**, y=1776, x=97 / 353 / 609 / 865; `p-6` (24px), `rounded-lg` (8px),
  `border-border` = rgba(255,255,255,.35); **hover: border -> primary/50** (measured
  lab(49.5 7.2 16 / 0.5) ≈ bronze at half alpha).
- **No icons, no "More" links, no bronze active fill, no counters** — the reference has
  all of them (48px icons, More links, `.active` bronze scaleX fill, and the 4/2/2
  odometer row below).
- Copy is the owner's rewrite, not the reference's template text:
  Marketing sites / Web apps / **Fix slow systems** / **Small business focus**.
- No entrance animation at all here (reference: wow fadeInUp, staggered .3-.9s).

## 6. Counters — `section#counters` (the build's "Milestones")

- y=2070 h=458, `padding: 120px 0`, bg #141414.
- h2 "Milestones" 52px Zilla bronze, centred, y=2190.
- **Two** cards 472x134 at y=2274, x=97 / 617; `rounded-xl` (12px), border, bg #141414;
  number **"2"** in 36px **white-37** (lab alpha 0.374); labels **"complete & shipped"**
  and **"in active development"**.
- Not in the build: the third counter (4 / projects live), the odometer animation, the
  2022/2025/2026 year rows, the sub-title colours (bronze/orange/amber), the dimmed+span
  titles, and the #about / #work / exterior links. No hover state at all.

## 7. Work — `section#work`

- y=2528 h=839, `padding: 120px 0`, bg #141414.
- Heading is **"Work" at 14px Poppins white-75, centred**, plus subtitle "Selected
  projects" — the reference title is 52px Zilla bronze, left.
- **No tabs** (0 tab elements).
- 4 cards 224x475 at y=2772, x=97 / 353 / 609 / 865, `rounded-xl`, border, overflow-hidden.
- Image: 222x256 (`h-64 object-cover`), 0.5s transition; **hover scales to 1.05** (measured
  via the CSS `scale` property — `transform` stays `none`, rect grows 222x256 -> 233x269).
- Card text: h3 title 20px/600 white; category 14px; description 14px `line-clamp-3`;
  "See project ->" 20px Zilla bold, hover -> primary.
- **The Interior-deco image is still the 404 unsplash URL** — measured `naturalWidth 0`,
  broken at runtime (the other three load). Same dead image as the reference.
- Project copy differs from the reference: Athletica "Football store" and CP3-legacy
  "Fan site / sports experience" (reference labels both "In progress"), and each card
  carries the long description text.

## 8. Contact / footer — `footer#contact`

- y=3367 h=717, bg **#090909**; `pt-[275px] pb-[195px]` on the info box (matches the
  reference's 275/195).
- h4 "Let's work together" Inter 24/400 white-37; mail link 60px Zilla bronze at
  x=310 w=565 — matches the reference exactly.
- Bottom row: `pt-[20px] pb-[70px]` with a `border-t`; copyright "© Makuo Ifedike built
  by whitefire" 14px white-75 (matches).
- Socials: Twitter **#00ccff**, LinkedIn white-75, Github white-75. Reference: Github is
  #fff and all three hover to **#89715b** — the build has **no hover states** on the
  footer row (measured: mail and Twitter keep their colour on hover).
- No back-to-top, no confetti, no toast.

---

## Build state inventory (what states actually exist)

| Element | State | Present? | Effect |
|---|---|---|---|
| Hero slides | autoplay | yes, 5.5s, no controls | index cycles 0->3, 1s crossfade; off under reduced motion |
| Hero See-project | hover | yes | white -> primary |
| Drawer | open / close | yes | 0.7s slide; x 1188 -> 900; overlay fade (500ms delay on close); Escape, scroll lock, focus move, inert |
| Stack logo | hover | yes | .5 -> 1 (.3s) |
| Stack strip | drag | yes | 1:1 scroll, mouse only |
| About text | scroll reveal | yes | hidden -> shown, IO threshold .2, reduced-motion no-op |
| Why-Choose card | hover | yes | border -> primary/50 |
| Work card | hover | yes | image scale 1.05 (0.5s), link hover primary |
| Footer mail / socials | hover | no | colour stays |
| Header | sticky | no | stays transparent at full height |
| Reference extras | — | all absent | engagement layer x9, wow.js, odometer, back-to-top, tab filtering, tabs, arrows, hero social row |

## Deltas vs the reference (per section)

| Section | Build | Reference | Gap |
|---|---|---|---|
| Header | text logo, transparent always, 149 | image logo, sticky #111 at 88 | sticky behaviour + logo form |
| Nav | drawer 300px, x=900, Escape + focus + scroll lock | x=885, no Escape | 15px offset; Escape is an addition |
| Hero | 800 tall, 4 slides, screenshots, autoplay 5.5s, "1 / 4", eyebrow, gradient + hairline grid, bottom-anchored text, no arrows | 820 tall, 3 slides, text-only, arrows, no autoplay, centred text, bottom-left social row | owner-directed showreel (deviations by design) — but autoplay/counter/arrows behaviour differs |
| Stack | identical geometry, non-links, drag | identical, dead links, Swiper | matches |
| About | identical geometry/copy | same | matches |
| Why Choose | 4 plain cards, no icons/More/counters, centred title + subtitle, owner copy | icons + More + bronze active fill + counters, left title | the whole interaction + the counter block is missing |
| Milestones | 2 number cards inside `#counters` | 3 year rows with sub-labels, dimmed+span titles, links | different content model, no years, no links, third counter missing |
| Work | 4-card grid, 14px heading | tabs (all identical panes) + 4-per-view carousel, 52px heading | structure differs; dead images replaced with captured shots — verified loading at runtime |
| Footer | matches; no hover states | hover #89715b on mail + socials | hover states missing |
| Whole page | 4084 tall | 4789 tall | 705px shorter: no engagement layer, no wow, no odometer, no back-to-top |

_(filling, section by section)_

## Work images — replaced (2026-10-31)

All four Work card images were dead unsplash URLs (the Interi-deco one measured `naturalWidth 0` at runtime). Captured live at 444x512 (2x the 222x256 card frame) from each slider link, below the hero:

| Card | Captured from | Shot size | File |
|---|---|---|---|
| Interior-deco | interior-deco-kappa.vercel.app (services block) | 444x512 | public/projects/work/interior-deco.png |
| Truespec | truespec-k4y6.vercel.app (showroom listing) | 444x512 | public/projects/work/truespec.png |
| Athletica | localhost:3011/product/adidas-predator-elite-ft-fg-white-light-green (product gallery) | 444x512 | public/projects/work/athletica.png |
| CP3-legacy | cp3-legacy.vercel.app (news cards) | 444x512 | public/projects/work/cp3-legacy.png |

Source updated in `src/app/page.tsx` `projects` array (lines 24-52): each `image:` field now points at `/projects/work/<name>.png`. REBUILT + VERIFIED at runtime on :3009 — all four images ok=True, natural 444x512.

Note: the CP3-legacy shot is news-content below its hero, not the hero itself — the site kept the hero at top under all offsets tried; this is the cleanest non-hero area available. Offer the owner a re-take if they want.
