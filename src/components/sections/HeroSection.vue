<script setup lang="ts">
import { heroImage } from '@/data/content'
import HeartIcon from '@/components/ui/HeartIcon.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
</script>

<template>
  <section id="home" class="relative overflow-hidden">
    <!-- ambient soft gradient wash -->
    <div
      class="pointer-events-none absolute inset-0 bg-gradient-to-br from-stone-200/40 via-transparent to-transparent"
      aria-hidden="true"
    />

    <div
      class="relative mx-auto grid max-w-content items-center gap-16 px-6 py-20 lg:grid-cols-2 lg:gap-12 lg:px-10 lg:py-28"
    >
      <!-- Copy -->
      <div class="max-w-xl">
        <p class="mb-5 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-clay">
          Our Story
          <span class="h-3.5 w-3.5 text-rose"><HeartIcon filled /></span>
        </p>

        <h1 class="text-balance font-display text-5xl font-normal leading-[1.1] text-ink sm:text-6xl">
          Every moment with you is my favorite memory.
        </h1>

        <p class="mt-6 max-w-md text-balance text-base leading-relaxed text-ink-soft">
          A space for our memories, our adventures, and all the little things that make our
          story beautiful.
        </p>

        <BaseButton to="/memories" class="mt-9">
          <template #icon>
            <span class="h-4 w-4"><HeartIcon /></span>
          </template>
          Explore Our Memories
        </BaseButton>
      </div>

      <!-- Photo -->
      <div class="relative mx-auto w-full max-w-[520px]">
        <span
          class="absolute -left-3 top-6 h-9 w-9 -rotate-6 text-ink/70 sm:-left-6 sm:h-11 sm:w-11"
          aria-hidden="true"
        >
          <HeartIcon :stroke-width="1.4" />
        </span>

        <div class="overflow-hidden rounded-blob shadow-soft">
          <img
            :src="heroImage"
            alt="A couple watching the sunset together on the beach"
            class="aspect-[4/3] w-full object-cover"
            width="1000"
            height="760"
          />
        </div>

        <svg
          class="absolute -bottom-2 right-2 h-8 w-8 text-ink/60 sm:right-6"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M12 0l1.8 8.2L22 10l-8.2 1.8L12 20l-1.8-8.2L2 10l8.2-1.8L12 0z" opacity="0.9" />
          <path d="M20 16l.8 3.2L24 20l-3.2.8L20 24l-.8-3.2L16 20l3.2-.8L20 16z" opacity="0.5" />
        </svg>
      </div>
    </div>

    <router-link
      to="/memories"
      aria-label="Go to memories"
      class="relative mx-auto -mt-6 mb-4 flex h-9 w-9 items-center justify-center text-clay/70 transition-colors hover:text-clay lg:mt-0"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="h-5 w-5">
        <path d="M6 9l6 6 6-6" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </router-link>
  </section>
</template>
