# Architect Handoff — Ifedike Victor Portfolio

**From:** Product Management agent  
**To:** Architect / Builder  
- **Date:** 2026-10-26 (plan approved); **identity re-ruled 2026-10-27: display name Makuo Ifedike.**
- **Status:** Planning closed — owner approved the revised plan on 2026-10-26; identity addendum added 2026-10-27. Build has not started.
**Workspace:** `/home/lordwhitefire/current-project/ifedike_makuo`  
**PM workspace:** `/home/lordwhitefire/current-project/ifedike_makuo/product-management/`

---

## 0. What this file is

This is the context handoff for the architect. It tells you what the product is, what the owner has decided, which files are the source of truth, and what not to build.

This agent is the Product Management agent. It recommends and records decisions. It does **not** build, change the product, or authorize work outside the approved plan. Implementation belongs to the architect/builder.

Do **not** edit `product-management/`; it is the PM record. If something is wrong or missing, report it rather than rewriting the record.

Read this file first, then read the source files in §1. Do not work from this summary alone.

---

## 1. Read these in this order

All paths are relative to `/home/lordwhitefire/current-project/ifedike_makuo/`.

1. **`product-management/decisions.md`** — every owner decision and accepted default. This is the first source of truth. Read the whole file.
2. **`product-management/portfolio-six-layer-plan.md`** — the main six-layer plan: UI, data, business logic, functionality, UX, system model, build sequence, risks, metric.
3. **`product-management/engagement-plan.md`** — the nine touchpoints, timing, queue, copy, and form triggers.
4. **`product-management/project-facts.md`** — verified project facts from GitHub and the live sites, plus public-copy rules.
5. **`product-management/plan.md`** — the original approved plan and its result.
6. **`product-management/six-layer-template.md`** — optional; the reusable template, not the product plan.
7. **`/home/lordwhitefire/Downloads/portfolio-brief.md`** — the owner’s information-layer brief.
8. **`product-management/scraper-handoff.md`** — what the scraper collected for JSON-LD and `llms.txt`.
9. **`product-management/research/profile-data.json`** — canonical identity and project record from the scraper (source of truth for names, profiles, skills, projects, conflicts).
10. **`content-workspace/briefs/seo-information-layer.md`** — the owner's brief for the code-only information layer (JSON-LD, `llms.txt`, metadata).
11. **`content-workspace/pieces/person-jsonld.md`** — finished JSON-LD `@graph` draft, ready to implement. Do not edit the content; implement as-is.
12. **`content-workspace/pieces/metadata.md`** — finished per-page metadata, canonical, Open Graph, Twitter cards draft. Ready to implement as-is.
13. **`content-workspace/pieces/llms-txt.md`** — finished `llms.txt` draft. Ready to implement as-is.

**If two files disagree:** `decisions.md` wins over the plan; the six-layer plan wins over the engagement plan; `project-facts.md` is evidence, not a decision. Do not guess. Report the conflict instead of silently choosing.

---

## 2. The product in one paragraph

A personal portfolio for **Makuo Ifedike**, positioned as “I build and fix software for small businesses.” It is a **pure Next.js app**, not a static HTML page behind a redirect. It is one page with sections: hero, work, about, stack, milestones/process, and contact. Four projects are shown; each opens a large same-page case-study modal. The contact form is a popup, not a section. The existing dark Andle look is kept, but the placeholder content, fake proof, stock portrait, and dead links are removed.

The current visible page lives inside `andle-portfolio-repomix.xml`; the workspace does not currently contain `public/` or `src/` directories. The packed file contains `public/andle-portfolio.html`, `public/andle/engagement.js`, the Next.js shell, and the build script. `extract_repomix.py` can extract it if you need the actual files.

---

## 3. Non-negotiables

### Identity

- **Makuo Ifedike.** No **Whitefire** in the portfolio title, metadata, logo, footer, or socials. Whitefire is dropped until it is registered and operating as a studio (re-affirmed 2026-10-27; see `decisions.md` Identity addendum).
- **Legal name:** **Victor Makuo Ifedike** — kept as `legalName`/`alternateName` in JSON-LD only; never as the H1, title, or display name.
- **Interior-deco** is branded **Whitefire Interior**. That is the project’s brand, not the portfolio identity. Do not present it as the owner’s studio or as a confirmed client engagement.

