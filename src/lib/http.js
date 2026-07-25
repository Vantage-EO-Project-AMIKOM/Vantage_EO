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
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  })

  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      const isAuthForm = ['/login', '/register'].some((path) => error.config?.url?.endsWith(path))

      if (error.response?.status === 401 && localStorage.getItem('token') && !isAuthForm) {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        localStorage.removeItem('token_expires_at')

        if (window.location.pathname !== '/login') window.location.assign('/login')
      }

      return Promise.reject(error)
    },
  )

  return instance
}

const productionAuthApiUrl = '/api/auth'
const configuredAuthApiUrl = import.meta.env.VITE_AUTH_API_URL
const authApiUrl = !configuredAuthApiUrl || configuredAuthApiUrl.includes('vantage-amikom.netlify.app')
  ? productionAuthApiUrl
  : configuredAuthApiUrl

export const authApi = createApiClient(authApiUrl)

const productionEventApiUrl = '/api/event'
const configuredEventApiUrl = import.meta.env.VITE_EVENT_API_URL
const eventApiUrl = !configuredEventApiUrl || configuredEventApiUrl.includes('vantage-amikom.netlify.app')
  ? productionEventApiUrl
  : configuredEventApiUrl

export const eventApi = createApiClient(eventApiUrl)
// Ticketing lives inside the event service. A separate URL remains optional
// for deployment flexibility, but local development safely uses eventApiUrl.
export const ticketApi = createApiClient(import.meta.env.VITE_TICKET_API_URL || eventApiUrl)
export const analyticsApi = createApiClient(import.meta.env.VITE_ANALYTICS_API_URL)

// PERBAIKAN: Menambahkan export default agar tidak terjadi SyntaxError "Importing binding name 'default'"
export default {
  authApi,
  eventApi,
  ticketApi,
  analyticsApi,
}
