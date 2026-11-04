# Makuo Ifedike — portfolio

A one-page freelance portfolio: who I am, what I build, four shipped projects with live
links, and one contact form that reaches me three ways. It is built to be read by people
and by machines — the page carries schema.org JSON-LD and ships a `llms.txt` for
answer-engine readers.

## Stack

- **Next.js 16** (App Router, Turbopack, static output) on **React 19**
- **TypeScript 5** — `tsc --noEmit` is clean and CI enforces it
- **Tailwind CSS 4** (CSS-first `@theme` config in `src/app/globals.css`)
- **Swiper** for the work carousel, **@vercel/analytics** for page views
- **Playwright** for the browser smoke test

Deployments are static output served from `.next/standalone`. The production server is
`node .next/standalone/server.js` (or `npm run start`, which uses bun).

## Scripts

Every one of these runs as written from a clean checkout.

| Script | What it does |
| --- | --- |
| `npm ci` | Installs from `package-lock.json` — use this, not `npm install`, so CI and local agree. |
| `npm run dev` | Dev server on **port 3000** (`next dev -p 3000`), logging to `dev.log`. |
| `npm run build` | `next build`, then copies `.next/static` and `public/` into `.next/standalone/`. |
| `npm run start` | Production server on port 3000 from the standalone build. Requires **bun** on PATH. CI's link check uses `node .next/standalone/server.js` instead, which needs only Node. |
| `npm run lint` | `eslint src scripts tests` — bounded to this repo's own code. Runs, but **exits 1**: ESLint 9 ships with `eslint-config-next`'s flat config (added in TASK-007; the repo had no config, so it used to crash before checking a file) and reports five pre-existing errors — `ContactLauncher.tsx` (2 effects that set state synchronously), `EngagementLayer.tsx`, `HeroCarousel.tsx` and `SiteNav.tsx` (`<a href="/">` instead of `Link`). CI does not run lint; treat these as a follow-up, not a broken build. |
| `npm run validate:content` | Checks the content rules — see `docs/content-workflow.md`. Exits non-zero on a break. |
| `npm run test:e2e` | Playwright smoke test. It builds and starts the production server on **port 3100** itself, so port 3000 stays free. |
| `npm run db:*` | Template leftovers (`prisma`). There is no Prisma schema in this repo — they do not apply. |

## Environment variables

Copy `.env.example` to `.env.local` and fill in. Never commit the filled file.

**Nothing here is required for the site to build, run or deploy.** All of them belong to
the inquiry delivery adapters; without any of them the form still validates and the
route answers `503` with a fallback email address instead of failing.

| Variable | Used by | Required when |
| --- | --- | --- |
| `GOOGLE_SERVICE_ACCOUNT_EMAIL` | Google Sheets append | You want inquiries appended to a sheet. |
| `GOOGLE_PRIVATE_KEY` | Google Sheets append | Same. Literal `\n` sequences are fine. |
| `GOOGLE_SHEET_ID` | Google Sheets append | Same. Share the sheet with the service-account email. |
| `RESEND_API_KEY` | Owner email (Resend) | You want the inquiry emailed. |
| `INQUIRY_FROM_EMAIL` | Visitor auto-reply | Same. |
| `INQUIRY_OWNER_EMAIL` | Owner email recipient | Same. |
| `TWILIO_ACCOUNT_SID` | WhatsApp alert | You want a WhatsApp alert per inquiry. |
| `TWILIO_AUTH_TOKEN` | WhatsApp alert | Same. |
| `TWILIO_WHATSAPP_FROM` | WhatsApp alert | Same. `whatsapp:` prefix optional. |
| `TWILIO_WHATSAPP_TO` | WhatsApp alert | Same. |

Delivery is "one adapter is enough, more is better": with none configured the route
returns `503 not_configured` and names the fallback email. Each adapter is tried in turn
and reports `sent` / `skipped` / `failed` per adapter.

