import Dashboard from '@/pages/DashboardView.vue'

let authRoutes = [
  {
    path: '/',
    name: 'dashboard',
    component: Dashboard,
  },
]

// Add meta to signifies that the route requires authentication
authRoutes = authRoutes.map((element) => ({
  ...element,
  meta: {
    requiresAuth: true,
  },
}))

export default authRoutes
