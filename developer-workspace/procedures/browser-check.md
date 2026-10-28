# Working procedure — browser check for ifedike_makuo

**What this is:** the project's way of checking the built app **in a real browser**, written down once so it is never re-derived. Refer to this file, not to an old task's plan.

**Status:** standing procedure, applies to every layer.

**Authority for rules:** the task spec and the approved decisions, never the browser. This procedure checks **surfaces only** — what a visitor sees and whether links resolve.

---

## 1. The discipline

- **Check in a real browser.** Open Chrome (or any real browser the owner uses) and navigate to `http://localhost:3009`. Do not check by reading source alone.
- **Port 3009 is the dev port.** The dev server runs there (`PORT=3009 npx next dev -p 3009`). Port 3000 is never used for this project.
- **No screenshots unless the owner asks.** The owner checks the look by hand; the procedure records status codes, visible text, link targets, and presence/absence of elements.
- **Do not fix silently.** If something is wrong, record it as FAIL with the route and evidence. Fix only after recording.

---

## 2. Before a check

- [ ] Confirm the dev server is running on port 3009: `curl -I http://localhost:3009/` returns HTTP 200 (after following the `/` → `/andle-portfolio.html` redirect).
- [ ] Confirm no other process is on port 3009.
- [ ] Working tree is clean (`git status` clean) so you are checking committed code.

---

## 3. What to check — one pass through the visible page

Open `http://localhost:3009/` (redirects to `/andle-portfolio.html`) and go through these items in order. Record PASS / FAIL / NOT CHECKED for each.

| # | Item | What to look for | Expected |
|---|------|------------------|----------|
| 1 | Page title | Browser tab title | `Makuo Ifedike — I build and fix software for small businesses` |
| 2 | Meta robots | `<head>` | No `noindex` tag present |
| 3 | About heading | Visible h3/title in about section | `Makuo Ifedike` |
| 4 | Footer copyright | Footer bottom | `© Makuo Ifedike built by whitefire` (no `Ifedike Victor`, no Whitefire as studio) |
| 5 | Footer social links | Footer social icons | Twitter: x.com/lwhitefire; LinkedIn: linkedin.com/in/makuoifedike/; Github: github.com/lordwhitefire (no WhatsApp/wa.me) |
| 6 | My Stack grid | Section where client strip was | Exactly 12 marks with visible labels |
| 7 | My Stack marks | Grid items | Next.js, React, Remix, TypeScript, Tailwind CSS, Sanity, Supabase, Neon Postgres, Prisma, Clerk, Vercel, Vitest |
| 8 | My Stack behavior | Grid area | No moving marquee, no client logos |
| 9 | My Stack spacing | Gap between My Stack grid and About section | Tight/reduced spacing (not too large) |
| 10 | Portrait | About section image | Owner's portrait (`/images/portrait.png`), transparent background, no Unsplash stock portrait |
| 11 | Counters | Counter boxes | Present: "2 complete & shipped" and "2 in active development" |
| 12 | Dead links | All `<a href>` on the page | No `index.html`, `projects.html`, `project-details.html`, `blog.html`, `blog-details.html`, `contact.html`, `href="#"`, or `wa.me/` |
| 13 | Social links | Footer social icons | Twitter: x.com/lwhitefire; LinkedIn: linkedin.com/in/makuoifedike/; Github: github.com/lordwhitefire |
| 14 | Placeholder copy | Why-choose cards, hero, about | No stock Andle copy ("Bring nature in your house", "Consulting solutions", etc.) |
| 15 | Link resolution | Click each remaining link | Each resolves to a real target (no 404 from a clicked link) |

---

## 4. Recording results

Write the result to `developer-workspace/reports/<check-name>-browser-check.md` with:

- The route checked (e.g. `http://localhost:3009/`)
- Each item number, expected vs actual, PASS/FAIL
- Any FAIL with evidence (status code, visible text, link target)
- What was NOT checked and why

---

## 5. After the check

- Do not commit fixes as part of the check. Fixes are a separate task.
- Leave the dev server running or stop it — the owner decides.
- The browser check is the builder's verification; it does not replace the owner's own look review.
