<script setup lang="ts">
import { computed } from 'vue'
import { storyDetails, favoriteThings, togetherSince } from '@/data/content'
import PageHeader from '@/components/ui/PageHeader.vue'
import HeartIcon from '@/components/ui/HeartIcon.vue'

const iconPaths: Record<'calendar' | 'star', string> = {
  calendar: 'M7 3v3M17 3v3M4 9h16M5 6h14a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1Z',
  star: 'M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.5l-5.9 3.1 1.3-6.6-4.9-4.6 6.6-.8L12 2.5Z',
}

const daysTogether = computed(() => {
  const start = new Date(togetherSince)
  const now = new Date()
  const diff = now.getTime() - start.getTime()
  return Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24)))
})
</script>

<template>
  <div class="pb-24">
    <PageHeader
      eyebrow="Our Details"
      title="The important dates in our story."
      description="The dates, the little facts, and the small things we love — all kept in one place."
    />

    <div class="mx-auto max-w-content px-6 lg:px-10">
      <!-- Days together counter -->
      <div class="mx-auto mb-14 flex max-w-md flex-col items-center gap-2 rounded-3xl border border-stone-200/70 bg-ivory px-8 py-10 text-center shadow-card">
        <span class="h-6 w-6 text-rose"><HeartIcon filled /></span>
        <p class="font-display text-5xl text-ink">{{ daysTogether.toLocaleString() }}</p>
        <p class="text-sm text-ink-soft">days and counting, together</p>
      </div>

      <div class="mx-auto grid max-w-3xl grid-cols-1 gap-8 md:grid-cols-2">
        <!-- Key dates -->
        <div class="rounded-3xl border border-stone-200/70 bg-ivory p-8 shadow-card">
          <h2 class="mb-5 font-display text-xl text-ink">Key Dates</h2>
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
        </div>

        <!-- Favorite things -->
        <div class="rounded-3xl border border-stone-200/70 bg-ivory p-8 shadow-card">
          <h2 class="mb-5 font-display text-xl text-ink">Little Things We Love</h2>
          <ul class="divide-y divide-stone-200/70">
            <li v-for="thing in favoriteThings" :key="thing.id" class="py-4 first:pt-0 last:pb-0">
              <p class="text-sm font-medium text-ink">{{ thing.label }}</p>
              <p class="text-sm text-ink-soft">{{ thing.value }}</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
