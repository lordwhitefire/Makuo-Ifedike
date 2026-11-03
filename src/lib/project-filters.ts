import { displayOrder, projects } from "@/content/projects";
import type { Project, ProjectFilter } from "@/types/project";

export type WorkTabId = "all" | ProjectFilter | "in-progress";

export interface WorkTab {
  id: WorkTabId;
  label: string;
}

export const WORK_TABS: readonly WorkTab[] = [
  { id: "all", label: "All" },
  { id: "marketing-site", label: "marketing site" },
  { id: "web-app", label: "web app" },
  { id: "in-progress", label: "in-progress" },
];

export function filterProjects(tab: WorkTabId): Project[] {
  const ordered = displayOrder.map((slug) => projects[slug]);

  switch (tab) {
    case "all":
      return ordered;
    case "in-progress":
      return ordered.filter((project) => project.status === "in-progress");
    default:
      return ordered.filter((project) => project.filter === tab);
  }
}
