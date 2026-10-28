# Plan — public-information pass for Makuo Ifedike / Ifedike Victor

- **Date:** 2026-10-27
- **Requested by:** owner, via `product-management/scraper-handoff.md` (Product Management agent)
- **Workspace:** `/home/lordwhitefire/current-project/ifedike_makuo`
- **Status:** complete; deliverable validated.

## What was asked

Find, verify and structure every relevant public fact about the owner and every
non-forked public GitHub project, so the architect can build truthful JSON-LD,
`llms.txt`, metadata and an About page. Two outputs: a machine-readable JSON file and a
human-readable summary. No UI work, no copywriting, no login bypass.

## Classification

**Data layer**, with live-site verification. Not a UI pull: the owner already has the
UI and this job does not redesign it. The sites were opened in the shared Chrome window
only to read what they actually serve (titles, JSON-LD, links, visible text,
screenshots), not to copy design.

## Method

1. GitHub public API: user record, all 36 public repos, 15 non-fork file trees, raw
   READMEs and manifests. Forks recorded separately; no fork counted as work.
2. Live sites: 14 owner-controlled URLs captured through the real Chrome window over
   CDP (no headless, no second window); 6 early deployments checked separately; dead
   URLs recorded as dead.
3. Profiles: X verified logged-out. LinkedIn returned HTTP 999 on all three URLs — not
   bypassed; a search-index snippet is used with `low`/`medium` confidence.
4. Public resume PDF read for education/experience evidence; phone number redacted.
5. Workspace evidence (`brief`, `decisions.md`, `project-facts.md`, handoffs) used as
   context, with conflicts recorded rather than resolved.

## Output form (owner's ruling accepted)

- `deliverables/profile-data.json` — source-backed, every fact carries a source ID.
- `deliverables/profile-summary.md` — found / missing / conflicts / ledger.
- Copies written to `product-management/research/` as the handoff permits.

## Counts

- 36 public repos → 20 forks excluded, 1 empty excluded, **15 counted projects**.
- Four featured live projects verified: Truespec, Athletica, Interior-deco, CP3-legacy.

## Conflicts found (reported, not resolved)

Canonical name; three LinkedIn URLs; three public emails; graduation year; location;
years of experience; brief-vs-plan UI architecture; project count presentation; no
verified client relationships; existing JSON-LD naming on Interior-deco/CP3.

## Validation

`validations/REPORT.md` — 44 checks, all pass. Adaptation test changed one label, one
asset path and one status on a copy; the JSON stayed valid, sources resolved, inventory
unchanged, and only the edited fields differed.

## Result

- 2026-10-27: captured GitHub + 14 owner URLs + resume; wrote both deliverables; copied
  them to `product-management/research/`; validation passed.

## Addendum — owner rulings, 2026-10-27

The owner reviewed the first pass and ruled on the identity fields. These are now recorded
in `profile-data.json` under `owner_rulings` and in the summary under "Owner rulings —
2026-10-27", with the date on every resolved conflict.

- **Display name:** Makuo Ifedike. **Legal name:** Victor Makuo Ifedike — schema only,
  never the H1/title. The three-name form is not used for display.
- **Emails:** work `mifedike@gmail.com`; personal `victormakuo2002@gmail.com`
  (confirmed 2026-10-27; the earlier `victoemakuo2002` was a typo).
  `victormark2002@gmail.com` is dropped.
- **Profiles:** LinkedIn `makuoifedike` is the only one; the other two slugs are rejected
  and kept only in `identity.rejected_profiles`. X `lwhitefire` and GitHub
  `lordwhitefire` confirmed.
- **Experience start:** July 2022 (learning), which is 4 years 3 months as of 2026-10-27.
  The README's "3 years" is recorded as a deliberate understatement; the LinkedIn index's
  "5 years 3 months" is superseded.
- **Date to update from:** 2026-10-27. Any later change should add a new dated ruling, not
  overwrite this one.
