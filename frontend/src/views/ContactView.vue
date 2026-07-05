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

const handleScroll = () => {
    parallaxOffset.value = window.scrollY * 0.4;

    imageOffsets.value.c1 = window.scrollY * 0.3;
    imageOffsets.value.c2 = window.scrollY * 0.25;
    imageOffsets.value.c3 = window.scrollY * 0.35;
    imageOffsets.value.c4 = window.scrollY * 0.2;
    contentOffset.value = window.scrollY * -0.05;
};

// --- ANIMASI SCROLL DUA ARAH (UP & DOWN) ---
const observer = ref(null);

onMounted(() => {
    window.addEventListener('scroll', handleScroll);

    observer.value = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show-animated');
            } else {
                entry.target.classList.remove('show-animated');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: "-20px 0px -20px 0px"
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
                class="w-full h-full object-cover brightness-[0.4] saturate-50 absolute top-0 left-0 opacity-100 bg-size-cover"
                :style="{ transform: `translateY(${parallaxOffset}px)` }">
        </div>

        <div class="w-full max-w-3/4 mx-auto z-20 text-white text-shadow-lg/30 shadow-black">
            <h1 class=" capitalize text-7xl font-bold mb-5">contact us</h1>
            <p class=" text-xl font-normal ">Have an idea or want to host an event?</p>
            <p class=" text-xl font-normal "> Get in touch with our team today and let's create something memorable together.</p>
        </div>

    </section>

    <div class="relative z-10 bg-[#2B3B4C] rounded-[3rem] -mt-10 mb-20 shadow-[0_0_80px_rgba(0,0,0,0.15)]">

        <section class="w-full h-auto bg-[#EE0034] rounded-t-[3rem] relative -top-5 scroll-animate fade-up">
            <div class=" w-full max-w-4/5 mx-auto py-20 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-20">

                <div class=" w-full h-full flex flex-col items-start text-white">
                    <i class="fa fa-phone text-[4rem] mb-5" aria-hidden="true"></i>
                    <h4 class=" text-2xl font-bold capitalize mb-1">contact us 24/7</h4>
                    <p class=" text-lg font-normal">+628654877728123</p>
                </div>

                <div class=" w-full h-full flex flex-col items-start text-white">
                    <i class="fa fa-map text-[4rem] mb-5" aria-hidden="true"></i>
                    <h4 class=" text-2xl font-bold capitalize mb-1">our address</h4>
                    <p class=" text-lg font-normal">830 Ringroad Street, Condongcatur, Sleman, Daerah Istimewa Yogyakarta</p>
                </div>

                <div class=" w-full h-full flex flex-col items-start text-white">
                    <i class="fa fa-envelope text-[4rem] mb-5" aria-hidden="true"></i>
                    <h4 class=" text-2xl font-bold capitalize mb-1">mail us</h4>
                    <p class=" text-lg font-normal">vantage@gmail.com</p>
                </div>

                <div class=" w-full h-full flex flex-col items-start text-white">
                    <i class="fa fa-calendar text-[4rem] mb-5" aria-hidden="true"></i>
                    <h4 class=" text-2xl font-bold capitalize mb-1">working time</h4>
                    <p class=" text-lg font-normal">Monday - Friday 06.00 AM - 09.00 PM Saturday to Sunday Closed</p>
                </div>

            </div>
        </section>

        <section class="w-full h-auto scroll-animate fade-up">
            <div class=" w-full max-w-4/5 mx-auto py-20 flex flex-col items-center">

                <div class=" w-full text-center">
                    <h2 class=" text-5xl font-bold mb-30 text-white">Have Be Any Question? <br> Feel free to contact with us.</h2>

                    <div class=" w-full h-auto flex flex-col xl:flex-row">

                        <div class=" w-full xl:w-4/10 h-120 rounded-4xl overflow-hidden mb-10 xl:mb-0">
                            <img src="./../components/img/contactPage/cs.jpeg" alt=""
                                class=" w-full h-full object-cover object-top">
                        </div>

                        <div class=" w-full ml-0 xl:ml-10 p-10 md:p-15 bg-[#EE0034] rounded-4xl flex flex-col">
                            <p class=" text-2xl font-bold text-white text-left mb-4">To find out the price and go to the selection tickets, fill out the forms fields</p>

                            <div class=" w-full h-full grid grid-cols-1 xl:grid-cols-2 gap-8">

                                <input type="text" placeholder="Name" class=" w-full h-full border border-black bg-[#FFFFFF] outline-none min-h-15 rounded-full px-5">
                                <input type="email" placeholder="Email" class=" w-full h-full border border-black bg-[#FFFFFF] outline-none min-h-15 rounded-full px-5">
                                <input type="number" placeholder="Phone" class=" w-full h-full border border-black bg-[#FFFFFF] outline-none min-h-15 rounded-full px-5">
                                <input type="text" placeholder="Subject" class=" w-full h-full border border-black bg-[#FFFFFF] outline-none min-h-15 rounded-full px-5">

                                <textarea class=" w-full h-full border border-black bg-[#FFFFFF] outline-none min-h-15 rounded-4xl p-5" placeholder="Message"></textarea>

                                <div class=" relative">
                                    <button class="w-full xl:w-auto px-7 py-4 m-auto bg-[#2B3B4C] rounded-full transition-all hover:translate-x-2 cursor-pointer xl:absolute top-0 left-0 capitalize text-white font-bold">
                                        register now
                                        <i class="fa fa-long-arrow-right font-extralight -rotate-45" aria-hidden="true"></i>
                                    </button>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </section>

        <section class="w-full h-auto scroll-animate fade-up">
            <div class=" w-full max-w-4/5 mx-auto py-20 px-0 xl:px-20">

                <div class=" w-full h-100 rounded-4xl overflow-hidden shadow-lg/25 shadow-black">
                    <iframe class=" w-full h-full object-cover"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3953.280430130844!2d110.4065606759763!3d-7.76005487696027!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a599bd3bdc4ef%3A0x6f1714b0c4544586!2sUniversity%20of%20Amikom%20Yogyakarta!5e0!3m2!1sen!2sid!4v1777812436113!5m2!1sen!2sid"
                        width="600" height="450" style="border:0;" allowfullscreen="true" loading="lazy"
                        referrerpolicy="no-referrer-when-downgrade"></iframe>
                </div>

            </div>
        </section>

        <section class="w-full h-auto border border-white/30 bg-linear-to-br from-[#24364d] to-[#1d2d42] shadow-[0_10px_40px_rgba(0,0,0,0.35)] overflow-hidden rounded-[3rem] ring-1 ring-white/30 scroll-animate fade-up">
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
.scroll-animate {
    opacity: 0;
    transition: transform 0.9s cubic-bezier(0.215, 0.61, 0.355, 1), opacity 0.8s ease;
    will-change: transform, opacity;
}

.fade-up {
    transform: translateY(50px) scale(0.98);
}

.scroll-animate.show-animated {
    opacity: 1;
    transform: translateY(0) scale(1);
}
</style>
