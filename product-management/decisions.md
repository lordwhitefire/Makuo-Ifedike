# Decision Log — Ifedike Victor Portfolio

- **Date:** 2026-10-26 (plan approved); **identity re-ruled 2026-10-27.**
- **Status:** Planning closed — owner approved 2026-10-26; identity addendum added 2026-10-27. Build is a separate step.
- **Owner:** Makuo Ifedike (legal name Victor Makuo Ifedike; previously recorded as Ifedike Victor)
- **Related:** `plan.md`, `portfolio-six-layer-plan.md`, `engagement-plan.md`, `project-facts.md`, `architect-handoff.md`, `scraper-handoff.md`, `scraper-to-pm-handoff.md`, `six-layer-template.md`, `research/profile-data.json`
- **Source:** Conversation between the owner and the Product Management agent; owner identity ruling 2026-10-27 recorded in `research/profile-data.json` (owner_rulings, src-051/src-052).

## How to read this log

- **Decided** — the owner has decided; build to this.
- **Recommended** — the agent’s recommendation; the owner can override.
- **Default** — proposed value used unless the owner says otherwise.
- **Accepted default** — approved default used where the owner did not specify a value.
- **Superseded** — an earlier decision that has been replaced.

---

## Project snapshot

- **Product:** personal portfolio for Makuo Ifedike (recorded as Ifedike Victor until 2026-10-27).
- **Goal:** turn visitors into qualified project conversations.
- **Audience (assumed):** small-business owners/operators who need a marketing site, a web app, or help fixing a slow or half-built system.
- **Stack:** pure Next.js app.
- **Identity:** Ifedike Victor only — superseded 2026-10-27. Display name: **Makuo Ifedike** (see Identity addendum).
- **Projects:** four featured; 15 counted non-forked projects verified in `research/profile-data.json`.
- **Form:** popup only, triggered by an engagement CTA; no inline form.
- **Engagement:** all nine touchpoints kept, timed, never stacked.

---

## 1. UI

### Decided

- **Public identity is Ifedike Victor only — superseded 2026-10-27.** Display name: **Makuo Ifedike**; legal name **Victor Makuo Ifedike** is kept in structured data only (legalName/alternateName), never as H1 or title (see Identity addendum).
- **Whitefire is dropped for now.** It is not used in the site title, metadata, logo, footer, or social handles until it is registered and operating as a studio.
- **Pure Next.js app.** The visible page is built as Next.js components and routes — not a static `public/andle-portfolio.html` behind a redirect.
- **Engagement appearance is not the agent’s decision.** The “sliding” point was about a **timer**, not how the engagement looks or animates. The plan covers timing and queue behavior only.
- **Visual direction — decided:** keep the current dark Andle look. No redesign.
- **Portrait — decided:** the owner has a portrait. He will produce the final version on a black background. It is a build-time asset, not a planning input; do not demand the file now. The builder uses the final asset when it is supplied.

### Recommended / defaults

- Keep the current palette, fonts, and spacing; replace the placeholder content and stock assets.
- Fonts: keep Inter, Poppins, and Zilla Slab unless a new brand direction says otherwise.
- Use one icon system; remove duplicate icon stylesheets.
- Keep the current Andle color palette until brand colors are defined.

### Defaults — accepted

| Item | Accepted default |
|---|---|
| Brand colors | Current Andle palette |
| Logo | Use the Makuo Ifedike name as a wordmark until a logo exists |
| Component library | Use the existing shadcn/Radix components only where needed |
| Animation approach | CSS transitions; respect reduced motion |
| Visual reference | Current Andle page |

### Acceptance criteria

- No Whitefire references anywhere.
- No placeholder copy.
- No fake client logos; no stock portrait — use the owner’s final portrait when supplied.
- Every link resolves.
- Responsive on mobile, tablet, and desktop.
- WCAG AA contrast, focus states, and keyboard access.

---

## Identity addendum — 2026-10-27

Owner rulings recorded in `research/profile-data.json` (owner_rulings, decided 2026-10-27, sources src-051/src-052). This addendum amends the identity lines above; the old text is kept for the record.

