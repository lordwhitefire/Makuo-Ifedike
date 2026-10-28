# Draft — Person JSON-LD (portfolio `<head>`, @graph)

Sources: product-management/research/profile-data.json; product-management/decisions.md (identity addendum, 2026-10-27); product-management/architect-handoff.md (§5.10).

Open items flagged:
- Domain spelling pending owner confirmation: makuo-ifedike.vercel.app vs makuoifedike.vercel.app (underscores invalid in hostnames). Draft uses makuo-ifedike.vercel.app.
- Portrait supplied: `/home/lordwhitefire/Downloads/Professional Portrait on Black.png` (PNG, 1122×1402). Builder copies to `public/images/portrait.png`; JSON-LD `image` points to `https://makuo-ifedike.vercel.app/images/portrait.png`.
- Graduation year: owner ruling says 2025; research marked C-04 open. alumniOf carries the university only, no year, to avoid overclaiming.
- Work email published in JSON-LD only because the owner confirmed it as public.

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://makuo-ifedike.vercel.app/#person",
      "name": "Makuo Ifedike",
      "legalName": "Victor Makuo Ifedike",
      "alternateName": [
        "Victor Makuo Ifedike",
        "Ifedike Victor",
        "Ifedike Victor Makuo",
        "lordwhitefire",
        "makuoifedike",
        "lwhitefire"
      ],
      "url": "https://makuo-ifedike.vercel.app/",
      "image": "https://makuo-ifedike.vercel.app/images/portrait.png",
      "jobTitle": "Frontend Engineer — Freelance",
      "description": "Self-taught developer in Onitsha, Anambra State, Nigeria, building for the web since July 2022 with Next.js, Remix, TypeScript, Sanity and Postgres.",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Onitsha and Awka",
        "addressRegion": "Anambra State",
        "addressCountry": "Nigeria"
      },
      "knowsAbout": [
        "Next.js", "React", "Remix", "TypeScript", "Tailwind CSS",
        "Sanity", "Supabase", "Neon Postgres", "Prisma", "Clerk",
        "next-auth", "Vercel", "Astro", "Python", "FastAPI", "LangGraph",
        "HTML", "CSS", "JavaScript"
      ],
      "sameAs": [
        "https://github.com/lordwhitefire",
        "https://x.com/lwhitefire",
        "https://www.linkedin.com/in/makuoifedike/"
      ],
      "email": "mifedike@gmail.com",
      "alumniOf": {
        "@type": "CollegeOrUniversity",
        "name": "Nnamdi Azikiwe University"
      }
    },
    {
      "@type": "WebSite",
      "@id": "https://makuo-ifedike.vercel.app/#website",
      "url": "https://makuo-ifedike.vercel.app/",
      "name": "Makuo Ifedike — Portfolio",
      "alternateName": "Makuo Ifedike Portfolio",
      "publisher": { "@id": "https://makuo-ifedike.vercel.app/#person" },
      "about": { "@id": "https://makuo-ifedike.vercel.app/#person" },
      "inLanguage": "en"
    },
    {
      "@type": "ProfilePage",
      "@id": "https://makuo-ifedike.vercel.app/#profilepage",
      "url": "https://makuo-ifedike.vercel.app/",
      "name": "Makuo Ifedike — Portfolio",
      "mainEntity": { "@id": "https://makuo-ifedike.vercel.app/#person" },
      "about": { "@id": "https://makuo-ifedike.vercel.app/#person" },
      "inLanguage": "en"
    },
    {
      "@type": "SoftwareApplication",
      "@id": "https://makuo-ifedike.vercel.app/#project-truespec",
      "name": "Truespec",
      "applicationCategory": "Dealership system",
      "applicationSubCategory": "Vehicle-import business system",
      "description": "Public showroom plus a single-owner private office for inventory, enquiries, costs and profit, for a Nigerian vehicle-import business. Documented migration history, back office, auth and PDF enquiries.",
      "url": "https://truespec-k4y6.vercel.app/",
      "codeRepository": "https://github.com/lordwhitefire/truespec",
      "creator": { "@id": "https://makuo-ifedike.vercel.app/#person" },
      "author": { "@id": "https://makuo-ifedike.vercel.app/#person" },
      "publisher": { "@id": "https://makuo-ifedike.vercel.app/#person" },
      "operatingSystem": "Web",
      "isAccessibleForFree": true,
      "dateCreated": "2026-10-16",
      "audience": "Small-business owners and vehicle importers",
      "featureList": [
        "Public showroom: home, inventory, car detail, privacy",
        "Private office: dashboard, inventory CRUD, drafts, enquiries, settings",
        "Server-side allow-list serializer enforcing public/private boundary",
        "26 documented database migrations",
        "PDF enquiry import",
        "WhatsApp tap tracking",
        "One-owner auth"
      ],
      "additionalProperty": {
        "@type": "PropertyValue",
        "name": "Status",
        "value": "Live — flagship"
      }
    },
    {
      "@type": "SoftwareApplication",
      "@id": "https://makuo-ifedike.vercel.app/#project-athletica",
      "name": "Athletica",
      "applicationCategory": "E-commerce",
      "applicationSubCategory": "Football store with affiliate commerce",
      "description": "Football store and affiliate commerce platform: public storefront with catalogue, cart, checkout, accounts and orders; private admin for products, media, orders and affiliate settings.",
      "url": "https://athletica-blond.vercel.app/",
      "codeRepository": "https://github.com/lordwhitefire/athletica",
      "creator": { "@id": "https://makuo-ifedike.vercel.app/#person" },
      "author": { "@id": "https://makuo-ifedike.vercel.app/#person" },
      "operatingSystem": "Web",
      "isAccessibleForFree": true,
      "dateCreated": "2026-03-31",
      "audience": "Football customers and affiliate partners",
      "featureList": [
        "Storefront catalogue with brands, categories and models",
        "Search, cart, checkout, order history",
        "Customer accounts, login, password recovery",
        "Admin: products, brands, models, categories, media, homepage, navigation",
        "Bulk catalogue import",
        "Traffic, product and affiliate analytics",
        "Amazon affiliate settings and generated URLs"
      ],
      "additionalProperty": {
        "@type": "PropertyValue",
        "name": "Status",
        "value": "Live preview"
      }
    },
    {
      "@type": "CreativeWork",
      "@id": "https://makuo-ifedike.vercel.app/#project-interior-deco",
      "name": "Interior-deco (Whitefire Interior)",
      "creator": { "@id": "https://makuo-ifedike.vercel.app/#person" },
      "author": { "@id": "https://makuo-ifedike.vercel.app/#person" },
      "url": "https://interior-deco-kappa.vercel.app/",
      "codeRepository": "https://github.com/lordwhitefire/interior-deco",
      "description": "CMS-driven marketing website for the Whitefire Interior brand: services, projects, blog, team, testimonials, FAQ, contact, newsletter.",
      "inLanguage": "en",
      "isAccessibleForFree": true,
      "dateCreated": "2024-01-03",
      "additionalProperty": {
        "@type": "PropertyValue",
        "name": "Status",
        "value": "Live"
      },
      "note": "Whitefire Interior is the project's brand, not the owner's studio and not a confirmed client engagement."
    },
    {
      "@type": "CreativeWork",
      "@id": "https://makuo-ifedike.vercel.app/#project-cp3-legacy",
      "name": "CP3-legacy",
      "applicationCategory": "Fan site / sports experience",
      "creator": { "@id": "https://makuo-ifedike.vercel.app/#person" },
      "author": { "@id": "https://makuo-ifedike.vercel.app/#person" },
      "url": "https://cp3-legacy.vercel.app/",
      "codeRepository": "https://github.com/lordwhitefire/cp3-legacy",
      "description": "Chris Paul fan site / sports experience: news, player overview, full statistics, biography, gallery, shop, account and wishlist.",
      "inLanguage": "en",
      "isAccessibleForFree": true,
      "dateCreated": "2025-12-03",
      "additionalProperty": {
        "@type": "PropertyValue",
        "name": "Status",
        "value": "Live"
      },
      "note": "Live Chris Paul fan destination. Not an official affiliation with Chris Paul or any athlete."
    }
  ]
}
```

Notes:
- No `image` — the owner's portrait is a build-time asset, not yet supplied; no stock portrait used.
- No phone/WhatsApp anywhere.
- No client names, testimonials, or outcome numbers.
- `Ifedike Victor` survives only in `alternateName` and never as `name`.
- `sameAs` carries GitHub, X and LinkedIn `makuoifedike` only; rejected LinkedIn slugs excluded.
