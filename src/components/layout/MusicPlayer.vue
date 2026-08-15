<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue'
import { favoriteSongs } from '@/data/content'

const audioRef = ref<HTMLAudioElement | null>(null)
const currentIndex = ref(0)
const isPlaying = ref(false)
const isExpanded = ref(false)
const hasError = ref(false)

const currentSong = computed(() => favoriteSongs[currentIndex.value])

function play() {
  const audio = audioRef.value
  if (!audio) return
  audio
    .play()
    .then(() => {
      isPlaying.value = true
      hasError.value = false
    })
    .catch(() => {
      hasError.value = true
      isPlaying.value = false
    })
}

function pause() {
  audioRef.value?.pause()
  isPlaying.value = false
}

function togglePlay() {
  if (isPlaying.value) {
    pause()
  } else {
    play()
  }
}

function selectSong(index: number) {
  const wasPlaying = isPlaying.value || index !== currentIndex.value
  currentIndex.value = index
  isExpanded.value = false
  // Wait for the :src binding to update the <audio> element before playing.
  nextTick(() => {
    if (wasPlaying) play()
  })
}

function next() {
  selectSong((currentIndex.value + 1) % favoriteSongs.length)
}

function prev() {
  selectSong((currentIndex.value - 1 + favoriteSongs.length) % favoriteSongs.length)
}

// If the track changes while paused/errored, reset error state.
watch(currentIndex, () => {
  hasError.value = false
})
</script>

<template>
  <div class="fixed bottom-24 right-4 z-40 flex flex-col items-end gap-2 md:bottom-6 md:right-6">
    <audio
      ref="audioRef"
      :src="currentSong.src"
      preload="none"
      @ended="next"
    />

    <!-- Expanded playlist -->
    <transition name="pop">
      <div
        v-if="isExpanded"
        class="w-64 overflow-hidden rounded-2xl border border-stone-200/70 bg-ivory/95 shadow-soft backdrop-blur-md"
      >
        <p class="border-b border-stone-200/70 px-4 py-3 text-xs font-semibold uppercase tracking-widest text-clay">
          Our Songs
        </p>
        <ul>
          <li v-for="(song, index) in favoriteSongs" :key="song.title + index">
            <button
              type="button"
              class="flex w-full items-center gap-3 px-4 py-2.5 text-left transition-colors hover:bg-stone-100"
              :class="index === currentIndex ? 'bg-stone-100' : ''"
              @click="selectSong(index)"
            >
              <span
                class="flex h-7 w-7 shrink-0 items-center justify-center rounded-full"
                :class="index === currentIndex ? 'bg-clay text-ivory' : 'bg-stone-100 text-ink-soft'"
              >
                <span v-if="index === currentIndex && isPlaying" class="flex h-3 items-end gap-[2px]" aria-hidden="true">
                  <span class="eq-bar w-[2.5px] rounded-full bg-ivory" style="animation-delay: 0ms" />
                  <span class="eq-bar w-[2.5px] rounded-full bg-ivory" style="animation-delay: 150ms" />
                  <span class="eq-bar w-[2.5px] rounded-full bg-ivory" style="animation-delay: 300ms" />
                </span>
                <svg v-else viewBox="0 0 24 24" fill="currentColor" class="h-3 w-3 translate-x-[1px]">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
              <span class="min-w-0">
                <span class="block truncate text-xs font-medium text-ink">{{ song.title }}</span>
                <span class="block truncate text-[11px] text-ink-soft">{{ song.artist }}</span>
              </span>
            </button>
          </li>
        </ul>
      </div>
    </transition>

    <!-- Player pill -->
    <div
      class="flex items-center gap-1 rounded-full border border-stone-200/70 bg-ivory/95 py-1.5 pl-1.5 pr-2 shadow-card backdrop-blur-md"
    >
      <button
        type="button"
        aria-label="Previous song"
        class="flex h-8 w-8 items-center justify-center rounded-full text-ink-soft transition-colors hover:bg-stone-100 hover:text-ink"
        @click="prev"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" class="h-3.5 w-3.5">
          <path d="M6 6h2v12H6zM20 6v12l-9-6z" />
        </svg>
      </button>

      <button
        type="button"
        class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-clay text-ivory transition-colors hover:bg-clay-dark active:scale-[0.96]"
        :aria-label="isPlaying ? `Pause ${currentSong.title}` : `Play ${currentSong.title}`"
        @click="togglePlay"
      >
        <span v-if="isPlaying" class="flex h-3.5 items-end gap-[3px]" aria-hidden="true">
          <span class="eq-bar w-[3px] rounded-full bg-ivory" style="animation-delay: 0ms" />
          <span class="eq-bar w-[3px] rounded-full bg-ivory" style="animation-delay: 150ms" />
          <span class="eq-bar w-[3px] rounded-full bg-ivory" style="animation-delay: 300ms" />
        </span>
        <svg v-else viewBox="0 0 24 24" fill="currentColor" class="h-4 w-4 translate-x-[1px]">
          <path d="M8 5v14l11-7z" />
        </svg>
      </button>

      <button
        type="button"
        aria-label="Next song"
        class="flex h-8 w-8 items-center justify-center rounded-full text-ink-soft transition-colors hover:bg-stone-100 hover:text-ink"
        @click="next"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" class="h-3.5 w-3.5">
          <path d="M18 6h-2v12h2zM4 6v12l9-6z" />
        </svg>
      </button>

      <button
        type="button"
        class="ml-1 hidden max-w-[9rem] flex-col items-start rounded-full py-1 pl-2 pr-3 text-left transition-colors hover:bg-stone-100 sm:flex"
        aria-label="Show playlist"
        @click="isExpanded = !isExpanded"
      >
        <span class="block truncate text-xs font-medium text-ink">
          {{ hasError ? 'Tap to retry' : currentSong.title }}
        </span>
        <span class="block truncate text-[11px] text-ink-soft">{{ currentSong.artist }}</span>
      </button>

      <button
        type="button"
        aria-label="Toggle playlist"
        class="flex h-8 w-8 items-center justify-center rounded-full text-ink-soft transition-colors hover:bg-stone-100 hover:text-ink sm:hidden"
        @click="isExpanded = !isExpanded"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4">
          <path d="M4 6h16M4 12h16M4 18h7" />
        </svg>
      </button>
    </div>
  </div>
</template>

<style scoped>
.eq-bar {
  height: 100%;
  animation: eq 0.9s ease-in-out infinite;
  transform-origin: bottom;
}

@keyframes eq {
  0%,
  100% {
    transform: scaleY(0.4);
  }
  50% {
    transform: scaleY(1);
  }
}

.pop-enter-active,
.pop-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}
.pop-enter-from,
.pop-leave-to {
  opacity: 0;
  transform: translateY(4px);
}

@media (prefers-reduced-motion: reduce) {
  .eq-bar {
    animation: none;
    transform: scaleY(0.8);
  }
  .pop-enter-active,
  .pop-leave-active {
    transition: none;
  }
}
</style>