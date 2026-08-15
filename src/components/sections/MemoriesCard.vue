<script setup lang="ts">
import { ref, computed } from 'vue'
import { memories } from '@/data/content'

const activeIndex = ref(0)
const active = computed(() => memories[activeIndex.value])

function goTo(index: number) {
  activeIndex.value = index
}
</script>

<template>
  <div class="rounded-3xl border border-stone-200/70 bg-ivory p-6 shadow-card">
    <div class="flex items-start gap-5">
      <span class="font-display text-4xl leading-none text-stone-300" aria-hidden="true">&ldquo;</span>

      <div class="flex-1">
        <transition name="fade" mode="out-in">
          <div :key="active.id">
            <p class="text-balance font-display text-xl leading-snug text-ink">
              {{ active.quote }}
            </p>
            <p class="mt-3 text-sm text-clay">{{ active.date }}</p>
          </div>
        </transition>
      </div>

      <div class="hidden h-24 w-24 shrink-0 overflow-hidden rounded-xl sm:block">
        <transition name="fade" mode="out-in">
          <img :key="active.id" :src="active.image" :alt="active.quote" class="h-full w-full object-cover" />
        </transition>
      </div>
    </div>

    <div class="mt-6 flex justify-center gap-2">
      <button
        v-for="(memory, index) in memories"
        :key="memory.id"
        type="button"
        :aria-label="`Show memory ${index + 1}`"
        :aria-current="index === activeIndex"
        @click="goTo(index)"
        class="h-1.5 rounded-full transition-all duration-300"
        :class="index === activeIndex ? 'w-6 bg-clay' : 'w-1.5 bg-stone-200 hover:bg-stone-300'"
      />
    </div>

    <router-link
      to="/memories"
      class="mt-5 flex items-center justify-center gap-1.5 text-sm font-medium text-ink transition-colors hover:text-clay"
    >
      Read all our memories
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="h-4 w-4">
        <path d="M5 12h14M13 6l6 6-6 6" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </router-link>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
