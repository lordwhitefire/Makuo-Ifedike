# TASK-007 — Polish and ops

## What this is

The last group. Six pieces of work that make the finished site measurable, observable, and documented:

0. Truespec's live URL moves to `truespec.duckdns.org`.
1. Accessibility to WCAG AA.
2. Performance inside the budget.
3. Error monitoring.
4. A browser smoke test, alongside the link check that already exists.
5. A README and a content-workflow document.

None of it changes what the site says or how it is laid out. Fix only what a measurement shows is broken.

## Order and commits

Commit your plan first — a single `plan` commit with your own plan for this task (`task.md` and `testing.md` are already committed) — then one commit per part, each green on its own (`tsc`, `validate:content`, `build`):

0. `domain` — Truespec live URL
1. `a11y` — accessibility
2. `perf` — performance
3. `monitoring` — error monitoring
4. `smoke` — Playwright
5. `docs` — README and content workflow

Seven commits in total. Do not push. Do not deploy.

---

## 0. Truespec live URL

Truespec now lives at `https://truespec.duckdns.org/`, not `https://truespec-k4y6.vercel.app/`.

Change, in this order:

1. `content-workspace/pieces/llms-txt.md` and `content-workspace/pieces/person-jsonld.md` — the source of truth. Every Truespec live URL.
2. `src/content/projects.ts` — `truespec.liveUrl` and `truespec.caseStudy.liveLink`.
3. `public/llms.txt` — the Truespec URL.
4. `src/content/structured-data.ts` reads `project.liveUrl`, so JSON-LD follows automatically. Confirm it, do not hard-code the URL there.

**Only those two files in `content-workspace/`.** Do not touch anything else there. `content-workspace/drafts/` holds earlier copies of the same pieces and keeps the old URL — the source of truth is `pieces/`, so drafts stay as they are.

**Do not rewrite historical records.** Reports, notes, plans, parity captures, `scrape-workspace/` captures and `product-management/research/` record what was true when they were written. Leave them.

**The portfolio's own canonical domain is unchanged:** `https://makuo-ifedike.vercel.app/`. Do not touch `identity.url`, `identity.image`, the metadata base, `sitemap.ts`, or `robots.ts`.

Verify before changing anything: `curl -I https://truespec.duckdns.org/` returns 200 and the page is the Truespec site. If it does not resolve, skip this step, do the other five, and report it as blocked.

### Benchmarks

- The Truespec card and its case-study live link open `https://truespec.duckdns.org/`.
- `grep -rn "truespec-k4y6" src/ public/ content-workspace/pieces/` returns nothing.
- The Truespec JSON-LD `url` and `llms.txt` both show the new domain.
- The portfolio canonical is still `https://makuo-ifedike.vercel.app/`.

---

## 1. Accessibility — WCAG AA

### What to do

**Skip link.** The `<header>` and `<SiteNav>` currently sit inside `<main>` (`src/app/page.tsx`), so a skip link would skip nothing. Move the header outside `<main>` first — it is `position: fixed`, so the page looks identical. Then:

- add `id="main"` and `tabIndex={-1}` to `<main>`;
- add "Skip to content" as the first focusable element in the document, targeting `#main`;
- it is visually hidden until focused, then appears as a small bar at the top left.

**Focus indicators.** Every interactive element must show a visible focus ring when reached by keyboard. Add one global rule in `globals.css` (`:focus-visible`) rather than per-component classes. It must be visible against both the dark background and the orange buttons. Do not remove focus outlines anywhere.

**Contrast.** Run an axe audit on the built site at desktop and mobile widths. Fix only the failures it reports. Likely candidates, confirm before changing:

- `text-white/35` and `text-white/30` on `#1a1613` (form labels, "(optional)", placeholders);
- `text-white/50` on small uppercase text;
- footer and milestone secondary text.

Keep the palette. Raise opacity or switch to an existing token — do not introduce new colours.

**Hit areas.** Every icon-only button (the × on prompts, the launcher, BackToTop) must have at least a 44×44 CSS-pixel touch target. Grow the padding or add an invisible hit area; do not enlarge the visible glyph.

