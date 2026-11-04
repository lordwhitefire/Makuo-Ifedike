## Purpose

Delivers a stable, observable, trustworthy production system: a pure Next.js app on Vercel with git/CI quality gates, the correct domain, no unused dependencies, and typecheck enforced.

## Requirements

### Requirement: Pure Next.js app, one deploy
The site SHALL be a Next.js 16 App Router app in TypeScript with one deploy. No static HTML page SHALL sit behind a redirect. `public/andle-portfolio.html` and its redirect SHALL be retired.

#### Scenario: Build succeeds with no static fallback
- **WHEN** `next build` runs
- **THEN** it succeeds and no `public/andle-portfolio.html` is served as the visible product

### Requirement: Typecheck enforced
`typescript.ignoreBuildErrors` SHALL be `false`. CI SHALL run install, build, typecheck, content validation, link check, and a Playwright browser smoke test.

#### Scenario: CI runs every gate
- **WHEN** CI runs
- **THEN** every step passes and `ignoreBuildErrors` is `false`

### Requirement: Vercel hosting and domain
The site SHALL be hosted on Vercel at `makuo-ifedike.vercel.app` (owner-confirmed, live), over HTTPS, with preview deploys.

#### Scenario: Site is reachable at the confirmed domain
- **WHEN** the site is deployed
- **THEN** it is reachable at `https://makuo-ifedike.vercel.app/` over HTTPS

### Requirement: No unused dependencies
Prisma, next-auth, TanStack Query/Table, unused Radix components, Recharts, and MDX editor SHALL be removed after verifying no usage. No new unused dependencies SHALL be added.

#### Scenario: Every dependency has verified usage
- **WHEN** dependencies are audited
- **THEN** each dependency is verified in use and none are unused

### Requirement: Analytics and monitoring
Vercel Analytics plus custom events SHALL be present: `page_view`, `project_view`, `cta_click`, `inquiry_start`, `inquiry_submit`, `outbound_project_click`. Error monitoring SHALL use the Sentry free tier or Vercel logs.

#### Scenario: Custom events fire
- **WHEN** visitor actions occur
- **THEN** the listed custom events fire and errors are monitored

### Requirement: Portrait assets
The owner-supplied black-background portrait SHALL be served from `public/images/`. The page SHALL request `portrait.webp`, under 300 KB. `portrait.png` SHALL remain at the same path, under 300 KB, as the JSON-LD and Open Graph image at `https://makuo-ifedike.vercel.app/images/portrait.png`. The full-size originals SHALL live in `content-workspace/assets/`, not in `public/`. No stock portrait SHALL be used.

#### Scenario: The page and social preview both get the portrait
- **WHEN** the home page loads and the JSON-LD is parsed
- **THEN** the hero requests `portrait.webp`, the social image is `portrait.png`, and both are under 300 KB
