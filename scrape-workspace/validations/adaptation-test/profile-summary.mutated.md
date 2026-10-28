# Public profile research — Makuo Ifedike

**Generated:** 2026-10-27T10:52:00Z  
**Job:** Public-information gathering for the Makuo Ifedike portfolio, from product-management/scraper-handoff.md  
**Classification:** data layer (public identity + project inventory), with live-site verification; no UI work  
**Output:** `profile-data.json` (this folder) and this summary.

**Method.** GitHub public API for the repository inventory (one paginated call covering all 36 public repositories, plus file trees and raw README/manifests); the owner's public sites captured in the real shared Chrome window (DOM, JSON-LD, links, screenshots); public search for profiles and confirmed deployments; the public resume PDF; and the workspace documents listed in the source ledger. LinkedIn returned HTTP 999 on the confirmed URL and the two rejected slugs and was not bypassed — only a search-index snippet is used, marked `low` confidence wherever it is the only source.

---

## 1. Counts

- Public repositories: **36**
- Forks (excluded): **20**
- Non-fork repositories: **16**
- Counted projects: **15**
- Empty repository excluded: **1** (`Makuo_Ifedike`, size 0, no commit)

Forks and the empty repo are listed in `profile-data.json` under `excluded_forks` and `excluded_empty`; they are **not** projects.

## 2. Identity

- **Display name (decided 2026-10-27):** **Ifedike Victor** — status: `decided-2026-10-27`.
- **Legal name:** Victor Makuo Ifedike — kept as `legalName`/`alternateName` in structured data only; never the H1, title or display name.
- **Aliases / handles:** Victor Makuo Ifedike, Ifedike Victor, Ifedike Victor Makuo, lordwhitefire, makuoifedike, lwhitefire.
- **Start:** July 2022 (learning / building start) — **4 years 3 months** as of 2026-10-27. GitHub account 30 Aug 2022; first commit 22 Sep 2022.
- **Headline:** "Frontend Engineer at Athletica — Freelance" — confidence *medium* (LinkedIn search index; live page blocked).
- **Location:** Onitsha, Anambra State, Nigeria — confidence *medium*. City still unconfirmed: the old portfolio says Awka, the LinkedIn index says Nigeria only.
- **Work email:** `mifedike@gmail.com` — owner-confirmed 2026-10-27.
- **Personal email:** `victormakuo2002@gmail.com` — owner-confirmed 2026-10-27 (the earlier `victoemakuo2002` was a typo).
- **Profiles (owner-confirmed 2026-10-27):** GitHub `lordwhitefire`, X `lwhitefire`, LinkedIn `makuoifedike` (direct page still blocked at HTTP 999).

### Owner rulings — 2026-10-27

These are the values to use everywhere from now on. They supersede the earlier readings, which are kept in the source ledger so the history is not lost.

| Field | Ruling | Note |
|---|---|---|
| display_name | Makuo Ifedike | Two names. Chosen for consistency and SEO; the owner normally uses this form. |
| legal_name | Victor Makuo Ifedike | Keep as legalName/alternateName in structured data only; never as the H1, title or display name. |
| work_email | mifedike@gmail.com |  |
| personal_email | victormakuo2002@gmail.com | Confirmed 2026-10-27. The earlier 'victoemakuo2002' was a typo; that spelling is rejected. |
| linkedin | https://www.linkedin.com/in/makuoifedike/ | The only LinkedIn profile. The other two slugs are rejected. |
| x | https://x.com/lwhitefire |  |
| github | https://github.com/lordwhitefire |  |
| experience_start | July 2022 | Learning/building start. GitHub account created 2022-08-30; first commit 2022-09-22. Those dates mark publishing, not the start. |
| experience_duration_as_of_2026-10-27 | 4 years 3 months | Computed from July 2022. Supersedes '3 years' (README) and '5 years 3 months' (LinkedIn index). |

Recorded in `profile-data.json` under `owner_rulings` with `decided_at: 2026-10-27` (source `src-051`). Rejected values are listed there too, so they do not creep back in.

## 3. Projects

