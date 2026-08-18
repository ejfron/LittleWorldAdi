<script setup lang="ts">
import { ref, watch } from 'vue'
import { X, Upload, Calendar, MapPin, Tag, Lock } from '@lucide/vue'
import { useMemoryStore } from '@/stores/memoryStore'
import { galleryCategories } from '@/data/content'

// ─── Props ───────────────────────────────────────────────
const props = defineProps<{
  visible: boolean
}>()

// ─── Emits ───────────────────────────────────────────────
const emit = defineEmits<{
  (e: 'update:visible', value: boolean): void
  (e: 'close'): void
}>()

const store = useMemoryStore()

// ─── Category options (exclude the "All" filter option) ──
const categoryOptions = galleryCategories.filter((c) => c.id !== 'all')

// ─── Password gate ─────────────────────────────────────────
const UPLOAD_PASSWORD = import.meta.env.VITE_UPLOAD_PASSWORD as string | undefined

const isUnlocked = ref(false)
const passwordInput = ref('')
const passwordError = ref('')
const fileInput = ref<HTMLInputElement | null>(null)

const checkPassword = () => {
  if (!UPLOAD_PASSWORD) {
    console.warn('VITE_UPLOAD_PASSWORD is not set in your .env file.')
    passwordError.value = 'Upload is not configured. Please set a password.'
    return
  }
  if (passwordInput.value === UPLOAD_PASSWORD) {
    isUnlocked.value = true
    passwordError.value = ''
  } else {
    passwordError.value = 'Incorrect password. Please try again.'
    passwordInput.value = ''
  }
}

// ─── State ───────────────────────────────────────────────
const isOpen = ref(props.visible)
const selectedFile = ref<File | null>(null)
const previewUrl = ref<string | null>(null)
const memoryTitle = ref('')
const memoryDate = ref('')
const memoryLocation = ref('')
const memoryNotes = ref('')
const memoryCategory = ref(categoryOptions[0]?.id || 'everyday')
const isSubmitting = ref(false)

// ─── Watchers ──────────────────────────────────────────
watch(
  () => props.visible,
  (newVal) => {
    isOpen.value = newVal
    if (!newVal) {
      resetForm()
    } else {
      isUnlocked.value = false
      passwordInput.value = ''
      passwordError.value = ''
    }
  }
)
watch(isOpen, (newVal) => {
  emit('update:visible', newVal)
  if (!newVal) emit('close')
})

// ─── Methods ─────────────────────────────────────────────
const closeModal = () => { isOpen.value = false }

const resetForm = () => {
  selectedFile.value = null
  previewUrl.value = null
  memoryTitle.value = ''
  memoryDate.value = ''
  memoryLocation.value = ''
  memoryNotes.value = ''
  memoryCategory.value = categoryOptions[0]?.id || 'everyday'
  isUnlocked.value = false
  passwordInput.value = ''
  passwordError.value = ''
}

const handleFileSelect = (event: Event) => {
  const input = event.target as HTMLInputElement
  if (input.files && input.files[0]) {
    const file = input.files[0]
    selectedFile.value = file
    previewUrl.value = URL.createObjectURL(file)
  }
}

const handleDrop = (event: DragEvent) => {
  event.preventDefault()
  const files = event.dataTransfer?.files
  if (files && files[0]) {
    const file = files[0]
    selectedFile.value = file
    previewUrl.value = URL.createObjectURL(file)
  }
}

const handleDragOver = (event: DragEvent) => { event.preventDefault() }

const removeFile = () => {
  selectedFile.value = null
  previewUrl.value = null
}

// ─── Submit: convert image to base64 and store ──────────
const handleSubmit = async () => {
  if (!selectedFile.value) return

  isSubmitting.value = true

  const reader = new FileReader()
  reader.readAsDataURL(selectedFile.value)
  reader.onload = async () => {
    const base64 = reader.result as string

    store.addMemory(
      memoryTitle.value || 'Untitled',
      memoryDate.value || new Date().toISOString().split('T')[0],
      memoryLocation.value || '',
      memoryNotes.value || '',
      base64,
      memoryCategory.value
    )

    isSubmitting.value = false
    closeModal()
  }
  reader.onerror = () => {
    isSubmitting.value = false
    alert('Failed to read image. Please try again.')
  }
}

