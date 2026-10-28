#!/usr/bin/env python3
"""Build profile-data.json from captured GitHub/live-site evidence.

Inputs (all in this workspace):
  captures/github/repos-page1.json   GitHub repo metadata (API)
  captures/github/trees/*.json       repo file trees (API)
  captures/github/files/*            READMEs, manifests, source files (raw)
  captures/sites/*/meta.json         live-site DOM/meta captures (Chrome)
  captures/resume/ifedike.txt        public resume text

Output: deliverables/profile-data.json
"""
import json
import os
from datetime import datetime, timezone

WS = os.path.dirname(os.path.abspath(__file__))
REPOS = json.load(open(os.path.join(WS, "captures/github/repos-page1.json")))
BY = {r["name"]: r for r in REPOS}
OWN = [r for r in REPOS if not r["fork"]]
FORKS = [r for r in REPOS if r["fork"]]

NOW = datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")

# ---------------------------------------------------------------- sources ----
S = [
    ("src-001", "https://api.github.com/users/lordwhitefire", "github", "200",
     "Profile: login, name 'Makuo Ifedike ', twitter_username 'lwhitefire', 36 public repos, created 2022-08-30. No bio/company/blog/location/email set."),
    ("src-002", "https://api.github.com/users/lordwhitefire/repos?per_page=100&page=1", "github", "200",
     "All 36 public repositories with fork/archived/visibility flags, language, dates, homepage, topics, size."),
    ("src-003", "https://github.com/lordwhitefire/athletica", "github", "200",
     "README, frontend/package.json, rollout/package.json, file tree (609 files). Describes storefront + private admin + affiliate storefront."),
    ("src-004", "https://github.com/lordwhitefire/truespec", "github", "200",
     "No root README. package.json, file tree (1,250 files), 26 migrations, OpenSpec proposal/design for the showroom + office architecture."),
    ("src-005", "https://github.com/lordwhitefire/youtube-analytics", "github", "200",
     "README, package.json, tree (46 files). Google OAuth token fetcher; no database, no token storage."),
    ("src-006", "https://github.com/lordwhitefire/odin-landing-page", "github", "200",
     "README ('my first css project'), package.json, index.html, style.css."),
    ("src-007", "https://github.com/lordwhitefire/freecodecamp_project_4", "github", "200",
     "package.json description 'Rava product landing page - hand-written HTML and CSS', index.html."),
    ("src-008", "https://github.com/lordwhitefire/agentic-video-system", "github", "200",
     "README, SETUP.md, langgraph-runtime README + requirements, tree (184 files). 17-agent video editing system."),
    ("src-009", "https://github.com/lordwhitefire/interior-deco", "github", "200",
     "README, package.json, Remix route tree (39 route/component files). Whitefire Interior site."),
    ("src-010", "https://github.com/lordwhitefire/cp3-legacy", "github", "200",
     "README (calls itself a portfolio - stale), package.json, tree (344 files), src/app/page.tsx JSON-LD and sr-only builder text."),
    ("src-011", "https://github.com/lordwhitefire/new-portfolio", "github", "200",
     "Static HTML pages (index/about/projects/pricing/contact), andle template assets. projects.html still carries the Andle template title."),
    ("src-012", "https://github.com/lordwhitefire/online-store", "github", "200",
     "package.json, prisma/schema.prisma (Order, OrderItem, Customer), src/app layout metadata 'Music Place'. No README. 2,022 files."),
    ("src-013", "https://github.com/lordwhitefire/Admin-demo", "github", "200",
     "README (Create React App boilerplate), package.json, src/App.js identical to eliphany-admin."),
    ("src-014", "https://github.com/lordwhitefire/eliphany-admin", "github", "200",
     "README (Create React App boilerplate), package.json, tree (39 files): dashboard, products, about/home settings, WhatsApp buttons panel."),
    ("src-015", "https://github.com/lordwhitefire/eliphany-ng", "github", "200",
     "README (Astro starter), package.json, Astro route tree, products.json pointing at lordwhitefire.github.io assets."),
    ("src-016", "https://github.com/lordwhitefire/interior-deco-cms", "github", "200",
     "README (Sanity Clean Content Studio), sanity.config.ts, schemaTypes/ (aboutPage, blogArticle, projectPage, servicePage, staff, testimonial, contactSubmission, newsletterSubscriber, siteConfig, etc.)."),
    ("src-017", "https://github.com/lordwhitefire/lordwhitefire", "github", "200",
     "Profile README: 'self-taught full-stack developer with 3 years of experience', open to small paid projects, email victormakuo2002@gmail.com, tools panel."),
    ("src-018", "https://interior-deco-kappa.vercel.app/", "live-site", "200",
     "Title/description, meta author 'Makuo Ifedike', 13 public routes, Organization + LocalBusiness JSON-LD with founder email mifedike@gmail.com and LinkedIn makuo-ifedike-216607350."),
    ("src-019", "https://truespec-k4y6.vercel.app/", "live-site", "200",
     "Public showroom rendered: 19 cars, naira prices, WhatsApp business contact, privacy route. No canonical, no JSON-LD, no creator link."),
    ("src-020", "https://athletica-blond.vercel.app/", "live-site", "200",
     "Storefront, cart, login/register, football categories. No JSON-LD, no creator link. Amazon quick-add links observed malformed."),
    ("src-021", "https://cp3-legacy.vercel.app/", "live-site", "200",
     "Chris Paul fan site. Person/Organization/WebSite JSON-LD (Ifedike Victor Makuo), sr-only builder paragraph, two different owner emails in page."),
    ("src-022", "https://new-portfolio-eta-rouge.vercel.app/", "live-site", "200",
     "FireSage Studio branding, 'two-person team', links to interior-deco, tailwind-web-portfolio, freecodecamp2-1; template credit to hasthemes.com; mailto hello@andle.com."),
    ("src-023", "https://eliphany-ng.vercel.app/", "live-site", "200",
     "Eliphany skin-care supplements store, WhatsApp order flow, Instagram @eliphany.ng, placeholder telephone in JSON-LD."),
    ("src-024", "https://eliphany-admin.vercel.app/", "live-site", "200",
     "Client-rendered React admin; /dashboard loads with empty DOM text. No title/description beyond CRA defaults."),
    ("src-025", "https://admin-demo-seven.vercel.app/", "live-site", "200",
     "Identical React admin deployment to eliphany-admin; /dashboard loads with empty DOM text."),
    ("src-026", "https://odin-landing-page-chi.vercel.app/", "live-site", "200",
     "Odin Project landing page; placeholder copy ('header link1', 'this website is awesome')."),
    ("src-027", "https://freecodecamp-project-4.vercel.app/", "live-site", "200",
     "Rava product landing page; page text says 'The Rava app is provided by lordwhitefire'."),
    ("src-028", "https://freecodecamp2-1.vercel.app/", "live-site", "200",
     "Camper Cafe restaurant menu; page text says 'from victor's collection'."),
    ("src-029", "https://tailwind-web-portfolio.vercel.app/", "live-site", "200",
     "Old portfolio titled 'whitefire's portfolio'. Says 'IFEDIKE VICTOR', based in Awka Nigeria, eight months experience, LinkedIn victor-m-ifedike-2039a2239, resume PDF, a personal WhatsApp link (number redacted), links to nine early deployments."),
    ("src-030", "https://feproject.vercel.app/", "live-site", "200",
     "Deployment linked from src-029: 'Odin Recipes - Authentic Nigerian Cuisine'."),
    ("src-031", "https://freecodecamp7-1.vercel.app/", "live-site", "200",
     "Deployment linked from src-029: \"victor's photo gallery\" / \"victor's catalog\"."),
    ("src-032", "https://freecodecamp-project-3.vercel.app/", "live-site", "200",
     "Deployment linked from src-029; HTTP 200, no title or heading text in the served HTML."),
    ("src-033", "https://freecodecamp-certification-project-1.vercel.app/", "live-site", "200",
     "Deployment linked from src-029: 'freecodecamp survey form'."),
    ("src-034", "https://freecodecamp10-1.vercel.app/", "live-site", "200",
     "Deployment linked from src-029: 'steve jobs' biography page."),
    ("src-035", "https://freecodecamp15.vercel.app/", "live-site", "200",
     "Deployment linked from src-029: 'City Skyline'."),
    ("src-036", "https://web-portfoliohazel-seven.vercel.app/", "live-site", "404",
     "Old portfolio URL printed on the resume; dead as of fetch."),
    ("src-037", "https://ifedike-victor.vercel.app/", "live-site", "404",
     "Domain chosen in decisions.md; returns Vercel 404 NOT_FOUND, not yet deployed."),
    ("src-038", "https://lordwhitefire.github.io/", "live-site", "404",
     "GitHub Pages root used by product image URLs in eliphany-ng; root returns 'Site not found'."),
    ("src-039", "https://x.com/lwhitefire", "search", "200",
     "Public logged-out profile: 'Makuo Ifedike (@lwhitefire) on X', bio 'Web Developer | BOS Brigade', joined July 2024."),
    ("src-040", "https://www.linkedin.com/in/makuoifedike", "linkedin", "999",
     "Brief URL. Direct fetch returned HTTP 999 / authwall; not bypassed. Search index shows headline and profile facts (src-043)."),
    ("src-041", "https://www.linkedin.com/in/makuo-ifedike-216607350/", "linkedin", "999",
     "URL used by CP3-legacy and Interior-deco JSON-LD. Direct fetch HTTP 999 / authwall; not bypassed."),
    ("src-042", "https://www.linkedin.com/in/victor-m-ifedike-2039a2239", "linkedin", "999",
     "URL linked from the old portfolio (src-029). Direct fetch HTTP 999 / authwall; not bypassed."),
    ("src-043", "https://ng.linkedin.com/in/makuoifedike", "search", "200",
     "Search-index record for the brief URL: headline 'Frontend Engineer at Athletica - Freelance', location Nigeria, 5 years 3 months, 1,289 followers, experience entries, Nnamdi Azikiwe University chemical engineering, freeCodeCamp Responsive Web Design (2023). Aggregated snippet, not the live page."),
    ("src-044", "https://tailwind-web-portfolio.vercel.app/img/ifedike.pdf", "live-site", "200",
     "Public one-page resume: IFEDIKE VICTOR, web developer, Promise International School 2013-2019, B.Eng Nnamdi Azikiwe University 2019-2024, email victormakuo2002@gmail.com, phone (excluded from this dataset), old portfolio URL."),
    ("src-045", "/home/lordwhitefire/Downloads/portfolio-brief.md", "workspace", "200",
     "Owner brief: canonical name Makuo Ifedike, Onitsha, light UI, JSON-LD, many [FILL IN] fields."),
    ("src-046", "/home/lordwhitefire/current-project/ifedike_makuo/product-management/decisions.md", "workspace", "200",
     "Owner decisions: identity 'Ifedike Victor only', Whitefire dropped, dark Andle UI kept, modals not pages, no numbers."),
    ("src-047", "/home/lordwhitefire/current-project/ifedike_makuo/product-management/project-facts.md", "workspace", "200",
     "Prior verified facts for the four known projects; used as a starting point and re-verified."),
    ("src-048", "/home/lordwhitefire/current-project/ifedike_makuo/product-management/scraper-handoff.md", "workspace", "200",
     "This job's brief and rules."),
    ("src-049", "/home/lordwhitefire/current-project/ifedike_makuo/product-management/architect-handoff.md", "workspace", "200",
     "How the output will be consumed (JSON-LD, llms.txt, metadata)."),
    ("src-050", "https://github.com/lordwhitefire?tab=repositories", "search", "200",
     "GitHub repository search result title: 'lordwhitefire (Ifedike Victor)' — GitHub's indexed display name differs from the API name field."),
    ("src-051", "owner message, 2026-10-27 (this conversation)", "owner", "200",
     "Owner rulings, 2026-10-27: display name Makuo Ifedike; legal name Victor Makuo Ifedike; work email mifedike@gmail.com; personal email supplied as 'victoemakuo2002@gmail.com'; LinkedIn linkedin.com/in/makuoifedike; X x.com/lwhitefire; GitHub github.com/lordwhitefire; journey/learning start July 2022, deliberately understated as '3 years' in the GitHub README to avoid exaggeration."),
    ("src-052", "owner correction, 2026-10-27 (this conversation)", "owner", "200",
     "Owner corrected the personal email spelling to victormakuo2002@gmail.com. The earlier 'victoemakuo2002' was a typo."),
]
SOURCES = [{"id": i, "url": u, "type": t, "status": (None if t == "workspace" else int(st)),
            "fetched_at": NOW, "notes": n} for i, u, t, st, n in S]
