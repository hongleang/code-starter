<script setup>
import { computed } from 'vue'
const props = defineProps({
  type: {
    type: String,
    default: 'button',
  },
  variant: {
    type: String,
  },
  loading: {
    type: Boolean,
    default: false,
  },
})

const variantClasses = computed(() => {
  const classes = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
  }

  return classes[props.variant] || ''
})
</script>

<template>
  <button :type="type" class="btn" :class="[variantClasses, { 'opacity-25': loading }]" >
    <div v-if="loading" role="status" class="d-flex align-items-center justify-content-center">
      <div class="spinner-border spinner-border-sm">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
    <slot v-else />
  </button>
</template>

<style scoped>
.btn {
  min-height: 38px;
  min-width: 78px;
}
</style>