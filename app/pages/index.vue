<script setup lang="ts">
definePageMeta({ layout: "default" });
const { canonicalUrl } = useSiteSeo({
  path: "/",
  title: "JAM’s Tech | Full-Stack Developer",
  description: "James Adrian Merano is a full-stack developer building fast, accessible and conversion-ready web applications, business websites and digital experiences.",
  socialDescription: "Full-stack development focused on fast, accessible and conversion-ready digital products.",
});

useHead({
  script: [{
    key: "homepage-schema",
    type: "application/ld+json",
    innerHTML: JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Person",
          name: "James Adrian Merano",
          url: canonicalUrl,
          jobTitle: "Full-Stack Developer",
          sameAs: [
            "https://www.linkedin.com/in/james-adrian-merano-3932891b2/",
          ],
        },
        {
          "@type": "WebSite",
          name: "JAM's Tech",
          url: canonicalUrl,
          description: "Portfolio of full-stack developer James Adrian Merano.",
        },
      ],
    }),
  }],
});
</script>
<template><div class="min-h-screen overflow-x-clip bg-ink text-warm-white"><SiteHeader/><main><HeroSection/><SelectedWork/><ServicesSection/><AboutTechSection/><WorkExperienceSection/><TechStackSection/><ContactCta/></main><SiteFooter/></div></template>