SRC_IDS = {s["id"] for s in SOURCES}


def meta(name):
    r = BY[name]
    return {
        "created_at": r["created_at"],
        "updated_at": r["updated_at"],
        "pushed_at": r["pushed_at"],
        "default_branch": r["default_branch"],
        "archived": r["archived"],
        "disabled": r["disabled"],
        "visibility": r["visibility"],
        "topics": r.get("topics") or [],
        "language": r.get("language"),
        "size_kb": r["size"],
    }


P = []


def add(name, **kw):
    r = BY[name]
    rec = {
        "name": kw.get("display_name", name),
        "repo_name": name,
        "repo_url": r["html_url"],
        "live_url": kw.get("live_url"),
        "is_fork": False,
        "kind": kw["kind"],
        "description": kw["description"],
        "role": kw.get("role", "owner / builder"),
        "stack": kw["stack"],
        "features": kw["features"],
        "status": kw["status"],
        **meta(name),
        "readme_evidence": kw["readme_evidence"],
        "live_site_title": kw.get("live_site_title"),
        "live_site_description": kw.get("live_site_description"),
        "screenshots": kw.get("screenshots", []),
        "source_ids": kw["source_ids"],
        "confidence": kw["confidence"],
        "notes": kw.get("notes", ""),
    }
    P.append(rec)


