<script setup lang="ts">
import { computed } from 'vue'
import { useMemoryStore } from '@/stores/memoryStore'
import HeroSection from '@/components/sections/HeroSection.vue'
import ContentSection from '@/components/sections/ContentSection.vue'

const store = useMemoryStore()

const refreshKey = computed(() => `${store.memories.length}-${store.galleryPhotos.length}`)
</script>

<template>
  <div :key="refreshKey">
    <HeroSection />
    <ContentSection />
  </div>
</template>