**Keyboard.** Walk the whole page with Tab only:

- the skip link is first and works;
- the nav, the work filter, the launcher, and the form are all reachable;
- the contact form traps focus, closes on Escape, and returns focus to whatever opened it;
- every prompt closes with Escape and returns focus.

**Reduced motion.** Under `prefers-reduced-motion: reduce`:

- the launcher's 120s ring drain must not animate (show a static state instead);
- the prompt slide-in transitions must be instant;
- the existing reveal and carousel guards stay as they are;
- the confetti guard from TASK-006 stays.

**If the audit tool will not run.** Run the same checks inside Playwright instead — it is added in section 4 — with no extra package. Say in the report which tool produced the result.

### Constraints

- No copy changes, no section reordering, no new visible boxes.
- The hidden/disabled mobile menu stays as it is.
- The skip link is the only new visible element, and only while focused.
- Fix every serious and critical violation and every contrast failure. Any moderate or minor item left unfixed is named in the report with its reason. Do not redesign to clear a listing.

### Benchmarks

- axe reports **zero serious or critical** violations on `/` at 390×844 and 1440×900.
- Keyboard-only: reach the contact form, fill it, submit, close — without a mouse.
- `Tab` from the top: the first stop is the skip link; Enter moves focus into the page content.
- With reduced motion on, the ring does not drain and prompts appear without sliding.

---

## 2. Performance — LCP under 2.5s, CLS under 0.1

### What to do

**Portrait — replace, do not delete.**

- `public/images/portrait.webp` — the hero background. Under 300 KB, same crop and position, used by the `bg-[url(...)]` block in `src/app/page.tsx`.
- `public/images/portrait.png` — a **small PNG at the same path**, under 300 KB, kept for Open Graph and JSON-LD. `identity.image` already points at `/images/portrait.png`; do not change that path.
- Move the 1.3 MB original and the existing `public/images/portrait.png.bak` to `content-workspace/assets/` (create the folder). Both are content and brand source files; `developer-workspace/` is a log of work, not an asset store.
- Nothing large stays in `public/`. `npm run build` copies all of `public/` into the deployment, so the `.bak` file is currently shipping to production.

**Measure, then fix.** Run Lighthouse mobile against the production build (`npm run build && npm run start`) on `/`. Record LCP, CLS, and the top opportunities. Fix only what the report shows, in this order: the portrait, render-blocking work, and any late-loading font.

Do not change layout or text to win a score.

### Benchmarks

- Lighthouse mobile, production build: **LCP < 2.5s**, **CLS < 0.1**, performance score ≥ 90.
- The portrait request is under 300 KB and the hero looks unchanged at 390 and 1440 widths.
- No layout shift when the portrait or the fonts load.

---

## 3. Error monitoring

### What to do

Use Vercel logs — no new account and no dependency. If the owner later supplies a Sentry DSN, this can be swapped, but nothing in this task should block on a credential.

**App error boundaries.** Add `src/app/error.tsx` and `src/app/global-error.tsx`. Each renders a minimal, on-brand fallback with one reload link, and logs the error with `console.error` so it reaches Vercel logs. No stack trace or error text is shown to the visitor.

**Client error reporter.** Add `src/app/api/client-errors/route.ts`:

- accepts `POST` with `{ message, stack, url, userAgent }`;
- rejects bodies over 8 KB and anything without `message`;
- logs one structured JSON line via `console.error`;
- returns `204`;
- never accepts form values, names, emails, or anything typed by the visitor.

Add a small client listener (mounted once, e.g. in `layout.tsx` or a tiny client component) that posts on `window.error` and `unhandledrejection`. Cap it at 5 reports per page load. Any error the app shows the visitor also posts through this reporter, so it appears in Vercel logs. Never send form values.

**Server route.** In `src/app/api/inquiries/route.ts`, make sure an unexpected failure logs the error with context before returning 500. Do not log the submitted form contents.

### Benchmarks

