<script setup lang="ts">
import NavBar from '@/components/layout/NavBar.vue'
import Footer from '@/components/layout/Footer.vue'
import MobileTabBar from '@/components/layout/MobileTabBar.vue'
import MusicPlayer from '@/components/layout/MusicPlayer.vue'
</script>

<template>
  <div class="min-h-screen bg-cream">
    <NavBar />
    <main class="pb-20 md:pb-0">
      <router-view v-slot="{ Component }">
        <transition name="page" mode="out-in">
          <component :is="Component" :key="$route.fullPath" />
        </transition>
      </router-view>
    </main>
    <Footer class="pb-20 md:pb-0" />
    <MobileTabBar />
    <MusicPlayer />
  </div>
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition: opacity 0.2s ease;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
}
</style>