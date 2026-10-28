# scrape-workspace — Scraper agent

This folder is the Scraper agent's working area for the Makuo Ifedike / Ifedike Victor
public-information job. It is separate from `product-management/`, which is the Product
Management agent's record and must not be edited.

- `plans/` — `2026-10-27-public-profile.md`: what was asked, classification, method, result.
- `captures/github/` — API user/repo JSON, 15 file trees, raw READMEs/manifests/source files.
- `captures/sites/` — per-site DOM, metadata, JSON-LD, links, visible text, screenshots.
- `captures/resume/` — the public resume PDF and its text extraction. **The resume contains a
  personal phone number; it is evidence only and is redacted from every deliverable.**
- `structures/` — `github-inventory.json` (all 36 repos) and `site-verification.json` (14 captures).
- `deliverables/` — `profile-data.json` and `profile-summary.md`.
- `validations/` — `REPORT.md` (44 checks, PASS) and `adaptation-test/`.
- `build_profile.py`, `build_summary.py`, `validate_profile.py` — regenerate and check the output.
- `fetch_sites.py`, `fetch_sites_2.py` — the shared-Chrome capture scripts (CDP :9222).

Output copies live in `product-management/research/` as the handoff permits.

**Status:** complete, validated 2026-10-27. Re-run `python3 build_profile.py &&
python3 build_summary.py && python3 validate_profile.py` after editing the source facts.
