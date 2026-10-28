# Scraper Handoff — Complete Public Information About Makuo Ifedike / Lordwhitefire

**From:** Product Management agent  
**To:** Scraper agent  
**Date:** 2026-10-26  
**Status:** Handoff for data gathering. No scraping has been done by the Product Management agent.  
**Workspace:** `/home/lordwhitefire/current-project/ifedike_makuo`  
**PM workspace:** `/home/lordwhitefire/current-project/ifedike_makuo/product-management/`  
**Brief:** `/home/lordwhitefire/Downloads/portfolio-brief.md`

---

## 0. Why this handoff exists

The owner already has the visible UI. The UI is deliberately short and neat. The **code** must carry heavy, complete, truthful information about him so search engines and AI agents can read one organised source.

This is **not** a UI redesign and **not** a copywriting task. It is a **public-information gathering** task. The scraper's job is to find, verify, and structure every relevant public fact about the owner and every non-forked project he has built.

The Product Management agent does not scrape, does not build, and will not do this job. This handoff defines the job for the scraper.

---

## 1. Read these first

All paths are relative to `/home/lordwhitefire/current-project/ifedike_makuo/`.

1. **`/home/lordwhitefire/Downloads/portfolio-brief.md`** — the owner's brief. It is the newest statement of the information-layer goal. It also contains fields that are still `[FILL IN]`.
2. **`product-management/decisions.md`** — existing owner decisions and accepted defaults. Where the brief conflicts, flag it; do not silently overwrite.
3. **`product-management/portfolio-six-layer-plan.md`** — the approved six-layer plan for the existing UI and build.
4. **`product-management/project-facts.md`** — verified facts about the four known live projects. Use it as a starting point, not a ceiling.
5. **`product-management/architect-handoff.md`** — how the data will be used by the architect.
6. **`product-management/plan.md`** — the original approved plan.
7. **`andle-portfolio-repomix.xml`** — packed current portfolio source. It contains `public/andle-portfolio.html`, `public/andle/engagement.js`, Next.js files, and the build script. `extract_repomix.py` can extract it if needed.
8. **`product-management/engagement-plan.md`** — context only; do not scrape engagement behaviour.

**Conflict rule:** the brief is the newest input, but `decisions.md` records owner decisions. If the brief and the decisions disagree, collect both readings, mark the conflict, and report it. Do not resolve it by guessing.

---

## 2. Scope

### In scope

- The owner's public identity: names, aliases, headline, location, bio material, education, experience, skills, contact, profiles.
- Every **public, non-forked GitHub repository** owned by `lordwhitefire`.
- Every live site or deployment linked from those repositories.
- The four known live projects: Interior-deco, Truespec, Athletica, CP3-legacy.
- Public profiles: GitHub, LinkedIn, Twitter/X, personal site, and any other real profile.
- Machine-readable facts suitable for JSON-LD, `llms.txt`, metadata, and an About page.
- Source URLs, fetch dates, evidence quotes, confidence, missing fields, conflicts.

### Out of scope

- UI design, visual direction, component work, or build.
- Final copywriting. Collect material; do not invent a polished bio.
- Private repositories, credentials, API keys, or anything behind a login.
- Phone numbers, WhatsApp numbers, home addresses beyond city/state, government IDs, or private personal data.
- Client confidential information or unverified client relationships.
- Bypassing robots.txt, paywalls, LinkedIn login walls, or rate limits.
- Scraping data brokers or people-search sites.

---

## 3. Sources to check, in order

### 3.1 GitHub — primary

Profile: `https://github.com/lordwhitefire`  
Repository list: `https://github.com/lordwhitefire?tab=repositories`

Use the public GitHub API where possible:

- `GET https://api.github.com/users/lordwhitefire`
- `GET https://api.github.com/users/lordwhitefire/repos?per_page=100&page=N`
- `GET https://api.github.com/repos/lordwhitefire/{repo}`
- `GET https://api.github.com/repos/lordwhitefire/{repo}/readme`
- `GET https://api.github.com/repos/lordwhitefire/{repo}/contents/`
- `GET https://api.github.com/repos/lordwhitefire/{repo}/git/trees/{branch}?recursive=1`

For every repo, record:

- `name`, `full_name`, `html_url`, `description`, `homepage`
- `fork` (must be `false` to count as own project)
- `archived`, `disabled`, `visibility`
- `language`, `topics`, `created_at`, `updated_at`, `pushed_at`
- default branch
- README text
- `package.json`, `requirements.txt`, `pyproject.toml`, or equivalent
- routes/pages, migrations, tests, deployment files
- live URL from `homepage`, README, or deployment files
- screenshots or preview assets if present

