## Context

The portfolio currently exists only as a packed static page inside `andle-portfolio-repomix.xml` (Andle Bootstrap template, `public/andle-portfolio.html`, `public/andle/engagement.js`) plus a Next.js shell (`src/app/page.tsx`, `src/app/layout.tsx`, `next.config.ts`, `package.json`) that redirects to the static page. There is no `src/` or `public/` tree in the working tree yet; the workspace is not a git repo. Product-management/ holds the owner-approved plan (six-layer plan, decisions, engagement plan, project facts) and content-workspace/pieces/ holds finished JSON-LD, metadata, and llms.txt drafts ready to implement as-is. Identity is decided: Makuo Ifedike display, Victor Makuo Ifedike legalName/alternateName in structured data only, no Whitefire. See proposal.md - Why for motivation (not restated here).

## Goals / Non-Goals

**Goals:**
- A pure Next.js App Router app (TypeScript) as the single visible product, deployed once to Vercel.
- One source of truth for the four project records, shared by cards, filters, and same-page case-study modals.
- A popup contact form opened only from bubble Talk or exit-intent CTA, routed to Google Sheet + email + WhatsApp + auto-reply.
- All nine engagement touchpoints gated so they never stack; first bubble at 8s; 120s cooldown; no session cap.
- Complete machine-readable information layer (JSON-LD, llms.txt, metadata, sitemap, robots) implemented from content-workspace/pieces/ as-is.

**Non-Goals:**
- No separate `/work/[slug]` project pages or `project-details.html`.
- No inline form or contact form section.
- No client logos, testimonials, stock portrait, counters, or numeric outcome claims.
- No blog, AI chatbot, client portal/auth/dashboard, CMS for the four projects, multi-language, or dark mode.
- No visual redesign — keep the dark Andle look; engagement appearance/animation is the owner/designer's call.

## Decisions

- **Content model**: one structured source for projects (`slug, title, category, status, summary, problem, constraints, approach, outcome (words, no numbers), stack, live URL, repo URL, images, testimonial, dates, featured`) plus one identity record. Cards, filters, and modals read it; counters only if a verified number exists (none currently). Alternative considered — hardcoding content in components — rejected because it duplicates content and breaks the single-source rule.
- **Routing**: single `/` route plus 404. Case studies are same-page modals; no `/work/[slug]`. Alternative — per-project detail pages — rejected per owner decision (modal-vs-page conflict flagged in handoff §10; no pages without owner/architect decision).
- **Form triggers**: bubble Talk (primary) and exit-intent CTA (secondary) only. Alternative — footer CTA opening the form — rejected; the footer strip carries email/socials only.
- **Notifications**: Google Sheet is the record; email is backup with `[PORTFOLIO]` subject; WhatsApp is the second alert channel starting `[PORTFOLIO] New inquiry`; auto-reply "Thanks — I'll reply within one business day." Alternative — email only — rejected because inbox noise makes it unreliable.
- **Engagement gate**: one shared gate holding the active prompt, cooldown end, form-open and submitted state; 120s cooldown; once-per-session key set only when a prompt appears; a trigger that fires while busy is skipped, never queued; exit intent desktop only. Alternative — independent timers — rejected because prompts stacked in the current build. Alternative — a pending queue — rejected because it holds prompts the visitor has moved past and needs ordering rules the page does not have.
- **Stack**: Next.js 16 App Router, React, TypeScript, Tailwind; remove Prisma, next-auth, TanStack Query/Table, unused Radix, Recharts, MDX editor after verifying no usage. `typescript.ignoreBuildErrors: false`. One icon system (Simple Icons white SVGs self-hosted in `public/logos/`; Playwright official mark recoloured white or Vitest substitute); two typefaces max.
- **Information layer**: JSON-LD `@graph` in `<head>`, `llms.txt`, sitemap, robots, canonical, OG/Twitter from content-workspace/pieces/ as-is; no CSS-hidden text. Domain `https://makuo-ifedike.vercel.app/` confirmed live (owner-confirmed, 2026-11-02).
- **Build-time assets**: owner-supplied black-background portrait → `public/images/portrait.png`; Truespec back-office and Athletica admin screenshots optional (owner screenshots/demo login or public pages only).

## Risks / Trade-offs

- [Risk] Domain spelling not owner-confirmed (`makuo-ifedike.vercel.app` vs `makuoifedike.vercel.app`; underscores invalid) → Mitigation: build with hyphen form, confirm before final deploy; update JSON-LD/llms.txt/metadata if spelling changes.
- [Risk] Portrait not yet supplied → Mitigation: not a planning blocker; placeholder structure reserved at `public/images/portrait.png`, swapped at build time.
- [Risk] Truespec back office / Athletica admin screenshots need owner credentials → Mitigation: capture public pages only; mark authenticated screenshots as optional.
- [Risk] `ignoreBuildErrors` currently true and unused dependencies present → Mitigation: set false, audit dependencies before build.
- [Risk] `noindex` present on current page → Mitigation: confirm intent, remove when public; sitemap/robots ready.
- [Risk] Engagement appearance/animation is not planned (owner/designer's call) → Mitigation: only timing/gate/copy are specified; visuals left to the designer.

## Migration Plan

- Phase 0 truth pass: remove placeholder copy, stock client strip, stock portrait, dead links, template credit; replace client strip with My Stack; unify identity; confirm noindex.
- Phase 1 system foundation: pure Next.js app, Vercel project + domain, git + CI, remove unused dependencies, `ignoreBuildErrors: false`.
- Phase 2 data spine: project records, identity record, modal content, services/bio/milestones, inquiry model, event schema.
- Phase 3 core journey: one-page home, Work section, case-study modals, popup form, real filters, SEO, JSON-LD/llms.txt.
- Phase 4 engagement gate: all nine touchpoints, 8s first bubble, one prompt at a time, skip when busy, 120s cooldown, no session cap.
- Phase 5 polish and ops: accessibility, performance, analytics, monitoring, documentation.
Rollback: redeploy the previous Vercel preview; git is not yet initialized so initialize at Phase 1 and tag before each deploy.

## Open Questions

None — all open questions resolved:
- Domain: `https://makuo-ifedike.vercel.app/` (confirmed live, owner-confirmed 2026-11-02; C-04 closed)
- My Stack: Vitest replaces Playwright
- Graduation: B.Eng Chemical Engineering, Nnamdi Azikiwe University, Aug 2019–Aug 2025 (confirmed by LinkedIn data export; C-04 closed)
- Location: Onitsha and Awka, Anambra State, Nigeria
