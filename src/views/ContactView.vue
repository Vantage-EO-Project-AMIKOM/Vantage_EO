<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue';
import { useRouter } from 'vue-router'; // 1. Import useRouter dari vue-router
import { useAuthStore } from '@/stores/auth';

const router = useRouter(); // 2. Definisikan instance router
const authStore = useAuthStore();
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

const feedbackForm = ref({
    category: 'suggestion',
    rating: 5,
    message: ''
});
const feedbackSent = ref(false);
const isSubmitting = ref(false);

const handleFeedback = async () => {
    isSubmitting.value = true;
    feedbackSent.value = false;

    // The panel is ready to be connected to a feedback API later.
    await new Promise(resolve => setTimeout(resolve, 450));
    feedbackSent.value = true;
    feedbackForm.value.message = '';
    isSubmitting.value = false;
};

watch(() => feedbackForm.value.message, () => {
    feedbackSent.value = false;
});

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
                } else {
                    entry.target.classList.add('show-up');
                }

                // Reveal each section once and keep it visible. Re-hiding sections
                // after layout changes caused large blank areas on the page.
                observer.value.unobserve(entry.target);
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

        <!-- Section 2: Authenticated feedback panel -->
        <section class="w-full h-auto scroll-animate">
            <div class="w-full max-w-4/5 mx-auto py-20">
                <div class="mb-12 text-center text-white">
                    <p class="mb-3 text-sm font-bold uppercase tracking-[0.3em] text-[#EE0034]">Your voice matters</p>
                    <h2 class="text-4xl font-bold md:text-5xl">Help us make Vantage better.</h2>
                    <p class="mx-auto mt-4 max-w-2xl text-base text-slate-300 md:text-lg">Share an idea, report an issue, or tell us what you enjoyed. Every message helps shape the next Vantage experience.</p>
                </div>

                <div class="overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#223447] shadow-[0_30px_70px_rgba(10,20,32,0.35)]">
                    <div class="grid min-h-115 lg:grid-cols-[0.8fr_1.2fr]">
                        <div class="relative overflow-hidden bg-[#17283A] p-8 text-white md:p-12">
                            <div class="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-[#EE0034]/20 blur-3xl"></div>
                            <div class="absolute -bottom-24 -right-20 h-72 w-72 rounded-full bg-[#EE0034]/10 blur-3xl"></div>
                            <div class="relative flex h-full flex-col justify-between">
                                <div>
                                    <div class="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#EE0034] text-2xl shadow-lg shadow-red-950/30">
                                        <i class="fa fa-comment-dots" aria-hidden="true"></i>
                                    </div>
                                    <h3 class="text-3xl font-bold">A better platform starts with you.</h3>
                                    <p class="mt-4 leading-7 text-slate-300">Your feedback goes directly to the Vantage team and helps us prioritize improvements for event creators and guests.</p>
                                </div>

                                <div class="mt-10 space-y-4 text-sm text-slate-300">
                                    <p class="flex items-center gap-3"><i class="fa fa-check-circle text-[#EE0034]"></i> Suggestions and new ideas</p>
                                    <p class="flex items-center gap-3"><i class="fa fa-check-circle text-[#EE0034]"></i> Website experience feedback</p>
                                    <p class="flex items-center gap-3"><i class="fa fa-check-circle text-[#EE0034]"></i> Problems that need attention</p>
                                </div>
                            </div>
                        </div>

                        <div v-if="authStore.isLoggedIn" class="p-8 text-white md:p-12">
                            <div class="mb-8 flex flex-wrap items-center justify-between gap-4">
                                <div>
                                    <p class="text-sm text-slate-400">Sending feedback as</p>
                                    <p class="mt-1 text-lg font-semibold">{{ authStore.user?.name }}</p>
                                    <p class="text-sm text-slate-400">{{ authStore.user?.email }}</p>
                                </div>
                                <span class="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 text-sm text-emerald-300">
                                    <i class="fa fa-lock mr-2"></i>Signed in
                                </span>
                            </div>

                            <form class="space-y-7" @submit.prevent="handleFeedback">
                                <div>
                                    <label class="mb-3 block text-sm font-semibold">What would you like to share?</label>
                                    <div class="grid grid-cols-3 gap-3">
                                        <label v-for="option in [{ value: 'suggestion', label: 'Suggestion', icon: 'fa-lightbulb' }, { value: 'experience', label: 'Experience', icon: 'fa-star' }, { value: 'issue', label: 'Issue', icon: 'fa-circle-exclamation' }]" :key="option.value" class="cursor-pointer">
                                            <input v-model="feedbackForm.category" class="peer sr-only" type="radio" :value="option.value">
                                            <span class="flex min-h-24 flex-col items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-2 text-center text-xs text-slate-300 transition hover:bg-white/10 peer-checked:border-[#EE0034] peer-checked:bg-[#EE0034]/15 peer-checked:text-white md:text-sm">
                                                <i :class="`fa ${option.icon} text-lg`"></i>{{ option.label }}
                                            </span>
                                        </label>
                                    </div>
                                </div>

                                <div>
                                    <label class="mb-3 block text-sm font-semibold">How is your experience?</label>
                                    <div class="flex gap-2">
                                        <button v-for="star in 5" :key="star" type="button" class="text-2xl transition hover:scale-110" :class="star <= feedbackForm.rating ? 'text-amber-400' : 'text-slate-600'" :aria-label="`Rate ${star} out of 5`" @click="feedbackForm.rating = star">
                                            <i class="fa fa-star"></i>
                                        </button>
                                    </div>
                                </div>

                                <div>
                                    <label for="feedback-message" class="mb-3 block text-sm font-semibold">Your message</label>
                                    <textarea id="feedback-message" v-model="feedbackForm.message" required minlength="10" maxlength="1000" rows="5" placeholder="Tell us what is working well or what we can improve..." class="w-full resize-none rounded-2xl border border-white/10 bg-[#17283A] p-5 text-white outline-none transition placeholder:text-slate-500 focus:border-[#EE0034] focus:ring-4 focus:ring-[#EE0034]/10"></textarea>
                                    <p class="mt-2 text-right text-xs text-slate-500">{{ feedbackForm.message.length }} / 1000</p>
                                </div>

                                <div v-if="feedbackSent" class="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-4 text-sm text-emerald-300">
                                    <i class="fa fa-check-circle mr-2"></i>Thank you! Your feedback has been received.
                                </div>

                                <button type="submit" :disabled="isSubmitting" class="inline-flex w-full items-center justify-center gap-3 rounded-full bg-[#EE0034] px-7 py-4 font-bold transition hover:-translate-y-0.5 hover:bg-[#d50030] disabled:cursor-not-allowed disabled:opacity-60 md:w-auto">
                                    {{ isSubmitting ? 'Sending...' : 'Send feedback' }}
                                    <i class="fa fa-paper-plane"></i>
                                </button>
                            </form>
                        </div>

                        <div v-else class="flex flex-col items-center justify-center p-10 text-center text-white md:p-16">
                            <div class="flex h-20 w-20 items-center justify-center rounded-full bg-white/5 text-3xl text-[#EE0034] ring-1 ring-white/10"><i class="fa fa-user-lock"></i></div>
                            <h3 class="mt-7 text-3xl font-bold">Sign in to share feedback</h3>
                            <p class="mt-3 max-w-md text-slate-300">Feedback is available to registered Vantage members so we can follow up and keep submissions meaningful.</p>
                            <div class="mt-8 flex flex-wrap justify-center gap-3">
                                <button type="button" class="rounded-full bg-[#EE0034] px-7 py-3 font-bold transition hover:bg-[#d50030]" @click="router.push('/login')">Sign in</button>
                                <button type="button" class="rounded-full border border-white/20 px-7 py-3 font-bold transition hover:bg-white/10" @click="router.push('/register')">Create account</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Section 3: Google Maps -->
        <section class="w-full h-auto scroll-animate">
            <div class=" w-full max-w-4/5 mx-auto py-20 px-0 xl:px-20">
                <div class="relative w-full h-100 rounded-4xl overflow-hidden bg-[#17283A] shadow-lg/25 shadow-black ring-1 ring-white/10">
                    <div class="absolute inset-0 flex items-center justify-center text-slate-400">
                        <i class="fa fa-location-dot mr-3 text-2xl text-[#EE0034]"></i>
                        Loading map...
                    </div>
                    <iframe
                        title="Vantage office at Universitas Amikom Yogyakarta"
                        class="relative z-10 w-full h-full"
                        src="https://maps.google.com/maps?q=Universitas%20Amikom%20Yogyakarta&z=15&output=embed"
                        style="border: 0"
                        allowfullscreen
                        loading="lazy"
                        referrerpolicy="no-referrer-when-downgrade"
                    ></iframe>
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
  opacity: 1;
  transform: translateY(0) scale(1);
}
</style>