## Deploying

The project deploys to Vercel. **`https://makuo-ifedike.vercel.app/` is the only canonical
domain.** There is one older hyphen-less spelling of the same name that used to be
published, and it must never appear in source, links, `llms.txt` or structured data —
`npm run validate:content` greps for it and fails the build if it turns up. A project's
own live site (Truespec, Interior-deco, Athletica) is a separate domain and is fine.

## Folder map

| Path | What is in it |
| --- | --- |
| `src/app/` | Routes: `page.tsx` (the whole one-pager), `layout.tsx` (metadata, JSON-LD, fonts), `api/inquiries/` (form delivery), `api/client-errors/` (error reports), `error.tsx` + `global-error.tsx` (fallbacks). |
| `src/components/` | Client pieces: `SiteNav`, `HeroCarousel`, `EngagementLayer` + `EngagementProvider` (the five prompts), `ContactLauncher` (the dialog and its form), `TechStrip`, `BackToTop`, `Reveal`, `ErrorReporter`, `Analytics`. |
| `src/content/` | What the site renders: `identity.ts`, `projects.ts`, `inquiries.ts`, `structured-data.ts`. |
| `src/lib/` | `inquiries/` (validation, adapters) and `report-client-error.ts`. |
| `content-workspace/` | The content agent's workspace — briefs, drafts, finished pieces, assets. **Source of truth for copy.** |
| `openspec/` | The task specs and tester checklists, one folder per task. |
| `developer-workspace/` | The developer's workspace — briefs, plans, task lists, notes, reports. |
| `design-workspace/` | The designer's workspace — design decisions and notes. |

## Where to change what

| Change this | In | Notes |
| --- | --- | --- |
| A project's record — summary, status, live link, case study | `src/content/projects.ts` | `status` is `live` or `in-progress`; only Truespec is `featured`. Dates are `dates.created`; there is no "launched" field. |
| Identity — name, canonical URL, OG image, `sameAs` | `src/content/identity.ts` | `identity.image` is `https://makuo-ifedike.vercel.app/images/portrait.png`. |
| Milestones — year, subtitle, link | `src/app/page.tsx` (the milestones list) | Four fixed entries; the years animate via the odometer class. |
| Inquiry options — need types, budgets, timelines | `src/content/inquiries.ts` | Also feeds the route's validation. |
| Engagement copy — bubble, banner, panel, exit prompts | `src/components/EngagementLayer.tsx` | Two bubble strings are constants at the top; the rest are inline. |
| Prompt gating — enabled flag, cooldown | `src/components/EngagementProvider.tsx` | `ENGAGEMENT_ENABLED`, `PROMPT_COOLDOWN_MS`. |
| JSON-LD output | `src/content/structured-data.ts` | Project URLs come from `projects.ts` — change them there, not here. |
| Machine-readable copy for AI readers | `public/llms.txt` | Mirrors `content-workspace/pieces/llms-txt.md`. |

## Testing

```
npm run validate:content   # content rules
npm run test:e2e           # 8 browser checks against a fresh production build
```

CI (`.github/workflows/ci.yml`) runs install → build → type check → content validation →
link check → Playwright browser install → smoke test, in that order, on every push and PR
to `main`.

## Errors and logging

Errors the visitor sees are logged, not hidden: `error.tsx` and `global-error.tsx` show a
heading and one reload link, `console.error` the error, and post it to
`/api/client-errors`, which writes one JSON line to the server log. `ErrorReporter`
catches `window.error` and `unhandledrejection`, capped at five per page load. No form
values are ever accepted or logged.

## Further reading

- [`SETUP.md`](SETUP.md) — step-by-step local setup, a content swap map, and the
  engagement-layer reference.
- [`docs/content-workflow.md`](docs/content-workflow.md) — how copy moves from
  `content-workspace/` into `src/content/`, and what `validate:content` enforces.
