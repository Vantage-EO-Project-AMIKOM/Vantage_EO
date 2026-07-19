import { defineStore } from 'pinia'

const storedExpiresAt = localStorage.getItem('token_expires_at')
const storedTokenIsExpired = storedExpiresAt && new Date(storedExpiresAt).getTime() <= Date.now()

if (storedTokenIsExpired) {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
  localStorage.removeItem('token_expires_at')
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || null,
    user: JSON.parse(localStorage.getItem('user')) || null,
    expiresAt: localStorage.getItem('token_expires_at') || null,
  }),

  getters: {
    isLoggedIn: (state) => !!state.token,
    isAdmin: (state) => state.user?.role === 'admin',
  },

  actions: {
    setAuth(token, user, expiresAt = null) {
      this.token = token
      this.user = user
      this.expiresAt = expiresAt
      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(user))
      if (expiresAt) localStorage.setItem('token_expires_at', expiresAt)
    },

    logout() {
      this.token = null
      this.user = null
      this.expiresAt = null
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      localStorage.removeItem('token_expires_at')
    }
  }
})
