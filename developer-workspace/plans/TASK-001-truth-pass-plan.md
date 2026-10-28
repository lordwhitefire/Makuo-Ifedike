# Implementation Plan: TASK-001 Truth Pass

## Overview

Extract the packed Andle portfolio from `andle-portfolio-repomix.xml` into the working tree, then run the truth pass: remove placeholder copy, stock client strip, stock portrait, dead links, and template credit; replace the client strip with the My Stack grid; unify identity to Makuo Ifedike; remove `noindex`. Initialize git. Scaffold of the pure Next.js app (Group 2) is a separate task and is NOT part of this plan.

## Settled decisions (from grill, all confirmed by owner)

- **Identity:** `Makuo Ifedike` displays everywhere (title, meta, H1/about name, footer, social links). `Victor Makuo Ifedike` is `legalName`/`alternateName` in structured data only. No `Ifedike Victor`, no `Ifedike Victor Makuo`, no `Whitefire` on any visible surface.
- **My Stack:** 12 marks — Next.js, React, Remix, TypeScript, Tailwind CSS, Sanity, Supabase, Neon Postgres, Prisma, Clerk, Vercel, Vitest. 28px monochrome white SVGs self-hosted in `public/logos/` (no CDN hotlinking). 6×2 desktop grid (4 tablet, 2 mobile), visible labels, no marquee, no client logos.
- **Portrait:** Stock Unsplash portrait removed. Owner's black-background portrait copied from `~/Downloads/Professional Portrait on Black.png` to `public/images/portrait.png` and used in the about section.
- **Copy:** Replacement copy drawn only from `content-workspace/pieces/metadata.md`, `product-management/research/profile-data.json`, `product-management/decisions.md`. Nothing invented.
- **Dead links:** Removed entirely — nav items to `index.html`/`projects.html`/`project-details.html`/`blog.html`/`blog-details.html`/`contact.html`, social icons at `#`, WhatsApp `wa.me/2348000000000`. No `#` anchors or stub pages.
- **Template credit:** Removed. Footer copyright reads `© 2026 Makuo Ifedike`.
- **noindex:** Removed (`<meta name="robots" content="noindex, follow" />` deleted). Site intended public/indexable.
- **Sequence:** extract repomix → truth pass on static HTML → Next.js scaffold (Group 2, separate).

## Current state (verified by explore subagent)

- Node v22.23.1, bun 1.3.14 available
- `extract_repomix.py` works: extracts 30 files including `public/andle-portfolio.html`, `src/app/page.tsx`, `package.json`, `next.config.ts`
- Nothing on disk yet: no `src/`, `public/`, `package.json`, `.git/`
- All visible-page content lives in `andle-portfolio-repomix.xml` (Andle Bootstrap template, `public/andle-portfolio.html` ~55KB)

## Task List

### Phase 0: Foundation

### [ ] Task 1: Extract repomix XML into working tree

**Description:** Run `python3 extract_repomix.py andle-portfolio-repomix.xml ./` to restore `public/andle-portfolio.html`, `src/app/page.tsx`, `package.json`, `next.config.ts`, `tsconfig.json`, `components.json`, `.gitignore`, `SETUP.md`, `scripts/build_portfolio.py`, and `public/andle/assets/`.

**Acceptance criteria:**
- [ ] `public/andle-portfolio.html` exists on disk (~55KB)
- [ ] `src/app/page.tsx`, `package.json`, `next.config.ts` exist
- [ ] `public/andle/` (assets + engagement.js) present

**Verification:** `ls public/andle-portfolio.html package.json next.config.ts` all succeed; extraction script exits 0.

**Dependencies:** None

**Files likely touched:** ~30 files created by extraction (one operation)

**Estimated scope:** XS (single command, creates working tree)

### [ ] Task 2: Initialize git repository

**Description:** `git init`, add all extracted files, create initial commit "chore: restore packed Andle portfolio from repomix".

**Acceptance criteria:**
- [ ] `.git/` exists
- [ ] `git status` shows clean tree after initial commit
- [ ] Initial commit contains extracted portfolio files

**Verification:** `git log --oneline` shows one commit; `git status` clean.

**Dependencies:** Task 1

**Files likely touched:** `.git/` (no source files)

**Estimated scope:** XS

## Checkpoint: Foundation

- [ ] All extracted files present
- [ ] Git repo initialized with initial commit
- [ ] Review with human before proceeding to content changes

---

### Phase 1: Identity & dead-link cleanup

### [ ] Task 3: Unify identity to Makuo Ifedike

**Description:** In `public/andle-portfolio.html`: `<title>` → `Makuo Ifedike — I build and fix software for small businesses`; meta description updated from approved copy; about `<h3>` → `Makuo Ifedike`; footer copyright → `© 2026 Makuo Ifedike`; social hrefs → GitHub/X/LinkedIn/email from decisions.md (no `ifedikevictor`/`ifedike-victor`).

