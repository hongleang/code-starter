<script setup>
import ApplicationLogo from '@/components/ApplicationLogo.vue';
</script>

<template>
  <div class="guest-layout">
    <div>
      <RouterLink to="/">
        <ApplicationLogo class="" />
      </RouterLink>
    </div>

    <div class="overflow-hidden card card-authentication mt-4">
      <div class="card-body">
        <slot />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.guest-layout {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  align-items: center;
  @media (min-width: 640px) {
    justify-content: center;
    padding-top: 0;
  }
}

.card-authentication {
  width: 100%;
  @media (min-width: 640px) {
    max-width: 28rem;
  }
}
</style>