**Fork rule:** Exclude forks from the project count. Put them in a separate `excluded_forks` list with `reason: "fork"`. Do not present a fork as original work. If a fork contains substantial original work, note it separately, but do not count it as a project.

**Include** incomplete, abandoned, experimental, "not okay" repos. They are part of the owner's history. Label their status honestly:
`live`, `preview`, `in-progress`, `incomplete`, `archived`, `experiment`, `template`, `demo`, `unknown`.

**Do not** infer that a repo is client work. If the README says "client", quote it and mark `client_relationship: "claimed-in-readme"`, not "verified".

### 3.2 LinkedIn — public profile only

Brief URL: `https://www.linkedin.com/in/makuoifedike`

Record what is publicly visible without logging in. Do not bypass authentication. If LinkedIn blocks the request, mark `blocked` and move on.

Check for:

- headline
- location
- about
- experience
- education
- certifications
- skills
- contact links

### 3.3 Twitter/X and other profiles

The brief has `[FILL IN]` for Twitter/X. Search public web for:

- `Makuo Ifedike`
- `Ifedike Victor`
- `lordwhitefire`
- `makuoifedike`

Record only profiles that clearly belong to the same person. Do not merge accounts on name similarity alone. Mark confidence.

Other possible public profiles: personal site, Dev.to, Hashnode, Medium, Stack Overflow, Behance, Dribbble, Polywork, GitHub Gists. Only include if they are real and identifiable.

### 3.4 Live sites — known four

| Project | URL | Known stack |
|---|---|---|
| Interior-deco | `https://interior-deco-kappa.vercel.app/` | Remix 2, Sanity, Tailwind 3, Vercel |
| Truespec | `https://truespec-k4y6.vercel.app/` | Next.js 15, Neon Postgres, Clerk, Sanity, Vercel |
| Athletica | `https://athletica-blond.vercel.app/` | Next.js 16, Supabase, Sanity, Tailwind 4, Vercel |
| CP3-legacy | `https://cp3-legacy.vercel.app/` | Next.js 16, Tailwind 4, shadcn/ui, Sanity, Prisma, next-auth, Vercel |

For each live site, record:

- HTTP status, final URL, title, meta description, canonical, Open Graph
- visible page text (short extract)
- footer/creator links
- links to GitHub, LinkedIn, X, email, other projects
- whether it is live, preview, or dead
- whether it claims "Built by" the owner
- any `Organization`, `WebSite`, `Person`, `CreativeWork`, or `SoftwareApplication` JSON-LD already present
- screenshots of key pages if possible

### 3.5 Workspace evidence

- `product-management/project-facts.md` — verified facts about the four known projects.
- `andle-portfolio-repomix.xml` — current portfolio source and old copy.
- `extract_repomix.py` — extraction helper.
- `product-management/portfolio-six-layer-plan.md` — approved UI/build context.
- `product-management/decisions.md` — identity and content decisions.
- `portfolio-brief.md` — the brief's own claims and placeholders.

Do not re-scrape what `project-facts.md` already proves. Verify it and extend it.

### 3.6 Public search

Search for:

- `"Makuo Ifedike"`
- `"Ifedike Victor"`
- `"lordwhitefire"`
- `"makuoifedike"`
- `"Makuo Ifedike" developer`
- `"Makuo Ifedike" GitHub`
- `"Makuo Ifedike" LinkedIn`
- `"Ifedike Victor" developer`
- `"lordwhitefire" portfolio`

Use search results to find profiles, mentions, project pages, and live deployments. Open the result, not just the snippet. Cite the URL and fetch date.

---

## 4. Identity resolution

The workspace currently contains a real conflict. Do not hide it.

| Source | Name / handle |
|---|---|
| Brief | **Makuo Ifedike** |
| Existing plan | **Ifedike Victor** |
| GitHub | `lordwhitefire` |
| LinkedIn in brief | `makuoifedike` |
| LinkedIn in CP3 page | `makuo-ifedike-216607350` |
| CP3 page text | `Makuo Ifedike (lordwhitefire)` |
| CP3 contact line | `victormark2002@gmail.com` |

**Rules:**

