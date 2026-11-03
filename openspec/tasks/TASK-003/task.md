# TASK-003 — Data spine

## What this is

This is the implementation task for **Group 3 — Data spine** of the portfolio task registry. It covers four entries:

1. Create one source of truth for the four project records
2. Create the identity record (Makuo Ifedike display; Victor Makuo Ifedike legalName/alternateName in structured data only)
3. Write case-study modal content per project (problem, constraints, approach, outcome in words, no numbers)
4. Define the inquiry model and analytics event schema

## Why

Group 2 established the Next.js app and deploy path. Group 3 provides the content that fills it: one structured source for projects, an identity record, case-study modal text, and an inquiry model. Cards, filters, and modals all read from the same project records — no hardcoded duplicates. The identity record feeds JSON-LD and the About page. The inquiry model feeds the popup form (Group 4).

## What to change

### 1. Create one source of truth for the four project records

Build a single structured content source (e.g., `content/projects.ts` or `content/projects/*.md`) containing exactly four projects — Interior-deco, Truespec, Athletica, CP3-legacy — no fifth. Each record has: slug, title, category, status, summary, problem, constraints, approach, outcome (words, no numbers), stack, live URL, repo URL, images, testimonial, dates, featured.

Truespec is the flagship and comes first. Athletica is described as client work — built for a friend's affiliate business — not the owner's own product. Interior-deco is branded Whitefire Interior (the project's brand, not the owner's studio).

**Benchmark:** after this change, when the user inspects the project records file, they see exactly four projects with Truespec first, each with all required fields, and no duplicate card entries.

### 2. Create the identity record

Create one identity record used by JSON-LD and the About page:
- Display name: Makuo Ifedike
- Legal name: Victor Makuo Ifedike (structured data only — `legalName`/`alternateName`, never H1 or title)
- Aliases: Ifedike Victor, Ifedike Victor Makuo, lordwhitefire, makuoifedike, lwhitefire
- Location: Onitsha and Awka, Anambra State, Nigeria
- Education: B.Eng Chemical Engineering, Nnamdi Azikiwe University, Aug 2019–Aug 2025
- Email: mifedike@gmail.com (work, published); no phone/WhatsApp published
- Profiles: GitHub lordwhitefire, X lwhitefire, LinkedIn makuoifedike

**Benchmark:** after this change, when the user reads the identity record, they see Makuo Ifedike as display name with Victor Makuo Ifedike kept in structured data only, both cities listed, and the confirmed education date range.

### 3. Write case-study modal content per project

Write the modal content for each of the four projects. Structure: problem → constraints → approach → outcome in words (no numbers) → stack → live link. The modal's only link goes to the real live project. No contact form inside any modal.

- **Interior-deco:** CMS-driven marketing site for the Whitefire Interior brand. Whitefire Interior is the project's brand, not the owner's studio.
- **Truespec:** Dealership system — public showroom plus private office for a Nigerian vehicle-import business. Documented migration history, back office, auth, PDF enquiries. Not an "inventory app."
- **Athletica:** Football store and affiliate commerce platform built for a friend's affiliate business — client work, not the owner's own product.
- **CP3-legacy:** Chris Paul fan site / sports experience — news, stats, biography, gallery, shop, account. Live fan destination, not official affiliation.

**Benchmark:** after this change, when the user reads each modal's content, they see problem/constraints/approach/outcome in words with no numeric outcomes, and exactly one link to the live project.

### 4. Define the inquiry model and analytics event schema

Define the inquiry record: name, email, need type (marketing site / web app / fix), budget range, timeline, message, optional project link, source, consent, status, created date. Status flows: new → qualified → replied → won/lost.

Define analytics events: `page_view`, `project_view`, `cta_click`, `inquiry_start`, `inquiry_submit`, `outbound_project_click`. Plus engagement events: `engagement_prompt_shown`, `engagement_cta_click`, `engagement_dismissed`, `form_open`, `form_submit`, `form_close`.

**Benchmark:** after this change, when the user reads the inquiry model and event schema definitions, they see all required fields, the qualification status flow, and all listed analytics events.

## Boundaries

- No fifth project, no `/work/[slug]`, no `project-details.html`.
- No outcome numbers in case studies — outcome in words only.
- Athletica is client work (built for a friend's affiliate business).
- Interior-deco is branded Whitefire Interior, not the owner's studio.
- No client logos, testimonials, or counters unless verified.
- No CSS-hidden text anywhere.

## Dependencies on Groups 1–2

Groups 1 and 2 must be complete (they are — all entries ticked in the registry). Group 3 content feeds Group 4 (Core journey) components.