### Architecture

- **Pure Next.js app.** Retire `public/andle-portfolio.html` and the redirect to it.
- **One-page home.** About stays a section. No `/work/[slug]`, no `project-details.html`.
- **Four projects only:** Interior-deco, Truespec, Athletica, CP3-legacy. No fifth project.
- **Truespec is the flagship** and the true milestone: public showroom + private office, documented migration history, auth, PDF enquiries. Not an “inventory app.”

### Case studies

- Large **same-page modals**, one per project.
- The **only link inside a modal** goes to the real live project.
- **No contact form** inside a case-study modal.
- **No numbers** in public case-study outcomes. Use problem → constraints → approach → outcome in words → stack → live link.
- The 26-migration count stays in `project-facts.md` as internal evidence only; public copy says “documented migration history.”

### Form

- **Popup only.** No inline form and no form section.
- Opens only from:
  1. the chat bubble’s **Talk** action (primary);
  2. the exit-intent modal’s CTA (secondary).
- Heading: **“Tell me what you need.”**
- Submit label: **“Send inquiry.”**
- Form stays open until submit or close. Closing starts the 20-second cooldown; submitting ends engagement prompts for the session.

### Engagement

- Keep **all nine** touchpoints. No three-prompt session cap.
- **One prompt at a time.** Nothing stacks.
- **20-second cooldown** after every prompted touchpoint.
- First bubble at **8 seconds**; current first-bubble copy kept.
- Returning copy: **“Welcome back. Are you here to see the work, or talk about a project?”**
- Form open suppresses every prompt, banner, panel, toast, and confetti.
- Visual appearance and animation are the **owner/designer’s call**; only behaviour, timing, queue, and copy are planned.

### Proof and assets

- **No client logos.** The old stock “client” strip is replaced by **My Stack**.
- **No testimonials** until real testimonials exist.
- **No stock portrait.** The owner has a portrait; the final version will have a black background and is supplied at build time.
- Real project screenshots only. No stock office photos.
- No unverified counters. Remove counters unless a verified number exists.

### My Stack

- Static **6×2 grid** on desktop; 4 columns tablet; 2 columns mobile.
- 28 px monochrome marks with visible labels.
- No marquee, no coloured logo wall, no client logos.
- Stack: **Next.js, React, Remix, TypeScript, Tailwind CSS, Sanity, Supabase, Neon, Prisma, Clerk, Vercel, Playwright**.
- Use Simple Icons white SVGs or official brand kits; download and self-host in `public/logos/`; do not hotlink.
- Playwright is not in Simple Icons; use the official mark recoloured to white, or substitute Vitest.
- Rest colour `#A1A1AA`; hover `#F5F5F4`.

### Visual

- Keep the current **dark Andle look**. No redesign.
- One icon system; remove duplicate stylesheets.
- Two typefaces maximum.
- Responsive on mobile, tablet, and desktop.
- WCAG AA contrast, focus states, keyboard access, reduced motion.

### System

- Vercel hosting.
- Domain: **`makuo-ifedike.vercel.app`** (owner requested `makuo_ifedike.vercel.app`; underscores are invalid in hostnames, so Vercel requires a hyphen or no separator — `makuo-ifedike.vercel.app` or `makuoifedike.vercel.app`). Owner to confirm final spelling.
- **Location:** Onitsha and Oka, Anambra State, Nigeria (owner lives in both).
- **Graduation:** 2025 — B.Eng Chemical Engineering, Nnamdi Azikiwe University.
- Set `typescript.ignoreBuildErrors` to **false**.
- Remove unused dependencies after verifying no usage.
- Add git, CI (build, typecheck, link check), analytics, and error monitoring.
- The workspace is not currently a git repo.

---

## 4. The four projects

