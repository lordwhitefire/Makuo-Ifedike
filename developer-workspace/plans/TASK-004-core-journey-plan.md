# Implementation Plan — TASK-004 Core Journey

**Status:** awaiting owner confirmation
**Baseline:** `2f4aba8` (TASK-003 complete)
**Branch:** `main`
**Owner:** Makuo Ifedike
**Developer:** Big Pickle

---

## 1. Overview

TASK-004 turns the Group 3 data spine into the visitor journey. The owner has removed most of
the original TASK-004 UI scope: no case-study modal, no hero rewrite, no card reorder, no
section reorder, no milestone rewrite, no counter removal. What remains is:

1. Hide every engagement prompt behind one off-switch (code kept).
2. Add one small round icon button that opens a popup inquiry form.
3. Build the form + env-gated sending code for Google Sheets, Resend email, Twilio WhatsApp,
   and the auto-reply. No accounts or keys are created now.
4. Add the `/privacy` page the consent checkbox links to.
5. Make the existing Work filter buttons actually filter, rendering each card once.
6. Add the custom 404, SEO metadata, robots, sitemap.
7. Add the JSON-LD `@graph` in the page head and `public/llms.txt`.
8. Correct every published "four live projects" / "Live" status to the truth:
   Interior-deco + Truespec live; Athletica + CP3-legacy in progress.

The visible UI stays as it is except for the single icon button the owner asked for. The
slideshow, card order, milestones, counters, My Stack strip, service boxes, and dead links are
untouched.

---

## 2. Owner decisions that override the task file

| # | Decision |
|---|---|
| Q1/Q20 | Build the form and the sending code. Google Sheets (service account), Resend (email + auto-reply), Twilio (WhatsApp). Each destination off until keys exist. No accounts created. |
| Q2 | Hero unchanged. No promise or CTA added. Slideshow exactly as-is. |
| Q3 | Interior-deco stays first. Truespec stays second. No reorder. |
| Q4/Q14/Q23 | Filters become real. Each card renders once per filter. Buttons unchanged. Hidden labels/data attributes, no hidden text. |
| Q5 | Milestones and counters unchanged, including the verified numbers. |
| Q6 | Case-study modal scrapped. No modal on card click. Cards keep their existing live-link behavior. |
| Q7 | No section reorder, no removal, no My Stack change, no service-box change. |
| Q8 | Metadata claim corrected: two live, two in progress. |
| Q9 | JSON-LD project statuses: Athletica and CP3-legacy = in progress. |
| Q10 | Create a simple `/privacy` page. |
| Q11 | Dead links and the hidden mobile menu stay as-is. |
| Q12 | `https://makuo-ifedike.vercel.app/` is the only domain. |
| Q13 | Truespec is the featured/star project. |
| Q15 | No testimonial section, no quotes, empty. |
| Q16/Q21 | JSON-LD `<script type="application/ld+json">` in the head (invisible). `/llms.txt` live at root. |
| Q17 | Case-study prose goes into JSON-LD description fields, not a modal. |
| Q18 | Athletica uses `https://athletica-blond.vercel.app/`. |
| Q19 | Dates are `created`, never `launched`. |
| Q22 | Build the custom 404. |
| Q24 | Hide all engagement prompts: bubble, scroll banner, idle panel, exit intent, footer toast, confetti, referrer opener, card tooltips. Code kept behind one switch. |
| Q25/Q27 | One small round icon button, fixed bottom-right, opens the form. |
| Q26 | All engagement hidden behind `ENGAGEMENT_ENABLED = false`; code kept. |

---

## 3. Architecture decisions

1. **Engagement off-switch, not deletion.** Rename the current component body to
   `EngagementLayerInner`; export a wrapper that returns `null` while
   `ENGAGEMENT_ENABLED === false`. Hooks are never called conditionally. Flipping the constant
   restores every prompt unchanged.
2. **One new component owns the journey.** `src/components/ContactLauncher.tsx` renders the
   bottom-right icon and the popup form. It is independent of `EngagementLayer`, so the form
   works while all prompts are hidden.
3. **Form posts to one route.** `POST /api/inquiries` validates, checks the honeypot and a
   best-effort in-memory rate limit, then calls the configured adapters. No database.
