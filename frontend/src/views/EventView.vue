<script setup>
import Navbar from '@/components/Navbar.vue'
import HomLeatestPost from '@/components/HomLeatestPost.vue'

import heroBg from '@/components/img/bg/hero-bg.jpg'
import eventImage from '@/components/img/bg/c5.png'
import createEventImage from '@/components/img/bg/hero2.jpeg'


</script>

<template>
  <div class="">
    <Navbar />

    <!-- Hero -->
    <section class="relative min-h-80 overflow-hidden pt-24 md:min-h-97.5">
      <img :src="heroBg" alt="Event crowd" class="absolute inset-0 h-full w-full object-cover" />
      <div class="absolute inset-0 bg-black/60"></div>

      <div
        class="relative z-10 mx-auto flex min-h-80 w-4/5 flex-col justify-center text-white md:min-h-97.5"
      >
        <h1 class="text-5xl font-bold md:text-6xl">Event</h1>
        <p class="mt-2 text-sm font-medium md:text-base">VANTAGE &gt; Event</p>
    <section class="w-full h-130 z-10 flex justify-center items-center relative overflow-hidden">
        <div class="absolute inset-0 bg-black/60">
            <img src="./../components/img/bg/hero-bg.jpg" alt="" draggable="false"
                class="w-full h-full object-cover brightness-[0.4] saturate-50 absolute top-0 left-0 opacity-100 bg-size-cover" :style="{ transform: `translateY(${parallaxOffset}px)` }">
        </div>

      <div class="w-full max-w-3/4 mx-auto z-20 text-white text-shadow-lg/30 shadow-black">
            <!-- Judul Utama -->
            <h1 class="capitalize text-7xl font-bold mb-4 drop-shadow-md">Event</h1>

        <!-- Menyatukan kalimat ke dalam satu tag <p> dengan max-w-2xl dan text-white/80 -->
        <p class="text-xl font-normal text-white max-w-2xl leading-relaxed drop-shadow">
          Discover global tech conferences, hands-on workshops, and networking opportunities that shape the future.
        </p>
      </div>
    </section>

    <!-- Main content -->
    <main
      class="relative z-20 bg-[#2B3B4C] py-5 rounded-[3rem] -mt-10 mb-20 shadow-[0_0_80px_rgba(0,0,0,0.15)]"
    >
      <section class="mx-auto grid w-4/5 items-center gap-10 grid-cols-1 xl:grid-cols-2">
    <main class="relative z-20 bg-[#2B3B4C] py-5 rounded-[3rem] -mt-10 mb-20 shadow-[0_0_80px_rgba(0,0,0,0.15)]">
      <!-- Ditambahkan items-center pada grid untuk membantu perataan vertikal -->
      <section class="mx-auto grid w-4/5 items-center gap-10 grid-cols-1 xl:grid-cols-2 pt-10">
        <div class="text-white">
          <h2 class="max-w-md text-5xl font-bold leading-tight md:text-6xl">
            Make your<br />own event
          </h2>

          <!-- max-w diubah ke xl/2xl agar teks memanjang ke samping dan pas menjadi 2 baris -->
          <p class="mt-6 max-w-xl text-base font-normal leading-relaxed md:text-lg md:leading-loose text-justify xl:text-left">
            Buat dan kelola acara Anda bersama Vantage. Kami membantu proses perencanaan, publikasi, serta pengelolaan event dalam satu platform.<br class="hidden xl:inline" />
          </p>

          <RouterLink to="/event/create"
            class="mt-7 inline-flex rounded-full bg-[#EE0034] px-8 py-3 text-lg font-medium text-white transition hover:-translate-y-1 hover:bg-[#c9002c]">
            Create
          </RouterLink>
        </div>

        <div class="w-9/10 h-9/10 rounded-2xl justify-self-start self-start overflow-hidden">
          <img
            :src="eventImage"
            alt="Event"
            class="w-full h-full object-cover object-center"
            draggable="false"
          />
        <!-- Mengubah self-start menjadi self-center dan menambahkan mt agar posisi foto agak turun -->
        <div class="w-full xl:w-9/10 aspect-video xl:aspect-auto h-auto xl:h-9/10 rounded-2xl justify-self-start self-center overflow-hidden mt-6 xl:mt-10">
          <img src="./../components/img/bg/c5.png" alt="" class="w-full h-full object-cover object-center"
            draggable="false">
        </div>
      </section>

      <!-- Komponen latest post yang sudah ada -->
      <section class="mx-auto mt-20 w-4/5">
        <HomLeatestPost />
      </section>
    </main>
  </div>
</template>
