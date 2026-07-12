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

// State untuk memicu animasi masuk pertama kali page dibuka
const isAnimate = ref(false);

// State pelacak arah scroll (Scroll Up / Scroll Down)
const lastScrollY = ref(0);
const scrollDirection = ref('down');

const handleScroll = () => {
    parallaxOffset.value = window.scrollY * 0.4;

    imageOffsets.value.c1 = window.scrollY * 0.3;
    imageOffsets.value.c2 = window.scrollY * 0.25;
    imageOffsets.value.c3 = window.scrollY * 0.35;
    imageOffsets.value.c4 = window.scrollY * 0.2;
    contentOffset.value = window.scrollY * -0.05;

    // Menentukan arah scroll
    if (window.scrollY > lastScrollY.value) {
        scrollDirection.value = 'down';
    } else {
        scrollDirection.value = 'up';
    }
    lastScrollY.value = window.scrollY;
};

const observer = ref(null);

onMounted(() => {
    window.addEventListener('scroll', handleScroll);

    // Aktifkan transisi pop up awal saat page dipindah/dimuat
    setTimeout(() => {
        isAnimate.value = true;
    }, 100);

    // Konfigurasi Intersection Observer dengan deteksi arah
    observer.value = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (scrollDirection.value === 'down') {
                    entry.target.classList.add('show-down');
                    entry.target.classList.remove('show-up');
                } else {
                    entry.target.classList.add('show-up');
                    entry.target.classList.remove('show-down');
                }
            } else {
                // Bersihkan kelas agar efek scroll up/down bisa dipicu berulang kali
                entry.target.classList.remove('show-down', 'show-up');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: "-40px 0px -40px 0px"
    });

    // Hanya mengobservasi elemen dengan class .scroll-animate (Timeline 2 ke bawah)
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
                class="w-full h-full object-cover brightness-[0.4] saturate-50 absolute top-0 left-0 opacity-100 bg-size-cover animate-hero-pop"
                :style="{ transform: `translateY(${parallaxOffset}px)` }">
        </div>

        <!-- Hero Text Container dengan animasi Pop Up Awal -->
        <div class="w-full max-w-3/4 mx-auto z-20 text-white text-shadow-lg/30 shadow-black transition-all duration-1000 transform scale-95 opacity-0 ease-out"
             :class="{ 'scale-100 opacity-100': isAnimate }">
            <h1 class=" capitalize text-7xl font-bold mb-5">our story</h1>
            <p class=" text-xl font-normal">Born from a passion for connection, our journey started with a simple idea</p>
            <p class=" text-xl font-normal">"Making event management accessible for everyone, anywhere."</p>
        </div>

    </section>

    <!-- KONTEN TIMELINE -->
    <div class="relative z-10 bg-[#2B3B4C] py-5 rounded-[3rem] -mt-10 mb-20 shadow-[0_0_80px_rgba(0,0,0,0.15)] overflow-hidden">
        <section class=" w-full h-auto">
            <div class=" w-full max-w-4/5 mx-auto py-20">

                <!-- Timeline 1: Murni Pop Up Awal (Menggunakan .page-animation, class scroll-animate dibuang) -->
                <div class=" w-full min-h-100 grid grid-cols-1 xl:grid-cols-2 gap-8 mb-25 page-animation" :class="{ 'show': isAnimate }">

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

                <!-- Timeline 2 (Scroll Animate: Up & Down) -->
                <div class=" w-full min-h-100 grid grid-cols-1 xl:grid-cols-2 gap-8 mb-25 scroll-animate">

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

                <!-- Timeline 3 (Scroll Animate: Up & Down) -->
                <div class=" w-full min-h-100 grid grid-cols-1 xl:grid-cols-2 gap-8 mb-25 scroll-animate">

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

                <!-- Timeline 4 (Scroll Animate: Up & Down) -->
                <div class=" w-full min-h-100 grid grid-cols-1 xl:grid-cols-2 gap-8 scroll-animate">

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
/* ===================================================
   1. ANIMASI POP UP INSTAN (Hero & Timeline 1)
   =================================================== */
@keyframes heroPop {
  0% { transform: scale(1.1); filter: brightness(0.1); }
  100% { transform: scale(1); filter: brightness(0.4) saturate-50; }
}
.animate-hero-pop {
  animation: heroPop 1.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.page-animation {
  opacity: 0;
  transform: translateY(40px);
  transition: transform 1s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.7s ease;
}
.page-animation.show {
  opacity: 1;
  transform: translateY(0);
}

/* ===================================================
   2. ANIMASI INTERAKTIF SCROLL UP & SCROLL DOWN
   =================================================== */
.scroll-animate {
  opacity: 0;
  transform: translateY(60px) scale(0.98);
  will-change: transform, opacity;
  transition: opacity 0.8s ease, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}

/* Muncul saat scroll ke bawah */
.scroll-animate.show-down {
  opacity: 1;
  transform: translateY(0) scale(1);
}

/* Muncul saat scroll ke atas */
.scroll-animate.show-up {
  opacity: 1;
  transform: translateY(0) scale(1);
}

/* Keadaan reset ketika keluar dari layar */
.scroll-animate:not(.show-down):not(.show-up) {
  opacity: 0;
  transform: translateY(60px) scale(0.98);
}
</style>