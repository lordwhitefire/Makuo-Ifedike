# Runtime checklist — ifedike_makuo

**What this is:** the checklist of runtime checks run against the live dev server on port 3009. Every check has an expected result and evidence. Record PASS / FAIL / NOT CHECKED with evidence.

**Status:** standing checklist for the truth pass and any subsequent layer.

**Port:** `3009` (dev server: `PORT=3009 npx next dev -p 3009`)

---

## Preconditions (run first)

| ID | Check | Expected | Evidence | Result |
|----|-------|----------|----------|--------|
| P1 | Dev server on `:3009` | `curl -I http://localhost:3009/` returns 2xx after redirect | Status code; redirect target | |
| P2 | Working tree clean | `git status` shows clean tree | `git status` output | |
| P3 | Port 3000 unused | Nothing listening on `:3000` | `lsof -i :3000` or curl fails | |

---

## A — Identity (truth pass benchmark 3)

| ID | Check | Expected | Evidence | Result |
|----|-------|----------|----------|--------|
| A1 | Page title | `Makuo Ifedike — I build and fix software for small businesses` | `<title>` text | |
| A2 | About heading | `Makuo Ifedike` | Visible h3 in about section | |
| A3 | Footer copyright | `© Makuo Ifedike built by whitefire` (no `Ifedike Victor`, no Whitefire as studio) | Footer text | |
| A4 | Footer social links | Twitter: x.com/lwhitefire; LinkedIn: linkedin.com/in/makuoifedike/; Github: github.com/lordwhitefire (no WhatsApp/wa.me) | Footer social `href` values | |
| A5 | No dead links | No `*.html` hrefs, no `href="#"`, no `wa.me/` anywhere | Grep of rendered HTML | |

---

## B — Content & links (truth pass benchmarks 1 & 2)

| ID | Check | Expected | Evidence | Result |
|----|-------|----------|----------|--------|
| B1 | No placeholder copy | No stock Andle copy in why-choose/hero/about | Rendered text | |
| B2 | No template credit | No "Built on the Andle template" | Footer text | |
| B3 | No dead links | No `*.html` hrefs, no `href="#"`, no `wa.me/` anywhere | Grep of rendered HTML | |
| B4 | My Stack: 12 marks | Exactly 12 logo marks with labels | Count of grid items | |
| B5 | My Stack: correct names | Next.js, React, Remix, TypeScript, Tailwind CSS, Sanity, Supabase, Neon Postgres, Prisma, Clerk, Vercel, Vitest | Grid labels | |
| B6 | My Stack: no marquee | Grid is static, not animated | Visual check | |
| B7 | My Stack: no client logos | No client logos in the stack section | Visual check | |
| B8 | My Stack spacing | Tight/reduced spacing between My Stack grid and About section | Visual check (no large gap) | |
| B9 | Portrait: owner's image | `/images/portrait.png` in about section | `img src` attribute | |
| B10 | Portrait: no stock | No Unsplash stock portrait URL in about section | Rendered HTML | |
| B11 | Counters present | Counter boxes present: "2 complete & shipped" and "2 in active development" | `data-count-to="2"` present, rendered text visible | |
| B12 | Link resolution | Every remaining link resolves (no 404 on click) | Clicked-link status codes | |

---

## C — SEO intent (truth pass benchmark 4)

| ID | Check | Expected | Evidence | Result |
|----|-------|----------|----------|--------|
| C1 | No noindex | No `<meta name="robots" content="noindex...">` in `<head>` | Grep of rendered HTML | |
| C2 | Decision recorded | `developer-workspace/notes/noindex-decision.md` exists | File exists | |

---

## Failure states

| State | Route / action | Expected | Evidence | Result |
|-------|---------------|----------|----------|--------|
| Missing page | `GET /andle-portfolio.html` | Real 200 (the static page exists) | Status code | |
| Bad route | `GET /nonexistent` | Real 404 from Next.js | Status code | |

---

## Recording

- PASS = expected result observed, evidence recorded.
- FAIL = expected result not observed, or a regression appeared. Record route, expected vs actual, evidence snippet or status code. Do not fix silently.
- NOT CHECKED = could not be performed safely; state the reason.

Write results to `developer-workspace/reports/runtime-checklist-<date>.md`.
