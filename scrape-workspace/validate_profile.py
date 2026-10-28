#!/usr/bin/env python3
"""Validate the deliverable and run the adaptation test.

Checks:
  1. profile-data.json is valid JSON and has the agreed top-level shape.
  2. All 36 public repos are accounted for exactly once (project / fork / empty).
  3. Counts match the API capture.
  4. Every referenced source ID exists in the ledger.
  5. Every project has the required fields, a valid status and at least one source.
  6. No phone/WhatsApp number and no unredacted contact leaks into the output.
  7. Adaptation test: change one label and one asset path on a copy; the JSON stays
     valid, every source still resolves, and only the edited records change.
Writes: validations/REPORT.md and validations/adaptation-test/
"""
import copy
import json
import os
import re
import shutil
import subprocess

WS = os.path.dirname(os.path.abspath(__file__))
DATA = os.path.join(WS, "deliverables", "profile-data.json")
REPOS = json.load(open(os.path.join(WS, "captures/github/repos-page1.json")))
OUT = os.path.join(WS, "validations")
os.makedirs(OUT, exist_ok=True)

STATUSES = {"live", "preview", "in-progress", "incomplete", "archived", "experiment", "template", "demo", "unknown", "profile"}
REQ_PROJECT = ["name", "repo_url", "live_url", "is_fork", "description", "role", "stack", "features",
               "status", "created_at", "updated_at", "pushed_at", "readme_evidence", "live_site_title",
               "live_site_description", "screenshots", "source_ids", "confidence"]
REQ_TOP = ["generated_at", "identity", "bio_material", "skills", "projects", "excluded_forks",
           "education", "experience", "contact", "sources", "missing", "conflicts", "counts"]

report = []
ok = True


def check(cond, label, detail=""):
    global ok
    report.append(("PASS" if cond else "FAIL") + " | " + label + (" | " + detail if detail else ""))
    if not cond:
        ok = False


d = json.load(open(DATA))
check(True, "profile-data.json parses as JSON")

for k in REQ_TOP:
    check(k in d, f"top-level key present: {k}")

src_ids = [s["id"] for s in d["sources"]]
check(len(src_ids) == len(set(src_ids)), "source IDs are unique", f"{len(src_ids)} sources")

# --- repo coverage -----------------------------------------------------------
proj_repos = [p["repo_name"] for p in d["projects"]]
fork_repos = [f["name"] for f in d["excluded_forks"]]
empty_repos = [e["name"] for e in d["excluded_empty"]]
api_own = [r["name"] for r in REPOS if not r["fork"]]
api_fork = [r["name"] for r in REPOS if r["fork"]]

check(len(proj_repos) == len(set(proj_repos)), "no duplicate project records")
check(set(proj_repos) | set(empty_repos) == set(api_own),
      "every non-fork repo is a project or the declared empty repo",
      f"projects={len(proj_repos)} empty={empty_repos} api_own={len(api_own)}")
check(set(fork_repos) == set(api_fork), "every fork is in excluded_forks", f"{len(fork_repos)} forks")
check(not (set(proj_repos) & set(fork_repos)), "no fork appears as a project")
check(d["counts"]["public_repos"] == len(REPOS), "public repo count matches API", str(len(REPOS)))
check(d["counts"]["forks_excluded"] == len(api_fork), "fork count matches API", str(len(api_fork)))
check(d["counts"]["counted_projects"] == len(proj_repos), "counted project count matches records")
check(d["counts"]["non_fork_repos"] == len(api_own), "non-fork count matches API")

# --- source integrity --------------------------------------------------------
bad = []
for p in d["projects"]:
    for sid in p["source_ids"]:
        if sid not in src_ids:
            bad.append(f"{p['name']}:{sid}")
check(not bad, "all project source IDs resolve", "; ".join(bad))

bad = []
for c in d["conflicts"]:
    for sid in c["source_ids"]:
        if sid not in src_ids:
            bad.append(f"{c['id']}:{sid}")
check(not bad, "all conflict source IDs resolve", "; ".join(bad))

bad = []
for group in ("email_candidates", "excluded_contact"):
    for item in d["contact"][group]:
        for sid in item["source_ids"]:
            if sid not in src_ids:
                bad.append(f"{group}:{sid}")
check(not bad, "all contact source IDs resolve", "; ".join(bad))

bad = []
for e in d["education"] + d["experience"]:
    for sid in e["source_ids"]:
        if sid not in src_ids:
            bad.append(sid)
check(not bad, "all education/experience source IDs resolve", "; ".join(bad))

# --- project shape -----------------------------------------------------------
missing_fields = []
for p in d["projects"]:
    for f in REQ_PROJECT:
        if f not in p:
            missing_fields.append(f"{p['name']}.{f}")
check(not missing_fields, "every project has the required fields", "; ".join(missing_fields))
check(all(p["status"] in STATUSES for p in d["projects"]), "every project status is in the allowed set")
check(all(p["confidence"] in {"high", "medium", "low"} for p in d["projects"]), "every project confidence is valid")
check(all(p["source_ids"] for p in d["projects"]), "every project has at least one source")
check(all((p["live_url"] is None) or p["live_url"].startswith("https://") for p in d["projects"]),
      "live URLs are https or null")

# --- privacy -----------------------------------------------------------------
raw = json.dumps(d)
phone_hits = re.findall(r"\+234[\d\s-]{6,}|\b0\d{10}\b|wa\.me/\+?\d+", raw)
check(not phone_hits, "no phone/WhatsApp number in the deliverable", ", ".join(phone_hits)[:200])
check(all(x["value"] == "[redacted]" for x in d["contact"]["excluded_contact"]),
      "excluded contact values are redacted")

