# Project Facts — GitHub and Live Verification

**Date:** 2026-10-26  
**Purpose:** Replace guessed project descriptions with evidence from the owner’s GitHub profile and the live sites. This is a source note for `decisions.md` and `portfolio-six-layer-plan.md`, not a new plan.

**Sources checked**

- GitHub profile: `https://github.com/lordwhitefire?tab=repositories`
- Repositories: `interior-deco`, `truespec`, `athletica`, `cp3-legacy`
- Live sites: the four Vercel URLs below
- Readme / package / source evidence: each repo’s `README.md`, `package.json`, route tree, and where available the Truespec OpenSpec proposal

**What was verified:** repository existence, public metadata, package stack, route/feature inventory, live HTTP status and page title/description. **Not verified:** private analytics, client contracts, revenue, real user counts, or whether any project is commercially launched. Those must not be claimed.

**Public-copy rule (owner, 2026-10-26):** case studies contain **no outcome numbers**. The counts below are internal evidence only; public copy describes scope in words.

---

## The four projects

| Project | What it actually is | Stack evidenced | Status | Live |
|---|---|---|---|---|
| **Interior-deco** | Interior design studio website for the brand **Whitefire Interior** — services, projects, blog, team, testimonials, FAQ, contact, newsletter | Remix 2, TypeScript, Tailwind 3, Sanity CMS, Swiper, Vercel | Live | `https://interior-deco-kappa.vercel.app/` |
| **Truespec** | Dealership system for a Nigerian vehicle-import business: public showroom plus private office | Next.js 15, TypeScript, Neon Postgres, Clerk, Sanity, Vercel | Live | `https://truespec-k4y6.vercel.app/` |
| **Athletica** | Football store / e-commerce platform with storefront, cart, checkout, accounts, orders, admin, and Amazon affiliate settings | Next.js 16, TypeScript, Supabase, Sanity, Tailwind 4, Sentry, Vercel | Live preview | `https://athletica-blond.vercel.app/` |
| **CP3-legacy** | Chris Paul fan site / sports experience — news, stats, biography, gallery, shop, account | Next.js 16, TypeScript, Tailwind 4, shadcn/ui, Sanity, Prisma, next-auth, Vercel | Live | `https://cp3-legacy.vercel.app/` |

---

## Wider project inventory — 15 counted projects (2026-10-27)

The four projects above remain the **featured** set for the portfolio. The scraper verified 15 non-forked public repositories owned by `lordwhitefire`; 20 forks and one empty repo (`Makuo_Ifedike`, size 0, no commit) were excluded. The full inventory with sources is in `research/profile-data.json`.

### Featured, verified live

| Project | What it is | Stack | Status | Live |
|---|---|---|---|---|
| **Interior-deco** | Interior design studio website for the **Whitefire Interior** brand | Remix, Sanity, Tailwind 3, Vercel | Live | `https://interior-deco-kappa.vercel.app/` |
| **Truespec** | Dealership system: public showroom + private office, inventory, enquiries, cost/profit tracking, auth, PDF import | Next.js 15, Neon Postgres, Clerk, Sanity, Vercel | Live — flagship | `https://truespec-k4y6.vercel.app/` |
| **Athletica** | Football store: storefront, cart, checkout, orders, accounts, admin, Amazon affiliate settings | Next.js 16, Supabase, Sanity, Tailwind 4, Vercel | Live preview | `https://athletica-blond.vercel.app/` |
| **CP3-legacy** | Chris Paul fan site: news, stats, biography, gallery, shop, account | Next.js 16, Tailwind 4, shadcn/ui, Sanity, Prisma, next-auth, Vercel | Live | `https://cp3-legacy.vercel.app/` |

### Other live

