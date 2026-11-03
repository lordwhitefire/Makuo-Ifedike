# TASK-004 Testing — Core journey

## What must be checked

The tester verifies that all five Group 4 entries are complete. This is handed to a separate agent session that did not do the building.

## How the tester knows it passed

### 1. One-page home plus 404

- Load `/`. Exactly one page loads with sections in order: hero, work, about, milestones, contact strip.
- Hero keeps the rotating slideshow exactly as it is. No new promise text added unless you ask.
- Four project cards appear, Interior-deco stays first (Truespec not moved to front).
- No case-study modal opens when clicking cards — no modal is built.
- About shows "Makuo Ifedike" heading, owner portrait when supplied. Milestones kept as-is with verified numbers — no rewrite.
- Contact strip shows email and socials, no inline form, no WhatsApp number.
- 404 page exists with title "404 — Page not found — Makuo Ifedike" and noindex.
- No `/work/[slug]` route exists.
- No dead links anywhere.
- Dark Andle look preserved — no redesign.

### 2. Popup contact form

- Form opens only from chat bubble **Talk** action or exit-intent modal's CTA.
- No inline form and no form section on the page.
- Form fields: name, email, need type, budget range, timeline, message, optional project link, consent checkbox.
- Submission code is built for all four destinations (Google Sheet, email, WhatsApp, auto-reply) but switches on when keys are added. Honestly noted as not tested live until keys exist.
- Form stays open until submit or close. Submitting ends engagement prompts for the session.
- While form open: no prompt, banner, panel, toast, or confetti appears.

### 3. Work filters

- Filter buttons look unchanged (All / marketing site / web-app / in-progress).
- Applying a filter shows only matching projects.
- No project card appears more than once across tabs.
- Buttons stay exactly as they look now.

### 4. SEO metadata

- Home page has title, meta description, canonical `https://makuo-ifedike.vercel.app/`, Open Graph tags, Twitter cards with `twitter:creator: @lwhitefire`.
- 404 page has title, meta description, canonical `/404`, noindex.
- Home page does **not** have noindex.
- `/robots.txt` loads: allow all, disallow none, references sitemap and llms.txt.
- `/sitemap.xml` loads: home page only.
- `ifedikemakuo.vercel.app` does not appear in any tag; `makuo-ifedike.vercel.app` is canonical everywhere.

### 5. JSON-LD @graph and llms.txt

- JSON-LD `@graph` in `<head>` parses as 7 valid nodes: Person, WebSite, ProfilePage, Truespec, Athletica, Interior-deco, CP3-legacy.
- Person `name` = "Makuo Ifedike"; `legalName`/`alternateName` = Victor Makuo Ifedike (structured data only).
- Each project has `creator` pointing to Person.
- Each project `description` carries the project story: problem → constraints → approach → outcome in words (no numbers) → stack → live link.
- JSON-LD statuses match records: Interior-deco = "Live", Truespec = "Live — flagship", Athletica = "In progress", CP3-legacy = "In progress".
- Athletica JSON-LD states it was built for a friend's affiliate business — client work, not the owner's own product.
- `/llms.txt` loads at site root with owner bio, stack, four featured projects, full inventory.
- No CSS-hidden text, white-on-white text, off-screen blocks, or `display:none` keyword stuffing.
- Portrait at `public/images/portrait.png`; JSON-LD and Open Graph image point to `https://makuo-ifedike.vercel.app/images/portrait.png`. No stock portrait.

## Pass / fail

- **Pass:** all five checks above are true.
- **Fail:** any case-study modal added, testimonial section added, inline form added, fifth project added, `/work/[slug]` route exists, Truespec moved to front of cards, milestones rewritten or numbers removed, dead link, wrong domain in any tag, CSS-hidden text, stock portrait, missing project story in JSON-LD, wrong JSON-LD statuses, meta description claims "four live projects", or Athletica presented as owner's own product in structured data.

## Notes

- Groups 1–3 must be complete before Group 4 — they are (all entries ticked in `openspec/tasks-registry.md`).
- No content edits by builder — JSON-LD, llms.txt, and metadata implemented from `content-workspace/pieces/` as-is.
- No testimonial section at all — none added, period.
- No case-study modal — scrapped, not built.
