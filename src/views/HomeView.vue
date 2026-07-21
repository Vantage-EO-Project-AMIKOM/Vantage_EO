<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import CountPerson from '@/components/CountPerson.vue';
import HomLeatestPost from '@/components/HomLeatestPost.vue';

const parallaxOffset = ref(0);
const imageOffsets = ref({ c1: 0, c2: 0, c3: 0, c4: 0 });
const contentOffset = ref(0);

// State untuk memicu animasi pop up langsung pas masuk page
const isAnimate = ref(false);

// State pelacak arah scroll (Scroll Up / Scroll Down)
const lastScrollY = ref(0);
const scrollDirection = ref('down');

// Referensi elemen ke seksi schedule / latest post
const scheduleSection = ref(null);

// Fungsi Smooth Scroll ke Seksi Schedule
const scrollToSchedule = () => {
  if (scheduleSection.value) {
    scheduleSection.value.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
};

const handleScroll = () => {
  parallaxOffset.value = window.scrollY * 0.3;
  imageOffsets.value.c1 = window.scrollY * 0.3;
  imageOffsets.value.c2 = window.scrollY * 0.25;
  imageOffsets.value.c3 = window.scrollY * 0.35;
  imageOffsets.value.c4 = window.scrollY * 0.2;
  contentOffset.value = window.scrollY * -0.05;

  // Deteksi arah scroll
  if (window.scrollY > lastScrollY.value) {
    scrollDirection.value = 'down';
  } else {
    scrollDirection.value = 'up';
  }
  lastScrollY.value = window.scrollY;
};

const observer = ref(null);

onMounted(() => {
  // Aktifkan animasi pop up awal untuk hero teks & section pertama
  setTimeout(() => {
    isAnimate.value = true;
  }, 100);

  window.addEventListener('scroll', handleScroll);

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
        // Hapus class biar bisa trigger bolak-balik pas di-scroll
        entry.target.classList.remove('show-down', 'show-up');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: "-40px 0px -40px 0px"
  });

  // Hanya mengobservasi elemen dengan class .scroll-animate (Section 2 ke bawah)
  document.querySelectorAll('.scroll-animate').forEach(el => observer.value.observe(el));
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
  if (observer.value) observer.value.disconnect();
});
</script>

