<script setup lang="ts">
import { ref, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useMemoryStore } from '@/stores/memoryStore'
import PageHeader from '@/components/ui/PageHeader.vue'

const store = useMemoryStore()
const { memories } = storeToRefs(store)

// ─── Date formatter ──────────────────────────────────────────
function formatDate(dateString: string): string {
  if (!dateString) return ''
  try {
    const date = new Date(dateString)

    if (isNaN(date.getTime())) return dateString
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date)
  } catch {
    return dateString
  }
}
</script>

<template>
  <div class="pb-24">
    <PageHeader
      eyebrow="Our Memories"
      title="Little moments that mean everything."
      description="Every scene we've collected along the way — the big days and the quiet, ordinary ones we didn't want to forget."
    />

    <div class="mx-auto max-w-content px-6 lg:px-10">
      <ol class="relative">
        <!-- center line, desktop only -->
        <div
          class="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-stone-200 lg:block"
          aria-hidden="true"
        />

        <li
          v-for="(memory, index) in memories"
          :key="memory.id"
          class="relative mb-14 grid grid-cols-1 items-center gap-6 last:mb-0 lg:mb-24 lg:grid-cols-2 lg:gap-16"
        >
          <!-- timeline dot, desktop only -->
          <span
            class="absolute left-1/2 top-1/2 hidden h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-clay ring-4 ring-cream lg:block"
            aria-hidden="true"
          />

          <div
            class="overflow-hidden rounded-2xl shadow-card"
            :class="index % 2 === 1 ? 'lg:order-2' : ''"
          >
            <img
              :src="memory.image"
              :alt="memory.quote"
              class="aspect-[4/3] w-full object-cover"
              loading="lazy"
            />
          </div>

          <div
            class="rounded-2xl border border-stone-200/70 bg-ivory p-8 shadow-card"
            :class="index % 2 === 1 ? 'lg:order-1 lg:text-right' : ''"
          >
            <p class="text-xs font-semibold uppercase tracking-widest text-clay">
              <!-- 👇 formatted date here -->
              {{ formatDate(memory.date) }}
            </p>
            <p class="mt-3 text-balance font-display text-2xl leading-snug text-ink">
              {{ memory.quote }}
            </p>
          </div>
        </li>
      </ol>
    </div>
  </div>
</template>