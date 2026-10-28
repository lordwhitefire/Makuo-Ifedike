# TASK-002 — System foundation

## What this is

This is the implementation task for **Group 2 — System foundation** of the portfolio task registry. It covers seven entries:

1. Initialize git repo
2. Scaffold pure Next.js 16 App Router app (TypeScript)
3. Retire `public/andle-portfolio.html` and its redirect
4. Set `typescript.ignoreBuildErrors` to false
5. Remove unused dependencies after verifying no usage
6. Set up Vercel project and domain `makuo-ifedike.vercel.app`
7. Add CI (install, typecheck, build, link check)

## Why

The portfolio is currently a static Andle HTML page (`public/andle-portfolio.html`) served behind a Next.js redirect. The Next.js shell exists but the visible page is still the static HTML, typecheck is disabled (`ignoreBuildErrors: true`), unused dependencies are installed, and there's no CI or production deploy target. Group 2 establishes the stable delivery path: a pure Next.js app, one deploy, typecheck enforced, no unused dependencies, CI quality gates, and a Vercel deploy target at the confirmed domain.

## What to change

### 1. Initialize git repo
Verify git is initialized (`git status` works). Group 1 commits already exist on `master`. Ensure the working tree tracks all source files and `.gitignore` excludes `node_modules/`, `.next/`, `dev.log`, `server.log`, and build artifacts.

**Benchmark:** `git status` runs and shows the current branch and tracked/untracked files.

### 2. Scaffold pure Next.js 16 App Router app (TypeScript)
Confirm `src/app/` exists with `page.tsx` and `layout.tsx` for the `/` route. The app uses Next.js 16 (`^16.1.1`), App Router, TypeScript. The visible content should be React components, not the static HTML.

**Benchmark:** `src/app/page.tsx` and `src/app/layout.tsx` exist and render the home page when `next dev` runs.

### 3. Retire `public/andle-portfolio.html` and its redirect
Delete `public/andle-portfolio.html` and remove any Next.js redirect or rewrite that sends `/` to `/andle-portfolio.html`. The visible product must be the Next.js app, not the static page.

**Benchmark:** `public/andle-portfolio.html` does not exist; loading `/` renders the Next.js page, not the static HTML.

### 4. Set `typescript.ignoreBuildErrors` to false
In `next.config.ts`, set `typescript.ignoreBuildErrors: false` and `reactStrictMode: true`.

**Benchmark:** `next.config.ts` shows `ignoreBuildErrors: false` and `reactStrictMode: true`.

### 5. Remove unused dependencies after verifying no usage
Audit `package.json` dependencies. Remove packages with no usage in the codebase — candidates include Prisma, next-auth, TanStack Query/Table, unused Radix components, Recharts, MDX editor, and similar. Verify each removal doesn't break the build.

**Benchmark:** `next build` succeeds after dependency removal; no unused packages remain in `package.json`.

### 6. Set up Vercel project and domain `makuo-ifedike.vercel.app`
Create the Vercel project, link it to the git repo, and configure the domain `makuo-ifedike.vercel.app` (owner-confirmed spelling, 2026-10-28). Enable HTTPS and preview deploys.

**Benchmark:** The site is reachable at `https://makuo-ifedike.vercel.app` over HTTPS.

### 7. Add CI (install, typecheck, build, link check)
Add a GitHub Actions workflow that runs on push/PR: install dependencies, run typecheck (`tsc --noEmit` or `next build`), run `next build`, and run a link checker on the built output.

**Benchmark:** CI workflow file exists in `.github/workflows/` and passes on the current code.

## Boundaries

- Do not add new UI sections or redesign — Group 2 is infrastructure only.
- Do not add client logos, testimonials, counters, or contact form (those belong to other groups or are excluded).
- Do not change the visual design — keep the dark Andle look.
- No `/work/[slug]` routes, no `project-details.html`, no inline form.

## Dependencies on Group 1

Group 1 must be complete (it is — all four entries ticked in the registry). Group 2 builds on the cleaned-up static page but replaces it with the Next.js app as the visible product.