- Treat **Makuo Ifedike** as the canonical name from the newest brief, but do **not** erase **Ifedike Victor**. Collect both as names/aliases and flag the canonical-name decision.
- Use exact spelling and capitalization from the source. Do not normalise names silently.
- Do not use **Whitefire** as the owner's name. Whitefire is a project/brand (Interior-deco). Do not claim Whitefire is a registered studio.
- Do not merge separate people based on similar names. If the evidence is weak, mark it `unconfirmed`.
- Do not publish a phone number or WhatsApp number.
- Email: collect public email only if it is already public. The brief allows an email or contact-page URL. Do not guess.

---

## 5. Project inventory rules

### 5.1 What counts

A project counts if:

- it is a public repository owned by `lordwhitefire`;
- it is **not a fork**;
- it is a real repository, not an empty placeholder.

Include projects that are:

- live
- in preview
- incomplete
- abandoned
- experimental
- "not okay" by the owner's own standard
- template-derived, if not a GitHub fork
- archived

The owner wants the complete history, not only the polished wins. Do not hide weak projects. Label them honestly.

### 5.2 What does not count

- Forks.
- Repositories owned by someone else.
- Private repositories.
- Empty repos with no code or README.
- Generated profile repos, unless they contain real content.

### 5.3 Per-project record

For every counted project, collect:

```json
{
  "name": "",
  "repo_url": "",
  "live_url": "",
  "is_fork": false,
  "description": "",
  "role": "owner / builder / designer / unknown",
  "stack": [],
  "features": [],
  "status": "live | preview | in-progress | incomplete | archived | experiment | template | demo | unknown",
  "created_at": "",
  "updated_at": "",
  "pushed_at": "",
  "readme_evidence": "",
  "live_site_title": "",
  "live_site_description": "",
  "screenshots": [],
  "source_ids": [],
  "confidence": "high | medium | low",
  "notes": ""
}
```

### 5.4 Extraction hints

- README: what the project is, features, stack, live link, setup.
- `package.json`: frameworks, libraries, scripts, versions.
- Route tree: pages, admin, auth, checkout, dashboard, API routes.
- Migrations: database scope.
- Tests: testing stack.
- `vercel.json`, `netlify.toml`, Dockerfile, GitHub Actions: deployment.
- `homepage` field: live URL.
- Commit history: only for dates and activity, not for claims.
- Screenshots in repo: use only if real.

### 5.5 What not to claim

- No invented outcomes, user counts, revenue, performance numbers, or client names.
- No "expert" or "senior" labels unless a source says it.
- No "built for [client]" unless a source says it.
- No "official" affiliation with a brand or athlete.
- No claim that a repo is deployed if the live URL is dead.
- No claim that a fork is original work.
- No claim that a template is original design.

---

## 6. Output format

Produce **two files**:

1. **`profile-data.json`** — machine-readable, source-backed.
2. **`profile-summary.md`** — human-readable summary of what was found, what is missing, and what conflicts.

If permitted, write them to:

`product-management/research/profile-data.json`  
`product-management/research/profile-summary.md`

If you cannot write inside this workspace, return both files to the owner.

### 6.1 JSON shape

```json
{
  "generated_at": "2026-10-26T00:00:00Z",
  "identity": {
    "canonical_name": "Makuo Ifedike",
    "aliases": ["Ifedike Victor", "lordwhitefire", "makuoifedike"],
    "headline": "",
    "location": {
      "city": "Onitsha",
      "state": "Anambra State",
      "country": "Nigeria"
    },
    "email": "",
    "contact_page": "",
    "profiles": [
      {
        "platform": "GitHub",
        "url": "https://github.com/lordwhitefire",
        "handle": "lordwhitefire",
        "verified": true
      }
    ]
  },
  "bio_material": {
    "one_line": "",
    "short": "",
    "long": "",
    "source_ids": []
  },
  "skills": {
    "evidenced": [
      {
        "name": "Next.js",
        "evidence": ["repo:truespec", "repo:athletica"],
        "confidence": "high"
      }
    ],
    "claimed": [
      {
        "name": "",
        "source_id": "",
        "confidence": "low"
      }
    ]
  },
  "projects": [],
  "excluded_forks": [
    {
      "name": "",
      "repo_url": "",
      "reason": "fork",
      "note": ""
    }
  ],
  "education": [],
  "experience": [],
  "contact": {
    "email": "",
    "contact_page": "",
    "public_profiles": []
  },
  "sources": [
    {
      "id": "src-001",
      "url": "",
      "type": "github | linkedin | live-site | search | workspace",
      "fetched_at": "",
      "status": 200,
      "notes": ""
    }
  ],
  "missing": [],
  "conflicts": []
}
```

