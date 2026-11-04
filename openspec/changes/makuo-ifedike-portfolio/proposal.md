## Why

The portfolio is currently a static Andle HTML page (`public/andle-portfolio.html`) served behind a Next.js redirect. It carries placeholder copy, a stock "client" strip, a stock portrait, dead links, a template credit, `noindex`, and an identity ("Ifedike Victor") the owner has superseded. The Next.js metadata, fonts, and dependencies are unused by the page visitors actually see, and the only conversion path is a `mailto:` link.

The owner approved a revised six-layer plan on 2026-10-26 and re-ruled identity on 2026-10-27: display name **Makuo Ifedike**, legal name Victor Makuo Ifedike kept in structured data only, Whitefire dropped as a personal identity. Build has not started. This change rebuilds the portfolio as a **pure Next.js App Router app**, one page, four live projects shown as cards that open same-page case-study modals, a popup contact form opened only through engagement, all nine engagement touchpoints gated so they never stack, and a complete machine-readable information layer (JSON-LD, llms.txt, metadata, sitemap, robots).

## What Changes

- **Architecture**: replace the static page + redirect with React components in a pure Next.js App Router app (TypeScript); retire `public/andle-portfolio.html`; remove the redirect.
- **Identity**: display name Makuo Ifedike everywhere visible; `legalName`/`alternateName` = Victor Makuo Ifedike in structured data only; no `Ifedike Victor` as display; no Whitefire in title/metadata/logo/footer/socials.
- **Structure**: one-page home (hero, work, about, milestones/process, contact strip) + 404; no `/work/[slug]`, no `project-details.html`.
- **Projects**: exactly four — Interior-deco, Truespec (flagship), Athletica, CP3-legacy. One source of truth; cards and modals read the same records; Truespec's dealership story (showroom + office, migration history, auth, PDF enquiries) leads.
- **Case studies**: large same-page modals; problem → constraints → approach → outcome in words (no numbers) → stack → live link; modal's only link is the live project; no contact form inside.
- **Form**: popup only, opened from the orange launcher, bubble **Talk**, or exit-intent CTA; fields name, email, need type, budget range, timeline, message, optional project link, consent; submit → Google Sheet `Portfolio Inquiries`, email `[PORTFOLIO] New inquiry — {name}`, WhatsApp `[PORTFOLIO] New inquiry`, auto-reply; honeypot + rate limit.
- **Engagement**: all nine touchpoints, one prompt at a time, triggers skipped (never queued) when a prompt is showing or the cooldown runs, 120s cooldown, first bubble at 8s, once per session (key set only when a prompt appears), no session cap, form open suppresses prompts, submit ends prompts for the session.
- **My Stack**: static 6x2 grid desktop (4 tablet, 2 mobile), 28px monochrome marks with labels; replaces the client strip; no client logos, no testimonials, no stock portrait.
- **Information layer**: JSON-LD `@graph` (Person, WebSite, ProfilePage, 4 projects as CreativeWork/SoftwareApplication), `llms.txt`, per-page title/description/canonical/OG/Twitter, sitemap, robots; no CSS-hidden text; `noindex` removed when public.
- **System**: Vercel hosting, domain `makuo-ifedike.vercel.app` (spelling pending owner confirmation), git + CI (install/typecheck/build/link check), `typescript.ignoreBuildErrors: false`, remove unused dependencies after verifying no usage, Vercel Analytics + custom events, error monitoring (Sentry free tier or Vercel logs), privacy page + form consent.
- **Truth pass**: remove placeholder copy, stock client strip, stock portrait, dead links, template credit; unify identity; confirm `noindex` intent.

## Capabilities

### New Capabilities

- `identity`: display name, legal name in structured data only, aliases, profiles, location, education, no Whitefire, no `Ifedike Victor` as display.
- `projects`: four project records, case-study modals, single source of truth shared by cards and filters, My Stack grid, no outcome numbers.
- `engagement`: nine touchpoints, one shared gate, one prompt at a time, skipped (never queued) when busy, 120s cooldown, once per session, no session cap, popup-form triggers.
- `inquiries`: popup form, validation, qualification rubric, notifications (Google Sheet record + email + WhatsApp + auto-reply), spam protection, consent.
- `seo`: JSON-LD `@graph`, `llms.txt`, per-page metadata, canonical, Open Graph, Twitter cards, sitemap, robots; no CSS-hidden text.
- `system`: pure Next.js app, Vercel deploy, domain, git/CI, typecheck with `ignoreBuildErrors: false`, link check, analytics, error monitoring, unused-dependency removal.

### Modified Capabilities

(none — `openspec/specs/` is empty; no existing capability requirements change)

## Impact

- Code: new Next.js app; no `src/` or `public/` currently — visible page content is packed in `andle-portfolio-repomix.xml` and extractable with `extract_repomix.py`.
- Dependencies: Next.js 16, React, TypeScript, Tailwind; remove Prisma, next-auth, TanStack Query/Table, Radix, Recharts, MDX editor after verifying no usage.
- Systems: Vercel project and domain; Google Sheet as inquiry record; email and WhatsApp alert channels.
- Content: `content-workspace/pieces/person-jsonld.md`, `metadata.md`, `llms-txt.md` implemented as-is (no content edits by builder); `product-management/research/profile-data.json` is the canonical identity + project record.