**Acceptance criteria:**
- [ ] Title reads `Makuo Ifedike — I build and fix software for small businesses`
- [ ] About heading reads `Makuo Ifedike` (not `Ifedike Victor`)
- [ ] Footer reads `© 2026 Makuo Ifedike`
- [ ] No `Ifedike Victor`, `Ifedike Victor Makuo`, or `Whitefire` visible anywhere in the file

**Verification:** grep the HTML for `Ifedike Victor`, `Whitefire` — zero matches; title and about heading match.

**Dependencies:** Task 1

**Files likely touched:** `public/andle-portfolio.html` (1 file)

**Estimated scope:** S

### [ ] Task 4: Remove all dead links

**Description:** Remove nav items to `index.html`/`projects.html`/`project-details.html`/`blog.html`/`blog-details.html`/`contact.html`; social icons at `#`; WhatsApp `wa.me/2348000000000`; any remaining `href="#"` anchors. No stub pages or `#` anchors left.

**Acceptance criteria:**
- [ ] No `projects.html`, `project-details.html`, `blog.html`, `blog-details.html`, `contact.html`, `index.html` hrefs
- [ ] No `href="#"` remaining
- [ ] No `wa.me/` placeholder
- [ ] Social links point to real profiles (GitHub, X, LinkedIn) or are removed

**Verification:** grep HTML for `.html` hrefs and `href="#"` — zero matches; `wa.me` — zero matches.

**Dependencies:** Task 1

**Files likely touched:** `public/andle-portfolio.html` (1 file)

**Estimated scope:** S

## Checkpoint: Identity & links

- [ ] No `Ifedike Victor` / `Whitefire` visible
- [ ] Every remaining link resolves to a real target
- [ ] Review with human before proceeding to content replacement

---

### Phase 2: Content replacement & My Stack

### [ ] Task 5: Remove placeholder copy and template credit

**Description:** Replace why-choose card copy (marketing sites / web apps / client-first / on-time) with approved copy from metadata.md/profile-data.json; replace hero sub-text and about text with approved one-line/bio; remove "Built on the Andle template" footer credit; remove unverified counters (4/2/2) unless verified (none verified → remove).

**Acceptance criteria:**
- [ ] No placeholder/lorem/Andle-stock copy (e.g. "Bring nature in your house", "Consulting solutions and make plan to renovation")
- [ ] Footer has no "Built on the Andle template"
- [ ] Counters removed (no unverified 4/2/2)
- [ ] Copy sourced only from approved documents

**Verification:** Read the HTML; confirm no stock Andle placeholder phrases; confirm footer credit absent.

**Dependencies:** Task 3

**Files likely touched:** `public/andle-portfolio.html` (1 file)

**Estimated scope:** S

### [ ] Task 6: Add My Stack logo SVGs (batch 1)

**Description:** Download/create white SVG marks for Next.js, React, Remix in `public/logos/` from cdn.simpleicons.org/<slug>/white (nextdotjs, react, remix).

**Acceptance criteria:**
- [ ] `public/logos/nextdotjs.svg`, `public/logos/react.svg`, `public/logos/remix.svg` exist
- [ ] Each is a white SVG monochrome mark (~28px equivalent)

**Verification:** Files exist; each begins with `<svg` and contains white fill.

**Dependencies:** Task 1

**Files likely touched:** `public/logos/nextdotjs.svg`, `public/logos/react.svg`, `public/logos/remix.svg` (3 files)

**Estimated scope:** S

### [ ] Task 7: Add My Stack logo SVGs (batch 2)

**Description:** Download/create white SVG marks for TypeScript, Tailwind CSS, Sanity in `public/logos/` (typescript, tailwindcss, sanity).

**Acceptance criteria:**
- [ ] `public/logos/typescript.svg`, `public/logos/tailwindcss.svg`, `public/logos/sanity.svg` exist
- [ ] Each is a white SVG monochrome mark

**Verification:** Files exist; each begins with `<svg`.

**Dependencies:** Task 6

**Files likely touched:** `public/logos/typescript.svg`, `public/logos/tailwindcss.svg`, `public/logos/sanity.svg` (3 files)

**Estimated scope:** S

### [ ] Task 8: Add My Stack logo SVGs (batch 3)

**Description:** Download/create white SVG marks for Supabase, Neon Postgres, Prisma in `public/logos/` (supabase, neon, prisma).

**Acceptance criteria:**
- [ ] `public/logos/supabase.svg`, `public/logos/neon.svg`, `public/logos/prisma.svg` exist
- [ ] Each is a white SVG monochrome mark

**Verification:** Files exist; each begins with `<svg`.

**Dependencies:** Task 7

**Files likely touched:** `public/logos/supabase.svg`, `public/logos/neon.svg`, `public/logos/prisma.svg` (3 files)

**Estimated scope:** S

### [ ] Task 9: Add My Stack logo SVGs (batch 4)

**Description:** Download/create white SVG marks for Clerk, Vercel, and Vitest in `public/logos/` (clerk, vercel). Vitest is not in Simple Icons — use the official Vitest mark recoloured to white.

