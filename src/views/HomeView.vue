  <script setup>
  import { ref, onMounted, onUnmounted } from 'vue';
  import CountPerson from '@/components/CountPerson.vue';
  import HomLeatestPost from '@/components/HomLeatestPost.vue';

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

  onMounted(() => {
    window.addEventListener('scroll', handleScroll);
  });

  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
  });
  </script>

  <template>
    <!-- HERO BG -->
    <section class="w-full h-130 z-10 flex items-center relative overflow-hidden">
      <div class="absolute inset-0 bg-black/60">
      <img src="./../components/img/bg/hero-bg.jpg" alt="" class="w-full h-full object-cover brightness-[0.4] saturate-50 absolute top-0 left-0 opacity-100 bg-size-cover"
        draggable="false" :style="{ transform: `translateY(${parallaxOffset}px)` }">
      </div>
      <div class="w-full max-w-3/5 mx-auto z-10">
        <h1 class="w-2/3 capitalize text-7xl font-bold text-white text-shadow-lg/50 text-shadow-black mb-5">let's create your event with vantage</h1>
        <RouterLink to="/">
          <button
            class="px-7 py-4 bg-[#788663] rounded-full text-white transition-all hover:translate-x-2 cursor-pointer">Check
            this
            out!</button>
        </RouterLink>
      </div>

    </section>

    <!-- CONTENT I -->
    <div class="relative z-10 bg-[#FFF9EB] py-5 rounded-[3rem] -mt-10 mb-[650px] shadow-[0_0_80px_rgba(0,0,0,0.15)]">
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
    </div>
  </template>