| Field | Ruling (2026-10-27) |
|---|---|
| **Display name** | **Makuo Ifedike** — used on H1, title, and visible surfaces |
| **Legal name** | **Victor Makuo Ifedike** — `legalName` / `alternateName` in structured data only; never the H1 or title |
| **Work email** | `mifedike@gmail.com` |
| **Personal email** | `victormakuo2002@gmail.com` (the earlier `victoemakuo2002` was a typo and is rejected) |
| **LinkedIn** | `https://www.linkedin.com/in/makuoifedike/` — the only profile |
| **X** | `https://x.com/lwhitefire` |
| **GitHub** | `https://github.com/lordwhitefire` |
| **Experience start** | **July 2022** (learning/building), not the GitHub account date |
| **Duration as of 2026-10-27** | **4 years 3 months** |
| **Location** | **Onitsha and Awka**, Anambra State, Nigeria (owner lives in both) |
| **Graduation** | **2025** — B.Eng Chemical Engineering, Nnamdi Azikiwe University (owner says 2024 was the planned year but could not start one year, so finished in 2025) |

**Whitefire:** stays dropped as a personal identity. The 2026-10-27 ruling did not reverse it. Interior-deco remains branded **Whitefire Interior** — that is the project's brand, not the owner's studio or a confirmed client engagement.

**Rejected values — do not reintroduce:**
- `Ifedike Victor` and `Ifedike Victor Makuo` as display names.
- LinkedIn slugs `makuo-ifedike-216607350` and `victor-m-ifedike-2039a2239`.
- Emails `victormark2002@gmail.com` and `victoemakuo2002@gmail.com`.
- The old portfolio's "eight months" line and LinkedIn's "5 years 3 months" as current claims.

The two-name choice is deliberate: shorter, matches X and the live sites, and avoids three-name variants competing in search. The full name is not lost — it stays in structured data.

**UI direction — owner confirmed 2026-10-27:** do not change the UI. The approved plan stands: dark Andle look, same-page case-study modals, no separate project pages. The information being gathered now goes into the website code (structured data, JSON-LD, llms.txt) — not onto the screen.

---

## 2. Data

### Decided

- **Four featured projects (verified live):**

  1. **Interior-deco** — interior design studio site (Whitefire Interior) — live — `https://interior-deco-kappa.vercel.app/`
  2. **Truespec** — dealership system (public showroom + private office) — live — `https://truespec-k4y6.vercel.app/`
  3. **Athletica** — football store / e-commerce platform with Amazon affiliate settings — live preview — `https://athletica-blond.vercel.app/`
  4. **CP3-legacy** — Chris Paul fan site / sports experience — live — `https://cp3-legacy.vercel.app/`

- **Wider inventory — 15 counted non-forked public repositories (2026-10-27):** verified in `research/profile-data.json`; 20 forks and one empty repo excluded. Other live projects include new-portfolio (FireSage Studio), eliphany-ng, eliphany-admin, Admin-demo, odin-landing-page, freecodecamp_project_4; unreleased/supporting projects include agentic-video-system, interior-deco-cms, youtube-analytics, online-store, and the lordwhitefire profile README. The four featured remain the portfolio set unless the owner decides otherwise.

- **These labels are verified against GitHub and the live sites.** See `project-facts.md` for the evidence. The current portfolio’s “affiliate platform” and “athlete-focused software — in development” labels are incomplete or wrong.

