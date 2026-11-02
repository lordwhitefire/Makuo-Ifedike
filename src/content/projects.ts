import type { Project, ProjectSlug } from "@/types/project";

export const displayOrder: ProjectSlug[] = [
  "interior-deco",
  "truespec",
  "athletica",
  "cp3-legacy",
];

export const projects: Record<ProjectSlug, Project> = {
  truespec: {
    name: "Truespec",
    slug: "truespec",
    summary:
      "Public showroom plus a single-owner private office for inventory, enquiries, costs and profit — for a Nigerian vehicle-import business.",
    category: "Web app",
    filter: "web-app",
    status: "live",
    featured: true,
    dates: { created: "2026-10-16" },
    stack: ["Next.js", "React", "TypeScript", "Neon Postgres", "Clerk", "Sanity", "Vercel"],
    repoUrl: "https://github.com/lordwhitefire/truespec",
    liveUrl: "https://truespec-k4y6.vercel.app/",
    images: {
      card: "/projects/work/truespec.png",
      hero: "/projects/truespec.png",
    },
    testimonial: null,
    caseStudy: {
      problem:
        "A Nigerian vehicle-import business needed one place to show cars publicly and manage inventory privately — without admin friction.",
      constraints: [
        "Public buyers see only cleared cars",
        "Staff edit inventory without touching public data",
        "Built for one owner, not a team",
        "Enquiries arrive as PDFs",
      ],
      approach: [
        "Public showroom (home, inventory, car detail, privacy) plus a single-owner private office (dashboard, inventory CRUD, drafts, enquiries, settings) on one codebase",
        "Server-side serializer enforces the public/private boundary",
        "PDF enquiry import",
        "WhatsApp tap tracking",
        "One-owner auth",
      ],
      outcome:
        "Working dealership system — public showroom + private office — live as the flagship project.",
      liveLink: "https://truespec-k4y6.vercel.app/",
    },
  },
  "interior-deco": {
    name: "Interior-deco",
    slug: "interior-deco",
    summary: "CMS-driven marketing website for the Whitefire Interior brand.",
    category: "Marketing site",
    filter: "marketing-site",
    status: "live",
    featured: false,
    dates: { created: "2024-01-03" },
    stack: ["Remix", "React", "TypeScript", "Tailwind CSS", "Sanity", "Swiper", "Vercel"],
    repoUrl: "https://github.com/lordwhitefire/interior-deco",
    liveUrl: "https://interior-deco-kappa.vercel.app/",
    images: {
      card: "/projects/work/interior-deco.png",
      hero: "/projects/interior-deco.png",
    },
    testimonial: null,
    caseStudy: {
      problem:
        "The Whitefire Interior brand needed a CMS-driven marketing site that turns visits into enquiries.",
      constraints: [
        "Services, projects, blog, team, FAQ, contact, newsletter",
        "Brand-led layout",
        "Project's brand ('Whitefire Interior'), not the owner's studio — not a confirmed client engagement",
      ],
      approach: [
        "Public marketing pages: services section, project gallery, blog, team, testimonials, FAQ, contact form, newsletter signup",
      ],
      outcome:
        "CMS-driven marketing website for Whitefire Interior — live.",
      liveLink: "https://interior-deco-kappa.vercel.app/",
    },
  },
  athletica: {
    name: "Athletica",
    slug: "athletica",
    summary:
      "Football store and affiliate commerce platform built for a friend's affiliate business — client work, not the owner's own product.",
    category: "Football store",
    filter: "web-app",
    status: "in-progress",
    featured: false,
    dates: { created: "2026-03-31" },
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Supabase", "Sanity", "Sentry", "Vitest", "Vercel"],
    repoUrl: "https://github.com/lordwhitefire/athletica",
    liveUrl: "https://athletica-blond.vercel.app/",
    images: {
      card: "/projects/work/athletica.png",
      hero: "/projects/athletica.png",
    },
    testimonial: null,
    caseStudy: {
      problem:
        "A friend running an affiliate football business needed a storefront customers could buy from, plus an admin they could run themselves.",
      constraints: [
        "Public storefront (catalogue, cart, checkout, accounts, orders)",
        "Private admin (products, media, orders, affiliate settings)",
        "Client work for a friend's affiliate business — not the owner's product",
      ],
      approach: [
        "Public catalogue (brands, categories, models)",
        "Search, cart, checkout, order history",
        "Customer accounts (login, password recovery)",
        "Admin for products, brands, models, categories, media, homepage, navigation",
        "Bulk catalogue import",
        "Traffic, product, and affiliate analytics",
        "Amazon affiliate settings and generated URLs",
      ],
      outcome:
        "Football store and affiliate commerce platform — live preview; client work for a friend's affiliate business.",
      liveLink: "https://athletica-blond.vercel.app/",
    },
  },
  "cp3-legacy": {
    name: "CP3-legacy",
    slug: "cp3-legacy",
    summary:
      "Chris Paul fan site / sports experience — news, statistics, biography, gallery, shop, account and wishlist.",
    category: "Fan site / sports experience",
    filter: "web-app",
    status: "in-progress",
    featured: false,
    dates: { created: "2025-12-03" },
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "shadcn/ui", "Sanity", "Prisma", "next-auth", "Vercel"],
    repoUrl: "https://github.com/lordwhitefire/cp3-legacy",
    liveUrl: "https://cp3-legacy.vercel.app/",
    images: {
      card: "/projects/work/cp3-legacy.png",
      hero: "/projects/cp3-legacy.png",
    },
    testimonial: null,
    caseStudy: {
      problem:
        "Chris Paul fans needed one destination for news, statistics, biography, gallery, shop, account, and wishlist.",
      constraints: [
        "Live fan destination",
        "Not an official affiliation with Chris Paul or any athlete",
        "Shop, account, and wishlist features",
      ],
      approach: [
        "News, player overview, full statistics, biography, gallery, shop, account, wishlist — one fan site",
      ],
      outcome:
        "Chris Paul fan site / sports experience — live, no official athlete affiliation.",
      liveLink: "https://cp3-legacy.vercel.app/",
    },
  },
};