| # | Project | What it is | Status | Live |
|---|---|---|---|---|
| 1 | **athletica** | Football store and affiliate commerce platform: public storefront with catalogue, cart, checkout, accounts and orders; private admin for products, media, orders and affiliate settings. | `live` | [https://athletica-blond.vercel.app/](https://athletica-blond.vercel.app/) |
| 2 | **truespec** | Dealership system for a Nigerian vehicle-import business: public showroom plus a single-owner private office for inventory, enquiries, costs and profit. | `live` | [https://truespec-k4y6.vercel.app/](https://truespec-k4y6.vercel.app/) |
| 3 | **interior-deco** | CMS-driven marketing website for the Whitefire Interior brand: services, projects, blog, team, testimonials, FAQ, contact, newsletter. | `live` | [https://interior-deco-kappa.vercel.app/](https://interior-deco-kappa.vercel.app/) |
| 4 | **cp3-legacy** | Chris Paul fan site / sports experience: news, player overview, full statistics, biography, gallery, shop, account and wishlist. | `live` | [https://cp3-legacy.vercel.app/](https://cp3-legacy.vercel.app/) |
| 5 | **new-portfolio** | Earlier portfolio / studio site branded FireSage Studio, built on the Andle Bootstrap template and later filled with the owner's real projects. | `template` | [https://new-portfolio-eta-rouge.vercel.app/](https://new-portfolio-eta-rouge.vercel.app/) |
| 6 | **eliphany-ng** | Eliphany skin-care supplements storefront with product catalogue, categories, product pages and WhatsApp ordering. | `live` | [https://eliphany-ng.vercel.app/](https://eliphany-ng.vercel.app/) |
| 7 | **eliphany-admin** | React admin dashboard for the Eliphany store: products, new arrivals, shop products, home/about settings, login and WhatsApp buttons panel. | `demo` | [https://eliphany-admin.vercel.app/](https://eliphany-admin.vercel.app/) |
| 8 | **Admin-demo** | Duplicate deployment of the Eliphany admin dashboard, kept as a separate repository and Vercel site. | `demo` | [https://admin-demo-seven.vercel.app/](https://admin-demo-seven.vercel.app/) |
| 9 | **online-store** | Next.js shop application with storefront, admin, Prisma order/customer models, Clerk and next-auth, branded 'Music Place — Professional Music Equipment & Instruments' in the layout metadata. | `unknown` | — |
| 10 | **youtube-analytics** | Small Next.js app that authenticates a user with Google OAuth 2.0 and downloads the token response as JSON; no database and no token storage. | `experiment` | — |
| 11 | **agentic-video-system** | Reference-driven, script-driven video editing system: a 17-agent OpenCode configuration plus a runnable LangGraph orchestrator with CLI and FastAPI dashboard. | `in-progress` | — |
| 12 | **interior-deco-cms** | Sanity Studio content backend for the Interior-deco site: page, service, project, blog, team, testimonial, FAQ, contact and newsletter schemas. | `in-progress` | — |
| 13 | **odin-landing-page** | First hand-written CSS landing page, built for The Odin Project; still shows placeholder copy. | `experiment` | [https://odin-landing-page-chi.vercel.app/](https://odin-landing-page-chi.vercel.app/) |
| 14 | **freecodecamp_project_4** | Hand-written HTML/CSS product landing page for a fictional 'Rava' product, built for freeCodeCamp. | `experiment` | [https://freecodecamp-project-4.vercel.app/](https://freecodecamp-project-4.vercel.app/) |
| 15 | **lordwhitefire** | GitHub profile README: banner, a short self-description, availability for small paid work, email, and a languages/tools image panel. | `unknown` | — |

**The four the portfolio should feature** (verified live): `truespec`, `athletica`, `interior-deco`, `cp3-legacy`.

**Other live work:** `new-portfolio` (template-derived, branded FireSage Studio), `eliphany-ng`, `eliphany-admin` and `Admin-demo` (two deployments of the same admin code), `odin-landing-page`, `freecodecamp_project_4`.

**Unreleased or supporting work:** `agentic-video-system` (17-agent video editing system), `interior-deco-cms` (Sanity Studio for Interior-deco), `youtube-analytics` (OAuth token tool), `online-store` (appears template-derived; no deployment), and the `lordwhitefire` profile README.

### Live-site observations that matter

- **Interior-deco:** live meta author is **Makuo Ifedike**; JSON-LD `Organization`/`LocalBusiness` names founder **Makuo Ifedike** with work email `mifedike@gmail.com` — both already correct. The LinkedIn URL in that JSON-LD is the rejected `makuo-ifedike-216607350` and must change to `makuoifedike`. Brand is Whitefire Interior — a project brand, not a confirmed client and not the owner's studio identity.
- **CP3-legacy:** live JSON-LD has `Person` named **Ifedike Victor Makuo** and LinkedIn `makuo-ifedike-216607350` — both now wrong. The `sr-only` builder paragraph repeats the old name. Header contact email is `victormark2002@gmail.com` (dropped); footer is `victormakuo2002@gmail.com` (published form). This page needs the most correction.
- **Truespec:** public showroom renders 19 cars with naira prices and a business WhatsApp CTA. No canonical tag, no JSON-LD, no creator link. Some entries are clearly test data (`FLOW2 2020`, `TS-FLOW-...`).
- **Athletica:** storefront renders, no JSON-LD and no creator link. Many Amazon quick-add links are malformed: they resolve to `athletica-blond.vercel.app/https://www.amazon.com/...`.
- **New-portfolio (FireSage Studio):** template-derived. `projects.html` still carries the **Andle** template title, the footer credits `hasthemes.com`, and the contact is `hello@andle.com`. It calls itself a "two-person team" — the page's own claim, not verified. It is the site behind the current portfolio's "Andle look".
- **Eliphany:** live store with a placeholder WhatsApp number and a placeholder UAE telephone in JSON-LD; product image URLs point at `lordwhitefire.github.io`, whose root returns 404.
- **Old portfolio (`tailwind-web-portfolio`):** says **Ifedike Victor**, **Awka**, "over eight months" experience, links a third LinkedIn slug and a resume, and links nine early Vercel deployments. One linked URL (the resume's own portfolio) is dead.
- **`ifedike-victor.vercel.app`** (the domain chosen in `decisions.md`) returns 404 — not deployed yet.

## 4. Skills

**Evidenced in repositories** (all `high` confidence):

`Next.js`, `React`, `Remix`, `TypeScript`, `Tailwind CSS`, `Sanity CMS`, `Supabase`, `Neon Postgres`, `Prisma`, `Clerk`, `next-auth`, `Vercel`, `Astro`, `Python`, `FastAPI`, `LangGraph`, `Vitest`, `Sentry`, `shadcn/ui`, `Framer Motion`

**Claimed but not independently verified:**

- HTML — `src-044` — confidence *high*
- CSS — `src-044` — confidence *high*
- JavaScript — `src-044` — confidence *high*
- jQuery — `src-044` — confidence *medium*
- SEO — `src-029` — confidence *medium*
- Accessibility — `src-029` — confidence *medium*
- 3 years of experience — `src-017` — confidence *medium*
- 5 years 3 months of experience — `src-043` — confidence *low*
- German language — `src-043` — confidence *low*
- Hindi language — `src-043` — confidence *low*

Note on the years: the owner confirmed on 2026-10-27 that the journey started **July 2022** and that the GitHub README's **3 years** was a deliberate understatement, not a different date. As of 2026-10-27 that is **4 years 3 months**; the LinkedIn index's **5 years 3 months** is wrong and should not be repeated. For bios, the stable phrasing is **"building for the web since 2022"** — it is true and does not go stale.

## 5. Education and experience

**Education**

- B.Eng Chemical Engineering, Nnamdi Azikiwe University (2019-2024) — confidence *medium* — Resume says 2019-2024. CP3 JSON-LD says 'Nnamdi Azikiwe University (2025)'. LinkedIn snippet names the university and chemical engineering without dates. Not independently verified.
- Secondary school, Promise International School (2013-2019) — confidence *medium* — From the public resume only.

**Experience**

Canonical start: **July 2022** — **4 years 3 months** as of 2026-10-27. The entries below are what the sources claim, not verified employers; the dates and the roles still need to be reconciled with the start date.

- Web Developer (freelance), Self-employed (Jan 2024 - present) — confidence *low*. LinkedIn search-index snippet; live profile blocked.
- Content Creator | Web3 Enthusiasts, Freelance (Jun 2024 - present) — confidence *low*. LinkedIn search-index snippet; it is unclear whether this is paid work.
- Multilingual Learner (Hindi + German), Freelance (Jun 2021 - present) — confidence *low*. Listed as an experience entry on the LinkedIn index; it is not an employment role.
- Web Designer (learning by building), W3Schools / freeCodeCamp (2022 - present) — confidence *medium*. The resume presents this as experience; it describes self-directed learning and practice projects.
- Frontend Engineer at Athletica — Freelance, Athletica (own project) — confidence *low*. Headline only. Athletica is also the owner's own public repository, so this may describe project work rather than a client engagement. Do not present as a verified employer.

No employer, client contract, or testimonial is verified by any source. All experience entries are claims.

## 6. Contact

- **Work email:** `mifedike@gmail.com` — owner-confirmed 2026-10-27.
- **Personal email:** `victormakuo2002@gmail.com` — owner-confirmed 2026-10-27; the earlier `victoemakuo2002` spelling was a typo. This matches the README, resume and CP3 footer.
- **Rejected:** `victormark2002@gmail.com` — remove from CP3.
- **Contact page:** none exists.
- **Profiles:** GitHub, X and LinkedIn `makuoifedike` are owner-confirmed; the LinkedIn page itself is still blocked to direct fetch.
- **Rejected profiles:** the LinkedIn slugs `makuo-ifedike-216607350` and `victor-m-ifedike-2039a2239` are kept in `identity.rejected_profiles` with the reason, so a later scrape does not resurface them.
- **Business account:** Instagram `eliphany.ng` belongs to the Eliphany store, not the owner; it is not a `sameAs`.
- **Redacted and excluded:** personal phone/WhatsApp, the Truespec business WhatsApp, and the Eliphany placeholder number. None is published in this dataset.

## 7. What is missing

- Canonical personal domain (brief [FILL IN])
- Contact page URL (none exists)
- One-paragraph bio in the owner's own words (brief [FILL IN])
- Profile photo as a build asset (GitHub/X avatars exist, but the brief's [FILL IN] is unanswered)
- Education confirmation and exact graduation year
- City confirmation (Onitsha in the brief and CP3; Awka in the old portfolio)
- Direct LinkedIn page text (HTTP 999 even on the confirmed URL; only a search-index snippet is available)
- Verified client relationships (none claimed, none found)
- The owner's answer to 'Anything I do NOT want public' (brief [FILL IN])
- A long-form written bio and any personal statement beyond the short self-descriptions collected

## 8. Conflicts — resolved and open

| ID | Topic | Status | Readings | Needs |
|---|---|---|---|---|
| C-01 | Canonical name | `resolved` (decided 2026-10-27) | Makuo Ifedike (src-045, src-050); Ifedike Victor (src-046, src-029, src-044); Ifedike Victor Makuo (src-021) | Decided: display name Makuo Ifedike; legal name Victor Makuo Ifedike, kept as legalName/alternateName only. Replace 'Ifedike Victor' on every surface. |
| C-02 | LinkedIn URL | `resolved` (decided 2026-10-27) | linkedin.com/in/makuoifedike (brief); linkedin.com/in/makuo-ifedike-216607350 (CP3 + Interior-deco JSON-LD); linkedin.com/in/victor-m-ifedike-2039a2239 (old portfolio) | Decided: linkedin.com/in/makuoifedike is the only profile. Replace the other two wherever they are linked. |
| C-03 | Public contact email | `resolved` (decided 2026-10-27) | mifedike@gmail.com (work); victormakuo2002@gmail.com (personal); victormark2002@gmail.com (CP3 header, dropped) | Decided: work mifedike@gmail.com; personal victormakuo2002@gmail.com. The 'victoemakuo2002' spelling was a typo; victormark2002 is dropped. |
| C-04 | Graduation year | `open` | B.Eng 2019-2024 (resume); Nnamdi Azikiwe University (2025) (CP3 JSON-LD) | Owner confirmation; do not put a year in alumniOf until confirmed. |
| C-05 | Location | `open` | Onitsha, Anambra State (brief, CP3 JSON-LD); Awka, Nigeria (old portfolio); Nigeria only (LinkedIn index) | Owner confirmation of city; country is consistent. |
| C-06 | Years of experience | `resolved` (decided 2026-10-27) | 3 years (GitHub README, deliberate understatement); 5 years 3 months (LinkedIn index); eight months in the 2023 portfolio | Decided: the journey started July 2022. As of 2026-10-27 that is 4 years 3 months. The README's '3 years' and LinkedIn's '5 years 3 months' are both superseded. |
| C-07 | Twitter/X | `resolved` (decided 2026-10-27) | [FILL IN] in the brief; @lwhitefire found and verified | Decided: x.com/lwhitefire is the profile. |
| C-08 | UI / URL architecture | `open` | Brief: light UI, one page per project; Approved plan: dark Andle look, same-page case-study modals | Owner/architect decision; this job did not build or redesign anything. |
| C-09 | Project count | `reported` | 36 public repositories; 20 forks; 15 counted non-fork repositories; 1 empty repository | Use the counted number; do not present forks or the empty repo as projects. |
| C-10 | Client relationships | `reported` | No client contract, invoice, or testimonial found in any source | Do not claim client work for Interior-deco, Truespec, Athletica, Eliphany or any other project. |
| C-11 | Identity on the live Interior-deco site | `resolved` (decided 2026-10-27) | meta author 'Makuo Ifedike' and JSON-LD founder 'Makuo Ifedike'; Approved plan said identity is 'Ifedike Victor only' | Decided by C-01: Makuo Ifedike is correct. The live site already matches; the plan text needs updating. |
| C-12 | Athletica project status | `reported` | Public site responds 200 and is usable; Owner plan calls it 'live preview' | Use 'preview' unless the owner declares it launched. |
| C-13 | Personal email spelling | `resolved` (decided 2026-10-27) | victoemakuo2002@gmail.com (typo in the 2026-10-27 message); victormakuo2002@gmail.com (README, resume, CP3 footer) | Decided: victormakuo2002@gmail.com. The other spelling was a typing error and is recorded as rejected. |

## 9. Handoff notes for the architect

- `Person.name` is **Makuo Ifedike**. `Person.legalName` may carry **Victor Makuo Ifedike**. Never emit `Ifedike Victor` as the display name; it survives only as an `alternateName` and as history in this research.
- `sameAs` should carry **GitHub**, **X** and **LinkedIn `makuoifedike`**. Do not add the two rejected LinkedIn slugs or the Eliphany Instagram.
- `alumniOf` should wait for **C-04**; the resume says 2019–2024 and CP3 says 2025.
- Do not publish any phone or WhatsApp number, including the ones found on the live sites; the brief forbids it.
- The work email is `mifedike@gmail.com`; the personal email is `victormakuo2002@gmail.com` (both owner-confirmed 2026-10-27). Do not use `victormark2002@…` or `victoemakuo2002@…` — both are recorded as rejected.
- The four featured projects are verified. The other eleven counted repositories exist and are labelled; whether to display them is an owner decision, not a scraper one.
- The brief asks for a light UI and a page per project; the approved plan asks for the dark Andle look and same-page modals. This job did not build either. **C-08** records the conflict.
- No outcome numbers, user counts, revenue, awards or client names were found, so none are in the data. Do not invent them.

### Surface alignment checklist — what to change where

The owner asked to use this record to make every surface consistent. This is the edit list, based on what the live pages actually serve today.

| Surface | Current | Change to |
|---|---|---|
| GitHub profile name field | `Makuo Ifedike` (API) / indexed as `Ifedike Victor` | keep `Makuo Ifedike`; Git index will follow |
| GitHub README | "3 years of experience" | "building for the web since 2022" (recommended stable phrasing) |
| X profile | name `Makuo Ifedike`, handle `lwhitefire` | no change |
| LinkedIn | `linkedin.com/in/makuoifedike` | keep; align display name to `Makuo Ifedike` |
| Interior-deco JSON-LD | founder `Makuo Ifedike`, `mifedike@gmail.com`, LinkedIn `…216607350` | keep name/email; change LinkedIn to `makuoifedike` |
| CP3 JSON-LD | `Ifedike Victor Makuo`, LinkedIn `…216607350` | `Makuo Ifedike`; LinkedIn `makuoifedike`; `alternateName` `Victor Makuo Ifedike` |
| CP3 sr-only paragraph | repeats old name | `Makuo Ifedike` |
| CP3 contact emails | header `victormark2002@…`, footer `victormakuo2002@…` | keep `victormakuo2002@gmail.com`; drop the `mark` variant |
| New portfolio | FireSage Studio / Andle template | not an identity surface; do not reuse `hello@andle.com` |
| `ifedike-victor.vercel.app` | 404 | deploy or drop from copy |

## 10. Source ledger

| ID | Type | URL | Status | What it proves |
|---|---|---|---|---|
| src-001 | github | https://api.github.com/users/lordwhitefire | 200 | Profile: login, name 'Makuo Ifedike ', twitter_username 'lwhitefire', 36 public repos, created 2022-08-30. No bio/company/blog/location/email set. |
| src-002 | github | https://api.github.com/users/lordwhitefire/repos?per_page=100&page=1 | 200 | All 36 public repositories with fork/archived/visibility flags, language, dates, homepage, topics, size. |
| src-003 | github | https://github.com/lordwhitefire/athletica | 200 | README, frontend/package.json, rollout/package.json, file tree (609 files). Describes storefront + private admin + affiliate storefront. |
| src-004 | github | https://github.com/lordwhitefire/truespec | 200 | No root README. package.json, file tree (1,250 files), 26 migrations, OpenSpec proposal/design for the showroom + office architecture. |
| src-005 | github | https://github.com/lordwhitefire/youtube-analytics | 200 | README, package.json, tree (46 files). Google OAuth token fetcher; no database, no token storage. |
| src-006 | github | https://github.com/lordwhitefire/odin-landing-page | 200 | README ('my first css project'), package.json, index.html, style.css. |
| src-007 | github | https://github.com/lordwhitefire/freecodecamp_project_4 | 200 | package.json description 'Rava product landing page - hand-written HTML and CSS', index.html. |
| src-008 | github | https://github.com/lordwhitefire/agentic-video-system | 200 | README, SETUP.md, langgraph-runtime README + requirements, tree (184 files). 17-agent video editing system. |
| src-009 | github | https://github.com/lordwhitefire/interior-deco | 200 | README, package.json, Remix route tree (39 route/component files). Whitefire Interior site. |
| src-010 | github | https://github.com/lordwhitefire/cp3-legacy | 200 | README (calls itself a portfolio - stale), package.json, tree (344 files), src/app/page.tsx JSON-LD and sr-only builder text. |
| src-011 | github | https://github.com/lordwhitefire/new-portfolio | 200 | Static HTML pages (index/about/projects/pricing/contact), andle template assets. projects.html still carries the Andle template title. |
| src-012 | github | https://github.com/lordwhitefire/online-store | 200 | package.json, prisma/schema.prisma (Order, OrderItem, Customer), src/app layout metadata 'Music Place'. No README. 2,022 files. |
| src-013 | github | https://github.com/lordwhitefire/Admin-demo | 200 | README (Create React App boilerplate), package.json, src/App.js identical to eliphany-admin. |
| src-014 | github | https://github.com/lordwhitefire/eliphany-admin | 200 | README (Create React App boilerplate), package.json, tree (39 files): dashboard, products, about/home settings, WhatsApp buttons panel. |
| src-015 | github | https://github.com/lordwhitefire/eliphany-ng | 200 | README (Astro starter), package.json, Astro route tree, products.json pointing at lordwhitefire.github.io assets. |
| src-016 | github | https://github.com/lordwhitefire/interior-deco-cms | 200 | README (Sanity Clean Content Studio), sanity.config.ts, schemaTypes/ (aboutPage, blogArticle, projectPage, servicePage, staff, testimonial, contactSubmission, newsletterSubscriber, siteConfig, etc.). |
| src-017 | github | https://github.com/lordwhitefire/lordwhitefire | 200 | Profile README: 'self-taught full-stack developer with 3 years of experience', open to small paid projects, email victormakuo2002@gmail.com, tools panel. |
| src-018 | live-site | https://interior-deco-kappa.vercel.app/ | 200 | Title/description, meta author 'Makuo Ifedike', 13 public routes, Organization + LocalBusiness JSON-LD with founder email mifedike@gmail.com and LinkedIn makuo-ifedike-216607350. |
| src-019 | live-site | https://truespec-k4y6.vercel.app/ | 200 | Public showroom rendered: 19 cars, naira prices, WhatsApp business contact, privacy route. No canonical, no JSON-LD, no creator link. |
| src-020 | live-site | https://athletica-blond.vercel.app/ | 200 | Storefront, cart, login/register, football categories. No JSON-LD, no creator link. Amazon quick-add links observed malformed. |
| src-021 | live-site | https://cp3-legacy.vercel.app/ | 200 | Chris Paul fan site. Person/Organization/WebSite JSON-LD (Ifedike Victor Makuo), sr-only builder paragraph, two different owner emails in page. |
| src-022 | live-site | https://new-portfolio-eta-rouge.vercel.app/ | 200 | FireSage Studio branding, 'two-person team', links to interior-deco, tailwind-web-portfolio, freecodecamp2-1; template credit to hasthemes.com; mailto hello@andle.com. |
| src-023 | live-site | https://eliphany-ng.vercel.app/ | 200 | Eliphany skin-care supplements store, WhatsApp order flow, Instagram @eliphany.ng, placeholder telephone in JSON-LD. |
| src-024 | live-site | https://eliphany-admin.vercel.app/ | 200 | Client-rendered React admin; /dashboard loads with empty DOM text. No title/description beyond CRA defaults. |
| src-025 | live-site | https://admin-demo-seven.vercel.app/ | 200 | Identical React admin deployment to eliphany-admin; /dashboard loads with empty DOM text. |
| src-026 | live-site | https://odin-landing-page-chi.vercel.app/ | 200 | Odin Project landing page; placeholder copy ('header link1', 'this website is awesome'). |
| src-027 | live-site | https://freecodecamp-project-4.vercel.app/ | 200 | Rava product landing page; page text says 'The Rava app is provided by lordwhitefire'. |
| src-028 | live-site | https://freecodecamp2-1.vercel.app/ | 200 | Camper Cafe restaurant menu; page text says 'from victor's collection'. |
| src-029 | live-site | https://tailwind-web-portfolio.vercel.app/ | 200 | Old portfolio titled 'whitefire's portfolio'. Says 'IFEDIKE VICTOR', based in Awka Nigeria, eight months experience, LinkedIn victor-m-ifedike-2039a2239, resume PDF, a personal WhatsApp link (number redacted), links to nine early deployments. |
| src-030 | live-site | https://feproject.vercel.app/ | 200 | Deployment linked from src-029: 'Odin Recipes - Authentic Nigerian Cuisine'. |
| src-031 | live-site | https://freecodecamp7-1.vercel.app/ | 200 | Deployment linked from src-029: "victor's photo gallery" / "victor's catalog". |
| src-032 | live-site | https://freecodecamp-project-3.vercel.app/ | 200 | Deployment linked from src-029; HTTP 200, no title or heading text in the served HTML. |
| src-033 | live-site | https://freecodecamp-certification-project-1.vercel.app/ | 200 | Deployment linked from src-029: 'freecodecamp survey form'. |
| src-034 | live-site | https://freecodecamp10-1.vercel.app/ | 200 | Deployment linked from src-029: 'steve jobs' biography page. |
| src-035 | live-site | https://freecodecamp15.vercel.app/ | 200 | Deployment linked from src-029: 'City Skyline'. |
| src-036 | live-site | https://web-portfoliohazel-seven.vercel.app/ | 404 | Old portfolio URL printed on the resume; dead as of fetch. |
| src-037 | live-site | https://ifedike-victor.vercel.app/ | 404 | Domain chosen in decisions.md; returns Vercel 404 NOT_FOUND, not yet deployed. |
| src-038 | live-site | https://lordwhitefire.github.io/ | 404 | GitHub Pages root used by product image URLs in eliphany-ng; root returns 'Site not found'. |
| src-039 | search | https://x.com/lwhitefire | 200 | Public logged-out profile: 'Makuo Ifedike (@lwhitefire) on X', bio 'Web Developer \| BOS Brigade', joined July 2024. |
| src-040 | linkedin | https://www.linkedin.com/in/makuoifedike | 999 | Brief URL. Direct fetch returned HTTP 999 / authwall; not bypassed. Search index shows headline and profile facts (src-043). |
| src-041 | linkedin | https://www.linkedin.com/in/makuo-ifedike-216607350/ | 999 | URL used by CP3-legacy and Interior-deco JSON-LD. Direct fetch HTTP 999 / authwall; not bypassed. |
| src-042 | linkedin | https://www.linkedin.com/in/victor-m-ifedike-2039a2239 | 999 | URL linked from the old portfolio (src-029). Direct fetch HTTP 999 / authwall; not bypassed. |
| src-043 | search | https://ng.linkedin.com/in/makuoifedike | 200 | Search-index record for the brief URL: headline 'Frontend Engineer at Athletica - Freelance', location Nigeria, 5 years 3 months, 1,289 followers, experience entries, Nnamdi Azikiwe University chemical engineering, freeCodeCamp Responsive Web Design (2023). Aggregated snippet, not the live page. |
| src-044 | live-site | https://tailwind-web-portfolio.vercel.app/img/ifedike.pdf | 200 | Public one-page resume: IFEDIKE VICTOR, web developer, Promise International School 2013-2019, B.Eng Nnamdi Azikiwe University 2019-2024, email victormakuo2002@gmail.com, phone (excluded from this dataset), old portfolio URL. |
| src-045 | workspace | /home/lordwhitefire/Downloads/portfolio-brief.md | — | Owner brief: canonical name Makuo Ifedike, Onitsha, light UI, JSON-LD, many [FILL IN] fields. |
| src-046 | workspace | /home/lordwhitefire/current-project/ifedike_makuo/product-management/decisions.md | — | Owner decisions: identity 'Ifedike Victor only', Whitefire dropped, dark Andle UI kept, modals not pages, no numbers. |
| src-047 | workspace | /home/lordwhitefire/current-project/ifedike_makuo/product-management/project-facts.md | — | Prior verified facts for the four known projects; used as a starting point and re-verified. |
| src-048 | workspace | /home/lordwhitefire/current-project/ifedike_makuo/product-management/scraper-handoff.md | — | This job's brief and rules. |
| src-049 | workspace | /home/lordwhitefire/current-project/ifedike_makuo/product-management/architect-handoff.md | — | How the output will be consumed (JSON-LD, llms.txt, metadata). |
| src-050 | search | https://github.com/lordwhitefire?tab=repositories | 200 | GitHub repository search result title: 'lordwhitefire (Ifedike Victor)' — GitHub's indexed display name differs from the API name field. |
| src-051 | owner | owner message, 2026-10-27 (this conversation) | 200 | Owner rulings, 2026-10-27: display name Makuo Ifedike; legal name Victor Makuo Ifedike; work email mifedike@gmail.com; personal email supplied as 'victoemakuo2002@gmail.com'; LinkedIn linkedin.com/in/makuoifedike; X x.com/lwhitefire; GitHub github.com/lordwhitefire; journey/learning start July 2022, deliberately understated as '3 years' in the GitHub README to avoid exaggeration. |
| src-052 | owner | owner correction, 2026-10-27 (this conversation) | 200 | Owner corrected the personal email spelling to victormakuo2002@gmail.com. The earlier 'victoemakuo2002' was a typo. |

Every fact in `profile-data.json` carries a `source_ids` entry pointing at this table. No source, no fact.

## 11. Capture inventory

- `scrape-workspace/captures/github/` — API user/repo JSON, 15 file trees, raw README/manifests/source files.
- `scrape-workspace/captures/sites/` — per-site DOM, metadata, JSON-LD, links, visible text, viewport and full-page screenshots.
- `scrape-workspace/captures/resume/` — the public resume PDF and its text extraction.
- `scrape-workspace/structures/` — the extracted facts.
- `scrape-workspace/validations/` — the checks run on the deliverable.

## 12. Limits of this pass

No client relationship, revenue, user count, employer, award, or launch date is verified. LinkedIn's live pages were not accessed. No private repository, credential, or non-public data was touched. The captures were taken on 2026-10-27 and can go stale; re-fetch before publishing.
