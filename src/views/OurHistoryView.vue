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
    <!-- OUR STORY BG -->
    <section class="w-full h-130 z-10 flex justify-center items-center relative overflow-hidden">

        <div class="absolute inset-0 bg-black/60">
            <img src="./../components/img/bg/hero-bg.jpg" alt="" draggable="false"
                class="w-full h-full object-cover brightness-[0.4] saturate-50 absolute top-0 left-0 opacity-100 bg-size-cover"
                :style="{ transform: `translateY(${parallaxOffset}px)` }">
        </div>

        <div class="w-full max-w-3/4 mx-auto z-20 text-white text-shadow-lg/30 shadow-black">
            <h1 class=" capitalize text-7xl font-bold mb-5">our story</h1>
            <p class=" text-lg font-normal uppercase">vantage > about us</p>
        </div>

    </section>

    <div class="relative z-10 bg-[#2B3B4C] py-5 rounded-[3rem] -mt-10 mb-162.5 shadow-[0_0_80px_rgba(0,0,0,0.15)]">
        <section class=" w-full h-auto">
            <div class=" w-full max-w-4/5 mx-auto py-20">

                <div class=" w-full h-100 grid grid-cols-2 gap-8 mb-25">

                    <div
                        class=" w-4/5 h-5/6 relative text-right justify-self-end rounded-[5rem] border border-white/10 bg-gradient-to-br rom-[#24364d] to-[#1d2d42]
         shadow-[0_10px_40px_rgba(0,0,0,0.35)]
         overflow-hidden p-10 inset-0 rounded-[40px]
           ring-1 ring-white/40 text-white">
                        <h2 class=" text-4xl capitalize text-white font-medium mb-8">marketing matters!</h2>
                        <p class=" font-normal text-lg text-white">How you transform your business as technology, consumer,
                            habits industry dynamics change? Find out from those leading the charge.</p>
                        <p class=" w-10 h-20 text-4xl font-bold overflow-hidden absolute bottom-10 right-10">20
                            10</p>
                    </div>

                    <div class=" w-full h-full rounded-4xl overflow-hidden">
                        <img src="./../components/img/ourHistoryPage/h1.jpeg" alt="" draggable="false"
                            class=" w-full h-full object-cover object-[0_-12rem]">
                    </div>

                </div>

                <div class=" w-full h-100 grid grid-cols-2 gap-8 mb-25">

                    <div class=" w-full h-full rounded-4xl overflow-hidden">
                        <img src="./../components/img/ourHistoryPage/h2.jpeg" alt="" draggable="false"
                            class=" w-full h-full object-cover object-center">
                    </div>

                    <div
                        class=" w-4/5 h-5/6 relative text-left justify-self-start rounded-[5rem] border border-white/10 bg-gradient-to-br rom-[#24364d] to-[#1d2d42]
         shadow-[0_10px_40px_rgba(0,0,0,0.35)]
         overflow-hidden p-10 inset-0 rounded-[40px]
           ring-1 ring-white/40 text-white">
                        <h2 class=" text-4xl capitalize text-white font-medium mb-8">reinventing experiences</h2>
                        <p class=" font-normal text-lg text-white">How you transform your business as technology, consumer,
                            habits industry dynamics change? Find out from those leading the charge.</p>
                        <p class=" w-10 h-20 text-4xl font-bold overflow-hidden absolute bottom-10 left-10">20
                            12</p>
                    </div>

                </div>

                <div class=" w-full h-100 grid grid-cols-2 gap-8 mb-25">

                    <div
                        class="w-4/5 h-5/6 relative text-right justify-self-end rounded-[5rem] border border-white/10 bg-gradient-to-br rom-[#24364d] to-[#1d2d42]
         shadow-[0_10px_40px_rgba(0,0,0,0.35)]
         overflow-hidden p-10 inset-0 rounded-[40px]
           ring-1 ring-white/40 text-white">
                        <h2 class=" text-4xl capitalize text-white font-medium mb-8">cultures of creativity</h2>
                        <p class=" font-normal text-lg text-white">How you transform your business as technology, consumer,
                            habits industry dynamics change? Find out from those leading the charge.</p>
                        <p class=" w-10 h-20 text-4xl font-bold overflow-hidden absolute bottom-10 right-10">20
                            14</p>
                    </div>

                    <div class=" w-full h-full rounded-4xl overflow-hidden">
                        <img src="./../components/img/ourHistoryPage/h3.jpeg" alt="" draggable="false"
                            class=" w-full h-full object-cover object-center">
                    </div>

                </div>

                <div class=" w-full h-100 grid grid-cols-2 gap-8">

                    <div class=" w-full h-full rounded-4xl overflow-hidden">
                        <img src="./../components/img/ourHistoryPage/h4.jpeg" alt="" draggable="false"
                            class=" w-full h-full object-cover object-center">
                    </div>

                    <div
                        class=" w-4/5 h-5/6 relative text-left justify-self-start rounded-[5rem] border border-white/10 bg-gradient-to-br rom-[#24364d] to-[#1d2d42]
         shadow-[0_10px_40px_rgba(0,0,0,0.35)]
         overflow-hidden p-10 inset-0 rounded-[40px]
           ring-1 ring-white/40 text-white">
                        <h2 class=" text-4xl capitalize text-white font-medium mb-8">Human Centered Design</h2>
                        <p class=" font-normal text-lg text-white">How you transform your business as technology, consumer,
                            habits industry dynamics change? Find out from those leading the charge.</p>
                        <p class=" w-10 h-20 text-4xl font-bold overflow-hidden absolute bottom-10 left-10">20
                            16</p>
                    </div>

                </div>

            </div>
        </section>
    </div>
</template>
