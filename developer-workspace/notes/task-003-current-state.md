# TASK-003 notes — current state, change points, dependencies

## Current state (verified by reading files)
- `src/app/page.tsx` lines 24–70: 7-field `projects` array, order Interior-deco → Truespec → Athletica → CP3-legacy.
  - Card link = `p.thumbUrl` (Athletica = `http://localhost:3011/product/...` — dev placeholder), title link = `p.url`.
  - Card image = `/projects/work/<slug>.png`.
- `src/components/HeroCarousel.tsx` lines 14–47: separate `slides` array, order Interior-deco → Truespec → Athletica → CP3-legacy; hero image = `/projects/<slug>.png`; Athletica URL = localhost.
- `src/app/layout.tsx`: metadata only, no JSON-LD.
- `src/types/`: only `odometer.d.ts`; no `src/content/`.
- Repo order on disk: Interior-deco, Truespec, Athletica, CP3-legacy.
- `openspec/changes/makuo-ifedike-portfolio/specs/seo/spec.md` and `system/spec.md`: already canonical `makuo-ifedike.vercel.app`.
- `content-workspace/pieces/person-jsonld.md`: identity draft (name, legalName, email mifedike@gmail.com, address Onitsha/Awka, education Aug 2019–Aug 2025, project records with statuses/dateCreated).
- Both domains removed `ifedikemakuo.vercel.app` (alias + project-domain entry deleted); only `makuo-ifedike.vercel.app` remains (200).

## Facts gathered (explore sweep, confirmed)
- Repos: `lordwhitefire/{interior-deco, truespec, athletica, cp3-legacy}`, all public.
- dateCreated: Truespec 2026-10-16, Athletica 2026-03-31, Interior-deco 2024-01-03, CP3-legacy 2025-12-03 (repo creation dates; no verified launch date).
- No verified testimonials anywhere → `testimonial: null` for all four.
- Stacks (from project-facts.md / profile-data.json):
  - Interior-deco: Remix, React, TypeScript, Tailwind CSS, Sanity, Swiper, Vercel
  - Truespec: Next.js, React, TypeScript, Neon Postgres, Clerk, Sanity, Vercel
  - Athletica: Next.js, React, TypeScript, Tailwind CSS, Supabase, Sanity, Sentry, Vitest, Vercel
  - CP3-legacy: Next.js, React, TypeScript, Tailwind CSS, shadcn/ui, Sanity, Prisma, next-auth, Vercel
- Live URLs: Interior-deco https://interior-deco-kappa.vercel.app/; Truespec https://truespec-k4y6.vercel.app/; Athletica https://athletica-blond.vercel.app/; CP3-legacy https://cp3-legacy.vercel.app/.

## Change points
1. New file `src/content/projects.ts` — types + four records.
2. New file `src/content/identity.ts` — identity object + buildPersonJsonLd().
3. New file `src/content/inquiries.ts` — inquiry model + status flow + analytics events.
4. Edit `src/app/page.tsx` — replace `projects` array + `workTabs` derivation with imports from projects.ts; explicit displayOrder.
5. Edit `src/components/HeroCarousel.tsx` — replace `slides` array with import from projects.ts; Athletica link → live URL.
6. Edit `src/app/page.tsx` About section — source name/email from identity record.
7. New file `scripts/validate-content.mjs` + package.json script + CI wire.

## Dependencies
- `@/*` alias maps to `./src/*` (tsconfig).
- Next.js 16, TypeScript 5, ESLint 9; no existing test runner configured (vitest is a dependency but no test script).
- Vercel plan does not support bulk redirects → stray domain removed, not redirected.
