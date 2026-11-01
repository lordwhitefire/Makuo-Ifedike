# Why-Choose map — reference vs build (2026-11-01)

Method: runtime measurement at 1200×800. Reference = `http://127.0.0.1:3211/andle-portfolio.html`;
build = `http://127.0.0.1:3009/`. All values are computed styles / `getBoundingClientRect` at the
section, after scroll-reveal has fired.

- Reference section: `.section.section-padding-02` containing `.why-choose-section` + `.counter-section`.
- Build section: `#why-choose` (single `<section>`; counters are its last child).

## 1. Reference truth

### Section shell
| Property | Value |
|---|---|
| Section box | y=1520, w=1185, h=822; `padding: 120px 0 0` (at 1200–1599px) |
| Background | transparent (page body `#141414`) |
| Container | `max-width: 1200px; padding: 0 15px` → content width **1155px**, x=15 |
| `.why-choose-section.mt-n3` | `margin-top: -16px` |
| Heading top | 1625 |

### Heading
| Property | Value |
|---|---|
| DOM text | `why choose me` |
| Rendered | **WHY CHOOSE ME** (`text-transform: uppercase`) |
| Font | Zilla Slab, 52px / **62.4px** (1.2), 700 |
| Color | `#89715b` |
| Align | **left** |
| Margin | `0 0 8px` |
| Subtitle | **none** |

### Wrapper / grid
| Property | Value |
|---|---|
| `.why-choose-wrapper` | `padding: 65px 0 100px` |
| Grid | `.row.row-cols-lg-4.row-cols-sm-2.gx-0` — 4 columns, **zero gutters** |
| Grid box | y=1760, w=1155, h=330 |
| Card overlap | each `.service-box` `margin-left: -1px` (collapses shared borders) |

### Service box
| Property | Value |
|---|---|
| Box | **290 × 330**, `min-height: 330px` (all four equal) |
| Padding | **30px** |
| Background | **`#090909`** |
| Border | **1px solid `#313131`**, no radius |
| Layout | `display:flex; flex-direction:column; justify-content:space-between` |
| Fill layer | `::before` absolute inset 0, `#89715b`, `z-index:-1`, `transform:scaleX(0)`, `.3s` |
| Content block | title + description at top |
| Icon block | icon + More at **bottom** |
| Default active | **2nd box** (`web apps`) |
| Hover | JS `mouseover`: remove `.active` from all, add to hovered; **never removed on leave** (last hovered stays) |

### Box content
| Element | Value |
|---|---|
| `h4.title` wrapper | Zilla Slab 21px / 25.2, 500, `rgba(255,255,255,.75)`, margin `0 0 8px` |
| `h4.title a` (visible title) | **Poppins 20px / 1.5, 600, `#fff`, uppercase** |
| `p` | Poppins 14px / 24, `rgba(255,255,255,.75)`, **margin-top 15px** |
| Icon `i` | **48px**, line-height 1, color **`#89715b`** (active: `#fff`) |
| `a.more` | **14px, 600, `#fff`, uppercase**, inline-block, **margin-top 35px**; text `More` (no arrow) |

### Active box (`.active`)
- border-color `#89715b`
- `::before` `scaleX(1)` (bronze fill slides in)
- `p` → `#fff`
- icon → `#fff`
- title and More stay `#fff`

### Counters
| Property | Value |
|---|---|
| `.counter-section` | y=2190, w=1155, h=152; `border-top: 1px solid rgba(255,255,255,.15)`, `padding-top: 70px` |
| `.counter-box` | 365 × 81; `display:flex; align-items:center; flex-wrap:wrap; padding-top:25px` |
| Layout | **number left, label right** (row) |
| `.count` | **Helvetica Neue** (odometer theme), 50px / 50, 600, `#89715b`, inline-block |
| `.counter-content` | `padding-left: 25px` |
| Label `p` | Poppins **16px / 22.4 (1.4), 600**, uppercase, `rgba(255,255,255,.75)`, inline-block |
| Label text | hard `<br>`: `projects <br> live`, `complete &amp; <br> shipped`, `in active <br> development` → **two lines** |
| Numbers | 4 / 2 / 2 |
| Counter row positions | x=15/410/805 (col step 395), number x=15, label x=68 |

### Reveal
- wow.js `fadeInUp`, duration 2s, delays 0.3 / 0.5 / 0.7 / 0.9s; hidden until scrolled into view.

## 2. Build truth