4. **Adapters are env-gated.** Each destination checks its own keys. Missing keys = skipped,
   logged, never faked. If nothing is configured, the route returns `503` with
   `fallbackEmail: mifedike@gmail.com`; the form shows that email honestly.
5. **Google Sheets uses a service account.** `google-auth-library` obtains an access token and
   the route calls the Sheets REST `values:append` endpoint. No OAuth UI, no interactive login.
6. **Resend and Twilio use `fetch`.** No SDKs. Resend sends the owner notification and the
   visitor auto-reply; Twilio sends the WhatsApp alert.
7. **Filters are derived, never duplicated.** `displayOrder` remains the source of card order.
   A pure `filterProjects(tab)` helper maps `All`, `marketing-site`, `web-app`, `in-progress` to
   the four records. The Swiper renders the filtered array once. `loop` is enabled only when
   there are enough slides.
8. **JSON-LD is built from code, not hand-copied.** `src/content/structured-data.ts` composes the
   seven nodes from `identity.ts` + `projects.ts`, so statuses and descriptions cannot drift.
   The content piece stays the source for wording; code corrects the statuses the owner named.
9. **Metadata and discovery are code-level.** `metadataBase`, canonical, OG, Twitter, robots,
   sitemap, and the llms.txt file are generated from the canonical base
   `https://makuo-ifedike.vercel.app/`.
10. **No new UI libraries.** The dialog, focus trap, and form are hand-built React. Only
    `google-auth-library` is added, because it is used by the Sheet adapter.
11. **Content pieces are not edited.** `content-workspace/` is another agent's surface. The
    corrected metadata description and statuses are applied in `src`. The stale piece lines are
    reported, not silently changed.

---

## 4. Dependency graph

```
Task 0  Plan + brief + notes (commit)
   │
Task 1  Engagement off + icon launcher + form UI + privacy + honest 503 route
   │
Task 2  Inquiry model + validation + adapters + env example + wire route
   │
   ├──────────────┐
Task 3  Filters   Task 4  SEO + 404 + robots + sitemap
   │                 │
   └────────┬────────┘
        Task 5  JSON-LD + llms.txt
             │
        Task 6  Validator checks
             │
        Task 7  Full verification + report
```

Tasks 3 and 4 are independent after Task 2 and could be swapped; they are ordered UI-first so
the owner can inspect the visible change before the head-only work.

---

## 5. Tasks

### Task 0 — Plan, brief, notes, baseline commit

**Description:** Record the owner's decisions, the current state, and the task list. Commit the
planning artefacts. This is the "before" state the owner can compare against.

**Acceptance criteria:**
- [ ] `developer-workspace/briefs/task-004.md` records what was asked and what done means.
- [ ] `developer-workspace/notes/task-004-current-state.md` records the verified current state.
- [ ] `developer-workspace/plans/TASK-004-core-journey-plan.md` is this file.
- [ ] `developer-workspace/tasks/TASK-004-core-journey-todo.md` is the checklist.
- [ ] Only workspace files are staged; the pre-existing `content-workspace/` and `openspec/`
      edits stay out of the commit.

**Verification:** `git show --stat HEAD` lists only the four workspace files.

**Dependencies:** none
**Files:** 4 workspace markdown files
**Size:** XS

---

### Task 1 — Hide engagement, remove card tooltips, add the contact launcher + privacy page

**Description:** Turn every prompt off behind one switch, remove the Work-card hover tooltips,
add the bottom-right icon button, build the accessible popup form, create `/privacy`, and add a
minimal `/api/inquiries` route that validates and returns an honest "not configured" response
until Task 2 wires the adapters.

**Acceptance criteria:**
- [ ] No bubble, scroll banner, idle panel, exit-intent modal, footer toast, or confetti renders.
- [ ] `ENGAGEMENT_ENABLED = false` is the single switch; the old code is intact.
- [ ] Work cards no longer show a hover `title` tooltip.
- [ ] A small round icon button sits fixed bottom-right; it opens the form.
- [ ] The form has name, email, need type, budget, timeline, message, optional project link,
      consent checkbox, submit, close.
