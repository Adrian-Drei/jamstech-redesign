import { portfolioProjects } from "./portfolioProjects";

export type ProjectCategory =
  | "client-work"
  | "web-application"
  | "business-website"
  | "template";

export interface Project {
  slug: string;
  title: string;
  description: string;
  type: string;
  categories: ProjectCategory[];
  stack: string[];
  url?: string;
  year?: string;
  badge?: string;
  featured?: boolean;
  image?: string;
  preview: string;
}

export const projects: Project[] = [
  {
    slug: "webonova",
    title: "Webonova",
    description: "Modern websites for ambitious businesses.",
    type: "Web Design & Development",
    categories: ["business-website", "web-application"],
    stack: ["Nuxt", "Tailwind CSS", "Responsive Development"],
    url: "https://www.webonova.com/",
    year: "2026",
    badge: "CURRENT COMPANY",
    featured: true,
    preview: "webonova",
    image: "/images/projects/webonova.png",
  },
  {
    slug: "lionspriderx",
    title: "LionsPrideRX",
    description:
      "A telehealth platform for doctor consultations, prescriptions and men's health treatments.",
    type: "Telehealth Platform",
    categories: ["client-work", "web-application"],
    stack: ["Vue", "Nuxt", "Laravel", "Tailwind CSS"],
    url: "https://lionspriderx.com/",
    badge: "CLIENT PROJECT",
    preview: "medical",
    image: "/images/projects/34.png",
  },
  
  ...portfolioProjects,
];
