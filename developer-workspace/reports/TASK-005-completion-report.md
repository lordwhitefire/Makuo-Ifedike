# TASK-005 Business logic (inquiries) + Analytics — Final Report

**Branch:** `main`
**Commits:** `cf4a2a1` (event-name reconcile), `8eb2df2` (Task 5), `349c620` (Task 4), `7977439` (Task 3), `e9b65af` (Tasks 1–2)
**Pushed:** No. Not pushed (owner instruction: commit only, no push without explicit go-ahead).

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

## Verification (all passing)

- `npx tsc --noEmit` — pass.
- `npm run validate:content` — pass (`ALL CHECKS PASSED`, 16 checks).
- `npx next build` — pass; routes `/`, `/_not-found`, `/api/inquiries`, `/privacy`, `/robots.txt`, `/sitemap.xml`.
- **Browser pass** (visible Chrome on CDP `:9222`, non-headless, attach-only) — single consolidated session:
  ```
  page_view: 1
  project_view: 4          (one per card; slugs interior-deco, truespec, athletica, cp3-legacy)
  cta_click: 1
  inquiry_start: 1
  inquiry_submit: 1        (only after a mocked 200; 0 after a real 503)
  outbound_project_click: 1
  ```
  - `project_view` payloads carry `{ project: "<slug>" }`, each slug exactly once.
  - `outbound_project_click` payloads carry `{ project: "truespec", url: "https://truespec-k4y6.vercel.app/" }` (thumbnail click → `{ project: "interior-deco", url: … }`).
  - `inquiry_submit` payload has **no properties** (no personal data).
- **Route benchmarks** (dev server `:3000`, isolated `x-forwarded-for` per test):
  - Invalid (empty body) → `400` `validation_failed` with per-field errors.
  - Honeypot (`company` filled) → `200` `{"ok":true}`, no adapters.
  - Valid without keys → `503` `{"error":"not_configured","fallbackEmail":"mifedike@gmail.com"}`.
  - Rate limit → hits 1–5 `503`, hit 6 `429` `{"error":"rate_limited","retryAfter":600}`.
  - `/privacy` → `200`.

## Not verified (honest reporting)

- **Live analytics transmission:** the events are dispatched and confirmed in the browser, but in development `@vercel/analytics` runs the debug script and sends nothing to the server. Actual receipt requires the Vercel project's Web Analytics feature to be enabled in the deployed project (a dashboard setting, not a key). No account was created and no key provisioned. Server-side receipt is **NOT VERIFIED**.
- **Live inquiry sends** (Google Sheets append, Resend owner email, Resend visitor auto-reply, Twilio WhatsApp): no credentials exist. The route returns the honest `503` fallback. Live sends are **NOT RUN** and **NOT VERIFIED**.
- **`page_view` scope:** fires once per full document load. It does not re-fire on client-side route changes (the root layout effect does not remount). This matches the spec wording "on page load"; the site is effectively a single page plus `/privacy`.
- **Rate limit** is in-memory and per process/instance (best-effort; weaker under multiple serverless instances).
- Pre-existing critical `npm audit` issue: `swiper` GHSA-hmx5-qpq5-p643 (prototype pollution); fix is a semver-major bump. Deferred, not introduced by this task.

## State on disk

Coherent: all TASK-005 code changes are committed to `main`; nothing pushed. No uncommitted assistant changes in `src/`. Pre-existing dirty files in `content-workspace/`, `openspec/`, `.playwright-cli/`, and the LinkedIn/Twitter export zips remain untouched and unstaged.
