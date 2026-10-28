# Ifedike Victor — Portfolio (adapted from Andle)

A personal portfolio for **Ifedike Victor** — "I build and fix software for small businesses" — adapted from the [Andle Bootstrap 5 HTML template](https://htmldemo.net/andle/andle/index.html) and rendered through Next.js 16. The original Andle template's full structure is preserved (every Bootstrap class, every Swiper carousel, every WOW.js scroll-reveal, every Odometer counter, every Isotope filter tab); only the content was swapped. A custom engagement layer adds 9 contextual touchpoints across 6 distinct UI forms.

## Tech stack

- **Framework:** Next.js 16 (App Router, Turbopack)
- **Template:** Andle — Bootstrap 5 HTML (preserved end-to-end, only content swapped)
- **Icon fonts:** Font Awesome 6 free (loaded from CDN — replaces the Andle icon font binaries that are missing from the source)
- **Engagement layer:** Vanilla JS (`/public/andle/engagement.js`) — no jQuery dependency, runs alongside Andle's own jQuery-based `main.js`
- **All images:** Direct Unsplash URLs (no local files), per the Andle README convention

## File structure

```
.
├── SETUP.md                                    ← you are here
├── package.json                                ← Next.js 16 deps
├── tsconfig.json
├── next.config.ts
├── .gitignore
│
├── src/
│   └── app/
│       ├── layout.tsx                          ← Inter / Poppins / Zilla Slab fonts + metadata
│       └── page.tsx                            ← redirect / → /andle-portfolio.html
│
├── public/
│   ├── andle-portfolio.html                    ← the adapted Andle page (the main artifact, ~1000 lines)
│   └── andle/
│       ├── engagement.js                       ← 9-touchpoint engagement layer (~430 lines)
│       └── assets/                            ← copied from the Andle template download
│           ├── css/
│           │   ├── style.css                   ← Bootstrap 5 + Andle theme (427 KB)
│           │   └── plugins/                    ← 9 plugin stylesheets
│           │       ├── animate.css
│           │       ├── fontawesome.min.css
│           │       ├── icofont.min.css
│           │       ├── ionicons.min.css
│           │       ├── line-awesome.min.css
│           │       ├── odometer.min.css
│           │       ├── simple-line-icons.css
│           │       └── swiper-bundle.min.css
│           └── js/
│               ├── main.js                     ← Andle's init script
│               ├── plugins/                    ← 7 plugin JS files
│               │   ├── appear.js
│               │   ├── bootstrap.min.js
│               │   ├── imagesloaded.pkgd.min.js
│               │   ├── isotope.pkgd.min.js
│               │   ├── odometer.min.js
│               │   ├── swiper-bundle.min.js
│               │   └── wow.js
│               └── vendor/                     ← 2 vendor JS files
│                   ├── jquery-3.5.1.min.js
│                   └── modernizr-3.11.2.min.js
│
└── scripts/
    └── build_portfolio.py                      ← content-swap script (rebuilds andle-portfolio.html from the original Andle index.html)
```

## Setup — step by step

### 1. Prerequisites

- **Node.js 18+** and **Bun** (or npm/pnpm — Bun is fastest)
- The original Andle template (the `assets/` folder). It's already included in this packed file under `public/andle/assets/` — copy it directly during step 5.

### 2. Install dependencies

```bash
bun install
```

(Or `npm install` / `pnpm install` if you prefer.)

### 3. Run the dev server

```bash
bun run dev
```

The dev server starts on `http://localhost:3000`. The root route `/` redirects to `/andle-portfolio.html` (the adapted Andle page).

### 4. Verify it works

Open `http://localhost:3000/` in a browser. You should see:
- Hero slider with 3 slides (Interior-deco → Truespec → Athletica)
- About section with "Ifedike Victor" + bio
- Why Choose Me (4 cards)
- Counters (4 / 2 / 2)
- Work section with filter tabs (All / Marketing site / Web app / In-progress)
- Milestones section (2022 / 2025 / 2026)
- Footer with `mifedike@gmail.com` + social links

After 3 seconds, the chat bubble engagement touchpoint should slide in at bottom-right.

### 5. If `public/andle/assets/` is missing

The 19 Andle plugin files (jQuery, Bootstrap, Swiper, animate.css, style.css, etc.) live at `public/andle/assets/`. If they're not present (e.g., you cloned this repo without them), download the Andle template from `https://htmldemo.net/andle/andle/index.html` and copy its `assets/` folder to `public/andle/assets/`.

### 6. Rebuild the adapted HTML (optional)

If you want to regenerate `public/andle-portfolio.html` from the original Andle `index.html` (e.g., after editing the swap rules in the Python script):

```bash
python3 scripts/build_portfolio.py
```

This reads `/home/z/my-project/andle-original/index.html` (the verbatim Andle page — not in this packed file) and writes the adapted output to `public/andle-portfolio.html`. You'll need a copy of the original Andle `index.html` at that path to run the script.

## Content swap map — where to change what

Every slot below is in `public/andle-portfolio.html`. Find the string, swap your value.

| Slot | Current value | Where to change |
|---|---|---|
| Page title | `Ifedike Victor — Software, fixed.` | `<title>` tag in `<head>` |
| Meta description | `I build and fix software for small businesses...` | `<meta name="description">` |
| Hero slide 1 | Interior-deco + Unsplash URL + live link | `.swiper-slide:nth-child(1)` |
| Hero slide 2 | Truespec + Unsplash URL + live link | `.swiper-slide:nth-child(2)` |
| Hero slide 3 | Athletica + Unsplash URL + live link | `.swiper-slide:nth-child(3)` |
| About name | `Ifedike Victor` | `<h3 class="title">` in `.about-section` |
| About bio | 3 paragraphs | `<p class="about-text">` + 2 `<p>` siblings |
| About portrait | Unsplash dark portrait URL | `.about-images` inline `style` |
| Why-choose cards | Marketing sites / Web apps / Client-first / On-time | 4× `<h4 class="title"><a href="#">...</a></h4>` |
| Counter stats | 4 / 2 / 2 + labels | `data-count-to` attrs + `<p>` labels |
| Work section heading | `Work` | `<h2 class="title">` |
| Work filter tabs | All / marketing site / web app / in-progress | `<li><a data-bs-toggle="tab">` items |
| Project cards | Interior-deco / Truespec / Athletica / CP3-legacy | `.single-project-slide .content` |
| Project card images | Unsplash URLs (4 different) | `<img class="fit-image">` |
| Milestones | 2022 / 2025 / 2026 (verbatim) | `.achieved-year` blocks |
| Footer heading | `Let's work together` | `.footer-info-box h4` |
| Footer email | `mifedike@gmail.com` | `.footer-info-box h2 a` |
| Copyright | `© 2026 Ifedike Victor. Built on the Andle template.` | `.footer-copyright p` |
| Social — Twitter | `https://twitter.com/ifedikevictor` (placeholder) | `<a class="twitter">` |
| Social — LinkedIn | `https://linkedin.com/in/ifedike-victor` (placeholder) | `<a class="behance">` |
| Social — WhatsApp | `https://wa.me/2348000000000` (placeholder) | `<a class="dribbble">` |
| Social — GitHub | `https://github.com/lordwhitefire` (real) | `<a class="github">` |
| Nav menu | Home / Work / About / Contact | `.primary-menu ul` and `.main-menu ul` |

## Engagement layer — 9 touchpoints reference

All defined in `/public/andle/engagement.js`. Each fires under a specific condition.

| # | Touchpoint | Trigger | UI form | Once per session? |
|---|---|---|---|---|
| 1 | First-time visitor greeting | 3s after page load | Floating chat bubble (bottom-right) | Yes (sessionStorage) |
| 2 | Returning-visitor variant | visit count > 1 in localStorage | Modifies #1's message → "Welcome back..." | Inherits from #1 |
| 3 | Time-of-day eyebrow | fires immediately on load | Dynamic text injected above hero subtitle | No (always fires) |
| 4 | Halfway banner | scroll past 50% of page | Inline sticky banner (bottom edge) | Yes (sessionStorage) |
| 5 | Idle panel | 45s of no scroll/mouse/click/key/touch | Slide-in panel (right edge) | Yes (sessionStorage) |
| 6 | Exit-intent modal | mouse leaves top of viewport | Centered modal with email CTA | Yes (sessionStorage) |
| 7 | Footer confetti + toast | footer at 60% viewport (IntersectionObserver) | 60-piece confetti burst + bottom-center toast | Yes (sessionStorage) |
| 8 | Project card tooltips | hover over project card title | Native browser tooltip with per-project tagline | No (always available) |
| 9 | Referrer-aware greeting | `document.referrer` contains `linkedin` or `twitter`/`x.com` | Modifies #1's opener → "Saw you came from LinkedIn..." | Inherits from #1 |

### To relax the once-per-session rules (for testing)

In `engagement.js`, find the `hasSeenSession(...)` checks at the top of `showGreetingBubble`, `setupScrollBanner`, `setupIdlePanel`, `setupExitIntent`, and `setupFooterConfetti`. Comment out the `if (hasSeenSession('...')) return;` line in each to make them fire on every load.

## Troubleshooting

- **Icons show as boxes / fallback text** → Make sure the Font Awesome 6 CDN link is in `<head>` of `andle-portfolio.html`. The Andle icon font binaries (IcoFont, Ionicons, Line Awesome) are missing from the source — Font Awesome 6 covers them via class remapping in `build_portfolio.py`.
- **Hero slider doesn't slide** → Swiper needs jQuery to be loaded first. The script load order in `andle-portfolio.html` is: jQuery → Modernizr → Bootstrap → Swiper → appear → Odometer → Isotope → imagesLoaded → WOW → main.js → engagement.js. If any of these 404, check `public/andle/assets/` is fully copied.
- **Engagement touchpoints don't fire** → Open browser DevTools → Application → Session Storage. Clear `ifedike_*` keys and reload. Most touchpoints are once-per-session.
- **Images broken (404 from Unsplash)** → Unsplash occasionally rate-limits. Refresh once; if persistent, swap the URLs in `andle-portfolio.html` for your own image URLs.
- **Counter doesn't animate** → Odometer needs the `appear.js` plugin. Make sure `public/andle/assets/js/plugins/appear.js` exists.

## What's NOT in this packed file

- `node_modules/` — install via `bun install` (or npm/pnpm)
- `.next/` — generated by Next.js on first `bun run dev`
- `.git/` — version control, not source
- The original Andle `index.html` at `/home/z/my-project/andle-original/index.html` — needed only if you want to re-run `scripts/build_portfolio.py` to regenerate the adapted HTML

## License

- Andle template: per the original `https://htmldemo.net/andle/andle/index.html` license (HasThemes)
- Adaptation + engagement layer: yours