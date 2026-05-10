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
    <!-- ABOUT BG -->
    <section class="w-full h-130 z-10 flex justify-center items-center relative overflow-hidden">

        <div class="absolute inset-0 bg-black/60">
            <img src="./../components/img/bg/hero-bg.jpg" alt="" draggable="false"
                class="w-full h-full object-cover brightness-[0.4] saturate-50 absolute top-0 left-0 opacity-100 bg-size-cover"
                :style="{ transform: `translateY(${parallaxOffset}px)` }">
        </div>

        <div class="w-full max-w-3/4 mx-auto z-20 text-white text-shadow-lg/30 shadow-black">
            <h1 class=" capitalize text-7xl font-bold mb-5">contact us</h1>
            <p class=" text-lg font-normal uppercase">vantage > contact us</p>
        </div>

    </section>

    <!-- CONTACT INFO -->
    <div class="relative z-10 bg-[#FFF9EB] py-5 rounded-[3rem] -mt-10 mb-162.5 shadow-[0_0_80px_rgba(0,0,0,0.15)]">
        <section class=" w-full h-auto bg-[#E7C899]">
            <div class=" w-full max-w-4/5 mx-auto py-20 grid grid-cols-4 gap-6">

                <div class=" w-full h-full flex flex-col items-start">
                    <i class="fa fa-phone text-[4rem] mb-5" aria-hidden="true"></i>
                    <h4 class=" text-2xl font-bold capitalize mb-1">contact us 24/7</h4>
                    <p class=" text-lg font-normal">vantage@gmail.com <br> +6288828123</p>
                </div>

                <div class=" w-full h-full flex flex-col items-start">
                    <i class="fa fa-map text-[4rem] mb-5" aria-hidden="true"></i>
                    <h4 class=" text-2xl font-bold capitalize mb-1">our address</h4>
                    <p class=" text-lg font-normal">830 Ringroad Street, Condongcatur,
                        Sleman, Daerah Istimewa Yogyakarta</p>
                </div>

                <div class=" w-full h-full flex flex-col items-start">
                    <i class="fa fa-envelope text-[4rem] mb-5" aria-hidden="true"></i>
                    <h4 class=" text-2xl font-bold capitalize mb-1">mail us</h4>
                    <p class=" text-lg font-normal">vantage@gmail.com</p>
                </div>

                <div class=" w-full h-full flex flex-col items-start">
                    <i class="fa fa-calendar text-[4rem] mb-5" aria-hidden="true"></i>
                    <h4 class=" text-2xl font-bold capitalize mb-1">working time</h4>
                    <p class=" text-lg font-normal">Monday - Friday 06.00 AM - 09.00 PM
                        Saturday to Sunday Closed</p>
                </div>


            </div>
        </section>

        <!-- CONTACT US!! -->
        <section class=" w-full h-auto">
            <div class=" w-full max-w-4/5 mx-auto py-20 flex flex-col items-center">

                <div class=" w-full text-center">
                    <h2 class=" text-4xl font-bold mb-30">Have Be Any Question? <br> Feel free to contact with us.</h2>

                    <div class=" w-full h-auto flex">

                        <div class=" w-4/10 h-120 rounded-4xl overflow-hidden">
                            <img src="./../components/img/contactPage/cs.jpeg" alt=""
                                class=" w-full h-full object-cover object-top">
                        </div>

                        <div class=" w-full ml-10 p-15 bg-[#E7C899] rounded-4xl flex flex-col">
                            <p class=" text-lg font-normal text-black text-left mb-4">To find out the price and go to
                                the
                                selection tickets, fill out the forms fields</p>

                            <div class=" w-full h-full grid grid-cols-2 gap-8">

                                <input type="text" placeholder="Name"
                                    class=" w-full h-full border border-black bg-[#FFF9EB] outline-none rounded-full px-5">
                                <input type="email" placeholder="Email"
                                    class=" w-full h-full border border-black bg-[#FFF9EB] outline-none rounded-full px-5">
                                <input type="number" placeholder="Phone"
                                    class=" w-full h-full border border-black bg-[#FFF9EB] outline-none rounded-full px-5">
                                <input type="text" placeholder="Subject"
                                    class=" w-full h-full border border-black bg-[#FFF9EB] outline-none rounded-full px-5">

                                <textarea name="" id=""
                                    class=" w-full h-full border border-black bg-[#FFF9EB] outline-none rounded-4xl p-5"
                                    placeholder="Message"></textarea>

                                <div class=" relative">
                                    <button
                                        class="px-7 py-4 m-auto bg-[#788663] rounded-full border border-black transition-all hover:translate-x-2 cursor-pointer absolute top-0 left-0 capitalize">
                                        register now
                                        <i class="fa fa-long-arrow-right font-extralight -rotate-45"
                                            aria-hidden="true"></i>
                                    </button>
                                </div>

                            </div>
                        </div>


                    </div>
                </div>

            </div>
        </section>

        <!-- MAPS -->
        <section class=" w-full h-auto">
            <div class=" w-full max-w-4/5 mx-auto py-20 px-20">

                <div class=" w-full h-100 rounded-4xl overflow-hidden shadow-lg/25 shadow-black">
                    <iframe class=" w-full h-full object-cover"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3953.280430130844!2d110.4065606759763!3d-7.76005487696027!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a599bd3bdc4ef%3A0x6f1714b0c4544586!2sUniversity%20of%20Amikom%20Yogyakarta!5e0!3m2!1sen!2sid!4v1777812436113!5m2!1sen!2sid"
                        width="600" height="450" style="border:0;" allowfullscreen="true" loading="lazy"
                        referrerpolicy="no-referrer-when-downgrade"></iframe>
                </div>

            </div>
        </section>

        <!-- SPONSOR -->
        <section class=" w-full h-auto">
            <div class=" w-full max-w-4/5 mx-auto py-20 mb-20 flex flex-col">

                <div class=" w-full flex justify-between items-center mb-10">
                    <div class=" w-full border border-black"></div>
                    <p class=" w-100 text-lg font-normal text-black text-center capitalize">our sponsors</p>
                    <div class=" w-full border border-black"></div>
                </div>

                <div class=" w-full grid grid-cols-8 gap-12">

                    <div class=" w-full h-full overflow-hidden col-span-2 flex justify-center">
                        <img src="./../components/img/contactPage/sponsorsLogo/logo1.png" alt="" draggable="false">
                    </div>

                    <div class=" w-full h-full overflow-hidden col-span-2 flex justify-center">
                        <img src="./../components/img/contactPage/sponsorsLogo/logo2.png" alt="" draggable="false">
                    </div>

                    <div class=" w-full h-full overflow-hidden col-span-2 flex justify-center">
                        <img src="./../components/img/contactPage/sponsorsLogo/logo3.png" alt="" draggable="false">
                    </div>

                    <div class=" w-full h-full overflow-hidden col-span-2 flex justify-center">
                        <img src="./../components/img/contactPage/sponsorsLogo/logo4.png" alt="" draggable="false">
                    </div>

                    <div class=" w-full h-full overflow-hidden col-span-2 col-start-2 flex justify-center">
                        <img src="./../components/img/contactPage/sponsorsLogo/logo5.png" alt="" draggable="false">
                    </div>

                    <div class=" w-full h-full overflow-hidden col-span-2 flex justify-center">
                        <img src="./../components/img/contactPage/sponsorsLogo/logo6.png" alt="" draggable="false">
                    </div>

                    <div class=" w-full h-full overflow-hidden col-span-2 flex justify-center">
                        <img src="./../components/img/contactPage/sponsorsLogo/logo7.png" alt="" draggable="false">
                    </div>

                    <div class=" w-full h-full overflow-hidden col-span-2 col-start-3 flex justify-center">
                        <img src="./../components/img/contactPage/sponsorsLogo/logo8.png" alt="" draggable="false">
                    </div>

                    <div class=" w-full h-full overflow-hidden col-span-2 flex justify-center">
                        <img src="./../components/img/contactPage/sponsorsLogo/logo9.png" alt="" draggable="false">
                    </div>


                </div>

            </div>
        </section>
    </div>
</template>
