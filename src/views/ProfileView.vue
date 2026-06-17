<script>
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

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>
<template>
  <!-- HERO -->
  <section
  class="w-full min-h-[70vh] md:min-h-[85vh] flex items-center relative overflow-hidden">
  >
    <div class="absolute inset-0 bg-black/60">
      <img src="./../components/img/bg/hero-bg.jpg" alt=""
        class="w-full h-full object-cover brightness-[0.4] saturate-50 absolute top-0 left-0 opacity-100 bg-size-cover"
        draggable="false" :style="{ transform: `translateY(${parallaxOffset}px)` }" />
    </div>
    <div class="w-full max-w-3/4 mx-auto z-10">
      <h1
        class="w-full md:w-2/3 capitalize
        text-4xl sm:text-5xl md:text-6xl lg:text-7xl
        font-bold text-white leading-tight"
      >
        Profile
      </h1>
      <p class="text-sm sm:text-base md:text-lg uppercase text-white">vantage > profile</p>
    </div>
  </section>

  <!-- DID -->
  <div
    class="relative z-10 bg-[#2B3B4C]
    py-10 sm:py-16 md:py-20
    rounded-t-4xl md:rounded-[3rem]"
>
    <section class="max-w-[90%] md:max-w-[87.5%] w-full mx-auto px-4">
      <div class="bg-linear-to-br from-[#24364d] to-[#1d2d42] overflow-hidden p-15 rounded-[60px]">
        <h2 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl capitalize font-semibold">
          DID YOU KNOW US?
        </h2>
        <p class="text-white text-base sm:text-lg md:text-xl lg:text-2xl">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus quis lacinia leo. Donec
          tincidunt congue augue vel ullamcorper. Mauris venenatis id ligula et viverra. Mauris
          suscipit aliquam tellus nec euismod. Vestibulum vestibulum dictum venenatis. Curabitur
          laoreet eu augue ut maximus. Curabitur a arcu enim. Mauris viverra velit euismod sem
          feugiat, ut porta est semper.
        </p>
        <p class="text-white text-base sm:text-lg md:text-xl lg:text-2xl">
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
    <div class="w-full max-w-4/5 mx-auto py-20">
      <h2 class="text-6xl capitalize font-semibold text-center text-white">Our Profile</h2>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10 mt-10 items-center justify-items-center">
      
      <div class="w-full max-w-70 sm:max-w-87.5 md:max-w-105 aspect-square overflow-hidden rounded-full shrink-0">
        <img class="w-full h-full object-cover object-center scale-110"
          src="./../components/img/profilePage/profile/profile1.jpeg" alt="Azka" />
      </div>
      
      <div class="w-full h-full col-span-1 lg:col-span-2 border border-white/10 bg-linear-to-br from-[#24364d] to-[#1d2d42] shadow-[0_10px_40px_rgba(0,0,0,0.35)] rounded-4xl ring-1 ring-white/40 p-8 md:p-10 flex flex-col justify-center">
        <h2 class="text-2xl sm:text-3xl md:text-4xl capitalize font-semibold mb-2 text-center lg:text-left text-white">
          Dhiya Muhammad Azka
        </h2>
        <h2 class="text-2xl sm:text-3xl md:text-4xl capitalize font-semibold mb-6 text-center lg:text-left text-white">
          24.61.0270
        </h2>
        <p class="text-xl md:text-2xl italic text-white mb-6 text-center lg:text-left">
          “Tenang dalam langkah, kuat dalam tujuan, dan selalu jadi cahaya di setiap perjalanan.”
        </p>
        <div class="flex justify-center lg:justify-start items-center gap-3 mt-4">
          <img src="./../components/img/profilePage/githubicon.png" alt="github_icon" class="w-8 h-8 object-contain" />
          <h5 class="text-white text-xl md:text-2xl">MehmedAzka</h5>
        </div>
      </div>
    </div>
        <div class="grid grid-cols-3 gap-10 mt-10">
          <div
            class="w-full h-auto col-span-2 border border-white/10 bg-linear-to-br from-[#24364d] to-[#1d2d42] shadow-[0_10px_40px_rgba(0,0,0,0.35)] overflow-hidden p-10 inset-0 rounded-4xl ring-1 ring-white/40 py-20 self-center">
            <h2 class="text-2xl sm:text-3xl md:text-4xl capitalize font-semibold mb-2 text-right text-white">Puan Aeesya</h2>
            <h2 class="text-2xl sm:text-3xl md:text-4xl capitalize font-semibold mb-8 text-right text-white">24.61.0274</h2>
            <p class="text-2xl italic text-white mb-10 text-right">
              “Elegan dalam sikap, berani dalam mimpi, dan tetap bersinar tanpa harus merendahkan
              siapa pun.”
            </p>
            <div class="flex justify-end items-center gap-3 mt-10">
              <h5 class="text-white text-2xl ml-3 self-center">syaaaa07</h5>
              <img src="./../components/img/profilePage/githubicon.png" alt="github_icon" />
            </div>
          </div>
          <div class="w-full h-145 overflow-hidden rounded-full">
            <img class="w-full h-full object-cover object-[85%_15%] scale-150 origin-center"
              src="./../components/img/profilePage/profile/profile2.jpeg" alt="Puan" />
          </div>
        </div>
        <div class="grid grid-cols-3 mt-10">
          <div class="w-full max-w-70 sm:max-w-87.5 md:max-w-105 h-80 sm:h-105 md:h-140 mx-auto overflow-hidden rounded-full">
            <img class=" w-full h-full object-cover object-[0%_100%] scale-130 origin-center"
              src="./../components/img/profilePage/profile/profile3.jpeg" alt="Angga" />
          </div>
          <div
            class="w-full h-auto col-span-2 border border-white/10 bg-linear-to-br from-[#24364d] to-[#1d2d42] shadow-[0_10px_40px_rgba(0,0,0,0.35)] overflow-hidden p-10 inset-0 rounded-4xl ring-1 ring-white/40 py-20 self-center">
            <h2 class="text-2xl sm:text-3xl md:text-4xl4xl capitalize font-semibold mb-2 text-center lg:text-left text-white">
              L.M.Hanggara Putra Akbar
            </h2>
            <h2 class="text-2xl sm:text-3xl md:text-4xl capitalize font-semibold mb-8 text-center lg:text-left text-white">24.61.0279</h2>
            <p class="text-2xl italic text-white mb-10 text-justify">
              “Dilahirkan untuk memimpin, tumbuh untuk menginspirasi, dan melangkah tanpa takut menghadapi dunia.”
            </p>
            <div class="flex justify-start items-center gap-3 mt-10">
              <img src="./../components/img/profilePage/githubicon.png" alt="github_icon" />
              <h5 class="text-white text-2xl ml-3 self-center">agashesh</h5>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center mt-10">
          <div
            class="w-full h-auto col-span-2 border border-white/10 bg-linear-to-br from-[#24364d] to-[#1d2d42] shadow-[0_10px_40px_rgba(0,0,0,0.35)] overflow-hidden p-10 inset-0 rounded-4xl ring-1 ring-white/40 py-20 self-center">
            <h2 class="text-4xl capitalize font-semibold mb-2 text-right text-white">Dani Zakhran</h2>
            <h2 class="text-4xl capitalize font-semibold mb-8 text-right text-white">21.61.0227</h2>
            <p class="text-2xl italic text-white mb-10 text-right">
              “Bukan tentang seberapa cepat melaju, tapi seberapa konsisten tetap bertahan sampai tujuan.”
            </p>
            <div class="flex justify-center lg:justify-end items-center gap-3 mt-6 md:mt-10">
              <h5 class="text-white text-2xl ml-3 self-center">Danizakhran</h5>
              <img src="./../components/img/profilePage/githubicon.png" alt="github_icon" />
            </div>
          </div>
          <div class="w-full h-145 overflow-hidden rounded-full">
            <img class="w-full h-full object-cover object-[10%_-6rem] scale-150 origin-center" src="./../components/img/profilePage/profile/profile4.jpeg" alt="Dani" />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