add("athletica",
    kind="application",
    description="Football store and affiliate commerce platform: public storefront with catalogue, cart, checkout, accounts and orders; private admin for products, media, orders and affiliate settings.",
    stack=["Next.js", "React", "TypeScript", "Supabase", "Sanity", "Tailwind CSS", "Sentry", "Vitest", "Vercel"],
    features=["storefront catalogue with brands/categories/models", "search, cart, checkout, order history",
              "customer accounts, login, password recovery", "admin: products, brands, models, categories, media, homepage, navigation",
              "bulk catalogue import", "traffic, product and affiliate analytics", "Amazon affiliate settings and generated URLs",
              "separate affiliate storefront in rollout/"],
    status="preview",
    live_url="https://athletica-blond.vercel.app/",
    readme_evidence="\"A football store and affiliate commerce platform: a public storefront for customers, a private admin workspace for the team, and a lightweight affiliate storefront for social traffic.\"",
    live_site_title="Athletica | Football Store",
    live_site_description="The ultimate football store. Shop football boots, goalkeeper gloves, footballs, shin guards, training wear and more.",
    screenshots=["captures/sites/athletica/viewport.png", "captures/sites/athletica/full.png"],
    source_ids=["src-003", "src-020"],
    confidence="high",
    notes="Owner plan labels it 'live preview'; the public site responds 200. Observed 2026-10-27: many Amazon quick-add links resolve to athletica-blond.vercel.app/https://www.amazon.com/... (malformed). Not claimed as launched or revenue-generating.")

add("truespec",
    kind="application",
    description="Dealership system for a Nigerian vehicle-import business: public showroom plus a single-owner private office for inventory, enquiries, costs and profit.",
    stack=["Next.js", "React", "TypeScript", "Neon Postgres", "Clerk", "Sanity", "Vercel"],
    features=["public showroom: home, inventory, car detail, privacy", "private office: dashboard, inventory CRUD, drafts, enquiries, settings, activity",
              "public/private boundary enforced by a server-side allow-list serializer", "26 database migrations",
              "money in integer kobo, no exchange rate", "PDF enquiry import", "WhatsApp tap tracking", "one-owner auth"],
    status="live",
    live_url="https://truespec-k4y6.vercel.app/",
    readme_evidence="\"The product: a public showroom plus a single-owner office for a Nigerian vehicle-import business, with one invariant above all others - what the owner paid never reaches the browser.\" (openspec proposal/design; no root README)",
    live_site_title="TrueSpec — cars you can trust",
    live_site_description="A Nigerian vehicle-import showroom: browse, judge a car completely, chat on WhatsApp.",
    screenshots=["captures/sites/truespec/viewport.png", "captures/sites/truespec/full.png"],
    source_ids=["src-004", "src-019"],
    confidence="high",
    notes="Live page publishes a business WhatsApp number and several TS-FLOW-* demo records; the number is intentionally excluded from this profile dataset. No canonical tag and no JSON-LD observed on the public home page.")

add("interior-deco",
    kind="marketing-site",
    description="CMS-driven marketing website for the Whitefire Interior brand: services, projects, blog, team, testimonials, FAQ, contact, newsletter.",
    stack=["Remix", "React", "TypeScript", "Sanity", "Tailwind CSS", "Vercel"],
    features=["13 public routes", "services index + 8 service pages", "projects index + detail", "blog index + detail",
              "team index + detail", "testimonials, FAQ, contact, privacy", "contact and newsletter forms with validation, honeypot and rate limiting",
              "Organization and LocalBusiness JSON-LD", "sitemap, robots, llms.txt"],
    status="live",
    live_url="https://interior-deco-kappa.vercel.app/",
    readme_evidence="\"A production-grade, CMS-driven website for Whitefire Interior, an Amsterdam interior design studio.\"",
    live_site_title="Whitefire Interior — Amsterdam Interior Design Studio",
    live_site_description="Whitefire Interior — an Amsterdam interior design studio creating beautiful, functional spaces for homes and businesses.",
    screenshots=["captures/sites/interior-deco/viewport.png", "captures/sites/interior-deco/full.png"],
    source_ids=["src-009", "src-018"],
    confidence="high",
    notes="Live <meta name=author> is 'Makuo Ifedike'; JSON-LD founder email is mifedike@gmail.com; LinkedIn is makuo-ifedike-216607350. The brand is Whitefire Interior, not a confirmed client engagement and not the owner's studio identity.")

add("cp3-legacy",
    kind="fan-site",
    description="Chris Paul fan site / sports experience: news, player overview, full statistics, biography, gallery, shop, account and wishlist.",
    stack=["Next.js", "React", "TypeScript", "Tailwind CSS", "shadcn/ui", "Sanity", "Prisma", "next-auth", "Vercel"],
    features=["news feed", "player overview and statistics", "biography", "gallery", "shop and wishlist", "account", "language and currency controls"],
    status="live",
    live_url="https://cp3-legacy.vercel.app/",
    readme_evidence="\"Personal portfolio and hire-me funnel site built with Next.js, Tailwind CSS v4, shadcn/ui, and TypeScript.\" - the README is stale: the live metadata and page content are a Chris Paul fan destination.",
    live_site_title="CP3 Legacy",
    live_site_description="Celebrating 19 seasons of greatness — from Wake Forest to the Hall of Fame. Welcome to the ultimate Chris Paul fan destination.",
    screenshots=["captures/sites/cp3-legacy/viewport.png", "captures/sites/cp3-legacy/full.png"],
    source_ids=["src-010", "src-021"],
    confidence="high",
    notes="Live page already carries Person/Organization/WebSite JSON-LD naming 'Ifedike Victor Makuo', plus an sr-only builder paragraph (valid accessibility pattern here, not the CSS-hidden keyword trick the brief forbids). Header contact shows victormark2002@gmail.com; footer shows victormakuo2002@gmail.com.")

add("new-portfolio",
    kind="portfolio-site",
    description="Earlier portfolio / studio site branded FireSage Studio, built on the Andle Bootstrap template and later filled with the owner's real projects.",
    stack=["HTML", "CSS", "Bootstrap", "JavaScript", "Vercel"],
    features=["single-page sections plus about/projects/pricing/contact pages", "project cards linking to interior-deco, the old tailwind portfolio and freecodecamp2-1", "contact form"],
    status="template",
    live_url="https://new-portfolio-eta-rouge.vercel.app/",
    readme_evidence="projects.html still carries <title>\"Andle - Personal Portfolio Bootstrap 5 Template\"</title>; the live home says \"It's FireSage Studio, a two-person team crafting flawless digital experiences.\"",
    live_site_title="FireSage Studio - Web Development & Design",
    live_site_description="Professional web development studio specializing in e-commerce, web applications, and dashboards. Building high-quality, user-focused projects.",
    screenshots=["captures/sites/new-portfolio/viewport.png", "captures/sites/new-portfolio/full.png"],
    source_ids=["src-011", "src-022"],
    confidence="high",
    notes="Template-derived (not a GitHub fork). Contact is mailto hello@andle.com; footer credits hasthemes.com. The 'two-person team' claim is the page's own text, not verified. It is the site whose look the current portfolio calls 'the Andle look'.")

