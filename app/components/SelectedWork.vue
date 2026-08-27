<script setup lang="ts">
import { projects } from "~/data/projects";
const previewProjects = projects.filter((project) =>
  ["lionspriderx", "totalmalerx", "travel-ai-planner"].includes(project.slug),
);
</script>
<template>
  <section id="work" class="section-shell scroll-mt-24">
    <div class="flex items-end justify-between gap-5">
      <div>
        <p class="eyebrow">Selected work</p>
        <h2 class="section-title">Selected Work</h2>
      </div>
      <NuxtLink class="project-link" to="/work">VIEW ALL WORK →</NuxtLink>
    </div>
    <article
      class="project-surface mt-9 grid overflow-hidden lg:grid-cols-[1.2fr_.8fr]"
    >
      <ProjectPreview
        variant="webonova"
        title="Webonova"
        image="/images/projects/webonova.png"
      />
      <div class="flex flex-col justify-center p-7 sm:p-10">
        <h3 class="text-3xl font-semibold">Webonova</h3>
        <p class="mt-2 text-sm text-orange">
          Web Design &amp; Development
        </p>
        <p class="mt-7 text-xl leading-8 text-slate-300">
          Modern websites for ambitious businesses.
        </p>
        <p class="mt-7 text-sm text-slate-400">
          Nuxt · Tailwind CSS · Responsive Development
        </p>
        <a
          class="project-link mt-8"
          href="https://www.webonova.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          VISIT WEBONOVA.COM ↗
        </a>
      </div>
    </article>
    <div class="mt-4 grid gap-4 lg:grid-cols-2">
      <WorkProjectCard
        v-for="project in previewProjects"
        :key="project.slug"
        :project="project"
        heading-level="h3"
      />
    </div>
  </section>
</template>
