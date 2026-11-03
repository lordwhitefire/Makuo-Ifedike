import { buildPersonJsonLd, identity } from "@/content/identity";
import { projects } from "@/content/projects";
import type { Project, ProjectSlug } from "@/types/project";

const personId = `${identity.url}#person`;
const websiteId = `${identity.url}#website`;
const profilePageId = `${identity.url}#profilepage`;

type ProjectNodeType = "SoftwareApplication" | "CreativeWork";

const projectNodeConfig: Record<
  ProjectSlug,
  { id: string; type: ProjectNodeType }
> = {
  truespec: {
    id: `${identity.url}#project-truespec`,
    type: "SoftwareApplication",
  },
  athletica: {
    id: `${identity.url}#project-athletica`,
    type: "SoftwareApplication",
  },
  "interior-deco": {
    id: `${identity.url}#project-interior-deco`,
    type: "CreativeWork",
  },
  "cp3-legacy": {
    id: `${identity.url}#project-cp3-legacy`,
    type: "CreativeWork",
  },
};

function projectDescription(project: Project): string {
  const approach = project.caseStudy.approach.join("; ");
  return `${project.caseStudy.problem} ${approach}.`;
}

function projectStatus(project: Project): string {
  return project.status === "live" ? "Live" : "In progress";
}

function buildProjectNode(slug: ProjectSlug) {
  const project = projects[slug];
  const config = projectNodeConfig[slug];
  const node: Record<string, unknown> = {
    "@type": config.type,
    "@id": config.id,
    name: project.name,
    description: projectDescription(project),
    url: project.liveUrl,
    codeRepository: project.repoUrl,
    creator: { "@id": personId },
    author: { "@id": personId },
    dateCreated: project.dates.created,
    inLanguage: "en",
    additionalProperty: {
      "@type": "PropertyValue",
      name: "Status",
      value: projectStatus(project),
    },
  };

  if (config.type === "SoftwareApplication") {
    node.applicationCategory = project.category;
    node.operatingSystem = "Web";
  }

  return node;
}

export function buildStructuredData() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      buildPersonJsonLd(),
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: identity.url,
        name: "Makuo Ifedike — Portfolio",
        alternateName: "Makuo Ifedike Portfolio",
        publisher: { "@id": personId },
        about: { "@id": personId },
        inLanguage: "en",
      },
      {
        "@type": "ProfilePage",
        "@id": profilePageId,
        url: identity.url,
        name: "Makuo Ifedike — Portfolio",
        mainEntity: { "@id": personId },
        about: { "@id": personId },
        inLanguage: "en",
      },
      buildProjectNode("truespec"),
      buildProjectNode("athletica"),
      buildProjectNode("interior-deco"),
      buildProjectNode("cp3-legacy"),
    ],
  };
}