### 6.2 Markdown summary

Include:

- What was found.
- Project count: total public repos, counted non-forked projects, excluded forks.
- Identity summary.
- Skills with evidence.
- Education and experience, or `missing`.
- Contact and profiles.
- What is missing.
- Conflicts that need an owner/architect decision.
- Source ledger.

### 6.3 Source ledger

Every fact must point to a source ID. The ledger must include:

- URL
- type
- fetched date/time
- HTTP status
- what it proves
- confidence

No source, no fact.

---

## 7. Truth and privacy rules

1. **Truth only.** If a fact is not supported by a source, leave it out and put it in `missing`.
2. **No CSS-hidden text.** The brief explicitly forbids white-on-white text, off-screen text, and `display:none` keyword blocks. The data will be used in JSON-LD and `llms.txt`, not hidden visible text.
3. **No invented metrics.** No user counts, revenue, conversion rates, performance numbers, awards, or client names.
4. **No implied clients.** A project can be a demo or a personal build. Say so.
5. **No phone or WhatsApp number.** The brief forbids publishing a phone/WhatsApp number on the public web.
6. **No home address.** City/state/country only.
7. **No private data.** No private repos, credentials, API keys, passwords, or private emails.
8. **No login bypass.** Do not bypass LinkedIn, GitHub, or site authentication.
9. **Quote uncertain claims.** If a repo says "client", quote it; do not upgrade it to "verified client".
10. **Date everything.** Repos change. Record the fetch date.
11. **Respect rate limits and robots.txt.** Use the GitHub API, cache results, and do not hammer sites.
12. **No data brokers.** Do not use people-search or leak sites.

---

## 8. What the data will feed

The architect will use the output to build:

- `Person` JSON-LD on the portfolio home page: `name`, `url`, `image`, `jobTitle`, `description`, `address`, `knowsAbout`, `sameAs`, `alumniOf` only if confirmed, `email` or contact page.
- `ProfilePage` / `WebSite` linking the site to the Person.
- `CreativeWork` or `SoftwareApplication` per project: what it is, role, stack, live link, repo link.
- `Organization` / `WebSite` on each project site, with `creator` / `author` pointing to the Person.
- `llms.txt` at each site root.
- `sitemap.xml`, `robots.txt`, canonical, Open Graph, title, meta description.
- About page with a longer bio.
- Project records and My Stack section.

The visible UI stays neat. The heavy information lives in structured data and discovery files — **not** in hidden CSS text.

---

## 9. Conflicts to report, not resolve

The scraper must put these in `conflicts`:

1. **Canonical name:** brief says **Makuo Ifedike**; prior plan says **Ifedike Victor**.
2. **LinkedIn URL:** brief says `makuoifedike`; CP3 page text says `makuo-ifedike-216607350`.
3. **Twitter/X, personal domain, contact email:** brief has `[FILL IN]`; find or mark missing.
4. **Education:** CP3 page text mentions B.Eng Chemical Engineering, Nnamdi Azikiwe University (2025); verify from LinkedIn or another source, or mark unconfirmed.
5. **UI/URL architecture:** brief asks for light UI and one page per project; approved six-layer plan uses the dark Andle look and same-page case-study modals. The owner says the UI already exists. **Do not build pages or redesign.** Collect data and flag the conflict.
6. **Project statuses:** verify each live URL; do not assume "live" from the README.
7. **Project count:** report total public repos, non-forked count, and excluded forks separately.
8. **Client relationships:** none are verified. Do not invent any.

---

## 10. Definition of done

- Every public non-forked repo owned by `lordwhitefire` is in `projects`.
- Every fork is in `excluded_forks` with `reason: "fork"`.
- Every project has a repo URL, description, stack evidence, status, and live URL or `null`.
- Identity, aliases, location, profiles, skills, education, experience, and contact are filled or marked `missing`.
- Every fact has a source ID and confidence.
- The source ledger is complete with fetch dates and statuses.
- Conflicts are listed, not guessed.
- `profile-data.json` is valid JSON.
- `profile-summary.md` states what was found, what is missing, and what needs a decision.
- No private data, no phone numbers, no invented claims, no hidden-text tricks.

---

## 11. Final note to the scraper

Do not ask the owner for information that can be found publicly. Search, verify, cite, and mark what is missing. Do not fill gaps with guesses. The owner wants the complete history — including projects that are not polished — but he wants it **true**.

**End of handoff.**
