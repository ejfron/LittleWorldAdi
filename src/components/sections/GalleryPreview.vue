<script setup lang="ts">
import { galleryPhotos } from '@/data/content'

const previewPhotos = galleryPhotos.slice(0, 6)
</script>

<template>
  <div>
    <div class="grid grid-cols-3 gap-3">
      <button
        v-for="photo in previewPhotos"
        :key="photo.id"
        type="button"
        class="group aspect-square overflow-hidden rounded-xl bg-stone-100"
      >
        <img
          :src="photo.image"
          :alt="photo.alt"
          class="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
          loading="lazy"
        />
      </button>
    </div>

    <router-link
      to="/gallery"
      class="mt-6 flex items-center justify-center gap-1.5 text-sm font-medium text-ink transition-colors hover:text-clay"
    >
      View all photos
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="h-4 w-4">
        <path d="M5 12h14M13 6l6 6-6 6" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </router-link>
  </div>
</template>
