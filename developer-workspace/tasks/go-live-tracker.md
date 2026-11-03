# Go-live keys + analytics — tracker

**Plan:** `developer-workspace/plans/go-live-keys-plan.md`
**Started:** 2026-11-03
**Status:** steps 1–4 done (live sends verified), steps 5–7 awaiting owner

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

Three submissions, one per state:

| # | time (UTC) | inquiry id | delivered | note |
|---|---|---|---|---|
| 1 | 17:29:46 | `ad8bc70f-1210-40fb-b5ec-af510345385e` | owner-email, whatsapp, auto-reply | Sheets failed — tab was `Sheet1` |
| 2 | 18:24:05 | `144f3c5a-1e34-4afd-b47a-ef9dfc6d5d0b` | google-sheets, whatsapp, auto-reply | owner-email hit a transient `fetch failed` |
| 3 | 18:24:56 | `591a9817-c7e5-4b7d-968f-6956a440441d` | **all four** | clean |

Sheet readback (`'Portfolio Inquiries'!A1:K`): 2 data rows (`144f3c5a`, `591a9817`),
11 columns each, `consent=yes`, `status=new`. A header row was added on 2026-11-03
(`id, created, name, email, need, budget, timeline, message, link, consent, status`),
inserted above the existing rows so no data was overwritten.

**Defect found and closed:** Google rejected `'Portfolio Inquiries'!A1` while the tab
was `Sheet1` (400 INVALID_ARGUMENT). Closed by renaming the tab; no code change.

## 5. Add keys to Vercel project env — [ ] OWNER, NOT DONE
- [ ] All ten names set for Preview
- [ ] All ten names set for Production
Note: `.env.local` is local and gitignored; deployed site stays `503` until done.

## 6. Push and deploy — [ ] GATED on 5 + owner instruction
- [ ] Owner says go
- [ ] Deployment from `main` succeeds
Currently `main` is 3 commits ahead of `origin/main`; nothing pushed.

## 7. Confirm analytics lands on the deployed site — [ ] after 6
- [ ] Web Analytics enabled for the Vercel project (owner reports done)
- [ ] Vercel dashboard shows `page_view`, `project_view`, `cta_click`, `inquiry_start`, `inquiry_submit`, `outbound_project_click`
Note: local runs only prove dispatch. `@vercel/analytics` dev mode logs and sends nothing, so receipt is only observable on the deploy.

## Log
- **2026-11-03** — plan + tracker created; steps 1–3 verified; step 4 held per owner instruction ("then do no #4").
- **2026-11-03 17:29Z** — step 4 released and fired once; `200`, 3/4 adapters delivered (`owner-email`, `whatsapp`, `auto-reply`); Sheets rejected tab name `Portfolio Inquiries` because the workbook's only tab is `Sheet1`; awaiting rename authorization.
- **2026-11-03 18:24Z** — owner renamed the tab; re-runs at 18:24:05 and 18:24:56 delivered Sheets; the 18:24:56 run delivered all four (`google-sheets`, `owner-email`, `whatsapp`, `auto-reply`); 2 rows read back from the sheet. Step 4 complete.
