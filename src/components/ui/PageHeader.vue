<script setup lang="ts">
defineProps<{
  eyebrow: string
  title: string
  description?: string
}>()
</script>

<template>
  <div class="mx-auto max-w-2xl px-6 pb-14 pt-16 text-center lg:pt-20">
    <p class="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-clay">
      {{ eyebrow }}
    </p>
    <h1 class="text-balance font-display text-4xl font-normal leading-tight text-ink sm:text-5xl">
      {{ title }}
    </h1>
    <p v-if="description" class="mx-auto mt-4 max-w-md text-balance leading-relaxed text-ink-soft">
      {{ description }}
    </p>
  </div>
</template>
