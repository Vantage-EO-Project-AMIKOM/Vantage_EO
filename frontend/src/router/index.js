import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '@/views/AboutView.vue'
import ContactView from '@/views/ContactView.vue'
import EventView from '../views/EventView.vue'
import OurHistoryView from '@/views/OurHistoryView.vue'
import ProfileView from '@/views/ProfileView.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import AdminDashboard from '@/views/AdminDashboard.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView,
    },
    {
      path: '/event',
      name: 'event',
      component: EventView,
    },
    {
      path: '/contact',
      name: 'contact',
      component: ContactView,
    },
    {
      path: '/ourHistory',
      name: 'ourHistory',
      component: OurHistoryView,
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
    },
    {
      path: '/admin',
      name: 'admin',
      component: AdminDashboard,
    },
  ],
})
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  const storedUser = localStorage.getItem('user')
  let user = null

  if (storedUser) {
    try {
      user = JSON.parse(storedUser)
    } catch {
      user = null
    }
  }

  if (to.name === 'admin' && !token) {
    // Not logged in, trying to access admin → redirect to login
    next('/login')
  } else if (to.name === 'admin' && user?.role !== 'admin') {
    // Logged in but not admin → redirect to home
    next('/')
  } else {
    // All good, proceed
    next()
  }
})
export default router
