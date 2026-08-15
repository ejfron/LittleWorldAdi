<script setup lang="ts">
withDefaults(
  defineProps<{
    filled?: boolean
    strokeWidth?: number
  }>(),
  { filled: false, strokeWidth: 1.6 }
)
</script>

<template>
  <svg
    viewBox="0 0 24 24"
    :fill="filled ? 'currentColor' : 'none'"
    :stroke="'currentColor'"
    :stroke-width="strokeWidth"
    stroke-linecap="round"
    stroke-linejoin="round"
    class="h-full w-full"
    aria-hidden="true"
  >
    <path
      d="M12 20.5s-7.5-4.6-10-9.3C.4 8.1 1.7 4.5 5 3.4c2.2-.7 4.4.2 5.6 2 .4.6 1.4.6 1.8 0 1.2-1.8 3.4-2.7 5.6-2 3.3 1.1 4.6 4.7 3 7.8-2.5 4.7-10 9.3-10 9.3Z"
    />
  </svg>
</template>
