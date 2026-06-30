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

const handleScroll = () => {
  parallaxOffset.value = window.scrollY * 0.3

  // Apply parallax to grid images with different speeds
  imageOffsets.value.c1 = window.scrollY * 0.3
  imageOffsets.value.c2 = window.scrollY * 0.25
  imageOffsets.value.c3 = window.scrollY * 0.35
  imageOffsets.value.c4 = window.scrollY * 0.2
  contentOffset.value = window.scrollY * -0.05
}

// --- LOGIKA ANIMASI SCROLL DUA ARAH ---
const observer = ref(null)

onMounted(() => {
  window.addEventListener('scroll', handleScroll)

  observer.value = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Ketika masuk layar (scroll kebawah/keatas)
        entry.target.classList.add('show-animated')
      } else {
        // Ketika keluar layar, hapus class untuk memicu animasi ulang nanti
        entry.target.classList.remove('show-animated')
      }
    })
  }, {
    threshold: 0.1, // Beraksi ketika minimal 10% elemen terdeteksi di layar
    rootMargin: "-20px 0px" // Buffer deteksi agar transisinya terasa dinamis
  })

  // Daftarkan semua elemen ber-class 'scroll-animate'
  document.querySelectorAll('.scroll-animate').forEach(el => observer.value.observe(el))
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  if (observer.value) observer.value.disconnect()
})
</script>

