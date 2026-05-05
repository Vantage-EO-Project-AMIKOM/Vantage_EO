<script setup>
import CountPerson from '@/components/CountPerson.vue';
import HomLeatestPost from '@/components/HomLeatestPost.vue';
</script>

<template>
  <!-- HERO BG -->
  <section class="w-full h-130 flex justify-center items-center relative overflow-hidden">

    <img src="./../components/img/bg/hero-bg.jpg" alt="" class="w-full object-cover absolute top-0 left-0 opacity-55"
      draggable="false">

    <div class="w-full max-w-6xl mx-auto z-10">
      <h1 class="w-1/2 capitalize text-5xl font-bold text-white text-shadow-lg/20 text-shadow-black mb-5">let's create your event with vantage</h1>
      <RouterLink to="/">
        <button
          class="px-7 py-4 bg-[#788663] rounded-full text-white transition-all hover:translate-x-2 cursor-pointer">Check
          this
          out!</button>
      </RouterLink>
    </div>

  </section>

  <!-- CONTENT I -->
  <section class=" w-full h-auto">

    <div class=" w-full max-w-4/5 mx-auto my-20 grid grid-cols-2 gap-4">

      <div class=" grid grid-cols-2 grid-rows-2 gap-6 pr-10">
        <div class="w-8/10 h-9/10 rounded-2xl justify-self-end self-end overflow-hidden relative -bottom-6">
          <img src="./../components/img/bg/c1.jpeg" alt="" class=" w-full h-full object-cover object-center"
            draggable="false">
        </div>
        <div class="w-full h-80 rounded-2xl overflow-hidden">
          <img src="./../components/img/bg/c2.jpeg" alt="" class=" w-full h-full object-cover object-center"
            draggable="false">
        </div>
        <div class="w-9/10 h-80 rounded-2xl justify-self-end overflow-hidden relative -bottom-6">
          <img src="./../components/img/bg/c3.jpeg" alt="" class=" w-full h-full object-cover object-center"
            draggable="false">
        </div>
        <div class="w-9/10 h-9/10 rounded-2xl justify-self-start self-start overflow-hidden">
          <img src="./../components/img/bg/c4.jpeg" alt="" class=" w-full h-full object-cover object-center"
            draggable="false">
        </div>
      </div>

      <div class=" flex flex-col self-center">
        <h2 class=" w-3/5 text-4xl capitalize text-black font-semibold mb-8">Welcome the Greatest Digital Conference
        </h2>

        <p class=" text-lg font-normal mb-15">Adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna
          aliqua. Ut enim ad minim veniam
          quis nostrud exercitation ulla mco sed do eiusmod tempor incid idunt ut labore et dolore magna.</p>

        <div class=" grid grid-cols-3 grid-rows-2 gap-8 mb-15">
          <div class=" flex items-center transition-all hover:text-[#c58a00]">
            <i class="fa fa-users text-3xl mr-4" aria-hidden="true"></i>
            <p>Up to 2500 Guest</p>
          </div>
          <div class=" col-span-2 flex items-center transition-all hover:text-[#c58a00]">
            <i class="fa fa-ticket text-3xl mr-4" aria-hidden="true"></i>
            <p>Free Entry Ticket</p>
          </div>
          <div class=" flex items-center transition-all hover:text-[#c58a00]">
            <i class="fa fa-play-circle text-3xl mr-4" aria-hidden="true"></i>
            <p>950 SQFT Space</p>
          </div>
          <div class=" col-span-2 flex items-center transition-all hover:text-[#c58a00]">
            <i class="fa fa-comment text-3xl mr-4" aria-hidden="true"></i>
            <p>Up to 2500 Guests</p>
          </div>
        </div>

        <RouterLink to="/">
          <button
            class="px-7 py-4 border-2 border-black rounded-full transition-all hover:translate-x-2 cursor-pointer">View
            Our
            Schdule</button>
        </RouterLink>

      </div>

    </div>

  </section>

  <!-- OUR SERVICE -->
  <section class=" w-full h-auto">

    <div class=" w-full max-w-3/5 mx-auto my-20">
      <h2 class=" text-4xl capitalize text-black font-semibold mb-8 text-center">Our Service</h2>
      <p class=" text-lg font-normal text-black text-center">Di Vantage Event Organizer, kami senantiasa menghadirkan
        rangkaian layanan terintegrasi yang dirancang untuk
        menjadikan acara Anda spektakuler. Sebagai Event Organizer (EO) di Indonesia, kami menghadirkan kreativitas,
        ketepatan, dan inovasi dalam setiap aspek perencanaan dan pelaksanaan acara, baik itu Corporate Gathering, FGD,
        Summit, Expo, Sport Event, MICE, hingga CSR Activity.</p>
    </div>

  </section>

  <section class=" w-full h-auto">
    <CountPerson />
  </section>

  <section class=" w-full h-auto">
    <HomLeatestPost />
  </section>
</template>
