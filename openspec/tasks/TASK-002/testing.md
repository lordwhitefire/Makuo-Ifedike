# TASK-002 Testing — System foundation

## What must be checked

The tester verifies that all seven Group 2 entries are complete. This is handed to a separate agent session that did not do the building.

## How the tester knows it passed

### 1. Git repo initialized
- Run `git status` — it works and shows the current branch.
- Working tree tracks source files; `.gitignore` excludes `node_modules/`, `.next/`, logs, and build artifacts.

### 2. Pure Next.js 16 App Router app
- `src/app/page.tsx` and `src/app/layout.tsx` exist.
- `next dev` runs and the home page loads as a Next.js page (not the static HTML).
- `package.json` lists `next` version `^16.1.1` or similar Next.js 16.

### 3. Static page retired
- `public/andle-portfolio.html` does not exist.
- No redirect or rewrite sends `/` to `/andle-portfolio.html`.
- Loading `/` renders the Next.js app.

### 4. Typecheck enforced
- `next.config.ts` shows `typescript.ignoreBuildErrors: false`.
- `next.config.ts` shows `reactStrictMode: true`.
- `next build` runs typecheck and does not silently skip type errors.

### 5. Unused dependencies removed
- Audit `package.json` — no unused packages (Prisma, next-auth, TanStack Query/Table, unused Radix, Recharts, MDX editor, etc. removed if unused).
- `next build` succeeds after removal.

### 6. Vercel project and domain
- The site is deployed on Vercel.
- Reachable at `https://makuo-ifedike.vercel.app` over HTTPS.
- Preview deploys enabled.

### 7. CI quality gates
- `.github/workflows/` contains a CI workflow file.
- Workflow runs: install → typecheck → build → link check.
- Workflow passes on the current code.

## Pass / fail

- **Pass:** all seven checks above are true.
- **Fail:** any of the following remains — `public/andle-portfolio.html` exists, `ignoreBuildErrors: true`, unused dependencies installed, no Vercel deploy, no CI workflow, or `/` doesn't render the Next.js app.

## Notes

- Group 1 (Truth pass) must be complete before Group 2 — it is (all four entries ticked in `openspec/tasks-registry.md`).
- Do not add UI sections or redesign in this group.
