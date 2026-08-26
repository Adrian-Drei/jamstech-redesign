<script setup lang="ts">
import { projects, type ProjectCategory } from "~/data/projects";

definePageMeta({ layout: "default" });
const { canonicalUrl } = useSiteSeo({
  path: "/work",
  title: "Selected Work | James Adrian Merano",
  description:
    "Explore selected web applications, business websites and digital experiences designed and developed by James Adrian Merano.",
  socialDescription:
    "Selected web applications, business websites and digital experiences by James Adrian Merano.",
});

type FilterValue = "all" | ProjectCategory;
const filters: { label: string; value: FilterValue }[] = [
  { label: "All", value: "all" },
  { label: "Client Work", value: "client-work" },
  { label: "Web Applications", value: "web-application" },
  { label: "Business Websites", value: "business-website" },
  // { label: "Templates", value: "template" },
];
const activeFilter = ref<FilterValue>("all");
const featured = projects.find((project) => project.featured)!;
const visibleProjects = computed(() =>
  projects.filter(
    (project) =>
      !project.featured &&
      (activeFilter.value === "all" ||
        project.categories.includes(activeFilter.value)),
  ),
);
const showFeatured = computed(
  () =>
    activeFilter.value === "all" ||
    featured.categories.includes(activeFilter.value as ProjectCategory),
);

useHead({
  script: [
    {
      key: "work-schema",
      type: "application/ld+json",
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: "Selected Work | James Adrian Merano",
        url: canonicalUrl,
        mainEntity: {
          "@type": "ItemList",
          itemListElement: projects.map((project, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: project.title,
            description: project.description,
            ...(project.url ? { url: project.url } : {}),
          })),
        },
      }),
    },
  ],
});
</script>