- **Truespec is the dealership system and the true milestone.** It is not a fifth project. The current portfolio calls it an “inventory app + public site,” which undersells it. The case study and milestone should lead with the dealership system: documented migration history, back office, auth, and PDF enquiries.
- **Content should be structured**, not repeated in HTML. The four projects should come from one source of truth.
- **Machine-readable information layer — decided:** the visible UI stays neat; heavy, truthful information about the owner and projects goes into JSON-LD in the `<head>`, `llms.txt`, metadata, sitemap, and robots. No CSS-hidden text. The scraper task is in `scraper-handoff.md`; it feeds `Person`, `ProfilePage`, `WebSite`, `CreativeWork`/`SoftwareApplication`, `Organization`, `sameAs`, and `creator`.
- **Identity — decided 2026-10-27:** display name **Makuo Ifedike**; legal name **Victor Makuo Ifedike** kept in structured data only. The prior "Ifedike Victor" name is superseded; do not reintroduce it as a display name (see Identity addendum).
- **Case studies — decided:** a **large modal** opens from each project card on the same one-page site. There are no separate work detail pages, no `/work/[slug]`, and no `project-details.html`. The modal is the case study; its **only link** goes to the real live project. No contact form inside the case-study modal.
- **Case-study outcomes — decided: no numbers.** No outcome metrics or invented counters in the modals. Structure: problem → constraints → approach → outcome in words → stack → live link. Verified technical scope stays in `project-facts.md`; public copy does not use performance numbers.
- **Project images — decided:** the agent gathers screenshots from the four live sites. For Truespec’s authenticated back office, use owner-provided screenshots or a demo login; otherwise capture the public pages.
- **Client logo strip — decided:** replace it with a **My Stack** section. No client logos or client names. The current strip is stock office photos with `#` links, not client logos.
- **My Stack — decided:** the former logo strip becomes a **My Stack** grid. Use the owner’s real stack from the four projects: **Next.js, Remix, React, TypeScript, Tailwind CSS, Sanity, Supabase, Neon/Postgres, Prisma, Clerk, Vercel, Playwright**. No client logos.
- **My Stack layout — decided:** a static 6×2 grid on desktop (4 columns tablet, 2 mobile), with 28 px monochrome marks and visible labels. No marquee. Playwright is the 12th item and balances the grid; if it is swapped for Vitest, the 6×2 grid stays.
- **Logo source — decided:** Simple Icons for most marks (`https://simpleicons.org`; white SVGs at `https://cdn.simpleicons.org/<slug>/white`) — `nextdotjs`, `react`, `remix`, `typescript`, `tailwindcss`, `sanity`, `supabase`, `neon`, `prisma`, `clerk`, `vercel`. Playwright is not in Simple Icons; use the official `https://playwright.dev/img/playwright-logo.svg` recoloured to white, or substitute Vitest. For wordmarks or strict brand rules, use the official brand kits (Vercel includes Next.js, Supabase, Prisma, Tailwind, TypeScript, Remix, Neon). Download and self-host in `public/logos/`; do not hotlink.

### Recommended / defaults

- Project schema: slug, title, category, status, summary, problem, constraints, approach, outcome (words, no numbers), stack, live URL, repo URL, images, testimonial, dates, featured.
- Case studies: four modals, one per project; Truespec comes first.
- Use real project screenshots; replace the stock client strip with a **My Stack** grid; no client logos.
- Derive filters from the project data; remove counters unless a verified number exists.
- Case studies use no outcome numbers; the modal is the case study.

### Defaults — accepted

| Item | Accepted default |
|---|---|
| Project outcomes/metrics | **No numbers** in case studies; no invented metrics |
| Testimonials | No testimonial section until real testimonials exist |
| Client logos / My Stack grid | No client logos; use the owner’s real **My Stack** list |
| Project images | Screenshots from the live sites; no stock office photos |
| Portrait | Owner has one; final black-background version supplied at build time — not a planning blocker |
| Case-study length | Large modal per project — problem, constraints, approach, outcome in words (no numbers), stack; only link is the live project |

### Acceptance criteria

- One source of truth per project.
- No project card is duplicated across filter tabs.
- No unverified counters; counters removed unless verified.
- No unverified claims.
- Truespec’s dealership story is visible and linked to the milestone.

---

## 3. Business logic

### Decided

- **No inline form and no form section on the page.** The only form is a popup.
- **The form opens only when the visitor clicks the necessary engagement CTA.**
- **Form trigger — delegated to the agent:** the **chat bubble’s “Talk” action** is the primary trigger. The **exit-intent modal’s CTA** is the secondary trigger. The other seven touchpoints keep their current jobs.
- **All nine engagement touchpoints stay.** The earlier “cut to one” recommendation is withdrawn.
- **Timers, not stacking:** each prompt appears, runs on a timer, disappears when the timer ends, and a gap follows before the next one.
- **Appearance is not the agent’s decision.** Only timing, order, and no-stacking behavior are planned.
- **Notification model — decided:** the **Google Sheet is the record** of every inquiry; **WhatsApp is the second alert channel** (the owner chose WhatsApp over Telegram); **email is the backup**. The visitor receives an automatic reply.
- **First prompt timing — decided:** the chat bubble appears after **8 seconds**.
- **First bubble copy — decided:** keep the current wording unchanged: “Hey — quick question: are you here for a marketing site, a web app, or fixing something that’s broken?” Buttons: **See the work**, **About me**, **Talk**. Do not tighten it.
- **Engagement plan — decided:** all nine touchpoints are specified in `engagement-plan.md`. One prompt at a time; 20-second cooldown; behaviour-first. The first bubble is fixed at 8 seconds; the returning copy, form copy, and #4–#7 timings were approved on 2026-10-26.
- **No session cap — decided:** all nine are eligible in a session. The three-prompt guardrail is withdrawn; the queue controls order, not the number.
- **The nine touchpoints are not all prompts:**

  | # | Touchpoint | Type |
  |---|---|---|
  | 1 | First-time visitor floating chat bubble | Timed prompt |
  | 2 | Returning visitor message | Modifier of #1 |
  | 3 | Time-of-day hero eyebrow | Passive |
  | 4 | Scroll 50% sticky banner | Timed prompt |
  | 5 | Idle 45s slide-in panel | Timed prompt |
  | 6 | Exit-intent modal | Timed prompt |
  | 7 | Footer confetti + toast | Timed prompt |
  | 8 | Project card hover tooltip | Passive |
  | 9 | Referrer-aware opener | Modifier of #1 |

