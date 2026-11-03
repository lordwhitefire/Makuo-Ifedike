# TASK-003 brief — Data spine

## What was asked
Build one source of truth for four project records (Interior-deco, Truespec, Athletica, CP3-legacy), an identity record, case-study modal content, and inquiry/analytics schemas — with no build until shared understanding was confirmed.

## What done looks like
- `src/content/projects.ts` — one structured source for the four project records; Truespec listed first; no hardcoded duplicates in cards/hero.
- `src/content/identity.ts` — identity object + `buildPersonJsonLd()` (not injected into layout; Group 4 wires it).
- `src/content/inquiries.ts` — inquiry model fields + status flow `new→qualified→replied→won/lost` + analytics event schema; no DB/form/runtime.
- Case-study prose per project (problem→constraints→approach→outcome→stack→one live link; no numbers), owner-reviewed before commit.
- `scripts/validate-content.mjs` + `npm run validate:content`, wired into CI after tsc.
- page.tsx + HeroCarousel rewired to read from projects.ts; zero visual change (explicit display order keeps Work cards and hero slides as-is; Athletica link → live site).
- About name/email sourced from identity record (zero visual change).
- Commit after every task/slice; no push unless asked.

## Boundaries (owner-confirmed)
- Exactly four projects; Truespec first/flagship; no fifth; no `/work/[slug]`; no `project-details.html`; no numeric outcomes.
- Athletica = client work for a friend's affiliate business; Interior-deco = Whitefire Interior brand (project's brand, not owner's studio, not a confirmed client engagement).
- No client logos/testimonials/counters unless verified → `testimonial: null` for all four; no testimonial section rendered.
- No CSS-hidden text.
- Identity: display "Makuo Ifedike"; legal "Victor Makuo Ifedike" structured-data only (never H1/title); email only (mifedike@gmail.com), no phone/WhatsApp published.
- Canonical domain: `https://makuo-ifedike.vercel.app/`; `ifedikemakuo.vercel.app` removed (alias + project-domain entry deleted).
- Modal: problem → constraints → approach → outcome (words) → stack → one live link; no form inside.

## Decisions from grilling
- Status: `live | in-progress`; Interior-deco live, Truespec live+featured, Athletica in-progress, CP3-legacy in-progress.
- Filter label: `marketing-site | web-app`; Interior-deco = marketing-site; Truespec/Athletica/CP3 = web-app.
- Dates: `created` only (repo creation dates), never "launched".
- Images: `images: { card, hero }`; all live URLs (Athletica → athletica-blond.vercel.app).
- JSON-LD: builder + types only; not injected into layout.
- Case studies: developer drafts, owner reviews before commit.
- Repo URLs: all four confirmed public GitHub repos under lordwhitefire.
- 301 redirect: not possible on Hobby plan; stray domain removed instead.
- Records array lists Truespec first; explicit `displayOrder` slugs keep Work cards (Interior-deco first) and hero slides visually identical to today.
