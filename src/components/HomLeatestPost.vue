<script setup>
import { ref } from 'vue'

// State untuk mengontrol apakah sisa card ditampilkan atau tidak
const showAll = ref(false)
</script>

<template>
    <div class="w-full max-w-4/5 mx-auto my-20 rounded-4xl border border-white/10 bg-linear-to-br from-[#24364d] to-[#1d2d42]
         shadow-[0_10px_40px_rgba(0,0,0,0.35)]
         p-10 inset-0 ring-1 ring-white/40 text-white">

        <div class=" w-full flex justify-between items-center mb-10">
            <h2 class=" text-4xl font-bold capitalize text-white">our latest post</h2>
            
            <!-- Tombol Toggle -->
            <button 
                @click="showAll = !showAll" 
                class=" px-14 py-3 bg-[#EE0034] text-white rounded-full transition-all hover:scale-105 cursor-pointer"
            >
                {{ showAll ? 'Show Less' : 'View All' }}
            </button>
        </div>

        <!-- Layout Grid Utama (Responsif: 1 kolom di mobile, 2 kolom di tablet/medium, 4 kolom di xl) -->
        <div class="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
            
            <!-- CARD 1 (Selalu Muncul) -->
            <div class=" h-80 flex flex-col items-start rounded-2xl shadow-md transition-all hover:scale-101 hover:-translate-y-1 bg-[#1d2d42]/50 overflow-hidden border border-white/5">
                <img class=" w-full h-3/5 object-cover object-center" src="./img/bg/ulp.jpeg" alt="content" draggable="false">
                <div class=" w-full h-auto p-5">
                    <div class=" w-full flex mb-2">
                        <div class=" w-fit bg-white px-3 mr-3 rounded-full">
                            <p class=" text-sm font-normal text-black capitalize">concert</p>
                        </div>
                        <p class=" text-sm font-normal text-white">2026-06-06</p>
                    </div>
                    <p class=" text-xl font-semibold text-white mb-1">Land festival</p>
                    <div class=" w-full flex items-center text-white">
                        <i class="fa fa-thumb-tack text-sm mr-2" aria-hidden="true"></i>
                        <p class=" text-sm font-normal">lap. kenari yogyakarta</p>
                    </div>
                </div>
            </div>

            <!-- CARD 2 (Selalu Muncul) -->
            <div class=" h-80 flex flex-col items-start rounded-2xl shadow-md transition-all hover:scale-101 hover:-translate-y-1 bg-[#1d2d42]/50 overflow-hidden border border-white/5">
                <img class=" w-full h-3/5 object-cover object-center" src="./img/bg/ulp.jpeg" alt="content" draggable="false">
                <div class=" w-full h-auto p-5">
                    <div class=" w-full flex mb-2">
                        <div class=" w-fit bg-white px-3 mr-3 rounded-full">
                            <p class=" text-sm font-normal text-black capitalize">concert</p>
                        </div>
                        <p class=" text-sm font-normal text-white">2026-06-06</p>
                    </div>
                    <p class=" text-xl font-semibold text-white mb-1">Land festival</p>
                    <div class=" w-full flex items-center text-white">
                        <i class="fa fa-thumb-tack text-sm mr-2" aria-hidden="true"></i>
                        <p class=" text-sm font-normal">lap. kenari yogyakarta</p>
                    </div>
                </div>
            </div>

            <!-- CARD 3 (Sekarang Selalu Muncul di Awal) -->
            <div class=" h-80 flex flex-col items-start rounded-2xl shadow-md transition-all hover:scale-101 hover:-translate-y-1 bg-[#1d2d42]/50 overflow-hidden border border-white/5">
                <img class=" w-full h-3/5 object-cover object-center" src="./img/bg/ulp.jpeg" alt="content" draggable="false">
                <div class=" w-full h-auto p-5">
                    <div class=" w-full flex mb-2">
                        <div class=" w-fit bg-white px-3 mr-3 rounded-full">
                            <p class=" text-sm font-normal text-black capitalize">concert</p>
                        </div>
                        <p class=" text-sm font-normal text-white">2026-06-06</p>
                    </div>
                    <p class=" text-xl font-semibold text-white mb-1">Land festival</p>
                    <div class=" w-full flex items-center text-white">
                        <i class="fa fa-thumb-tack text-sm mr-2" aria-hidden="true"></i>
                        <p class=" text-sm font-normal">lap. kenari yogyakarta</p>
                    </div>
                </div>
            </div>

            <!-- CARD 4 (Sekarang Selalu Muncul di Awal) -->
            <div class=" h-80 flex flex-col items-start rounded-2xl shadow-md transition-all hover:scale-101 hover:-translate-y-1 bg-[#1d2d42]/50 overflow-hidden border border-white/5">
                <img class=" w-full h-3/5 object-cover object-center" src="./img/bg/ulp.jpeg" alt="content" draggable="false">
                <div class=" w-full h-auto p-5">
                    <div class=" w-full flex mb-2">
                        <div class=" w-fit bg-white px-3 mr-3 rounded-full">
                            <p class=" text-sm font-normal text-black capitalize">concert</p>
                        </div>
                        <p class=" text-sm font-normal text-white">2026-06-06</p>
                    </div>
                    <p class=" text-xl font-semibold text-white mb-1">Land festival</p>
                    <div class=" w-full flex items-center text-white">
                        <i class="fa fa-thumb-tack text-sm mr-2" aria-hidden="true"></i>
                        <p class=" text-sm font-normal">lap. kenari yogyakarta</p>
                    </div>
                </div>
            </div>

            <!-- CARD 5 s/d 8 dibungkus v-if, baru muncul saat tombol View All diklik -->
            <template v-if="showAll">
                <!-- CARD 5 -->
                <div class=" h-80 flex flex-col items-start rounded-2xl shadow-md transition-all hover:scale-101 hover:-translate-y-1 bg-[#1d2d42]/50 overflow-hidden border border-white/5">
                    <img class=" w-full h-3/5 object-cover object-center" src="./img/bg/ulp.jpeg" alt="content" draggable="false">
                    <div class=" w-full h-auto p-5">
                        <div class=" w-full flex mb-2">
                            <div class=" w-fit bg-white px-3 mr-3 rounded-full">
                                <p class=" text-sm font-normal text-black capitalize">concert</p>
                            </div>
                            <p class=" text-sm font-normal text-white">2026-06-06</p>
                        </div>
                        <p class=" text-xl font-semibold text-white mb-1">Land festival</p>
                        <div class=" w-full flex items-center text-white">
                            <i class="fa fa-thumb-tack text-sm mr-2" aria-hidden="true"></i>
                            <p class=" text-sm font-normal">lap. kenari yogyakarta</p>
                        </div>
                    </div>
                </div>

                <!-- CARD 6 -->
                <div class=" h-80 flex flex-col items-start rounded-2xl shadow-md transition-all hover:scale-101 hover:-translate-y-1 bg-[#1d2d42]/50 overflow-hidden border border-white/5">
                    <img class=" w-full h-3/5 object-cover object-center" src="./img/bg/ulp.jpeg" alt="content" draggable="false">
                    <div class=" w-full h-auto p-5">
                        <div class=" w-full flex mb-2">
                            <div class=" w-fit bg-white px-3 mr-3 rounded-full">
                                <p class=" text-sm font-normal text-black capitalize">concert</p>
                            </div>
                            <p class=" text-sm font-normal text-white">2026-06-06</p>
                        </div>
                        <p class=" text-xl font-semibold text-white mb-1">Land festival</p>
                        <div class=" w-full flex items-center text-white">
                            <i class="fa fa-thumb-tack text-sm mr-2" aria-hidden="true"></i>
                            <p class=" text-sm font-normal">lap. kenari yogyakarta</p>
                        </div>
                    </div>
                </div>

                <!-- CARD 7 -->
                <div class=" h-80 flex flex-col items-start rounded-2xl shadow-md transition-all hover:scale-101 hover:-translate-y-1 bg-[#1d2d42]/50 overflow-hidden border border-white/5">
                    <img class=" w-full h-3/5 object-cover object-center" src="./img/bg/ulp.jpeg" alt="content" draggable="false">
                    <div class=" w-full h-auto p-5">
                        <div class=" w-full flex mb-2">
                            <div class=" w-fit bg-white px-3 mr-3 rounded-full">
                                <p class=" text-sm font-normal text-black capitalize">concert</p>
                            </div>
                            <p class=" text-sm font-normal text-white">2026-06-06</p>
                        </div>
                        <p class=" text-xl font-semibold text-white mb-1">Land festival</p>
                        <div class=" w-full flex items-center text-white">
                            <i class="fa fa-thumb-tack text-sm mr-2" aria-hidden="true"></i>
                            <p class=" text-sm font-normal">lap. kenari yogyakarta</p>
                        </div>
                    </div>
                </div>

                <!-- CARD 8 -->
                <div class=" h-80 flex flex-col items-start rounded-2xl shadow-md transition-all hover:scale-101 hover:-translate-y-1 bg-[#1d2d42]/50 overflow-hidden border border-white/5">
                    <img class=" w-full h-3/5 object-cover object-center" src="./img/bg/ulp.jpeg" alt="content" draggable="false">
                    <div class=" w-full h-auto p-5">
                        <div class=" w-full flex mb-2">
                            <div class=" w-fit bg-white px-3 mr-3 rounded-full">
                                <p class=" text-sm font-normal text-black capitalize">concert</p>
                            </div>
                            <p class=" text-sm font-normal text-white">2026-06-06</p>
                        </div>
                        <p class=" text-xl font-semibold text-white mb-1">Land festival</p>
                        <div class=" w-full flex items-center text-white">
                            <i class="fa fa-thumb-tack text-sm mr-2" aria-hidden="true"></i>
                            <p class=" text-sm font-normal">lap. kenari yogyakarta</p>
                        </div>
                    </div>
                </div>
            </template>

        </div>
    </div>
</template>