<template>
  <footer class="mx-auto max-w-7xl px-5 pb-8 pt-4 sm:px-8">
    <div
      class="flex flex-col gap-7 md:flex-row md:items-end md:justify-between"
    >
      <div>
        <NuxtLink to="/" aria-label="JAM's Tech home"><BrandMark /></NuxtLink>
        <p class="mt-2 text-xs text-slate-400">© 2026 James Adrian Merano</p>
      </div>
      <nav
        aria-label="Footer navigation"
        class="flex flex-wrap gap-6 text-sm text-slate-300"
      >
        <NuxtLink class="nav-link" to="/work">Work</NuxtLink>
        <NuxtLink class="nav-link" to="/#about">About</NuxtLink>
        <NuxtLink class="nav-link" to="/#contact">Contact</NuxtLink>
        <a
          class="nav-link"
          href="/Merano_CV.pdf"
          target="_blank"
          rel="noopener noreferrer"
        >
          Download CV ↓
        </a>
      </nav>
      <nav
        aria-label="Social links"
        class="flex flex-wrap gap-6 text-sm text-slate-300"
      >
        <a
          class="nav-link"
          href="https://www.linkedin.com/in/james-adrian-merano-3932891b2/"
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn ↗
        </a>
        <a class="nav-link" href="mailto:engr.drei29@gmail.com">Email</a>
      </nav>
    </div>
  </footer>
</template>