add("eliphany-ng",
    kind="e-commerce-site",
    description="Eliphany skin-care supplements storefront with product catalogue, categories, product pages and WhatsApp ordering.",
    stack=["Astro", "React", "TypeScript", "Sanity", "Tailwind CSS", "Vercel"],
    features=["home, products, categories, product detail, about, contact", "product data from Sanity/JSON", "WhatsApp order buttons", "Instagram link @eliphany.ng"],
    status="live",
    live_url="https://eliphany-ng.vercel.app/",
    readme_evidence="README is the Astro starter kit; the live site and src/data/products.json identify it as Eliphany skin-care supplements.",
    live_site_title="Eliphany | Skin-Care Supplements",
    live_site_description="Curated skin-care supplements – contact us on WhatsApp for orders.",
    screenshots=["captures/sites/eliphany-ng/viewport.png", "captures/sites/eliphany-ng/full.png"],
    source_ids=["src-015", "src-023"],
    confidence="high",
    notes="WhatsApp number on the site is a placeholder; JSON-LD telephone is a second placeholder, so no real contact is recorded. Product image URLs point at lordwhitefire.github.io, whose root is 404.")

add("eliphany-admin",
    kind="admin-app",
    description="React admin dashboard for the Eliphany store: products, new arrivals, shop products, home/about settings, login and WhatsApp buttons panel.",
    stack=["React", "JavaScript", "Tailwind CSS", "Sanity"],
    features=["dashboard", "product manager and product form", "new arrivals", "shop products", "home and about settings", "WhatsApp buttons panel", "login"],
    status="demo",
    live_url="https://eliphany-admin.vercel.app/",
    readme_evidence="README is the Create React App boilerplate; src/ tree contains Dashboard, ProductsManager, ProductForm, ShopProducts, WhatsappButtonsPanel, AuthContext.",
    live_site_title="React App",
    live_site_description="Web site created using create-react-app",
    screenshots=["captures/sites/eliphany-admin/viewport.png"],
    source_ids=["src-014", "src-024"],
    confidence="high",
    notes="Public deployment redirects to /dashboard with an empty rendered DOM (client app). No auth barrier observed. src/App.js is byte-identical to Admin-demo.")

add("Admin-demo",
    kind="admin-app",
    description="Duplicate deployment of the Eliphany admin dashboard, kept as a separate repository and Vercel site.",
    stack=["React", "JavaScript", "Tailwind CSS", "Sanity"],
    features=["dashboard", "product manager and product form", "new arrivals", "shop products", "home and about settings", "WhatsApp buttons panel", "login"],
    status="demo",
    live_url="https://admin-demo-seven.vercel.app/",
    readme_evidence="README is the Create React App boilerplate; src/App.js is identical to eliphany-admin.",
    live_site_title="React App",
    live_site_description="Web site created using create-react-app",
    screenshots=["captures/sites/admin-demo/viewport.png"],
    source_ids=["src-013", "src-025"],
    confidence="high",
    notes="Not a distinct product: same App.js as eliphany-admin, different repo and URL.")

add("online-store",
    kind="application",
    description="Next.js shop application with storefront, admin, Prisma order/customer models, Clerk and next-auth, branded 'Music Place — Professional Music Equipment & Instruments' in the layout metadata.",
    stack=["Next.js", "React", "TypeScript", "Prisma", "Clerk", "next-auth", "Tailwind CSS"],
    features=["storefront home, shop, category, product, cart, checkout", "blog, gallery, services, contact, privacy", "admin, staff, login, sign-up", "REST API routes for products, orders, customers, admin stats"],
    status="unknown",
    readme_evidence="No README. src/app/layout.tsx metadata: '\"Music Place — Professional Music Equipment & Instruments\"'. prisma/schema.prisma: Order, OrderItem, Customer. package name is the generic 'nextjs_tailwind_shadcn_ts'.",
    live_site_title=None,
    live_site_description=None,
    screenshots=[],
    source_ids=["src-012"],
    confidence="medium",
    notes="Appears template-derived (stock 'Music Place' branding and /musicplace/ image paths); template origin not verified. No live URL in repo or API. 270 MB repo. Not presented as original design.")

add("youtube-analytics",
    kind="tool",
    description="Small Next.js app that authenticates a user with Google OAuth 2.0 and downloads the token response as JSON; no database and no token storage.",
    stack=["Next.js", "React", "TypeScript", "Google OAuth"],
    features=["Google OAuth consent flow", "callback route", "downloads google-tokens.json locally", "separate analysis scripts (fp-growth, decision tree) in the repo"],
    status="experiment",
    live_url=None,
    readme_evidence="\"Minimal Next.js App Router application that authenticates a user with Google OAuth 2.0 and downloads the token response as a JSON file. No database. No token storage. No Google API calls.\"",
    live_site_title=None,
    live_site_description=None,
    screenshots=[],
    source_ids=["src-005"],
    confidence="high",
    notes="No deployment. Repo also contains Python/JS analysis scripts (fp-growth-analysis.py, decision-tree-analysis.py, analyze-ranking.js).")

add("agentic-video-system",
    kind="tool",
    description="Reference-driven, script-driven video editing system: a 17-agent OpenCode configuration plus a runnable LangGraph orchestrator with CLI and FastAPI dashboard.",
    stack=["Python", "LangGraph", "FastAPI", "TypeScript", "Mermaid", "OpenCode"],
    features=["17 agents across 5 departments", "12 laws and guardrail tools", "human-in-the-loop CEO approvals", "persistent BM25 RAG knowledge repository",
              "CLI + FastAPI web dashboard", "Agent Workspace with multi-session chat", "88 tests claimed in the README"],
    status="in-progress",
    live_url=None,
    readme_evidence="\"A reference-driven, script-driven, audio-as-master video editing system built for Agenticine (OpenCode fork). 17 agents across 5 departments, 12 laws...\"",
    live_site_title=None,
    live_site_description=None,
    screenshots=[],
    source_ids=["src-008"],
    confidence="high",
    notes="Largest original codebase by scope (968 MB repo, 184 tracked files). The '88 tests' figure is the README's claim, not run here.")

add("interior-deco-cms",
    kind="cms",
    description="Sanity Studio content backend for the Interior-deco site: page, service, project, blog, team, testimonial, FAQ, contact and newsletter schemas.",
    stack=["Sanity", "React", "TypeScript"],
    features=["20 schema types", "page singletons (home, about, services, projects, team, FAQ, contact)", "blog articles and categories",
              "staff, testimonials, clients", "contact submissions and newsletter subscribers", "site config"],
    status="in-progress",
    live_url=None,
    readme_evidence="Schema tree: aboutPage, blogArticle, blogCategory, client, contactPage, contactSubmission, faqCategory, faqItem, faqPage, hero, homePage, index, newsletterSubscriber, projectPage, servicePage, siteConfig, staff, stylish, teamPage, testimonial.",
    live_site_title=None,
    live_site_description=None,
    screenshots=[],
    source_ids=["src-016"],
    confidence="high",
    notes="Supporting repository for interior-deco, not a separate public product. README is the Sanity starter boilerplate.")

