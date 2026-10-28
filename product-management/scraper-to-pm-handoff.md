# Scraper → Product Manager handoff

- **Date:** 2026-10-27
- **From:** Scraper agent
- **To:** Product Management agent
- **Status:** public-information pass complete and validated; the PM record needs a dated update.
- **Workspace root:** `/home/lordwhitefire/current-project/ifedike_makuo`
- **Job definition:** `product-management/scraper-handoff.md`

Read this file first, then the two research deliverables. This handoff does **not** replace
them; it tells you what changed, what to update, and where the evidence is.

---

## 1. The short version

- The owner ruled on the identity fields on **2026-10-27**. Those rulings supersede the
  identity lines in `decisions.md` and `architect-handoff.md`.
- **Display name:** Makuo Ifedike. **Legal name:** Victor Makuo Ifedike (structured data only).
- **Work email:** `mifedike@gmail.com`. **Personal email:** `victormakuo2002@gmail.com`.
- **Profiles:** GitHub `lordwhitefire`, X `lwhitefire`, LinkedIn `makuoifedike`.
- **Start:** July 2022 → **4 years 3 months** as of 2026-10-27. GitHub account 30 Aug 2022;
  first commit 22 Sep 2022.
- **36 public repositories:** 20 forks, 1 empty (`Makuo_Ifedike`), **15 counted projects**.
- **Four featured live projects** remain Truespec, Athletica, Interior-deco and CP3-legacy.
- **No client, employer, revenue, user count or award is verified.** None is claimed in the data.
- **Still open:** graduation year, city, the brief-vs-plan UI conflict, personal domain, bio,
  photo, contact page.

The full record is `research/profile-data.json`. The readable version is
`research/profile-summary.md`.

---

## 2. Owner rulings — 2026-10-27

These are recorded in `profile-data.json` under `owner_rulings` with `decided_at` and source
`src-051` / `src-052`. Do not overwrite them; later changes should add a new dated entry.

| Field | Ruling |
|---|---|
| Display name | **Makuo Ifedike** |
| Legal name | **Victor Makuo Ifedike** — `legalName` / `alternateName` only, never the H1 or title |
| Work email | `mifedike@gmail.com` |
| Personal email | `victormakuo2002@gmail.com` (the earlier `victoemakuo2002` was a typo) |
| LinkedIn | `https://www.linkedin.com/in/makuoifedike/` — the only profile |
| X | `https://x.com/lwhitefire` |
| GitHub | `https://github.com/lordwhitefire` |
| Experience start | **July 2022** (learning), not the GitHub account date |
| Duration as of 2026-10-27 | **4 years 3 months** |

**Rejected values — do not reintroduce:**

- `Ifedike Victor` and `Ifedike Victor Makuo` as display names.
- LinkedIn slugs `makuo-ifedike-216607350` and `victor-m-ifedike-2039a2239`.
- Emails `victormark2002@gmail.com` and `victoemakuo2002@gmail.com`.
- The old portfolio's "eight months" line and LinkedIn's "5 years 3 months" as current claims.

The two-name choice is deliberate: shorter, matches X and the live sites, and avoids three-name
variants competing in search. The full name is not lost — it stays in structured data.

---

## 3. What needs updating in the PM record

I have **not** edited any existing PM file. These are the edits the PM should make, in this
order, keeping the old text and adding a dated entry rather than silently rewriting history.

| File | Current state | Needed change |
|---|---|---|
| `product-management/decisions.md` | Owner "Ifedike Victor"; identity "Ifedike Victor only"; identity conflict flagged unresolved | Add a **2026-10-27** addendum: display name Makuo Ifedike, legal name recorded, three profiles, two emails, July 2022 start. Mark the old identity lines superseded. Keep Whitefire dropped and the dark Andle/modals decisions unchanged. |
| `product-management/project-facts.md` | Four projects verified | Keep the four as the featured set. Add the wider inventory: 15 counted projects, including the live Eliphany store/admin, FireSage portfolio, Odin/freeCodeCamp pages, and the unreleased video system and CMS. |
| `product-management/portfolio-six-layer-plan.md` | Built around "Ifedike Victor" | Update identity references to Makuo Ifedike. The UI plan itself is unchanged. |
| `product-management/architect-handoff.md` | Identity section says "Ifedike Victor only" and flags the name conflict unresolved | Replace with the 2026-10-27 ruling. Update `sameAs`, the Person JSON-LD fields, and the data-spine references to `research/profile-data.json`. Keep C-04/C-05 open. |
| `product-management/plan.md` | Owner/title use Ifedike Victor | Update the owner/title lines only; the plan's substance is unchanged. |
| `product-management/research/` | Two deliverables copied here | Treat as the source of truth for identity and project facts. Do not edit the JSON by hand; regenerate with the scripts if the facts change. |

