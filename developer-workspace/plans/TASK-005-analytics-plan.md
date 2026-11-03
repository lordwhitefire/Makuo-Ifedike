# Implementation Plan — TASK-005: Analytics Events

## Overview
Wire the six analytics events (`page_view`, `project_view`, `cta_click`, `inquiry_start`, `inquiry_submit`, `outbound_project_click`) using `@vercel/analytics` `track()`. Install the package, create a client-side `trackEvent` helper, fire `page_view` from root layout via a client component, `project_view` via IntersectionObserver on project cards, `cta_click`/`inquiry_start`/`inquiry_submit` from ContactLauncher, and `outbound_project_click` from project card live links. Re-run the route benchmarks (invalid→400, honeypot→200, rate limit→429, valid→503 without keys). No cookie banner; no live sends without keys.

## Architecture Decisions
- **Provider:** `@vercel/analytics` with `track()` from `@vercel/analytics/react` — standard for Next.js on Vercel, no cookies, no banner.
- **page_view:** Dedicated `"use client"` `Analytics` component rendered in root `layout.tsx`, firing `track('page_view')` in a `useEffect` on mount (covers all routes with one instrumentation point).
- **project_view:** `IntersectionObserver` in `page.tsx` — fires once per project slug per page load when a card enters the viewport, deduplicated by slug via a `Set`.
- **cta_click:** Only on the ContactLauncher icon button (dialog open), not nav/footer links.
- **inquiry_start:** Fires in `openDialog()` when the dialog opens.
- **inquiry_submit:** Fires only on a `200` response from `/api/inquiries` (not 400/503/429).
- **outbound_project_click:** `onClick` on each project card's `<a href={p.liveUrl}>` anchor, fired before navigation.
- **Defensive tracking:** `trackEvent` wrapper guards against `window` being undefined and wraps `track()` in try/catch so the site never crashes if analytics isn't configured.
- **No live sends without keys:** Analytics has no env key; `track()` is best-effort and safe to call unconfigured.

## Task List

### Phase 1: Foundation
- [ ] Task 1: Install `@vercel/analytics` and create `trackEvent` helper
- [ ] Task 2: Fire `page_view` from root layout via client Analytics component

### Checkpoint: Foundation
- [ ] `npx tsc --noEmit` passes
- [ ] `npx next build` passes
- [ ] `page_view` fires on home page load (browser check)

### Phase 2: Project card events
- [ ] Task 3: Fire `project_view` via IntersectionObserver on project cards
- [ ] Task 4: Fire `outbound_project_click` on project card live links

### Checkpoint: Project card events
- [ ] `npx tsc --noEmit` passes
- [ ] `npx next build` passes
- [ ] `project_view` fires when card enters viewport, `outbound_project_click` fires on link click (browser check)

### Phase 3: ContactLauncher events + verification
- [ ] Task 5: Fire `cta_click`, `inquiry_start`, `inquiry_submit` in ContactLauncher
- [ ] Task 6: Re-run route benchmarks + full verification (build, typecheck, validate:content, browser pass)

### Checkpoint: Complete
- [ ] All six events fire on corresponding actions (browser check)
- [ ] Route benchmarks pass: invalid→400, honeypot→200, rate limit→429, valid→503
- [ ] `validate-content: ALL CHECKS PASSED`
- [ ] Ready for commit (no push)

## Task Details

### Task 1: Install `@vercel/analytics` and create `trackEvent` helper
**Description:** Add `@vercel/analytics` as a dependency and create `src/lib/analytics.ts` exporting a `trackEvent(name, properties?)` wrapper that guards against server-side (`typeof window === 'undefined'`) and wraps `track()` in try/catch so unconfigured analytics never crashes the page.

**Acceptance criteria:**
- [ ] `@vercel/analytics` installed in `package.json` dependencies
- [ ] `src/lib/analytics.ts` exists with exported `trackEvent`
- [ ] `trackEvent` no-ops on server and swallows track errors
- [ ] `npx tsc --noEmit` passes

**Verification:** `npx tsc --noEmit`; inspect `package.json` for the dependency.

**Dependencies:** None

**Files likely touched:**
- `package.json`
- `package-lock.json`
- `src/lib/analytics.ts` (new)

**Estimated scope:** S

---

### Task 2: Fire `page_view` from root layout via client Analytics component
**Description:** Create `src/components/Analytics.tsx` (`"use client"`) that calls `trackEvent('page_view')` in a `useEffect` on mount, and render it in `src/app/layout.tsx` inside `<body>` before `{children}`.

**Acceptance criteria:**
- [ ] `src/components/Analytics.tsx` exists, `"use client"`, fires `page_view` on mount
- [ ] `src/app/layout.tsx` renders `<Analytics />`
- [ ] `page_view` fires on home page load (browser check, no duplicate)
- [ ] `npx tsc --noEmit` passes; `npx next build` passes

**Verification:** `npx tsc --noEmit`; `npx next build`; dev-server curl + browser check that page_view fires once on load.

**Dependencies:** Task 1