add("odin-landing-page",
    kind="learning-project",
    description="First hand-written CSS landing page, built for The Odin Project; still shows placeholder copy.",
    stack=["HTML", "CSS"],
    features=["single landing page", "float-based layout"],
    status="experiment",
    live_url="https://odin-landing-page-chi.vercel.app/",
    readme_evidence="\"this project is about designing a landing page and is my first css project\"",
    live_site_title="Odin Project Landing Page",
    live_site_description=None,
    screenshots=["captures/sites/odin-landing-page/viewport.png"],
    source_ids=["src-006", "src-026"],
    confidence="high",
    notes="Live page still contains the assignment's placeholder text ('header link1', 'this website is awesome'). Early learning work, labelled as such.")

add("freecodecamp_project_4",
    kind="learning-project",
    description="Hand-written HTML/CSS product landing page for a fictional 'Rava' product, built for freeCodeCamp.",
    stack=["HTML", "CSS"],
    features=["single product landing page", "sections: home, features, testimonials, contact"],
    status="experiment",
    live_url="https://freecodecamp-project-4.vercel.app/",
    readme_evidence="package.json description: \"Rava product landing page - hand-written HTML and CSS\"; live page says \"The Rava app is provided by lordwhitefire.\"",
    live_site_title="Rava — Simple app that we create",
    live_site_description="Rava — a simple creative application for beautiful, secure and high-performing digital experiences.",
    screenshots=["captures/sites/freecodecamp-project-4/viewport.png"],
    source_ids=["src-007", "src-027"],
    confidence="high",
    notes="Early learning work. The live page names lordwhitefire in its copy.")

add("lordwhitefire",
    kind="profile-readme",
    description="GitHub profile README: banner, a short self-description, availability for small paid work, email, and a languages/tools image panel.",
    stack=["Markdown"],
    features=["profile banner", "self-description", "contact email", "tools panel"],
    status="unknown",
    live_url=None,
    readme_evidence="\"I'm a self-taught full-stack developer with 3 years of experience building for the web. I'm taking on small paid projects for bug fixes, feature work, deployments, API integrations, and automation.\"",
    live_site_title=None,
    live_site_description=None,
    screenshots=[],
    source_ids=["src-017"],
    confidence="high",
    notes="Included because the README contains real self-authored content, not a generated placeholder. Not an application; do not show it as a project card.")

# ------------------------------------------------------------- forks --------
FORKS_OUT = [{
    "name": f["name"],
    "repo_url": f["html_url"],
    "upstream": f.get("parent", {}).get("full_name") if f.get("parent") else None,
    "reason": "fork",
    "note": (f.get("description") or "")[:200],
    "created_at": f["created_at"],
} for f in FORKS]

# ------------------------------------------------------- deployments --------
DEPLOYMENTS = [
    {"url": "https://feproject.vercel.app/", "title": "Odin Recipes - Authentic Nigerian Cuisine", "status": 200, "source_ids": ["src-030", "src-029"], "note": "Linked from the old portfolio."},
    {"url": "https://freecodecamp7-1.vercel.app/", "title": "victor's photo gallery", "status": 200, "source_ids": ["src-031", "src-029"], "note": "Linked from the old portfolio."},
    {"url": "https://freecodecamp-project-3.vercel.app/", "title": None, "status": 200, "source_ids": ["src-032", "src-029"], "note": "Linked from the old portfolio; no title/heading in served HTML."},
    {"url": "https://freecodecamp-certification-project-1.vercel.app/", "title": "freecodecamp survey form", "status": 200, "source_ids": ["src-033", "src-029"], "note": "Linked from the old portfolio."},
    {"url": "https://freecodecamp10-1.vercel.app/", "title": "steve jobs biography page", "status": 200, "source_ids": ["src-034", "src-029"], "note": "Linked from the old portfolio."},
    {"url": "https://freecodecamp15.vercel.app/", "title": "City Skyline", "status": 200, "source_ids": ["src-035", "src-029"], "note": "Linked from the old portfolio."},
    {"url": "https://freecodecamp2-1.vercel.app/", "title": "Camper Cafe - Restaurant menu", "status": 200, "source_ids": ["src-028", "src-029"], "note": "Linked from both the old portfolio and new-portfolio."},
    {"url": "https://tailwind-web-portfolio.vercel.app/", "title": "whitefire's portfolio", "status": 200, "source_ids": ["src-029"], "note": "Old portfolio; links the resume and nine early deployments."},
    {"url": "https://web-portfoliohazel-seven.vercel.app/", "title": None, "status": 404, "source_ids": ["src-036"], "note": "Dead URL printed on the resume."},
    {"url": "https://ifedike-victor.vercel.app/", "title": None, "status": 404, "source_ids": ["src-037", "src-046"], "note": "Domain chosen in decisions.md; not deployed."},
    {"url": "https://lordwhitefire.github.io/", "title": "Site not found · GitHub Pages", "status": 404, "source_ids": ["src-038"], "note": "Root of the GitHub Pages host used by eliphany-ng image URLs; 404."},
]

