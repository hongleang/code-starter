<script setup>
import VInputError from './VInputError.vue'
import VInputLabel from './VInputLabel.vue'

defineProps({
  error: {
    type: String,
  },
  label: {
    type: String,
  },
  name: {
    type: String,
  },
})
</script>

<template>
  <div class="mb-3">
    <VInputLabel v-if="label" :for="name" :value="label" />
    <slot />
    <VInputError class="mt-2" :message="error" />
  </div>
</template>

<style lang="scss" scoped></style>
