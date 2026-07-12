<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const parallaxOffset = ref(0)
const imageOffsets = ref({
  c1: 0,
  c2: 0,
  c3: 0,
  c4: 0,
})
const contentOffset = ref(0)

// State untuk memicu animasi Pop Up pertama kali page dibuka
const isAnimate = ref(false)

// State pelacak arah scroll (Scroll Up / Scroll Down)
const lastScrollY = ref(0)
const scrollDirection = ref('down')

const handleScroll = () => {
  parallaxOffset.value = window.scrollY * 0.3

  // Apply parallax to grid images with different speeds
  imageOffsets.value.c1 = window.scrollY * 0.3
  imageOffsets.value.c2 = window.scrollY * 0.25
  imageOffsets.value.c3 = window.scrollY * 0.35
  imageOffsets.value.c4 = window.scrollY * 0.2
  contentOffset.value = window.scrollY * -0.05

  // Menentukan arah gerakan layar
  if (window.scrollY > lastScrollY.value) {
    scrollDirection.value = 'down'
  } else {
    scrollDirection.value = 'up'
  }
  lastScrollY.value = window.scrollY
}

const observer = ref(null)

onMounted(() => {
  window.addEventListener('scroll', handleScroll)

  // Mengaktifkan efek transisi Pop Up teks utama
  setTimeout(() => {
    isAnimate.value = true
  }, 100)

  // Inisialisasi IntersectionObserver untuk kontrol animasi gulir
  observer.value = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        if (scrollDirection.value === 'down') {
          entry.target.classList.add('show-down')
          entry.target.classList.remove('show-up')
        } else {
          entry.target.classList.add('show-up')
          entry.target.classList.remove('show-down')
        }
      } else {
        // Hapus kelas agar animasi dapat dipicu berulang kali ketika scroll bolak-balik
        entry.target.classList.remove('show-down', 'show-up')
      }
    })
  }, {
    threshold: 0.05,
    rootMargin: "-20px 0px -20px 0px"
  })

  // Daftarkan semua section/komponen dengan kelas scroll-animate
  document.querySelectorAll('.scroll-animate').forEach(el => observer.value.observe(el))
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  if (observer.value) observer.value.disconnect()
})
</script>

