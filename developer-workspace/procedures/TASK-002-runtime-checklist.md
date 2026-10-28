# Runtime Checklist — TASK-002 System Foundation (CI)

**What this is:** the CI pipeline for TASK-002, run as an agent-executed checklist (not GitHub Actions). Each item gets PASS / FAIL / NOT RUN with evidence.

**Port:** `3009` (Next.js dev server)

---

## Preconditions

| ID | Check | Expected | Evidence | Result |
|----|-------|----------|----------|--------|
| P1 | Dev server on `:3009` | `curl -I http://localhost:3009/` returns 2xx | Status code | |
| P2 | Working tree clean | `git status` clean | `git status` output | |
| P3 | Port 3000 unused | Nothing on `:3000` | `curl -I http://localhost:3000` fails | |

---

## A — Install

| ID | Check | Expected | Evidence | Result |
|----|-------|----------|----------|--------|
| A1 | `npm install` (or `bun install`) completes | Exit code 0, no missing packages | Install output | |
| A2 | `node_modules` present | Directory exists with packages | `ls node_modules` | |

---

## B — Typecheck

| ID | Check | Expected | Evidence | Result |
|----|-------|----------|----------|--------|
| B1 | `tsc --noEmit` passes | Exit code 0 | `tsc --noEmit` output | |
| B2 | `next build` typecheck step passes | "Finished TypeScript" with no errors | Build output | |

---

## C — Build

| ID | Check | Expected | Evidence | Result |
|----|-------|----------|----------|--------|
| C1 | `next build` succeeds | Exit code 0 | Build output | |
| C2 | Production build generates routes | `/` route listed | Build output route table | |

---

## D — Link check

| ID | Check | Expected | Evidence | Result |
|----|-------|----------|----------|--------|
| D1 | All internal links resolve | No 404 on clicked links | Crawl of built output | |
| D2 | External links reachable | External URLs return 2xx | Link check output | |

---

## E — Runtime divergence (reference vs build)

| ID | Check | Expected | Evidence | Result |
|----|-------|----------|----------|--------|
| E1 | Reference HTML matches build HTML | `cmp` returns identical | `cmp` output | |
| E2 | Runtime divergence skill run | Only intentional content diffs | Divergence report | |
| E3 | No structural/design drift | No unexpected markup changes | Divergence report | |

---

## F — Identity & content

| ID | Check | Expected | Evidence | Result |
|----|-------|----------|----------|--------|
| F1 | Page title | `Makuo Ifedike — ...` | `<title>` text | |
| F2 | Footer copyright | `© Makuo Ifedike built by whitefire` | Footer text | |
| F3 | No `Ifedike Victor` visible | 0 matches | Grep of rendered HTML | |
| F4 | No `Whitefire` as studio | 0 matches | Grep of rendered HTML | |
| F5 | Twitter: `x.com/lwhitefire` | Link present | `href` attribute | |
| F6 | No `wa.me/` WhatsApp link | 0 matches | Grep of rendered HTML | |

---

## G — My Stack grid

| ID | Check | Expected | Evidence | Result |
|----|-------|----------|----------|--------|
| G1 | Exactly 8 marks | Count = 8 | Grep of `/logos/` | |
| G2 | Correct names | Next.js, TypeScript, Tailwind CSS, Sanity, Supabase, Neon Postgres, Clerk, Vitest | Labels present | |
| G3 | Logo size 56px | `width="56" height="56"` | Image attributes | |
| G4 | No marquee | No animation on grid | Visual check | |
| G5 | Left spacing | `padding-left: 30px` on section | Inline style | |

---

## H — Counters preserved

| ID | Check | Expected | Evidence | Result |
|----|-------|----------|----------|--------|
| H1 | Counter "2 complete & shipped" | Present | Rendered text | |
| H2 | Counter "2 in active development" | Present | Rendered text | |

---

## Recording

- PASS = expected result observed, evidence recorded
- FAIL = expected result not observed, or regression appeared. Record route, expected vs actual, evidence snippet or status code
- NOT RUN = could not be performed safely, or owner input absent; state reason
- A not-run check is never a pass
- Do not fix silently — record FAIL, fix, re-run

Write results to `developer-workspace/reports/TASK-002-runtime-checklist-<date>.md`.

---

## Close-out

After all checks PASS (or NOT RUN with owner justification):
1. Write handoff to `developer-workspace/reports/TASK-002-handoff.md`
2. Owner decides whether to push/deploy
3. Agent does NOT push, merge, or change branch protection