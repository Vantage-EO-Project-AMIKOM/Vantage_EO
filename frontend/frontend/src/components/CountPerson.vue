<template>
    <div class="w-full max-w-4/5 mx-auto py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 border-b-2 border-white text-white">
        <div class="h-50 flex flex-col justify-center items-center">
            <p class="text-7xl font-bold">{{ Math.floor(counts.investors) }}+</p>
            <p class="text-md font-normal capitalize">investors</p>
        </div>
        
        <div class="h-50 flex flex-col justify-center items-center">
            <p class="text-7xl font-bold">{{ Math.floor(counts.speakers) }}</p>
            <p class="text-md font-normal capitalize">skilled speakers</p>
        </div>
        
        <div class="h-50 flex flex-col justify-center items-center">
            <p class="text-7xl font-bold">{{ Math.floor(counts.coffee) }}</p>
            <p class="text-md font-normal capitalize">coffee breaks</p>
        </div>
        
        <div class="h-50 flex flex-col justify-center items-center">
            <p class="text-7xl font-bold">{{ Math.floor(counts.sponsors) }}</p>
            <p class="text-md font-normal capitalize">our sponsors</p>
        </div>
    </div>
</template>

<script setup>
import { reactive, onMounted } from 'vue'

// Angka awal dimulai dari 1
const counts = reactive({
    investors: 1,
    speakers: 1,
    coffee: 1,
    sponsors: 1
})

// Target angka akhir yang ingin dicapai
const targets = {
    investors: 15,
    speakers: 888,
    coffee: 15,
    sponsors: 603
}

// Durasi animasi dalam milidetik (misal: 2000ms = 2 detik)
const duration = 2000

const animateCounters = () => {
    const startTime = performance.now()

    const updateCounts = (currentTime) => {
        const elapsedTime = currentTime - startTime
        // Menghitung progress dari 0 sampai 1
        const progress = Math.min(elapsedTime / duration, 1) 

        // Update nilai reactive berdasarkan progress
        counts.investors = 1 + (targets.investors - 1) * progress
        counts.speakers = 1 + (targets.speakers - 1) * progress
        counts.coffee = 1 + (targets.coffee - 1) * progress
        counts.sponsors = 1 + (targets.sponsors - 1) * progress

        // Jika animasi belum selesai, panggil frame berikutnya
        if (progress < 1) {
            requestAnimationFrame(updateCounts)
        }
    }

    requestAnimationFrame(updateCounts)
}

onMounted(() => {
    animateCounters()
})
</script>