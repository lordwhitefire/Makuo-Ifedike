# TASK-005 Business logic (inquiries) + Analytics — Final Report

**Branch:** `main`
**HEAD:** `21f1554`
**Pushed:** Yes — `origin/main` == `21f1554`, 0 ahead.
**Deployed:** https://makuo-ifedike.vercel.app

## What was built (Tasks 1–6 complete)

- **`@vercel/analytics@^2.0.1`** added as a runtime dependency.
- **`src/lib/analytics.ts`** — `trackEvent(name, properties?)` wrapper: no-ops during SSR (`typeof window === "undefined"`), swallows `track()` errors so analytics can never break the page, and is typed to the six event names. Properties are flat (`string | number | boolean | null`); no personal data.
- **`src/content/inquiries.ts`** — replaced the stale, unused `CORE_ANALYTICS_EVENTS` (`project_card_click`, `external_link_click`, …) and `ENGAGEMENT_ANALYTICS_EVENTS` lists with a single `ANALYTICS_EVENTS` const holding exactly the six implemented events, and `AnalyticsEvent` derived from it. No consumers existed for the old names.
- **`src/components/Analytics.tsx`** — `"use client"` component that calls `inject({ mode: "auto", disableAutoTrack: true })` (defines `window.va` and loads the Vercel script without auto page views) and `trackEvent("page_view")` in a `useEffect`. A module-level guard makes `page_view` fire once per document load and absorbs React StrictMode's dev-only double effect. Web Analytics is cookieless, so **no cookie banner** was added.
- **`src/app/layout.tsx`** — renders `<Analytics />` inside `<body>` before `{children}`: one instrumentation point for every route.
- **`src/app/page.tsx`**
  - `project_view`: `IntersectionObserver` (threshold 0.5) on `.work-card[data-project]`, firing `trackEvent("project_view", { project: slug })` at most once per slug per page load (deduped by a `useRef` Set that survives Work-filter changes; the observer re-attaches when the active filter changes).
  - `outbound_project_click`: `onClick` on both live-project anchors per card (thumbnail and title) firing `{ project, url }` before navigation.
- **`src/components/ContactLauncher.tsx`**
  - `cta_click` + `inquiry_start` in `openDialog()` (icon-button open only).
  - `inquiry_submit` only inside the `response.ok` branch (a `200`) — not on `400`, `503`, or `429`. No properties are sent.
- **`src/app/api/inquiries/route.ts` + `src/lib/inquiries/*`** — validation, honeypot, per-IP rate limit, and the four delivery adapters (Google Sheets, owner email, visitor auto-reply, Twilio WhatsApp), all env-gated with the honest `503` fallback.

## Verification

### Static and build (re-run 2026-11-03)

- `npx tsc --noEmit` — pass.
- `npm run validate:content` — pass (`ALL CHECKS PASSED`, 16 checks).
- `npx next build` — pass; routes `/`, `/_not-found`, `/api/inquiries`, `/privacy`, `/robots.txt`, `/sitemap.xml`.

### Local browser pass (dev server, six events, mock 200)

Visible Chrome on CDP `:9222`, non-headless, attach-only:

```
page_view: 1
project_view: 4          (one per card: interior-deco, truespec, athletica, cp3-legacy)
cta_click: 1
inquiry_start: 1
inquiry_submit: 1        (only after a mocked 200; 0 after a real 503)
outbound_project_click: 1
```

- `project_view` payloads carry `{ project: "<slug>" }`, each slug exactly once.
- `outbound_project_click` payloads carry `{ project, url }`.
- `inquiry_submit` payload has **no properties**.

### Route benchmarks (dev server, isolated `x-forwarded-for` per test)

- Invalid (empty body) → `400` `validation_failed` with per-field errors.
- Honeypot (`company` filled) → `200` `{"ok":true}`, no adapters.
- Valid without keys → `503` `{"error":"not_configured","fallbackEmail":"mifedike@gmail.com"}`.
- Rate limit → hits 1–5 `503`, hit 6 `429` `{"error":"rate_limited","retryAfter":600}`.
- `/privacy` → `200`.

