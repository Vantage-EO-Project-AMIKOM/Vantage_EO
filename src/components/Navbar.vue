<script setup>
import { ref, watch, defineOptions } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { authApi } from '@/lib/http'

defineOptions({
  name: 'AppNavbar',
})

const isOpen = ref(false)
const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const searchQuery = ref('')

async function handleLogout() {
  try {
    await authApi.post('/logout')
  } catch {
    // Clear local authentication even if the token has already expired.
  } finally {
    authStore.logout()
    router.push('/')
  }
}

function handleSearch() {
  const query = searchQuery.value.trim()

  if (query) {
    router.push({ path: '/event', query: { search: query } })
  } else {
    router.push('/event')
  }
}

watch(
  () => route.path,
  () => {
    isOpen.value = false
  },
)

watch(
  () => route.query.search,
  (value) => {
    searchQuery.value = value ? String(value) : ''
  },
  { immediate: true },
)
</script>

<template>
  <nav
    class="fixed top-5 left-1/2 z-50 flex h-16 w-[95%] -translate-x-1/2 items-center justify-between rounded-full bg-[#EE0034] px-5 text-white shadow-xl xl:w-[90%] xl:px-10"
  >
    <RouterLink to="/" class="flex items-center justify-center">
      <img src="./img/onlyLogo.png" alt="Logo" class="mr-2 h-8 w-auto xl:h-10" draggable="false" />
      <p class="text-lg font-bold text-blue-950">Vantage</p>
    </RouterLink>

    <!-- Desktop Navigation -->
    <div class="hidden items-center space-x-6 xl:flex">
      <RouterLink
        to="/"
        exact-active-class="text-blue-950 font-bold"
        class="transition-all hover:text-blue-800"
      >
        Home
      </RouterLink>
      <RouterLink
        to="/event"
        exact-active-class="text-blue-950 font-bold"
        class="transition-all hover:text-blue-800"
      >
        Event
      </RouterLink>

      <!-- Navigasi khusus User Login -->
      <RouterLink
        v-if="authStore.isLoggedIn"
        to="/my-events"
        active-class="text-blue-950 font-bold"
        class="transition-all hover:text-blue-800"
      >
        {{ authStore.user?.role === 'admin' ? 'Manage Events' : 'My Events' }}
      </RouterLink>
      <RouterLink
        v-if="authStore.isLoggedIn"
        to="/my-tickets"
        active-class="text-blue-950 font-bold"
        class="transition-all hover:text-blue-800"
      >
        My Tickets
      </RouterLink>

      <RouterLink
        to="/about"
        active-class="text-blue-950 font-bold"
        class="transition-all hover:text-blue-800"
      >
        About Us
      </RouterLink>
      <RouterLink
        to="/profile"
        active-class="text-blue-950 font-bold"
        class="transition-all hover:text-blue-800"
      >
        Profile
      </RouterLink>
      <RouterLink
        to="/ourHistory"
        active-class="text-blue-950 font-bold"
        class="transition-all hover:text-blue-800"
      >
        Our Story
      </RouterLink>
      <RouterLink
        to="/contact"
        active-class="text-blue-950 font-bold"
        class="transition-all hover:text-blue-800"
      >
        Contact Us
      </RouterLink>
    </div>

    <!-- Search & Auth Button -->
    <div class="flex items-center space-x-4">
      <div class="flex items-center text-black">
        <div class="mr-4 flex">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search events"
            class="w-40 rounded-l-full bg-white py-2 pl-5 pr-2 outline-none xl:w-full"
            @keyup.enter="handleSearch"
          />
          <button class="rounded-r-full bg-white py-2 pr-5 hover:bg-gray-100" @click="handleSearch">
            <i class="fa fa-search" aria-hidden="true"></i>
          </button>
        </div>

        <RouterLink
          v-if="!authStore.isLoggedIn"
          to="/register"
          class="hidden h-10 w-32 rounded-full bg-[#17202A] px-4 py-2 text-center text-white transition-all hover:bg-[#425c79] xl:block"
        >
          Register
          <i class="fa fa-long-arrow-right -rotate-45 font-extralight" aria-hidden="true"></i>
        </RouterLink>
        <button
          v-else
          type="button"
          class="hidden h-10 rounded-full bg-[#17202A] px-5 py-2 text-center text-white transition-all hover:bg-[#425c79] xl:block cursor-pointer"
          @click="handleLogout"
        >
          Logout
        </button>
      </div>

      <!-- Hamburger Button Mobile -->
      <button
        @click="isOpen = !isOpen"
        class="z-50 text-2xl text-blue-950 focus:outline-none xl:hidden"
      >
        <i :class="isOpen ? 'fa fa-times' : 'fa fa-bars'"></i>
      </button>
    </div>
  </nav>

  <!-- Mobile Dropdown Menu -->
  <div
    v-if="isOpen"
    class="fixed left-1/2 top-24 z-40 flex w-[95%] -translate-x-1/2 flex-col space-y-4 rounded-2xl bg-[#17202A] p-6 text-white shadow-2xl xl:hidden"
  >
    <RouterLink
      to="/"
      exact-active-class="text-[#EE0034] font-bold"
      class="text-lg hover:text-blue-800"
      >Home</RouterLink
    >
    <RouterLink
      to="/event"
      exact-active-class="text-[#EE0034] font-bold"
      class="text-lg hover:text-blue-800"
      >Event</RouterLink
    >

    <RouterLink
      v-if="authStore.isLoggedIn"
      to="/my-events"
      active-class="text-[#EE0034] font-bold"
      class="text-lg hover:text-blue-800"
    >
      {{ authStore.user?.role === 'admin' ? 'Manage Events' : 'My Events' }}
    </RouterLink>
    <RouterLink
      v-if="authStore.isLoggedIn"
      to="/my-tickets"
      active-class="text-[#EE0034] font-bold"
      class="text-lg hover:text-blue-800"
    >
      My Tickets
    </RouterLink>

    <RouterLink
      to="/about"
      active-class="text-[#EE0034] font-bold"
      class="text-lg hover:text-blue-800"
      >About Us</RouterLink
    >
    <RouterLink
      to="/profile"
      active-class="text-[#EE0034] font-bold"
      class="text-lg hover:text-blue-800"
      >Profile</RouterLink
    >
    <RouterLink
      to="/ourHistory"
      active-class="text-[#EE0034] font-bold"
      class="text-lg hover:text-blue-800"
      >Our Story</RouterLink
    >
    <RouterLink
      to="/contact"
      active-class="text-[#EE0034] font-bold"
      class="text-lg hover:text-blue-800"
      >Contact Us</RouterLink
    >

    <RouterLink
      v-if="!authStore.isLoggedIn"
      to="/register"
      class="mt-2 w-full rounded-full bg-[#EE0034] px-5 py-3 text-center font-bold transition-all hover:bg-[#ac2c2c]"
    >
      Register
    </RouterLink>
    <button
      v-else
      type="button"
      class="mt-2 w-full rounded-full bg-[#EE0034] px-5 py-3 text-center font-bold transition-all hover:bg-[#ac2c2c] cursor-pointer"
      @click="handleLogout"
    >
      Logout {{ authStore.user?.name ? `(${authStore.user.name})` : '' }}
    </button>
  </div>
</template>