- [ ] Escape closes; focus returns to the icon; focus is trapped while open; body scroll locks.
- [ ] Consent links to `/privacy`; a simple privacy page exists.
- [ ] Closing starts a 20-second cooldown; submitting hides the launcher for the session.
- [ ] With no keys, submit returns an honest message pointing to `mifedike@gmail.com`; no fake
      success.
- [ ] Nothing else visible changes.

**Verification:**
- [ ] `npx tsc --noEmit`
- [ ] `npx next build`
- [ ] Dev server: DOM contains no engagement prompt; icon opens form; Escape closes; `/privacy`
      returns 200
- [ ] `curl -X POST /api/inquiries` with a valid body returns `503` and the fallback email

**Dependencies:** Task 0
**Files:**
- `src/components/EngagementLayer.tsx`
- `src/components/ContactLauncher.tsx` (new)
- `src/app/page.tsx`
- `src/app/privacy/page.tsx` (new)
- `src/app/api/inquiries/route.ts` (new)

**Size:** M (5 files)

---

### Task 2 — Inquiry model, validation, adapters, env example, wire the route

**Description:** Extend the inquiry model to the spec fields, add server validation, honeypot,
best-effort rate limit, and the four env-gated adapters. Wire the route and document every key
in `.env.example`. No accounts are created.

**Acceptance criteria:**
- [ ] `Inquiry` includes name, email, need type, budget, timeline, message, optional project
      link, consent, status, timestamps.
- [ ] Server rejects missing/invalid fields with `400` and field errors.
- [ ] Honeypot submissions are accepted silently and send nothing.
- [ ] The rate limit returns `429` after the configured number per window.
- [ ] Google Sheet append writes one row to tab `Portfolio Inquiries` when its keys exist.
- [ ] Owner email subject is `[PORTFOLIO] New inquiry — {name}`.
- [ ] WhatsApp alert starts with `[PORTFOLIO] New inquiry`.
- [ ] Visitor auto-reply says: `Thanks — I'll reply within one business day.`
- [ ] Each adapter is skipped with a log when its keys are missing.
- [ ] If no adapter is configured, the route returns `503` with the fallback email.
- [ ] `.env.example` lists keys only, no values.

**Verification:**
- [ ] `npx tsc --noEmit`
- [ ] `npx next build`
- [ ] Dev server: invalid body → 400; honeypot → 200 and no adapter call; repeated hits → 429;
      unconfigured → 503 with fallback
- [ ] Adapter live sends: **NOT RUN** (no keys). Reported honestly.

**Dependencies:** Task 1
**Files:**
- `src/content/inquiries.ts`
- `src/lib/inquiries/validation.ts` (new)
- `src/lib/inquiries/adapters.ts` (new)
- `src/app/api/inquiries/route.ts`
- `.env.example` (new)
- `package.json` + lockfile (add `google-auth-library`)

**Size:** M (5 source files + dependency)

---

### Checkpoint A — after Tasks 1–2

- [ ] The icon opens the form; the form validates and submits.
- [ ] The privacy page loads.
- [ ] No engagement prompt renders.
- [ ] The build and typecheck pass.
- [ ] Owner can inspect the commit diff for the UI change.

---

### Task 3 — Real Work filters, one card per filter

**Description:** Replace the decorative tabs with a real filter over the four records. Render the
filtered array once, not three times. Keep the buttons and their look unchanged.

**Acceptance criteria:**
- [ ] All → four cards, Interior-deco first.
- [ ] marketing site → Interior-deco only.
- [ ] web app → Truespec, Athletica, CP3-legacy.
- [ ] in-progress → Athletica, CP3-legacy.
- [ ] No card appears twice in one view.
- [ ] The carousel works with 1, 2, 3, or 4 cards.
- [ ] Buttons look exactly as they do now.
- [ ] Hidden labels are data attributes, not CSS-hidden text.

**Verification:**
- [ ] `npx tsc --noEmit`
- [ ] `npx next build`
- [ ] Browser: click each tab; count cards; confirm no duplicate
- [ ] DOM: each project card appears once per tab

**Dependencies:** Task 2 (checkpoint A)
**Files:**
- `src/app/page.tsx`
- `src/lib/project-filters.ts` (new, pure helper)

