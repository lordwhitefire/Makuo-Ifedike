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

## 4. Live-send test — [HELD] owner gate
- [ ] **Owner go-ahead to send real email + WhatsApp** — pending
- [ ] **Visitor address for the auto-reply** — pending
- [ ] On release: valid submission → `200`, `delivered` lists fired adapters
- [ ] On release: Sheet row / owner email / WhatsApp / auto-reply observed
- [ ] Variant offered: one adapter at a time (Sheets-only, or Resend-only)

Not running. No live sends without explicit go-ahead.

## 5. Add keys to Vercel project env — [ ] OWNER, NOT DONE
- [ ] All ten names set for Preview
- [ ] All ten names set for Production
Note: `.env.local` is local and gitignored; deployed site stays `503` until done.

## 6. Push and deploy — [ ] GATED on 5 + owner instruction
- [ ] Owner says go
- [ ] Deployment from `main` succeeds
Currently `main` is 2 commits ahead of `origin/main`; nothing pushed.

## 7. Confirm analytics lands on the deployed site — [ ] after 6
- [ ] Web Analytics enabled for the Vercel project (owner reports done)
- [ ] Vercel dashboard shows `page_view`, `project_view`, `cta_click`, `inquiry_start`, `inquiry_submit`, `outbound_project_click`
Note: local runs only prove dispatch. `@vercel/analytics` dev mode logs and sends nothing, so receipt is only observable on the deploy.

## Log
- **2026-11-03** — plan + tracker created; steps 1–3 verified; step 4 held per owner instruction ("then do no #4").
