## Purpose

Delivers a stable, observable, trustworthy production system: a pure Next.js app on Vercel with git/CI quality gates, the correct domain, no unused dependencies, and typecheck enforced.

## ADDED Requirements

### Requirement: Pure Next.js app, one deploy
The site SHALL be a Next.js 16 App Router app in TypeScript with one deploy. No static HTML page SHALL sit behind a redirect. `public/andle-portfolio.html` and its redirect SHALL be retired.

#### Scenario: Build succeeds with no static fallback
- **WHEN** `next build` runs
- **THEN** it succeeds and no `public/andle-portfolio.html` is served as the visible product

### Requirement: Typecheck enforced
`typescript.ignoreBuildErrors` SHALL be `false`. CI SHALL run install, typecheck, build, and link check.

#### Scenario: CI runs typecheck and link check
- **WHEN** CI runs
- **THEN** typecheck and link check pass and `ignoreBuildErrors` is `false`

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

### Requirement: Build-time portrait asset
The owner-supplied black-background portrait SHALL be copied to `public/images/portrait.png` at build time. JSON-LD and Open Graph image SHALL point to `https://makuo-ifedike.vercel.app/images/portrait.png`. No stock portrait SHALL be used.

#### Scenario: Portrait is supplied at build time
- **WHEN** the owner supplies the portrait
- **THEN** it is copied to `public/images/portrait.png` and referenced by JSON-LD and Open Graph
