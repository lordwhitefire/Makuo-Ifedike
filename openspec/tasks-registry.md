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

- [ ] Form validation and spam protection (honeypot plus rate limit)
- [ ] Route submissions: Google Sheet row + email + WhatsApp + auto-reply ([PORTFOLIO] label)
- [ ] Privacy page linked from consent checkbox
- [ ] Analytics events (page_view, project_view, cta_click, inquiry_start, inquiry_submit, outbound_project_click)

## 6. Engagement queue

- [ ] Shared prompt queue (one at a time, 20-second cooldown, once per session, no session cap)
- [ ] Wire all nine touchpoints with timings (first bubble 8 seconds)
- [ ] Suppress prompts while form open; submit ends engagement for the session

## 7. Polish and ops

- [ ] Accessibility (WCAG AA, focus management, keyboard paths, reduced motion)
- [ ] Performance (LCP under 2.5s, CLS under 0.1, compressed images)
- [ ] Error monitoring (Sentry free tier or Vercel logs)
- [ ] Playwright smoke test plus link checker
- [ ] README and content-workflow documentation
