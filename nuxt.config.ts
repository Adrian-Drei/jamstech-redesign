// https://nuxt.com/docs/api/configuration/nuxt-config
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
  app: {
    head: {
      htmlAttrs: { lang: "en" },
      title: "JAM's Tech — James Adrian Merano",
      meta: [
        {
          name: "description",
          content:
            "James Adrian Merano builds fast, accessible and conversion-ready digital products.",
        },
        { property: "og:title", content: "JAM's Tech — James Adrian Merano" },
        { property: "og:description", content: "Digital products that feel as good as they perform." },
        { property: "og:image", content: "/og.png" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: "JAM's Tech — James Adrian Merano" },
        { name: "twitter:description", content: "Digital products that feel as good as they perform." },
        { name: "twitter:image", content: "/og.png" },
      ],
    },
  },
  supabase: {
    redirect: false,
  },
});
