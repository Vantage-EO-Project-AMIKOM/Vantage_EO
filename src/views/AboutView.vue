<script setup>
import CountPerson from '@/components/CountPerson.vue';
</script>

<template>
    <!-- ABOUT BG -->
    <section class="w-full h-130 z-10 flex justify-center items-center relative overflow-hidden">

        <img src="./../components/img/bg/hero-bg.jpg" alt="" draggable="false"
            class="w-full h-full object-cover brightness-[0.4] saturate-50 absolute top-0 left-0 opacity-100 bg-size-cover">

        <div class="w-full max-w-3/4 mx-auto z-20 text-white text-shadow-lg/30 shadow-black">
            <h1 class=" capitalize text-7xl font-bold mb-5">about us</h1>
            <p class=" text-lg font-normal uppercase">vantage > about us</p>
        </div>

    </section>

    <!-- CONTENT I -->
    <div class="relative z-10 bg-[#FFF9EB] py-5 rounded-[3rem] -mt-10 mb-[650px] shadow-[0_0_80px_rgba(0,0,0,0.15)]">
    <section class=" w-full h-auto ">

        <div class=" w-full max-w-4/5 mx-auto my-20 grid grid-cols-2 gap-4">

            <div class=" grid grid-cols-2 gap-6 pr-20">

                <div class=" w-full h-150 rounded-2xl overflow-hidden">
                    <img src="./../components/img/aboutBG/cb1.jpeg" alt="" draggable="false"
                        class=" w-full h-full object-cover object-[-23rem]">
                </div>

                <div class=" w-full h-150 rounded-2xl overflow-hidden">
                    <img src="./../components/img/aboutBG/cb2.jpeg" alt="" draggable="false"
                        class=" w-full h-full object-cover object-center">
                </div>


            </div>

            <div class=" flex flex-col self-center">
                <h2 class=" w-3/5 text-4xl capitalize text-black font-semibold mb-8">Why you should Join
                    Our Event
                </h2>

                <p class=" text-lg font-normal mb-15">We have dedicated tracks for every industry Whether you want to
                    hire tech’s top talent meet with the policymakers influencing your industry or exchange notes to
                    have dedicated track How you transform your business as technology, consumer habits industry
                    dynamic.</p>

                <div class=" grid grid-rows-3 gap-8">

                    <div class=" flex justify-start items-center">
                        <i class="fa fa-check text-xl mr-10" aria-hidden="true"></i>
                        <p class="">How to improve your busines for Helping us</p>
                    </div>

                    <div class=" flex justify-start items-center">
                        <i class="fa fa-check text-xl mr-10" aria-hidden="true"></i>
                        <p class="">making this the first true generator on the Internet</p>
                    </div>

                    <div class=" flex justify-start items-center">
                        <i class="fa fa-check text-xl mr-10" aria-hidden="true"></i>
                        <p class="">Creative this the first true generator on the designe</p>
                    </div>

                </div>

            </div>

        </div>

    </section>

    <!-- CONTENT II -->
    <section class=" w-full h-auto">

        <div class=" w-full max-w-4/5 mx-auto my-20 grid grid-cols-2 gap-4">

            <div class=" flex flex-col self-center pr-20">
                <h2 class=" w-3/5 text-4xl capitalize text-black font-semibold mb-8">We Bring The Best
                    Things for You
                </h2>

                <p class=" text-lg font-normal mb-15">No conference has ever grown so large so fast. But we also pride
                    ourselves in organising the “best technology conference on the planet”.</p>

                <RouterLink to="/">
                    <button
                        class="px-7 py-4 border-2 border-black rounded-full transition-all hover:translate-x-2 cursor-pointer">Get Ticket</button>
                </RouterLink>

            </div>

            <div class=" grid grid-cols-2 grid-rows-2 gap-8">

                <div class=" w-full h-auto border bg-white rounded-3xl p-6 flex flex-col items-start">
                    <i class="fa fa-microphone text-5xl mb-4" aria-hidden="true"></i>
                    <h3 class=" text-2xl font-bold capitalize mb-2">advance speakers</h3>
                    <p>Hear 9 inspiring talks, meet the best product people in Europe, and party together after the
                        event!</p>
                </div>

                <div class=" w-full h-auto border bg-white rounded-3xl p-6 flex flex-col items-start">
                    <i class="fa fa-briefcase text-5xl mb-4" aria-hidden="true"></i>
                    <h3 class=" text-2xl font-bold capitalize mb-2">daily worshops</h3>
                    <p>Hear 9 inspiring talks, meet the best product people in Europe, and party together after the
                        event!</p>
                </div>

                <div class=" w-full h-auto border bg-white rounded-3xl p-6 flex flex-col items-start">
                    <i class="fa fa-commenting text-5xl mb-4" aria-hidden="true"></i>
                    <h3 class=" text-2xl font-bold capitalize mb-2">Q&A sessions</h3>
                    <p>Hear 9 inspiring talks, meet the best product people in Europe, and party together after the
                        event!</p>
                </div>

                <div class=" w-full h-auto border bg-white rounded-3xl p-6 flex flex-col items-start">
                    <i class="fa fa-television text-5xl mb-4" aria-hidden="true"></i>
                    <h3 class=" text-2xl font-bold capitalize mb-2">live training</h3>
                    <p>Hear 9 inspiring talks, meet the best product people in Europe, and party together after the
                        event!</p>
                </div>

            </div>

        </div>

    </section>

    <!-- USER TESTIMONI -->
    <section class=" w-full h-auto rounded-[5rem] bg-[#E7C899]">
        <div class=" w-full max-w-4/5 mx-auto py-15 grid grid-cols-3">

            <div class=" flex flex-col items-center">
                <h2 class=" w-4/5 text-4xl capitalize text-black font-semibold mb-8">What our client's say about us</h2>
                <img src="./../components/img/aboutBG/shc.png" alt="" draggable="false">
            </div>

            <div class=" col-span-2 flex items-center px-20">
                <div class=" flex flex-col items-start text-left">
                    <i class="fa fa-quote-left text-6xl mb-5" aria-hidden="true"></i>
                    <p class=" text-2xl mb-7">I express my deep gratitude to the team for the impecc able and productive
                        service to the
                        company activities based on the results of seven years of joint work I recommend the services of
                        this company to everyone!</p>
                    <div class=" w-full h-auto flex justify-between items-center mb-20">
                        <div class=" w-1/2 flex">
                            <div class=" w-15 h-15 bg-amber-50 rounded-full overflow-hidden mr-4">
                                <img src="./../components/img/user_profile/user1.jpeg" alt="user_profile"
                                    class=" w-full h-full object-cover object-center" draggable="false">
                            </div>
                            <div class=" flex flex-col items-start justify-center">
                                <h5 class=" text-xl font-bold text-black">username</h5>
                                <p class=" text-sm font-normal text-black">[Developer]</p>
                            </div>
                        </div>

                        <div class=" grid grid-cols-5 gap-2 text-[#FAFE00]">
                            <i class="fa fa-star" aria-hidden="true"></i>
                            <i class="fa fa-star" aria-hidden="true"></i>
                            <i class="fa fa-star" aria-hidden="true"></i>
                            <i class="fa fa-star" aria-hidden="true"></i>
                            <i class="fa fa-star" aria-hidden="true"></i>
                        </div>
                    </div>
                    <div class=" w-full h-auto flex items-center">
                        <div class=" w-auto flex">
                            <div class=" w-5 h-5 mr-2 border border-black bg-black rounded-full"></div>
                            <div class=" w-5 h-5 mr-2 border border-black bg-none rounded-full"></div>
                            <div class=" w-5 h-5 border border-black bg-none rounded-full"></div>
                        </div>

                        <div class=" w-full mx-3 border border-black"></div>

                        <div class=" w-auto flex items-center">
                            <button
                                class=" w-10 h-10 bg-white transition-all hover:bg-gray-300 border border-black rounded-full font-bold mr-2">
                                <i class="fa fa-long-arrow-left" aria-hidden="true"></i>
                            </button>
                            <button
                                class=" w-10 h-10 bg-white transition-all hover:bg-gray-300 border border-black rounded-full font-bold">
                                <i class="fa fa-long-arrow-right" aria-hidden="true"></i>
                            </button>
                        </div>

                    </div>

                </div>

            </div>

        </div>
    </section>

    <section class=" w-full h-auto">
        <CountPerson />
    </section>

    <section class=" w-full h-auto">
        <div class=" w-full max-w-4/5 mx-auto py-15 flex flex-col">
            <h2 class=" text-4xl font-bold text-black text-center mb-15">Get direction to the event hall</h2>
            <div class=" w-full flex justify-between">

                <div class=" w-3/10 h-100 bg-[#E7C899] rounded-4xl flex flex-col items-start justify-center p-20">

                    <div class=" w-full flex flex-col mb-10">

                        <div class=" w-full h-auto flex mb-8">
                            <i class="fa fa-calendar text-4xl mr-3" aria-hidden="true"></i>

                            <div class=" flex flex-col justify-center items-start">
                                <p class=" text-xl font-bold mb-1">Venue</p>
                                <p class=" text-sm font-normal">Kames D.bradd ock Hall</p>
                            </div>
                        </div>


                        <div class=" w-full h-auto flex">
                            <i class="fa fa-location-arrow text-4xl mr-3" aria-hidden="true"></i>

                            <div class=" flex flex-col justify-center items-start">
                                <p class=" text-xl font-bold mb-1">Address</p>
                                <p class=" text-sm font-normal">1356 Broadway, New York NY 10018, USA</p>
                            </div>
                        </div>

                    </div>

                    <button
                        class="px-7 py-4 border border-black bg-white rounded-full transition-all hover:translate-x-2 cursor-pointer">Get Direction</button>
                </div>

                <div class=" w-7/10 h-100 rounded-4xl overflow-hidden ml-10">
                    <iframe class=" w-full h-full object-cover"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3953.280430130844!2d110.4065606759763!3d-7.76005487696027!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a599bd3bdc4ef%3A0x6f1714b0c4544586!2sUniversity%20of%20Amikom%20Yogyakarta!5e0!3m2!1sen!2sid!4v1777812436113!5m2!1sen!2sid"
                        width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy"
                        referrerpolicy="no-referrer-when-downgrade"></iframe>
                </div>

            </div>
        </div>
    </section>
    </div>
</template>
