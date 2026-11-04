## Purpose

Makes the portfolio discoverable and machine-readable through JSON-LD, llms.txt, metadata, canonical URLs, sitemap, robots, and Open Graph, with no CSS-hidden text.

## ADDED Requirements

### Requirement: JSON-LD @graph in the head
The `<head>` SHALL carry JSON-LD `@graph` with Person, WebSite, ProfilePage, and the four projects (CreativeWork/SoftwareApplication). Person `name` SHALL be "Makuo Ifedike"; `legalName`/`alternateName` SHALL carry Victor Makuo Ifedike. Each project SHALL have `creator` pointing to the Person. Each project's `description` SHALL carry the project story: problem → constraints → approach → outcome in words (no numbers) → stack → live link.

#### Scenario: Head parses the full @graph with project stories
- **WHEN** the JSON-LD `@graph` is parsed
- **THEN** it contains Person (name "Makuo Ifedike", legalName "Victor Makuo Ifedike"), WebSite, ProfilePage, and four project entries each with `creator` pointing to the Person and a `description` carrying the project story in words with no numeric outcomes

### Requirement: Project statuses in JSON-LD match records
Interior-deco and Truespec JSON-LD `additionalProperty` status = "Live". Athletica and CP3-legacy status = "In progress". Truespec status = "Live — flagship".

#### Scenario: Structured data statuses match records
- **WHEN** the project JSON-LD entries are inspected
- **THEN** Interior-deco status is "Live", Truespec status is "Live — flagship", Athletica status is "In progress", CP3-legacy status is "In progress"

### Requirement: Athletica is client work in structured data
Athletica's JSON-LD SHALL describe it as built for a friend's affiliate business — client work, not the owner's own product.

#### Scenario: Athletica structured data notes client relationship
- **WHEN** the Athletica JSON-LD entry is inspected
- **THEN** it states Athletica was built for a friend who runs an affiliate business — client work, not the owner's own product

### Requirement: No CSS-hidden text
The site SHALL contain no white-on-white text, off-screen blocks, or `display:none` keyword stuffing. Heavy information SHALL live in structured data and discovery files, not hidden visible text.

#### Scenario: Page audit finds no hidden text
- **WHEN** the DOM and stylesheets are inspected
- **THEN** no hidden keyword blocks exist

### Requirement: Per-page metadata and robots
Home and 404 SHALL each have a title, meta description, and canonical URL. The 404 SHALL use `noindex`; `noindex` SHALL be removed from the home page when the site goes public.

#### Scenario: 404 page is noindex-only
- **WHEN** the 404 page loads
- **THEN** robots noindex applies to it and its canonical points to `/404`

### Requirement: Metadata truthfulness
Home page meta description SHALL state two live and two in-progress projects (not "four live projects").

#### Scenario: Meta description matches project statuses
- **WHEN** the home page meta description is read
- **THEN** it does not claim "four live projects"; it accurately reflects two live and two in-progress

### Requirement: llms.txt at site root
`/llms.txt` SHALL exist with the owner bio, stack, the four featured projects, and the full project inventory. It SHALL claim no client relationships, revenue, or user counts.

#### Scenario: llms.txt returns the inventory
- **WHEN** `/llms.txt` is fetched
- **THEN** it returns the owner bio, stack, four featured projects, and full inventory

### Requirement: Sitemap and robots
`/sitemap.xml` SHALL list the home page only (one-page site, no `/work/[slug]` routes). `/robots.txt` SHALL allow all, disallow none, and reference sitemap and llms.txt.

#### Scenario: Discovery files load
- **WHEN** `/sitemap.xml` and `/robots.txt` are fetched
- **THEN** both return valid content and robots references sitemap and llms.txt

### Requirement: Open Graph and Twitter cards
The home page SHALL carry `og:title`, `og:description`, `og:url`, `og:type`, `og:site_name`, `og:locale`, and `twitter:card`, `twitter:title`, `twitter:description`, `twitter:creator`. All canonical URLs use `https://makuo-ifedike.vercel.app/`.

#### Scenario: Home page exposes Open Graph and Twitter tags
- **WHEN** the home page loads
- **THEN** Open Graph and Twitter meta tags are present with canonical URL `https://makuo-ifedike.vercel.app/`
