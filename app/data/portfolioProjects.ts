import type { Project } from "./projects";

type SourceProject = [
  title: string,
  slug: string,
  type: string,
  stack: string[],
  url: string,
  image: string,
  client?: boolean,
];

const sourceProjects: SourceProject[] = [
  [
    "TotalMaleRx Blogs",
    "totalmalerx-blogs",
    "Health Content Platform",
    ["WordPress"],
    "https://www.totalmalerx.com/blog",
    "33.png",
    true,
  ],
  [
    "TotalMaleRx",
    "totalmalerx",
    "Telehealth Platform",
    ["Vue", "Nuxt", "Laravel", "Tailwind CSS"],
    "https://totalmalerx.com/",
    "32.png",
    true,
  ],
  [
    "USA Cellucor Supplements Maxx",
    "usa-cellucor-supplements-maxx",
    "E-commerce Website",
    ["Laravel", "Livewire", "Alpine.js", "Tailwind CSS"],
    "https://usacellucorsupplementsmaxx.com/",
    "31.png",
    true,
  ],
  [
    "Pure Essence Nutrition",
    "pure-essence-nutrition",
    "E-commerce Website",
    ["Laravel", "Livewire", "Alpine.js", "Tailwind CSS"],
    "https://www.pureessencenutrition.com/",
    "30.png",
    true,
  ],
  [
    "Mens Virility Performance Blends Igniter",
    "mens-virility",
    "E-commerce Website",
    ["Laravel", "Livewire", "Alpine.js", "Tailwind CSS"],
    "https://mensvirilityperformanceblendsigniter.com/",
    "29.png",
    true,
  ],
  [
    "Natural Maxx Enhancer",
    "natural-maxx-enhancer",
    "E-commerce Website",
    ["Laravel", "Livewire", "Alpine.js", "Tailwind CSS"],
    "https://naturalmaxxenhancer.com/",
    "28.png",
    true,
  ],
  [
    "Alpha Male Fitness Drive",
    "alpha-male-fitness-drive",
    "E-commerce Website",
    ["Laravel", "Livewire", "Alpine.js", "Tailwind CSS"],
    "https://alphamalefitnessdrive.com/",
    "27.png",
    true,
  ],
  [
    "USA Men's Lifestyle Power",
    "usa-mens-lifestyle-power",
    "E-commerce Website",
    ["Laravel", "Livewire", "Alpine.js", "Tailwind CSS"],
    "https://usamenslifestylepower.com/",
    "26.png",
    true,
  ],
  [
    "SizeBiotic",
    "sizebiotic",
    "E-commerce Website",
    ["Laravel", "Livewire", "Alpine.js", "Tailwind CSS"],
    "https://sizebiotic.com/sizebiotic",
    "25.png",
    true,
  ],
];

const descriptions: Record<string, string> = {
  "totalmalerx-blogs":
    "A men's health publication covering telehealth, treatments and expert guidance.",
  totalmalerx:
    "A telehealth platform for consultations, prescriptions and men's health treatments.",
  mines:
    "A grid-based game with configurable bets, multipliers and persistent balance settings.",
  walkclub:
    "An interactive marketing site with offer banners, onboarding guides and swipeable content.",
  "winner-picker":
    "A scheduled daily draw with animated backgrounds and a confetti winner reveal.",
  network:
    "A Django social network where people can publish posts, follow users and like content.",
  commerce:
    "A Django auction marketplace with listings, categories, accounts and product detail flows.",
  workout:
    "A Django routine tracker with timed exercises, sets, repetitions and rest periods.",
};

export const portfolioProjects: Project[] = sourceProjects.map(
  ([title, slug, type, stack, url, image, client]) => ({
    slug,
    title,
    type,
    stack,
    url,
    image: `/images/projects/${image}`,
    preview: "image",
    badge: client ? "CLIENT PROJECT" : "PERSONAL PROJECT",
    categories: client
      ? ["client-work", "web-application"]
      : ["web-application"],
    description:
      descriptions[slug] ??
      `A responsive ${type.toLowerCase()} focused on clear navigation and a polished user experience.`,
  }),
);