<template>
  <!-- HERO -->
  <section class="w-full h-130 z-10 flex items-center relative overflow-hidden">
    <div class="absolute inset-0 bg-black/60">
      <img src="./../components/img/bg/hero-bg.jpg" alt=""
        class="w-full h-full object-cover brightness-[0.4] saturate-50 absolute top-0 left-0 opacity-100 bg-size-cover"
        draggable="false" :style="{ transform: `translateY(${parallaxOffset}px)` }" />
    </div>
    <div class="w-full max-w-3/4 mx-auto z-10">
      <h1 class="w-2/3 capitalize text-7xl font-bold text-white text-shadow-lg/50 text-shadow-black mb-5">
        Profile
      </h1>
      <p class="text-lg font-normal uppercase text-white">vantage > profile</p>
    </div>
  </section>

  <!-- DID -->
  <div class="relative z-10 bg-[#2B3B4C] py-20 rounded-[3rem] -mt-10 mb-250 xl:mb-162.5 shadow-[0_0_80px_rgba(0,0,0,0.15)]">
    <section class="max-w-7/8 w-full mx-auto">
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

    <section class="w-full h-auto">
      <div class="w-full max-w-[95%] xl:max-w-4/5 mx-auto py-20">
        <h2 class="text-4xl lg:text-6xl capitalize font-semibold text-center text-white scroll-animate fade-up">Our Profile</h2>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-10 mt-10 items-center scroll-animate fade-up">
          <div class="w-full max-w-[320px] lg:max-w-none aspect-110/145 overflow-hidden rounded-full mx-auto">
            <img class="w-full h-full object-cover object-[0%_100%] scale-130 origin-center"
              src="./../components/img/profilePage/profile/profile1.jpeg" alt="Azka" />
          </div>
          <div
            class="w-full h-auto lg:col-span-2 border border-white/10 bg-linear-to-br from-[#24364d] to-[#1d2d42] shadow-[0_10px_40px_rgba(0,0,0,0.35)] overflow-hidden p-6 lg:p-10 rounded-4xl ring-1 ring-white/40 py-10 lg:py-20">
            <h2 class="text-2xl lg:text-4xl capitalize font-semibold mb-2 text-left text-white">
              Dhiya mamat Azka
            </h2>
            <h2 class="text-2xl lg:text-4xl capitalize font-semibold mb-8 text-left text-white">24.61.0270</h2>
            <p class="text-lg lg:text-2xl italic text-white mb-10 text-justify">
              “Tenang dalam langkah, kuat dalam tujuan, dan selalu jadi cahaya di setiap
              perjalanan.”
            </p>
            <div class="flex justify-start items-center gap-3 mt-10">
              <img src="./../components/img/profilePage/githubicon.png" alt="github_icon" class="w-6 h-6 lg:w-auto" />
              <h5 class="text-white text-lg lg:text-2xl ml-3">MehmedAzka</h5>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-10 mt-10 items-center scroll-animate fade-up">
          <div
            class="w-full h-auto lg:col-span-2 order-2 lg:order-1 border border-white/10 bg-linear-to-br from-[#24364d] to-[#1d2d42] shadow-[0_10px_40px_rgba(0,0,0,0.35)] overflow-hidden p-6 lg:p-10 rounded-4xl ring-1 ring-white/40 py-10 lg:py-20">
            <h2 class="text-2xl lg:text-4xl capitalize font-semibold mb-2 text-left lg:text-right text-white">Puan Aeesya</h2>
            <h2 class="text-2xl lg:text-4xl capitalize font-semibold mb-8 text-left lg:text-right text-white">24.61.0274</h2>
            <p class="text-lg lg:text-2xl italic text-white mb-10 text-justify lg:text-right">
              “Elegan dalam sikap, berani dalam mimpi, dan tetap bersinar tanpa harus merendahkan
              siapa pun.”
            </p>
            <div class="flex justify-start lg:justify-end items-center gap-3 mt-10">
              <h5 class="text-white text-lg lg:text-2xl mr-3 lg:ml-3">syaaaa07</h5>
              <img src="./../components/img/profilePage/githubicon.png" alt="github_icon" class="w-6 h-6 lg:w-auto" />
            </div>
          </div>
          <div class="w-full max-w-[320px] lg:max-w-none aspect-110/145 overflow-hidden rounded-full mx-auto order-1 lg:order-2">
            <img class="w-full h-full object-cover object-[85%_15%] scale-150 origin-center"
              src="./../components/img/profilePage/profile/profile2.jpeg" alt="Puan" />
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-10 mt-10 items-center scroll-animate fade-up">
          <div class="w-full max-w-[320px] lg:max-w-none aspect-110/145 overflow-hidden rounded-full mx-auto">
            <img class="w-full h-full object-cover object-[0%_100%] scale-130 origin-center"
              src="./../components/img/profilePage/profile/profile3.jpeg" alt="Angga" />
          </div>
          <div
            class="w-full h-auto lg:col-span-2 border border-white/10 bg-linear-to-br from-[#24364d] to-[#1d2d42] shadow-[0_10px_40px_rgba(0,0,0,0.35)] overflow-hidden p-6 lg:p-10 rounded-4xl ring-1 ring-white/40 py-10 lg:py-20">
            <h2 class="text-2xl lg:text-4xl capitalize font-semibold mb-2 text-left text-white">
              L.M.Hanggara Putra Akbar
            </h2>
            <h2 class="text-2xl lg:text-4xl capitalize font-semibold mb-8 text-left text-white">24.61.0279</h2>
            <p class="text-lg lg:text-2xl italic text-white mb-10 text-justify">
              “Dilahirkan untuk memimpin, tumbuh untuk menginspirasi, dan melangkah tanpa takut menghadapi dunia.”
            </p>
            <div class="flex justify-start items-center gap-3 mt-10">
              <img src="./../components/img/profilePage/githubicon.png" alt="github_icon" class="w-6 h-6 lg:w-auto" />
              <h5 class="text-white text-lg lg:text-2xl ml-3">agashesh</h5>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-10 mt-10 items-center scroll-animate fade-up">
          <div
            class="w-full h-auto lg:col-span-2 order-2 lg:order-1 border border-white/10 bg-linear-to-br from-[#24364d] to-[#1d2d42] shadow-[0_10px_40px_rgba(0,0,0,0.35)] overflow-hidden p-6 lg:p-10 rounded-4xl ring-1 ring-white/40 py-10 lg:py-20">
            <h2 class="text-2xl lg:text-4xl capitalize font-semibold mb-2 text-left lg:text-right text-white">Dani Zakhran</h2>
            <h2 class="text-2xl lg:text-4xl capitalize font-semibold mb-8 text-left lg:text-right text-white">21.61.0227</h2>
            <p class="text-lg lg:text-2xl italic text-white mb-10 text-justify lg:text-right">
              “Bukan tentang seberapa cepat melaju, tapi seberapa konsisten tetap bertahan sampai tujuan.”
            </p>
            <div class="flex justify-start lg:justify-end items-center gap-3 mt-10">
              <h5 class="text-white text-lg lg:text-2xl mr-3 lg:ml-3">Danizakhran</h5>
              <img src="./../components/img/profilePage/githubicon.png" alt="github_icon" class="w-6 h-6 lg:w-auto" />
            </div>
          </div>
          <div class="w-full max-w-[320px] lg:max-w-none aspect-110/145 overflow-hidden rounded-full mx-auto order-1 lg:order-2">
            <img class="w-full h-full object-cover object-[10%_-6rem] scale-150 origin-center" src="./../components/img/profilePage/profile/profile4.jpeg" alt="Dani" />
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