# Reference full-page map — andle-portfolio.html

Source: `public/andle-portfolio.html`, served at `http://127.0.0.1:3211/andle-portfolio.html`.
Viewport for all measurements: 1200×800, DPR 1.
Runtime: Chrome on CDP :9222 (browser-attach). Layout values measured live, not read from CSS.

This file is written **as findings are made**, section by section. Nothing is held back for a final write-up.

---

## 0. Page order (runtime, top to bottom)

| # | Section | Class / id | y | height |
|---|---------|-----------|----|--------|
| 1 | Header (fixed) | `div.header.fixed-top` | 0 | 144 |
| 2 | Off-canvas drawer | `.offcanvas-menu` | fixed, off-screen | — |
| 3 | Overlay | `.overlay` | fixed | — |
| 4 | Hero slider | `section.slider-section` | 0 | 820 |
| 5 | Stack + About wrapper | `section.bg-dark.overflow-hidden` | 820 | 700 |
| 6 | Why Choose + counters | `section.section-padding-02` | 1520 | 822 |
| 7 | Work | `section.section-padding-02.mt-n10` | 2292 | 733 |
| 8 | Milestones | `section.section-padding.mt-n1.mb-n2` | 3020 | 965 |
| 9 | Contact / footer | `div.section.bg-dark#contact` | 3975 | 814 |
| — | Back to top | `a.back-to-top` | fixed | — |

Body scroll height 4789. Contact is **outside** `.main-wrapper` (that is why a naive top-level scan misses it).

---

## 1. Header

Element: `div.header.fixed-top` (not a `<header>` tag).

- `position: fixed`, top 0, full width 1185 (1200 viewport − 15 scrollbar), height **144**, `padding: 53px 0`, background **transparent**, `z-index: 1030`, `transition: .3s`.
- Logo: 35×38 image (unsplash URL `photo-1618005182384...`) at x=15, y=53. Wrapped in `a[href="index.html"]`.
- Menu toggler: `a.menu-toggler` (icon `fa-bars`), 23×43 at x=1147, y=49. No visible nav links in the header — only logo + hamburger.
- **State — sticky:** on `scrollTop > 1` the header gets class `sticky`: height drops to **88**, padding **25px 0**, background **#111**. Verified at scrollY 120. Removed at top.
- No other header state.


## 2. Off-canvas drawer + overlay

Drawer `div.offcanvas-menu`:

- 300×800, fixed top 0 right 0, background **#fff**, `z-index: 1130`, `transform: translateX(101%)` (= **303px** off), `transition: .7s`.
- Open (class `open`): x = **885** (1185 − 300), transform 0.
- Close button `a.menu-close` (`fa-times`), 19×33, top-right of drawer (x=1148 when open, y=21).
- Drawer logo block 300×78.
- Links (`.primary-menu`): **Home `#top` · Work `#work` · About `#about` · Contact `#contact`** — Poppins **15px/600 uppercase**, color **#404040**, padding **14px 20px**, each row **52px** tall. Hover color **#89715b** (CSS `.offcanvas-menu .primary-menu ul li:hover > a`).
- Template residue (visible in DOM, invisible on white): `Project #`, `Blog #`, `Contact contact.html` at 14px `rgba(255,255,255,.75)`, plus hidden submenus (Projects, Project Details, Blog, Blog Details). Not part of the intended nav.
- **No Escape handler** on the drawer in the reference (Escape exists only in the exit-intent modal). Close = `.menu-close` click or overlay click.

Overlay `div.overlay`:

- Fixed inset 0, **rgba(0,0,0,.9)**, `z-index: 1120`, `opacity: 0`, `visibility: hidden`, `transition: .7s .5s` (0.5s delay).
- Open (class `open`): opacity 1, visible. Drawer slides immediately, overlay fades in after 0.5s.

Open/close: `.menu-toggler` adds `open` to both drawer and overlay; `.menu-close` or overlay click removes it.

