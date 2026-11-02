# TASK-004 — Current state notes

Verified read-only at `2f4aba8`. Branch `main`.

## What exists

- `src/app/page.tsx` — one-page home: hero, My Stack, about, why-choose (service boxes +
  counters), work, milestones, contact. Order is not the task-file order; the owner froze it.
- `src/components/EngagementLayer.tsx` — bubble (3s show, 14s dismiss), 50% scroll banner,
  45s idle panel, exit intent (mouseout, mailto CTA), footer confetti + toast. No form, no
  single-active-prompt guard, no 20s cooldown.
- `src/components/SiteNav.tsx` — hamburger is `disabled`, `opacity-0`, `pointer-events-none`.
- `src/components/BackToTop.tsx`, `TechStrip.tsx` (8 draggable logos, no labels),
  `Reveal.tsx` (IntersectionObserver, CSS-hidden until shown).
- `src/content/projects.ts` — four records; `displayOrder` Interior-deco, Truespec, Athletica,
  CP3. Truespec `featured: true`. All `testimonial: null`.
- `src/content/identity.ts` — identity record + `buildPersonJsonLd()` (single Person node,
  unused).
- `src/content/inquiries.ts` — definitions only; `Inquiry` lacks need type, budget, timeline,
  project link, consent.
- `src/app/layout.tsx` — basic metadata only; no metadataBase, canonical, OG url/image, Twitter
  creator, JSON-LD.
- Missing: `not-found.tsx`, `robots.ts`, `sitemap.ts`, `privacy/`, `llms.txt`, `api/`.
- `public/images/portrait.png` exists (1122×1402); `public/projects/*.png` and
  `public/projects/work/*.png` exist.
- `next.config.ts` — `output: "standalone"`, strict TS, `reactStrictMode: true`. No redirects.
- Dependencies: next 16.4.3, react 19.3.1, odometer, swiper. No form/modal/validation library.
  `google-auth-library` not installed.
- `.env.local` has only `VERCEL_OIDC_TOKEN`. No `.env.example`.

## Conflicts found

- Task says Truespec first; owner says Interior-deco first. **Owner wins.**
- Task says hero promise + CTAs; owner says hero unchanged. **Owner wins.**
- Task says section order hero→work→about→milestones→contact; owner says no reorder.
  **Owner wins.**
- Task/spec say no counters; owner says keep verified numbers. **Owner wins.**
- Task says case-study modal; owner scrapped it. **Owner wins.**
- `metadata.md` says "Four live projects"; owner says correct to two live / two in progress.
- `person-jsonld.md` says CP3 "Live", Athletica "Live preview"; owner says in progress.
- `llms-txt.md` has 9 lines of authoring notes before the body; strip them.
- `page.tsx` renders each work card three times for Swiper loop; filters require one.
- Work card `title` tooltips must go (owner).
- `page.tsx` service links are `href="#"`; owner says leave them.
- Stale `ifedikemakuo.vercel.app` must not appear; canonical is `makuo-ifedike.vercel.app`.

## Verification baseline

`npx tsc --noEmit`, `node scripts/validate-content.mjs` (10 checks), `npx next build` all passed
at `2f4aba8`.