### Recommended / defaults

- **Form fields:** name, email, need type (marketing site / web app / fix), budget range, timeline, message; optional project link.
- **Destination:** the Google Sheet is the record of every inquiry; email and WhatsApp are alerts; auto-response to the visitor.
- **WhatsApp alert — the chosen second channel:** an instant message with the visitor’s name, need, budget, and timeline, sent through Zapier, Make, or the form service. It is deliberately separate from the inbox so it is hard to miss.
- **Email backup:** subject starts with `[PORTFOLIO]`; a Gmail filter applies the “Portfolio” label, stars it, marks it important, and never sends it to spam. A separate address or alias for site inquiries is preferred.
- **Recognizable heading — decided:** every alert uses the same label, **`[PORTFOLIO] New inquiry`**. Email subject: `[PORTFOLIO] New inquiry — {name}`. WhatsApp first line: `[PORTFOLIO] New inquiry`. The Google Sheet tab is named `Portfolio Inquiries`, with clear column headers.
- **Routine:** check the Sheet daily; review weekly; update each row’s status — new → qualified → replied → won/lost.
- **Auto-reply:** the visitor receives “Thanks — I’ll reply within one business day.”
- **Notification flow:** visitor submits → Google Sheet row → email alert with the `[PORTFOLIO]` label → WhatsApp alert → auto-reply → owner updates the row’s status.
- **Why this model:** email alone is unreliable because of inbox noise; the Sheet is the permanent record, and WhatsApp is the hard-to-miss second channel.
- **Spam protection:** honeypot plus rate limit; add Turnstile if spam appears.
- **Consent:** checkbox with a link to the privacy page.
- **Form behavior:** the form stays open until the visitor submits or closes it; the timer applies to the prompt, not the form.
- **Form popup copy — decided:** heading **“Tell me what you need”**; submit label **“Send inquiry.”**
- **Timing sequence** (all approved 2026-10-26):

  | Order | Prompt | Delay / duration |
  |---|---|---|
  | 1 | Chat bubble | Appears at 8s; stays 14s |
  | 2 | Scroll banner | At 50% scroll, only if no prompt in the last 20s; stays 10s |
  | 3 | Idle panel | After 45s inactivity, only if no prompt in the last 30s; stays 15s |
  | 4 | Exit-intent modal | Only after 20s on page and no prompt in the last 30s; auto-dismiss after 20s |
  | 5 | Footer toast | 8s; confetti 2s, once |

- A cooldown of roughly 20–30 seconds between prompts prevents stacking.

### Defaults — accepted

| Item | Accepted default |
|---|---|
| Engagement order | The table above |
| Exact timings | The table above |
| Form fields | Name, email, need type, budget range, timeline, message |
| Form destination | Google Sheet record + email backup + WhatsApp alert — decided |
| Qualification rubric | Need type, budget, timeline, decision-maker; disqualify spam, recruiters, students, vendors |
| Privacy/consent | Checkbox + privacy page |

### Acceptance criteria

- No two prompts are visible at the same time.
- The form never opens without a click.
- The form submission lands in the Google Sheet and triggers the email and WhatsApp alerts.
- Every alert starts with `[PORTFOLIO] New inquiry`, so it is recognizable at a glance.
- There is no form section on the page.
- The form is usable with a keyboard and on mobile.

---

## 4. Functionality

### Decided

- **Pure Next.js app** with real routes; the static HTML page and redirect are retired.
- **Popup form only** — no inline form.