| Project | What it is | Stack | Status | Live |
|---|---|---|---|---|
| **Interior-deco** | Interior design studio site for the **Whitefire Interior** brand | Remix 2, Sanity, Tailwind 3, Vercel | Live | `https://interior-deco-kappa.vercel.app/` |
| **Truespec** | Dealership system: public showroom + private office, enquiries, cost/profit, auth, PDF import | Next.js 15, Neon Postgres, Clerk, Sanity, Vercel | Live — flagship | `https://truespec-k4y6.vercel.app/` |
| **Athletica** | Football store: storefront, cart, checkout, orders, accounts, admin, Amazon affiliate settings | Next.js 16, Supabase, Sanity, Tailwind 4, Vercel | Live preview | `https://athletica-blond.vercel.app/` |
| **CP3-legacy** | Chris Paul fan site / sports experience: news, stats, biography, gallery, shop, account | Next.js 16, Tailwind 4, shadcn/ui, Sanity, Prisma, next-auth, Vercel | Live | `https://cp3-legacy.vercel.app/` |

**Do not call Athletica an “affiliate platform”** as if that is the whole product. It is a football store with an Amazon affiliate feature.

**Do not call CP3-legacy “athlete-focused software in development.”** It is a live Chris Paul fan site. Its repo README says “personal portfolio,” but the live metadata and page content say fan destination.

---

## 5. What to build

### 5.1 Architecture

- One Next.js app, App Router, TypeScript.
- One deploy. No static HTML behind a redirect.
- One content source for projects, services, bio, milestones, contact details, inquiries, and events.
- Server-side handling for form submission and notifications; no secrets in the client.

### 5.2 Page and sections

1. Hero — one-line promise, primary CTA, secondary “see the work.”
2. Work — four project cards; each opens a modal.
3. About — Makuo Ifedike, real portrait when supplied.
4. My Stack — 6×2 grid.
5. Milestones / how I work — only true, non-numeric claims.
6. Contact strip — email, socials, no inline form.
7. 404 page.

No separate case-study pages. No dead links.

### 5.3 Data

Project record fields:

`slug, title, category, status, summary, problem, constraints, approach, outcome (words, no numbers), stack, live URL, repo URL, images, testimonial, dates, featured`

- Case-study modals read from the same records as the cards.
- No duplicate cards across tabs.
- Filters must be real, or removed.
- Counters removed unless verified.
- Inquiry record: name, email, need type, budget range, timeline, message, source, consent, status, created date.

### 5.4 Engagement

All nine touchpoints stay:

1. First-time chat bubble — **8s**, 14s or close.
2. Returning visitor message — same timing, approved copy.
3. Time-of-day greeting — passive, immediate, stays in hero.
4. 50% scroll banner — after #1 closes + 20s cooldown; 10s.
5. 45s idle panel — after cooldown; 15s.
6. Exit-intent modal — after 20s on page; normally after cooldown; max 20s.
7. Footer confetti + toast — at 60% footer visibility; confetti 2s, toast 8s.
8. Project card hover/focus tooltip — immediate.
9. Referrer-aware opener — LinkedIn/Twitter/X, first-time only.

Exact behaviour is in `engagement-plan.md`. Do not invent additional prompts.

### 5.5 Form and notifications

- Popup form only.
- Fields: name, email, need type (marketing site / web app / fix), budget range, timeline, message, optional project link, consent checkbox.
- Spam: honeypot + rate limit; add Turnstile if spam appears.
- On submit:
  1. Google Sheet row on tab **`Portfolio Inquiries`**;
  2. email alert with subject **`[PORTFOLIO] New inquiry — {name}`**;
  3. WhatsApp alert starting **`[PORTFOLIO] New inquiry`**;
  4. auto-reply to the visitor.
- Every alert starts with **`[PORTFOLIO] New inquiry`**.
- Privacy page; consent checkbox; cookie banner only if analytics cookies are introduced.

### 5.6 SEO

- Per-page metadata, Open Graph, canonical URLs.
- Sitemap, robots, `Person`/`ProfessionalService` structured data.
- Remove `noindex` when public.
- SEO is primarily Layer 4 (Functionality); Layer 6 (System model) owns metadata routes, deploy verification, and analytics.

