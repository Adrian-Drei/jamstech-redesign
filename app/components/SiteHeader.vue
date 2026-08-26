<script setup lang="ts">
const open = ref(false);
const cvPath = "/Merano_CV.pdf";
const route = useRoute();
const isWork = computed(() => route.path === "/work");
const aboutPath = computed(() => (isWork.value ? "/#about" : "#about"));
const contactPath = computed(() => (isWork.value ? "/#contact" : "#contact"));
const close = () => {
  open.value = false;
};
const onKey = (event: KeyboardEvent) => {
  if (event.key === "Escape") close();
};

watch(open, (value) => {
  if (import.meta.client) document.body.style.overflow = value ? "hidden" : "";
});
onMounted(() => window.addEventListener("keydown", onKey));
onBeforeUnmount(() => {
  window.removeEventListener("keydown", onKey);
  if (import.meta.client) document.body.style.overflow = "";
});
</script>

<template>
  <header
    class="sticky top-0 z-50 border-b border-white/[0.08] bg-ink/85 backdrop-blur-xl"
  >
    <div
      class="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 sm:px-8"
    >
      <NuxtLink to="/" aria-label="JAM's Tech home"><BrandMark /></NuxtLink>
      <nav
        aria-label="Primary"
        class="hidden items-center gap-6 md:flex lg:gap-8"
      >
        <NuxtLink
          class="nav-link relative py-2"
          to="/work"
          :aria-current="isWork ? 'page' : undefined"
          :class="
            isWork &&
            'text-white after:absolute after:inset-x-0 after:-bottom-2 after:h-0.5 after:bg-orange'
          "
        >
          Work
        </NuxtLink>
        <NuxtLink class="nav-link" :to="aboutPath">About</NuxtLink>
        <NuxtLink class="nav-link" :to="contactPath">Contact</NuxtLink>
        <a
          :href="cvPath"
          class="nav-link inline-flex items-center gap-2 whitespace-nowrap"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Download James Adrian Merano’s CV"
        >
          <span aria-hidden="true">↓</span>
          <span>Download CV</span>
        </a>
        <a
          class="button-primary !px-6 !py-3"
          href="mailto:engr.drei29@gmail.com"
        >
          LET'S TALK
        </a>
      </nav>
      <button
        class="grid size-11 place-items-center rounded-md border border-white/15 md:hidden"
        type="button"
        :aria-expanded="open"
        aria-controls="mobile-menu"
        aria-label="Toggle navigation"
        @click="open = !open"
      >
        <span class="space-y-1.5">
          <span class="block h-px w-5 bg-white"></span>
          <span class="block h-px w-5 bg-white"></span>
          <span class="block h-px w-5 bg-white"></span>
        </span>
      </button>
    </div>
    <nav
      v-if="open"
      id="mobile-menu"
      aria-label="Mobile navigation"
      class="absolute inset-x-0 top-full border-b border-white/10 bg-ink px-5 py-6 md:hidden"
    >
      <div class="flex flex-col gap-1">
        <NuxtLink
          class="mobile-link"
          to="/work"
          :aria-current="isWork ? 'page' : undefined"
          @click="close"
        >
          Work
        </NuxtLink>
        <NuxtLink class="mobile-link" :to="aboutPath" @click="close">
          About
        </NuxtLink>
        <NuxtLink class="mobile-link" :to="contactPath" @click="close">
          Contact
        </NuxtLink>
        <a
          :href="cvPath"
          class="mobile-link inline-flex min-h-12 items-center gap-3"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Download James Adrian Merano’s CV"
          @click="close"
        >
          <span aria-hidden="true">↓</span>
          <span>Download CV</span>
        </a>
        <a
          class="button-primary mt-4 text-center"
          href="mailto:engr.drei29@gmail.com"
          @click="close"
        >
          LET'S TALK
        </a>
      </div>
    </nav>
  </header>
</template>
