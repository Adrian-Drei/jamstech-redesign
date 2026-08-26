export const site = {
  name: "JAM's Tech",
  author: "James Adrian Merano",
  locale: "en_US",
  title: "JAM’s Tech | Full-Stack Developer",
  description:
    "Portfolio of James Adrian Merano, a full-stack developer building fast, accessible and conversion-ready web applications and business websites.",
  socialDescription:
    "Full-stack development focused on fast, accessible and conversion-ready digital products.",
  socialImage: "/og-image.png",
  socialImageAlt: "JAM’s Tech — Full-Stack Developer portfolio",
} as const;

export const normalizeSiteUrl = (value: string) => value.replace(/\/+$/, "");
