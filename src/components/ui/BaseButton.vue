<script setup lang="ts">
withDefaults(
  defineProps<{
    variant?: 'primary' | 'ghost'
    href?: string
    to?: string
  }>(),
  { variant: 'primary' }
)

const base =
  'inline-flex items-center gap-2.5 rounded-full px-6 py-3 text-sm font-medium transition-all duration-300'
const variants = {
  primary: 'bg-clay text-ivory hover:bg-clay-dark hover:shadow-soft active:scale-[0.98]',
  ghost: 'bg-stone-100/70 text-ink hover:bg-stone-200 active:scale-[0.98]',
}
</script>

<template>
  <router-link
    v-if="to"
    :to="to"
    :class="[base, variants[variant]]"
  >
    <slot name="icon" />
    <slot />
  </router-link>
  <component
    :is="href ? 'a' : 'button'"
    v-else
    :href="href"
    :class="[base, variants[variant]]"
  >
    <slot name="icon" />
    <slot />
  </component>
</template>
