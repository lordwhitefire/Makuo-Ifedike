# noindex Decision — TASK-001 Truth Pass

**Date:** 2026-10-28  
**Decision:** Remove `<meta name="robots" content="noindex, follow" />` — site is intended to be public and indexable.

**Rationale:** The current static Andle page carried `noindex, follow`, which is a leftover from a staging/template state. The owner confirmed during grilling (Q4, answered "yes") that noindex should be removed so the portfolio is public and indexable when it goes live.

**Action taken:** Deleted the `noindex` meta tag from `public/andle-portfolio.html` `<head>`.

**Verification:** grep for `noindex` in `public/andle-portfolio.html` returns zero matches.

**Not done here:** Sitemap/robots.txt generation and final `noindex` removal at deploy are part of Group 4 (SEO/core journey). This task records the intent decision only; the tag itself is removed from the static page.