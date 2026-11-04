# TASK-007 — Testing task

You did not build this. Prove each part behaves as specified and record pass or fail with what you saw. Report failures — do not fix them.

If the builder runs this list instead of a separate tester, run every part anyway and record each one honestly.

## Before you start

1. `npx tsc --noEmit` — clean.
2. `npm run validate:content` — passes.
3. `npm run build` — succeeds.
4. `npm run start` (production build, port 3000). Use `http://localhost:3000/`, not `127.0.0.1`. Port 3000 is often busy with the owner's dev server — stop it for the run and restart it afterwards.
5. Note the commit you are testing.

Parts 1 and 2 must run against the **production build**, not the dev server.

---

## Part 0 — Truespec live URL

- `curl -s -o /dev/null -w "%{http_code}\n" -L https://truespec.duckdns.org/` returns `200`.
- If it does not resolve, mark **this part blocked** and run the rest. Do not fail the whole task over it.
- `content-workspace/drafts/` still contains the old URL — that is allowed and must not be reported as a failure.
- The Truespec card and its case-study live link point to `https://truespec.duckdns.org/`.
- The JSON-LD node for Truespec has `"url": "https://truespec.duckdns.org/"`.
- `public/llms.txt` shows the new Truespec URL.
- `grep -rn "truespec-k4y6" src/ public/ content-workspace/pieces/` returns nothing.
- The portfolio's own canonical is unchanged everywhere: `<link rel="canonical">`, `sitemap.xml`, `robots.txt` all still say `https://makuo-ifedike.vercel.app/`.
- Historical files (reports, notes, plans, parity captures, `scrape-workspace/`, `product-management/research/`) still contain the old URL. **That is correct** — do not flag it.

**Pass:** all of the above.

---

## Part 1 — Accessibility

### axe

Run at both viewport sizes:

```
npx @axe-core/cli http://localhost:3000 --viewport 390x844
npx @axe-core/cli http://localhost:3000 --viewport 1440x900
```

If `@axe-core/cli` will not run, run the same checks inside Playwright and say which tool produced the result.

**Pass:** zero violations of impact `serious` or `critical`. Record the full count per severity. Every `moderate` or `minor` violation left unfixed is named in the report with its reason.

### Skip link

- Load the page and press `Tab` once.
- The first focus stop is "Skip to content", and it is visible.
- Press `Enter`: focus moves into the page content, past the navigation.
- Press `Tab` again from the top after reloading: the link is hidden again.

**Pass:** all four.

### Keyboard walk

Using only the keyboard:

- reach the nav links;
- reach the work filter and change it;
- reach the orange launcher and press Enter: the form opens;
- Tab through every field and the consent checkbox;
- Escape closes the form;
- the contact form traps focus (Tab from the last element wraps to the first, Shift+Tab from the first wraps to the last);
- focus returns to the launcher after Escape.

**Pass:** the whole path works without a mouse, and focus never disappears into the page body.

### Focus visibility

Tab through the page and watch every stop. Each interactive element shows a clearly visible focus indicator against its own background — including the orange buttons, the dark cards, and the prompt close buttons.

**Pass:** no stop is invisible or nearly invisible.

### Contrast

Check the reported failures only. For each changed colour, sample the computed colour and background and confirm the ratio meets AA for its size (4.5:1 normal, 3:1 large text).

**Pass:** every text element the audit flagged now passes, and no other colour changed.

### Hit areas

Measure the orange launcher, BackToTop, and each prompt's × button.

**Pass:** each interactive area is at least 44×44 CSS pixels, and the visible glyph is unchanged.

### Reduced motion

Enable `prefers-reduced-motion: reduce` in DevTools → Rendering.

- Trigger the launcher's cooldown by opening and closing the form: the ring does not animate.
- Trigger a prompt: it appears without sliding.
- Reach the footer: the toast appears, no confetti falls.
- The hero carousel does not auto-advance.

**Pass:** no motion the visitor asked to avoid.

---

## Part 2 — Performance

With the production build running:

```
npx lighthouse http://localhost:3000 --only-categories=performance --preset=desktop --chrome-flags="--headless"
npx lighthouse http://localhost:3000 --only-categories=performance --chrome-flags="--headless"
```

Run the mobile one three times and take the median; single runs are noisy.

**Pass:**

- mobile LCP < 2.5s;
- CLS < 0.1;
- performance score ≥ 90.

Record the raw numbers, not just pass/fail.

### Portrait

