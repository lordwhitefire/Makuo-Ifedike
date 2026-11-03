# Go-live keys + analytics — tracker

**Plan:** `developer-workspace/plans/go-live-keys-plan.md`
**Started:** 2026-11-03
**Status:** steps 1–3 done, step 4 held on owner gate, steps 5–7 awaiting owner

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

## 4. Live-send test — [FIRED] 3 of 4 adapters sent; Sheets defect
- [x] Owner go-ahead — given
- [x] Visitor address — owner email (per owner instruction)
- [x] Valid submission → `200`, `delivered: ["owner-email","whatsapp","auto-reply"]`
- [ ] Sheet row — **blocked: tab-name defect** (below)
- [ ] Owner email / WhatsApp / auto-reply observed at destination — owner to confirm

Run at `2026-11-03T17:29:46.888Z`, inquiry id `ad8bc70f-1210-40fb-b5ec-af510345385e`.

**Defect — Google Sheets tab name.** Google rejected the range, not the credentials:
`Unable to parse range: 'Portfolio Inquiries'!A1` (400 INVALID_ARGUMENT). Read-only
diagnosis via the same service account: the spreadsheet is titled **"Inquiries"** and
its only tab is **"Sheet1"**. `SHEET_TAB` (`src/lib/inquiries/adapters.ts:31`) expects
a tab named exactly `Portfolio Inquiries`.
**Fix options:** (a) rename the tab `Sheet1` → `Portfolio Inquiries` (no code change);
(b) change the constant (code change). Recommended: (a).
**Next:** on authorization, rename the tab, then re-run once and expect all four
adapters in `delivered`.

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
