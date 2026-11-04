# Task registry — Makuo Ifedike portfolio

Plain list of the individual pieces of work needed so the real project catches up to the architecture. Each entry is a short plain description — a table of contents for the work ahead. Detailed tasks are written per entry when the user picks one (moment two).

## 1. Truth pass

- [x] Remove placeholder copy, stock client strip, stock portrait, dead links, template credit
- [x] Replace client strip with My Stack grid (no client logos, no marquee)
- [x] Unify identity to Makuo Ifedike; drop Whitefire and Ifedike Victor as display names
- [x] Confirm noindex intent before going public

## 2. System foundation

- [x] Initialize git repo
- [x] Scaffold pure Next.js 16 App Router app (TypeScript)
- [x] Retire public/andle-portfolio.html and its redirect
- [x] Set typescript.ignoreBuildErrors to false
- [x] Remove unused dependencies after verifying no usage
- [x] Set up Vercel project and domain makuo-ifedike.vercel.app
- [x] Add CI (install, typecheck, build, link check)

## 3. Data spine

- [x] Create one source of truth for the four project records
- [x] Create identity record (Makuo Ifedike display; Victor Makuo Ifedike legalName/alternateName in structured data only)
- [x] Write case-study modal content per project (problem, constraints, approach, outcome in words, no numbers)
- [x] Define inquiry model and analytics event schema

## 4. Core journey

- [x] Build one-page home (hero, work, about, milestones, contact strip) plus 404
- [x] Build case-study modals — SCRAPPED, not built (modal removed from plan)
- [x] Build popup contact form (opened from bubble Talk or exit-intent CTA only)
- [x] Make work filters real derived from data, or remove tabs
- [x] Add SEO metadata, canonical, Open Graph, Twitter cards, sitemap, robots
- [x] Implement JSON-LD @graph and llms.txt from content-workspace/pieces/ as-is

## 5. Business logic — inquiries

- [x] Form validation and spam protection (honeypot plus rate limit)
- [x] Route submissions: Google Sheet row + email + WhatsApp + auto-reply ([PORTFOLIO] label)
- [x] Privacy page linked from consent checkbox
- [x] Analytics events (page_view, project_view, cta_click, inquiry_start, inquiry_submit, outbound_project_click)

## 5b. Engagement UI polish

- [x] Fix the popup/orange-button overlap; thin border on the popup; border and matching field height on the contact form

## 5c. Engagement follow-ups (owner-requested)

- [x] 20s cooldown ring around the contact button; hide the form scrollbar (`110bd8c`)

## 6. Engagement gate

Task and test plan: `openspec/tasks/TASK-006-engagement-queue/`

- [x] One shared gate: one prompt at a time; a trigger that fires while busy is skipped, never queued; 120-second cooldown; once per session, key written only when the prompt actually appears; no session cap
- [x] Wire the five prompts with their triggers (first bubble 8 seconds, 50% scroll, 45s idle, exit intent 20s+ desktop-only, footer toast + confetti)
- [x] Keep the launcher's 20-second ring separate from the 120-second prompt cooldown
- [x] Suppress prompts while the form is open; closing starts the cooldown; submitting ends engagement for the session

## 7. Polish and ops

Task and test plan: `openspec/tasks/TASK-007-polish-and-ops/`

- [x] Accessibility (WCAG AA, focus management, keyboard paths, reduced motion)
- [x] Performance (LCP under 2.5s, CLS under 0.1, compressed images)
- [x] Error monitoring (Sentry free tier or Vercel logs)
- [x] Playwright smoke test plus link checker
- [x] README and content-workflow documentation

Accepted 2026-11-04 at `83f4b4b`; CI run 41871395263 green. Two exceptions, reported rather than hidden:

- Mobile Lighthouse performance score is **66**, not ≥ 90. LCP 1.0 s and CLS 0 pass. The gap is main-thread time (TBT 790–1420 ms), not loading. Owner ruled: report the real numbers, do not change the design to win the score.
- `npm run lint` exits 1 with five pre-existing errors (four set-state-in-effect, one anchor instead of `Link`). Documented in the README as it behaves; CI does not gate on lint.
