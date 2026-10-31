# About section — reference map (measured at runtime, 2026-10-31)

Reference: `http://127.0.0.1:3211/andle-portfolio.html`, viewport 1200×800.
Section: `div.about-section.section-padding.mt-n3.mb-n1#about`, inside the dark
`bg-dark` wrapper (so its background is `#090909`).
Page position: y=1012 → 1525 (513px tall), padding 120px 0, margin -15px 0 -5px,
`position: relative`.

## Structure

```
div.about-section (relative, padding 120px 0)
├─ div.about-images        (absolute, left 0, 593×595, y=930 → 1525)
│     background-image: url(/images/portrait.png)
│     background-size: contain; position: 100% 100%; no-repeat; radius 0
└─ div.container (1185)
   └─ div.row.justify-content-end
      └─ div.col-lg-6 (x=593, w=593, padding 0 15px → content x=608, w=563)
         └─ div.about-content (wow fadeInRight, 2s, delay .5s)
            ├─ h3.title            "Makuo Ifedike"
            ├─ p.about-text        "I build and fix software for small businesses."
            ├─ p                   "If something is slow, half-built, or nobody knows…"
            └─ p                   "One person, start to finish. No jargon to hide behind."
```

## Measured values

- **Image**: 593×595, flush to the left page edge, starts at y=930 — i.e. **82px
  above the section top**, overlapping the stack strip above it. Plain background
  div: `contain`, anchored bottom-right, no radius, no border, no shadow, no
  pseudo-element decoration.
- **Heading** `h3.title`: Zilla Slab **48px / 700**, colour **#89715b**
  (`rgb(137,113,91)`), line-height 57.6px, **uppercase** (renders "MAKUO IFEDIKE"),
  at x=608, y=1132, width 563.
- **Lead paragraph** `p.about-text`: Poppins **20px / 400**, white, line-height 32px,
  y=1226 (36px below the heading).
- **Body paragraphs**: Poppins **14px / 400**, white, line-height 24px; y=1283 and
  y=1356 (25px gaps).
- Text column top = section padding top (120px); image runs from above the section
  down to its bottom edge.
- `.about-content` uses a wow.js **fadeInRight** (2s, 0.5s delay) when scrolled into
  view; at scroll 0 it is `visibility: hidden` until the animation triggers.

## Build today (for contrast)

`#about` in `src/app/page.tsx`: `grid lg:grid-cols-2 gap-16 items-center`; portrait
as an `<img>` capped at `max-w-md` with `rounded-lg shadow-lg border border-border`;
h3 `text-5xl` bronze but **not uppercase**; heading margin `mb-4` (16px) instead of
36px; paragraphs `mb-6` (24px). Section padding 120px matches; background `#090909`
matches; copy matches word for word.

## Delta to match the reference

1. Image: plain 593×595 block flush left, `background-size: contain`, anchored
   bottom-right, no radius/shadow/border; positioned to start 82px above the section
   top and end at its bottom.
2. Text column: fixed 563px wide, right half of the page (x=608), top-aligned to the
   120px padding — not vertically centred against the image.
3. h3: uppercase, 36px gap below (not 16px).
4. Paragraph rhythm: 25px between body paragraphs; lead stays 20px/32px.
5. Optional: the fade-in-right on scroll (2s, 0.5s delay).
