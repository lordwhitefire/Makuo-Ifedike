# Draft — per-page metadata, canonical, Open Graph

Sources: product-management/research/profile-data.json; product-management/decisions.md; product-management/architect-handoff.md (§5.6 SEO).

Open items flagged:
- Domain confirmed: https://makuo-ifedike.vercel.app/ (live, owner's chosen canonical, 2026-11-02). The duplicate `ifedikemakuo.vercel.app` must 301 to it and never appear in metadata.
- Open Graph image: `https://makuo-ifedike.vercel.app/images/portrait.png` (portrait supplied; builder copies to `public/images/portrait.png`).

## Home page (`/`)

**Title:** Makuo Ifedike — I build and fix software for small businesses

**Meta description:** Makuo Ifedike is a self-taught frontend engineer in Onitsha, Nigeria, building for the web since 2022. I build marketing sites, web apps, and fix slow or half-built systems for small businesses. Four live projects: Truespec, Athletica, Interior-deco, CP3-legacy.

**Canonical:** https://makuo-ifedike.vercel.app/

**Open Graph:**
- og:title: Makuo Ifedike — I build and fix software for small businesses
- og:type: website
- og:url: https://makuo-ifedike.vercel.app/
- og:description: Self-taught frontend engineer in Onitsha, Nigeria, building for the web since 2022. I build and fix software for small businesses — marketing sites, web apps, and systems that are slow or half-built.
- og:site_name: Makuo Ifedike — Portfolio
- og:locale: en_GB
- og:image: https://makuo-ifedike.vercel.app/images/portrait.png

**Twitter:**
- twitter:card: summary_large_image
- twitter:title: Makuo Ifedike — I build and fix software for small businesses
- twitter:description: Self-taught frontend engineer in Onitsha, Nigeria, building for the web since 2022.
- twitter:creator: @lwhitefire

## 404 page

**Title:** 404 — Page not found — Makuo Ifedike

**Meta description:** The page you're looking for isn't here. Makuo Ifedike builds and fixes software for small businesses. See the work at https://makuo-ifedike.vercel.app/

**Canonical:** https://makuo-ifedike.vercel.app/404

**Robots:** noindex on 404 only.

## Site-wide

- robots.txt: allow all, disallow none; reference sitemap and llms.txt.
- sitemap.xml: home page only (one-page site; no /work/[slug] routes per decisions.md).
- Remove noindex when public.
