<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const parallaxOffset = ref(0);
const imageOffsets = ref({
    c1: 0,
    c2: 0,
    c3: 0,
    c4: 0
});
const contentOffset = ref(0);

const handleScroll = () => {
    parallaxOffset.value = window.scrollY * 0.4;

    // Apply parallax to grid images with different speeds
    imageOffsets.value.c1 = window.scrollY * 0.3;
    imageOffsets.value.c2 = window.scrollY * 0.25;
    imageOffsets.value.c3 = window.scrollY * 0.35;
    imageOffsets.value.c4 = window.scrollY * 0.2;
    contentOffset.value = window.scrollY * -0.05;
};

// --- LOGIKA ANIMASI SCROLL DUA ARAH ---
const observer = ref(null);

onMounted(() => {
    window.addEventListener('scroll', handleScroll);

    // Konfigurasi Intersection Observer
    observer.value = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Tambahkan class saat elemen masuk viewport
                entry.target.classList.add('show-animated');
            } else {
                // Hapus class saat elemen keluar viewport agar bisa dianimasikan ulang
                entry.target.classList.remove('show-animated');
            }
        });
    }, {
        threshold: 0.15, // Memicu animasi ketika 15% elemen terlihat
        rootMargin: "-20px 0px" // Memberikan jarak respons yang lebih natural
    });

    // Observasi semua elemen dengan class 'scroll-animate'
    document.querySelectorAll('.scroll-animate').forEach(el => observer.value.observe(el));
});

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
    if (observer.value) observer.value.disconnect();
});
</script>

