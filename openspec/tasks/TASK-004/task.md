# TASK-004 — Core journey

## What this is

This is the implementation task for **Group 4 — Core journey** of the portfolio task registry. It covers five entries:

1. Build one-page home (hero, work, about, milestones, contact strip) plus 404
2. Build popup contact form (opened from bubble Talk or exit-intent CTA only)
3. Make work filters real derived from data, or remove tabs
4. Add SEO metadata, canonical, Open Graph, Twitter cards, sitemap, robots
5. Implement JSON-LD @graph and llms.txt from content-workspace/pieces/ as-is

**Scrapped:** case-study modals are removed from the plan. No modal will be built. Project cards do not open modals.

## Why

Group 3 built the data spine — project records, identity record, case-study prose, inquiry model. Group 4 turns that data into what a visitor sees and does on the page. The core journey lets a stranger evaluate the work and start a conversation, with no dead ends and no fake proof. Case-study modals are not part of this journey.

## What to change

### 1. Build one-page home (hero, work, about, milestones, contact strip) plus 404

The home page is one route: `/`. Sections in order: hero, work, about, milestones/process, contact strip. A separate 404 page exists.

Use the existing `src/app/page.tsx` and `src/components/HeroCarousel.tsx` (already wired to `projects.ts` in Group 3) as the foundation. Keep the dark Andle look — no redesign, no new sections, no visual drift.

- Hero: one-line promise ("I build and fix software for small businesses") — already in your About section; keep the slideshow exactly as it is.
- Work: four project cards from `projects.ts`. Interior-deco stays first (do not move Truespec to front). Cards do not open modals — no modal is built.
- About: Makuo Ifedike heading, owner portrait when supplied, bio from identity record.
- Milestones: keep as-is — the numbers (26 migrations, five weeks, etc.) are verified and stay. Do not rewrite.
- Contact strip: email (mifedike@gmail.com), socials (GitHub, X, LinkedIn), no inline form, no WhatsApp number.
- 404 page: title "404 — Page not found — Makuo Ifedike", canonical `/404`, noindex on 404 only.

**Benchmark:** after this change, when the user loads `/`, they see one page with all sections in order, no dead links, no case-study modal, and no `/work/[slug]` route exists.

### 2. Build popup contact form (opened from bubble Talk or exit-intent CTA only)

Popup form only. No inline form and no form section on the page.

- Opens only from chat bubble **Talk** action or exit-intent modal's CTA.
- Fields: name, email, need type (marketing site / web app / fix), budget range, timeline, message, optional project link, consent checkbox linked to privacy page.
- Submit: Google Sheet row on tab `Portfolio Inquiries`, email `[PORTFOLIO] New inquiry — {name}`, WhatsApp alert `[PORTFOLIO] New inquiry`, auto-reply "Thanks — I'll reply within one business day."
- Spam protection: honeypot + rate limit. Build the code; switch each destination on when keys are added. Until then, honestly say it wasn't tested live.
- Form stays open until submit or close. Closing starts 20s cooldown. Submitting ends engagement prompts for the session.
- While form is open: no prompt, banner, panel, toast, or confetti.

**Benchmark:** after this change, the form opens only via Talk or exit-intent, has the four-destination submission code ready for keys, and no form section exists on the page.

### 3. Make work filters real derived from data, or remove tabs

Work filters derive from `projects.ts` filter field (hidden labels: "marketing-site", "web-app"). Buttons stay exactly as they look now (All / marketing site / web-app / in-progress). No project card duplicated across tabs. If filters cannot be made real, remove the tabs.

**Benchmark:** after this change, applying a filter shows only matching projects, no card appears more than once, and the buttons look unchanged.

### 4. Add SEO metadata, canonical, Open Graph, Twitter cards, sitemap, robots

Implement from `content-workspace/pieces/metadata.md` as-is — no content edits by the builder.

- Home: title "Makuo Ifedike — I build and fix software for small businesses", meta description, canonical `https://makuo-ifedike.vercel.app/`, Open Graph tags, Twitter cards, `twitter:creator: @lwhitefire`.
- 404: title "404 — Page not found — Makuo Ifedike", noindex on 404 only.
- `/robots.txt`: allow all, disallow none, references sitemap and llms.txt.
- `/sitemap.xml`: home page only (one-page site, no `/work/[slug]` routes).
- `noindex` removed from home page when public.
- Domain `makuo-ifedike.vercel.app` canonical everywhere; `ifedikemakuo.vercel.app` must not appear in any tag.

**Benchmark:** after this change, home and 404 have correct metadata, robots and sitemap load, canonical uses makuo-ifedike.vercel.app, noindex only on 404.

### 5. Implement JSON-LD @graph and llms.txt from content-workspace/pieces/ as-is

Implement from `content-workspace/pieces/person-jsonld.md` and `content-workspace/pieces/llms-txt.md` as-is — no content edits by the builder.

- `<head>` carries JSON-LD `@graph` with Person, WebSite, ProfilePage, and 4 projects (CreativeWork/SoftwareApplication). Person `name` = "Makuo Ifedike", `legalName`/`alternateName` = Victor Makuo Ifedike. Each project has `creator` pointing to Person.
- `/llms.txt` at site root with owner bio, stack, four featured projects, full inventory.
- No CSS-hidden text, white-on-white text, off-screen blocks, or `display:none` keyword stuffing.
- JSON-LD validates (7 nodes: Person, WebSite, ProfilePage, Truespec, Athletica, Interior-deco, CP3-legacy).
- Owner-supplied black-background portrait copied to `public/images/portrait.png`; JSON-LD and Open Graph image point to `https://makuo-ifedike.vercel.app/images/portrait.png`. No stock portrait.

**Benchmark:** after this change, JSON-LD parses as 7 valid nodes, llms.txt loads at root, no hidden text exists.

## Boundaries

- **No case-study modal at all — scrapped.** None built, none planned.
- No testimonial section at all — none added, no fake quotes.
- No fifth project, no `/work/[slug]`, no `project-details.html`.
- No inline form, no contact form section.
- No client logos, no testimonials, no stock portrait, no counters unless verified.
- No CSS-hidden text, white-on-white text, off-screen blocks, or `display:none` keyword stuffing.
- No design redesign — keep dark Andle look. Interior-deco stays first.
- No blog, AI chatbot, client portal, CMS for four projects.
- Domain: `makuo-ifedike.vercel.app` canonical; `ifedikemakuo.vercel.app` not in any tag.

## Dependencies on Groups 1–3

Groups 1, 2, and 3 must be complete (they are — all entries ticked in the registry). Group 4 reads project records from `projects.ts`, identity from `identity.ts`, and inquiry model from `inquiries.ts`.
