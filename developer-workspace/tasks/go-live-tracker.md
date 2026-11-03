# Go-live keys + analytics — tracker

**Plan:** `developer-workspace/plans/go-live-keys-plan.md`
**Started:** 2026-11-03
**Status:** steps 1–4 done (live sends verified), 6 done (pushed + deployed), 7 verified for 4 of 6 events; step 5 unconfirmed

## 1. Restart dev server with filled keys — [x] DONE
- [x] Server reports `Environments: .env.local`
- [x] `/` answers `200`

## 2. Static gates — [x] DONE
- [x] `npx tsc --noEmit`
- [x] `npm run validate:content` — `ALL CHECKS PASSED`
- [x] `npx next build`

## 3. Safe route benchmarks — [x] DONE (nothing sent)
- [x] invalid → `400` with field errors
- [x] honeypot → `200` `{ok:true}`, no adapters fired
- [x] rate limit → hit 6 `429` `retryAfter:600`
- [x] `/privacy` → `200`

## 4. Live-send test — [x] COMPLETE — all four adapters delivered
- [x] Owner go-ahead — given
- [x] Visitor address — owner email (per owner instruction)
- [x] Rename sheet tab `Sheet1` → `Portfolio Inquiries` (owner, 2026-11-03)
- [x] Valid submission → `200`, `delivered: ["google-sheets","owner-email","whatsapp","auto-reply"]`
- [x] Sheet rows read back via the API (11 columns, `consent=yes`, `status=new`)
- [ ] Owner to confirm inbox + WhatsApp receipt (human check)

Four submissions:

| # | time (UTC) | inquiry id | delivered | note |
|---|---|---|---|---|
| 1 | 17:29:46 | `ad8bc70f-1210-40fb-b5ec-af510345385e` | owner-email, whatsapp, auto-reply | Sheets failed — tab was `Sheet1` |
| 2 | 18:24:05 | `144f3c5a-1e34-4afd-b47a-ef9dfc6d5d0b` | google-sheets, whatsapp, auto-reply | owner-email `fetch failed` |
| 3 | 18:24:56 | `591a9817-c7e5-4b7d-968f-6956a440441d` | **all four** | clean |
| 4 | 18:43:02 | `646bc516-134b-447a-ae64-f4eb703497b8` | google-sheets, whatsapp, auto-reply | owner-email `fetch failed` again |
| 5 | 23:07:24 | `201e9168-b9d7-480e-afd3-d64d1aca2fbf` | **all four** | after retry fix; first attempt succeeded, no retry fired |

**Known flakiness — owner-email.** 2 of 5 runs failed on a Resend call with a network-level
`fetch failed` (no HTTP response). Fixed 2026-11-03: `sendResend` now retries twice on
transient network errors and sends an `Idempotency-Key` so retries cannot duplicate.
Happy path re-verified; the retry branch has not yet fired in a live failure.
**Full record:** `developer-workspace/reports/owner-email-send-failure.md`.

Sheet readback (`'Portfolio Inquiries'!A1:K`): 2 data rows (`144f3c5a`, `591a9817`),
11 columns each, `consent=yes`, `status=new`. A header row was added on 2026-11-03
(`id, created, name, email, need, budget, timeline, message, link, consent, status`),
inserted above the existing rows so no data was overwritten.

**Defect found and closed:** Google rejected `'Portfolio Inquiries'!A1` while the tab
was `Sheet1` (400 INVALID_ARGUMENT). Closed by renaming the tab; no code change.

## 5. Keys in the Vercel project env — [ ] UNCONFIRMED
- [ ] All ten names set for Preview
- [ ] All ten names set for Production
Not observable from outside without a real submission. The honeypot probe returns
`200 {ok:true}` on the live site, so the route is deployed — but it short-circuits before
any adapter config check. A valid submission would return `503` (keys absent) or `200`
with `delivered` (keys present); not run, because a valid submission performs live sends.

## 6. Push and deploy — [x] DONE
- [x] Push — `origin/main` == local `e334fef`, 0 ahead
- [x] Deployment live — `/`, `/privacy`, `/sitemap.xml`, `/robots.txt` all `200`

## 7. Analytics on the deployed site — [x] VERIFIED (4 of 6 events)
- [x] `/_vercel/insights/script.js` served `200`
- [x] `page_view` → `POST /_vercel/insights/event` `200`
- [x] `project_view` ×4 (two live + two in-progress cards) → `200`
- [x] `cta_click` and `inquiry_start` on launcher click → `200`
- [ ] `inquiry_submit` — not exercised live (needs a real submission)
- [ ] `outbound_project_click` — not exercised live (needs clicking through to a project)
Evidence: attached the running Chrome, loaded the deployed site, captured the network
requests. Payloads carry only origin, SDK info, and the event name — no personal data.
Dashboard confirmation remains the owner's.

## Log
- **2026-11-03** — plan + tracker created; steps 1–3 verified; step 4 held per owner instruction ("then do no #4").
- **2026-11-03 17:29Z** — step 4 released and fired once; `200`, 3/4 adapters delivered (`owner-email`, `whatsapp`, `auto-reply`); Sheets rejected tab name `Portfolio Inquiries` because the workbook's only tab is `Sheet1`; awaiting rename authorization.
- **2026-11-03 18:24Z** — owner renamed the tab; re-runs at 18:24:05 and 18:24:56 delivered Sheets; the 18:24:56 run delivered all four (`google-sheets`, `owner-email`, `whatsapp`, `auto-reply`); 2 rows read back from the sheet. Step 4 complete.
- **2026-11-03 18:43Z** — header row added; test run `646bc516` delivered sheets + whatsapp + auto-reply, owner-email failed with `fetch failed` (2nd such failure). Pattern recorded: first Resend call after idle. Awaiting direction on a retry fix.
- **2026-11-03 23:07Z** — retry fix applied to `sendResend` (2 retries on transient network errors) plus `Idempotency-Key`; tsc + build pass; run `201e9168` delivered all four on the first attempt, so the retry branch itself is still unexercised.
- **2026-11-04** — owner pushed. `origin/main` == local `e334fef`. Live site: `/`, `/privacy`, `/sitemap.xml`, `/robots.txt` all `200`; `/api/inquiries` invalid → `400`, honeypot → `200`. Analytics verified on the deployed site from a real browser: `page_view`, `project_view` ×4, `cta_click`, `inquiry_start` all `POST /_vercel/insights/event` with `200`. `inquiry_submit` and `outbound_project_click` not exercised live.