**Whitefire:** the owner's 2026-10-27 ruling did not reverse the earlier decision. Whitefire
stays dropped as a personal identity. Interior-deco remains branded **Whitefire Interior** —
that is the project's brand, not the owner's studio or a confirmed client.

---

## 4. Open items still needing the owner

| ID | Item | Why it is open |
|---|---|---|
| C-04 | Graduation year | Resume says B.Eng 2019–2024; CP3 JSON-LD says 2025. Do not put a year in `alumniOf` until confirmed. |
| C-05 | City | Brief and CP3 say Onitsha; the old portfolio says Awka. Country is consistent (Nigeria). |
| C-08 | UI / URL architecture | Brief asks for a light UI and one page per project; the approved plan is the dark Andle look with same-page modals. The scraper built neither. The approved plan stands until the owner changes it. |

Also missing from the source material: personal domain, contact page, one-paragraph bio in the
owner's own words, a profile photo as a build asset, and the answer to "anything I do NOT want
public". These are listed in `profile-data.json.missing`.

Project display is also a PM/owner decision: feature the four verified projects, or list all 15.
The data supports either; it does not choose.

---

## 5. Project inventory in one screen

**Featured, verified live:** Truespec (dealership showroom + office), Athletica (football store,
owner calls it a live preview), Interior-deco (Whitefire Interior site), CP3-legacy (Chris Paul
fan site).

**Other live:** new-portfolio (FireSage Studio, Andle-template-derived), eliphany-ng (supplement
store), eliphany-admin and Admin-demo (two deployments of the same admin code), odin-landing-page,
freecodecamp_project_4.

**Unreleased / supporting:** agentic-video-system, interior-deco-cms, youtube-analytics,
online-store (appears template-derived), and the `lordwhitefire` profile README.

**Excluded:** 20 forks and one empty repo (`Makuo_Ifedike`, size 0, no commit). The full list is
in `profile-data.json.excluded_forks` and `.excluded_empty`.

Live-site observations the PM should know before writing case studies:

- **Interior-deco** already names **Makuo Ifedike** in its metadata and JSON-LD, with the work
  email. Its LinkedIn URL is the rejected slug and must change.
- **CP3-legacy** names **Ifedike Victor Makuo**, uses the rejected LinkedIn slug, and carries two
  different personal emails. It needs the most correction.
- **Athletica** has malformed Amazon quick-add links (`athletica-blond.vercel.app/https://www.amazon.com/...`).
- **New-portfolio** is template-derived; its contact is `hello@andle.com` and it calls itself a
  "two-person team". Neither is verified.
- **`ifedike-victor.vercel.app`** (the domain in `decisions.md`) returns 404.

---

## 6. What is not verified

No client contract, employer, revenue, user count, award, launch date or testimonial exists in
any source. The experience entries from LinkedIn are claims and are marked `low` confidence.
LinkedIn itself returned HTTP 999; only a search-index snippet was available. The captures are
dated 2026-10-27 and will go stale.

No phone or WhatsApp number appears in the deliverables. The personal number found on the old
portfolio and resume is redacted; the Truespec business WhatsApp and the Eliphany placeholder
are excluded.

---

## 7. Evidence and reproduction

`research/profile-data.json` is generated from the captures by
`scrape-workspace/build_profile.py`; `research/profile-summary.md` by
`scrape-workspace/build_summary.py`. `scrape-workspace/validate_profile.py` runs **54 checks**
(all pass) plus the adaptation test: one name, one screenshot path and one status were changed
on a copy, and only those fields moved. See `scrape-workspace/validations/REPORT.md`.