### Live deployment (2026-11-04)

- `/`, `/privacy`, `/sitemap.xml`, `/robots.txt` → `200`.
- `POST /api/inquiries` with an empty body → `400` with the same per-field errors.
- `POST /api/inquiries` with the honeypot filled → `200 {"ok":true}`, no sends.

### Live inquiry sends — VERIFIED

All four channels delivered in a single submission, twice independently:

| Run | Time (UTC) | Delivered |
|---|---|---|
| `591a9817-c7e5-4b7d-968f-6956a440441d` | 2026-11-03 18:24 | sheets, owner-email, whatsapp, auto-reply |
| `201e9168-b9d7-480e-afd3-d64d1aca2fbf` | 2026-11-03 23:07 | sheets, owner-email, whatsapp, auto-reply |

- Sheet rows read back: 11 columns, `consent=yes`, `status=new`.
- Header row added and verified: `id, created, name, email, need, budget, timeline, message, link, consent, status`.
- Earlier runs exposed two real defects, both fixed: the sheet tab name (`Sheet1` → `Portfolio Inquiries`) and intermittent `fetch failed` on the owner email (now bounded retries with `Idempotency-Key`, so a retry cannot duplicate a send). Full record: `developer-workspace/reports/owner-email-send-failure.md`.

### Live analytics — VERIFIED (4 of 6 events)

Attached the running Chrome to the deployed site and captured the actual network traffic:

| Event | Request | Status |
|---|---|---|
| `page_view` | `POST /_vercel/insights/event` | `200` |
| `project_view` ×4 | `POST /_vercel/insights/event` | `200` |
| `cta_click` | `POST /_vercel/insights/event` | `200` |
| `inquiry_start` | `POST /_vercel/insights/event` | `200` |

`GET /_vercel/insights/script.js` → `200`, so Web Analytics is served for the project. Payloads carry only origin, SDK name/version, and the event name — no personal data, no cookies.

## Not verified (honest reporting)

**In plain terms:** "not exercised" means the event has not been triggered on the live site
and watched arriving at Vercel. It is not a defect — both events are wired exactly like the
four that were confirmed. They stay unproven until a real visitor submits the form
(`inquiry_submit`) or clicks a live project link (`outbound_project_click`).

- **`inquiry_submit` live** — not exercised on the deployed site; proving it requires a real submission through the deployed form (which performs real sends).
- **`outbound_project_click` live** — not exercised; the check navigates away to a third-party site. Verified locally only.
- **Vercel env keys** — not observable from outside. The honeypot probe short-circuits before any adapter config check. A valid submission would return `503` (keys absent) or `200` with `delivered` (keys present); the live runs above prove the keys were present on 2026-11-03.
- **Retry branch** — the bounded retry in `sendResend` has never fired against a real transient failure; both post-fix runs succeeded on the first attempt. Covered by code review and typecheck, not by a live failure.
- **`page_view` scope** — fires once per full document load; it does not re-fire on client-side route changes (the root layout effect does not remount). Matches the spec wording "on page load"; the site is a single page plus `/privacy`.
- **Rate limit** — in-memory and per process/instance (best-effort; weaker under multiple serverless instances).
- **`npm audit`** — pre-existing critical `swiper` GHSA-hmx5-qpq5-p643 (prototype pollution); fix is a semver-major bump. Deferred, not introduced by this task.

## Out of scope, shipped in the same deploy

Two UI fixes committed after TASK-005 and included in the deployment — recorded here only so the deploy contents are unambiguous:

- `aeba820` — hide the page scrollbar while keeping the page scrollable.
- `21f1554` — stop the closed site drawer leaving a 12px white sliver at the right edge (verified `0 px` visible on the deployed site).

Neither changes TASK-005 behaviour.

## State on disk

Coherent: every TASK-005 change and both UI fixes are committed to `main` and pushed (`origin/main` == `21f1554`). Working tree is clean. No personal-data exports are tracked; `.env.local` remains gitignored.
