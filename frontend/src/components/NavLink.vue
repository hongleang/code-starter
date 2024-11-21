<template>
  <li>
    <RouterLink :to="to" class="nav-link px-2" :class="[$attrs.class, activeClass]">
      <slot />
    </RouterLink>
  </li>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  to: {
    type: String || Object,
    required: true,
  },
  active: {
    type: Boolean,
  },
})

const activeClass = computed(() => (props.active ? 'link-dark fw-semibold' : 'link-secondary'))
</script>

<style lang="scss" scoped></style>