| Project | What it is | Stack | Status | Live |
|---|---|---|---|---|
| **new-portfolio** | FireSage Studio site, derived from the Andle template | HTML, CSS, Bootstrap, JavaScript, Vercel | Live (template-derived) | `https://new-portfolio-eta-rouge.vercel.app/` |
| **eliphany-ng** | Supplement store | Astro, React, TypeScript, Sanity, Tailwind CSS, Vercel | Live | `https://eliphany-ng.vercel.app/` |
| **eliphany-admin** | Eliphany admin demo | React, JavaScript, Tailwind CSS, Sanity | Demo | `https://eliphany-admin.vercel.app/` |
| **Admin-demo** | Admin demo (same admin code as eliphany-admin) | React, JavaScript, Tailwind CSS, Sanity | Demo | `https://admin-demo-seven.vercel.app/` |
| **odin-landing-page** | Landing page experiment | HTML, CSS | Live (experiment) | `https://odin-landing-page-chi.vercel.app/` |
| **freecodecamp_project_4** | freeCodeCamp project page | HTML, CSS | Live (experiment) | `https://freecodecamp-project-4.vercel.app/` |

### Unreleased / supporting

| Project | What it is | Stack | Status |
|---|---|---|---|
| **agentic-video-system** | Video agent system | Python, LangGraph, FastAPI, TypeScript, Mermaid, OpenCode | In progress |
| **interior-deco-cms** | Sanity CMS for Interior-deco | Sanity, React, TypeScript | In progress |
| **youtube-analytics** | YouTube analytics experiment | Next.js, React, TypeScript, Google OAuth | Experiment |
| **online-store** | Store (appears template-derived) | Next.js, React, TypeScript, Prisma, Clerk, next-auth | Unknown |
| **lordwhitefire** | Profile README | Markdown | Unknown |

**Excluded:** 20 forks (full list in `profile-data.json.excluded_forks`) and one empty repo `Makuo_Ifedike`.

**Client relationships:** none verified for any project. Do not claim client work for Interior-deco, Truespec, Athletica, Eliphany, or any other project.

**Owner identity (2026-10-27):** lives in Onitsha and Oka, Anambra State, Nigeria. Graduation: 2025 — B.Eng Chemical Engineering, Nnamdi Azikiwe University (planned 2024, finished 2025).

## Evidence by project

### 1. Interior-deco

**Repository:** `https://github.com/lordwhitefire/interior-deco`  
**Live title:** “Whitefire Interior — Amsterdam Interior Design Studio”  
**Live description:** “Whitefire Interior — an Amsterdam interior design studio creating beautiful, functional spaces for homes and businesses.”

**What the repo says**

- The README describes a production-grade, CMS-driven website for **Whitefire Interior**, an Amsterdam interior design studio.
- 13 public routes: home, about, services (index + 8 detail pages), projects (index + detail), blog (index + detail), team (index + detail), testimonials, FAQ, contact, privacy.
- Sanity is the single source of truth; content is fetched via GROQ.
- Newsletter and contact forms write to Sanity, with validation, honeypot, and in-memory rate limiting.
- SEO: canonical URLs, Open Graph/Twitter, JSON-LD `Organization` and `LocalBusiness`, sitemap of 50 URLs, robots, `llms.txt`.
- The README lists known production issues: `/blog` 500 and blog/team/service detail pages 404. **Checked 2026-10-26:** `/blog`, `/services`, and `/projects` returned 200, so those notes may be stale or route-specific. Do not repeat the known-issues claim without re-checking the exact route.

**Portfolio label**

> Interior design studio site — a CMS-driven marketing site with services, projects, blog, team, testimonials, and contact forms.

**Do not say**

- “Client work” unless the owner confirms a client relationship. The repo and live site show the **Whitefire Interior** brand, not a client contract.
- “Whitefire is my studio.” The portfolio identity is **Makuo Ifedike** (decided 2026-10-27; legal name Victor Makuo Ifedike stays in structured data only). Whitefire is dropped until registered and operating as a studio.

---

### 2. Truespec

**Repository:** `https://github.com/lordwhitefire/truespec`  
**Live title:** “TrueSpec — cars you can trust”  
**Live description:** “A Nigerian vehicle-import showroom: browse, judge a car completely, chat on WhatsApp.”

**What the repo says**

