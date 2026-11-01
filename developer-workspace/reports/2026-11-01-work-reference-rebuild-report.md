# Work section — reference rebuild (2026-11-01)

**Asked:** make the Work section match `public/andle-portfolio.html` (reference on :3211),
section by section, and drop the descriptions because the reference has none. Copy stays
from the build: project names, categories, real project links, and the captured 444×512
screenshots. Tooltips stay.

## Change

- `src/app/page.tsx`
  - Replaced the static 4-card grid with the reference's tabbed carousel:
    header title + four tabs (`All`, `marketing site`, `web app`, `in-progress`),
    Swiper loop with 12 slides (4 projects × 3 copies), 4 per view at 1200,
    `spaceBetween: 1`, reference breakpoints.
  - Cards: full-bleed captured screenshot, always-on `rgba(0,0,0,.35)` overlay,
    bottom content with category subtitle and 34px project title link. No description,
    no "See project →".
  - Tabs do not filter — all panes show the same four projects. Clicking a tab
    re-mounts the pane and replays `fadeInUp` 0.8s, matching the reference's tab panes.
  - Removed the old `carouselRef` scroll buttons.
- `src/app/globals.css`
  - Work-scoped CSS: reference section padding (responsive 160/120/100/80/60),
    `max-width:1200px` + 15px padding container, 296px title column, tabs at x311,
    1px underline, 68px gap to the carousel, 296×449 cards, 136px bottom content,
    `#141414` hover panel, `rgba(255,255,255,.35)` 1px gaps, and 40×40 arrows at
    10px → 70px on carousel hover.
- `src/app/layout.tsx` — global `swiper/css` + `swiper/css/navigation`.
- `package.json` / `package-lock.json` — added `swiper@11.2.10`.

## Verified at runtime (1200×800, build :3009)

| Check | Build value | Reference |
|-------|-------------|-----------|
| Section | y2322, 1185×704, `padding:120px 0 0`, transparent | y2292, 1185×733, `padding:120px 0 0`, `margin-top:-50px` |
| Heading | x15, 296×62, Zilla 52/700/1.2, `rgb(137,113,91)`, uppercase | x15, y2438; build y2442 |
| Tabs | x311, 859×40; four reference labels; 16/600 uppercase; `All` active; 1px underline | x311, y2469; build y2469 exact |
| Carousel | x0, 1185×449, `rgba(255,255,255,.35)`; 12 slides; 4 visible 296×449 at x0/297/593/890 | 1185×448; 296×449 at x0/297/594/891 |
| Card content | 136px, p30; subtitle 14/400 white; title 34/600 white; real project link | same |
| Card hover | panel `#141414` grows 0→136px in .6s; title `#89715b`; subtitle white-75; image overlay black-35 | same |
| Arrows | 40×40 at 10/10 → 70/70 on carousel hover; bg `#333`; 30px icon; hover `#89715b` | same |
| Tabs behaviour | no filtering; `fadeInUp` .8s; ends opacity 1 | same |
| Next section | y3026 | y3020 |
| Images | 444×512 captured screenshots load | reference uses 480×730 unsplash |
| Errors | no console errors, no failed requests, no horizontal overflow | — |
| Build / TypeScript | pass | — |

The reference's first Work image (Interior-deco) 404s and collapses that card to 24px;
the build keeps the captured screenshot and renders all four cards at full height.

## Not verified / remaining differences

- **Owner's eyes** — the final visual check.
- **Section box:** no `margin-top:-50px` overlap. The visible content still aligns within
  1–4px, but the Work section starts 30px later and is 29px shorter; the gap from the
  Why-Choose counters is 120px vs the reference's 96px.
- **Why-Choose background:** still `#090909` vs the reference's `#141414` (pre-existing).
  This shows as a section-background seam at the Work top. Not changed in this task.
- **Tabs implementation:** one carousel re-mounted per tab instead of four separate panes.
  The visible behaviour (no filtering, fade-in on click) matches.
- **Card categories:** build copy (`Football store`, `Fan site / sports experience`) kept;
  the reference uses `In progress` for the last two. The owner said drop descriptions,
  not change categories.
- **Card images:** captured 444×512 screenshots are cropped by `object-cover` into the
  296×449 card; the reference's 480×730 images are nearly the same aspect. Owner-approved
  captures.
- **Tab fade under automation:** the pane animation is throttled in the background tab
  (start delayed, then finishes opacity 1); the reference's wow animations behave the
  same under automation. Confirmed the final state is visible.
- Not committed and not pushed. Working tree also carries the earlier counter changes
  (`odometer@0.4.8`, `src/types/odometer.d.ts`).
