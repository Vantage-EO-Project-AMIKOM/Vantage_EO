<template>
  <div class="register-container">
    <div class="register-box">
      <button
        class="back-btn inline-flex w-auto items-center justify-center rounded-full bg-[#EE0034] px-3 py-2 text-sm font-semibold text-white transition hover:-translate-y-1 hover:bg-[#c9002c]"
        type="button"
        @click="router.push('/')"
        aria-label="Back"
        style="text-transform: none"
      >
        <i class="fa fa-arrow-left"></i> Go Back
      </button>
      <h2>Create Account</h2>
      <p class="subtitle">Join Vantage today</p>

      <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
      <div v-if="successMessage" class="success">{{ successMessage }}</div>

      <div class="form-group">
        <label>Full Name</label>
        <input v-model="name" type="text" placeholder="Your full name" />
      </div>

      <div class="form-group">
        <label>Email</label>
        <input v-model="email" type="email" placeholder="you@example.com" />
      </div>

      <div class="form-group">
        <label>Password</label>
        <input v-model="password" type="password" placeholder="••••••••" />
      </div>

      <div class="form-group">
        <label>Confirm Password</label>
        <input v-model="passwordConfirm" type="password" placeholder="••••••••" />
      </div>

      <button @click="handleRegister" :disabled="loading">
        {{ loading ? 'Creating account...' : 'Register' }}
      </button>

      <p class="login-link">Already have an account? <a href="/login">Sign In</a></p>
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
const name = ref('')
const email = ref('')
const password = ref('')
const passwordConfirm = ref('')
const errorMessage = ref('')
const successMessage = ref('')
const loading = ref(false)

async function handleRegister() {
  errorMessage.value = ''
  successMessage.value = ''

  if (password.value !== passwordConfirm.value) {
    errorMessage.value = 'Passwords do not match!'
    return
  }

  loading.value = true

  try {
    const response = await authApi.post('/register', {
      name: name.value,
      email: email.value,
      password: password.value,
      password_confirmation: passwordConfirm.value,
    })

    authStore.setAuth(response.data.token, response.data.user)
    successMessage.value = 'Account created! Redirecting...'
    setTimeout(() => router.push('/event'), 800)
  } catch (error) {
    errorMessage.value = error.response?.data?.message || 'Registration failed.'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
/* Latar belakang luar dibuat gelap atau kontras seimbang */
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #17202a; /* Menyesuaikan warna gelap pekat backdrop luar */
  padding: 1.5rem;
}

/* Box menggunakan tema biru tua Vantage #2B3B4C */
.register-box {
  background: #2b3b4c;
  padding: 3rem 2.5rem;
  border-radius: 2.5rem; /* Lengkungan disamakan dengan modul lainnya */
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

/* Input text disesuaikan dengan form field di contact us (background putih, teks hitam) */
.form-group input {
  width: 100%;
  padding: 0.8rem 1.2rem;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 9999px; /* Dibuat melingkar (rounded-full) agar sama dengan contact us */
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

/* Tombol utama dengan warna merah khas Vantage #EE0034 */
button {
  width: 100%;
  padding: 0.9rem;
  background: #ee0034;
  color: white;
  border: none;
  border-radius: 9999px; /* rounded-full */
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

.success {
  background: rgba(22, 163, 74, 0.2);
  color: #86efac;
  border: 1px solid rgba(22, 163, 74, 0.2);
  padding: 0.7rem 1rem;
  border-radius: 12px;
  font-size: 13px;
  margin-bottom: 1.25rem;
}

.login-link {
  text-align: center;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.6);
  margin-top: 1.5rem;
}

.login-link a {
  color: #ee0034;
  font-weight: 600;
  text-decoration: none;
  transition: color 0.2s ease;
}

.login-link a:hover {
  color: #ffffff;
  text-decoration: underline;
}
</style>
