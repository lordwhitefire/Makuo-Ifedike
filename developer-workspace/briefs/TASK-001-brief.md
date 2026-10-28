# Brief: TASK-001 Truth Pass

## What was asked

Run the truth pass on the portfolio visible page (four entries from task.md):
1. Remove placeholder copy, stock client strip, stock portrait, dead links, template credit
2. Replace client strip with My Stack grid (no client logos, no marquee)
3. Unify identity to Makuo Ifedike; drop Whitefire and Ifedike Victor as display names
4. Confirm noindex intent before going public

## What done looks like (benchmarks)

- Home page: no placeholder copy, no stock client strip, no stock portrait, no dead links, no template credit
- My Stack section: exactly 12 marks, 6×2 desktop grid (4 tablet, 2 mobile), visible labels, no moving marquee, no client logos
- Every visible surface reads "Makuo Ifedike"; never "Ifedike Victor", "Ifedike Victor Makuo", or "Whitefire" as identity
- Recorded noindex decision (removed → public/indexable)

## Constraints

- No visual redesign — keep dark Andle look
- No fifth project, no `/work/[slug]`, no `project-details.html`, no inline form, no client logos, no testimonials, no counters
- No CSS-hidden text, white-on-white, off-screen blocks, or `display:none` keyword stuffing
- Identity limited to what's listed; full JSON-LD `@graph` is Group 4

## Settled decisions (grill, all confirmed)

- My Stack: 12 marks (Next.js, React, Remix, TypeScript, Tailwind CSS, Sanity, Supabase, Neon Postgres, Prisma, Clerk, Vercel, Vitest); 28px monochrome white SVGs self-hosted in `public/logos/`; no hotlinking
- Portrait: owner's black-background PNG from `~/Downloads/Professional Portrait on Black.png` → `public/images/portrait.png`
- noindex: remove (site public/indexable)
- Dead links: remove entirely, no stubs
- Copy: from approved sources only (metadata.md, profile-data.json, decisions.md); nothing invented
- Template credit: removed; footer `© 2026 Makuo Ifedike`
- Sequence: extract repomix → truth pass on static HTML → Next.js scaffold (Group 2, separate)

## Plan

`developer-workspace/plans/TASK-001-truth-pass-plan.md` (13 tasks, 3 phases + checkpoints)

## Status

Shared understanding confirmed. Plan written. Awaiting execution confirmation.