<template>
  <!-- Hero Section -->
  <section class="w-full h-130 z-10 flex items-center relative overflow-hidden">
    <div class="absolute inset-0 bg-black/60">
      <img
        src="./../components/img/bg/hero-bg.jpg"
        alt=""
        class="w-full h-full object-cover brightness-[0.4] saturate-50 absolute top-0 left-0 opacity-100 bg-size-cover animate-hero-scale"
        draggable="false"
        :style="{ transform: `translateY(${parallaxOffset}px)` }"
      />
    </div>
    
    <!-- Hero Text Container dengan animasi Pop Up Awal -->
    <div class="w-full max-w-3/4 mx-auto z-10 transition-all duration-1000 transform scale-95 opacity-0 ease-out"
         :class="{ 'scale-100 opacity-100': isAnimate }">
      <h1
        class="w-2/3 capitalize text-7xl font-bold text-white text-shadow-lg/50 text-shadow-black mb-5"
      >
        Profile
      </h1>
      <p class=" text-xl font-normal text-white">A trusted event management platform designed to empower creators, speakers, </p>
      <p class=" text-xl font-normal text-white">and audiences through seamless event creation and professional collaboration.</p>
    </div>
  </section>

  <!-- Container Utama -->
  <div
    class="relative z-10 bg-[#2B3B4C] py-20 rounded-[3rem] -mt-10 mb-20 shadow-[0_0_80px_rgba(0,0,0,0.15)] overflow-hidden"
  >
    <!-- Did You Know Section (Menggunakan animasi Pop Up bawaan + interaksi scroll) -->
    <section class="max-w-7/8 w-full mx-auto page-animation scroll-animate" :class="{ show: isAnimate }">
      <div class="bg-linear-to-br from-[#24364d] to-[#1d2d42] overflow-hidden p-15 rounded-[60px]">
        <h2 class="text-6xl capitalize font-semibold mb-8 text-center text-white">
          DID YOU KNOW US?
        </h2>
        <p class="text-white text-2xl indent-15 mb-8 text-justify">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus quis lacinia leo. Donec
          tincidunt congue augue vel ullamcorper. Mauris venenatis id ligula et viverra. Mauris
          suscipit aliquam tellus nec euismod. Vestibulum vestibulum dictum venenatis. Curabitur
          laoreet eu augue ut maximus. Curabitur a arcu enim. Mauris viverra velit euismod sem
          feugiat, ut porta est semper.
        </p>
        <p class="text-white text-2xl indent-15 text-justify">
          Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos
          himenaeos. Sed efficitur nisi lorem, eget mattis massa aliquam et. Morbi ultricies justo
          ullamcorper diam semper efficitur. Nulla eget nulla nec massa imperdiet tristique et non
          purus. Vestibulum vel elit sapien. Aliquam efficitur mauris sed felis venenatis, id
          dignissim orci consectetur. Aliquam erat volutpat. Donec scelerisque finibus gravida. In
          placerat enim ut diam consequat, ac luctus justo molestie. Vestibulum ullamcorper dui nec
          luctus finibus. Ut rhoncus nunc id nisl hendrerit consequat non efficitur metus. Donec
          vehicula risus urna, nec pharetra lacus fermentum et. Fusce placerat libero id elit
          vehicula volutpat vel sed felis.
        </p>
      </div>
    </section>

    <!-- Our Profile Section -->
    <section class="w-full h-auto">
      <div class="w-full max-w-[95%] xl:max-w-4/5 mx-auto py-20">
        <h2
          class="text-4xl lg:text-6xl capitalize font-semibold text-center text-white page-animation mb-10 scroll-animate"
          :class="{ show: isAnimate }"
        >
          Our Profile
        </h2>

        <!-- Profile 1: Azka -->
        <div
          class="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-10 mt-10 items-center page-animation scroll-animate"
          :class="{ show: isAnimate }"
        >
          <div
            class="w-full max-w-[320px] lg:max-w-none aspect-110/145 overflow-hidden rounded-full mx-auto"
          >
            <img
              class="w-full h-full object-cover object-[0%_100%] scale-130 origin-center"
              src="./../components/img/profilePage/profile/profile1.jpeg"
              alt="Azka"
            />
          </div>
          <div
            class="w-full h-auto lg:col-span-2 border border-white/10 bg-linear-to-br from-[#24364d] to-[#1d2d42] shadow-[0_10px_40px_rgba(0,0,0,0.35)] overflow-hidden p-6 lg:p-10 rounded-4xl ring-1 ring-white/40 py-10 lg:py-20"
          >
            <h2 class="text-2xl lg:text-4xl capitalize font-semibold mb-2 text-left text-white">
              Dhiya mamat Azka
            </h2>
            <h2 class="text-2xl lg:text-4xl capitalize font-semibold mb-8 text-left text-white">
              24.61.0270
            </h2>
            <p class="text-lg lg:text-2xl italic text-white mb-10 text-justify">
              “Tenang dalam langkah, kuat dalam tujuan, dan selalu jadi cahaya di setiap
              perjalanan.”
            </p>
            <a href="https://github.com/MehmedAzka" target="_blank" rel="noopener noreferrer" class="group inline-flex justify-start items-center gap-3 mt-10 w-fit">
              <img
                src="./../components/img/profilePage/githubicon.png"
                alt="github_icon"
                class="w-10 h-10 lg:w-auto transition-transform duration-300 group-hover:scale-105"
              />
              <h5 class="text-white text-lg lg:text-2xl ml-3 transition-colors duration-300 group-hover:text-[#EE0034]">MehmedAzka</h5>
            </a>
          </div>
        </div>

        <!-- Profile 2: Puan -->
        <div
          class="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-10 mt-10 items-center page-animation scroll-animate"
          :class="{ show: isAnimate }"
        >
          <div
            class="w-full h-auto lg:col-span-2 order-2 lg:order-1 border border-white/10 bg-linear-to-br from-[#24364d] to-[#1d2d42] shadow-[0_10px_40px_rgba(0,0,0,0.35)] overflow-hidden p-6 lg:p-10 rounded-4xl ring-1 ring-white/40 py-10 lg:py-20"
          >
            <h2
              class="text-2xl lg:text-4xl capitalize font-semibold mb-2 text-left lg:text-right text-white"
            >
              Puan Aeesya
            </h2>
            <h2
              class="text-2xl lg:text-4xl capitalize font-semibold mb-8 text-left lg:text-right text-white"
            >
              24.61.0274
            </h2>
            <p class="text-lg lg:text-2xl italic text-white mb-10 text-justify lg:text-right">
              “Elegan dalam sikap, berani dalam mimpi, dan tetap bersinar tanpa harus merendahkan
              siapa pun.”
            </p>
            <a href="https://github.com/syaaaa07" target="_blank" rel="noopener noreferrer" class="group flex justify-start lg:justify-end items-center gap-3 mt-10 w-full lg:w-auto ml-auto">
              <h5 class="text-white text-lg lg:text-2xl mr-3 lg:ml-3 transition-colors duration-300 group-hover:text-[#EE0034]">syaaaa07</h5>
              <img
                src="./../components/img/profilePage/githubicon.png"
                alt="github_icon"
                class="w-10 h-10 lg:w-auto transition-transform duration-300 group-hover:scale-105"
              />
            </a>
          </div>
          <div
            class="w-full max-w-[320px] lg:max-w-none aspect-110/145 overflow-hidden rounded-full mx-auto order-1 lg:order-2"
          >
            <img
              class="w-full h-full object-cover object-[85%_15%] scale-150 origin-center"
              src="./../components/img/profilePage/profile/profile2.jpeg"
              alt="Puan"
            />
          </div>
        </div>

        <!-- Profile 3: Angga -->
        <div
          class="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-10 mt-10 items-center page-animation scroll-animate"
          :class="{ show: isAnimate }"
        >
          <div
            class="w-full max-w-[320px] lg:max-w-none aspect-110/145 overflow-hidden rounded-full mx-auto"
          >
            <img
              class="w-full h-full object-cover object-[0%_100%] scale-130 origin-center"
              src="./../components/img/profilePage/profile/profile3.jpeg"
              alt="Angga"
            />
          </div>
          <div
            class="w-full h-auto lg:col-span-2 border border-white/10 bg-linear-to-br from-[#24364d] to-[#1d2d42] shadow-[0_10px_40px_rgba(0,0,0,0.35)] overflow-hidden p-6 lg:p-10 rounded-4xl ring-1 ring-white/40 py-10 lg:py-20"
          >
            <h2 class="text-2xl lg:text-4xl capitalize font-semibold mb-2 text-left text-white">
              L.M Hanggara Putra Akbar
            </h2>
            <h2 class="text-2xl lg:text-4xl capitalize font-semibold mb-8 text-left text-white">
              24.61.0279
            </h2>
            <p class="text-lg lg:text-2xl italic text-white mb-10 text-justify">
              “Dilahirkan untuk memimpin, tumbuh untuk menginspirasi, dan melangkah tanpa takut
              menghadapi dunia.”
            </p>
            <a href="https://github.com/agashesh" target="_blank" rel="noopener noreferrer" class="group inline-flex justify-start items-center gap-3 mt-10 w-fit">
              <img
                src="./../components/img/profilePage/githubicon.png"
                alt="github_icon"
                class="w-10 h-10 lg:w-auto transition-transform duration-300 group-hover:scale-105"
              />
              <h5 class="text-white text-lg lg:text-2xl ml-3 transition-colors duration-300 group-hover:text-[#EE0034]">agashesh</h5>
            </a>
          </div>
        </div>

        <!-- Profile 4: Dani -->
        <div
          class="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-10 mt-10 items-center page-animation scroll-animate"
          :class="{ show: isAnimate }"
        >
          <div
            class="w-full h-auto lg:col-span-2 order-2 lg:order-1 border border-white/10 bg-linear-to-br from-[#24364d] to-[#1d2d42] shadow-[0_10px_40px_rgba(0,0,0,0.35)] overflow-hidden p-6 lg:p-10 rounded-4xl ring-1 ring-white/40 py-10 lg:py-20"
          >
            <h2
              class="text-2xl lg:text-4xl capitalize font-semibold mb-2 text-left lg:text-right text-white"
            >
              M. Kahlil Dani Zakhran
            </h2>
            <h2
              class="text-2xl lg:text-4xl capitalize font-semibold mb-8 text-left lg:text-right text-white"
            >
              21.61.0227
            </h2>
            <p class="text-lg lg:text-2xl italic text-white mb-10 text-justify lg:text-right">
              “Bukan tentang seberapa cepat melaju, tapi seberapa konsisten tetap bertahan sampai
              tujuan.”
            </p>
            <a href="https://github.com/Danizakhran" target="_blank" rel="noopener noreferrer" class="group flex justify-start lg:justify-end items-center gap-3 mt-10 w-full lg:w-auto ml-auto">
              <h5 class="text-white text-lg lg:text-2xl mr-3 lg:ml-3 transition-colors duration-300 group-hover:text-[#EE0034]">Danizakhran</h5>
              <img
                src="./../components/img/profilePage/githubicon.png"
                alt="github_icon"
                class="w-10 h-10 lg:w-auto transition-transform duration-300 group-hover:scale-105"
              />
            </a>
          </div>
          <div
            class="w-full max-w-[320px] lg:max-w-none aspect-110/145 overflow-hidden rounded-full mx-auto order-1 lg:order-2"
          >
            <img
              class="w-full h-full object-cover object-[10%_-6rem] scale-150 origin-center"
              src="./../components/img/profilePage/profile/profile4.jpeg"
              alt="Dani"
            />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