<template>
  <section class="w-full h-130 z-10 flex items-center relative overflow-hidden">
    <div class="absolute inset-0 bg-black/60">
      <img src="./../components/img/bg/hero-bg.jpg" alt=""
        class="w-full h-full object-cover brightness-[0.4] saturate-50 absolute top-0 left-0 opacity-100 bg-size-cover animate-hero-pop"
        draggable="false" :style="{ transform: `translateY(${parallaxOffset}px)` }">
    </div>
    
    <!-- Hero Text Container dengan animasi Pop Up Awal -->
    <div class="w-full max-w-3/4 mx-auto z-10 transition-all duration-1000 transform scale-95 opacity-0 ease-out"
         :class="{ 'scale-100 opacity-100': isAnimate }">
      <h1 class="w-full lg:w-2/5 capitalize text-5xl font-bold text-white text-shadow-lg/50 text-shadow-black mb-5">
        let's create your event with vantage</h1>
      <RouterLink to="/event">
        <button
          class="px-9 py-4 bg-[#EE0034] rounded-full text-white transition-all hover:translate-x-2 cursor-pointer">
          Check this out!
        </button>
      </RouterLink>
    </div>
  </section>

  <div class="relative z-10 bg-[#2B3B4C] py-5 rounded-[3rem] -mt-10 mb-20 shadow-[0_0_80px_rgba(0,0,0,0.15)] overflow-hidden">

    <!-- SECTION 1: Welcome Digital Conference -->
    <section class="w-full h-auto page-animation" :class="{ 'show': isAnimate }">
      <div class="w-full max-w-4/5 mx-auto my-20 grid grid-cols-1 xl:grid-cols-2 gap-4">

        <div class="grid grid-cols-2 grid-rows-2 gap-6 pr-10 mb-15 xl:mb-0">
          <div class="w-8/10 h-9/10 rounded-2xl justify-self-end self-end overflow-hidden relative -bottom-6">
            <img src="./../components/img/bg/c1.jpeg" alt="" class="w-full h-full object-cover object-center"
              draggable="false">
          </div>
          <div class="w-full h-80 rounded-2xl overflow-hidden">
            <img src="./../components/img/bg/c2.jpeg" alt="" class="w-full h-full object-cover object-center"
              draggable="false">
          </div>
          <div class="w-9/10 h-80 rounded-2xl justify-self-end overflow-hidden relative -bottom-6">
            <img src="./../components/img/bg/c3.jpeg" alt="" class="w-full h-full object-cover object-center"
              draggable="false">
          </div>
          <div class="w-9/10 h-9/10 rounded-2xl justify-self-start self-start overflow-hidden">
            <img src="./../components/img/bg/c4.jpeg" alt="" class="w-full h-full object-cover object-center"
              draggable="false">
          </div>
        </div>

        <div class="flex flex-col self-center text-white">
          <h2 class="w-3/5 text-4xl capitalize font-semibold mb-8">Welcome the Greatest Digital Conference</h2>
          <p class="text-lg font-normal mb-15">Adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
            magna aliqua. Ut enim ad minim veniam quis nostrud exercitation ulla mco sed do eiusmod tempor incid idunt
            ut labore et dolore magna.</p>

          <div class="grid grid-cols-2 md:grid-cols-3 gap-8 mb-15">
            <div class="flex items-center transition-all hover:text-[#EE0034]">
              <i class="fa fa-users text-3xl mr-4" aria-hidden="true"></i>
              <p>Up to 2500 Guest</p>
            </div>
            <div class="col-span-2 flex items-center transition-all hover:text-[#EE0034]">
              <i class="fa fa-ticket text-3xl mr-4" aria-hidden="true"></i>
              <p>Free Entry Ticket</p>
            </div>
            <div class="flex items-center transition-all hover:text-[#EE0034]">
              <i class="fa fa-play-circle text-3xl mr-4" aria-hidden="true"></i>
              <p>950 SQFT Space</p>
            </div>
            <div class="col-span-2 flex items-center transition-all hover:text-[#EE0034]">
              <i class="fa fa-comment text-3xl mr-4" aria-hidden="true"></i>
              <p>Up to 2500 Guests</p>
            </div>
          </div>

          <!-- Tombol View Our Schedule dengan Smooth Scroll -->
          <div>
            <button
              @click="scrollToSchedule"
              type="button"
              class="px-7 py-4 border-2 border-white bg-[#17202A] rounded-full transition-all hover:bg-[#EE0034] hover:border-[#EE0034] hover:translate-x-2 cursor-pointer">
              View Our Schedule
            </button>
          </div>
        </div>

      </div>
    </section>

    <!-- SECTION 2: Our Service (Scroll Animate) -->
    <section class="w-full h-auto scroll-animate">
      <div class="w-full max-w-3/5 mx-auto py-20 text-white">
        <h2 class="text-4xl capitalize font-semibold mb-8 text-center">Our Service</h2>
        <p class="text-lg font-normal text-center">Di Vantage Event Organizer, kami senantiasa menghadirkan rangkaian
          layanan terintegrasi yang dirancang untuk menjadikan acara Anda spektakuler. Sebagai Event Organizer (EO) di
          Indonesia, kami menghadirkan kreativitas, ketepatan, dan inovasi dalam setiap aspek perencanaan dan
          pelaksanaan acara, baik itu Corporate Gathering, FGD, Summit, Expo, Sport Event, MICE, hingga CSR Activity.
        </p>
      </div>
    </section>

    <!-- SECTION 3: Count Person (Scroll Animate) -->
    <section class="w-full h-auto scroll-animate">
      <CountPerson />
    </section>

    <!-- SECTION 4: Latest Post / Schedule (Target Smooth Scroll) -->
    <section ref="scheduleSection" id="schedule-section" class="w-full h-auto scroll-animate pt-10">
      <HomLeatestPost />
    </section>
  </div>
</template>

<style scoped>
/* ===================================================
   1. ANIMASI POP UP INSTAN (Hero & Section 1)
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
  transform: translateY(50px) scale(0.98);
  will-change: transform, opacity;
  transition: opacity 0.8s ease, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}

/* Ketika di-scroll ke bawah */
.scroll-animate.show-down {
  opacity: 1;
  transform: translateY(0) scale(1);
}

/* Ketika di-scroll ke atas */
.scroll-animate.show-up {
  opacity: 1;
  transform: translateY(0) scale(1);
}

/* Keadaan reset saat elemen keluar dari layar */
.scroll-animate:not(.show-down):not(.show-up) {
  opacity: 0;
  transform: translateY(50px) scale(0.98);
}
</style>