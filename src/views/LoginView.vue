<template>
  <div class="login-container">
    <div class="login-box">
      <button
        class="back-btn w-auto items-center justify-center rounded-full bg-[#EE0034] px-3 py-2 text-sm font-semibold text-white transition hover:-translate-y-1 hover:bg-[#c9002c]"
        type="button"
        @click="router.push('/')"
        aria-label="Back"
        style="text-transform: none"
      >
        <i class="fa fa-arrow-left"></i> Go Back
      </button>
      <h2>Welcome Back</h2>
      <p class="subtitle">Sign in to your Vantage account</p>

      <div v-if="errorMessage" class="error">{{ errorMessage }}</div>

      <div class="form-group">
        <label>Email</label>
        <input v-model="email" type="email" placeholder="you@example.com" />
      </div>

      <div class="form-group">
        <label>Password</label>
        <input v-model="password" type="password" placeholder="••••••••" />
      </div>

      <button @click="handleLogin" :disabled="loading">
        {{ loading ? 'Signing in...' : 'Sign In' }}
      </button>

      <p class="register-link">Don't have an account? <a href="/register">Register</a></p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { authApi } from '@/lib/http'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()
const email = ref('')
const password = ref('')
const errorMessage = ref('')
const loading = ref(false)

async function handleLogin() {
  loading.value = true
  errorMessage.value = ''

  const normalizedEmail = email.value.trim().toLowerCase()

  try {
    const response = await authApi.post('/login', {
      email: normalizedEmail,
      password: password.value,
    })

    authStore.setAuth(response.data.token, response.data.user)

    if (response.data.user.role === 'admin') {
      router.push('/admin')
    } else {
      router.push('/')
    }
  } catch (error) {
    console.error('Login failed:', error)
    errorMessage.value = 'Invalid email or password. Please try again.'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
/* Latar belakang luar menggunakan warna pekat agar kontras */
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #17202a;
  padding: 1.5rem;
}

/* Menggunakan tema kontainer biru tua Vantage #2B3B4C */
.login-box {
  background: #2b3b4c;
  padding: 3rem 2.5rem;
  border-radius: 2.5rem; /* Lengkungan disamakan dengan komponen lainnya */
  width: 100%;
  max-width: 450px;
  box-shadow: 0 15px 50px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.back-btn {
  width: auto;
  margin-bottom: 1rem;
}

h2 {
  margin: 0 0 0.3rem;
  font-size: 26px;
  color: #ffffff;
  font-weight: 700;
  text-transform: capitalize;
}

.subtitle {
  color: rgba(255, 255, 255, 0.6);
  font-size: 14px;
  margin: 0 0 2rem;
}

.form-group {
  margin-bottom: 1.25rem;
}

.form-group label {
  display: block;
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 8px;
  color: #ffffff;
}

/* Input text diatur melingkar penuh (rounded-full) ber-background putih */
.form-group input {
  width: 100%;
  padding: 0.8rem 1.2rem;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 9999px;
  font-size: 14px;
  box-sizing: border-box;
  background-color: #ffffff;
  color: #000000;
  outline: none;
  transition: all 0.3s ease;
}

.form-group input:focus {
  border-color: #ee0034; /* Focus border menggunakan warna merah */
  box-shadow: 0 0 0 3px rgba(238, 0, 52, 0.2);
}

/* Tombol Sign In utama dengan warna merah khas Vantage #EE0034 */
button {
  width: 100%;
  padding: 0.9rem;
  background: #ee0034;
  color: white;
  border: none;
  border-radius: 9999px;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  margin-top: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(238, 0, 52, 0.3);
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  box-shadow: none;
}

button:hover:not(:disabled) {
  background: #d6002f;
  transform: translateY(-1px);
}

.error {
  background: rgba(220, 38, 38, 0.2);
  color: #fca5a5;
  border: 1px solid rgba(220, 38, 38, 0.2);
  padding: 0.7rem 1rem;
  border-radius: 12px;
  font-size: 13px;
  margin-bottom: 1.25rem;
}

.register-link {
  text-align: center;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.6);
  margin-top: 1.5rem;
}

.register-link a {
  color: #ee0034;
  font-weight: 600;
  text-decoration: none;
  transition: color 0.2s ease;
}

.register-link a:hover {
  color: #ffffff;
  text-decoration: underline;
}
</style>