- Public showroom and private office for a Nigerian vehicle-import business.
- The architecture proposal names the stack: **Next.js + TypeScript, Neon (Postgres), Clerk (auth), Sanity (images and enquiry PDFs), Vercel**.
- The public side has home, inventory, car detail, privacy, and WhatsApp conversion. The office has dashboard, inventory, car create/edit, drafts, enquiries, settings, activity, sign-in, and sign-out.
- **26 database migrations** are present (`migrations/0001_people.sql` through `0026_enquiry_pdf_unique.sql`).
- Money is integer kobo, no exchange rate; costs never reach the browser — a server-side allow-list serializer is the boundary.
- Car states, enquiry states, PDF enquiry import, WhatsApp tap tracking, and one-owner auth are all in the specs.
- The repo has no root README; the architecture lives in `openspec/changes/truespec-architecture/` and `product-management/`.

**Portfolio label**

> Dealership system — a public showroom and private back office for a vehicle-import business, with inventory, enquiries, cost and profit tracking, auth, and PDF import.

**Proof points that are true — internal evidence; public copy uses no numbers**

- 26 database migrations (internal count; public copy says “documented migration history”).
- Public showroom + private office.
- Clerk auth, Neon Postgres, Sanity media/PDF storage.
- Cost-leak boundary: public data is produced by an allow-list serializer.
- WhatsApp tap tracking.
- PDF enquiry import.
- Live at `https://truespec-k4y6.vercel.app/`.

**Do not say**

- “Inventory app.” It is a dealership system with a public showroom and a back office.
- “Marketplace” or “multi-dealer.” The specs describe one owner, one business.

---

### 3. Athletica

**Repository:** `https://github.com/lordwhitefire/athletica`  
**Live title:** “Athletica | Football Store”  
**Live description:** “The ultimate football store. Shop football boots, goalkeeper gloves, footballs, shin guards, training wear and more.”

**What the repo says**

- A football store, not only an affiliate platform.
- Storefront routes include boots, multi-stud boots, indoor shoes, shin guards, balls, socks, jerseys, kits, apparel, clothing, cart, checkout, login, register, account, orders, returns, privacy, terms, and cookies.
- Admin routes include dashboard/overview, products, brands, categories, homepage, navigation, media, models, import center, analytics (overview, products, traffic), affiliate settings, settings, system health, and login.
- Stack: Next.js 16, React 19, Supabase, Sanity, Tailwind 4, Sentry, Vitest, Playwright, Vercel.
- The admin has an **Amazon affiliate settings** screen: associate ID, affiliate tag, marketplace, link type, locale, cart redirect, new-tab behavior, generated affiliate URL, product selector, save/test/copy actions.

**Portfolio label**

> Football store — a full e-commerce build with storefront, cart, checkout, accounts, orders, admin, analytics, and Amazon affiliate settings.

**Proof points that are true**

- Storefront and admin in one app.
- Supabase auth/data, Sanity content, Tailwind 4, Next.js 16.
- Cart, checkout, orders, account, returns.
- Admin product/brand/category/media/import/analytics screens.
- Amazon affiliate settings with generated affiliate URLs.
- Live preview at `https://athletica-blond.vercel.app/`.

**Do not say**

- “Affiliate platform” as if that is the whole product. It is a football store with an affiliate feature.
- “Launched” or “revenue-generating.” There is no evidence of commercial launch.

---

### 4. CP3-legacy

**Repository:** `https://github.com/lordwhitefire/cp3-legacy`  
**Live title:** “CP3 Legacy”  
**Live description:** “Celebrating 19 seasons of greatness — from Wake Forest to the Hall of Fame. Welcome to the ultimate Chris Paul fan destination.”

**What the repo says**

- The live site is a **Chris Paul fan destination**: news, player overview, full statistics, biography, related news, gallery, shop (“Your Bag”), account, wishlist, currency/language controls.
- Stack: Next.js 16, React 19, Tailwind 4, shadcn/ui, Sanity, Prisma, next-auth, Sonner, Vercel Analytics/Speed Insights.
- The repo README calls it a “personal portfolio and hire-me funnel” — that is stale or generic. The live metadata and page content say Chris Paul fan site.
- The page includes a hidden text block with the owner’s name, GitHub, LinkedIn, and a developer bio. The visible site is not a portfolio.

