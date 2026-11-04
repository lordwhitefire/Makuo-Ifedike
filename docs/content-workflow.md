# Content workflow

Two folder families, two roles. Getting which is which right is the whole thing.

| Folder | Role |
| --- | --- |
| `content-workspace/` | **Source of truth for copy.** The content agent's workspace: `briefs/`, `drafts/`, `pieces/`, `responses/`, `lessons/`, `assets/`. `drafts/` and `assets/` are history — old URLs and superseded images stay there on purpose. |
| `src/content/` | **What the site renders.** `identity.ts`, `projects.ts`, `inquiries.ts`, `structured-data.ts`. The build reads nothing else. |
| `public/llms.txt` | The published copy of the machine-readable text. Mirrors `content-workspace/pieces/llms-txt.md`. |

## The rule about other agents' files

`content-workspace/` is not the developer's folder. Its `README.md` says so too. Changing
a `pieces/` file — or anything in another agent's workspace — is never silent: the piece is
finished work that already went out, and the `responses/` and `lessons/` files depend on
what it actually said. Same for `design-workspace/`. Ask first, and record what changed in
`developer-workspace/notes/` when you do it as part of a task.

## How a piece moves from `pieces/` into `src/content/`

1. Edit the piece in `content-workspace/pieces/` — that is where the copy lives.
2. Carry it across by hand into the rendering file: project rows into
   `src/content/projects.ts`, identity facts into `src/content/identity.ts`, inquiry
   options into `src/content/inquiries.ts`, and `llms-txt.md` into `public/llms.txt`
   verbatim.
3. Structured data follows automatically: `src/content/structured-data.ts` builds each
   project's `url` from `projects.ts` (`liveUrl`), so a domain move never touches it. The
   person-level JSON-LD mirrors `content-workspace/pieces/person-jsonld.md`.
4. Run `npm run validate:content`.

Example — moving Truespec to its live domain (done in TASK-007):

| Where | What changed |
| --- | --- |
| `content-workspace/pieces/llms-txt.md:42` | `truespec.duckdns.org` |
| `content-workspace/pieces/person-jsonld.md:91` | same URL |
| `src/content/projects.ts` | `liveUrl` and `caseStudy.liveLink` |
| `public/llms.txt` | same URL (two lines) |
| `src/content/structured-data.ts` | nothing — derived |

## What `npm run validate:content` checks

It prints one `ok:` line per check and exits non-zero on the first failure it finds. The
script is `scripts/validate-content.mjs`, and it runs **18 checks, grouped in 14 numbered
blocks** — no network, no browser, so it is safe in CI and offline.

1. Exactly four project records (`truespec`, `interior-deco`, `athletica`, `cp3-legacy`)
2. Truespec is listed first — it is the flagship
3. Required fields present on every record
4. `status` is `live` or `in-progress`
5. `filter` is `marketing-site` or `web-app`
6. Truespec is the only `featured` project
7. `testimonial` is `null` for all four
8. No `localhost` URLs in project records
9. Stray hyphen-less spelling of the canonical name absent from project records
10. `dates.created` present on every record, no `launched` field
11. `structured-data.ts` defines exactly one `@graph` with all seven node ids
12. Same file uses `https://schema.org` and covers all four slugs
13. `layout.tsx` renders exactly one `application/ld+json` script tag, built from
    `structured-data.ts`
14. `public/llms.txt` exists with bio, stack, featured work, inventory and corrected
    statuses
15. Stray domain absent from every scanned text file — `src/content/`\'s
    `identity.ts`, `projects.ts` and `structured-data.ts`, `src/app/`\'s `layout.tsx`,
    `not-found.tsx`, `robots.ts` and `sitemap.ts`, and `public/llms.txt`

(Blocks 11–13 are one numbered section in the file but three separate checks, which is why
the count is 18 and not 14.)

## Adding a new check

Open `scripts/validate-content.mjs`. Two helpers already exist:

```js
function fail(msg) { failures += 1; console.error(`FAIL: ${msg}`); }
function pass(msg) { console.log(`ok: ${msg}`); }
```

A check is one numbered block — say what you expect, then `fail()` or `pass()`:

```js
// 16. No placeholder emails
const placeholder = Object.values(projects).some((p) =>
  String(p.tooltip).includes("example.com"),
);
if (placeholder) {
  fail(`tooltip contains a placeholder domain`);
} else {
  pass("no placeholder domains in records");
}
```

Rules of the file: keep it offline and synchronous (it is read by CI and by a person in a
terminal), strip types only where already done (`stripTS` loads `projects.ts` without a
bundler), keep one idea per numbered block, and never print more than one failure per
check. Then bump the "N." of the block you add next to and run
`npm run validate:content`.

## The domain rule

`makuo-ifedike.vercel.app` is the only canonical domain. One older hyphen-less spelling of
the same name used to be published and must never come back — checks 9 and 15 grep the
source and the public text assets for that spelling. (It is deliberately not written out
in this document, so the documentation passes its own grep.) A project's own live site is
fine and expected:

- Truespec → `https://truespec.duckdns.org/`
- Interior-deco → `https://interior-deco-kappa.vercel.app/`
- Athletica → `https://athletica-blond.vercel.app/`
- CP3-legacy → `https://cp3-legacy.vercel.app/`

## Statuses and dates

| Project | Status | `dates.created` |
| --- | --- | --- |
| Truespec | `live` — flagship, listed first | 2026-10-16 |
| Interior-deco | `live` | 2024-01-03 |
| Athletica | `in-progress` | 2026-03-31 |
| CP3-legacy | `in-progress` | 2025-12-03 |

Dates are labelled `created`, never `launched` — check 10 refuses a `launched` field. The
cards read status from the same `status` values, so flipping a record from
`in-progress` to `live` is a one-line content change, not a code change.

## Try it

1. Open `src/content/projects.ts` and change Truespec's `summary` to something wrong,
   e.g. delete the whole `category: "Web app"` line.
2. Run `npm run validate:content` — it names the record and the missing field, and exits
   non-zero. `npm run build` will also refuse.
3. Restore the line, run it again, and the change you meant to make appears on the site.