/* ===================================================
   1. ANIMASI POP UP (Saat halaman pertama kali dibuka)
   =================================================== */
@keyframes heroScale {
  0% {
    transform: scale(1.15);
    filter: brightness(0.1);
  }
  100% {
    filter: brightness(0.4) saturate-50;
  }
}
.animate-hero-scale {
  animation: heroScale 1.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.page-animation {
  opacity: 0;
  transform: translateY(40px);
  transition:
    transform 1s cubic-bezier(0.16, 1, 0.3, 1),
    opacity 0.7s ease;
  will-change: transform, opacity;
}

.page-animation.show {
  opacity: 1;
  transform: translateY(0);
}

/* ===================================================
   2. ANIMASI SCROLL (Mendukung Arah Down & Up)
   =================================================== */
.scroll-animate {
  opacity: 0;
  will-change: transform, opacity;
  transition: opacity 0.8s ease, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}

/* KETIKA SCROLL DOWN: Elemen muncul mulus meluncur naik dari bawah */
.scroll-animate.show-down {
  opacity: 1;
  transform: translateY(0) scale(1);
}

/* KETIKA SCROLL UP: Elemen muncul mulus meluncur turun dari atas */
.scroll-animate.show-up {
  opacity: 1;
  transform: translateY(0) scale(1);
}

/* Status reset saat elemen keluar/meninggalkan jendela pandang layar */
.scroll-animate:not(.show-down):not(.show-up) {
  opacity: 0;
  transform: translateY(60px) scale(0.97);
}
</style>