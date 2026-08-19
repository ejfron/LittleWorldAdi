import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import { get, set } from 'idb-keyval'
import {
  memories as initialMemories,
  galleryPhotos as initialPhotos,
} from '@/data/content'
import type { Memory, GalleryPhoto } from '@/types'

const UPLOADED_MEMORIES_KEY = 'our-little-world:uploaded-memories'
const UPLOADED_PHOTOS_KEY = 'our-little-world:uploaded-photos'

function generateId(prefix: string): string {
  const random = Math.random().toString(36).slice(2, 8)
  return `${prefix}${Date.now()}-${random}`
}

export const useMemoryStore = defineStore('memory', () => {
  const memories = ref<Memory[]>(
    Array.isArray(initialMemories) ? [...initialMemories] : []
  )
  const galleryPhotos = ref<GalleryPhoto[]>(
    Array.isArray(initialPhotos) ? [...initialPhotos] : []
  )

  const isHydrated = ref(false)

  async function loadPersisted() {
    try {
      const [savedMemories, savedPhotos] = await Promise.all([
        get<Memory[]>(UPLOADED_MEMORIES_KEY),
        get<GalleryPhoto[]>(UPLOADED_PHOTOS_KEY),
      ])

      if (Array.isArray(savedMemories) && savedMemories.length > 0) {
        memories.value = [...savedMemories, ...initialMemories]
      }

      if (Array.isArray(savedPhotos) && savedPhotos.length > 0) {
        galleryPhotos.value = [...savedPhotos, ...initialPhotos]
      }
    } catch (err) {
      console.error('Failed to load saved memories from IndexedDB:', err)
    } finally {
      isHydrated.value = true
    }
  }

  loadPersisted()

  function persistUploaded() {
    const uploadedMemories = memories.value.filter(
      (m) => !initialMemories.some((im) => im.id === m.id)
    )
    const uploadedPhotos = galleryPhotos.value.filter(
      (p) => !initialPhotos.some((ip) => ip.id === p.id)
    )

    const plainMemories = JSON.parse(JSON.stringify(uploadedMemories))
    const plainPhotos = JSON.parse(JSON.stringify(uploadedPhotos))

    set(UPLOADED_MEMORIES_KEY, plainMemories).catch((err) =>
      console.error('Failed to save memories to IndexedDB:', err)
    )
    set(UPLOADED_PHOTOS_KEY, plainPhotos).catch((err) =>
      console.error('Failed to save photos to IndexedDB:', err)
    )
  }

  // deep:true so removals (splice/filter reassignment) are caught too
  watch(memories, persistUploaded, { deep: true })
  watch(galleryPhotos, persistUploaded, { deep: true })

  function addMemory(
    title: string,
    date: string,
    location: string,
    notes: string,
    imageBase64: string,
    category: string = 'everyday'
  ) {
    const id = generateId('m')
    const parts = [notes, location].filter(Boolean)
    const quote = parts.length ? parts.join(' — ') : 'A beautiful memory'

    const newMemory: Memory = {
      id,
      quote,
      date: date || new Date().toISOString().split('T')[0],
      image: imageBase64,
    }

    const newPhoto: GalleryPhoto = {
      id: generateId('g'),
      image: imageBase64,
      alt: title || 'New memory',
      category,
    }

    memories.value.unshift(newMemory)
    galleryPhotos.value.unshift(newPhoto)
  }

  // ─── Delete actions ───────────────────────────────────────
  // Note: these only meaningfully persist for items that were
  // added via the upload form (their id contains a dash + random
  // suffix, e.g. "m1734567890123-ab12cd"). Original content.ts
  // items (id like "m1", "g5") aren't tracked in a "deleted" list,
  // so removing one here would reappear after a reload — the UI
  // should prevent deleting those rather than let it silently fail.
  function deleteMemory(id: string) {
    memories.value = memories.value.filter((m) => m.id !== id)
  }

  function deletePhoto(id: string) {
    galleryPhotos.value = galleryPhotos.value.filter((p) => p.id !== id)
  }

  async function clearUploaded() {
    memories.value = [...initialMemories]
    galleryPhotos.value = [...initialPhotos]
    await Promise.all([
      set(UPLOADED_MEMORIES_KEY, []),
      set(UPLOADED_PHOTOS_KEY, []),
    ])
  }

  return {
    memories,
    galleryPhotos,
    isHydrated,
    addMemory,
    deleteMemory,
    deletePhoto,
    clearUploaded,
  }
})