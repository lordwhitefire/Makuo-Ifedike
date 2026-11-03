# TASK-003 report — Data spine (complete)

## What was built
- `src/content/projects.ts` — one source of truth for four project records, **Truespec first**, 16 fields each (name, slug, summary, category, filter, status, featured, dates.created, stack, repoUrl, liveUrl, images.{card,hero}, testimonial, caseStudy).
- `src/types/project.ts` — Project type with `status: "live" | "in-progress"`, `filter: "marketing-site" | "web-app"`.
- `src/content/identity.ts` — identity object + `buildPersonJsonLd()` (legal name structured-data only; email only; no phone/WhatsApp; **not** injected into layout — Group 4 wires it).
- `src/content/inquiries.ts` — Inquiry type, status flow `new→qualified→replied→won/lost`, analytics event schema (6 core + 6 engagement). Definitions only; no DB/form/runtime.
- Case-study prose for all four projects (problem→constraints→approach→outcome→stack→live link; **no numeric outcomes**), owner-reviewed and accepted.
- `scripts/validate-content.mjs` + `npm run validate:content` — 10 checks (4 records, Truespec first, required fields, status/filter enums, featured=Truespec only, testimonial null, no localhost, no stray domain, dates.created only). All pass.
- `src/app/page.tsx` + `src/components/HeroCarousel.tsx` — rewired to read from projects.ts via `displayOrder`; zero visual change intended (Work cards keep Interior-deco-first order; hero slides identical; Athletica link now → live site `athletica-blond.vercel.app`, localhost removed). About name/email sourced from identity record.
- CI `.github/workflows/ci.yml` — `npm run validate:content` wired after type check.

## Verification (all green)
- `npx tsc --noEmit`: pass
- `npm run validate:content`: all 10 checks pass
- `next build`: pass (static prerender)

## Commits (after every task, not pushed)
- `2f4aba8` add description + tooltip to project records
- `b130217` slice 7: validator + CI
- `3e3859f` slice 6: rewire cards + hero to shared records
- `d1ae76a` slice 5: case-study prose filled in
- `63518e4` slice 3: inquiry model + analytics events
- `0a1d085` slice 2: identity record + JSON-LD builder
- `24a3d6d` slice 1: project records source of truth

## Not done / out of scope (intentional)
- JSON-LD not injected into `layout.tsx` (Group 4/SEO).
- Modal UI not built (Group 4) — data is ready.
- Popup form / inquiry runtime not built (Group 4) — definitions only.
- No push (not asked).
- Stray domain `ifedikemakuo.vercel.app` removed from Vercel (alias + project-domain entry deleted); returns 404. A 301 redirect isn't available on the Hobby plan.

## Notes
- Pre-existing modified files in `content-workspace/` and `openspec/` were left untouched (not my changes).
- `developer-workspace/` briefs/notes/plans written for this task.