- **Runtime-verified:** link hover measured at **rgb(137,113,91)** (#89715b); open settles at x=885.


## 3. Hero slider

Section `section.slider-section`:

- 1185×820, transparent over `.main-wrapper` (**#141414**), `position: relative`, no background image. (`.bg-dark` sections are **#090909**.)
- Swiper `.slider-active`: **5 slides** = 3 unique + 2 loop duplicates; `effect: "fade"`, `speed: 600`, `loop: true`, prev/next arrows. **No autoplay. No pagination/dots. No counter.**
- Active slide opacity 1, others 0; every slide 1185×820.
- Text-only hero — **no screenshots in the reference**. (Our build's screenshot showreel is an owner-directed deviation.)

Slide content (`.slider-content`, x=15, width 1155, vertically centred). `.slider-content` is opacity 0; only the active slide's content is opacity 1.

| Element | Style | Interior-deco (active at load) | Athletica (has greeting) |
|---|---|---|---|
| `span.engagement-time-greeting` | Inter 500, 13.6px, letter-spacing 3.4px, uppercase, `rgba(255,255,255,.55)`, mb 9.6px | — | y=222 |
| `h4.sub-title` | Poppins 20px/400, #fff, mb 8px | y=239 | y=255 |
| `h1.main-title` | Zilla Slab **100px/700**, line-height 100px, #fff, mb 8px | y=306 | y=322 |
| `p` | Inter 18px/400, line-height 30.85px, #fff, mb 40px, full 1155 width | y=446 | y=462 |
| `a.slider-btn` | Zilla Slab 20px/700 uppercase, #fff | y=552 | y=569 |

- **Initial active slide at load: Interior-deco.** The greeting is injected by engagement.js into the first slide only (Athletica, which loop mode places as the previous duplicate) — one instance, visible only when the Athletica slide is active. The initial view has **no greeting**.
- Slide copy:
  1. **Athletica** — h4 "Affiliate platform — in preview"; p "Being built for a client. Visitors land on a product page, click through to Amazon. <br>Live preview while the affiliate loop is being finished."; link `https://athletica-blond.vercel.app/`.
  2. **Interior-deco** — "Marketing site — live"; "A marketing site for an interior decoration studio. Brand-led layout, public pages, structured to turn visits into enquiries."; `https://interior-deco-kappa.vercel.app/`.
  3. **Truespec** — "Inventory app + public site — live"; "Inventory management on the inside, public catalogue on the outside. Two surfaces, one codebase, no admin friction."; `https://truespec-k4y6.vercel.app/`.
- Arrows: `div.swiper-button-prev` x=981 / `next` x=1088, y=721, 27×44, right 177/70, bottom 55. Icons `ion-ios-arrow-thin-left/right`, **30px**, `rgba(255,255,255,.75)`, hover #fff. No border/background.
- Social (bottom-left): `ul.social` at x=40, y=739 (left 40 / bottom 40), 3 icons **24px**, #fff, hover **#89715b**, hrefs `#` (dead): twitter, facebook, behance. Measured gap ~42px (the CSS writes 45px).
- **States:** slide fade (600ms), arrow hover (white), social hover (bronze), sticky header, drawer open. No autoplay state.
- **Runtime-verified (this pass):** `swiper-wrapper` transition `all`; clicking `next` crossfades to Truespec (mid-transition Truespec slide opacity 0.938, content 1) and settles: active = Truespec, content opacity 1, title `fadeInUp 1s / 1s both`, button `fadeInLeft 1s / 2s both`.


## 4. Stack strip + About (one `bg-dark` wrapper, #090909)

Wrapper: `section.bg-dark.overflow-hidden`, y=820 → 1520, 700 tall, background **#090909**. Contains stack then About; the About image overlaps upward into the strip.

### 4a. Stack strip — `div.client-section.my-stack-section`

- y=820 → 1027 (**207 tall**), `padding-left: 30px`, no heading/subtitle/cards.
- `.container` 1155 at x=30 → `.client-wrapper` **1125** at x=45, `padding: 75px 0`, `border-bottom: 1px solid rgba(255,255,255,.15)`.
- 8 logos, **56×56**, each in `a[href="#"]` (dead), `.image-box` opacity **.5** → **1** on hover (.3s ease).
- Logos: Next.js, TypeScript, Tailwind CSS, Sanity, Supabase, Neon Postgres, Clerk, Vitest.
- Swiper `.client-active`: breakpoints **0→2 (gap 20) / 576→3 (30) / 768→4 (40) / 992→5 (40)**; no autoplay, no loop, no dots. 5 of 8 in view, rest by drag.
- The strip is `position: relative; z-index: 2` (`.client-section`) — its hairline paints **above** the About portrait.
- **Runtime re-verified (this pass):** swiper 1125×56 at x=45 y=895; 8 slides 193px wide, 40px gap, **5 in view**; first logo 56×56 at opacity .5 → **1** on hover, transition .3s.
- Detail: `developer-workspace/notes/2026-10-31-stack-section-map.md`.

### 4b. About — `div.about-section.section-padding.mt-n3.mb-n1#about`

- y=1012 → 1525 (**513 tall**), `padding: 120px 0`, margins `-15px 0 -5px`, relative.
- Image `.about-images`: absolute left 0, **593×595**, y=930 → 1525 (starts **82px above** the section), `background: url(/images/portrait.png) contain no-repeat 100% 100%`; no radius/border/shadow.
- Text column: right half, x=608, width **563** (col-lg-6 x=593 + 15px padding).
- `h3.title` "Makuo Ifedike": Zilla **48/700**, **#89715b**, line-height 57.6, **uppercase**, y=1132.
- Lead `p.about-text`: Poppins **20/400**, white, line 32, y=1226 (**36px below heading**).
- Body paragraphs: Poppins **14/400**, white, line 24; y=1283 and 1356 (**25px gaps**).
- Copy: "I build and fix software for small businesses." / "If something is slow, half-built, or nobody knows how it works anymore — that's the work I take on." / "One person, start to finish. No jargon to hide behind."
- **State — wow reveal:** `.about-content` = `fadeInRight`, 2s, **0.5s delay**; `visibility: hidden` until scrolled into view (wow offset 0).
- **Runtime re-verified (this pass):** section x=0 y=1012 1185×513; image 593×595 at x=0 y=930; col x=593 w=593, content x=608 w=563; h3 y=1132 (48px/58 tall); paragraphs y=1226 / 1283 / 1356. `.about-content` observed `visibility: hidden` at scroll 0 — the reveal is genuinely scroll-gated.
- Detail: `developer-workspace/notes/2026-10-31-about-section-map.md`.


## 5. Why Choose + counters — `div.section.section-padding-02`

- y=1520 → 2342 (**822 tall**), `padding: 120px 0 0`, transparent over `.main-wrapper` **#141414**.
- `.why-choose-section.mt-n3`: x=15, 1155 wide, margin-top -15px.
- Heading `h2.title` **"why choose me"**: Zilla **52/700**, **#89715b**, uppercase, line 62.4, mb 8, y=1625. No subtitle.
- 4 service boxes in a `row-cols-lg-4` grid, gx-0: each **290×330** at y=1760/1761, x=14 / 303 / 592 / 880; `padding: 30px`; `border: 1px solid #313131`; `background: #090909`; `position: relative; z-index: 2`.
- Box content: `h4.title a` Poppins **20/600 uppercase white**; `p` Poppins **14/400**, line 24, `rgba(255,255,255,.75)`; icon **48px** bronze #89715b; `a.more` "More" **14/600 uppercase white**, margin-top 35. All links `href="#"` (dead).
- Boxes (copy is **template placeholder text**, not rewritten):
  1. **marketing sites** — "Public-facing pages that turn visits into enquiries." — `fa-bullhorn`
  2. **web apps** — "Bring the beautifully for your house. Just enjoy!." — `icofont-ruler-compass-alt` — **has `active` by default**
  3. **client-first process** — "Bring nature in your house. Health is important" — `icofont-credit-card`
  4. **on-time delivery** — "Consulting solutions and make plan to renovation" — `icofont-live-support`
- **State — active/hover:** each box has a `::before` bronze **#89715b** layer, `scaleX(0)` → `scaleX(1)` (.3s). `.active` gets bronze fill, border #89715b, icon white, p white. On `mouseenter`, JS removes `.active` from the previous box and adds it to the hovered one; **it does not restore on mouseleave** — the last hovered box stays active. Verified: hover box 1 → box 1 active; hover box 3 → box 3 active; leaving → box 3 still active.
- **State — wow:** each box `fadeInUp`, 2s, delays **0.3 / 0.5 / 0.7 / 0.9s**.
- Counters `.counter-section`: y=2190, 1155 wide, `border-top: 1px solid rgba(255,255,255,.15)`, `padding-top: 70px`; 3 boxes 365 wide at y=2261, padding-top 25.
- Numbers: **4 / 2 / 2**, 50px/600 **#89715b**, `data-count-to="4|2|2"`, odometer animates when scrolled into view (digit spacer "8" is hidden — do not read it as a digit).
- Labels: **PROJECTS LIVE / COMPLETE & SHIPPED / IN ACTIVE DEVELOPMENT**, 16px/600 uppercase `rgba(255,255,255,.75)`.


## 6. Work — `div.section.section-padding-02.mt-n10`

- y=2292 → 3025 (**733 tall**), `padding: 120px 0 0`, `margin-top: -50px` (overlaps Why Choose by 50px), transparent over **#141414**.
- Header row: title **"Work"** (col-xl-3) at x=15, y=2438, **52/700 #89715b uppercase**; tabs (col-xl-9) at x=311, y=2469.
- Tabs `.work-tabs-menu`: **All · marketing site · web app · in-progress** → `#tab1..#tab4`. Poppins **16/600 uppercase**; inactive `rgba(255,255,255,.75)`, active/hover **#fff**; 1px white underline via `::before` (opacity 0 → 1, .3s). `li` padding 0 30px, mb 10. All tab: active by default.
- `.work-tab-content` padding-top **68** → carousel y=2576.
- Tab panes: inactive `height:0; opacity:0; visibility:hidden`; active gets **fadeInUp 0.8s**.
- **All four tab panes contain the same four projects** — the tabs do not filter anything; switching only replays the pane animation. Verified: tab2 content identical to tab1.
- Carousel `.tab-carousel`: 1185×448, `background: rgba(255,255,255,.35)` (shows as 1px gaps), Swiper `loop: true`, `slidesPerView: 4`, `spaceBetween: 1`, breakpoints **0→1 / 576→2 / 768→2 / 992→3 / 1200→4**. 12 slides in DOM (4 originals × 3 loop copies). Pagination element exists but is **`d-none`** (display none).
- Cards: **296×449** (image 296×449 from a 480×730 crop); content absolute bottom, **padding 30px**, 136 tall; subtitle Poppins **14/400 white**; title Poppins **34/600 white**, margin-top 10; title link → real project URL; thumb link → `project-details.html` (dead template page).
- Thumb overlay `rgba(0,0,0,.35)` is **always on**, not a hover effect.
- **State — hover card:** `.content::before` (#141414) grows `height: 0 → 100%` (**135.6px**) over **.6s**; title link → **#89715b**; subtitle → `rgba(255,255,255,.75)`; no image zoom/rotate.
- **State — hover carousel (arrows):** arrows 40×40 at left/right **10px**, icons 30px white, `opacity:0; visibility:hidden`; on carousel hover icons become visible with bg **#333**, prev/next move to left/right **70px**; icon hover bg **#89715b**.
- Projects:
  1. **Interior-deco** — Marketing site — `https://interior-deco-kappa.vercel.app/` — unsplash `photo-1502672260266...`
  2. **Truespec** — Web app — `https://truespec-k4y6.vercel.app/` — unsplash `photo-1600607687939...`
  3. **Athletica** — In progress — `https://athletica-blond.vercel.app/` — unsplash `photo-1497366754035...`
  4. **CP3-legacy** — In progress — `https://cp3-legacy.vercel.app/` — unsplash `photo-1497366811353...`
- **Reference defect:** the Interior-deco unsplash image returns **HTTP 404** — at runtime the first card collapses to 24px with a broken-image glyph. The other three load 480×730. Do not copy the broken image; the build uses a working one.

## 7. Milestones — `div.section.section-padding.mt-n1.mb-n2`

- y=3020 → 3985 (**965 tall**), `padding: 120px 0`, margins **-5px 0 -10px**, transparent over **#141414**. Contains an inner `.section` (y=3140, 725 tall, no padding).
- Title **"Milestones"**: Zilla **52/700 #89715b uppercase**, centred, y=3140.
- 3 rows `.achieved-year`, `padding-top: 57px`, wow `fadeInUp` 1.5s delays **.3 / .5 / .7s**. No borders between rows.
- Grid per row: year `col-lg-3` (content x=15, 266 wide) · item `col-lg-9` (x=311, 859 wide). Year p: Inter **18/400 white**. Sub-title: Inter **18/400**. Title: Zilla **36/700**, line 43.2, `rgba(255,255,255,.5)`; `<span>` inside is **#fff**; link hover → **#fff**.

| Year | Row (y / h) | Sub-title (colour) | Title (dimmed part + white span) | Link |
|---|---|---|---|---|
| **2022** | 3228 / 169 | Started (**#89715b**) | "Started writing code. **No degree, no bootcamp.**" | `#about` |
| **2025** | 3398 / 212 | Production (**#f58344**) | "First site in production — **Lighthouse 99 performance, 100 SEO.**" | interior-deco (external) |
| **2026** | 3613 / 255 | Build (**#feae01**) | "Built a complete dealership system alone in five weeks: **26 database migrations, back office, auth, PDF enquiries.**" | `#work` |

## 8. Contact / footer — `div.section.bg-dark#contact`

- y=3975 → 4789 (**814 tall**), background **#090909**, no padding on the section itself. Starts 10px above the Milestones end (Milestones has `margin-bottom: -10px`).
- `.footer-info-box`: 1155 wide, **`padding: 275px 0 195px`**, `text-align: center`.
- `h4.title` **"Let's work together"**: Inter **24/400**, `rgba(255,255,255,.5)`; wow `fadeInUp`, 2s, delay **.3s**.
- `h2.mail a` **"mifedike@gmail.com"** → `mailto:`; Zilla **60/700 #89715b**, `margin-top: 10px`, inline-block; **hover #fff**; wow `fadeInUp`, 2s, delay **.5s**; measured 565×72 at x=310.
- `.footer-copyright-social`: flex, space-between, **padding-top 100**, **padding-bottom 70**; y=4572.
  - copyright p: Poppins **14/400 white-75** — "© Makuo Ifedike built by whitefire" (no link).
  - socials: **Twitter** `#00ccff`, **LinkedIn** `rgba(255,255,255,.75)`, **Github** `#fff`; 16px; 35px gaps; hover **#89715b** (`.social li a:hover`); external links to x.com/linkedin/github.
- Back-to-top `a.back-to-top`: **50×50**, fixed right 50 / bottom 50, bg **#090909**, white, `box-shadow: 0 0 7px rgba(255,255,255,.1)`, z 28, `display: none` at top. Appears at **scrollY > 600** via `fadeIn(200)`; click animates to top over **1500ms**; hover bg **#89715b** (settled after the 0.5s ease-in-out transition). Icon `fa-arrow-up`. At ≤575: 35×35, right/bottom 20.
- **Runtime-verified:** `display: block` at scrollY 4300, hover settles at #89715b.
- **State:** reaching the footer fires the confetti + toast (engagement #7).

## 9. Engagement layer — 9 touchpoints, injected by `engagement.js`

Styles are injected at runtime into `<style data-engagement>` (not in the page stylesheet).

Persistence:

- `localStorage.ifedike_visit_count` — incremented on **every** load.
- `sessionStorage` keys: `greeting_shown`, `scroll50_shown`, `idle_shown`, `exit_intent_shown` — each allows its touchpoint **once per session**.

| # | Trigger / condition | What happens |
|---|---|---|
| 1 | 3s after load, once per session | Floating chat bubble bottom-right, 340px, `#1a1613`, z 9999. Head "Ifedike" (#f58344) + ×; buttons **See the work** (#work), **About me** (#about, ghost), **Talk** (#contact, ghost). Auto-dismiss **14s**; close ×. Slide-in .35s. |
| 2 | `visits > 1` (returning visitor) | Bubble message becomes "Welcome back. Athletica went into preview since you last visited." |
| 3 | Time of day | Greeting span above the first hero slide's `.sub-title`: **"Good morning."** (<12) / **"Good afternoon."** (<18) / **"Good evening."** + " Software, fixed." Inter .85rem/500, letter-spacing .25em, uppercase, white-55; fade-in .8s .3s. Only one instance — it lives in the Athletica slide, so it is only visible when that slide is active (initial slide Interior-deco has no greeting). |
| 4 | `(scrollY + innerHeight) / scrollHeight ≥ .5` (scroll/resize + 1.5s after load), once per session | Full-width sticky bottom banner, `#1a1613`, top border rgba(245,131,68,.25), z 9998. "Halfway through. Want me to just show you the work?" + **Jump to projects →** (#work) + ×. Slides up .35s. |
| 5 | **45s idle** (timer resets on scroll/mousemove/click/keydown/touchstart), once per session | Right slide-in panel, 340px, vertically centred, `#1a1613`, z 9999. "Still here?" / "Want me to walk you through the work in 30 seconds?" + **Yes, show me** (#work) / **No thanks** + ×. |
| 6 | Exit intent: `mouseout` with `clientY <= 0` and no `relatedTarget`, once per session | Centered modal, overlay rgba(0,0,0,.7), z 10000; card 440px max, `#1a1613`. "Leaving already?" / "If you've got a half-built thing, drop a link — I'll take a look." + mailto CTA + "One person, start to finish." Close × / overlay / **Escape**. |
| 7 | `.footer-info-box` 60% visible (IntersectionObserver), once per page load | 60 confetti pieces (colors #89715b, #f58344, #feae01, #da2929, #fff) for 2s + toast **"You saw everything. The contact strip is just above ↑"** for **8s**. |
| 8 | Work card title hover | Native `title` tooltip: Interior-deco "Marketing site for an interior decoration studio"; Truespec "Inventory + public site, two surfaces, one codebase"; Athletica "Affiliate platform in preview for a client"; CP3-legacy "Athlete-focused software in development". |
| 9 | Referrer contains linkedin / twitter / x.com | Bubble opener becomes "Saw you came from LinkedIn — what's the project?" or "Saw you came from Twitter — what's the project?" |

Bubble default message: "Hey — quick question: are you here for a marketing site, a web app, or fixing something that's broken?"

**Runtime-verified (this pass, all nine):**

- 3s after load with cleared storage → bubble `#engagement-bubble`, class `eng-bubble--visible`, **340×195 at x=821** (right 24 / bottom 24), bg #1a1613, z 9999, default message and the three route buttons as mapped. Close × removes it. Suppressed on a later reload **within the same session**.
- `localStorage.ifedike_visit_count = "1"` then reload → message becomes **"Welcome back. Athletica went into preview since you last visited."** Greeting at hour 11 → "Good morning. Software, fixed.".
- Scroll past 50% → `#engagement-banner`, class `eng-banner--visible`, **1185×68**, transform translateY(0), z 9998, "Halfway through…" + "Jump to projects →".
- Footer visible → **60** `.eng-confetti-piece` + toast "You saw everything. The contact strip is just above ↑".
- Exit intent (dispatched `mouseout`, clientY ≤ 0, no relatedTarget) → modal `eng-exit--visible`, "Leaving already?", mailto CTA, "One person, start to finish."; **Escape closes it**.
- 45s idle, zero interaction → `#engagement-panel`, class `eng-panel--visible`, **340×219 at x=821 y=291** (right 24, vertically centred), z 9999, "Still here?" + "Want me to walk you through the work in 30 seconds?" + Yes/No buttons.
- Work card tooltips confirmed on the DOM: Interior-deco → "Marketing site for an interior decoration studio".
- Referrer-aware branch (#9) not exercised — needs an incoming referrer; read from code only.

## 10. States inventory — the complete list

**What they are called:** UI states / interaction states. The conditional layer here splits into four kinds:

1. **Interaction states** — `:hover`, `:active`, `:focus`, `.active`, `.open`, `.show`.
2. **Scroll states** — sticky header (`>1px`), back-to-top (`>600px`), wow reveals (offset 0), odometer counters (on view), work pane `fadeInUp`, footer confetti (60% visible), 50%-scroll banner.
3. **Time / session states** — 3s bubble + 14s auto-dismiss, time-of-day greeting, 45s idle, exit intent, once-per-session keys, localStorage visit count.
4. **Responsive states** — breakpoints below.

### Interaction states found

| Element | State | Effect |
|---|---|---|
| Off-canvas links | hover | #404040 → **#89715b** |
| Stack logo `.image-box` | hover | opacity **.5 → 1** (.3s) |
| Work tab links | hover / `.active` | white-75 → **#fff**, 1px white underline fades in |
| Work card | hover | `.content::before` #141414 grows **0 → 100%** (.6s); title → **#89715b**; subtitle white-75 |
| Work carousel | hover | arrows fade in, bg #333, slide from 10px → **70px** inset |
| Work arrow icon | hover | bg **#89715b** |
| Why-Choose service box | hover / `.active` | bronze `::before` `scaleX(0) → 1`; icon/p white; border #89715b. **Stays on the last hovered box** (no restore on leave) |
| Hero arrows | hover | icon white-75 → **#fff** |
| Hero social | hover | #fff → **#89715b** |
| Hero slide | `.swiper-slide-active` | content opacity 0 → 1; children stagger: sub-title fadeInUp .5s/1.3s, title fadeInUp 1s/1s, p fadeInUp 1.5s/1s, button fadeInLeft 2s/1s |
| Contact mail | hover | #89715b → **#fff** |
| Footer socials | hover | their colour → **#89715b** |
| Back-to-top | hover | bg **#89715b** |
| Drawer / overlay | `.open` | drawer translateX(101%) → 0 (.7s); overlay opacity 0 → 1 (delay .5s) |
| Header | `.sticky` (scroll > 1) | height 144 → **88**, padding 53 → **25**, bg transparent → **#111** |
| Back-to-top | scroll > 600 | display none → block (fadeIn 200ms) |

### Motion preference

- `prefers-reduced-motion: reduce` appears 25 times, but only for **Bootstrap** components (buttons, forms, modals, carousels, offcanvas, `.fade`).
- The template's own animations — wow.js reveals, hero stagger, odometer, engagement bubble/banner/panel/modal/confetti/toast — are **not** disabled by reduced motion.

### Verification status (honest accounting)

- **Exercised at runtime this session (measured, not assumed):** every hover row in the table above, drawer open/close and link hover, sticky header, hero arrow click and crossfade + the four staggered entrance animations, work tab switch, work card hover, work carousel arrow reveal, service-box active/leave behaviour, odometer final values, sticky back-to-top + its hover, milestones link hover, mail hover, the About reveal gate (`visibility: hidden` un-scrolled), the Work `title` tooltips, and all nine engagement touchpoints (bubble at 3s, returning-visitor message, time-of-day greeting at hour 11, 50% banner, idle panel at 45s, exit modal + Escape, footer confetti + toast, suppressed-after-session bubble).
- **Read from source, not exercised:** default form states (`:focus` / `:active` / `:disabled` — no interactive form exists on the page), the `prefers-reduced-motion` rules, the breakpoint-specific values in the table below, the referrer branch (#9), the 1500ms back-to-top scroll animation, and the odometer's mid-animation digits.

### Responsive breakpoints

- Template: **≤575 · 576–767 · 768–991 · 992–1199 · 1200–1599 · ≥1600** (plus Bootstrap 575.98/767.98/991.98/1199.98/1599.98).
- Swiper: **576 / 768 / 992 / 1200**.
- Key changes:
  - Header padding 53 → **33** at ≤767 (height 144 → 104).
  - Hero h1: 130 base → **100** at 992–1599 → **80** at 768–991 → **70** at ≤767 → **40** at ≤575.
  - Hero sub-title 24 → 20 → 18 → 16; p margins 50/75 → 40/40 → 30/30; p 16px ≤767.
  - Section titles: 52 → **40** → **28**.
  - Work carousel: **4 / 3 / 2 / 2 / 1** slides per view (1200/992/768/576/0).
  - Stack carousel: **5 / 4 / 3 / 2** (992/768/576/0).
  - About: `col-lg-6` stacks below 992; section `position: relative` at ≤767 (image no longer absolute).
  - Why Choose: 4 cols → 2 (sm) → 1; boxes lose negative margins.
  - Footer info padding: 275/195 → **230/150** (992–1199) → **200/120** (768–991) → **180/100** (≤767) → **150/70** (≤575); mail 60 → 40 → 20.
  - Back-to-top 50×50 → **35×35** at ≤575.
