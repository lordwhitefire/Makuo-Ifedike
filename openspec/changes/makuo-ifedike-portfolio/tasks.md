## 1. Truth pass

- [ ] 1.1 Remove placeholder copy, stock client strip, stock portrait, dead links, and template credit from the visible page
- [ ] 1.2 Replace the stock client strip with the My Stack grid (no client logos, no marquee)
- [ ] 1.3 Unify identity to Makuo Ifedike everywhere visible; remove Whitefire and Ifedike Victor as display names
- [ ] 1.4 Confirm noindex intent before going public

## 2. System foundation

- [ ] 2.1 Initialize the git repository
- [ ] 2.2 Scaffold a pure Next.js 16 App Router app in TypeScript
- [ ] 2.3 Retire public/andle-portfolio.html and its redirect
- [ ] 2.4 Set typescript.ignoreBuildErrors to false
- [ ] 2.5 Remove unused dependencies after verifying no usage
- [ ] 2.6 Set up the Vercel project and domain makuo-ifedike.vercel.app
- [ ] 2.7 Add CI: install, typecheck, build, link check

## 3. Data spine

- [ ] 3.1 Create one source of truth for the four project records
- [ ] 3.2 Create the identity record (Makuo Ifedike display; Victor Makuo Ifedike legalName/alternateName in structured data only)
- [ ] 3.3 Write case-study modal content per project (problem, constraints, approach, outcome in words with no numbers, stack, live link)
- [ ] 3.4 Define the inquiry model and analytics event schema

## 4. Core journey

- [ ] 4.1 Build the one-page home (hero, work, about, milestones, contact strip) plus a 404 page
- [ ] 4.2 Build the large case-study modal (keyboard-accessible, one live-project link only, no contact form inside)
- [ ] 4.3 Build the popup contact form (name, email, need type, budget range, timeline, message, optional project link, consent)
- [ ] 4.4 Make the work filters real derived from data, or remove the tabs
- [ ] 4.5 Add SEO metadata: per-page title/description, canonical, Open Graph, Twitter cards
- [ ] 4.6 Implement JSON-LD @graph and llms.txt from content-workspace/pieces/ as-is

## 5. Business logic — inquiries

- [ ] 5.1 Add form validation and spam protection (honeypot plus rate limit)
- [ ] 5.2 Route submissions: Google Sheet row on tab Portfolio Inquiries, email [PORTFOLIO] New inquiry — {name}, WhatsApp [PORTFOLIO] New inquiry, auto-reply
- [ ] 5.3 Add the privacy page and link it from the consent checkbox
- [ ] 5.4 Instrument analytics events (page_view, project_view, cta_click, inquiry_start, inquiry_submit, outbound_project_click)

## 6. Engagement queue

- [ ] 6.1 Build the shared prompt queue: one prompt at a time, 20-second cooldown, once per session, no session cap
- [ ] 6.2 Wire all nine touchpoints with their timings (first bubble 8s, scroll banner, idle panel, exit modal, footer toast, tooltip, time-of-day, referrer opener)
- [ ] 6.3 Suppress all prompts while the form is open; submit ends engagement for the session

## 7. Polish and ops

- [ ] 7.1 Accessibility: WCAG AA contrast, focus management in modals/popups, keyboard paths, reduced motion
- [ ] 7.2 Performance: LCP under 2.5s, CLS under 0.1, compressed images
- [ ] 7.3 Add error monitoring (Sentry free tier or Vercel logs)
- [ ] 7.4 Add one Playwright smoke test and run the link checker
- [ ] 7.5 Add README and content-workflow documentation
