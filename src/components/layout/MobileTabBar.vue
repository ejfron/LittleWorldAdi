<script setup lang="ts">
import { useRoute } from 'vue-router'
import { navLinks } from '@/data/content'
import HeartIcon from '@/components/ui/HeartIcon.vue'

const route = useRoute()

const iconPaths: Record<string, string> = {
  Home: 'M3 10.5 12 3l9 7.5M5 9.5V19a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1V9.5',
  Memories: 'M7 3v3M17 3v3M4 9h16M5 6h14a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1Z',
  Gallery: 'M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm2 12 4-5 3 3 3-4 4 6M9 9.5A1.25 1.25 0 1 0 9 7a1.25 1.25 0 0 0 0 2.5Z',
}
</script>

<template>
  <nav
    class="fixed inset-x-0 bottom-0 z-50 border-t border-stone-200/70 bg-ivory/95 backdrop-blur-md md:hidden"
    style="padding-bottom: env(safe-area-inset-bottom)"
    aria-label="Primary"
  >
    <ul class="flex items-stretch justify-around">
      <li v-for="link in navLinks" :key="link.href" class="flex-1">
        <router-link
          :to="link.href"
          class="relative flex flex-col items-center gap-1 py-2.5 text-[11px] font-medium transition-colors"
          :class="route.path === link.href ? 'text-clay' : 'text-ink-soft'"
        >
          <span class="flex h-6 w-6 items-center justify-center">
            <svg
              v-if="link.label !== 'Details'"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.6"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="h-[22px] w-[22px]"
            >
              <path :d="iconPaths[link.label]" />
            </svg>
            <span v-else class="h-[19px] w-[19px]">
              <HeartIcon :filled="route.path === link.href" :stroke-width="1.6" />
            </span>
          </span>

          {{ link.label }}

          <span
            class="absolute bottom-0 h-0.5 w-7 rounded-full bg-clay transition-opacity duration-200"
            :class="route.path === link.href ? 'opacity-100' : 'opacity-0'"
          />
        </router-link>
      </li>
    </ul>
  </nav>
</template>