# Implementation Plan: TASK-001 Rebuild from Reference (My Stack Replace)

## Overview

Copy the reference inline HTML (`andle-portfolio-inline.html`) into the workspace as `public/andle-portfolio.html`, verify it matches at runtime against a separate reference server (port 3010), then apply content-only changes: replace client images with My Stack grid, unify identity to Makuo Ifedike, fix Twitter link, remove WhatsApp link, keep counters. No new sections, no design drift — layout and design stay identical to the reference.

## Settled decisions (from grill, all confirmed)

- **Reference file:** `/home/lordwhitefire/Downloads/andle-portfolio-inline.html` (1.3MB, inline CSS/JS) → copy to `public/andle-portfolio.html`, overwriting current page
- **Ports:** Reference on **3010** (separate tab/server), Next.js build on **3009**
- **Runtime match first:** Verify reference (3010) and build (3009) serve identical HTML/CSS/JS before any content changes — use runtime divergence skill
- **My Stack logos:** Use existing 12 white self-hosted SVGs in `public/logos/` (nextdotjs, react, remix, typescript, tailwindcss, sanity, supabase, neon, prisma, clerk, vercel, vitest)
- **Portrait:** `public/images/portrait.png` unchanged (transparent background already)
- **Content changes (after verification):**
  - Client strip (8 image-box slides) → My Stack grid (12 marks, same position/structure)
  - Footer: `© Makuo Ifedike built by whitefire` (no `Ifedike Victor`, no Whitefire as studio)
  - Page title, meta description, headings → `Makuo Ifedike`
  - Remove all `Ifedike Victor` and `whitefire as studio` references
  - Twitter: `twitter.com/ifedikevictor` → `x.com/lwhitefire`
  - Remove WhatsApp `wa.me/2348000000000` (no phone/WhatsApp published)
  - Counters stay: "2 complete & shipped" / "2 in active development"
  - No new sections, no design drift

## Current state (verified by explore subagent)

- Reference file present: `/home/lordwhitefire/Downloads/andle-portfolio-inline.html` (1,307,949 bytes)
- Current `public/andle-portfolio.html` present (53,707 bytes, already has truth-pass content)
- `public/logos/` exists with all 12 SVGs
- `public/images/portrait.png` present (transparent, 1,272,903 bytes)
- Git repo on master, clean
- Node v22.23.1, bun 1.3.14 available; `node_modules` exists

## Task List

### Phase 1: Foundation (high-risk first)

### [ ] Task 1: Copy reference file to workspace

**Description:** Copy `/home/lordwhitefire/Downloads/andle-portfolio-inline.html` to `public/andle-portfolio.html`, overwriting the current page. This temporarily reverts to old identity/structure until content changes are applied.

**Acceptance criteria:**
- [ ] `public/andle-portfolio.html` exists and is 1,307,949 bytes (same as reference)
- [ ] File content matches reference byte-for-byte

**Verification:** `diff` or `cmp` reference vs `public/andle-portfolio.html` — zero differences

**Dependencies:** None

**Files likely touched:** `public/andle-portfolio.html` (1 file)

**Estimated scope:** XS (single copy operation)

### [ ] Task 2: Start reference server on 3010 and dev server on 3009

**Description:** Start `python3 -m http.server 3010` serving the reference directory (or the file), and `PORT=3009 npx next dev -p 3009` for the Next.js build. Both must be running simultaneously for runtime comparison.

**Acceptance criteria:**
- [ ] Reference server responding on `http://localhost:3010/`
- [ ] Next.js dev server responding on `http://localhost:3009/`
- [ ] Both servers running simultaneously

**Verification:** `curl -I` both ports return 2xx

**Dependencies:** Task 1

**Files likely touched:** None (server processes only)

**Estimated scope:** XS (two server start commands)

## Checkpoint: Foundation

- [ ] Reference copied byte-for-byte
- [ ] Both servers running (3010 reference, 3009 build)
- [ ] Runtime match confirmed (HTML/CSS/JS identical) — use runtime divergence skill
- [ ] Review with human before proceeding to content changes

---

### Phase 2: Content changes

### [ ] Task 3: Replace client strip with My Stack grid

**Description:** In `public/andle-portfolio.html`, replace the client-section (8 image-box slides above About) with My Stack grid: 12 logo SVGs (28px, white, self-hosted in `public/logos/`) with visible labels, same section position and structure. Same position as client strip, same section wrapper.

**Acceptance criteria:**
- [ ] 8 client image-box slides removed
- [ ] Exactly 12 My Stack marks present: Next.js, React, Remix, TypeScript, Tailwind CSS, Sanity, Supabase, Neon Postgres, Prisma, Clerk, Vercel, Vitest
- [ ] Each mark has visible text label
- [ ] Logos sourced from `public/logos/` (self-hosted, white SVGs)
- [ ] Same section position (above About section)
- [ ] No marquee, no client logos

**Verification:** Count `/logos/` refs = 12; count stack labels = 12; no swiper/marquee classes in grid section; grid located above About section

