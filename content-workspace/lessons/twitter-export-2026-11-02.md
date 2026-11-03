# Lesson — X/Twitter data export (2026-11-02)

Source: `twitter-2026-10-28-30ec57bd...` (owner's own X archive, extracted in project root).

## Verified public facts (safe to publish)

| Field | Value |
|---|---|
| Username | `lwhitefire` |
| Display name | Makuo Ifedike |
| Bio | "Web Developer \| BOS Brigade" |
| Location | Nigeria |
| Account created | 2024-07-19 |
| Profile URL | https://x.com/lwhitefire |
| Website field | t.co link → resolves to the old FireSage Studio template site (`new-portfolio`) |

## Experience found in expanded profile — EXCLUDED

- **Jaya Talent** — Creative Marketing Manager — UAE — 2024-10 to 2024-12 (`activeRole: false`).

**Owner ruling, 2026-11-02: do not publish.** Removed from every piece and draft. The owner's
judgement is that it would harm SEO, and it is not needed for the identity the site is building.
It stays out of the published content; it is recorded here only so it is not re-added by mistake.

## Private — do NOT publish

- Account email `ifedikevmakuo2002@gmail.com` (account data, not a public contact).
- Account ID, creation IP, device/telemetry data from the archive.

## Consequence for the pieces

1. `person-jsonld.md` — Person `description` now leads with the X bio; the X profile is recorded as
   an `additionalProperty` `PropertyValue`. Employment history is deliberately absent.
2. `llms-txt.md` — About me gains "X bio" and "Experience" lines; Profiles section notes the X
   website field still points at the old template site, so the canonical site is
   https://makuo-ifedike.vercel.app/.
3. The X website field is **not** added to `sameAs` — `sameAs` is identities, not outbound links.

## Repair note

While editing, a duplicated/unclosed `additionalProperty` block broke the JSON-LD in both the
draft and the piece (plus a missing `{` before the Interior-deco node in the draft). Both files
were re-parsed with `json.loads` and now validate at 7 nodes:
Person, WebSite, ProfilePage, Truespec, Athletica, Interior-deco, CP3-legacy.

**Rule going forward:** after any edit to `person-jsonld.md`, re-run the JSON parse check before
calling it done.