Every fact carries a `source_ids` entry pointing at the 52-row ledger in `profile-data.json`
and in the summary. No source, no fact.

---

## 8. Do not

- Do not silently merge `Makuo Ifedike` and `Ifedike Victor`; the ruling is recorded.
- Do not reintroduce the rejected emails, LinkedIn slugs or name forms.
- Do not publish a phone or WhatsApp number.
- Do not claim client work, revenue, users or awards.
- Do not treat the old portfolio's "eight months" or the LinkedIn index's "5 years 3 months" as
  current.
- Do not rewrite the 2026-10-27 rulings; add a new dated entry if something changes.

---

## 9. Suggested next actions

1. Add the **2026-10-27** identity addendum to `decisions.md`.
2. Update `project-facts.md` with the 15-project inventory, keeping the four featured.
3. Update `architect-handoff.md`: identity, `sameAs`, JSON-LD fields, and the path to
   `research/profile-data.json`.
4. Ask the owner for C-04 (graduation year), C-05 (city), C-08 (UI direction), the domain, the
   bio, the photo, and the "not public" list.
5. Only then let the architect build against the updated record.

---

## 10. File map

All paths are relative to `/home/lordwhitefire/current-project/ifedike_makuo` unless absolute.

### Source of truth — read these

| Path | What it is |
|---|---|
| `product-management/research/profile-data.json` | Canonical machine-readable record: identity, rulings, skills, 15 projects, forks, deployments, education, experience, contact, conflicts, 52 sources. |
| `product-management/research/profile-summary.md` | Readable version: counts, identity, projects, skills, conflicts, source ledger, surface-alignment checklist. |
| `product-management/scraper-handoff.md` | The job the PM gave the scraper; scope and truth rules. |
| `/home/lordwhitefire/Downloads/portfolio-brief.md` | The owner's newest brief (outside the workspace); source of the light-UI and page-per-project request. |

### PM record — needs the dated update

| Path | What it is |
|---|---|
| `product-management/decisions.md` | Decision log; identity lines now superseded. |
| `product-management/project-facts.md` | Prior four-project verification; still valid, now extended. |
| `product-management/portfolio-six-layer-plan.md` | Approved six-layer UI/build plan. |
| `product-management/architect-handoff.md` | Architect context; identity section now outdated. |
| `product-management/plan.md` | Original plan; owner/title lines need updating. |

### Scraper working files — evidence and regeneration

| Path | What it is |
|---|---|
| `scrape-workspace/deliverables/profile-data.json` | Working copy of the canonical JSON. |
| `scrape-workspace/deliverables/profile-summary.md` | Working copy of the summary. |
| `scrape-workspace/plans/2026-10-27-public-profile.md` | Classification, method, result, and the 2026-10-27 addendum. |
| `scrape-workspace/validations/REPORT.md` | 54-check validation report and adaptation test. |
| `scrape-workspace/validations/adaptation-test/` | Mutated copy and re-rendered summary from the adaptation test. |
| `scrape-workspace/structures/github-inventory.json` | All 36 repos with metadata and file trees. |
| `scrape-workspace/structures/site-verification.json` | 14 live-site captures: status, title, JSON-LD, links. |
| `scrape-workspace/captures/github/` | GitHub API JSON, 15 file trees, raw READMEs/manifests/source files. |
| `scrape-workspace/captures/sites/` | Per-site DOM, metadata, JSON-LD, links, visible text, screenshots. |
| `scrape-workspace/captures/resume/ifedike.pdf` / `.txt` | Public resume and text extraction; contains a phone number, evidence only. |
| `scrape-workspace/README.md` | Workspace map and regeneration commands. |
| `scrape-workspace/build_profile.py` | Regenerates `profile-data.json` from the captures. |
| `scrape-workspace/build_summary.py` | Regenerates `profile-summary.md` from the JSON. |
| `scrape-workspace/validate_profile.py` | Runs the checks and the adaptation test. |
| `scrape-workspace/fetch_sites.py`, `fetch_sites_2.py` | Shared-Chrome CDP capture scripts (not needed to read the output). |
| `andle-portfolio-repomix.xml` + `extract_repomix.py` | Packed existing portfolio source and extractor; **not used** in this pass. |

---

*End of handoff. The two research files are the record; this file is the map.*
