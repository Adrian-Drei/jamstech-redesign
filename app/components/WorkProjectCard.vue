<script setup lang="ts">
import type { Project } from "~/data/projects";
withDefaults(defineProps<{ project: Project; headingLevel?: "h2" | "h3" }>(), {
  headingLevel: "h2",
});
</script>
<template>
  <article
    class="group project-surface overflow-hidden p-3 flex flex-col justify-between sm:p-4"
  >
    <div>
      <ProjectPreview
        :variant="project.preview"
        :title="project.title"
        :image="project.image"
      />
      <component :is="headingLevel" class="text-xl mb-3 mt-5 font-semibold">
        {{ project.title }}
      </component>
      <span
        v-if="project.badge"
        class="mt-3 w-fit rounded border border-orange/40 px-2 py-1 text-[10px] font-semibold text-orange"
      >
        {{ project.badge }}
      </span>
      <p class="mt-4 text-sm text-slate-300">{{ project.type }}</p>
      <p class="mt-3 text-sm leading-6 text-slate-400">
        {{ project.description }}
      </p>
      <p class="mt-4 text-xs leading-5 text-slate-400">
        {{ project.stack.join(" · ") }}
      </p>
    </div>
    <a
      v-if="project.url"
      class="project-link mt-auto pt-7"
      :href="project.url"
      target="_blank"
      rel="noopener noreferrer"
      :aria-label="`View ${project.title} project (opens in a new tab)`"
    >
      VIEW PROJECT ↗
    </a>
  </article>
</template>
