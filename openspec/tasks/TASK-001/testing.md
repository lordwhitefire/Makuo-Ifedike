# TASK-001 Testing — Truth pass

## What must be checked

The tester verifies that the four Truth pass entries are complete. This is handed to a separate agent session that did not do the building.

## How the tester knows it passed

### 1. No placeholder content or dead ends

- Load the home page. There is no placeholder/lorem/template copy anywhere visible.
- The stock "client" strip (eight office photos linking to `#`) is gone.
- No stock portrait is used.
- Every link on the page resolves — no `index.html`, `projects.html`, `project-details.html`, `blog.html`, `blog-details.html`, `contact.html`, social `#`, or WhatsApp placeholder links.
- The footer no longer says "Built on the Andle template".

### 2. My Stack grid replaces the client strip

- Where the client strip was, there is now a static 6×2 grid on desktop (4 columns tablet, 2 mobile).
- Exactly 12 marks appear: Next.js, React, Remix, TypeScript, Tailwind CSS, Sanity, Supabase, Neon Postgres, Prisma, Clerk, Vercel, Vitest.
- Each mark is 28 px monochrome with a visible label.
- No marquee, no moving logos, no client logos.

### 3. Identity is unified to Makuo Ifedike

- H1, `<title>`, footer, wordmark/logo, and social surfaces all read "Makuo Ifedike".
- None of them read "Ifedike Victor", "Ifedike Victor Makuo", or "Whitefire" as the portfolio identity.
- Interior-deco is described as branded Whitefire Interior (the project's brand), not as the owner's studio or a confirmed client engagement.

### 4. `noindex` intent is recorded

- There is a written note (in the task report or registry) saying whether `noindex` is intentional for staging or a leftover to remove before public launch.

## Pass / fail

- **Pass:** all four checks above are true.
- **Fail:** any placeholder copy, stock asset, dead link, template credit, wrong display name, client logo, or missing `noindex` decision remains.
