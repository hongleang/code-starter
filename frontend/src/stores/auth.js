import { defineStore } from 'pinia'
import http from '@/utils/http'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    authenticated: false,
  }),

  actions: {
    setUser(user) {
      this.user = user
      this.authenticated = !!user
    },

    clearUser() {
      this.user = null
      this.authenticated = false
    },

    async getUser() {
      try {
        const response = await http.get('/user')
        this.setUser(response.data)
      } catch (error) {
        this.clearUser()
      }
    },

    async login(credentials) {
      try {
        await http.get('/sanctum/csrf-cookie')
        const response = await http.post('/login', credentials)
        this.setUser(response.data)
      } catch (error) {
        this.clearUser()
      }
    },

    async logout() {
      try {
        await http.post('/logout')
        this.clearUser()
      } catch (error) {
        this.clearUser()
      }
    },
  },
})
