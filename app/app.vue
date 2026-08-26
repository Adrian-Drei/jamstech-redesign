<script setup lang="ts">
import { site } from "~/config/site";

useSeoMeta({
  description: site.description,
  author: site.author,
  robots: "index, follow",
  ogSiteName: site.name,
  ogLocale: site.locale,
  ogType: "website",
  twitterCard: "summary_large_image",
});
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