**Portfolio label**

> Sports fan experience — a Chris Paul fan site with news, stats, biography, gallery, shop, and account.

**Proof points that are true**

- Next.js 16 + Tailwind 4 + shadcn/ui.
- Sanity content, Prisma, next-auth.
- News, stats, biography, gallery, shop, account.
- Live at `https://cp3-legacy.vercel.app/`.

**Do not say**

- “Athlete-focused software.” It is a fan site / sports experience.
- “In development.” The site is live.
- “Commercial product” or “official Chris Paul site.” There is no evidence of affiliation.

---

## Cross-project proof points

| Capability | Evidence across the four |
|---|---|
| **Next.js** | Truespec, Athletica, CP3-legacy |
| **Remix** | Interior-deco |
| **TypeScript** | All four |
| **Sanity CMS** | All four |
| **Tailwind** | Interior-deco (v3), Athletica (v4), CP3-legacy (v4) |
| **Vercel** | All four |
| **Postgres / data** | Truespec (Neon), Athletica (Supabase), CP3-legacy (Prisma) |
| **Auth** | Truespec (Clerk), Athletica (Supabase), CP3-legacy (next-auth) |
| **Forms** | Interior-deco (contact/newsletter), Truespec (enquiries), Athletica (checkout/account), CP3-legacy (account) |
| **Admin / back office** | Truespec (office), Athletica (admin), Interior-deco (Sanity Studio), CP3-legacy (Sanity schemas) |
| **Commerce** | Athletica (cart/checkout/orders), CP3-legacy (shop bag) |
| **Affiliate** | Athletica (Amazon affiliate settings) |
| **Media / PDF** | Truespec (Sanity images + enquiry PDFs), Interior-deco (Sanity images) |

**This is the real story:** four live projects, all TypeScript, all Sanity, three Next.js and one Remix, with auth, commerce, back office, CMS, and media handling. The portfolio should show that range, not repeat “inventory app” and “affiliate platform.”

---

## Corrections to the current portfolio copy

| Current copy | Correct copy |
|---|---|
| Athletica — affiliate platform | Athletica — football store with storefront, checkout, admin, and Amazon affiliate settings |
| CP3-legacy — athlete-focused software — in development | CP3-legacy — Chris Paul fan site / sports experience — live |
| Truespec — inventory app + public site | Truespec — dealership system: public showroom + private office, documented migration history, auth, PDF enquiries |
| Interior-deco — generic marketing site | Interior-deco — interior design studio site for Whitefire Interior, Remix + Sanity, 13 routes |

---

## Screenshot notes

- **Interior-deco:** public pages are available; capture home, services, projects, and blog. The live site is branded Whitefire Interior.
- **Truespec:** public home, inventory, car detail, privacy. The office needs the owner’s login; do not use a fake login screen as proof. If the owner provides screenshots or a demo login, capture dashboard, inventory, car form, enquiries, and settings.
- **Athletica:** public home, category, product, cart, checkout; admin login is public but the admin screens need credentials. Capture the storefront; use owner screenshots for admin if available.
- **CP3-legacy:** public home, news, stats, biography, gallery, shop.

---

## What this changes in the plan

- Truespec remains the flagship and the first case-study modal.
- Athletica’s case study is about a football store and admin, not a generic “affiliate platform.”
- CP3-legacy is a live fan experience, not an in-development athlete tool.
- Interior-deco is a real Remix + Sanity marketing build; do not present Whitefire as the owner’s studio or a client without confirmation.
- The project grid has a stronger range story: CMS, commerce, auth, back office, media, and public-facing marketing.

**No further questions are needed for these facts.** Case-study outcomes are intentionally number-free; the remaining gaps are the owner’s public copy choices, not project identity.
