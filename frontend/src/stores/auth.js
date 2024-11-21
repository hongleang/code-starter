import { defineStore } from 'pinia'
import http from '@/utils/http'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    isAuthenticated: false,
  }),

  actions: {
    async getLoggedInUser() {
      try {
        const response = await http.get('/api/user')
        this.user = response.data
        this.isAuthenticated = !!this.user
      } catch (error) {
        this.user = null
        this.isAuthenticated = false
      }
    },
    async login(credential) {
      try {
        const response = await http.post('/login', credential)
        this.user = response.data
        this.isAuthenticated = !!this.user
      } catch (error) {
        throw error ? error.response : error
      }
    },
    async register(credential) {
      try {
        const response = await http.post('/register', credential)
        this.user = response.data
        this.isAuthenticated = !!this.user
      } catch (error) {
        throw error ? error.response : error
      }
    },
    async logout() {
      try {
        await http.post('/logout')
      } catch (error) {
        throw error ? error.response : error
      } finally {
        this.user = null
        this.isAuthenticated = false
      }
    },
  },
})
