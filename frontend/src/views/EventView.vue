<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'
import Navbar from '@/components/Navbar.vue'
import HomLeatestPost from '@/components/HomLeatestPost.vue'

import heroBgImport from '@/components/img/bg/hero-bg.jpg'
import eventImage from '@/components/img/bg/c5.png'

const heroBg = heroBgImport

// State Parallax & Animasi Awal (Pop Up)
const parallaxOffset = ref(0)
const isPopUpActive = ref(false)

// State untuk mendeteksi arah scroll (Scroll Up / Scroll Down)
const lastScrollY = ref(0)
const scrollDirection = ref('down')

const handleScroll = () => {
  // 1. Efek Parallax
  parallaxOffset.value = window.scrollY * 0.4

  // 2. Deteksi Arah Scroll
  if (window.scrollY > lastScrollY.value) {
    scrollDirection.value = 'down'
  } else {
    scrollDirection.value = 'up'
  }
  lastScrollY.value = window.scrollY
}

const observer = ref(null)

onMounted(() => {
  // Pemicu Animasi Pop Up pertama kali halaman dibuka
  setTimeout(() => {
    isPopUpActive.value = true
  }, 100)

  window.addEventListener('scroll', handleScroll)

  // Observer untuk mendeteksi elemen saat masuk ke layar (Scroll Animation)
  observer.value = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Jika scroll ke bawah, beri animasi masuk dari bawah (scroll-down-animate)
        // Jika scroll ke atas, beri animasi masuk dari atas (scroll-up-animate)
        if (scrollDirection.value === 'down') {
          entry.target.classList.add('show-down')
          entry.target.classList.remove('show-up')
        } else {
          entry.target.classList.add('show-up')
          entry.target.classList.remove('show-down')
        }
      } else {
        // Hapus kelas saat elemen keluar dari layar agar animasi bisa terpicu kembali
        entry.target.classList.remove('show-down', 'show-up')
      }
    })
  }, {
    threshold: 0.1
  })

  // Daftarkan elemen-elemen yang ingin diberi animasi scroll
  document.querySelectorAll('.animate-on-scroll').forEach(el => observer.value.observe(el))
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  if (observer.value) observer.value.disconnect()
})
</script>

<template>
  <div class="overflow-x-hidden">
    <Navbar />

    <!-- Hero dengan Animasi Pop Up awal -->
    <section class="w-full h-130 z-10 flex justify-center items-center relative overflow-hidden">
      <div class="absolute inset-0 bg-black/60">
        <img :src="heroBg" alt="Event crowd" draggable="false"
          class="w-full h-full object-cover brightness-[0.4] saturate-50 absolute top-0 left-0 opacity-100 bg-size-cover animate-hero-pop"
          :style="{ transform: `translateY(${parallaxOffset}px)` }">
      </div>

      <!-- Konten teks utama menggunakan animasi Pop Up -->
      <div class="w-full max-w-3/4 mx-auto z-20 text-white text-shadow-lg/30 shadow-black transition-all duration-1000 transform scale-90 opacity-0"
           :class="{ 'scale-100 opacity-100': isPopUpActive }">
        <h1 class="capitalize text-7xl font-bold mb-4 drop-shadow-md">Event</h1>
        <p class="text-xl font-normal text-white">Discover global tech conferences, hands-on workshops,</p>
        <p class="text-xl font-normal text-white">and networking opportunities that shape the future.</p>
      </div>
    </section>

    <!-- Main content -->
    <main class="relative z-20 bg-[#2B3B4C] py-5 rounded-[3rem] -mt-10 mb-20 shadow-[0_0_80px_rgba(0,0,0,0.15)]">
      
      <!-- Section 1: Make your own event (Menggunakan Animasi Scroll) -->
      <section class="mx-auto grid w-4/5 items-center gap-10 grid-cols-1 xl:grid-cols-2 pt-10 animate-on-scroll">
        <div class="text-white">
          <h2 class="max-w-md text-5xl font-bold leading-tight md:text-6xl">
            Make your<br />own event
          </h2>

          <p class="mt-6 max-w-xl text-base font-normal leading-relaxed md:text-lg md:leading-loose text-justify xl:text-left">
            Buat dan kelola acara Anda bersama Vantage. Kami membantu proses perencanaan, publikasi, serta pengelolaan
            event dalam satu platform.<br class="hidden xl:inline" />
          </p>

          <RouterLink to="/event/create"
            class="mt-7 inline-flex rounded-full bg-[#EE0034] px-8 py-3 text-lg font-medium text-white transition hover:-translate-y-1 hover:bg-[#c9002c]">
            Create
          </RouterLink>
        </div>

        <div class="w-full xl:w-9/10 aspect-video xl:aspect-auto h-auto xl:h-9/10 rounded-2xl justify-self-start self-center overflow-hidden mt-6 xl:mt-10">
          <img :src="eventImage" alt="" class="w-full h-full object-cover object-center" draggable="false">
        </div>
      </section>

      <!-- Section 2: Komponen latest post (Menggunakan Animasi Scroll) -->
      <section class="mx-auto mt-20 w-4/5 animate-on-scroll">
        <HomLeatestPost />
      </section>
    </main>
  </div>
</template>

<style scoped>
/* ==========================================
   1. ANIMASI POP UP (Hero & Konten Awal)
   ========================================== */
@keyframes heroPop {
  0% {
    transform: scale(1.15);
    filter: brightness(0.1);
  }
  100% {
    filter: brightness(0.4) saturate-50;
  }
}
.animate-hero-pop {
  animation: heroPop 1.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

/* ==========================================
   2. ANIMASI SCROLL (Down & Up)
   ========================================== */
.animate-on-scroll {
  opacity: 0;
  transform: translateY(60px); /* Posisi dasar awal (tersembunyi di bawah) */
  transition: opacity 0.8s ease, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}

/* Ketika di-scroll ke BAWAH: elemen muncul dari bawah naik ke atas */
.animate-on-scroll.show-down {
  opacity: 1;
  transform: translateY(0);
}

/* Ketika di-scroll ke ATAS: elemen muncul dari atas turun ke bawah */
.animate-on-scroll.show-up {
  opacity: 1;
  transform: translateY(0);
}

/* Kondisi transisi balik saat elemen keluar dari layar atas */
.animate-on-scroll:not(.show-down):not(.show-up) {
  opacity: 0;
  transform: translateY(-60px); /* Siap masuk kembali dari atas jika user scroll up */
}
</style>