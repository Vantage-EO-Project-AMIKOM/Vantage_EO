import { defineStore } from 'pinia'

// Helper aman untuk parse JSON dari localStorage
function getStoredUser() {
  try {
    const user = localStorage.getItem('user')
    return user ? JSON.parse(user) : null
  } catch (error) {
    console.error('Failed to parse user from localStorage:', error)
    localStorage.removeItem('user')
    return null
  }
}

// Cek dan bersihkan token yang kadaluwarsa saat pertama kali di-load
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
    user: getStoredUser(),
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

      if (token) {
        localStorage.setItem('token', token)
      } else {
        localStorage.removeItem('token')
      }

      if (user) {
        localStorage.setItem('user', JSON.stringify(user))
      } else {
        localStorage.removeItem('user')
      }

      if (expiresAt) {
        localStorage.setItem('token_expires_at', expiresAt)
      } else {
        localStorage.removeItem('token_expires_at')
      }
    },

    logout() {
      this.token = null
      this.user = null
      this.expiresAt = null

      localStorage.removeItem('token')
      localStorage.removeItem('user')
      localStorage.removeItem('token_expires_at')
    },
  },
})

export default useAuthStore