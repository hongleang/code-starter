<script setup>
defineProps({
  message: {
    type: String,
  },
})
</script>

<template>
  <div v-show="message">
    <p class="invalid-feedback d-block">
      {{ message }}
    </p>
  </div>
</template>
