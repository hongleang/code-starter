<script setup>
import { computed } from 'vue'
import { RouterLink as Link } from 'vue-router'

const props = defineProps({
  href: {
    type: String || Object,
    required: true,
  },
  active: {
    type: Boolean,
  },
})

const classes = computed(() =>
  props.active
    ? 'nav-link active'
    : 'nav-link',
)
</script>

<template>
  <Link :to="href" :class="classes">
    <slot />
  </Link>
</template>