// ─── Keyboard shortcut ──────────────────────────────────
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
        <!-- Backdrop -->
        <div
          class="absolute inset-0 bg-black/40 backdrop-blur-sm"
          @click="closeModal"
        />

        <!-- Modal Panel -->
        <div
          class="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-cream p-6 shadow-2xl sm:p-8"
        >
          <!-- Close Button -->
          <button
            @click="closeModal"
            class="absolute right-4 top-4 rounded-full p-1.5 text-ink-soft transition-colors hover:bg-stone-200 hover:text-ink sm:right-6 sm:top-6"
            aria-label="Close modal"
          >
            <X class="h-5 w-5" />
          </button>

          <!-- ═══ PASSWORD GATE ═══ -->
          <div v-if="!isUnlocked" class="flex flex-col items-center py-6 text-center">
            <div class="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-clay/10">
              <Lock class="h-6 w-6 text-clay" />
            </div>

            <h2 class="font-display text-2xl font-semibold text-ink sm:text-3xl">
              This area is locked
            </h2>
            <p class="mt-1 text-sm text-ink-soft">
              Enter the password to add a new memory
            </p>

            <form @submit.prevent="checkPassword" class="mt-6 w-full max-w-xs space-y-3">
              <input
                v-model="passwordInput"
                type="password"
                placeholder="Password"
                autofocus
                class="w-full rounded-xl border border-stone-200 bg-white px-4 py-2.5 text-center text-sm text-ink placeholder:text-ink-soft/50 focus:border-clay focus:outline-none focus:ring-2 focus:ring-clay/20"
              />

              <p v-if="passwordError" class="text-sm text-red-500">
                {{ passwordError }}
              </p>

              <button
                type="submit"
                class="w-full rounded-full bg-clay px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-clay/80"
              >
                Unlock
              </button>
            </form>
          </div>

          <!-- ═══ UPLOAD FORM ═══ -->
          <template v-else>
            <div class="mb-6">
              <h2 class="font-display text-2xl font-semibold text-ink sm:text-3xl">
                Add a New Memory
              </h2>
              <p class="mt-1 text-sm text-ink-soft">
                Share a special moment from our story ✨
              </p>
            </div>

            <form @submit.prevent="handleSubmit" class="space-y-5">
              <!-- 1. Photo Upload -->
              <div>
                <label class="mb-1.5 block text-sm font-medium text-ink">
                  Photo or Image
                  <span class="text-clay">*</span>
                </label>

                <div
                  v-if="!previewUrl"
                  @drop="handleDrop"
                  @dragover="handleDragOver"
                  class="flex min-h-[180px] cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-stone-300 bg-stone-50/50 transition-colors hover:border-clay hover:bg-stone-100/50"
                  @click="fileInput?.click()"
                >
                  <Upload class="mb-2 h-10 w-10 text-stone-400" />
                  <p class="text-sm text-ink-soft">
                    Drag & drop your image here, or click to browse
                  </p>
                  <p class="mt-1 text-xs text-ink-soft/60">
                    PNG, JPG, GIF up to 10MB
                  </p>
                  <input
                    ref="fileInput"
                    type="file"
                    accept="image/*"
                    class="hidden"
                    @change="handleFileSelect"
                  />
                </div>

                <div
                  v-else
                  class="group relative overflow-hidden rounded-xl border border-stone-200"
                >
                  <img
                    :src="previewUrl"
                    alt="Memory preview"
                    class="max-h-[300px] w-full object-cover"
                  />
                  <button
                    @click="removeFile"
                    class="absolute right-2 top-2 rounded-full bg-black/60 p-1.5 text-white transition-colors hover:bg-black/80"
                    type="button"
                  >
                    <X class="h-4 w-4" />
                  </button>
                </div>
              </div>

              <!-- 2. Title -->
              <div>
                <label
                  for="memory-title"
                  class="mb-1.5 block text-sm font-medium text-ink"
                >
                  Memory Title
                </label>
                <input
                  id="memory-title"
                  v-model="memoryTitle"
                  type="text"
                  placeholder="e.g., Our first sunset together"
                  class="w-full rounded-xl border border-stone-200 bg-white px-4 py-2.5 text-sm text-ink placeholder:text-ink-soft/50 focus:border-clay focus:outline-none focus:ring-2 focus:ring-clay/20"
                />
              </div>

              <!-- 3. Date & Location -->
              <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label
                    for="memory-date"
                    class="mb-1.5 block text-sm font-medium text-ink"
                  >
                    <Calendar class="mr-1 inline h-4 w-4" />
                    Date
                  </label>
                  <input
                    id="memory-date"
                    v-model="memoryDate"
                    type="date"
                    class="w-full rounded-xl border border-stone-200 bg-white px-4 py-2.5 text-sm text-ink placeholder:text-ink-soft/50 focus:border-clay focus:outline-none focus:ring-2 focus:ring-clay/20"
                  />
                </div>

                <div>
                  <label
                    for="memory-location"
                    class="mb-1.5 block text-sm font-medium text-ink"
                  >
                    <MapPin class="mr-1 inline h-4 w-4" />
                    Location
                  </label>
                  <input
                    id="memory-location"
                    v-model="memoryLocation"
                    type="text"
                    placeholder="e.g., Paris, France"
                    class="w-full rounded-xl border border-stone-200 bg-white px-4 py-2.5 text-sm text-ink placeholder:text-ink-soft/50 focus:border-clay focus:outline-none focus:ring-2 focus:ring-clay/20"
                  />
                </div>
              </div>

              <!-- 4. Description (Notes) -->
              <div>
                <label
                  for="memory-notes"
                  class="mb-1.5 block text-sm font-medium text-ink"
                >
                  Description
                </label>
                <textarea
                  id="memory-notes"
                  v-model="memoryNotes"
                  rows="3"
                  placeholder="What made this moment special?"
                  class="w-full rounded-xl border border-stone-200 bg-white px-4 py-2.5 text-sm text-ink placeholder:text-ink-soft/50 focus:border-clay focus:outline-none focus:ring-2 focus:ring-clay/20"
                />
              </div>

              <!-- 5. Category (moved to last field) -->
              <div>
                <label
                  for="memory-category"
                  class="mb-1.5 block text-sm font-medium text-ink"
                >
                  <Tag class="mr-1 inline h-4 w-4" />
                  Category
                </label>
                <select
                  id="memory-category"
                  v-model="memoryCategory"
                  class="w-full h-10 rounded-xl border border-stone-200 bg-white px-4 py-2.5 text-sm text-ink focus:border-clay focus:outline-none focus:ring-2 focus:ring-clay/20"
                >
                  <option
                    v-for="cat in categoryOptions"
                    :key="cat.id"
                    :value="cat.id"
                  >
                    {{ cat.label }}
                  </option>
                </select>
              </div>

              <!-- Actions -->
              <div class="flex gap-3 pt-2">
                <button
                  type="button"
                  @click="closeModal"
                  class="flex-1 rounded-full border border-stone-200 px-6 py-2.5 text-sm font-medium text-ink-soft transition-colors hover:bg-stone-100 hover:text-ink sm:flex-none sm:px-8"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  :disabled="isSubmitting || !selectedFile"
                  class="flex-1 rounded-full bg-clay px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-clay/80 disabled:cursor-not-allowed disabled:opacity-50 sm:flex-none sm:px-8"
                >
                  <span v-if="isSubmitting">Saving…</span>
                  <span v-else>Save Memory</span>
                </button>
              </div>
            </form>
          </template>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.overflow-y-auto {
  scrollbar-width: thin;
  scrollbar-color: #d6d3d1 transparent;
}

.overflow-y-auto::-webkit-scrollbar {
  width: 4px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: transparent;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #d6d3d1;
  border-radius: 9999px;
}
</style>