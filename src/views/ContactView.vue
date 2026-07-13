<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router'; // 1. Import useRouter dari vue-router

const router = useRouter(); // 2. Definisikan instance router
const parallaxOffset = ref(0);
const imageOffsets = ref({
    c1: 0,
    c2: 0,
    c3: 0,
    c4: 0
});
const contentOffset = ref(0);

const isAnimate = ref(false);
const lastScrollY = ref(0);
const scrollDirection = ref('down');

// 3. State untuk menangkap data form formulir (Opsional, siap dipakai ke backend nanti)
const form = ref({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
});

// 4. Fungsi handle submit form untuk mengarahkan ke halaman tiket
const handleRegister = () => {
    // Di sini Anda bisa menambahkan proses pengiriman data ke API/Database jika sudah ada backend.
    
    // Alihkan pengguna ke halaman tiket (Sesuaikan '/event' atau '/tickets' dengan route aplikasi Anda)
    router.push('/event'); 
};

const handleScroll = () => {
    parallaxOffset.value = window.scrollY * 0.4;
    imageOffsets.value.c1 = window.scrollY * 0.3;
    imageOffsets.value.c2 = window.scrollY * 0.25;
    imageOffsets.value.c3 = window.scrollY * 0.35;
    imageOffsets.value.c4 = window.scrollY * 0.2;
    contentOffset.value = window.scrollY * -0.05;

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

    setTimeout(() => {
        isAnimate.value = true;
    }, 100);

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
                entry.target.classList.remove('show-down', 'show-up');
            }
        });
    }, {
        threshold: 0.05,
        rootMargin: "-40px 0px -40px 0px"
    });

    document.querySelectorAll('.scroll-animate').forEach(el => observer.value.observe(el));
});

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
    if (observer.value) observer.value.disconnect();
});
</script>