# ------------------------------------------------------------ identity ------
IDENTITY = {
    "canonical_name": "Makuo Ifedike",
    "canonical_name_status": "decided-2026-10-27",
    "canonical_name_note": "Owner ruling 2026-10-27 (src-051): the display name is 'Makuo Ifedike'. The full legal name is 'Victor Makuo Ifedike' and is kept as legalName/alternateName only, not as the display name. The brief (src-045) and the live Interior-deco metadata (src-018) already use the two-name form; the old plan (src-046) and old portfolio (src-029) used 'Ifedike Victor'.",
    "legal_name": "Victor Makuo Ifedike",
    "aliases": ["Victor Makuo Ifedike", "Ifedike Victor", "Ifedike Victor Makuo", "lordwhitefire", "makuoifedike", "lwhitefire"],
    "headline": "Frontend Engineer at Athletica — Freelance",
    "headline_source_ids": ["src-043"],
    "headline_confidence": "medium",
    "headline_note": "LinkedIn search-index snippet; the live LinkedIn page is blocked (HTTP 999).",
    "experience_start": {
        "value": "2022-07",
        "label": "July 2022",
        "kind": "learning / building start",
        "duration_as_of": "2026-10-27",
        "duration": "4 years 3 months",
        "source_ids": ["src-051", "src-029"],
        "note": "Owner ruling 2026-10-27. The GitHub account was created 2022-08-30 and the first commit is 2022-09-22; GitHub marks when publishing started, not when the journey started.",
    },
    "other_self_descriptions": [
        {"text": "self-taught full-stack developer with 3 years of experience building for the web", "source_ids": ["src-017"], "status": "superseded-by-owner-ruling-2026-10-27", "note": "The owner states this was a deliberate understatement, not a different start date."},
        {"text": "Web Developer | BOS Brigade", "source_ids": ["src-039"]},
        {"text": "web developer based in Awka Nigeria, over eight months of experience", "source_ids": ["src-029"], "status": "historical-2023-snapshot"},
        {"text": "Remote frontend developer from Onitsha, Nigeria. B.Eng Chemical Engineering, Nnamdi Azikiwe University (2025) — self-taught developer. Targeting remote React/Next.js roles.", "source_ids": ["src-021"]},
    ],
    "location": {
        "city": "Onitsha",
        "state": "Anambra State",
        "country": "Nigeria",
        "source_ids": ["src-045", "src-021"],
        "confidence": "medium",
        "note": "Brief and CP3 JSON-LD say Onitsha; the old portfolio says Awka; LinkedIn says only Nigeria. Not ruled on 2026-10-27.",
    },
    "email": "mifedike@gmail.com",
    "email_role": "work",
    "email_note": "Owner ruling 2026-10-27: work email is mifedike@gmail.com. The personal email is recorded separately in contact.",
    "contact_page": None,
    "profiles": [
        {"platform": "GitHub", "url": "https://github.com/lordwhitefire", "handle": "lordwhitefire", "verified": True,
         "source_ids": ["src-051", "src-001", "src-050"], "note": "Owner-confirmed 2026-10-27. API name field 'Makuo Ifedike'; the GitHub search-index title still says 'Ifedike Victor'."},
        {"platform": "X", "url": "https://x.com/lwhitefire", "handle": "lwhitefire", "verified": True,
         "source_ids": ["src-051", "src-039"], "note": "Owner-confirmed 2026-10-27. Public profile: 'Makuo Ifedike (@lwhitefire)', bio 'Web Developer | BOS Brigade', joined July 2024."},
        {"platform": "LinkedIn", "url": "https://www.linkedin.com/in/makuoifedike/", "handle": "makuoifedike", "verified": True,
         "source_ids": ["src-051", "src-040", "src-043"], "note": "Owner-confirmed 2026-10-27 as the only LinkedIn profile. Direct fetch remains blocked (HTTP 999); the profile facts still come from the search index."},
    ],
    "rejected_profiles": [
        {"platform": "LinkedIn", "url": "https://www.linkedin.com/in/makuo-ifedike-216607350/", "handle": "makuo-ifedike-216607350", "source_ids": ["src-041", "src-018", "src-021"],
         "reason": "Owner ruled 2026-10-27 that makuoifedike is the profile. This slug was used by CP3 and Interior-deco JSON-LD and must be replaced."},
        {"platform": "LinkedIn", "url": "https://www.linkedin.com/in/victor-m-ifedike-2039a2239", "handle": "victor-m-ifedike-2039a2239", "source_ids": ["src-042", "src-029"],
         "reason": "Owner ruled 2026-10-27 that makuoifedike is the profile. This slug was linked from the old portfolio."},
    ],
    "business_accounts": [
        {"platform": "Instagram", "url": "https://instagram.com/eliphany.ng", "handle": "eliphany.ng", "verified": False,
         "source_ids": ["src-023"], "note": "Business account linked from the Eliphany store. Not a personal profile and not part of the owner's identity; do not use as sameAs."},
    ],
}

BIO = {
    "one_line": "Self-taught developer in Onitsha, Anambra State, Nigeria, building for the web since July 2022 with Next.js, Remix, TypeScript, Sanity and Postgres.",
    "short": "Self-described self-taught full-stack developer (GitHub README) with four live project sites: a dealership system, a football store, an interior-design studio site, and a Chris Paul fan experience. LinkedIn lists a 'Frontend Engineer at Athletica — Freelance' headline.",
    "long": None,
    "long_note": "The brief's one-paragraph bio in the owner's own words is still [FILL IN]; no long bio was written here.",
    "source_ids": ["src-017", "src-043", "src-045", "src-051"],
}

SKILLS_EVIDENCED = [
    ("Next.js", ["src-003", "src-004", "src-010", "src-012"], "high"),
    ("React", ["src-003", "src-004", "src-010", "src-014"], "high"),
    ("Remix", ["src-009"], "high"),
    ("TypeScript", ["src-003", "src-004", "src-009", "src-010", "src-012"], "high"),
    ("Tailwind CSS", ["src-003", "src-009", "src-010", "src-015", "src-016"], "high"),
    ("Sanity CMS", ["src-009", "src-003", "src-010", "src-016", "src-015"], "high"),
    ("Supabase", ["src-003"], "high"),
    ("Neon Postgres", ["src-004"], "high"),
    ("Prisma", ["src-010", "src-012"], "high"),
    ("Clerk", ["src-004", "src-012"], "high"),
    ("next-auth", ["src-010", "src-012"], "high"),
    ("Vercel", ["src-003", "src-004", "src-009", "src-010", "src-013", "src-014", "src-015", "src-016", "src-022"], "high"),
    ("Astro", ["src-015"], "high"),
    ("Python", ["src-008", "src-005"], "high"),
    ("FastAPI", ["src-008"], "high"),
    ("LangGraph", ["src-008"], "high"),
    ("Vitest", ["src-003", "src-010"], "high"),
    ("Sentry", ["src-003"], "high"),
    ("shadcn/ui", ["src-010", "src-012"], "high"),
    ("Framer Motion", ["src-003", "src-010"], "high"),
]
SKILLS_CLAIMED = [
    ("HTML", "src-044", "high"),
    ("CSS", "src-044", "high"),
    ("JavaScript", "src-044", "high"),
    ("jQuery", "src-044", "medium"),
    ("SEO", "src-029", "medium"),
    ("Accessibility", "src-029", "medium"),
    ("3 years of experience", "src-017", "medium"),
    ("5 years 3 months of experience", "src-043", "low"),
    ("German language", "src-043", "low"),
    ("Hindi language", "src-043", "low"),
]

EDUCATION = [
    {"institution": "Nnamdi Azikiwe University", "qualification": "B.Eng Chemical Engineering",
     "dates": "2019-2024", "source_ids": ["src-044", "src-043"],
     "confidence": "medium",
     "note": "Resume says 2019-2024. CP3 JSON-LD says 'Nnamdi Azikiwe University (2025)'. LinkedIn snippet names the university and chemical engineering without dates. Not independently verified."},
    {"institution": "Promise International School", "qualification": "Secondary school",
     "dates": "2013-2019", "source_ids": ["src-044"], "confidence": "medium",
     "note": "From the public resume only."},
]

EXPERIENCE = [
    {"role": "Web Developer (freelance)", "organisation": "Self-employed", "dates": "Jan 2024 - present",
     "source_ids": ["src-043"], "confidence": "low", "note": "LinkedIn search-index snippet; live profile blocked."},
    {"role": "Content Creator | Web3 Enthusiasts", "organisation": "Freelance", "dates": "Jun 2024 - present",
     "source_ids": ["src-043"], "confidence": "low", "note": "LinkedIn search-index snippet; it is unclear whether this is paid work."},
    {"role": "Multilingual Learner (Hindi + German)", "organisation": "Freelance", "dates": "Jun 2021 - present",
     "source_ids": ["src-043"], "confidence": "low", "note": "Listed as an experience entry on the LinkedIn index; it is not an employment role."},
    {"role": "Web Designer (learning by building)", "organisation": "W3Schools / freeCodeCamp", "dates": "2022 - present",
     "source_ids": ["src-044"], "confidence": "medium", "note": "The resume presents this as experience; it describes self-directed learning and practice projects."},
    {"role": "Frontend Engineer at Athletica — Freelance", "organisation": "Athletica (own project)",
     "dates": None, "source_ids": ["src-043", "src-003"], "confidence": "low",
     "note": "Headline only. Athletica is also the owner's own public repository, so this may describe project work rather than a client engagement. Do not present as a verified employer."},
]

