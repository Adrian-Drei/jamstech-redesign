const siteUrl = (process.env.NUXT_PUBLIC_SITE_URL || "https://jamstech.vercel.app").replace(/\/+$/, "");
const facebookAppId = process.env.NUXT_PUBLIC_FACEBOOK_APP_ID || "";
const isPreview = Boolean(process.env.VERCEL_ENV && process.env.VERCEL_ENV !== "production");

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: [
    "@nuxt/eslint",
    "@nuxt/icon",
    "@nuxt/image",
    "@nuxtjs/tailwindcss",
    "@nuxtjs/supabase",
  ],
  css: ["~/assets/css/main.css"],
  runtimeConfig: {
    public: { siteUrl, facebookAppId, isPreview },
  },
  routeRules: isPreview
    ? { "/**": { headers: { "X-Robots-Tag": "noindex, nofollow" } } }
    : {},
  app: {
    head: {
      htmlAttrs: { lang: "en" },
      title: "JAM’s Tech | Full-Stack Developer",
      titleTemplate: (titleChunk) => titleChunk || "JAM’s Tech | Full-Stack Developer",
      link: [
        { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
        { rel: "icon", sizes: "any", href: "/favicon.ico" },
        { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32x32.png" },
        { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
        { rel: "manifest", href: "/site.webmanifest" },
      ],
      meta: [
        { name: "theme-color", content: "#07111B" },
        { name: "color-scheme", content: "dark" },
      ],
    },
  },
  supabase: {
    redirect: false,
  },
});
