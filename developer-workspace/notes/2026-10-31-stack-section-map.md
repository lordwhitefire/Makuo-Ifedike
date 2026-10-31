# Stack section — reference map (measured at runtime, 2026-10-31)

Reference: `http://127.0.0.1:3211/andle-portfolio.html`, viewport 1200×800.
Section: `div.client-section.my-stack-section` — the first block after the hero.
Page position: y=820 → 1027 (207px tall). Background `rgb(9,9,9)` (inherited from
the parent `bg-dark` wrapper, which also contains the About section below it).

## Structure

```
div.client-section.my-stack-section   (inline padding-left:30px, height 207)
└─ div.container                       (1155px wide, x=30)
   └─ div.client-wrapper               (1125px wide, x=45; padding 75px 0;
                                        border-bottom 1px solid rgba(255,255,255,.15))
      └─ div.client-active.swiper-container   (1125×56 at y=895; overflow hidden)
         └─ div.swiper-wrapper
            └─ 8 × div.swiper-slide  (193px wide, margin-right 40px)
               └─ div.image-box      (opacity .5, hover opacity 1, .3s ease)
                  └─ a[href="#"] → img 56×56
```

## Contents

- **No heading, no subtitle, no cards.** The strip is bare logos.
- 8 logos, 56×56 each, `alt` set:
  Next.js (`/logos/nextdotjs.svg`), TypeScript, Tailwind CSS, Sanity, Supabase,
  Neon Postgres, Clerk, Vitest. Natural sizes 150×150 except Vitest 77×47.
- Each logo sits in an `a href="#"` — dead link, no target.
- `.image-box` opacity 0.5; on hover opacity 1 (transition all .3s ease).

## Carousel behaviour (Swiper init in the page)

- `slidesPerView: 1` base, breakpoints:
  - 0 → 2 slides, spaceBetween 20
  - 576 → 3 slides, spaceBetween 30
  - 768 → 4 slides, spaceBetween 40
  - 992 → 5 slides, spaceBetween 40
- No autoplay, no loop, no rendered pagination element (the config names
  `.swiper-pagination`, but no such node exists in the section).
- Overflow hidden: only 5 of the 8 slides are in view; the rest are reached by drag.

## Build today (for contrast)

`#my-stack` in `src/app/page.tsx`: a visible "My Stack" heading, the subtitle
"Tools and technologies I build with", and 8 bordered cards (`rounded-lg border
border-border`, p-4, grid 2/4/8). Same 8 logos, different treatment: cards vs
bare strip, static grid vs 5-per-view draggable strip, no opacity treatment,
no hairline bottom border, 80px section padding vs 75px wrapper padding.

## Delta to match the reference

1. Remove the heading and subtitle.
2. Remove card chrome; images 56×56, opacity 50% → 100% on hover.
3. One row, 5 visible at desktop, 40px gaps, overflow hidden, draggable.
4. Vertical padding 75px, hairline bottom border rgba(255,255,255,.15).
5. No autoplay, no dots, no loop.