CONTACT = {
    "email": "mifedike@gmail.com",
    "email_role": "work",
    "personal_email": "victormakuo2002@gmail.com",
    "personal_email_status": "confirmed-2026-10-27",
    "personal_email_note": "Owner-confirmed 2026-10-27. The earlier chat message spelled it 'victoemakuo2002@gmail.com'; that was a typo and is recorded as rejected.",
    "contact_page": None,
    "public_profiles": [p["url"] for p in IDENTITY["profiles"]],
    "email_candidates": [
        {"email": "mifedike@gmail.com", "role": "work", "status": "selected", "source_ids": ["src-051", "src-018"],
         "note": "Owner-confirmed work email 2026-10-27; already the founder email in the Interior-deco JSON-LD."},
        {"email": "victormakuo2002@gmail.com", "role": "personal", "status": "selected", "source_ids": ["src-052", "src-017", "src-044", "src-021"],
         "note": "Owner-confirmed 2026-10-27; matches the GitHub README, public resume, and CP3 footer."},
        {"email": "victoemakuo2002@gmail.com", "role": "personal", "status": "rejected-typo", "source_ids": ["src-051"],
         "note": "Typo in the owner's 2026-10-27 message; corrected the same day to the address above. Do not use."},
        {"email": "victormark2002@gmail.com", "role": "none", "status": "rejected", "source_ids": ["src-021"],
         "note": "CP3 header contact link. Owner did not list it on 2026-10-27; replace it on the live page."},
    ],
    "excluded_contact": [
        {"kind": "personal phone / WhatsApp", "value": "[redacted]", "source_ids": ["src-029", "src-044"],
         "reason": "A personal number is published on the old portfolio and the resume. It is redacted here and must not be published; the brief forbids phone and WhatsApp numbers on the public web."},
        {"kind": "business WhatsApp", "value": "[redacted]", "source_ids": ["src-019"],
         "reason": "Truespec publishes a business WhatsApp number. It is not the owner's personal contact and is excluded from this profile."},
        {"kind": "placeholder", "value": "[redacted]", "source_ids": ["src-023"],
         "reason": "Eliphany carries a placeholder WhatsApp number, not a real contact."},
    ],
}

CONFLICTS = [
    {"id": "C-01", "topic": "Canonical name",
     "readings": ["Makuo Ifedike (src-045, src-050)", "Ifedike Victor (src-046, src-029, src-044)", "Ifedike Victor Makuo (src-021)"],
     "status": "resolved", "decided_at": "2026-10-27",
     "needs": "Decided: display name Makuo Ifedike; legal name Victor Makuo Ifedike, kept as legalName/alternateName only. Replace 'Ifedike Victor' on every surface.",
     "source_ids": ["src-051", "src-045", "src-046", "src-021", "src-050"]},
    {"id": "C-02", "topic": "LinkedIn URL",
     "readings": ["linkedin.com/in/makuoifedike (brief)", "linkedin.com/in/makuo-ifedike-216607350 (CP3 + Interior-deco JSON-LD)", "linkedin.com/in/victor-m-ifedike-2039a2239 (old portfolio)"],
     "status": "resolved", "decided_at": "2026-10-27",
     "needs": "Decided: linkedin.com/in/makuoifedike is the only profile. Replace the other two wherever they are linked.",
     "source_ids": ["src-051", "src-040", "src-041", "src-042"]},
    {"id": "C-03", "topic": "Public contact email",
     "readings": ["mifedike@gmail.com (work)", "victormakuo2002@gmail.com (personal)", "victormark2002@gmail.com (CP3 header, dropped)"],
     "status": "resolved", "decided_at": "2026-10-27",
     "needs": "Decided: work mifedike@gmail.com; personal victormakuo2002@gmail.com. The 'victoemakuo2002' spelling was a typo; victormark2002 is dropped.",
     "source_ids": ["src-051", "src-052", "src-018", "src-017", "src-044", "src-021"]},
    {"id": "C-04", "topic": "Graduation year",
     "readings": ["B.Eng 2019-2024 (resume)", "Nnamdi Azikiwe University (2025) (CP3 JSON-LD)"],
     "status": "open", "needs": "Owner confirmation; do not put a year in alumniOf until confirmed.", "source_ids": ["src-044", "src-021"]},
    {"id": "C-05", "topic": "Location",
     "readings": ["Onitsha, Anambra State (brief, CP3 JSON-LD)", "Awka, Nigeria (old portfolio)", "Nigeria only (LinkedIn index)"],
     "status": "open", "needs": "Owner confirmation of city; country is consistent.", "source_ids": ["src-045", "src-021", "src-029", "src-043"]},
    {"id": "C-06", "topic": "Years of experience",
     "readings": ["3 years (GitHub README, deliberate understatement)", "5 years 3 months (LinkedIn index)", "eight months in the 2023 portfolio"],
     "status": "resolved", "decided_at": "2026-10-27",
     "needs": "Decided: the journey started July 2022. As of 2026-10-27 that is 4 years 3 months. The README's '3 years' and LinkedIn's '5 years 3 months' are both superseded.",
     "source_ids": ["src-051", "src-017", "src-043", "src-029"]},
    {"id": "C-07", "topic": "Twitter/X",
     "readings": ["[FILL IN] in the brief", "@lwhitefire found and verified"],
     "status": "resolved", "decided_at": "2026-10-27",
     "needs": "Decided: x.com/lwhitefire is the profile.",
     "source_ids": ["src-051", "src-045", "src-039"]},
    {"id": "C-08", "topic": "UI / URL architecture",
     "readings": ["Brief: light UI, one page per project", "Approved plan: dark Andle look, same-page case-study modals"],
     "status": "open", "needs": "Owner/architect decision; this job did not build or redesign anything.", "source_ids": ["src-045", "src-046", "src-049"]},
    {"id": "C-09", "topic": "Project count",
     "readings": ["36 public repositories", "20 forks", "15 counted non-fork repositories", "1 empty repository"],
     "status": "reported", "needs": "Use the counted number; do not present forks or the empty repo as projects.", "source_ids": ["src-002"]},
    {"id": "C-10", "topic": "Client relationships",
     "readings": ["No client contract, invoice, or testimonial found in any source"],
     "status": "reported", "needs": "Do not claim client work for Interior-deco, Truespec, Athletica, Eliphany or any other project.", "source_ids": ["src-047", "src-048"]},
    {"id": "C-11", "topic": "Identity on the live Interior-deco site",
     "readings": ["meta author 'Makuo Ifedike' and JSON-LD founder 'Makuo Ifedike'", "Approved plan said identity is 'Ifedike Victor only'"],
     "status": "resolved", "decided_at": "2026-10-27",
     "needs": "Decided by C-01: Makuo Ifedike is correct. The live site already matches; the plan text needs updating.",
     "source_ids": ["src-051", "src-018", "src-046"]},
    {"id": "C-12", "topic": "Athletica project status",
     "readings": ["Public site responds 200 and is usable", "Owner plan calls it 'live preview'"],
     "status": "reported", "needs": "Use 'preview' unless the owner declares it launched.", "source_ids": ["src-020", "src-046"]},
    {"id": "C-13", "topic": "Personal email spelling",
     "readings": ["victoemakuo2002@gmail.com (typo in the 2026-10-27 message)", "victormakuo2002@gmail.com (README, resume, CP3 footer)"],
     "status": "resolved", "decided_at": "2026-10-27",
     "needs": "Decided: victormakuo2002@gmail.com. The other spelling was a typing error and is recorded as rejected.",
     "source_ids": ["src-052", "src-051", "src-017", "src-044", "src-021"]},
]

