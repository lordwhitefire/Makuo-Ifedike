# TASK-004 Core Journey — Final Report

**Branch:** `main`
**Commits:** `69128a0` (Task 5 + Task 6), `92df164` (Task 4), `02661cf` (Task 3), `8cce04c` (Task 2), `d3071bf` (Task 1)
**Pushed:** No. 11 commits ahead of `origin/main`, not pushed (owner instruction: commit only, no push without explicit go-ahead).

## What was built (Tasks 1–7 complete)

- **Engagement prompts hidden** behind `ENGAGEMENT_ENABLED = false`; bubble, scroll banner, idle panel, exit intent, footer toast, confetti, referrer opener, and card tooltips all off; code kept, not deleted.
- **ContactLauncher:** small round icon button fixed bottom-right (above `BackToTop`) opens an accessible popup inquiry form (7 fields + consent checkbox linking to `/privacy`).
- **`POST /api/inquiries`:** validation, honeypot, best-effort in-memory rate limit (5/window, then 429 `retryAfter:600`), env-gated adapters (Google Sheets via `google-auth-library` + Sheets REST `values:append RAW`; Resend owner email + auto-reply; Twilio WhatsApp). No accounts/keys created. Unconfigured → honest `503` with `fallbackEmail: mifedike@gmail.com`.
- **`/privacy` page** with metadata and canonical.
- **Real Work filters:** `src/lib/project-filters.ts`; Swiper renders the filtered array once; `loop` off; each card renders once; buttons unchanged, `data-filter`/`aria-pressed`; `displayOrder` untouched (`interior-deco`, `truespec`, `athletica`, `cp3-legacy`).
- **SEO metadata (Task 4):** home title/description (two live: Interior-deco, Truespec; two in progress: Athletica, CP3-legacy), canonical `https://makuo-ifedike.vercel.app`, OG (`url`, `siteName`, `locale: en_GB`, `images` 1122×1402), Twitter (`creator: @lwhitefire`, `images`). Home is crawlable (no robots meta).
- **Custom 404 (Task 4):** exact title `404 — Page not found — Makuo Ifedike`, canonical `/404`, single `<meta name="robots" content="noindex">` (Next auto-injected; root `robots` metadata removed to avoid contradictory `index, follow` inheritance), visible H1 + home link, HTTP `404`.
- **robots.txt (Task 4):** `User-Agent: *`, `Allow: /`, no `Disallow`, `llms.txt` reference via `other`, `Sitemap:`.
- **sitemap.xml (Task 4):** home URL only, monthly, priority 1.
- **JSON-LD (Task 5):** one invisible `<script type="application/ld+json">` in `<head>`, 7-node `@graph` (Person, WebSite, ProfilePage, Truespec, Athletica, Interior-deco, CP3-legacy) built from `identity.ts` + `projects.ts`; project descriptions from case-study problem + approach only (no outcome numbers); statuses corrected (Athletica/CP3-legacy In progress; Truespec/Interior-deco Live); every project creator → Person.
- **`public/llms.txt` (Task 5):** bio, About me, Profiles, My stack, Featured work (4 projects), Full project inventory, Site; corrected statuses; canonical domain only; no `ifedikemakuo`.
- **Truth corrections:** "four live projects" → two live / two in progress; `created` dates only, no `launched`; no testimonials/quotes; no section reorder/removal; milestones/counters untouched; hero/slideshow unchanged; dead links and hidden mobile menu stay as-is.

## Verification (all passing)

- `npx tsc --noEmit` — pass
- `npm run validate:content` — pass (16 checks, incl. JSON-LD 7 nodes + llms.txt sections/statuses)
- `npx next build` — pass; routes `/`, `/robots.txt`, `/sitemap.xml`, `/privacy`, `/api/inquiries`
- Dev server (port 3000): `curl /robots.txt`, `/sitemap.xml`, `/llms.txt` (200), bad URL (404); home metadata HTML inspected; 404 title/canonical/noindex inspected; `grep -rn "ifedikemakuo" src public` → none; portrait `200 image/png`
- Browser (visible Chrome on CDP :9222, not headless): home title correct, zero engagement-hint phrases, contact icon present; 404 status `404`, exact title, H1 and "Back to the portfolio" link visible; only console error is the expected 404 resource fetch.

## Not verified (honest reporting)

- Any live send: Google Sheets append, Resend owner email, Resend visitor auto-reply, Twilio WhatsApp. No credentials exist (`google-auth-library` installed, keys absent). Route returns `503` fallback honestly; live sends are **NOT RUN** and **NOT VERIFIED**.
- Pre-existing critical `npm audit` issue: `swiper` GHSA-hmx5-qpq5-p643 (prototype pollution, `<12.1.2`); fix is semver-major 14.4.0. Deferred and reported; not introduced by this task.
- Rate limit is in-memory and per instance; weaker on multiple/serverless instances (best-effort, per plan).
- Canonical normalization: Next strips the trailing slash from `identity.url` (`https://makuo-ifedike.vercel.app/` → `https://makuo-ifedike.vercel.app`) because `trailingSlash` is false; host/path are exact. Enabling `trailingSlash` would alter routing, so it was left off.
- `content-workspace/`, `openspec/`, `.playwright-cli/`, LinkedIn/Twitter export zips contain stale/untracked material; not edited or staged (per instructions).

## State on disk

Coherent: all changes committed to `main`, nothing pushed. `developer-workspace/` holds briefs, notes, plans, and this report. No uncommitted assistant changes remain in `src/`.
