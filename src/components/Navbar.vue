<script setup>
import { ref } from 'vue'

const isOpen = ref(false)
</script>

<template>
    <nav
        class="fixed top-5 left-1/2 -translate-x-1/2 w-[95%] lg:w-[90%] h-18 px-5 lg:px-10 bg-[#E7C899] shadow-xl rounded-full flex justify-between items-center z-50">

        <RouterLink to="#" class=" flex justify-center items-center">
            <img src="./img/onlyLogo.png" alt="Logo" class="h-8 lg:h-10 w-auto mr-2" draggable="false">
            <p class=" text-lg font-bold">Vantage</p>
        </RouterLink>

        <div class="hidden lg:flex items-center space-x-6">
            <RouterLink to="/" class="transition-all hover:text-[#788663]">Home</RouterLink>
            <RouterLink to="about" class="transition-all hover:text-[#788663]">About Us</RouterLink>
            <RouterLink to="#" class="transition-all hover:text-[#788663]">Events</RouterLink>
            <RouterLink to="#" class="transition-all hover:text-[#788663]">Speakers</RouterLink>
            <RouterLink to="#" class="transition-all hover:text-[#788663]">Blog</RouterLink>
            <RouterLink to="contact" class="transition-all hover:text-[#788663]">Contact Us</RouterLink>
        </div>

        <div class="hidden lg:flex justify-center items-center space-x-4">
            <div class="flex">
                <input type="text" placeholder="Type text here"
                    class="w-40 xl:w-full bg-white pl-5 pr-2 py-2 rounded-l-full outline-none">
                <button class="bg-white pr-5 py-2 rounded-r-full hover:bg-gray-100">
                    <i class="fa fa-search" aria-hidden="true"></i>
                </button>
            </div>
            <button class="bg-[#788663] text-black px-5 py-2 rounded-full transition-all hover:bg-[#788700]">Register
                <i class="fa fa-long-arrow-right font-extralight -rotate-45" aria-hidden="true"></i>
            </button>
        </div>

        <button @click="isOpen = !isOpen" class="lg:hidden text-2xl text-[#788663] focus:outline-none">
            <i :class="isOpen ? 'fa fa-times' : 'fa fa-bars'"></i>
        </button>
    </nav>

    <div v-if="isOpen"
        class="fixed top-28 left-1/2 -translate-x-1/2 w-[95%] bg-[#FFF5DD] shadow-2xl rounded-2xl p-6 flex flex-col space-y-4 z-40 lg:hidden">
        <RouterLink to="/" class=" text-lg hover:text-blue-800">Home</RouterLink>
        <RouterLink to="about" class=" text-lg hover:text-blue-800">Pages</RouterLink>
        <RouterLink to="#" class=" text-lg hover:text-blue-800">Events</RouterLink>
        <RouterLink to="#" class=" text-lg hover:text-blue-800">Speakers</RouterLink>
        <RouterLink to="#" class=" text-lg hover:text-blue-800">Blog</RouterLink>
        <RouterLink to="contact" class=" text-lg hover:text-blue-800">Contact Us</RouterLink>

        <div class="flex w-full mt-4">
            <input type="text" placeholder="Search..."
                class="w-full bg-white pl-5 pr-2 py-3 rounded-l-full outline-none border border-gray-200">
            <button class="bg-white pr-5 py-3 rounded-r-full border border-l-0 border-gray-200 hover:bg-gray-100">
                <i class="fa fa-search" aria-hidden="true"></i>
            </button>
        </div>
        <button
            class="w-full bg-[#788663] text-white font-bold px-5 py-3 mt-2 rounded-full transition-all hover:bg-[#788700]">Register</button>
    </div>
</template>
