<script setup lang="ts">
import { ref, watch } from 'vue'
import { X, Lock, Trash2 } from '@lucide/vue'
import { useMemoryStore } from '@/stores/memoryStore'

const props = defineProps<{
  visible: boolean
}>()

const emit = defineEmits<{
  (e: 'update:visible', value: boolean): void
  (e: 'close'): void
}>()

const store = useMemoryStore()

// ─── Password gate (reuses the same upload password) ─────
const DELETE_PASSWORD = import.meta.env.VITE_UPLOAD_PASSWORD as string | undefined

const isOpen = ref(props.visible)
const isUnlocked = ref(false)
const passwordInput = ref('')
const passwordError = ref('')

// ─── Selection state ───────────────────────────────────────
type SelectedItem = { id: string; type: 'memory' | 'photo' } | null
const selected = ref<SelectedItem>(null)
const isConfirming = ref(false)

watch(
  () => props.visible,
  (newVal) => {
    isOpen.value = newVal
    if (newVal) {
      // Ask for password every time the modal opens
      isUnlocked.value = false
      passwordInput.value = ''
      passwordError.value = ''
      selected.value = null
      isConfirming.value = false
    }
  }
)
watch(isOpen, (newVal) => {
  emit('update:visible', newVal)
  if (!newVal) emit('close')
})

const closeModal = () => { isOpen.value = false }

const checkPassword = () => {
  if (!DELETE_PASSWORD) {
    console.warn('VITE_UPLOAD_PASSWORD is not set in your .env file.')
    passwordError.value = 'Delete is not configured. Please set a password.'
    return
  }
  if (passwordInput.value === DELETE_PASSWORD) {
    isUnlocked.value = true
    passwordError.value = ''
  } else {
    passwordError.value = 'Incorrect password. Please try again.'
    passwordInput.value = ''
  }
}

// Only items added via the upload form can be safely deleted —
// their generated ids contain a dash + random suffix (e.g. "m173...-ab12cd").
// Original content.ts items ("m1", "g5") aren't tracked in a "deleted"
// list, so removing one would just reappear after a reload.
function isDeletable(id: string) {
  return id.includes('-')
}

function toggleSelect(id: string, type: 'memory' | 'photo') {
  if (!isDeletable(id)) return
  if (selected.value?.id === id && selected.value?.type === type) {
    selected.value = null
  } else {
    selected.value = { id, type }
  }
  isConfirming.value = false
}

const requestDelete = () => {
  if (!selected.value) return
  isConfirming.value = true
}

const cancelDelete = () => {
  isConfirming.value = false
}

const confirmDelete = () => {
  if (!selected.value) return
  if (selected.value.type === 'memory') {
    store.deleteMemory(selected.value.id)
  } else {
    store.deletePhoto(selected.value.id)
  }
  selected.value = null
  isConfirming.value = false
}

