# Plan — Go-live with inquiry keys + analytics

Created 2026-11-03. Companion tracker: `developer-workspace/tasks/go-live-tracker.md`.

## What this is

TASK-005 (analytics events) and the inquiry route are built and committed. All ten
inquiry keys are now filled into `.env.local`, and Web Analytics is enabled in the
Vercel project. This plan is the ordered sequence for proving the pieces actually
work against the real services, and the gates around it.

This plan changes **no application code**. It is a verification sequence plus two
undelegated actions that belong to the owner (Vercel env settings, the deploy).

## Current state (verified on 2026-11-03)

- `.env.local` holds all ten inquiry keys, none blank (checked by listing variable
  names only; values were not printed or logged).
- Dev server on `http://localhost:3000`, `Environments: .env.local` confirmed in
  bootstrap output.
- `npx tsc --noEmit` — pass.
- `npm run validate:content` — `ALL CHECKS PASSED` (16 checks).
- `npx next build` — pass; routes `/`, `/_not-found`, `/api/inquiries`, `/privacy`,
  `/robots.txt`, `/sitemap.xml`.
- Route benchmarks: invalid → `400` with field errors; honeypot → `200` `{ok:true}`
  with nothing sent; rate limit → hits 1–5 `200`, hit 6 → `429` `retryAfter:600`;
  `/privacy` → `200`.
- Analytics (from TASK-005): all six events confirmed dispatched in a real browser
  (`page_view` 1, `project_view` 4, `cta_click` 1, `inquiry_start` 1,
  `inquiry_submit` 1, `outbound_project_click` 1), each carrying only non-personal
  properties.
- `main` is 2 commits ahead of `origin/main`; nothing pushed.

## Steps

### 1. Restart the dev server so it loads the keys — DONE
**Why:** Next reads env config at boot; the filled `.env.local` is inert until restart.
**Acceptance:** server reports `Environments: .env.local` and answers `200` on `/`.

### 2. Static gates — DONE
**Acceptance:** `npx tsc --noEmit`, `npm run validate:content`, `npx next build` all pass.

### 3. Safe route benchmarks — DONE
**Acceptance:** invalid → `400` + field errors; honeypot → `200` and no adapter fires;
rate limit → `429` `retryAfter:600` on the sixth hit; `/privacy` → `200`.

### 4. Live-send test — COMPLETE 2026-11-03 (all four adapters delivered)
**What it would do:** one genuine inquiry submission, which writes a real row to the
`Portfolio Inquiries` sheet tab, sends the owner `[PORTFOLIO] New inquiry — {name}`
email, sends the Twilio WhatsApp `[PORTFOLIO] New inquiry` alert, and delivers the
visitor auto-reply `Thanks — I'll reply within one business day.`
**Acceptance (when released):** `POST /api/inquiries` returns `200` with a `delivered`
list naming the adapters that fired, and the row/email/WhatsApp are observed at the
destination.
**Released by the owner and fired once, 2026-11-03. Result:**
`200` `{"ok":true,"id":"ad8bc70f-1210-40fb-b5ec-af510345385e","delivered":["owner-email","whatsapp","auto-reply"]}`
— three of four adapters fired. Google Sheets failed:

```
[inquiries] google-sheets failed — Google Sheets append failed (400):
  "Unable to parse range: 'Portfolio Inquiries'!A1"  (INVALID_ARGUMENT)
```

Read-only diagnosis with the same service account: the spreadsheet is titled **"Inquiries"**
and holds a single tab named **"Sheet1"**. `SHEET_TAB` (`src/lib/inquiries/adapters.ts:31`)
expects the tab name `Portfolio Inquiries` exactly.

**Resolved.** The owner renamed the tab. The clean run
`591a9817-c7e5-4b7d-968f-6956a440441d` (`18:24:56Z`) returned
`delivered: ["google-sheets","owner-email","whatsapp","auto-reply"]`, and two rows were
read back from `'Portfolio Inquiries'!A1:K` (11 columns, `consent=yes`, `status=new`).
An intermediate run's transient `fetch failed` on `owner-email` did not recur.
A header row was added above the data on 2026-11-03, so the columns are labelled.

**Prerequisites:** 1–3. **Owner:** confirm inbox/WhatsApp receipt.

### 5. Add the same ten keys to the Vercel project env — UNCONFIRMED
**Why:** `.env.local` is local and gitignored. Until the names exist in the Vercel
project environment the deployed site keeps returning the honest `503` fallback.
**Acceptance:** the ten names are set in the Vercel project for Preview and
Production.
**Prerequisites:** 1–3. **Owner:** owner (dashboard only; not reachable from here).

### 6. Push and deploy — DONE 2026-11-04
**Why:** analytics can only be proven to land against a Vercel deployment.
**Acceptance:** a Vercel deployment from current `main` succeeds.
**Prerequisites:** 5. **Owner:** caller — no push without explicit instruction.

### 7. Confirm analytics actually lands — VERIFIED for 4 of 6 events, 2026-11-04
**Why:** correctly, `@vercel/analytics` runs its **development** script on localhost,
logs events, and sends nothing to the server. Local runs prove dispatch only; they
cannot prove receipt. Receipt is only observable on the deployed domain through
Vercel's own `/_vercel/insights` endpoint.
**Acceptance:** the six events appear in the Vercel Analytics dashboard against views,
card scrolls, launcher opens, submissions, and outbound clicks on the deployed site.
**Prerequisites:** 6, and Web Analytics enabled for the project (owner reports done).

## Ordering and gates

```
[1]→[2]→[3]→[4 gated: owner go-ahead + auto-reply address]
             └─ independent ─→[5]→[6 gated: owner go-ahead to push]→[7]
```

Step 4 is independent of 5–7. Nothing downstream depends on it.

## Risks and mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| A live test sends real email/WhatsApp and writes a real Sheet row | Irreversible, touches real inboxes | Held behind an explicit owner go-ahead (step 4 blocked) |
| Testing repeatedly trips the 5-per-10-min rate limit | False negatives on 4 | Use a fresh `x-forwarded-for` per attempt, or wait out the 600s window |
| Deploying without Vercel env set | Site returns `503` on a visible URL | Step 5 must precede step 6 |
| Analytics appears to "not work" locally | Misdiagnosis | Already known: dev mode sends nothing. Verify only on the deploy (step 7) |
| `GOOGLE_PRIVATE_KEY` mangled by newlines | Sheets adapter fails, other adapters still run | Confirm Sheets appears in the `delivered` list during step 4; the key may contain literal `\n` |

## Boundaries (unchanged)

- No account creation and no key provisioning by the assistant.
- No live sends without the owner's explicit go-ahead (step 4 is held for this).
- No push without explicit instruction.
- No new UI, no event-name changes, no analytics cookie introduction (none are used).

## Open questions

1. Go-ahead on step 4 — yes or no?
2. If yes, which mailbox receives the visitor auto-reply?
3. Are the ten keys already in the Vercel project env, or only `.env.local`?
