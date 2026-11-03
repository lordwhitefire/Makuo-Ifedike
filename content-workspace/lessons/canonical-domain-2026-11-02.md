# Lesson — the canonical domain (2026-11-02)

Two hostnames serve the same site:

| Hostname | Status |
|---|---|
| `makuo-ifedike.vercel.app` | **Canonical.** The owner's domain. |
| `ifedikemakuo.vercel.app` | Stray deployment domain the developer created. Not canonical. |

The owner chose `makuo-ifedike.vercel.app`. Every canonical URL, `@id`, `url`, `og:url`, sitemap
entry, `robots.txt` sitemap line and `llms.txt` home link uses it. `ifedikemakuo.vercel.app` must
301 to it, and must not appear in any tag.

## Why this got switched once already

The owner stated the live URL as `ifedikemakuo.vercel.app` and the content was changed to match,
without asking whether the hyphenated domain was the intended one. Both returned HTTP 200 with the
same title, so liveness alone did not settle it — the deployment URL and the chosen domain look
identical from the outside.

**Rule:** when two hostnames serve the same site, never infer the canonical from which one was
mentioned last or which one responds. The canonical is the owner's stated choice. Confirm it, and
record it here before mass-replacing URLs.
