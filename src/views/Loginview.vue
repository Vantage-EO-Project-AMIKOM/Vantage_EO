<template>
  <div class="login-container">
    <div class="login-box">
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

      <p class="register-link">
        Don't have an account? <a href="/register">Register</a>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()
const email = ref('')
const password = ref('')
const errorMessage = ref('')
const loading = ref(false)

async function handleLogin() {
  loading.value = true
  errorMessage.value = ''

  try {
    const response = await axios.post('http://localhost:8000/api/login', {
      email: email.value,
      password: password.value,
    })

    localStorage.setItem('token', response.data.token)
    router.push('/')
  } catch (error) {
    errorMessage.value = 'Invalid email or password.'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
}
.login-box {
  background: white;
  padding: 2.5rem;
  border-radius: 12px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.1);
}
h2 {
  margin: 0 0 0.3rem;
  font-size: 22px;
}
.subtitle {
  color: #888;
  font-size: 14px;
  margin: 0 0 1.5rem;
}
.form-group {
  margin-bottom: 1rem;
}
.form-group label {
  display: block;
  font-size: 13px;
  font-weight: 500;
  margin-bottom: 6px;
  color: #555;
}
.form-group input {
  width: 100%;
  padding: 0.6rem 0.8rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  box-sizing: border-box;
}
.form-group input:focus {
  outline: none;
  border-color: #4f46e5;
}
button {
  width: 100%;
  padding: 0.7rem;
  background: #4f46e5;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  margin-top: 0.5rem;
}
button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
button:hover:not(:disabled) {
  background: #4338ca;
}
.error {
  background: #fee2e2;
  color: #dc2626;
  padding: 0.6rem 1rem;
  border-radius: 8px;
  font-size: 13px;
  margin-bottom: 1rem;
}
.register-link {
  text-align: center;
  font-size: 13px;
  color: #888;
  margin-top: 1.2rem;
}
.register-link a {
  color: #4f46e5;
  text-decoration: none;
}
</style>