**Files likely touched:**
- `src/components/Analytics.tsx` (new)
- `src/app/layout.tsx`

**Estimated scope:** S

---

### Task 3: Fire `project_view` via IntersectionObserver on project cards
**Description:** In `src/app/page.tsx`, attach a ref to each project card and use `IntersectionObserver` to fire `trackEvent('project_view', { project: slug })` once per slug per page load when the card enters the viewport. Deduplicate with a `Set` of seen slugs.

**Acceptance criteria:**
- [ ] `project_view` fires when a project card enters the viewport
- [ ] Fires at most once per slug per page load
- [ ] Properties include the project slug; no personal data
- [ ] `npx tsc --noEmit` passes; `npx next build` passes
- [ ] Browser check: scroll each card into view, confirm event fires

**Verification:** `npx tsc --noEmit`; `npx next build`; browser check with IntersectionObserver.

**Dependencies:** Task 1

**Files likely touched:**
- `src/app/page.tsx`

**Estimated scope:** M

---

### Task 4: Fire `outbound_project_click` on project card live links
**Description:** Add an `onClick` to each project card's `<a href={p.liveUrl}>` anchor in `page.tsx` that fires `trackEvent('outbound_project_click', { project: slug, url: liveUrl })` before navigation proceeds.

**Acceptance criteria:**
- [ ] `outbound_project_click` fires when a project card's live link is clicked
- [ ] Properties include project slug and URL; no personal data
- [ ] Navigation still proceeds after the event fires
- [ ] `npx tsc --noEmit` passes; `npx next build` passes
- [ ] Browser check: click a project card link, confirm event fires before navigation

**Verification:** `npx tsc --noEmit`; `npx next build`; browser click check.

**Dependencies:** Task 1, Task 3 (both touch `page.tsx`; Task 4 modifies the same file after Task 3)

**Files likely touched:**
- `src/app/page.tsx`

**Estimated scope:** S

---

### Task 5: Fire `cta_click`, `inquiry_start`, `inquiry_submit` in ContactLauncher
**Description:** Edit `src/components/ContactLauncher.tsx`:
- Fire `cta_click` when the icon button opens the dialog
- Fire `inquiry_start` in `openDialog()` when the dialog opens
- Fire `inquiry_submit` only when `handleSubmit` receives a `200` response from `/api/inquiries`

**Acceptance criteria:**
- [ ] `cta_click` fires on icon button click (dialog open)
- [ ] `inquiry_start` fires when dialog opens via `openDialog()`
- [ ] `inquiry_submit` fires only on successful `200` submission (not 400/503/429)
- [ ] Form still shows fallback email on 503; validation still returns 400
- [ ] `npx tsc --noEmit` passes; `npx next build` passes
- [ ] Browser check: open dialog → cta_click + inquiry_start; submit → inquiry_submit on success

**Verification:** `npx tsc --noEmit`; `npx next build`; browser check of dialog open and submit flows.

**Dependencies:** Task 1

**Files likely touched:**
- `src/components/ContactLauncher.tsx`

**Estimated scope:** M

---

### Task 6: Re-run route benchmarks + full verification
**Description:** Re-run the TASK-005 route benchmarks (invalid → 400 with field errors, honeypot → 200 with no adapters, repeated hits → 429 with retryAfter:600, valid → 503 without keys), plus full typecheck, build, content validation, and a browser pass confirming all six events fire on their corresponding actions. Confirm `/privacy` returns 200.

**Acceptance criteria:**
- [ ] Invalid submission → 400 with field errors
- [ ] Honeypot submission → 200, no adapters triggered
- [ ] Rate limit → 429 with `retryAfter: 600`
- [ ] Valid submission without keys → 503 with `fallbackEmail`
- [ ] `/privacy` returns 200
- [ ] All six events fire on corresponding actions (browser check)
- [ ] `npx tsc --noEmit` passes; `npm run validate:content` passes; `npx next build` passes

**Verification:** `curl` route checks, browser event checks, `npx tsc --noEmit`, `npm run validate:content`, `npx next build`.

**Dependencies:** Tasks 1–5

**Files likely touched:** None (verification only)

**Estimated scope:** M

---

## Risks and Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| `@vercel/analytics` `track()` requires `<Analytics />` provider context; calling `track()` without it may throw | Med | Wrap `track()` in try/catch in `trackEvent`; verify import path (`@vercel/analytics` vs `@vercel/analytics/react`) during Task 1–2 |
| `IntersectionObserver` not available in Next.js server render; must be client-only | Low | Use `useEffect` + `typeof window !== 'undefined'` guard; attach refs in client-rendered page (page.tsx is already client) |
| Double-counting `page_view` if `<Analytics />` auto-component also used | Low | Use only custom `track()` in useEffect, do not mount `<Analytics />` auto component |
| Events fire before navigation completes, potentially losing the beacon | Low | Fire `outbound_project_click` synchronously in `onClick` before navigation; `track()` is best-effort |

## Open Questions
- None — all decisions confirmed in grilling Round 1.
