<script setup>
import ApplicationLogo from '@/components/ApplicationLogo.vue'
import NavLink from '@/components/NavLink.vue'
import { useAuthStore } from '@/stores/auth'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const routeIsActive = (routeName) => route.name === routeName

const authStore = useAuthStore()
const router = useRouter()

const logout = async () => {
  try {
    await authStore.logout()
    router.push({ name: 'login' })
  } catch (error) {
    console.log(error)
  }
}
</script>

<template>
  <header class="p-3 mb-3 border-bottom bg-white shadow-sm">
    <div class="container">
      <div
        class="d-flex flex-wrap gap-3 align-items-center justify-content-center justify-content-lg-start"
      >
        <RouterLink
          to="/"
          class="d-flex align-items-center mb-2 mb-lg-0 link-body-emphasis text-decoration-none"
        >
          <ApplicationLogo class="" />
        </RouterLink>

        <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
          <NavLink to="/" :active="routeIsActive('dashboard')"> Dashboard </NavLink>
          <NavLink to="/" :active="routeIsActive('other')"> Product </NavLink>
          <NavLink to="/" :active="routeIsActive('other')"> Budget </NavLink>
        </ul>

        <div class="col-auto ms-auto text-end">
          <div class="hstack gap-2">
            <slot name="headerBtn" />
            <div class="dropdown text-end">
              <button
                class="d-block link-body-emphasis text-decoration-none dropdown-toggle btn"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img
                  src="https://placehold.co/32x32/png"
                  alt="mdo"
                  width="32"
                  height="32"
                  class="rounded-circle"
                />
              </button>
              <ul class="dropdown-menu text-small">
                <li>
                  <RouterLink class="dropdown-item" to="/">Settings</RouterLink>
                </li>
                <li>
                  <RouterLink class="dropdown-item">Profile</RouterLink>
                </li>
                <li><hr class="dropdown-divider" /></li>
                <li>
                  <button @click="logout" to="/" class="dropdown-item">Sign out</button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>

  <main>
    <slot />
  </main>
</template>

<style lang="scss"></style>
