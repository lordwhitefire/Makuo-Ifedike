# Brief — TASK-004 Core Journey

**Task file:** `openspec/tasks/TASK-004/task.md`
**Testing:** `openspec/tasks/TASK-004/testing.md`
**Baseline:** `2f4aba8`

## What was asked

Implement Group 4 — Core journey — on the Makuo Ifedike portfolio, with the owner's explicit
overrides from the grilling (Q1–Q27).

## What done looks like

- All engagement prompts hidden behind one switch; code kept.
- One small round icon button, bottom-right, opens a popup inquiry form.
- The form has name, email, need type, budget, timeline, message, optional project link,
  consent; consent links to `/privacy`.
- `POST /api/inquiries` validates, honeypots, rate-limits, and sends to Google Sheets (service
  account), Resend (owner email + auto-reply), Twilio (WhatsApp). All env-gated. No accounts
  created. Honest 503 when unconfigured.
- `/privacy` exists.
- Work filters are real; each card renders once; buttons unchanged.
- Custom 404 with noindex; full SEO metadata, canonical, OG, Twitter; robots and sitemap.
- JSON-LD 7-node graph in the head; `public/llms.txt` live.
- Truth everywhere: Interior-deco + Truespec live; Athletica + CP3-legacy in progress.
- No UI drift beyond the icon button; no modal; no hero rewrite; no card reorder; no milestone
  rewrite; no counter removal; no section reorder; no dead-link fixes.

## Verification

`npx tsc --noEmit`, `npm run validate:content`, `npx next build`, dev-server route checks, and a
browser pass. Live sends are **not** verified without keys and will be reported as such.
