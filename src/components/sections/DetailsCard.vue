<script setup lang="ts">
import { storyDetails } from '@/data/content'
import HeartIcon from '@/components/ui/HeartIcon.vue'

const iconPaths: Record<'calendar' | 'star', string> = {
  calendar: 'M7 3v3M17 3v3M4 9h16M5 6h14a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1Z',
  star: 'M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.5l-5.9 3.1 1.3-6.6-4.9-4.6 6.6-.8L12 2.5Z',
}
</script>

<template>
  <div class="rounded-3xl border border-stone-200/70 bg-ivory p-6 shadow-card">
    <ul class="divide-y divide-stone-200/70">
      <li
        v-for="detail in storyDetails"
        :key="detail.id"
        class="flex items-center gap-4 py-4 first:pt-0 last:pb-0"
      >
        <div class="flex h-10 w-10 shrink-0 items-center justify-center text-clay">
          <span v-if="detail.icon === 'heart'" class="h-5 w-5"><HeartIcon /></span>
          <svg
            v-else
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="h-5 w-5"
          >
            <path :d="iconPaths[detail.icon]" />
          </svg>
        </div>
        <div>
          <p class="text-sm font-medium text-ink">{{ detail.label }}</p>
          <p class="text-sm text-ink-soft">{{ detail.value }}</p>
        </div>
      </li>
    </ul>

    <router-link
      to="/details"
      class="mt-5 flex items-center justify-center gap-1.5 text-sm font-medium text-ink transition-colors hover:text-clay"
    >
      See full details
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="h-4 w-4">
        <path d="M5 12h14M13 6l6 6-6 6" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </router-link>
  </div>
</template>
