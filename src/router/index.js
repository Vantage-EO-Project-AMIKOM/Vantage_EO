import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '@/views/AboutView.vue'
import ContactView from '@/views/ContactView.vue'
import EventView from '../views/EventView.vue'
import EventDetailView from '@/views/EventDetailView.vue'
import CreateEventView from '@/views/CreateEventView.vue'
import JoinEventView from '@/views/JoinEventView.vue'
import OurHistoryView from '@/views/OurHistoryView.vue'
import ProfileView from '@/views/ProfileView.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import MyEventView from '@/views/MyEventView.vue'
import MyTicketView from '@/views/MyTicketView.vue'
import AdminDashboard from '@/views/AdminDashboard.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  // Menambahkan scrollBehavior agar halaman otomatis scroll ke paling atas saat navigasi
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  },
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
      path: '/event/:slug',
      name: 'event-detail',
      component: EventDetailView,
    },
    {
      path: '/event/create',
      name: 'event-create',
      component: CreateEventView,
      meta: { requiresAuth: true },
    },
    {
      path: '/event/:slug/join',
      name: 'event-join',
      component: JoinEventView,
      meta: { requiresAuth: true },
    },
    {
      path: '/my-events',
      name: 'my-events',
      component: MyEventView,
      meta: { requiresAuth: true },
    },
    {
      path: '/my-tickets',
      name: 'my-tickets',
      component: MyTicketView,
      meta: { requiresAuth: true },
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
      meta: { requiresAuth: true },
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
      meta: { requiresAuth: true, requiresAdmin: true },
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

  if (to.meta.requiresAuth && !token) {
    // Not logged in, trying to access protected page/admin → redirect to login
    next('/login')
  } else if (to.meta.requiresAdmin && user?.role !== 'admin') {
    // Logged in but not admin → redirect to home
    next('/')
  } else {
    // All good, proceed
    next()
  }
})

export default router