### Section shell
| Property | Value |
|---|---|
| Section box | y=1500, w=1185, h=808; `pt-[120px] pb-0 bg-background` |
| Background | `#141414` |
| Container | `container mx-auto px-4` → Tailwind `max-width: 1024px` → content width **992px**, x=97 |
| Heading top | 1620 |

### Heading
| Property | Value |
|---|---|
| DOM text | `Why Choose Me` |
| Rendered | **Why Choose Me** (no uppercase transform) |
| Font | Zilla Slab, 52px / **52px** (`leading-none`), 700 |
| Color | `#89715b` |
| Align | **center** (`text-center`) |
| Subtitle | **“What I bring to every project”** — 14px, `rgba(255,255,255,.5)`, margin-top 16px |
| Heading block | heading + subtitle + `mb-16` (64px) |

### Grid
| Property | Value |
|---|---|
| Grid | `grid md:grid-cols-2 lg:grid-cols-4 gap-8` — **32px gaps** |
| Grid box | y=1776, w=992, h=254 |
| Columns | 224px wide |

### Card
| Property | Value |
|---|---|
| Card | **224 wide × 226 tall** (4th card 254 because its copy wraps); no fixed height |
| Padding | **24px** (`p-6`) |
| Background | **transparent** (page `#141414` shows through) |
| Border | **1px solid `rgba(255,255,255,.35)`**, **radius 8px** |
| Layout | block: icon → title → description → More (all stacked) |
| Active default | **none** |
| Hover | React `onMouseEnter` sets active index; persists after leave |

### Card content
| Element | Value |
|---|---|
| Icon | inline **SVG 24 × 24**, `stroke: currentColor` → `rgba(255,255,255,.75)`; margin-bottom 16px |
| Title `h3` | **Poppins 20px / 28, 600, `#fff`**, not uppercase; margin-bottom 8px |
| `p` | Poppins 14px / **20**, `rgba(255,255,255,.5)`, **margin-bottom 16px** |
| `a.more` | **14px, 400, `#89715b`**, not uppercase; text **`More →`** (arrow) |

### Active card (hover)
- background → `#89715b` (plain background-color transition, no `scaleX` layer)
- `p` → `#fff`
- `a.more` → `#fff`
- border **stays** `rgba(255,255,255,.35)`
- icon **stays** `rgba(255,255,255,.75)`

### Counters
| Property | Value |
|---|---|
| Wrapper | y=2130, w=992, h=178; `mt-[100px] border-t border-white/15 pt-[70px]` |
| Grid | `grid md:grid-cols-3` — 3 equal columns, 331px |
| Counter cell | block, `padding-top: 25px` |
| Layout | **number above label** (column) |
| `.odometer` number | **Zilla Slab** 50px / 50, 600, `#89715b` |
| Label `p` | Poppins **16px / 24**, 600, uppercase, `rgba(255,255,255,.75)`, **margin-top 8px** |
| Label text | `Projects live`, `Complete & shipped`, `In active development` → **one line** |
| Numbers | 4 / 2 / 2 |

### Reveal
- `Reveal variant="up" duration={2} delay={0.3 + i*0.2}` → same fadeInUp, same delays.

## 3. Delta table (reference → build)

