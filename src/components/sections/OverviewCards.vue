<script setup lang="ts">
import { overviewCards } from '@/data/content'
import HeartIcon from '@/components/ui/HeartIcon.vue'

const icons = {
  calendar: 'M7 3v3M17 3v3M4 9h16M5 6h14a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1Z',
  gallery: 'M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm2 12 4-5 3 3 3-4 4 6M9 9.5A1.25 1.25 0 1 0 9 7a1.25 1.25 0 0 0 0 2.5Z',
}

const routes: Record<string, string> = {
  memories: '/memories',
  gallery: '/gallery',
  details: '/details',
}
</script>

<template>
  <div class="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-6">
    <router-link
      v-for="card in overviewCards"
      :key="card.id"
      :to="routes[card.id]"
      class="group flex items-start gap-4 rounded-2xl p-2 -m-2 transition-colors hover:bg-stone-100/60"
    >
      <div class="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-stone-100 transition-colors group-hover:bg-ivory">
        <svg
          v-if="card.icon !== 'heart'"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="h-6 w-6 text-ink"
        >
          <path :d="icons[card.icon]" />
        </svg>
        <span v-else class="h-6 w-6 text-ink"><HeartIcon /></span>
      </div>
      <div>
        <h3 class="font-display text-lg text-ink">{{ card.title }}</h3>
        <p class="mt-1 text-sm leading-relaxed text-ink-soft">{{ card.description }}</p>
      </div>
    </router-link>
  </div>
</template>
