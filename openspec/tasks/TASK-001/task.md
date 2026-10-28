# TASK-001 — Truth pass

## What this is

This is the implementation task for **Group 1 — Truth pass** of the portfolio task registry. It covers four entries:

1. Remove placeholder copy, stock client strip, stock portrait, dead links, template credit
2. Replace the client strip with the My Stack grid (no client logos, no marquee)
3. Unify identity to Makuo Ifedike; drop Whitefire and Ifedike Victor as display names
4. Confirm `noindex` intent before going public

## Why

The current visible page is a packed static Andle template (`andle-portfolio-repomix.xml`) carrying placeholder copy, a stock "client" strip, a stock portrait, dead links, a template credit, `noindex`, and the superseded identity "Ifedike Victor". The owner approved a pure Next.js rebuild with identity **Makuo Ifedike**, and Whitefire dropped as a personal identity. Nothing should be built on top of content that isn't true, so this pass runs first.

## What to change

### 1. Remove placeholder copy, stock client strip, stock portrait, dead links, template credit

Replace all placeholder service copy with real copy drawn from the approved plan and profile-data.json. Remove the stock "client" strip (eight office photos linking to `#`). Remove the stock portrait. Fix or remove every dead link (`index.html`, `projects.html`, `project-details.html`, `blog.html`, `blog-details.html`, `contact.html`; social icons at `#`; WhatsApp placeholder). Remove the "Built on the Andle template" footer credit.

**Benchmark:** after this change, when the user loads the home page, they see no placeholder copy, no stock client strip, no stock portrait, no dead links, and no template credit.

### 2. Replace the client strip with the My Stack grid

Put a static 6×2 grid on desktop (4 columns tablet, 2 mobile) where the client strip was. Twelve marks: Next.js, React, Remix, TypeScript, Tailwind CSS, Sanity, Supabase, Neon Postgres, Prisma, Clerk, Vercel, Vitest. Each mark is 28 px monochrome with a visible label. No marquee. No client logos. Source marks as white SVGs (Simple Icons where available; Playwright is swapped for Vitest) and self-host in `public/logos/`.

**Benchmark:** after this change, when the user views the My Stack section, they see exactly 12 marks in a 6×2 desktop grid with visible labels, no moving marquee, and no client logos.

### 3. Unify identity to Makuo Ifedike

Every visible surface — H1, page title, footer, wordmark/logo, social surfaces — reads "Makuo Ifedike". None of them read "Ifedike Victor", "Ifedike Victor Makuo", or present "Whitefire" as the portfolio identity. The legal name "Victor Makuo Ifedike" stays in structured data (JSON-LD `legalName`/`alternateName`) only, never as H1 or title.

**Benchmark:** after this change, when the user inspects any visible surface, they see "Makuo Ifedike" and never "Ifedike Victor", "Ifedike Victor Makuo", or "Whitefire" as the portfolio identity.

### 4. Confirm `noindex` intent before going public

Check the current `<meta name="robots" content="noindex, follow" />`. Record whether `noindex` is intentional for staging or a leftover to remove. Do not flip it without owner confirmation; just document the decision.

**Benchmark:** after this change, there is a recorded decision about `noindex` (remove before public, or keep intentionally for staging).

## Boundaries

- Do not redesign the visuals — keep the dark Andle look.
- Do not add a fifth project, `/work/[slug]`, `project-details.html`, an inline form, client logos, testimonials, or counters.
- Do not use CSS-hidden text, white-on-white text, off-screen blocks, or `display:none` keyword stuffing.
- Identity work is limited to what's listed here; the full JSON-LD `@graph` is a separate task (Group 4).
