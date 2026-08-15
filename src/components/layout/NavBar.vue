<script setup lang="ts">
import { useRoute } from 'vue-router'
import { navLinks } from '@/data/content'
import HeartIcon from '@/components/ui/HeartIcon.vue'

const route = useRoute()
</script>

<template>
  <header class="sticky top-0 z-50 border-b border-stone-200/70 bg-cream/85 backdrop-blur-md">
    <nav class="mx-auto flex max-w-content items-center justify-between px-6 py-4 lg:px-10">
      <router-link to="/" class="flex items-center gap-2.5">
        <span class="h-5 w-5 text-ink">
          <HeartIcon />
        </span>
        <span class="font-display text-lg tracking-tight text-ink">Our Little World</span>
      </router-link>

      <ul class="hidden items-center gap-9 md:flex">
        <li v-for="link in navLinks" :key="link.href">
          <router-link
            :to="link.href"
            class="relative pb-1 text-sm text-ink-soft transition-colors hover:text-ink"
            :class="{ 'text-ink': route.path === link.href }"
          >
            {{ link.label }}
            <span
              v-if="route.path === link.href"
              class="absolute -bottom-[1px] left-0 h-[1.5px] w-full bg-clay"
            />
          </router-link>
        </li>
      </ul>

      <router-link
        to="/details"
        class="inline-flex items-center gap-2 rounded-full bg-stone-100 px-4 py-2 text-sm text-ink transition-colors hover:bg-stone-200"
      >
        <span class="h-4 w-4"><HeartIcon /></span>
        For Us
      </router-link>
    </nav>
  </header>
</template>
