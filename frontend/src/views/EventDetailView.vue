<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import heroBg from '@/components/img/bg/hero-bg.jpg'
import eventImage from '@/components/img/bg/ulp.jpeg'

const route = useRoute()

const posts = [
  {
    slug: 'chatbots-and-virtual-assistants',
    title: 'Vantage Concert Night',
    category: 'Concert',
    date: '18 August 2026',
    time: '19:00 - 23:00',
    location: 'Yogyakarta Convention Center',
    image: eventImage,
    description:
      'An unforgettable live music experience featuring top local and international performers, immersive stage visuals, and a vibrant crowd atmosphere for a night of celebration.',
    organizer: 'Vantage Event Organizer',
    organizerDescription:
      'We craft premium event experiences with stunning production, seamless logistics, and memorable entertainment for every guest.',
    highlights: [
      'Live performances from favorite artists',
      'Premium sound and lighting production',
      'Exclusive fan zone and photo booth experience',
    ],
    agenda: [
      {
        time: '19.00',
        title: 'Doors open & welcome drinks',
        detail:
          'Guests enter the venue, enjoy the atmosphere, and settle into the concert experience.',
      },
      {
        time: '20.00',
        title: 'Opening performance',
        detail: 'A warm-up set to kick off the evening with energy and excitement.',
      },
      {
        time: '21.00',
        title: 'Main stage show',
        detail: 'The headline act takes the stage with a full concert set and special effects.',
      },
      {
        time: '22.15',
        title: 'Encore & closing',
        detail: 'A final performance moment and a memorable closing for the night.',
      },
    ],
  },
  {
    slug: 'creative-innovation-summit',
    title: 'Creative Innovation Summit',
    category: 'Business',
    date: '26 September 2026',
    time: '08:30 - 15:30',
    location: 'The Grand Hall',
    image: heroBg,
    description:
      'An inspiring event for teams that want to build stronger brands, better customer journeys, and smarter digital experiences.',
    organizer: 'Vantage Creative Lab',
    organizerDescription:
      'A collaborative team that turns bold ideas into memorable event experiences with measurable impact.',
    highlights: [
      'Strategy talks for modern brand growth',
      'Workshops on content storytelling and campaigns',
      'High-energy networking session',
    ],
    agenda: [
      {
        time: '08.30',
        title: 'Networking breakfast',
        detail: 'Early conversations and coffee with peers.',
      },
      {
        time: '10.00',
        title: 'Brand storytelling',
        detail: 'How to turn audience attention into lasting trust.',
      },
      {
        time: '12.00',
        title: 'Lunch and panel',
        detail: 'An open discussion with guest speakers.',
      },
      {
        time: '14.00',
        title: 'Workshop session',
        detail: 'Hands-on planning ideas for upcoming campaigns.',
      },
    ],
  },
]

const post = computed(() => posts.find((item) => item.slug === route.params.slug) ?? posts[0])
</script>

