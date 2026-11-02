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
      problem: "",
      constraints: [],
      approach: [],
      outcome: "",
      liveLink: "",
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
      problem: "",
      constraints: [],
      approach: [],
      outcome: "",
      liveLink: "",
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
      problem: "",
      constraints: [],
      approach: [],
      outcome: "",
      liveLink: "",
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
      problem: "",
      constraints: [],
      approach: [],
      outcome: "",
      liveLink: "",
    },
  },
};