**Dependencies:** Task 1, Task 2

**Files likely touched:** `public/andle-portfolio.html` (1 file)

**Estimated scope:** S

### [ ] Task 4: Unify identity to Makuo Ifedike

**Description:** In `public/andle-portfolio.html`: footer → `© Makuo Ifedike built by whitefire`; page title → `Makuo Ifedike`; meta description → Makuo Ifedike copy; about heading → `Makuo Ifedike`; remove all `Ifedike Victor` and `whitefire as studio` references from visible surfaces.

**Acceptance criteria:**
- [ ] Footer reads `© Makuo Ifedike built by whitefire`
- [ ] `<title>` reads `Makuo Ifedike — I build and fix software for small businesses`
- [ ] About heading reads `Makuo Ifedike`
- <arg_value>0 occurrences of `Ifedike Victor` visible</arg_value>
- <arg_value>0 occurrences of `whitefire as studio` visible</arg_value>
- [ ] Meta description mentions Makuo Ifedike

**Verification:** grep `public/andle-portfolio.html` for `Ifedike Victor` — zero matches; grep for `whitefire` as studio — zero matches; title and about heading match

**Dependencies:** Task 1

**Files likely touched:** `public/andle-portfolio.html` (1 file)

**Estimated scope:** S

### [ ] Task 5: Fix links — Twitter and WhatsApp

**Description:** In `public/andle-portfolio.html`: Twitter `twitter.com/ifedikevictor` → `x.com/lwhitefire`; remove WhatsApp `wa.me/2348000000000` link entirely (no phone/WhatsApp published).

**Acceptance criteria:**
- [ ] Twitter link points to `https://x.com/lwhitefire`
- [ ] No `wa.me/` anywhere in the file
- [ ] No `twitter.com/ifedikevictor` anywhere in the file

**Verification:** grep for `twitter.com/ifedikevictor` — zero matches; grep for `wa.me` — zero matches; grep for `x.com/lwhitefire` — present

**Dependencies:** Task 1

**Files likely touched:** `public/andle-portfolio.html` (1 file)

**Estimated scope:** XS

## Checkpoint: Content changes

- [ ] My Stack grid: 12 marks, labels, correct position, no marquee
- [ ] Identity: Makuo Ifedike everywhere visible, no superseded names
- [ ] Links: Twitter x.com/lwhitefire, no WhatsApp
- [ ] Counters preserved: "2 complete & shipped" / "2 in active development"
- [ ] Review with human before final verification

---

### Phase 3: Final verification

### [ ] Task 6: Runtime divergence verification (reference vs build)

**Description:** Use the runtime divergence skill to confirm the runtime HTML/CSS/JS of the reference (port 3010) and the build (port 3009) match after content changes. Only content differences should exist (identity, My Stack, links) — no structural/design differences.

**Acceptance criteria:**
- [ ] Runtime divergence check completed between :3010 and :3009
- [ ] Differences limited to expected content changes only
- [ ] No structural or layout differences
- [ ] All counters present
- [ ] All My Stack marks visible

**Verification:** Runtime divergence report shows only intentional content diffs; no layout/structure diffs

**Dependencies:** Tasks 3, 4, 5

**Files likely touched:** None (verification only)

**Estimated scope:** XS

### [ ] Task 7: Final benchmark check against corrected spec

**Description:** Verify all corrected truth-pass benchmarks pass: counters present, footer correct, Twitter fixed, no WhatsApp, My Stack grid correct, counters stay.

**Acceptance criteria:**
- [ ] Counters present ("2 complete & shipped" / "2 in active development")
- [ ] Footer: `© Makuo Ifedike built by whitefire`
- [ ] Twitter: `x.com/lwhitefire`
- [ ] No `wa.me/` anywhere
- [ ] My Stack spacing: tight (no large gap between grid and About)
- [ ] No new sections added
- [ ] Layout identical to reference

**Verification:** grep/curl checks against live server on :3009

**Dependencies:** Task 6

**Files likely touched:** None (verification only)

**Estimated scope:** XS

## Checkpoint: Complete

- [ ] All benchmark checks pass
- [ ] Runtime divergence confirms only intentional content diffs
- [ ] Working tree clean, committed to git
- [ ] Ready for next task

## Risks and Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| Reference file overwrites current page, temporarily reverting identity | Med | Content changes applied immediately after; verify match before changes |
| Runtime mismatch due to Next.js serving static HTML differently | Med | Compare served HTML byte-for-byte; both servers static file serving |
| My Stack grid spacing/collisions with existing CSS | Low | Same section structure as client strip; inline margin/padding override if needed |
| `Ifedike Victor` remnants in inlined CSS/JS strings | Low | Full grep sweep after changes; remove all visible occurrences |

## Open Questions

None — all decisions settled by grill (all confirmed "yes").

---

**Plan location:** `developer-workspace/plans/TASK-001-rebuild-from-reference-plan.md` (project convention: plans in `developer-workspace/plans/`)

Shared understanding confirmed. Plan written. Awaiting execution confirmation.