### 5.7 Analytics and monitoring

- Vercel Analytics + custom events:
  `page_view`, `project_view`, `cta_click`, `inquiry_start`, `inquiry_submit`, `outbound_project_click`.
- Privacy page; form consent checkbox; banner only if cookies are introduced.
- Error monitoring: Sentry free tier or Vercel logs.
- CI: install, typecheck, build, link check.

### 5.8 Quality

- WCAG AA; keyboard paths; focus management in modals and popups; reduced motion.
- LCP under 2.5s; CLS under 0.1; Lighthouse 90+ where possible.
- Build, typecheck, link checker, one Playwright smoke test.
- No placeholder copy; every link resolves.

### 5.9 Success metric

The plan recommends **qualified inquiry rate** = qualified inquiries ÷ unique visitors, measured monthly.

A qualified inquiry is a small-business owner or decision-maker with a concrete project — marketing site, web app, or fix — a timeline, and willingness to discuss budget. Exclude spam, recruiters, students, and vendors.

Leading indicator: **project view → CTA click**. If visitors view but do not click, proof or CTA is the problem. If they click but do not submit, the form is the problem.

### 5.10 Machine-readable information layer

Finished drafts are in `content-workspace/pieces/` and ready to implement **as-is**. Do not edit the content — if something is wrong, report it to the owner rather than rewriting.

- **`content-workspace/pieces/person-jsonld.md`** — `Person`, `WebSite`, `ProfilePage`, and all 4 projects as `SoftwareApplication`/`CreativeWork` JSON-LD `@graph`. Implement in the `<head>`.
- **`content-workspace/pieces/metadata.md`** — per-page title, meta description, canonical, Open Graph, Twitter cards, robots.txt, sitemap.xml rules.
- **`content-workspace/pieces/llms-txt.md`** — plain-text `llms.txt` at site root with bio, stack, projects, and full inventory.

The owner wants the code to carry heavy, complete information for search engines and AI agents, while the visible UI stays short.

- Read `/home/lordwhitefire/Downloads/portfolio-brief.md` and `product-management/scraper-handoff.md`.
- Implement the results as JSON-LD in the `<head>`: `Person`, `ProfilePage`, `WebSite`, `CreativeWork`/`SoftwareApplication`, `Organization`, `sameAs`, `creator`.
- Add `llms.txt`, sitemap, robots, canonical, and Open Graph.
- **Do not** use CSS-hidden text, white-on-white text, off-screen blocks, or `display:none` keyword stuffing. Use structured data and discovery files.
- **Identity — decided 2026-10-27:** display name **Makuo Ifedike**; legal name **Victor Makuo Ifedike** (structured data only). The prior "Ifedike Victor" name is superseded; do not merge silently.
- **Open items flagged in the pieces (do not resolve silently):**
  - Domain spelling: `makuo-ifedike.vercel.app` vs `makuoifedike.vercel.app` (underscores invalid in hostnames) — owner to confirm.
  - `knowsAbout` includes "frontend" in some places; owner said remove it. Pieces currently say "self-taught developer" in person-jsonld.md but metadata.md says "frontend engineer" — flag for owner decision before implementing.
  - Graduation year 2025 — research marked C-04 open; pieces use 2025 as owner-stated. Owner to confirm.
  - Portrait at `/home/lordwhitefire/Downloads/Professional Portrait on Black.png` — not yet supplied to the builder. JSON-LD points to `https://makuo-ifedike.vercel.app/images/portrait.png`.

---

## 6. Build sequence

0. **Truth pass** — remove placeholders, stock client strip, stock portrait, dead links, template credit; replace the client strip with My Stack; confirm `noindex` intent; unify identity.
1. **System foundation** — pure Next.js, Vercel, domain, git/CI, remove unused dependencies, `ignoreBuildErrors: false`.
2. **Data spine** — project records, identity record, modal content, services/bio/milestones, inquiry model, event schema.
3. **Core journey** — one-page home, Work, case-study modals, popup form, real filters, SEO, JSON-LD / `llms.txt`.
4. **Business logic** — form validation, qualification, notifications, consent, spam control.
5. **Polish and ops** — accessibility, performance, analytics, monitoring, documentation.

