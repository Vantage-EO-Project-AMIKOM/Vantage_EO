import axios from 'axios'

/**
 * One axios instance per microservice, each pointed at its own base URL
 * from .env. All instances attach the Sanctum bearer token automatically
 * so individual views don't need to repeat that logic.
 */
function createApiClient(baseURL) {
  const instance = axios.create({
    baseURL,
    // A stopped microservice must not leave screens in a permanent loading state.
    timeout: 8000,
  })

  instance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')
    if (token && token !== 'admin-token') {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  })

  return instance
}

export const authApi = createApiClient(import.meta.env.VITE_AUTH_API_URL)
export const eventApi = createApiClient(import.meta.env.VITE_EVENT_API_URL)
export const ticketApi = createApiClient(import.meta.env.VITE_TICKET_API_URL)
export const analyticsApi = createApiClient(import.meta.env.VITE_ANALYTICS_API_URL)
