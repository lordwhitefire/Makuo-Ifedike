export type ProjectSlug =
  | "interior-deco"
  | "truespec"
  | "athletica"
  | "cp3-legacy";

export type ProjectStatus = "live" | "in-progress";
export type ProjectFilter = "marketing-site" | "web-app";

export interface ProjectDates {
  created: string;
}

export interface ProjectCaseStudy {
  problem: string;
  constraints: string[];
  approach: string[];
  outcome: string;
  liveLink: string;
}

export interface Project {
  name: string;
  slug: ProjectSlug;
  summary: string;
  category: string;
  filter: ProjectFilter;
  status: ProjectStatus;
  featured: boolean;
  dates: ProjectDates;
  stack: string[];
  repoUrl: string;
  liveUrl: string;
  images: {
    card: string;
    hero: string;
  };
  testimonial: string | null;
  caseStudy: ProjectCaseStudy;
}