**Size:** S (2 files)

---

### Task 4 — SEO metadata, 404, robots, sitemap

**Description:** Add the canonical base, full Open Graph and Twitter metadata, the custom 404
with noindex, `robots.txt`, and `sitemap.xml`. Correct the description to two live / two in
progress. Verify every Next 16 detail against the bundled docs before writing.

**Acceptance criteria:**
- [ ] Home has title, description, canonical `https://makuo-ifedike.vercel.app/`, OG
      (`url`, `siteName`, `locale`, `images`), Twitter (`creator: @lwhitefire`, `images`).
- [ ] Home is not noindex.
- [ ] 404 has title `404 — Page not found — Makuo Ifedike`, canonical `/404`, noindex.
- [ ] `robots.txt` allows all, disallows none, references sitemap and llms.txt.
- [ ] `sitemap.xml` lists the home page only.
- [ ] `ifedikemakuo.vercel.app` appears nowhere.
- [ ] The description says two live (Interior-deco, Truespec) and two in progress (Athletica,
      CP3-legacy).

**Verification:**
- [ ] `npx tsc --noEmit`
- [ ] `npx next build`
- [ ] Dev server: `curl /robots.txt`, `/sitemap.xml`, a bad URL; inspect metadata in the HTML
- [ ] `grep -r "ifedikemakuo" src public` returns nothing

**Dependencies:** Task 2
**Files:**
- `src/app/layout.tsx`
- `src/app/not-found.tsx` (new)
- `src/app/robots.ts` (new)
- `src/app/sitemap.ts` (new)

**Size:** M (4 files)

---

### Task 5 — JSON-LD `@graph` and `/llms.txt`

**Description:** Build the seven-node graph from the data spine, inject it invisibly in the head,
and publish `public/llms.txt` from the approved piece with the authoring notes stripped and the
statuses corrected.

**Acceptance criteria:**
- [ ] The head contains one `application/ld+json` script that parses.
- [ ] The graph has 7 nodes: Person, WebSite, ProfilePage, Truespec, Athletica, Interior-deco,
      CP3-legacy.
- [ ] Person `name` = `Makuo Ifedike`; `legalName` / `alternateName` carry `Victor Makuo Ifedike`.
- [ ] Every project has `creator` pointing to the Person.
- [ ] Athletica and CP3-legacy carry in-progress status.
- [ ] Project descriptions come from the stored case-study prose, no numbers.
- [ ] `/llms.txt` returns 200 with bio, stack, four featured projects, full inventory.
- [ ] No client relationship, revenue, or user count is claimed.
- [ ] No CSS-hidden or white-on-white text is introduced.

**Verification:**
- [ ] `npx tsc --noEmit`
- [ ] `npx next build`
- [ ] Dev server: extract the JSON-LD and `JSON.parse` it; assert 7 nodes and creators
- [ ] `curl /llms.txt`; check required sections
- [ ] `grep` for `ifedikemakuo`

**Dependencies:** Task 4
**Files:**
- `src/content/structured-data.ts` (new)
- `src/app/layout.tsx`
- `public/llms.txt` (new)

**Size:** M (3 files)

---

### Checkpoint B — after Tasks 3–5

- [ ] Filters verified in the browser.
- [ ] 404 / robots / sitemap verified.
- [ ] JSON-LD parses with 7 nodes.
- [ ] llms.txt verified.
- [ ] Build and typecheck pass.

---

### Task 6 — Content validator checks

**Description:** Extend `scripts/validate-content.mjs` so CI catches the regressions this task
fixed: false live claims, stale statuses, missing llms.txt, stale domain, and a broken graph
count.

**Acceptance criteria:**
- [ ] Validator fails if the home description says four live projects.
- [ ] Validator fails if Athletica/CP3 are not in progress.
- [ ] Validator fails if `public/llms.txt` is missing or lacks the four project names.
- [ ] Validator fails if `ifedikemakuo.vercel.app` appears in `src` or `public`.
- [ ] Existing ten checks still pass.

**Verification:**
- [ ] `npm run validate:content` → all checks pass
- [ ] Deliberately break one check locally, confirm it fails, restore

