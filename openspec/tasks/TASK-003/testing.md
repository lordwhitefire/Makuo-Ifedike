# TASK-003 Testing — Data spine

## What must be checked

The tester verifies that all four Group 3 entries are complete. This is handed to a separate agent session that did not do the building.

## How the tester knows it passed

### 1. One source of truth for four project records

- Open the project records source file. Exactly four projects appear: Interior-deco, Truespec, Athletica, CP3-legacy.
- Truespec is listed first (flagship).
- Each record has: slug, title, category, status, summary, problem, constraints, approach, outcome (words, no numbers), stack, live URL, repo URL, images, testimonial, dates, featured.
- No project card is duplicated; no fifth project exists.

### 2. Identity record

- Display name: Makuo Ifedike.
- Legal name Victor Makuo Ifedike appears in structured data only (`legalName`/`alternateName`), never as H1 or title.
- Aliases include Ifedike Victor, Ifedike Victor Makuo, lordwhitefire, makuoifedike, lwhitefire.
- Location: Onitsha and Awka, Anambra State, Nigeria.
- Education: B.Eng Chemical Engineering, Nnamdi Azikiwe University, Aug 2019–Aug 2025.
- Email: mifedike@gmail.com. No phone/WhatsApp number published.
- Profiles: GitHub, X, LinkedIn present.

### 3. Case-study modal content per project

- Each modal presents problem → constraints → approach → outcome in words (no numbers) → stack → live link.
- No numeric outcomes (no "26 migrations", no "% growth", no user counts).
- The modal's only link goes to the real live project.
- No contact form inside any modal.
- Truespec describes a dealership system (showroom + office, migration history, auth, PDF enquiries), not an "inventory app."
- Athletica describes client work built for a friend's affiliate business.
- Interior-deco notes Whitefire Interior is the project's brand, not the owner's studio.
- CP3-legacy describes a live Chris Paul fan destination, not an official affiliation.

### 4. Inquiry model and analytics event schema

- Inquiry record fields: name, email, need type, budget range, timeline, message, optional project link, source, consent, status, created date.
- Qualification status flow: new → qualified → replied → won/lost.
- Analytics events defined: `page_view`, `project_view`, `cta_click`, `inquiry_start`, `inquiry_submit`, `outbound_project_click`.

## Pass / fail

- **Pass:** all four checks above are true.
- **Fail:** any missing project record, wrong display name placement, numeric outcome in a modal, missing live-project link, contact form inside a modal, missing inquiry field, or missing analytics event.

## Notes

- Groups 1 and 2 must be complete before Group 3 — they are (all entries ticked in `openspec/tasks-registry.md`).
- Group 3 content feeds Group 4 (Core journey) — do not hardcode content in components; use the single source of truth.
