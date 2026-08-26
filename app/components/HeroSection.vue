<script setup lang="ts">
import HeroThreeScene from "./HeroThreeScene.client.vue";
</script>

<template>
  <section id="top" class="relative mx-auto grid min-h-[calc(100svh-72px)] max-w-7xl items-center gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[.9fr_1.1fr] lg:py-12">
    <div class="relative z-10">
      <p class="mb-5 text-xs font-semibold uppercase tracking-[0.22em] text-slate-300 sm:text-sm">
        James Adrian Merano
      </p>
      <h1 class="max-w-2xl text-[clamp(3rem,5.5vw,5rem)] font-semibold leading-[1.05] tracking-[-.05em]">I build digital products that feel as good as they perform.</h1>
      <p class="mt-7 max-w-xl text-base leading-7 text-slate-400 sm:text-lg">Full-stack developer focused on fast, accessible and conversion-ready web experiences.</p>
      <div class="mt-9 flex flex-col gap-3 sm:flex-row">
        <NuxtLink to="/work" class="button-primary text-center">VIEW SELECTED WORK <span aria-hidden="true">→</span></NuxtLink>
        <a href="#contact" class="button-secondary text-center">LET'S WORK TOGETHER</a>
      </div>
      <p class="mt-7 flex items-center gap-3 text-xs font-semibold tracking-wide text-slate-300"><span class="size-2.5 rounded-full bg-emerald-500 shadow-[0_0_14px_rgba(16,185,129,.7)]"></span>OPEN TO NEW OPPORTUNITIES</p>
    </div>
    <div class="col-start-1 row-start-2 mt-2 lg:col-start-2 lg:row-start-1 lg:mt-0">
      <ClientOnly>
        <HeroThreeScene />
        <template #fallback>
          <div class="webgl-fallback relative min-h-[320px] w-full overflow-hidden sm:min-h-[430px] lg:min-h-[580px]" aria-hidden="true">
            <div class="absolute inset-[20%] rounded-full border border-orange/50 shadow-[inset_-35px_-12px_70px_rgba(249,83,15,.18),0_0_90px_rgba(249,83,15,.12)]"></div>
            <div class="absolute inset-[14%] rotate-12 rounded-[50%] border border-orange/25"></div>
          </div>
        </template>
      </ClientOnly>
    </div>
  </section>
</template>
