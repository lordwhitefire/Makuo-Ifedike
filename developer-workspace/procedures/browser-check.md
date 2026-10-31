# Working procedure — browser check for ifedike_makuo

**What this is:** the project's way of checking the built app **in a real browser**, written down once so it is
never re-derived. Refer to this file, not to an old task's plan.

**Status:** standing procedure, applies to every layer.

**Authority for rules:** the task spec and the approved decisions, never the browser. This procedure checks
**surfaces only** — what a visitor sees and whether links resolve.

**Underlying method:** `~/.agents/skills/runtime-parity/` — two Runtime Maps, never two live sites; a
**production build**, never a dev server; a mismatch is **FAIL** and to be fixed, then the check runs again.
**Browser procedure:** `~/.agents/skills/browser-attach/` — the one attach-only discipline.

---

## 1. The discipline

- **Attach, never launch.** Use the automation Chrome already listening on **CDP `:9222`**. If nothing is
  there, **stop and say so** — never start one.
- **Never headless. Never a second instance.** Confirm the browser is ours before navigating anything.
- **Count before and after** — no new browser process may appear. The owner's own browser is never touched.
  Only the tab this check owns is used; the human's tabs are never navigated or closed.
- **No screenshots unless the owner asks.** The owner checks the look by hand; this procedure records status
  codes, visible text, link targets, and presence/absence of elements.
- **Detach on exit.**
- **Do not fix silently.** If something is wrong, record it as **FAIL** with the route and evidence. Fix only
  after recording.

## 2. The server

- **The site is the production build**, served on **`:3009`** — `BUILD_URL`.
  - `next build`, then `next start -p 3009` (or `PORT=3009 npx next start`).
  - **`next dev` is never checked.** It injects its own runtime and recompiles while the source stands still;
    it is not the artifact.
- Retired ports are not used and not named.

## 3. The three jobs (from `runtime-parity`)

- **Gate** — `--site URL --maps runtime-maps/`: re-check the site against its confirmed Runtime Maps.
- **Claim** — `--claim claim.json`: check one written expectation, then wait for the owner's confirmation
  before any map is written.
- **Compare** — `--ref URL --build URL`: only when a reference site genuinely exists.

Each ends **PASS**, **FAIL** or **NOT RUN**. **NOT RUN is never a pass** and always carries its reason.

---

## 4. Before a check

- [ ] The server answers on `:3009` with the **built** output: `curl -I http://localhost:3009/` returns HTTP
  200 (after following the `/` → `/andle-portfolio.html` redirect).
- [ ] Automation Chrome visible and on `:9222`; attach-only; ours-check passed.
- [ ] Working tree is clean (`git status` clean) so you are checking committed code.

## 5. What to check — one pass through the visible page

Open `http://localhost:3009/` (redirects to `/andle-portfolio.html`) and go through these items in order.
Record **PASS / FAIL / NOT RUN** for each, with the route and the evidence.

| # | Item | What to look for | Expected |
|---|------|------------------|----------|
| 1 | Page title | Browser tab title | `Makuo Ifedike — I build and fix software for small businesses` |
| 2 | Meta robots | `<head>` | No `noindex` tag present |
| 3 | About heading | Visible h3/title in about section | `Makuo Ifedike` |
| 4 | Footer copyright | Footer bottom | `© Makuo Ifedike built by whitefire` (no `Ifedike Victor`, no Whitefire as studio) |
| 5 | Footer social links | Footer social icons | Twitter: x.com/lwhitefire; LinkedIn: linkedin.com/in/makuoifedike/; Github: github.com/lordwhitefire (no WhatsApp/wa.me) |
| 6 | My Stack grid | Section where client strip was | Exactly 8 marks with visible labels |
| 7 | My Stack marks | Grid items | Next.js, TypeScript, Tailwind CSS, Sanity, Supabase, Neon Postgres, Clerk, Vitest |
| 8 | My Stack behavior | Grid area | No moving marquee, no client logos |
| 9 | My Stack spacing | Gap between My Stack grid and About section | Left padding on section (`padding-left: 30px`), not flush to edge |
| 10 | Portrait | About section image | Owner's portrait (`/images/portrait.png`), transparent background, no Unsplash stock portrait |
| 11 | Counters | Counter boxes | Present: "2 complete & shipped" and "2 in active development" |
| 12 | Dead links | All `<a href>` on the page | No `index.html`, `projects.html`, `project-details.html`, `blog.html`, `blog-details.html`, `contact.html`, `href="#"`, or `wa.me/` |
| 13 | Social links | Footer social icons | Twitter: x.com/lwhitefire; LinkedIn: linkedin.com/in/makuoifedike/; Github: github.com/lordwhitefire |
| 14 | Placeholder copy | Why-choose cards, hero, about | No stock Andle copy ("Bring nature in your house", "Consulting solutions", etc.) |
| 15 | Link resolution | Click each remaining link | Each resolves to a real target (no 404 from a clicked link) |

## 6. Recording results

Write the result to `developer-workspace/reports/<check-name>-browser-check.md` with:

- The route checked (e.g. `http://localhost:3009/`)
- Each item number, expected vs actual, PASS/FAIL/NOT RUN
- Any FAIL with evidence (status code, visible text, link target)
- **What was NOT checked and why** — listed, never omitted

## 7. After the check

- Do not commit fixes as part of the check. Fixes are a separate task.
- Leave the server running or stop it — the owner decides.
- The browser check is the builder's verification; it does not replace the owner's own look review.

---

## 8. Quick checklist for a run

- [ ] Production build serving on `:3009` (`next build` + `next start`), confirmed answering; no `next dev`.
- [ ] Automation Chrome on `:9222`; attach-only; ours-check passed; no new process after the run.
- [ ] Every item recorded PASS / FAIL / NOT RUN with its evidence.
- [ ] Report written with the "not checked" list.
- [ ] No screenshots unless asked. Detach on exit.