---

## 7. Acceptance criteria

- One build, one deploy, one source of truth.
- No static redirect; no `public/andle-portfolio.html` as the visible product.
- Four project cards; four modals; only link is the live project; no form inside.
- Form opens only from bubble Talk or exit-intent CTA.
- Google Sheet, email, WhatsApp, and auto-reply all work.
- All nine touchpoints present; one at a time; no stacking; no session cap.
- My Stack grid correct; no client logos; no marquee.
- No case-study numbers; no invented metrics; no fake testimonials.
- No stock portrait; owner portrait when supplied.
- Responsive; WCAG AA; LCP under 2.5s.
- SEO and analytics live.
- JSON-LD validates; `llms.txt`, sitemap, robots, canonical, and OG load; no CSS-hidden text.
- Content-workspace pieces (`person-jsonld.md`, `metadata.md`, `llms-txt.md`) implemented as-is; no content edits by the builder.

---

## 8. Build-time assets and dependencies

- **Portrait:** owner supplies the final black-background portrait at build time. File is at `/home/lordwhitefire/Downloads/Professional Portrait on Black.png` (PNG, 1122×1402). Copy to `public/images/portrait.png`; JSON-LD `image` points to `https://makuo-ifedike.vercel.app/images/portrait.png`. Do not use a stock portrait. Not a planning blocker.
- **Truespec back office:** needs owner screenshots or a demo login. Otherwise capture only the public pages.
- **Athletica admin:** needs credentials for admin screenshots. Otherwise capture the storefront only.
- **Logo marks:** Simple Icons white SVGs or official brand kits; self-host in `public/logos/`.
- **No client logos, no testimonials, no stock office photos.**

---

## 9. What not to do

- Do not add a fifth project.
- Do not add `/work/[slug]` or `project-details.html`.
- Do not add an inline form or contact form section.
- Do not use client logos or fake proof.
- Do not use CSS-hidden text, white-on-white text, off-screen blocks, or `display:none` keyword stuffing.
- **Do not reintroduce `Ifedike Victor` as the display name** — superseded on 2026-10-27; the legal name remains in structured data only.
- Do not build per-project pages from the brief without the owner/architect resolving the modal-vs-page conflict.
- Do not put outcome numbers in case studies.
- Do not use “Whitefire” as the portfolio identity.
- Do not present Interior-deco as a confirmed client or Whitefire as a registered studio.
- Do not use a stock portrait.
- Do not add a session cap to engagement.
- Do not change engagement appearance or animation — that is the owner/designer’s call.
- Do not ship a static HTML page behind a redirect.
- Do not leave `typescript.ignoreBuildErrors: true`.
- Do not add unused dependencies.

---

## 10. Open items

**Planning is approved, but two conflicts must be reported before final copy:**

- **Canonical name:** decided 2026-10-27 — **Makuo Ifedike** is the display name; **Victor Makuo Ifedike** is the legal name in structured data only. The prior plan's "Ifedike Victor" is superseded.
- **Project URLs:** the brief asks for one page per project; the approved UI uses same-page modals. The scraped data can feed either, but do not add pages without the owner/architect deciding.

The only build-time dependencies are the portrait and optional authenticated screenshots listed in §8.

If something is genuinely missing, report it to the owner rather than inventing content or numbers.

---

## 11. Source-of-truth rule

1. `product-management/decisions.md` — owner decisions.
2. `product-management/portfolio-six-layer-plan.md` — architecture and build sequence.
3. `product-management/engagement-plan.md` — engagement behaviour and timing.
4. `product-management/project-facts.md` — verified project evidence and public-copy rules.
5. `product-management/plan.md` — original approved plan and result.

If a conflict appears, stop and report it. Do not resolve it by guessing.

---

**End of handoff.** No product code has been changed by the Product Management agent.
