<script setup>
import { ref, defineOptions } from 'vue'

defineOptions({
  name: 'AppNavbar'
})

const isOpen = ref(false)
</script>

<template>
    <nav
        class="fixed top-5 left-1/2 -translate-x-1/2 w-[95%] xl:w-[90%] h-18 px-5 xl:px-10 bg-[#EE0034] shadow-xl rounded-full flex justify-between items-center z-50 text-white">

        <RouterLink to="/" class=" flex justify-center items-center">
            <img src="./img/onlyLogo.png" alt="Logo" class="h-8 xl:h-10 w-auto mr-2" draggable="false">
            <p class=" text-lg font-bold text-blue-950">Vantage</p>
        </RouterLink>

        <div class="hidden xl:flex items-center space-x-6">
            <RouterLink to="/" class="transition-all hover:text-blue-800">Home</RouterLink>
            <RouterLink to="about" class="transition-all hover:text-blue-800">About Us</RouterLink>
            <RouterLink to="#" class="transition-all hover:text-blue-800">Events</RouterLink>
            <RouterLink to="profile" class="transition-all hover:text-blue-800">Profile</RouterLink>
            <RouterLink to="ourHistory" class="transition-all hover:text-blue-800">Our Story</RouterLink>
            <RouterLink to="contact" class="transition-all hover:text-blue-800">Contact Us</RouterLink>
        </div>

        <div class="hidden xl:flex justify-center items-center space-x-4 text-black">
            <div class="flex">
                <input type="text" placeholder="Type text here"
                    class="w-40 xl:w-full bg-white pl-5 pr-2 py-2 rounded-l-full outline-none">
                <button class="bg-white pr-5 py-2 rounded-r-full hover:bg-gray-100">
                    <i class="fa fa-search" aria-hidden="true"></i>
                </button>
            </div>
            <button class="bg-[#17202A] text-white px-5 py-2 rounded-full transition-all hover:bg-[#425c79]">Register
                <i class="fa fa-long-arrow-right font-extralight -rotate-45" aria-hidden="true"></i>
            </button>
        </div>

        <button @click="isOpen = !isOpen" class="xl:hidden text-2xl text-blue-950 focus:outline-none">
            <i :class="isOpen ? 'fa fa-times' : 'fa fa-bars'"></i>
        </button>
    </nav>

    <div v-if="isOpen"
        class="fixed top-28 left-1/2 -translate-x-1/2 w-[95%] bg-[#17202A] text-white shadow-2xl rounded-2xl p-6 flex flex-col space-y-4 z-40 xl:hidden">
        
        <div class="flex w-full mt-4">
            <input type="text" placeholder="Search..."
                class="w-full bg-white pl-5 pr-2 py-3 rounded-l-full outline-none border border-gray-200">
            <button class="bg-white pr-5 py-3 rounded-r-full border border-l-0 border-gray-200 hover:bg-gray-100">
                <i class="fa fa-search text-black" aria-hidden="true"></i>
            </button>
        </div>
        
        <RouterLink to="/" class=" text-lg hover:text-blue-800">Home</RouterLink>
        <RouterLink to="about" class=" text-lg hover:text-blue-800">ABout Us</RouterLink>
        <RouterLink to="#" class=" text-lg hover:text-blue-800">Events</RouterLink>
        <RouterLink to="profile" class=" text-lg hover:text-blue-800">Profile</RouterLink>
        <RouterLink to="ourHistory" class=" text-lg hover:text-blue-800">Our Story</RouterLink>
        <RouterLink to="contact" class=" text-lg hover:text-blue-800">Contact Us</RouterLink>

        
        <button
            class="w-full bg-[#FF0000] text-white font-bold px-5 py-3 mt-2 rounded-full transition-all hover:bg-[#ac2c2c]">Register</button>
    </div>
</template>