- Throw a deliberate error in a client component (locally): the fallback renders, and the error appears as one JSON line in the server log.
- `POST /api/client-errors` with a valid body returns 204 and logs one line; with a 9 KB body it returns 413 and logs nothing.
- A failed submit logs the server error without the form's name, email, or message fields.
- No new dependency.

---

## 4. Playwright smoke test

### What to do

The link check already runs in `.github/workflows/ci.yml`. Keep it. Add a browser smoke test.

- Add `@playwright/test` as a dev dependency.
- Add `playwright.config.ts` with `webServer` running the production build on port 3100, one Chromium project, base URL `http://localhost:3100`.
- Add `data-featured` to the Truespec work card in the markup: a plain hidden attribute, no badge, no label, no visible change.
- Add `tests/smoke.spec.ts` covering exactly:

1. `/` loads with status 200 and the correct `<title>`.
2. The four project cards are present (Interior-deco, Truespec, Athletica, CP3-legacy), and the Truespec card carries a hidden `data-featured` attribute — no badge, no copy.
3. The orange launcher opens the contact form.
4. Submitting the empty form is blocked by the browser's own validation and sends no request.
5. Escape closes the form and focus returns to the launcher.
6. The page contains no `ifedikemakuo.vercel.app` and no `localhost` in any project link.
7. The Athletica card links to `athletica-blond.vercel.app`.
8. The Truespec card links to `truespec.duckdns.org`.

No modal tests — the case-study modal is scrapped by owner decision.

- Add a CI step: `npx playwright install --with-deps chromium`, then `npx playwright test`. Keep the job's existing timeout in mind; raise it only if the run genuinely needs it.
- Add `npm run test:e2e` so a person can run it locally.

### Benchmarks

- `npm run test:e2e` passes locally against a fresh production build.
- CI runs install, typecheck, build, content validation, link check, and the smoke test, all green on `main`.
- The smoke test fails if any of the seven checks above is broken — prove one by temporarily breaking it (for example, change the Athletica URL) and watching the test fail, then revert.

---

## 5. README and content workflow

### What to do

**`README.md`** at the repo root:

- what the site is, in two sentences;
- the stack (Next.js 16 App Router, TypeScript, Tailwind 4);
- scripts: `dev`, `build`, `start`, `lint`, `validate:content`, `test:e2e`;
- environment variables from `.env.example`, and which are required per environment;
- how to deploy (Vercel, `makuo-ifedike.vercel.app` is the only canonical domain);
- the folder map: `src/app`, `src/components`, `src/content`, `src/lib`, `content-workspace`, `openspec`, `developer-workspace`, `design-workspace`.
- a short "where to change what" table: project records, identity, milestones, inquiry options, engagement copy;
- a link to the existing `SETUP.md`, which stays untouched.

**`docs/content-workflow.md`**:

- `content-workspace/` is the source of truth for copy; `src/content/` is what the site renders.
- how a piece moves from `content-workspace/pieces/` into `src/content/`, and that another agent's file is never edited silently.
- what `npm run validate:content` checks (16 checks today) and how to add a new one.
- the domain rule: `makuo-ifedike.vercel.app` only; `ifedikemakuo.vercel.app` must never appear.
- statuses: Interior-deco and Truespec live; Athletica and CP3-legacy in progress.
- dates are labelled "created", never "launched".

Write both from what the code actually does. If a script or path in the README does not exist, fix the README, not the code.

### Benchmarks

- Every command in the README runs as written from a clean checkout.
- A person who has never seen the repo can change a project's summary by following the workflow document, and `npm run validate:content` tells them if they broke a rule.
- `grep -r "ifedikemakuo" README.md docs/` returns nothing.

---

## Out of scope

- Any change to copy, section order, cards, counters, milestones, or the My Stack grid.
- The hidden/disabled mobile menu, the scrapped case-study modal, and the work-card tooltip.
- New features, new dependencies beyond `@playwright/test`, and any hosted service that needs a credential.
- Group 7's earlier items are done; do not re-open Group 6.