<template>
  <div class="min-h-screen overflow-x-clip bg-ink text-warm-white">
    <SiteHeader />
    <main>
      <section
        class="relative mx-auto max-w-7xl overflow-hidden px-5 pb-10 pt-20 sm:px-8 sm:pb-14 sm:pt-24"
      >
        <div class="relative z-10 max-w-2xl">
          <p class="eyebrow">SELECTED PROJECTS</p>
          <h1
            class="mt-4 text-[clamp(3rem,6vw,5.5rem)] font-semibold leading-[.98] tracking-[-.055em]"
          >
            Work that solves
            <br />
            real problems.
          </h1>
          <p
            class="mt-7 max-w-xl text-base leading-7 text-slate-400 sm:text-lg"
          >
            A collection of platforms, business websites and digital experiences
            designed to perform.
          </p>
        </div>
        <div
          class="work-orbit pointer-events-none absolute -right-24 top-4 hidden h-[340px] w-[55%] opacity-60 md:block"
          aria-hidden="true"
        >
          <i
            v-for="n in 7"
            :key="n"
            :style="{ inset: `${n * 18}px`, transform: `rotate(${n * 7}deg)` }"
          ></i>
          <b
            v-for="n in 18"
            :key="`node-${n}`"
            :style="{
              left: `${8 + ((n * 29) % 88)}%`,
              top: `${10 + ((n * 37) % 78)}%`,
            }"
          ></b>
        </div>
      </section>

      <section class="mx-auto max-w-7xl px-5 pb-20 sm:px-8">
        <div
          class="flex gap-2 overflow-x-auto pb-4"
          role="group"
          aria-label="Filter projects"
        >
          <button
            v-for="filter in filters"
            :key="filter.value"
            type="button"
            class="shrink-0 rounded-full border px-5 py-2.5 text-xs font-medium transition motion-reduce:transition-none"
            :class="
              activeFilter === filter.value
                ? 'border-orange bg-orange text-white'
                : 'border-white/15 text-slate-300 hover:border-orange/50 hover:text-white'
            "
            :aria-pressed="activeFilter === filter.value"
            @click="activeFilter = filter.value"
          >
            {{ filter.label }}
          </button>
        </div>

        <TransitionGroup name="projects" tag="div" class="mt-3 grid gap-4">
          <article
            v-if="showFeatured"
            key="featured"
            class="project-surface grid overflow-hidden p-4 lg:grid-cols-[.68fr_1.32fr] lg:p-6"
          >
            <div class="flex flex-col justify-center p-3 sm:p-7">
              <p
                class="text-[10px] font-bold uppercase tracking-wide text-orange"
              >
                CURRENT COMPANY · WEB DESIGN &amp; DEVELOPMENT
              </p>
              <h2 class="mt-4 text-4xl font-semibold">Webonova</h2>
              <p class="mt-6 text-2xl leading-8 text-slate-300">
                Modern websites for ambitious businesses.
              </p>
              <p class="mt-6 text-sm text-slate-400">
                {{ featured.stack.join(" · ") }}
              </p>
              <p class="mt-5 text-sm text-slate-400">▣ {{ featured.year }}</p>
              <a
                class="button-primary mt-7 w-fit"
                :href="featured.url"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View Webonova project (opens in a new tab)"
              >
                VIEW PROJECT ↗
              </a>
            </div>
            <ProjectPreview
              variant="webonova"
              title="Webonova"
              :image="featured.image"
            />
          </article>
          <div
            v-if="visibleProjects.length"
            key="grid"
            class="grid gap-4 lg:grid-cols-2"
          >
            <WorkProjectCard
              v-for="project in visibleProjects"
              :key="project.slug"
              :project="project"
            />
          </div>
          <div
            v-if="!showFeatured && !visibleProjects.length"
            key="empty"
            class="project-surface p-12 text-center text-slate-400"
          >
            No projects are currently listed in this category.
          </div>
        </TransitionGroup>

        <section
          class="mt-8 flex flex-col gap-5 rounded-xl border border-white/10 px-7 py-8 sm:flex-row sm:items-center sm:px-12"
        >
          <span class="text-4xl text-orange" aria-hidden="true">◎</span>
          <div>
            <h2 class="text-xl font-semibold sm:text-2xl">
              Every project starts with a real goal—not a trend.
            </h2>
            <p class="mt-2 text-sm leading-6 text-slate-400">
              Clear strategy, thoughtful design and dependable development from
              first idea to launch.
            </p>
          </div>
        </section>
        <section
          id="contact"
          class="relative mt-8 overflow-hidden rounded-xl border border-orange/50 bg-gradient-to-r from-[#8c2605] via-[#6d2108] to-[#28130e] px-7 py-10 sm:px-12"
        >
          <div
            class="relative z-10 flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <h2 class="text-2xl font-semibold sm:text-3xl">
                Have a project worth building?
              </h2>
              <p class="mt-3 max-w-xl text-sm leading-6 text-orange-100/80">
                Tell me what you’re working on and let’s find the right way to
                bring it to life.
              </p>
            </div>
            <a
              class="button-primary shrink-0"
              href="mailto:webonovasupport@gmail.com"
            >
              START A CONVERSATION →
            </a>
          </div>
          <div
            class="pointer-events-none absolute inset-y-0 right-0 w-1/2 bg-[radial-gradient(circle_at_center,rgba(255,133,60,.2)_1px,transparent_1.5px)] bg-[length:14px_14px] opacity-40"
            aria-hidden="true"
          ></div>
        </section>
      </section>
    </main>
    <SiteFooter />
  </div>
</template>

<style scoped>
.work-orbit i {
  position: absolute;
  border: 1px solid rgba(249, 83, 15, 0.35);
  border-radius: 50%;
}
.work-orbit b {
  position: absolute;
  width: 4px;
  height: 4px;
  border-radius: 999px;
  background: #ff5a1f;
  box-shadow: 0 0 12px #ff5a1f;
}
.projects-enter-active,
.projects-leave-active {
  transition:
    opacity 0.22s ease,
    transform 0.22s ease;
}
.projects-enter-from,
.projects-leave-to {
  opacity: 0;
  transform: translateY(8px);
}
@media (prefers-reduced-motion: reduce) {
  .projects-enter-active,
  .projects-leave-active {
    transition: none;
  }
}
</style>
