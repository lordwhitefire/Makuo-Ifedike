# TASK-003 plan — incremental slices, commit after each

## Slice 1 — `src/content/projects.ts` (structure, no case-study prose yet)
Create types + four project records, Truespec first.
Fields per record: name, slug, summary, category, filter, status, featured, dates.created, stack[], repoUrl, liveUrl, images.{card,hero}, testimonial (null), caseStudy (shell w/ placeholders).
Values:
- Interior-deco: category Marketing site, filter marketing-site, status live, featured false, created 2024-01-03, liveUrl interior-deco-kappa.vercel.app
- Truespec: category Web app, filter web-app, status live, featured true, created 2026-10-16, liveUrl truespec-k4y6.vercel.app
- Athletica: category Football store, filter web-app, status in-progress, featured false, created 2026-03-31, liveUrl athletica-blond.vercel.app
- CP3-legacy: category Fan site / sports experience, filter web-app, status in-progress, featured false, created 2025-12-03, liveUrl cp3-legacy.vercel.app
displayOrder: ["interior-deco","truespec","athletica","cp3-legacy"] (keeps current visual order).
Commit after slice.

## Slice 2 — `src/content/identity.ts`
Identity object (display name Makuo Ifedike; legalName Victor Makuo Ifedike structured-data only; email mifedike@gmail.com; address Onitsha/Awka; education Aug 2019–Aug 2025; socials GitHub/X/LinkedIn; no phone/WhatsApp) + buildPersonJsonLd() helper + types. Not injected into layout. Commit after slice.

## Slice 3 — `src/content/inquiries.ts`
Inquiry model fields + status flow new→qualified→replied→won/lost; analytics events (6 core + 6 engagement); no DB/form/runtime. Commit after slice.

## Slice 4 — Draft case-study prose (owner review, NO commit yet)
Write problem→constraints→approach→outcome→stack→one live link per project (no numbers). Present in chat; wait for owner approval.

## Slice 5 — Fill case-study prose into projects.ts (after approval)
Commit after slice.

## Slice 6 — Rewire page.tsx + HeroCarousel to read from projects.ts
- page.tsx: import projects + displayOrder; Work cards render in displayOrder; card link = liveUrl (Athletica → live, drops localhost); title link = liveUrl; card image = images.card; hero slides = images.hero in displayOrder (visually identical to today).
- About: name/email sourced from identity record (zero visual change).
- Remove duplicate arrays and TODO comment.
Commit after slice.

## Slice 7 — Validator + CI
Create scripts/validate-content.mjs (checks exactly 4 records, Truespec first, required fields present, testimonial null, no localhost URLs, canonical domain, status/filter enums, dates created-only). Add `npm run validate:content` to package.json; wire into CI after tsc. Commit after slice.

## Slice 8 — Verify
Run typecheck (tsc), build, lint, validator. Confirm no visual regression (Athletica link = live site; hero/cards unchanged). Write honest report. No push unless asked.
