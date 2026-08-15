<script setup lang="ts">
import { ref, computed } from 'vue'
import { galleryPhotos, galleryCategories } from '@/data/content'
import PageHeader from '@/components/ui/PageHeader.vue'

const activeCategory = ref('all')
const lightboxPhoto = ref<(typeof galleryPhotos)[number] | null>(null)

const filteredPhotos = computed(() =>
  activeCategory.value === 'all'
    ? galleryPhotos
    : galleryPhotos.filter((photo) => photo.category === activeCategory.value)
)

function openLightbox(photo: (typeof galleryPhotos)[number]) {
  lightboxPhoto.value = photo
}

function closeLightbox() {
  lightboxPhoto.value = null
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') closeLightbox()
}
</script>

<template>
  <div class="pb-24" @keydown="onKeydown">
    <PageHeader
      eyebrow="Our Gallery"
      title="A collection of our favorite photos."
      description="Snapshots from the everyday and the extraordinary — every one of them a little piece of us."
    />

    <div class="mx-auto max-w-content px-6 lg:px-10">
      <!-- Category filters -->
      <div class="mb-10 flex flex-wrap justify-center gap-2">
        <button
          v-for="category in galleryCategories"
          :key="category.id"
          type="button"
          @click="activeCategory = category.id"
          class="rounded-full px-4 py-2 text-sm font-medium transition-colors"
          :class="
            activeCategory === category.id
              ? 'bg-clay text-ivory'
              : 'bg-stone-100 text-ink-soft hover:bg-stone-200 hover:text-ink'
          "
        >
          {{ category.label }}
        </button>
      </div>

      <!-- Grid -->
      <div class="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        <button
          v-for="photo in filteredPhotos"
          :key="photo.id"
          type="button"
          class="group aspect-square overflow-hidden rounded-xl bg-stone-100"
          @click="openLightbox(photo)"
        >
          <img
            :src="photo.image"
            :alt="photo.alt"
            class="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
            loading="lazy"
          />
        </button>
      </div>

      <p v-if="filteredPhotos.length === 0" class="py-16 text-center text-ink-soft">
        No photos in this category yet.
      </p>
    </div>

    <!-- Lightbox -->
    <transition name="fade">
      <div
        v-if="lightboxPhoto"
        class="fixed inset-0 z-[60] flex items-center justify-center bg-ink/80 p-6 backdrop-blur-sm"
        @click.self="closeLightbox"
      >
        <button
          type="button"
          aria-label="Close"
          class="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-ivory/10 text-ivory transition-colors hover:bg-ivory/20"
          @click="closeLightbox"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" class="h-5 w-5">
            <path d="M6 6l12 12M18 6L6 18" stroke-linecap="round" />
          </svg>
        </button>

        <img
          :src="lightboxPhoto.image"
          :alt="lightboxPhoto.alt"
          class="max-h-[80vh] max-w-full rounded-2xl object-contain shadow-soft"
        />
      </div>
    </transition>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
