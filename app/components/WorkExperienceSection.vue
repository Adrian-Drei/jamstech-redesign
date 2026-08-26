<script setup lang="ts">
import { workExperience } from "~/data/workExperience";

const expanded = ref(false);
const toggleButton = ref<HTMLButtonElement | null>(null);

async function toggleExperience() {
  const before = toggleButton.value?.getBoundingClientRect().top ?? 0;
  expanded.value = !expanded.value;
  await nextTick();
  if (!expanded.value) {
    const after = toggleButton.value?.getBoundingClientRect().top ?? before;
    window.scrollBy({ top: after - before, behavior: "auto" });
  }
}
</script>

<template>
  <section id="experience" class="section-shell scroll-mt-24">
    <div class="grid gap-14 lg:grid-cols-[.72fr_1.28fr] lg:gap-20">
      <div class="lg:sticky lg:top-28 lg:self-start">
        <p class="eyebrow">CAREER JOURNEY</p>
        <h2
          class="mt-5 text-4xl font-semibold leading-tight tracking-[-.04em] sm:text-5xl"
        >
          Experience built
          <br />
          through real products.
        </h2>
        <p class="mt-6 max-w-lg leading-7 text-slate-400">
          A professional journey spanning full-stack development, SEO, digital
          products and project management.
        </p>
        <div class="mt-10 rounded-xl border border-orange/35 bg-panel/50 p-7">
          <span
            class="grid size-10 place-items-center rounded-full bg-orange/10 text-xl text-orange"
            aria-hidden="true"
          >
            ◎
          </span>
          <p class="mt-5 text-3xl font-semibold">5+ years</p>
          <p class="mt-2 max-w-xs leading-7 text-slate-300">
            of professional experience across technology and project delivery.
          </p>
        </div>
        <a
          href="/Merano_CV.pdf"
          class="button-secondary mt-7 gap-3"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Download James Adrian Merano’s CV"
        >
          <span class="text-xl text-orange" aria-hidden="true">⇩</span>
          DOWNLOAD CV
        </a>
      </div>

      <div class="relative">
        <div
          class="absolute bottom-0 left-[7px] top-3 w-px bg-gradient-to-b from-orange via-orange/40 to-transparent sm:left-[11.7rem]"
          aria-hidden="true"
        ></div>
        <ol id="full-experience" class="divide-y divide-white/10">
          <li
            v-for="(role, index) in workExperience"
            v-show="index < 3 || expanded"
            :key="`${role.company}-${role.date}`"
            class="experience-entry relative grid gap-3 py-9 pl-9 first:pt-0 sm:grid-cols-[10rem_1fr] sm:gap-8 sm:pl-0"
          >
            <span
              class="absolute left-0 top-10 size-4 rounded-full border-4 border-ink bg-orange shadow-[0_0_16px_rgba(249,83,15,.9)] first:top-1 sm:left-[11.2rem]"
              aria-hidden="true"
            ></span>
            <time class="text-sm font-semibold text-orange sm:pt-1">
              {{ role.date }}
            </time>
            <article class="ml-5">
              <div class="flex flex-wrap items-center gap-3">
                <h3 class="text-xl font-semibold leading-tight sm:text-2xl">
                  {{ role.title }}
                </h3>
                <span
                  v-if="role.current"
                  class="rounded border border-orange/40 px-2.5 py-1 text-[10px] font-bold text-orange"
                >
                  CURRENT
                </span>
              </div>
              <p class="mt-3 text-base font-medium text-orange">
                {{ role.company }}
              </p>
              <p class="mt-4 leading-7 text-slate-300">{{ role.summary }}</p>
              <p
                class="mt-4 flex flex-wrap gap-x-3 gap-y-1 text-sm text-slate-400"
              >
                <template
                  v-for="(skill, skillIndex) in role.skills.slice(0, 3)"
                  :key="skill"
                >
                  <span>{{ skill }}</span>
                  <span
                    v-if="skillIndex < Math.min(role.skills.length, 3) - 1"
                    class="text-orange"
                    aria-hidden="true"
                  >
                    •
                  </span>
                </template>
              </p>
              <details
                class="group mt-5 rounded-lg border border-white/10 bg-white/[0.02] open:border-orange/25"
              >
                <summary
                  class="cursor-pointer list-none px-4 py-3 text-xs font-bold tracking-wide text-orange focus-visible:outline focus-visible:outline-2 focus-visible:outline-orange"
                >
                  VIEW DETAILS
                  <span
                    class="ml-1 inline-block transition group-open:rotate-45 motion-reduce:transition-none"
                    aria-hidden="true"
                  >
                    +
                  </span>
                </summary>
                <div class="border-t border-white/10 px-4 pb-5 pt-4">
                  <p v-if="role.address" class="text-sm text-slate-400">
                    <span class="text-orange" aria-hidden="true">⌖</span>
                    {{ role.address }}
                  </p>
                  <p
                    class="mt-4 text-xs font-bold uppercase tracking-widest text-slate-400"
                  >
                    Skills
                  </p>
                  <p class="mt-2 text-sm leading-6 text-slate-300">
                    {{ role.skills.join(" · ") }}
                  </p>
                  <ul class="mt-5 space-y-3 text-sm leading-6 text-slate-300">
                    <li
                      v-for="highlight in role.highlights"
                      :key="highlight"
                      class="flex gap-3"
                    >
                      <span
                        class="mt-2 size-1.5 shrink-0 rounded-full bg-orange"
                        aria-hidden="true"
                      ></span>
                      <span>{{ highlight }}</span>
                    </li>
                  </ul>
                </div>
              </details>
            </article>
          </li>
        </ol>
        <button
          ref="toggleButton"
          type="button"
          class="button-secondary ml-9 mt-7 min-h-12 sm:ml-[13.2rem]"
          aria-controls="full-experience"
          :aria-expanded="expanded"
          @click="toggleExperience"
        >
          {{ expanded ? "SHOW LESS" : "VIEW FULL EXPERIENCE" }}
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.experience-entry {
  animation: experience-in 0.5s ease both;
}
.experience-entry:nth-child(2) {
  animation-delay: 0.08s;
}
.experience-entry:nth-child(3) {
  animation-delay: 0.16s;
}
@keyframes experience-in {
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}
@media (prefers-reduced-motion: reduce) {
  .experience-entry {
    animation: none;
  }
}
</style>