### Recommended / defaults

- Routes: `/` (one-page home with sections) and 404. Project cards open a large case-study modal on the same page; there are no work detail routes. Contact is the popup. About stays a section on the home page.
- Fix all dead links.
- Make the work filters real, or remove them.
- Remove counters unless verified; no invented numbers.
- SEO: per-route metadata, Open Graph images, sitemap, robots, canonical URLs, `Person`/`ProfessionalService` structured data; remove `noindex` when public.
- Analytics events: `page_view`, `project_view`, `cta_click`, `inquiry_start`, `inquiry_submit`, `outbound_project_click`.

### Defaults — accepted

| Item | Accepted default |
|---|---|
| Page list | One-page home + 404; case studies are modals |
| SEO targets | Indexable, sitemap, robots, OG, schema |
| Performance targets | LCP < 2.5s, CLS < 0.1, Lighthouse 90+ |
| Accessibility | WCAG AA |
| Testing | Build + link checker + one Playwright smoke test |
| Contact page | Deferred — not added now; popup form + footer links cover inquiries |

### Acceptance criteria

- Every link resolves.
- The popup form works on mobile and desktop.
- Each project card opens its own case-study modal.
- Search engines can index the site.
- Analytics events fire.

---

## 5. UX experience

### Decided

- **Makuo Ifedike is the person being hired.** The site reads as one person, start to finish.
- The **popup form is part of the engagement journey**, not a page section.
- The visitor gets time; **prompts never stack**.
- **Proof comes before prompts.**

### Recommended / defaults

- Narrative: who I help → what I do → proof → how I work → who I am → start a conversation.
- Above the fold: one-line promise, primary CTA, and a secondary “see the work.”
- Repeat one primary CTA at natural decision points.
- Mobile-first; accessible dialogs; reduced motion.

### Defaults — accepted

| Item | Accepted default |
|---|---|
| Engagement order on mobile | Same order; longer gaps |
| Privacy/cookies | Privacy page + form consent checkbox; banner only if analytics cookies are introduced |
| Success/error feedback | Inline form states and a toast |
| Response-time promise | “I reply within one business day” |

### Acceptance criteria

- A visitor understands the offer in about five seconds.
- Proof appears before the first prompt.
- No overlapping prompts.
- Keyboard and screen-reader usable.

---

## 6. System model

### Decided

- **Pure Next.js app is the architecture.** One system, not a static page behind Next.js.
- **Retire `public/andle-portfolio.html` and the redirect.**
- **Domain — decided:** `makuo-ifedike.vercel.app` (owner requested `makuo_ifedike.vercel.app`; underscores are invalid in hostnames, so Vercel requires a hyphen or no separator — `makuo-ifedike.vercel.app` or `makuoifedike.vercel.app`). Owner to confirm final spelling.
- **Hosting — decided:** Vercel.
- **Analytics/consent — decided:** Vercel Analytics plus custom events (`page_view`, `project_view`, `cta_click`, `inquiry_start`, `inquiry_submit`, `outbound_project_click`); privacy page; form consent checkbox; cookie banner only if cookies are introduced.

### Recommended / defaults

- Next.js 16 (current `^16.1.1`), App Router, TypeScript.
- Keep Andle CSS for the existing page; use Tailwind/shadcn only for new UI.
- Preview deploys; a custom domain can replace the free Vercel domain later.
- Remove unused dependencies — Prisma, next-auth, TanStack Query/Table, Radix components that are not used, Recharts, MDX editor, and similar — after verifying no usage.
- Add git, CI (build, typecheck, link check), analytics, and error monitoring.
- Set `typescript.ignoreBuildErrors` to `false`.
- Add a README, a decision log, and a short content workflow.

### Defaults — accepted