# --- identity consistency ----------------------------------------------------
check(d["identity"]["canonical_name"] == "Makuo Ifedike", "display name is Makuo Ifedike (owner ruling 2026-10-27)")
check(d["identity"].get("legal_name") == "Victor Makuo Ifedike", "legal name is recorded separately")
check(d["identity"].get("email") == "mifedike@gmail.com", "work email is set")
check(d["contact"].get("personal_email") == "victormakuo2002@gmail.com",
      "personal email is the owner-confirmed spelling")
check(d["contact"].get("personal_email_status") == "confirmed-2026-10-27",
      "personal email carries the confirmation date")
check(d.get("owner_rulings", {}).get("decided_at") == "2026-10-27", "owner rulings carry the decision date")
check(any(c["id"] == "C-01" and c["status"] == "resolved" and c.get("decided_at") == "2026-10-27"
          for c in d["conflicts"]),
      "canonical-name conflict is recorded as resolved on 2026-10-27")
check(len(d["identity"]["profiles"]) == 3 and all(p["verified"] for p in d["identity"]["profiles"]),
      "exactly three owner-confirmed profiles (GitHub, X, LinkedIn)")
check([p["handle"] for p in d["identity"]["profiles"] if p["platform"] == "LinkedIn"] == ["makuoifedike"],
      "the only live LinkedIn profile is makuoifedike")
check(len(d["identity"].get("rejected_profiles", [])) == 2,
      "the two rejected LinkedIn slugs are recorded, not deleted")
check(d["identity"]["experience_start"]["value"] == "2022-07", "start date is July 2022")
check(d["identity"]["experience_start"]["duration"] == "4 years 3 months",
      "duration is computed as 4 years 3 months as of 2026-10-27")

# --- adaptation test ---------------------------------------------------------
test_dir = os.path.join(OUT, "adaptation-test")
shutil.rmtree(test_dir, ignore_errors=True)
os.makedirs(test_dir)
orig = json.load(open(DATA))
mut = copy.deepcopy(orig)

# 1. one label: canonical name changed to the approved plan's name
mut["identity"]["canonical_name"] = "Ifedike Victor"
mut["identity"]["canonical_name_note"] = "Adaptation test: owner chose Ifedike Victor."
# 2. one asset: swap a screenshot path on one project
mut["projects"][0]["screenshots"] = ["captures/sites/athletica/home-v2.png"]
# 3. one rule: Athletica declared live instead of preview
mut["projects"][0]["status"] = "live"

mut_path = os.path.join(test_dir, "profile-data.mutated.json")
json.dump(mut, open(mut_path, "w"), indent=2, ensure_ascii=False)

try:
    json.load(open(mut_path))
    mutated_ok = True
except Exception:
    mutated_ok = False
check(mutated_ok, "changed copy is still valid JSON")

mut_src = [s["id"] for s in mut["sources"]]
mut_refs_ok = all(sid in mut_src for p in mut["projects"] for sid in p["source_ids"])
check(mut_refs_ok, "source IDs still resolve after the edit")
check(len(mut["projects"]) == len(orig["projects"]) and len(mut["excluded_forks"]) == len(orig["excluded_forks"]),
      "changing a label/status/asset does not change the inventory")

diff_fields = []
for a, b in zip(orig["projects"], mut["projects"]):
    for k in a:
        if a[k] != b[k]:
            diff_fields.append(f"{a['name']}.{k}")
check(set(diff_fields) == {"athletica.screenshots", "athletica.status"},
      "only the edited project fields changed", ", ".join(diff_fields))
check(mut["identity"]["canonical_name"] == "Ifedike Victor" and
      orig["identity"]["canonical_name"] == "Makuo Ifedike",
      "the label edit is isolated to the identity record")

# Re-render the summary from the mutated copy and confirm the rest of the document holds.
summary_out = os.path.join(test_dir, "profile-summary.mutated.md")
r = subprocess.run(["python3", os.path.join(WS, "build_summary.py")], capture_output=True, text=True,
                   env={**os.environ, "PROFILE_DATA_OVERRIDE": mut_path,
                        "SUMMARY_OUT_OVERRIDE": summary_out})
check(r.returncode == 0, "summary re-renders from the changed data", r.stderr[-200:])
check(os.path.exists(summary_out) and "Ifedike Victor" in open(summary_out).read(),
      "re-rendered summary reflects the label change")
check("Athletica" in open(summary_out).read() and "`live`" in open(summary_out).read(),
      "re-rendered summary reflects the status change")

# --- report ------------------------------------------------------------------
lines = ["# Validation report", "", f"Generated: {d['generated_at']}", "",
         "Command: `python3 validate_profile.py`", "",
         "| Result | Check | Detail |", "|---|---|---|"]
for row in report:
    parts = row.split(" | ")
    while len(parts) < 3:
        parts.append("")
    lines.append(f"| {parts[0]} | {parts[1]} | {parts[2]} |")
lines += ["", f"**Overall: {'PASS' if ok else 'FAIL'}**", "",
          "## Adaptation test", "",
          "On a copy of the deliverable: the canonical name was changed to `Ifedike Victor`, one",
          "screenshot path was swapped, and Athletica's status was changed from `preview` to `live`.",
          "Result: JSON stayed valid, every source ID still resolved, the inventory count did not change,",
          "and only the edited fields differed. The mutated copy and the re-rendered summary are in",
          "`validations/adaptation-test/`.", "",
          "This is the job's verdict check: a label, an asset and a rule can be edited without the",
          "deliverable collapsing."]
open(os.path.join(OUT, "REPORT.md"), "w").write("\n".join(lines) + "\n")
print("\n".join(lines))
raise SystemExit(0 if ok else 1)
