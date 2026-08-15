<script setup lang="ts">
import OverviewCards from './OverviewCards.vue'
import MemoriesCard from './MemoriesCard.vue'
import GalleryPreview from './GalleryPreview.vue'
import DetailsCard from './DetailsCard.vue'
</script>

<template>
  <section class="bg-white/40 py-20 lg:py-28">
    <div class="mx-auto max-w-content px-6 lg:px-10">
      <OverviewCards />

      <div class="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-8">
        <MemoriesCard />
        <GalleryPreview />
        <DetailsCard />
      </div>
    </div>
  </section>
</template>
