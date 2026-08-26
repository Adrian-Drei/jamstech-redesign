<script setup lang="ts">
import type { Project } from "~/data/projects";
defineProps<{ project: Project }>();
</script>
<template>
  <article class="group project-surface grid overflow-hidden p-3 sm:grid-cols-[1.45fr_.75fr] sm:p-4"><ProjectPreview :variant="project.preview" :title="project.title" /><div class="flex flex-col px-2 py-5 sm:px-5 sm:py-3"><h2 class="text-xl font-semibold">{{ project.title }}</h2><span v-if="project.badge" class="mt-2 w-fit rounded border border-orange/40 px-2 py-1 text-[10px] font-semibold text-orange">{{ project.badge }}</span><p class="mt-4 text-sm text-slate-300">{{ project.type }}</p><p class="mt-3 text-sm leading-6 text-slate-400">{{ project.description }}</p><p class="mt-4 text-xs leading-5 text-slate-400">{{ project.stack.join(' · ') }}</p><a v-if="project.url" class="project-link mt-auto pt-7" :href="project.url" target="_blank" rel="noopener noreferrer" :aria-label="`View ${project.title} project (opens in a new tab)`">VIEW PROJECT ↗</a></div></article>
</template>