<template>
    <section class="w-full h-130 z-10 flex justify-center items-center relative overflow-hidden">
        <div class="absolute inset-0 bg-black/60">
            <img src="./../components/img/bg/hero-bg.jpg" alt="" draggable="false"
                class="w-full h-full object-cover brightness-[0.4] saturate-50 absolute top-0 left-0 opacity-100 bg-size-cover animate-hero-pop"
                :style="{ transform: `translateY(${parallaxOffset}px)` }">
        </div>

        <div class="w-full max-w-3/4 mx-auto z-20 text-white text-shadow-lg/30 shadow-black transition-all duration-1000 transform scale-95 opacity-0 ease-out"
             :class="{ 'scale-100 opacity-100': isAnimate }">
            <h1 class=" capitalize text-7xl font-bold mb-5">contact us</h1>
            <p class=" text-xl font-normal ">Have an idea or want to host an event?</p>
            <p class=" text-xl font-normal "> Get in touch with our team today and let's create something memorable together.</p>
        </div>
    </section>

    <div class="relative z-10 bg-[#2B3B4C] rounded-[3rem] -mt-10 mb-20 shadow-[0_0_80px_rgba(0,0,0,0.15)] overflow-hidden">
        
        <!-- Section 1: Info Kontak -->
        <section class="w-full h-auto bg-[#EE0034] rounded-t-[3rem] relative -top-5 page-animation" :class="{ 'show': isAnimate }">
            <div class=" w-full max-w-4/5 mx-auto py-20 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-20">
                <a href="tel:+628654877728123" class="w-full h-full flex flex-col items-start text-white group cursor-pointer transition-opacity duration-300 hover:opacity-90">
                    <i class="fa fa-phone text-[4rem] mb-5" aria-hidden="true"></i>
                    <h4 class=" text-2xl font-bold capitalize mb-1">contact us 24/7</h4>
                    <p class=" text-lg font-normal group-hover:underline">+628654877728123</p>
                </a>

                <a href="https://maps.google.com/?q=Universitas+Amikom+Yogyakarta" target="_blank" rel="noopener noreferrer" class="w-full h-full flex flex-col items-start text-white group cursor-pointer transition-opacity duration-300 hover:opacity-90">
                    <i class="fa fa-map text-[4rem] mb-5" aria-hidden="true"></i>
                    <h4 class=" text-2xl font-bold capitalize mb-1">our address</h4>
                    <p class=" text-lg font-normal group-hover:underline">830 Ringroad Street, Condongcatur, Sleman, Daerah Istimewa Yogyakarta</p>
                </a>

                <a href="mailto:vantage@gmail.com" class="w-full h-full flex flex-col items-start text-white group cursor-pointer transition-opacity duration-300 hover:opacity-90">
                    <i class="fa fa-envelope text-[4rem] mb-5" aria-hidden="true"></i>
                    <h4 class=" text-2xl font-bold capitalize mb-1">mail us</h4>
                    <p class=" text-lg font-normal group-hover:underline">vantage@gmail.com</p>
                </a>

                <div class=" w-full h-full flex flex-col items-start text-white">
                    <i class="fa fa-calendar text-[4rem] mb-5" aria-hidden="true"></i>
                    <h4 class=" text-2xl font-bold capitalize mb-1">working time</h4>
                    <p class=" text-lg font-normal">Monday - Friday 06.00 AM - 09.00 PM Saturday to Sunday Closed</p>
                </div>
            </div>
        </section>

        <!-- Section 2: Form Pertanyaan & Registrasi -->
        <section class="w-full h-auto scroll-animate">
            <div class=" w-full max-w-4/5 mx-auto py-20 flex flex-col items-center">
                <div class=" w-full text-center">
                    <h2 class=" text-5xl font-bold mb-30 text-white">Have Be Any Question? <br> Feel free to contact with us.</h2>

                    <div class=" w-full h-auto flex flex-col xl:flex-row">
                        <div class=" w-full xl:w-4/10 h-120 rounded-4xl overflow-hidden mb-10 xl:mb-0">
                            <img src="./../components/img/contactPage/cs.jpeg" alt="" class=" w-full h-full object-cover object-top">
                        </div>

                        <div class=" w-full ml-0 xl:ml-10 p-10 md:p-15 bg-[#EE0034] rounded-4xl flex flex-col">
                            <p class=" text-2xl font-bold text-white text-left mb-4">To find out the price and go to the selection tickets, fill out the forms fields</p>

                            <!-- 5. Mengubah wrapper grid menjadi tag <form> dengan trigger submit -->
                            <form @submit.prevent="handleRegister" class=" w-full h-full grid grid-cols-1 xl:grid-cols-2 gap-8">
                                <input v-model="form.name" type="text" placeholder="Name" required class=" w-full h-full border border-black bg-[#FFFFFF] outline-none min-h-15 rounded-full px-5 text-black">
                                <input v-model="form.email" type="email" placeholder="Email" required class=" w-full h-full border border-black bg-[#FFFFFF] outline-none min-h-15 rounded-full px-5 text-black">
                                <input v-model="form.phone" type="number" placeholder="Phone" required class=" w-full h-full border border-black bg-[#FFFFFF] outline-none min-h-15 rounded-full px-5 text-black">
                                <input v-model="form.subject" type="text" placeholder="Subject" required class=" w-full h-full border border-black bg-[#FFFFFF] outline-none min-h-15 rounded-full px-5 text-black">
                                <textarea v-model="form.message" required class=" w-full h-full border border-black bg-[#FFFFFF] outline-none min-h-15 rounded-4xl p-5 text-black" placeholder="Message"></textarea>

                                <div class=" relative">
                                    <!-- 6. Mengubah type button menjadi "submit" -->
                                    <button type="submit" class="w-full xl:w-auto px-7 py-4 m-auto bg-[#2B3B4C] rounded-full transition-all hover:translate-x-2 cursor-pointer xl:absolute top-0 left-0 capitalize text-white font-bold">
                                        register now
                                        <i class="fa fa-long-arrow-right font-extralight -rotate-45" aria-hidden="true"></i>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Section 3: Google Maps -->
        <section class="w-full h-auto scroll-animate">
            <div class=" w-full max-w-4/5 mx-auto py-20 px-0 xl:px-20">
                <div class=" w-full h-100 rounded-4xl overflow-hidden shadow-lg/25 shadow-black">
                    <iframe class=" w-full h-full object-cover"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3953.280430130844!2d110.4065606759763!3d-7.76005487696027!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a599bd3bdc4ef%3A0x6f1714b0c4544586!2sUniversity%20of%20Amikom%20Yogyakarta!5e0!3m2!1sen!2sid!4v1777812436113!5m2!1sen!2sid"
                        width="600" height="450" style="border:0;" allowfullscreen="true" loading="lazy"
                        referrerpolicy="no-referrer-when-downgrade"></iframe>
                </div>
            </div>
        </section>

        <!-- Section 4: Sponsors Area -->
        <section class="w-full h-auto border border-white/30 bg-linear-to-br from-[#24364d] to-[#1d2d42] shadow-[0_10px_40px_rgba(0,0,0,0.35)] overflow-hidden rounded-[3rem] ring-1 ring-white/30 scroll-animate">
            <div class=" w-full max-w-4/5 mx-auto py-20 mb-20 flex flex-col ">
                <div class=" w-full flex justify-between items-center mb-10">
                    <div class=" w-full border border-white"></div>
                    <p class=" w-150 text-2xl font-bold text-white text-center capitalize">our sponsors</p>
                    <div class=" w-full border border-white"></div>
                </div>

                <div class=" w-full grid grid-cols-8 gap-2 sm:gap-4 xl:gap-12">
                    <div class=" w-full h-full overflow-hidden col-span-2 flex justify-center"><img src="./../components/img/contactPage/sponsorsLogo/logo1.png" alt="" draggable="false"></div>
                    <div class=" w-full h-full overflow-hidden col-span-2 flex justify-center"><img src="./../components/img/contactPage/sponsorsLogo/logo2.png" alt="" draggable="false"></div>
                    <div class=" w-full h-full overflow-hidden col-span-2 flex justify-center"><img src="./../components/img/contactPage/sponsorsLogo/logo3.png" alt="" draggable="false"></div>
                    <div class=" w-full h-full overflow-hidden col-span-2 flex justify-center"><img src="./../components/img/contactPage/sponsorsLogo/logo4.png" alt="" draggable="false"></div>
                    <div class=" w-full h-full overflow-hidden col-span-2 col-start-2 flex justify-center"><img src="./../components/img/contactPage/sponsorsLogo/logo5.png" alt="" draggable="false"></div>
                    <div class=" w-full h-full overflow-hidden col-span-2 flex justify-center"><img src="./../components/img/contactPage/sponsorsLogo/logo6.png" alt="" draggable="false"></div>
                    <div class=" w-full h-full overflow-hidden col-span-2 flex justify-center"><img src="./../components/img/contactPage/sponsorsLogo/logo7.png" alt="" draggable="false"></div>
                    <div class=" w-full h-full overflow-hidden col-span-2 col-start-3 flex justify-center"><img src="./../components/img/contactPage/sponsorsLogo/logo8.png" alt="" draggable="false"></div>
                    <div class=" w-full h-full overflow-hidden col-span-2 flex justify-center"><img src="./../components/img/contactPage/sponsorsLogo/logo9.png" alt="" draggable="false"></div>
                </div>
            </div>
        </section>
    </div>
</template>

<style scoped>
/* CSS Animasi tetap sama */
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

.scroll-animate {
  opacity: 0;
  transform: translateY(50px) scale(0.98);
  will-change: transform, opacity;
  transition: opacity 0.8s ease, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}

.scroll-animate.show-down {
  opacity: 1;
  transform: translateY(0) scale(1);
}

.scroll-animate.show-up {
  opacity: 1;
  transform: translateY(0) scale(1);
}

.scroll-animate:not(.show-down):not(.show-up) {
  opacity: 0;
  transform: translateY(50px) scale(0.98);
}
</style>