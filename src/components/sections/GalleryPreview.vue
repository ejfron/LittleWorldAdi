<script setup lang="ts">
import { ref, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { Settings } from '@lucide/vue'
import { useMemoryStore } from '@/stores/memoryStore'
import DeleteImageModal from '@/components/modal/DeleteImageModal.vue'

const store = useMemoryStore()
const { galleryPhotos } = storeToRefs(store)

const previewPhotos = computed(() => {
  const photos = galleryPhotos.value
  return Array.isArray(photos) ? photos.slice(0, 6) : []
})

const showManageModal = ref(false)
</script>

<template>
  <div class="relative">
    <!-- Manage / Delete trigger -->
    <button
      type="button"
      @click="showManageModal = true"
      class="absolute -top-2 right-0 z-10 flex items-center gap-1 rounded-full bg-white/80 px-2.5 py-1 text-xs font-medium text-ink-soft shadow-sm backdrop-blur-sm transition-colors hover:bg-white hover:text-ink"
      aria-label="Manage photos"
    >
      <Settings class="h-3.5 w-3.5" />
      Manage
    </button>

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

    <DeleteImageModal v-model:visible="showManageModal" />
  </div>
</template>