import { createRouter, createWebHistory } from 'vue-router'
import authRoutes from './auth'
import Login from '@/pages/auth/LoginView.vue'
import Register from '@/pages/auth/RegisterView.vue'
import ForgotPassword from '@/pages/auth/ForgotPassword.vue'
import { useAuthStore } from '@/stores/auth'
import { storeToRefs } from 'pinia'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    ...authRoutes,
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        requiresGuest: true,
      },
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      meta: {
        requiresGuest: true,
      },
    },
    {
      path: '/forgot-password',
      name: 'forgot-password',
      component: ForgotPassword,
      meta: {
        requiresGuest: true,
      },
    },
  ],
})

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)
  const requiresGuest = to.matched.some((record) => record.meta.requiresGuest)
  const authStore = useAuthStore()
  const { isAuthenticated } = storeToRefs(authStore)

  await authStore.getLoggedInUser()
  if (requiresAuth) {
    if (!isAuthenticated.value) {
      next({ name: 'login' })
    } else {
      next()
    }
  } else if (requiresGuest) {
    if (isAuthenticated.value) {
      next({ name: 'dashboard' })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
