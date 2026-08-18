<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { Settings } from '@lucide/vue'
import { useMemoryStore } from '@/stores/memoryStore'
import DeleteImageModal from '@/components/modal/DeleteImagemodal.vue'

const store = useMemoryStore()
const { memories } = storeToRefs(store)

const activeIndex = ref(0)


const previousLength = ref(memories.value.length)

watch(
  memories,
  (list) => {
    if (!Array.isArray(list)) return

    if (list.length === 0) {
      activeIndex.value = 0
      previousLength.value = 0
      return
    }

    if (list.length > previousLength.value) {
      activeIndex.value = 0
    } else if (activeIndex.value >= list.length) {
      activeIndex.value = 0
    }

    previousLength.value = list.length
  },
  { immediate: true }
)

const active = computed(() => {
  const list = memories.value
  if (!Array.isArray(list) || list.length === 0) {
    return { id: 'empty', quote: 'No memories yet—add one!', date: '', image: '' }
  }
  const index = activeIndex.value < list.length ? activeIndex.value : 0
  return list[index]
})

function goTo(index: number) {
  const list = memories.value
  if (!Array.isArray(list) || list.length === 0) return
  activeIndex.value = Math.min(index, list.length - 1)
}

const showManageModal = ref(false)
</script>

<template>
  <div class="relative rounded-3xl border border-stone-200/70 bg-ivory p-6 shadow-card">
    <!-- Manage / Delete trigger -->
    <button
      type="button"
      @click="showManageModal = true"
      class="absolute -top-2 right-4 z-10 flex items-center gap-1 rounded-full bg-white/80 px-2.5 py-1 text-xs font-medium text-ink-soft shadow-sm backdrop-blur-sm transition-colors hover:bg-white hover:text-ink"
      aria-label="Manage photos"
    >
      <Settings class="h-3.5 w-3.5" />
      Manage
    </button>

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

    <DeleteImageModal v-model:visible="showManageModal" />
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