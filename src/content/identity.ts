export interface Identity {
  name: string;
  legalName: string;
  alternateName: string[];
  url: string;
  image: string;
  jobTitle: string;
  description: string;
  address: {
    addressLocality: string;
    addressRegion: string;
    addressCountry: string;
  };
  knowsAbout: string[];
  sameAs: string[];
  email: string;
  alumniOf: {
    name: string;
  };
  education: {
    institution: string;
    degree: string;
    started: string;
    ended: string;
  };
}

export const identity: Identity = {
  name: "Makuo Ifedike",
  legalName: "Victor Makuo Ifedike",
  alternateName: [
    "Victor Makuo Ifedike",
    "Ifedike Victor",
    "Ifedike Victor Makuo",
    "lordwhitefire",
    "makuoifedike",
    "lwhitefire",
  ],
  url: "https://makuo-ifedike.vercel.app/",
  image: "https://makuo-ifedike.vercel.app/images/portrait.png",
  jobTitle: "Frontend Engineer — Freelance",
  description:
    "Web Developer | BOS Brigade. Self-taught developer in Onitsha, Anambra State, Nigeria, building for the web since July 2022 with Next.js, Remix, TypeScript, Sanity and Postgres. X: @lwhitefire.",
  address: {
    addressLocality: "Onitsha and Awka",
    addressRegion: "Anambra State",
    addressCountry: "Nigeria",
  },
  knowsAbout: [
    "Next.js",
    "React",
    "Remix",
    "TypeScript",
    "Tailwind CSS",
    "Sanity",
    "Supabase",
    "Neon Postgres",
    "Prisma",
    "Clerk",
    "next-auth",
    "Vercel",
    "Astro",
    "Python",
    "FastAPI",
    "LangGraph",
    "HTML",
    "CSS",
    "JavaScript",
  ],
  sameAs: [
    "https://github.com/lordwhitefire",
    "https://x.com/lwhitefire",
    "https://www.linkedin.com/in/makuoifedike/",
  ],
  email: "mifedike@gmail.com",
  alumniOf: { name: "Nnamdi Azikiwe University" },
  education: {
    institution: "Nnamdi Azikiwe University",
    degree: "Bachelor of Engineering",
    started: "2019-08",
    ended: "2025-08",
  },
};

/**
 * Build the Person JSON-LD object for the portfolio head.
 * The legal name appears in structured data only — never as page title/H1.
 * No phone/WhatsApp anywhere.
 */
export function buildPersonJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${identity.url}#person`,
    name: identity.name,
    legalName: identity.legalName,
    alternateName: identity.alternateName,
    url: identity.url,
    image: identity.image,
    jobTitle: identity.jobTitle,
    description: identity.description,
    address: {
      "@type": "PostalAddress",
      ...identity.address,
    },
    knowsAbout: identity.knowsAbout,
    sameAs: identity.sameAs,
    email: identity.email,
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: identity.alumniOf.name,
    },
  };
}