**Dependencies:** Task 5
**Files:**
- `scripts/validate-content.mjs`

**Size:** S (1 file)

---

### Task 7 — Full verification and honest report

**Description:** Run the complete gate and write the report: built, verified, not verified.

**Acceptance criteria:**
- [ ] `npx tsc --noEmit` passes.
- [ ] `npm run validate:content` passes.
- [ ] `npx next build` passes.
- [ ] Dev server checks: home, `/privacy`, `/404`, `/robots.txt`, `/sitemap.xml`, `/llms.txt`,
      `/api/inquiries` (400/429/503).
- [ ] UI inspection: no prompts; icon opens form; filters; tooltips gone; everything else
      unchanged.
- [ ] Report states live sends were NOT verified (no keys).
- [ ] Report lists every owner override and every deviation from the task file.

**Verification:** the report's checklist is the evidence.

**Dependencies:** Task 6
**Files:**
- `developer-workspace/reports/task-004-completion.md` (new)

**Size:** S (1 file)

---

## 6. Checkpoints

| Checkpoint | When | Gate |
|---|---|---|
| A | after Tasks 1–2 | form journey works; build/typecheck; no prompts |
| B | after Tasks 3–5 | filters, 404, robots, sitemap, JSON-LD, llms.txt verified |
| Final | after Task 7 | full build + content validator + manual checks + honest report |

---

## 7. Commit plan

One commit per task, in order:

1. `TASK-004: plan and baseline`
2. `TASK-004: hide engagement, add contact launcher and privacy page`
3. `TASK-004: inquiry validation and env-gated sending adapters`
4. `TASK-004: real work filters, one card per view`
5. `TASK-004: SEO metadata, 404, robots and sitemap`
6. `TASK-004: JSON-LD graph and llms.txt`
7. `TASK-004: content validator checks`
8. `TASK-004: verification report`

No push. No `content-workspace/` or `openspec/` files staged.

---

## 8. Risks and mitigations

| Risk | Impact | Mitigation |
|---|---|---|
| No provider keys | Live sends unverified | Env-gated adapters; honest 503 + report |
| Google private-key newline format | Sheet append fails | Normalize `\\n` to `\n`; log precise error |
| Serverless in-memory rate limit | Weak across instances | Best-effort; document; honeypot first |
| Next 16 metadata / robots / sitemap specifics | Wrong build | Read bundled `node_modules/next/dist/docs/` before writing |
| Early return before hooks | React hooks violation | Wrapper component pattern |
| Swiper with 1–2 slides | Broken loop | `loop` only when enough slides; remount key |
| JSON-LD status wording vs case-study prose | Apparent contradiction | Explicit in-progress status; description avoids "live" as status |
| Hiding engagement damages the code | Lost work | Keep the inner component intact; one constant |
| UI drift | Owner objection | Only the icon button is new; each UI change is its own commit |
| Content piece still says "four live" | Stale source | Report it; do not silently edit another agent's file |

---

## 9. Out of scope (owner-confirmed)

- Case-study modal (scrapped).
- Hero promise, CTAs, slideshow changes.
- Card reorder (Interior-deco first).
- Section reorder/removal; My Stack; service boxes.
- Milestones and counters (kept, verified numbers).
- Dead links and the hidden mobile menu.
- Testimonials (none).
- Engagement prompts (hidden, code kept).
- Account creation or key provisioning.
- Editing `content-workspace/` or `openspec/` content.
- Push to remote.

---

## 10. Verification commands

```bash
npx tsc --noEmit
npm run validate:content
npx next build

# dev server checks
npm run dev
curl -s http://localhost:3009/robots.txt
curl -s http://localhost:3009/sitemap.xml
curl -s http://localhost:3009/llms.txt
curl -s http://localhost:3009/privacy
curl -s -o /dev/null -w "%{http_code}" http://localhost:3009/does-not-exist
curl -s -X POST http://localhost:3009/api/inquiries \
  -H 'content-type: application/json' \
  -d '{"name":"","email":"","message":""}'
```

---

## 11. Open questions

None. The owner answered Q1–Q27. Any new conflict discovered during execution stops the build and
is reported, not guessed.
