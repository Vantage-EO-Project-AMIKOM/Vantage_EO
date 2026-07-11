<script setup>
import { ref, watch, defineOptions } from 'vue'
import { useRoute } from 'vue-router'

defineOptions({
  name: 'AppNavbar'
})

const isOpen = ref(false)
const route = useRoute()

// Otomatis tutup navbar saat pindah halaman
watch(() => route.path, () => {
  isOpen.value = false
})
</script>

<template>
  <!-- Nav Utama -->
  <nav
    class="fixed top-5 left-1/2 -translate-x-1/2 w-[95%] xl:w-[90%] h-16 px-5 xl:px-10 bg-[#EE0034] shadow-xl rounded-full flex justify-between items-center z-50 text-white">

    <!-- Logo -->
    <RouterLink to="/" class="flex justify-center items-center">
      <img src="./img/onlyLogo.png" alt="Logo" class="h-8 xl:h-10 w-auto mr-2" draggable="false">
      <p class="text-lg font-bold text-blue-950">Vantage</p>
    </RouterLink>

    <!-- Desktop Navigation -->
    <div class="hidden xl:flex items-center space-x-6">
      <RouterLink to="/" exact-active-class="text-blue-950 font-bold" class="transition-all hover:text-blue-800">Home</RouterLink>
      <RouterLink to="/event" exact-active-class="text-blue-950 font-bold" class="transition-all hover:text-blue-800">Event</RouterLink>
      <RouterLink to="/about" active-class="text-blue-950 font-bold" class="transition-all hover:text-blue-800">About Us</RouterLink>
      <RouterLink to="/profile" active-class="text-blue-950 font-bold" class="transition-all hover:text-blue-800">Profile</RouterLink>
      <RouterLink to="/ourHistory" active-class="text-blue-950 font-bold" class="transition-all hover:text-blue-800">Our Story</RouterLink>
      <RouterLink to="/contact" active-class="text-blue-950 font-bold" class="transition-all hover:text-blue-800">Contact Us</RouterLink>
    </div>

    <!-- Kanan: Search & Menu Button -->
    <div class="flex items-center space-x-4">
      <div class="flex items-center text-black">
        <div class="flex mr-4">
          <input type="text" placeholder=""
            class="w-40 xl:w-full bg-white pl-5 pr-2 py-2 rounded-l-full outline-none">
          <button class="bg-white pr-5 py-2 rounded-r-full hover:bg-gray-100">
            <i class="fa fa-search" aria-hidden="true"></i>
          </button>
        </div>
        <!-- Diubah dari w-35 ke w-32 & h-11 ke h-10 supaya standar Tailwind -->
        <RouterLink to="/register" class="hidden xl:block bg-[#17202A] text-white w-32 h-10 rounded-full transition-all hover:bg-[#425c79] text-center px-4 py-2">
          Register <i class="fa fa-long-arrow-right font-extralight -rotate-45" aria-hidden="true"></i>
        </RouterLink>
      </div>

      <!-- Hamburger Button -->
      <button @click="isOpen = !isOpen" class="xl:hidden text-2xl text-blue-950 focus:outline-none z-50">
        <i :class="isOpen ? 'fa fa-times' : 'fa fa-bars'"></i>
      </button>
    </div>
  </nav>

  <!-- Mobile Navigation (Menu Dropdown) -->
  <div v-if="isOpen"
    class="fixed top-24 left-1/2 -translate-x-1/2 w-[95%] bg-[#17202A] text-white shadow-2xl rounded-2xl p-6 flex flex-col space-y-4 z-40 xl:hidden">

    <RouterLink to="/" exact-active-class="text-[#EE0034] font-bold" class="text-lg hover:text-blue-800">Home</RouterLink>
    <RouterLink to="/event" exact-active-class="text-[#EE0034] font-bold" class="text-lg hover:text-blue-800">Event</RouterLink>
    <RouterLink to="/about" active-class="text-[#EE0034] font-bold" class="text-lg hover:text-blue-800">About Us</RouterLink>
    <RouterLink to="/profile" active-class="text-[#EE0034] font-bold" class="text-lg hover:text-blue-800">Profile</RouterLink>
    <RouterLink to="/ourHistory" active-class="text-[#EE0034] font-bold" class="text-lg hover:text-blue-800">Our Story</RouterLink>
    <RouterLink to="/contact" active-class="text-[#EE0034] font-bold" class="text-lg hover:text-blue-800">Contact Us</RouterLink>
    <RouterLink to="/register" class="w-full bg-[#EE0034] text-white font-bold px-5 py-3 mt-2 rounded-full transition-all hover:bg-[#ac2c2c] text-center">Register</RouterLink>
  </div>
</template>
