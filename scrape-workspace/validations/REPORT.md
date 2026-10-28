# Validation report

Generated: 2026-10-27T10:52:00Z

Command: `python3 validate_profile.py`

| Result | Check | Detail |
|---|---|---|
| PASS | profile-data.json parses as JSON |  |
| PASS | top-level key present: generated_at |  |
| PASS | top-level key present: identity |  |
| PASS | top-level key present: bio_material |  |
| PASS | top-level key present: skills |  |
| PASS | top-level key present: projects |  |
| PASS | top-level key present: excluded_forks |  |
| PASS | top-level key present: education |  |
| PASS | top-level key present: experience |  |
| PASS | top-level key present: contact |  |
| PASS | top-level key present: sources |  |
| PASS | top-level key present: missing |  |
| PASS | top-level key present: conflicts |  |
| PASS | top-level key present: counts |  |
| PASS | source IDs are unique | 52 sources |
| PASS | no duplicate project records |  |
| PASS | every non-fork repo is a project or the declared empty repo | projects=15 empty=['Makuo_Ifedike'] api_own=16 |
| PASS | every fork is in excluded_forks | 20 forks |
| PASS | no fork appears as a project |  |
| PASS | public repo count matches API | 36 |
| PASS | fork count matches API | 20 |
| PASS | counted project count matches records |  |
| PASS | non-fork count matches API |  |
| PASS | all project source IDs resolve |  |
| PASS | all conflict source IDs resolve |  |
| PASS | all contact source IDs resolve |  |
| PASS | all education/experience source IDs resolve |  |
| PASS | every project has the required fields |  |
| PASS | every project status is in the allowed set |  |
| PASS | every project confidence is valid |  |
| PASS | every project has at least one source |  |
| PASS | live URLs are https or null |  |
| PASS | no phone/WhatsApp number in the deliverable |  |
| PASS | excluded contact values are redacted |  |
| PASS | display name is Makuo Ifedike (owner ruling 2026-10-27) |  |
| PASS | legal name is recorded separately |  |
| PASS | work email is set |  |
| PASS | personal email is the owner-confirmed spelling |  |
| PASS | personal email carries the confirmation date |  |
| PASS | owner rulings carry the decision date |  |
| PASS | canonical-name conflict is recorded as resolved on 2026-10-27 |  |
| PASS | exactly three owner-confirmed profiles (GitHub, X, LinkedIn) |  |
| PASS | the only live LinkedIn profile is makuoifedike |  |
| PASS | the two rejected LinkedIn slugs are recorded, not deleted |  |
| PASS | start date is July 2022 |  |
| PASS | duration is computed as 4 years 3 months as of 2026-10-27 |  |
| PASS | changed copy is still valid JSON |  |
| PASS | source IDs still resolve after the edit |  |
| PASS | changing a label/status/asset does not change the inventory |  |
| PASS | only the edited project fields changed | athletica.status, athletica.screenshots |
| PASS | the label edit is isolated to the identity record |  |
| PASS | summary re-renders from the changed data |  |
| PASS | re-rendered summary reflects the label change |  |
| PASS | re-rendered summary reflects the status change |  |

**Overall: PASS**

## Adaptation test

On a copy of the deliverable: the canonical name was changed to `Ifedike Victor`, one
screenshot path was swapped, and Athletica's status was changed from `preview` to `live`.
Result: JSON stayed valid, every source ID still resolved, the inventory count did not change,
and only the edited fields differed. The mutated copy and the re-rendered summary are in
`validations/adaptation-test/`.

This is the job's verdict check: a label, an asset and a rule can be edited without the
deliverable collapsing.