<template>
    <!-- OUR STORY BG -->
    <section class="w-full h-130 z-10 flex justify-center items-center relative overflow-hidden">

        <div class="absolute inset-0 bg-black/60">
            <img src="./../components/img/bg/hero-bg.jpg" alt="" draggable="false"
                class="w-full h-full object-cover brightness-[0.4] saturate-50 absolute top-0 left-0 opacity-100 bg-size-cover"
                :style="{ transform: `translateY(${parallaxOffset}px)` }">
        </div>

        <div class="w-full max-w-3/4 mx-auto z-20 text-white text-shadow-lg/30 shadow-black">
            <h1 class=" capitalize text-7xl font-bold mb-5">our story</h1>
            <p class=" text-xl font-normal">Born from a passion for connection, our journey started with a simple idea</p>
            <p class=" text-xl font-normal">"Making event management accessible for everyone, anywhere."</p>
        </div>

    </section>

    <!-- KONTEN TIMELINE -->
    <div class="relative z-10 bg-[#2B3B4C] py-5 rounded-[3rem] -mt-10 mb-250 xl:mb-162.5 shadow-[0_0_80px_rgba(0,0,0,0.15)]">
        <section class=" w-full h-auto">
            <div class=" w-full max-w-4/5 mx-auto py-20">

                <!-- Timeline 1 (Ditambahkan class scroll-animate fade-up) -->
                <div class=" w-full min-h-100 grid grid-cols-1 xl:grid-cols-2 gap-8 mb-25 scroll-animate fade-up">

                    <div
                        class=" w-5/5 h-100 xl:h-5/6 relative text-right justify-self-end rounded-4xl border border-white/10 bg-linear-to-br from-[#24364d] to-[#1d2d42]
         shadow-[0_10px_40px_rgba(0,0,0,0.35)]
         overflow-hidden p-10 inset-0
           ring-1 ring-white/40 text-white">
                        <h2 class=" text-4xl capitalize text-white font-medium mb-8">marketing matters!</h2>
                        <p class=" font-normal text-lg text-white">How you transform your business as technology, consumer,
                            habits industry dynamics change? Find out from those leading the charge.</p>
                        <p class=" w-10 h-20 text-4xl font-bold overflow-hidden absolute bottom-10 right-10">20
                            10</p>
                    </div>

                    <div class=" w-full max-h-100 rounded-4xl overflow-hidden">
                        <img src="./../components/img/ourHistoryPage/h1.jpeg" alt="" draggable="false"
                            class=" w-full h-full object-cover object-[0_-12rem]">
                    </div>

                </div>

                <!-- Timeline 2 (Ditambahkan class scroll-animate fade-up) -->
                <div class=" w-full min-h-100 grid grid-cols-1 xl:grid-cols-2 gap-8 mb-25 scroll-animate fade-up">

                    <div class=" w-full max-h-100 rounded-4xl overflow-hidden">
                        <img src="./../components/img/ourHistoryPage/h2.jpeg" alt="" draggable="false"
                            class=" w-full h-full object-cover object-center">
                    </div>

                    <div
                        class=" w-5/5 h-100 xl:h-5/6 relative text-left justify-self-start rounded-4xl border border-white/10 bg-linear-to-br from-[#24364d] to-[#1d2d42]
         shadow-[0_10px_40px_rgba(0,0,0,0.35)]
         overflow-hidden p-10 inset-0
           ring-1 ring-white/40 text-white">
                        <h2 class=" text-4xl capitalize text-white font-medium mb-8">reinventing experiences</h2>
                        <p class=" font-normal text-lg text-white">How you transform your business as technology, consumer,
                            habits industry dynamics change? Find out from those leading the charge.</p>
                        <p class=" w-10 h-20 text-4xl font-bold overflow-hidden absolute bottom-10 left-10">20
                            12</p>
                    </div>

                </div>

                <!-- Timeline 3 (Ditambahkan class scroll-animate fade-up) -->
                <div class=" w-full min-h-100 grid grid-cols-1 xl:grid-cols-2 gap-8 mb-25 scroll-animate fade-up">

                    <div
                        class="w-5/5 h-100 xl:h-5/6 relative text-right justify-self-end rounded-4xl border border-white/10 bg-linear-to-br from-[#24364d] to-[#1d2d42]
         shadow-[0_10px_40px_rgba(0,0,0,0.35)]
         overflow-hidden p-10 inset-0
           ring-1 ring-white/40 text-white">
                        <h2 class=" text-4xl capitalize text-white font-medium mb-8">cultures of creativity</h2>
                        <p class=" font-normal text-lg text-white">How you transform your business as technology, consumer,
                            habits industry dynamics change? Find out from those leading the charge.</p>
                        <p class=" w-10 h-20 text-4xl font-bold overflow-hidden absolute bottom-10 right-10">20
                            14</p>
                    </div>

                    <div class=" w-full max-h-100 rounded-4xl overflow-hidden">
                        <img src="./../components/img/ourHistoryPage/h3.jpeg" alt="" draggable="false"
                            class=" w-full h-full object-cover object-center">
                    </div>

                </div>

                <!-- Timeline 4 (Ditambahkan class scroll-animate fade-up) -->
                <div class=" w-full min-h-100 grid grid-cols-1 xl:grid-cols-2 gap-8 scroll-animate fade-up">

                    <div class=" w-full max-h-100 rounded-4xl overflow-hidden">
                        <img src="./../components/img/ourHistoryPage/h4.jpeg" alt="" draggable="false"
                            class=" w-full h-full object-cover object-center">
                    </div>

                    <div
                        class=" w-5/5 h-100 xl:h-5/6 relative text-left justify-self-start rounded-4xl border border-white/10 bg-linear-to-br from-[#24364d] to-[#1d2d42]
         shadow-[0_10px_40px_rgba(0,0,0,0.35)]
         overflow-hidden p-10 inset-0
           ring-1 ring-white/40 text-white">
                        <h2 class=" text-4xl capitalize text-white font-medium mb-8">Human Centered Design</h2>
                        <p class=" font-normal text-lg text-white">How you transform your business as technology, consumer,
                            habits industry dynamics change? Find out from those leading the charge.</p>
                        <p class=" w-10 h-20 text-4xl font-bold overflow-hidden absolute bottom-10 left-10">20
                            16</p>
                    </div>

                </div>

            </div>
        </section>
    </div>
</template>

<style scoped>
.scroll-animate {
    opacity: 0;
    transition: transform 0.85s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.6s ease;
    will-change: transform, opacity;
}
.fade-up {
    transform: translateY(50px);
}
.scroll-animate.show-animated {
    opacity: 1;
    transform: translateY(0);
}
</style>