const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape') closeModal()
}
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isOpen"
        class="fixed inset-0 z-[100] flex items-center justify-center p-4"
        @keydown="handleKeydown"
      >
        <div class="absolute inset-0 bg-black/40 backdrop-blur-sm" @click="closeModal" />

        <div class="relative flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-cream shadow-2xl">
          <button
            @click="closeModal"
            class="absolute right-4 top-4 z-10 rounded-full p-1.5 text-ink-soft transition-colors hover:bg-stone-200 hover:text-ink"
            aria-label="Close modal"
          >
            <X class="h-5 w-5" />
          </button>

          <!-- ═══ PASSWORD GATE ═══ -->
          <div v-if="!isUnlocked" class="flex flex-col items-center px-6 py-10 text-center sm:px-8">
            <div class="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-clay/10">
              <Lock class="h-6 w-6 text-clay" />
            </div>

            <h2 class="font-display text-2xl font-semibold text-ink sm:text-3xl">
              This area is locked
            </h2>
            <p class="mt-1 text-sm text-ink-soft">
              Enter the password to manage and delete images
            </p>

            <form @submit.prevent="checkPassword" class="mt-6 w-full max-w-xs space-y-3">
              <input
                v-model="passwordInput"
                type="password"
                placeholder="Password"
                autofocus
                class="w-full rounded-xl border border-stone-200 bg-white px-4 py-2.5 text-center text-sm text-ink placeholder:text-ink-soft/50 focus:border-clay focus:outline-none focus:ring-2 focus:ring-clay/20"
              />
              <p v-if="passwordError" class="text-sm text-red-500">{{ passwordError }}</p>
              <button
                type="submit"
                class="w-full rounded-full bg-clay px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-clay/80"
              >
                Unlock
              </button>
            </form>
          </div>

          <!-- ═══ MANAGE / DELETE VIEW ═══ -->
          <template v-else>
            <div class="border-b border-stone-200/70 px-6 pb-4 pt-6 sm:px-8">
              <h2 class="font-display text-2xl font-semibold text-ink sm:text-3xl">
                Manage Photos
              </h2>
              <p class="mt-1 text-sm text-ink-soft">
                Select an image to delete it. Original starter photos can't be removed here.
              </p>
            </div>

            <div class="flex-1 overflow-y-auto px-6 py-5 sm:px-8">
              <!-- Memories -->
              <h3 class="mb-3 text-sm font-semibold uppercase tracking-wide text-ink-soft">
                Memories ({{ store.memories.length }})
              </h3>
              <div class="mb-8 grid grid-cols-3 gap-3 sm:grid-cols-4">
                <button
                  v-for="memory in store.memories"
                  :key="memory.id"
                  type="button"
                  :disabled="!isDeletable(memory.id)"
                  @click="toggleSelect(memory.id, 'memory')"
                  class="group relative aspect-square overflow-hidden rounded-xl border-2 bg-stone-100 transition-all"
                  :class="[
                    selected?.id === memory.id && selected?.type === 'memory'
                      ? 'border-clay ring-2 ring-clay/30'
                      : 'border-transparent',
                    !isDeletable(memory.id) ? 'cursor-not-allowed opacity-40' : 'cursor-pointer hover:opacity-90',
                  ]"
                >
                  <img :src="memory.image" :alt="memory.quote" class="h-full w-full object-cover" />
                  <div
                    v-if="selected?.id === memory.id && selected?.type === 'memory'"
                    class="absolute inset-0 flex items-center justify-center bg-clay/40"
                  >
                    <Trash2 class="h-6 w-6 text-white" />
                  </div>
                </button>
              </div>

              <!-- Gallery Photos -->
              <h3 class="mb-3 text-sm font-semibold uppercase tracking-wide text-ink-soft">
                Gallery Photos ({{ store.galleryPhotos.length }})
              </h3>
              <div class="grid grid-cols-3 gap-3 sm:grid-cols-4">
                <button
                  v-for="photo in store.galleryPhotos"
                  :key="photo.id"
                  type="button"
                  :disabled="!isDeletable(photo.id)"
                  @click="toggleSelect(photo.id, 'photo')"
                  class="group relative aspect-square overflow-hidden rounded-xl border-2 bg-stone-100 transition-all"
                  :class="[
                    selected?.id === photo.id && selected?.type === 'photo'
                      ? 'border-clay ring-2 ring-clay/30'
                      : 'border-transparent',
                    !isDeletable(photo.id) ? 'cursor-not-allowed opacity-40' : 'cursor-pointer hover:opacity-90',
                  ]"
                >
                  <img :src="photo.image" :alt="photo.alt" class="h-full w-full object-cover" />
                  <div
                    v-if="selected?.id === photo.id && selected?.type === 'photo'"
                    class="absolute inset-0 flex items-center justify-center bg-clay/40"
                  >
                    <Trash2 class="h-6 w-6 text-white" />
                  </div>
                </button>
              </div>
            </div>

            <!-- Action bar -->
            <div class="border-t border-stone-200/70 px-6 py-4 sm:px-8">
              <template v-if="!isConfirming">
                <button
                  type="button"
                  :disabled="!selected"
                  @click="requestDelete"
                  class="flex w-full items-center justify-center gap-2 rounded-full bg-red-500 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <Trash2 class="h-4 w-4" />
                  {{ selected ? 'Delete Selected Image' : 'Select an image to delete' }}
                </button>
              </template>
              <template v-else>
                <div class="flex items-center justify-center gap-3">
                  <p class="text-sm font-medium text-ink">Delete this image permanently?</p>
                  <button
                    type="button"
                    @click="cancelDelete"
                    class="rounded-full border border-stone-200 px-4 py-2 text-sm font-medium text-ink-soft transition-colors hover:bg-stone-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    @click="confirmDelete"
                    class="rounded-full bg-red-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-600"
                  >
                    Yes, Delete
                  </button>
                </div>
              </template>
            </div>
          </template>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>