- `public/images/portrait.webp` is under 300 KB and is the file the page requests.
- `public/images/portrait.png` still exists at the same path, is under 300 KB, and is what the social preview and JSON-LD point at.
- `public/images/` holds no `.bak` or oversized original; the originals are in `content-workspace/assets/`.
- Load the page at 390×844 and 1440×900 and compare the hero against the previous build side by side. Same crop, same position, same visible result.
- No layout shift when it loads.

**Pass:** every line holds.

---

## Part 3 — Error monitoring

### Boundaries

- Locally, add a temporary `throw new Error("smoke")` in a client component, load the page, then revert it.
- The fallback renders with the reload link, not a white screen or a stack trace.
- The server log contains the error.

An error the app shows the visitor also reaches `/api/client-errors` — check the server log for the report.

**Pass:** fallback shown, error logged, the app's own error reports through the route, nothing sensitive shown.

### Reporter route

```
curl -i -X POST http://localhost:3000/api/client-errors \
  -H 'content-type: application/json' \
  -d '{"message":"test error","stack":"x","url":"/","userAgent":"curl"}'
```

- Returns 204 and writes one JSON log line.

Then a body over 8 KB:

```
python3 -c "print('{\"message\":\"' + 'a'*9000 + '\"}')" > /tmp/big.json
curl -i -X POST http://localhost:3000/api/client-errors -H 'content-type: application/json' --data @/tmp/big.json
```

- Returns 413 and logs nothing.

A body with no `message`:

- Returns 400.

**Pass:** all three, and no form fields are accepted or logged.

### Server route

- Force a failure in the inquiry route (for example a temporary throw before the try/catch, then revert).
- The server log records the error with context.
- The log line contains no name, email, or message from the form.

**Pass:** error logged, no visitor data in it.

### No new dependency

`git diff package.json` shows no Sentry or monitoring package.

---

## Part 4 — Playwright smoke test

```
npm run test:e2e
```

against a fresh production build.

**Pass:** all eight checks run and pass:

1. `/` returns 200 with the correct title.
2. The four project cards are present and the Truespec card has a `data-featured` attribute.
3. The launcher opens the form.
4. Empty submit is blocked by the browser's native validation and no request is sent.
5. Escape closes the form and focus returns to the launcher.
6. No `ifedikemakuo.vercel.app` and no `localhost` anywhere in the project links.
7. Athletica links to `athletica-blond.vercel.app`.
8. Truespec links to `truespec.duckdns.org`.

### It can fail

Temporarily change the Athletica URL to `https://example.com`, run the test, and confirm check 7 fails. Revert.

**Pass:** the test fails when it should. A test that cannot fail proves nothing.

### CI

- Push to a branch (or run the workflow manually) and confirm the job runs: install, typecheck, build, content validation, link check, smoke test.
- Every step is green.
- Total runtime is within the job's timeout.

**Pass:** green end to end.

---

## Part 5 — Documentation

- Open a clean shell and run every command listed in the README, in order: `npm ci`, `npm run dev`, `npm run build`, `npm run start`, `npm run lint`, `npm run validate:content`, `npm run test:e2e`.
- Each works exactly as written. No missing script, wrong port, or invented flag.
- The environment variable table matches `.env.example`.
- Folder map paths all exist.
- The README links to `SETUP.md`, and `SETUP.md` is unchanged.

### Workflow doc

- Follow `docs/content-workflow.md` as if you were new: change one project's summary in `content-workspace/`, move it into `src/content/`, run `npm run validate:content`.
- The change appears on the site.
- Deliberately break a rule (for example remove a required field): the validator names the problem.

**Pass:** someone can follow it without asking a question, and the validator catches the break.

### Domain

```
grep -rn "ifedikemakuo" README.md docs/ || echo clean
grep -rn "ifedikemakuo" src/ || echo clean
```

**Pass:** both print `clean`.

---

## Final diff

- No copy, section order, card, counter, milestone, or My Stack change.
- `content-workspace/` changed only in `pieces/llms-txt.md` and `pieces/person-jsonld.md`; `drafts/` untouched.
- The mobile menu, the scrapped modal, and the work-card tooltip are untouched.
- `@playwright/test` is the only new dependency.
- No credentials or DSNs committed.
- No push, no deploy.

**Pass:** every line holds.

## What to hand back

Per part: pass or fail, the commands you ran, the numbers you measured (contrast ratios, LCP, CLS, Lighthouse score, file sizes, CI runtime), and anything that failed. Say which commit you tested.