<template>
  <div>
    <section class="relative min-h-[320px] overflow-hidden pt-24 md:min-h-[390px]">
      <img
        :src="heroBg"
        alt="Event detail banner"
        class="absolute inset-0 h-full w-full object-cover"
      />
      <div class="absolute inset-0 bg-black/60"></div>

      <div
        class="relative z-20 mx-auto flex min-h-80 w-4/5 flex-col justify-center py-16 md:min-h-97.5"
      >
        <p class="text-sm font-semibold uppercase tracking-[0.35em] text-[#EE0034]">
          {{ post.category }}
        </p>
        <h1 class="mt-3 text-4xl font-bold text-white md:text-6xl">{{ post.title }}</h1>
        <div class="mt-5 flex flex-wrap gap-3 text-sm text-slate-100">
          <span class="rounded-full border border-white/20 bg-white/10 px-4 py-2">
            <i class="fa fa-calendar mr-2"></i>{{ post.date }}
          </span>
          <span class="rounded-full border border-white/20 bg-white/10 px-4 py-2">
            <i class="fa fa-clock-o mr-2"></i>{{ post.time }}
          </span>
          <span class="rounded-full border border-white/20 bg-white/10 px-4 py-2">
            <i class="fa fa-map-marker mr-2"></i>{{ post.location }}
          </span>
        </div>
      </div>
    </section>

    <main
      class="relative z-10 -mt-10 mb-20 rounded-[3rem] bg-[#2B3B4C] text-white shadow-[0_0_80px_rgba(0,0,0,0.15)] md:px-10 md:py-10"
    >
      <div class="grid gap-8 lg:grid-cols-[1.7fr_0.9fr]">
        <div>
          <img
            src="./../components/img/bg/c6.jpeg"
            alt="Event preview"
            class="h-80 w-full rounded-3xl object-cover md:h-105"
          />

          <h2 class="mt-8 text-3xl font-semibold text-white">About this event</h2>
          <p class="mt-4 text-lg leading-8 text-slate-300">{{ post.description }}</p>

          <div class="mt-6 flex flex-wrap gap-3">
            <RouterLink
              :to="{ name: 'event-join', params: { slug: route.params.slug } }"
              class="inline-flex items-center rounded-full bg-[#EE0034] px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-1 hover:bg-[#c9002c]"
            >
              <i class="fa fa-ticket mr-2"></i>Join This Event
            </RouterLink>
            <a
              href="#"
              class="inline-flex items-center rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold transition hover:border-[#EE0034] hover:text-[#EE0034]"
            >
              <i class="fa fa-share-alt mr-2"></i>Share Event
            </a>
          </div>

          <div class="mt-8 grid gap-4 md:grid-cols-2">
            <div
              v-for="item in post.highlights"
              :key="item"
              class="rounded-2xl border border-white/10 bg-white/10 p-4 text-slate-100"
            >
              <i class="fa fa-check-circle mr-2 text-[#EE0034]"></i>{{ item }}
            </div>
          </div>

          <section class="mt-10">
            <h3 class="text-2xl font-semibold text-white">Event agenda</h3>
            <div class="mt-6 space-y-4">
              <div
                v-for="item in post.agenda"
                :key="item.time"
                class="flex gap-4 rounded-2xl border border-white/10 bg-white/5 p-4"
              >
                <div class="min-w-[72px] text-sm font-semibold text-[#EE0034]">{{ item.time }}</div>
                <div>
                  <h4 class="font-semibold text-white">{{ item.title }}</h4>
                  <p class="mt-1 text-sm leading-6 text-slate-300">{{ item.detail }}</p>
                </div>
              </div>
            </div>
          </section>
        </div>

        <aside class="space-y-6">
          <div class="rounded-[1.5rem] border border-white/10 bg-[#24364d] p-6 text-white">
            <h3 class="text-xl font-semibold">Quick info</h3>
            <ul class="mt-4 space-y-3 text-sm text-slate-300">
              <li><i class="fa fa-calendar mr-2 text-[#EE0034]"></i>{{ post.date }}</li>
              <li><i class="fa fa-clock-o mr-2 text-[#EE0034]"></i>{{ post.time }}</li>
              <li><i class="fa fa-map-marker mr-2 text-[#EE0034]"></i>{{ post.location }}</li>
              <li><i class="fa fa-tag mr-2 text-[#EE0034]"></i>{{ post.category }}</li>
            </ul>
          </div>

          <div class="rounded-[1.5rem] border border-white/10 bg-white/5 p-6">
            <h3 class="text-xl font-semibold text-white">Organizer</h3>
            <p class="mt-3 font-semibold text-white">{{ post.organizer }}</p>
            <p class="mt-2 text-sm leading-7 text-slate-300">{{ post.organizerDescription }}</p>
          </div>

          <RouterLink
            to="/event"
            class="inline-flex items-center rounded-full bg-[#EE0034] px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-1 hover:bg-[#c9002c]"
          >
            <i class="fa fa-arrow-left mr-2"></i>Back to events
          </RouterLink>
        </aside>
      </div>
    </main>
  </div>
</template>
