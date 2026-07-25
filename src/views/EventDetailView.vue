<script setup>
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { eventApi } from '@/lib/http'

import heroBg from '@/components/img/bg/hero-bg.jpg'
import eventImage from '@/components/img/bg/ulp.jpeg'

const route = useRoute()
const post = ref(null)
const isLoading = ref(true)
const loadError = ref('')

const slugify = (value) =>
  String(value || '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')

const formatDate = (value) => {
  if (!value) return 'Date TBA'
  const date = new Date(`${String(value).slice(0, 10)}T00:00:00`)
  return Number.isNaN(date.getTime())
    ? value
    : new Intl.DateTimeFormat('en-GB', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      }).format(date)
}

const formatTime = (value) => String(value || '').slice(0, 5)

const mapEvent = (event) => ({
  id: event.id,
  title: event.title,
  category: event.category?.name || 'Event',
  date: formatDate(event.event_date),
  time:
    event.start_time || event.end_time
      ? `${formatTime(event.start_time) || 'TBA'} - ${formatTime(event.end_time) || 'TBA'}`
      : 'Time TBA',
  location: event.venue?.name || event.venue?.address || 'Venue TBA',
  venueAddress: event.venue?.address || '',
  image: event.banner || eventImage,
  description: event.description || 'More information about this event will be available soon.',
  organizer: event.creator_name || 'Vantage Event Organizer',
  price: Number(event.price || 0),
  quota: event.quota,
})

const loadEvent = async () => {
  isLoading.value = true
  loadError.value = ''
  post.value = null

  try {
    const identifier = String(route.params.slug)
    let event

    if (/^\d+$/.test(identifier)) {
      const response = await eventApi.get(`/events/${identifier}`)
      event = response.data?.data
    } else {
      const response = await eventApi.get('/events')
      event = (response.data?.data || []).find((item) => slugify(item.title) === identifier)
    }

    if (!event) throw new Error('Event not found')
    post.value = mapEvent(event)
  } catch (error) {
    loadError.value =
      error.response?.status === 404 || error.message === 'Event not found'
        ? 'This event could not be found.'
        : error.response?.data?.message || 'We could not load this event. Please try again.'
  } finally {
    isLoading.value = false
  }
}

onMounted(loadEvent)
watch(() => route.params.slug, loadEvent)
</script>

<template>
  <div>
    <main
      v-if="isLoading"
      class="flex min-h-screen items-center justify-center bg-[#2B3B4C] px-6 pt-24 text-white"
    >
      <p class="rounded-2xl border border-white/10 bg-white/10 px-6 py-5">
        Loading event details...
      </p>
    </main>

    <main
      v-else-if="loadError"
      class="flex min-h-screen flex-col items-center justify-center gap-5 bg-[#2B3B4C] px-6 pt-24 text-white"
    >
      <p class="rounded-2xl border border-red-300/20 bg-red-500/10 px-6 py-5 text-red-100">
        {{ loadError }}
      </p>
      <RouterLink
        to="/event"
        class="rounded-full bg-[#EE0034] px-6 py-3 text-sm font-semibold text-white"
      >
        Back to events
      </RouterLink>
    </main>

    <template v-else-if="post">
    <section class="relative min-h-80 overflow-hidden pt-24 md:min-h-97.5">
      <img
        :src="post.image || heroBg"
        alt="Event detail banner"
        class="absolute inset-0 h-full w-full object-cover"
        @error="$event.target.src = heroBg"
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
          <!-- Poster Gambar Event Sesuai Post Dynamic -->
          <img
            :src="post.image"
            :alt="post.title"
            class="h-80 w-full rounded-3xl object-cover md:h-105"
            @error="$event.target.src = eventImage"
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
            <div class="rounded-2xl border border-white/10 bg-white/10 p-4 text-slate-100">
              <i class="fa fa-ticket mr-2 text-[#EE0034]"></i>
              {{ post.price > 0 ? `IDR ${post.price.toLocaleString('id-ID')}` : 'Free admission' }}
            </div>
            <div class="rounded-2xl border border-white/10 bg-white/10 p-4 text-slate-100">
              <i class="fa fa-users mr-2 text-[#EE0034]"></i>
              {{ post.quota ? `${post.quota} available spots` : 'Quota TBA' }}
            </div>
          </div>
        </div>

        <aside class="space-y-6">
          <div class="rounded-3xl border border-white/10 bg-[#24364d] p-6 text-white">
            <h3 class="text-xl font-semibold">Quick info</h3>
            <ul class="mt-4 space-y-3 text-sm text-slate-300">
              <li><i class="fa fa-calendar mr-2 text-[#EE0034]"></i>{{ post.date }}</li>
              <li><i class="fa fa-clock-o mr-2 text-[#EE0034]"></i>{{ post.time }}</li>
              <li><i class="fa fa-map-marker mr-2 text-[#EE0034]"></i>{{ post.location }}</li>
              <li v-if="post.venueAddress">
                <i class="fa fa-map-o mr-2 text-[#EE0034]"></i>{{ post.venueAddress }}
              </li>
              <li><i class="fa fa-tag mr-2 text-[#EE0034]"></i>{{ post.category }}</li>
            </ul>
          </div>

          <div class="rounded-3xl border border-white/10 bg-white/5 p-6">
            <h3 class="text-xl font-semibold text-white">Organizer</h3>
            <p class="mt-3 font-semibold text-white">{{ post.organizer }}</p>
            <p class="mt-2 text-sm leading-7 text-slate-300">
              Contact the organizer through Vantage for more event information.
            </p>
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
    </template>
  </div>
</template>