MISSING = [
    "Canonical personal domain (brief [FILL IN])",
    "Contact page URL (none exists)",
    "One-paragraph bio in the owner's own words (brief [FILL IN])",
    "Profile photo as a build asset (GitHub/X avatars exist, but the brief's [FILL IN] is unanswered)",
    "Education confirmation and exact graduation year",
    "City confirmation (Onitsha in the brief and CP3; Awka in the old portfolio)",
    "Direct LinkedIn page text (HTTP 999 even on the confirmed URL; only a search-index snippet is available)",
    "Verified client relationships (none claimed, none found)",
    "The owner's answer to 'Anything I do NOT want public' (brief [FILL IN])",
    "A long-form written bio and any personal statement beyond the short self-descriptions collected",
]

OWNER_RULINGS = {
    "decided_at": "2026-10-27",
    "decided_by": "owner",
    "source_ids": ["src-051"],
    "rulings": [
        {"field": "display_name", "value": "Makuo Ifedike",
         "note": "Two names. Chosen for consistency and SEO; the owner normally uses this form."},
        {"field": "legal_name", "value": "Victor Makuo Ifedike",
         "note": "Keep as legalName/alternateName in structured data only; never as the H1, title or display name."},
        {"field": "work_email", "value": "mifedike@gmail.com"},
        {"field": "personal_email", "value": "victormakuo2002@gmail.com",
         "status": "confirmed",
         "note": "Confirmed 2026-10-27. The earlier 'victoemakuo2002' was a typo; that spelling is rejected."},
        {"field": "linkedin", "value": "https://www.linkedin.com/in/makuoifedike/",
         "note": "The only LinkedIn profile. The other two slugs are rejected."},
        {"field": "x", "value": "https://x.com/lwhitefire"},
        {"field": "github", "value": "https://github.com/lordwhitefire"},
        {"field": "experience_start", "value": "July 2022",
         "note": "Learning/building start. GitHub account created 2022-08-30; first commit 2022-09-22. Those dates mark publishing, not the start."},
        {"field": "experience_duration_as_of_2026-10-27", "value": "4 years 3 months",
         "note": "Computed from July 2022. Supersedes '3 years' (README) and '5 years 3 months' (LinkedIn index)."},
    ],
    "rejected": [
        {"field": "display_name", "value": "Ifedike Victor", "reason": "Replaced by Makuo Ifedike on 2026-10-27."},
        {"field": "display_name", "value": "Ifedike Victor Makuo", "reason": "Three names; legal only, not display."},
        {"field": "linkedin", "value": "https://www.linkedin.com/in/makuo-ifedike-216607350/", "reason": "Not the owner's profile per 2026-10-27 ruling."},
        {"field": "linkedin", "value": "https://www.linkedin.com/in/victor-m-ifedike-2039a2239", "reason": "Not the owner's profile per 2026-10-27 ruling."},
        {"field": "email", "value": "victormark2002@gmail.com", "reason": "Dropped by the owner on 2026-10-27; remove from CP3."},
        {"field": "email", "value": "victoemakuo2002@gmail.com", "reason": "Typo in the 2026-10-27 message; corrected the same day to victormakuo2002@gmail.com."},
    ],
}

DATA = {
    "generated_at": NOW,
    "job": "Public-information gathering for the Makuo Ifedike portfolio, from product-management/scraper-handoff.md",
    "classification": "data layer (public identity + project inventory), with live-site verification; no UI work",
    "identity_rulings_date": "2026-10-27",
    "identity": IDENTITY,
    "owner_rulings": OWNER_RULINGS,
    "bio_material": BIO,
    "skills": {
        "evidenced": [{"name": n, "evidence": e, "confidence": c} for n, e, c in SKILLS_EVIDENCED],
        "claimed": [{"name": n, "source_id": s, "confidence": c} for n, s, c in SKILLS_CLAIMED],
    },
    "projects": P,
    "excluded_forks": FORKS_OUT,
    "deployments": DEPLOYMENTS,
    "education": EDUCATION,
    "experience": EXPERIENCE,
    "contact": CONTACT,
    "sources": SOURCES,
    "missing": MISSING,
    "conflicts": CONFLICTS,
    "counts": {
        "public_repos": len(REPOS),
        "forks_excluded": len(FORKS),
        "non_fork_repos": len(OWN),
        "counted_projects": len(P),
        "excluded_empty_repos": len(OWN) - len(P),
        "source_ids": ["src-002"],
    },
    "excluded_empty": [{"name": "Makuo_Ifedike", "repo_url": "https://github.com/lordwhitefire/Makuo_Ifedike",
                        "reason": "empty", "note": "Repository exists with size 0 and no commit/tree (API 409). Not a project."}],
    "workspace_captures": "scrape-workspace/captures/ (GitHub JSON, raw files, site DOM/screenshots, resume text)",
}

# ----------------------------------------------------------- validation -----
errors = []
for p in P:
    for sid in p["source_ids"]:
        if sid not in SRC_IDS:
            errors.append(f"{p['repo_name']} bad source {sid}")
for s in SOURCES:
    if not s["url"]:
        errors.append(f"{s['id']} empty url")
for c in CONFLICTS:
    for sid in c["source_ids"]:
        if sid not in SRC_IDS:
            errors.append(f"{c['id']} bad source {sid}")
for item in CONTACT["email_candidates"] + CONTACT["excluded_contact"]:
    for sid in item["source_ids"]:
        if sid not in SRC_IDS:
            errors.append(f"contact bad source {sid}")
if errors:
    raise SystemExit("SOURCE ERRORS:\n" + "\n".join(errors))

out = os.path.join(WS, "deliverables", "profile-data.json")
os.makedirs(os.path.dirname(out), exist_ok=True)
json.dump(DATA, open(out, "w"), indent=2, ensure_ascii=False)
print("wrote", out)
print("projects", len(P), "forks", len(FORKS_OUT), "sources", len(SOURCES))