| Item | Accepted default |
|---|---|
| Domain | Decided — `makuo_ifedike.vercel.app` (owner's choice; underscore may need hyphen) |
| Hosting | Decided — Vercel |
| Analytics | Decided — Vercel Analytics + custom events; privacy page; form consent checkbox |
| Error monitoring | Sentry free tier or Vercel logs |
| CI | GitHub Actions: install, typecheck, build, link check |
| Documentation | README + this decision log + content workflow |

### Acceptance criteria

- One build, one deploy, one source of truth.
- No unused dependencies.
- CI catches broken links and placeholders.
- Analytics and form submissions are visible.

---

## 7. Athletica checklist — what we use

Source: `/home/lordwhitefire/current-project/athletica/web-development-areas.md` (80 areas).

- **Use:** Section A (01–33) and the applicable parts of Section E (73–80).
- **Skip:** Section B (e-commerce), most of Section C (auth, dashboards, multi-tenancy), Section D (mobile/desktop), offline/PWA, i18n, database backups.

### Mapping to the six layers

| Layer | Checklist areas |
|---|---|
| **UI** | 02 stack (CSS/component library), 03 design system, 04 brand, 12 assets/icons, 23 animation approach |
| **Data** | 01 project setup (audience/domain), 12 assets, project/case-study details, 07 SEO metadata |
| **Business logic** | 25 forms/validation, 24 modals/feedback, 20 legal/consent, 63 spam/rate limiting, 80 integrations |
| **Functionality** | 06 routes, 07 SEO, 08 performance, 09 responsive, 10 browsers, 11 accessibility, 17 testing, 29 redirects |
| **UX** | 03/04 brand, 09 responsive, 11 accessibility, 20 legal, 24 feedback, 23 motion |
| **System model** | 01 hosting/domain, 02 stack, 05 frontend architecture, 14 env, 15/16 workflow, 17 testing, 18 deployment, 19 monitoring, 21 docs, 77 security, 80 integrations |

### Inputs still needed — with defaults

| Input | Default if the owner does not specify |
|---|---|
| Domain | Owner-provided; use Vercel preview |
| Hosting | Vercel |
| Deadline | No fixed deadline; truth pass first |
| Budget | Not tracked in this plan |
| Audience | Small-business owners, Nigeria and international |
| Currency | NGN/USD as appropriate |
| Design direction | Keep Andle + Ifedike Victor branding |
| Page list | One-page home + 404; case studies are modals |
| Form destination | Google Sheet record + email backup + WhatsApp alert — decided |
| Engagement timings | The table in section 3 |
| Assets | Real screenshots, real portrait, no fake logos |
| Legal | Privacy page; consent if analytics cookies |
| Testing | Build + link check + Playwright smoke |
| Monitoring | Vercel Analytics + Sentry/logs |

---

## 8. What changed from the earlier plan

| Earlier recommendation | Current decision |
|---|---|
| Choose between Ifedike Victor and Whitefire | Ifedike Victor only; Whitefire dropped until registered/studio |
| Architecture A (Next.js) vs B (static) | Pure Next.js app — architecture A |
| Cut the 9 engagement touchpoints to one | Keep all 9; serialize with timers so they never stack |
| Add a form/booking section | No inline form; popup form only, triggered by engagement CTA |
| Form trigger unclear | Bubble “Talk” primary; exit-intent modal secondary |
| Email-only notifications risk being missed | Google Sheet is the record; email is the backup; WhatsApp is the second alert channel |
| Alerts had no consistent label | Every alert starts with `[PORTFOLIO] New inquiry` |
| Three-prompt session cap proposed | Withdrawn — all nine are eligible in a session |
| First bubble at 3s; copy to be tightened | First bubble at 8s; current copy kept unchanged |
| Truespec may be a fifth project | Truespec is the dealership system and the true milestone; no fifth project |
| Athletica was labelled “affiliate platform”; CP3 was labelled “athlete-focused software — in development” | Athletica is a football store with admin and Amazon affiliate settings; CP3-legacy is a live Chris Paul fan site |
| Project labels were assumed | Verified against GitHub and the four live sites; see `project-facts.md` |
| Domain undecided | `makuo_ifedike.vercel.app` (owner's choice; underscores invalid — needs hyphen) |
| Visual direction unclear | Keep the current dark Andle look |
| Stock “client” strip with `#` links | Replaced with the **My Stack** grid; no client logos |
| Case-study metrics assumed | No numbers in case-study outcomes; outcome in words |
| Case studies unclear | Large modal per project on the same page; only link is the real project; no project detail page |
| Engagement appearance | Not the agent’s decision; only timing/no-stacking |
| Use the athletica checklist selectively | Use Section A + applicable E; map to the six layers |

---

## 9. Next step

- The six-layer plan is updated from this log; project facts are in `project-facts.md`.
- The remaining work is owner review of the plan, not more project research.
- No code changes by this agent. The plan is approved; implementation is a separate build step.