**Acceptance criteria:**
- [ ] `public/logos/clerk.svg`, `public/logos/vercel.svg`, `public/logos/vitest.svg` exist
- [ ] Each is a white SVG monochrome mark

**Verification:** Files exist; each begins with `<svg`.

**Dependencies:** Task 8

**Files likely touched:** `public/logos/clerk.svg`, `public/logos/vercel.svg`, `public/logos/vitest.svg` (3 files)

**Estimated scope:** S

### [ ] Task 10: Replace client strip with My Stack grid

**Description:** In `public/andle-portfolio.html`, replace the 8-slide stock client strip (office photos → `#`) with a static My Stack grid: 12 logo SVGs with visible labels, 6 columns desktop / 4 tablet / 2 mobile, 28px monochrome, no marquee, no client logos.

**Acceptance criteria:**
- [ ] Stock client strip (8 office photos) removed
- [ ] Exactly 12 My Stack marks present in grid
- [ ] Each mark has a visible text label
- [ ] Grid is 6×2 desktop, 4 tablet, 2 mobile (responsive classes)
- [ ] No marquee/animation on the grid
- [ ] No client logos

**Verification:** Count logo ``/`svg` instances = 12; labels present; no swiper/marquee classes on the grid section.

**Dependencies:** Tasks 3, 4, 5, 6, 7, 8, 9

**Files likely touched:** `public/andle-portfolio.html` (1 file)

**Estimated scope:** S

### [ ] Task 11: Swap stock portrait for owner's portrait

**Description:** Remove the stock Unsplash portrait from the about section; copy `~/Downloads/Professional Portrait on Black.png` to `public/images/portrait.png`; reference it in the about section markup.

**Acceptance criteria:**
- [ ] Stock Unsplash portrait URL removed from about section
- [ ] `public/images/portrait.png` exists (copy of owner's file)
- [ ] About section references `public/images/portrait.png`

**Verification:** File exists; HTML references it; no `images.unsplash.com` portrait URL in about section.

**Dependencies:** Task 3

**Files likely touched:** `public/images/portrait.png` (1 new file), `public/andle-portfolio.html` (1 edit)

**Estimated scope:** S

## Checkpoint: Content & stack

- [ ] No placeholder copy, no template credit
- [ ] Exactly 12 My Stack marks in grid, visible labels, no marquee
- [ ] Owner's portrait in place, no stock image
- [ ] Review with human before proceeding to SEO/noindex

---

### Phase 3: SEO intent & final verification

### [ ] Task 12: Remove noindex; record decision

**Description:** Delete `<meta name="robots" content="noindex, follow" />` from `<head>`. Record the noindex decision (removed → public/indexable) in `developer-workspace/notes/noindex-decision.md`.

**Acceptance criteria:**
- [ ] No `noindex` meta tag in `public/andle-portfolio.html`
- [ ] `developer-workspace/notes/noindex-decision.md` exists with the recorded decision

**Verification:** grep HTML for `noindex` — zero matches; notes file present.

**Dependencies:** Task 3

**Files likely touched:** `public/andle-portfolio.html` (1 edit), `developer-workspace/notes/noindex-decision.md` (1 new file)

**Estimated scope:** XS

### [ ] Task 13: Full truth-pass verification (benchmarks)

**Description:** Run all four benchmark checks from task.md:
1. Home page shows no placeholder copy, no stock client strip, no stock portrait, no dead links, no template credit
2. My Stack section shows exactly 12 marks in 6×2 desktop grid, visible labels, no marquee, no client logos
3. Every visible surface reads `Makuo Ifedike`; none read `Ifedike Victor`, `Ifedike Victor Makuo`, or `Whitefire`
4. `noindex` decision recorded

**Acceptance criteria:**
- [ ] Benchmark 1 passes
- [ ] Benchmark 2 passes
- [ ] Benchmark 3 passes
- [ ] Benchmark 4 passes

**Verification:** Manual inspection + grep checks against the HTML file.

**Dependencies:** Tasks 3–12

**Files likely touched:** None (verification only)

**Estimated scope:** XS

## Checkpoint: Complete

- [ ] All four truth-pass benchmarks met
- [ ] Working tree clean, committed to git
- [ ] Ready for Group 2 (system foundation / Next.js scaffold)

## Risks and Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| Logo SVGs from Simple Icons may 404 or not be white | Med | Verify each SVG begins with `<svg` and has white/near-white fallbacks; fall back to official brand kit if needed |
| Owner's portrait file path may differ | Low | Confirm `~/Downloads/Professional Portrait on Black.png` exists before Task 11 |
| Extraction overwrites nothing (nothing on disk) | Low | Confirm clean tree before extracting; git init after |
| `ignoreBuildErrors` / unused deps | Low | Deferred to Group 2 (system foundation) — not in scope here |

## Open Questions

None — all decisions settled by grill (all confirmed "yes").

---

**Plan location:** `developer-workspace/plans/TASK-001-truth-pass-plan.md` (project convention: plans live in `developer-workspace/plans/`)

Shared understanding is confirmed. The plan is ready. I'm awaiting your confirmation to proceed to execution (Task 1 onward).