| # | Item | Reference | Build | Verdict |
|---|---|---|---|---|
| 1 | Section container width | 1155 content (max-w 1200 + 15px pad) | **992** (max-w 1024 + 16px pad) | **differs** |
| 2 | Heading text case | `WHY CHOOSE ME` (uppercase) | `Why Choose Me` | **differs** |
| 3 | Heading line-height | 62.4px | 52px | **differs** |
| 4 | Heading align | left | **center** | **differs** |
| 5 | Subtitle | none | **“What I bring to every project”** | **differs** |
| 6 | Heading block spacing | 8px after heading; wrapper 65px above cards | 64px after subtitle | **differs** |
| 7 | Card width | 290 | 224 | **differs** |
| 8 | Card height | 330 fixed (equal) | 226/254 content-driven | **differs** |
| 9 | Grid gap | 0 (borders overlap by -1px) | 32px | **differs** |
| 10 | Card padding | 30px | 24px | **differs** |
| 11 | Card background | `#090909` | transparent (`#141414`) | **differs** |
| 12 | Card border | `1px #313131` | `1px rgba(255,255,255,.35)` | **differs** |
| 13 | Card radius | 0 | 8px | **differs** |
| 14 | Card internal order | content top / icon+More bottom | icon, title, p, More top-down | **differs** |
| 15 | Icon size/color | 48px glyph, bronze | 24px SVG, white-75 | **differs** |
| 16 | Icon artwork | FA bullhorn / ruler-compass / credit-card / live-support | DB / code / cog / bar-chart SVGs | **differs** |
| 17 | Title typography | Poppins 20/30, 600, uppercase | Poppins 20/28, 600, mixed case | **differs** |
| 18 | Body copy color/leading | `.75` white, 24px | `.5` white, 20px | **differs** |
| 19 | Body copy margins | margin-top 15 | margin-bottom 16 | **differs** |
| 20 | More label | `More` (no arrow), 600 uppercase white, mt 35 | `More →`, 400 bronze, no mt | **differs** |
| 21 | Default active | box 2 | none | **differs** |
| 22 | Active fill | `::before` scaleX(1) bronze | background-color bronze | **differs** |
| 23 | Active border | bronze | unchanged | **differs** |
| 24 | Active icon | white | unchanged (white-75) | **differs** |
| 25 | Hover persistence | yes | yes | **same** |
| 26 | Counter layout | number left / label right (flex row) | number above label (block) | **differs** |
| 27 | Counter label lines | 2 (`<br>`) | 1 | **differs** |
| 28 | Counter number font | Helvetica Neue | Zilla Slab | **differs** |
| 29 | Counter label leading | 22.4px | 24px | **differs** |
| 30 | Counter label offset | padding-left 25px | margin-top 8px | **differs** |
| 31 | Counter section spacing | wrapper pb 100px | wrapper mt 100px | **same visual** |
| 32 | Counter hairline | `rgba(255,255,255,.15)` 1px | same | **same** |
| 33 | Counter padding-top | 70px | 70px | **same** |
| 34 | Counter values | 4 / 2 / 2 | 4 / 2 / 2 | **same** |
| 35 | Reveal animation | fadeInUp 2s, .3/.5/.7/.9 | same | **same** |
| 36 | Box copy — box 1 | “Public-facing pages that turn visits into enquiries.” | same | **same** |
| 37 | Box copy — boxes 2–4 | template placeholders (“Bring the beautifully…”, “Bring nature…”, “Consulting solutions…”) | real copy (“Custom applications…”, “Debugging and refactoring…”, “One person, start to finish…”) | **differs (content decision)** |
| 38 | Box titles — boxes 1–2 | `marketing sites`, `web apps` | `Marketing sites`, `Web apps` | same after uppercase |
| 39 | Box titles — boxes 3–4 | `client-first process`, `on-time delivery` | `Fix slow systems`, `Small business focus` | **differs (content decision)** |
| 40 | Section height | 822 | 808 | differs (sum of above) |

## 4. Decision points (need owner ruling before any code)

1. **Copy.** Do the four boxes adopt the reference's exact titles/descriptions (including the
   template placeholder text in boxes 2–4), or keep the build's real copy and match only the visual
   treatment? The reference's boxes 2–4 read as unfilled theme placeholders.
2. **Icons.** Do the boxes use the reference's Font Awesome / IcoFont glyphs (48px bronze), or keep
   the build's inline SVG icons and restyle them to 48px bronze? The reference glyphs need the icon
   fonts; the build currently has no Font Awesome/IcoFont dependency.
3. **Counter number font.** Match the odometer's Helvetica Neue exactly, or keep Zilla Slab (the
   build's brand display face)?

## 5. Smallest change set if the answer is “mirror the reference visually, keep build copy/icons”

1. Section container: `mx-auto w-full max-w-[1200px] px-[15px]` (content 1155 at 1200).
2. Heading: left aligned, uppercase, `leading-[1.2]`; remove subtitle; remove `mb-16`.
3. Wrapper: `pt-[65px] pb-[100px]`.
4. Grid: 4 equal columns, `gap-0`; cards `-ml-px`, `min-h-[330px]`, `p-[30px]`, `bg-[#090909]`,
   `border border-[#313131]`, no radius, flex column `justify-between`.
5. Card content: title/desc top; icon+More bottom; title Poppins 20/1.5 600 uppercase; p 14/24
   `.75` white mt-15; icon 48px bronze; More 14/600 uppercase white mt-35, no arrow.
6. Active: default index 1; `::before` bronze `scaleX` layer + bronze border; p/icon white on active;
   `onMouseEnter` only (persist).
7. Counters: flex row `items-center`, `pt-[25px]`, number 50/1 600 bronze, label 16/1.4 600
   uppercase `.75` with `pl-[25px]`; two-line labels with `<br>`.
8. Keep the existing reveal delays.

Not executed — mapping only.
