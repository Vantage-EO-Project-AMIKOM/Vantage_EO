<script setup>
import { computed, onMounted, ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { eventApi } from '@/lib/http'

import coverOne from '@/components/img/bg/ulp.jpeg'

const route = useRoute()
const showAll = ref(false)
const posts = ref([])
const isLoading = ref(true)
const loadError = ref('')

const formatDate = (value) => {
  if (!value) return 'Date TBA'
  const date = new Date(`${String(value).slice(0, 10)}T00:00:00`)
  return Number.isNaN(date.getTime())
    ? value
    : new Intl.DateTimeFormat('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }).format(date)
}

const mapEvent = (event) => ({
  id: event.id,
  title: event.title,
  category: event.category?.name || 'Event',
  date: formatDate(event.event_date),
  searchableDate: event.event_date || '',
  location: event.venue?.name || event.venue?.address || 'Venue TBA',
  image: event.banner || coverOne,
})

const loadEvents = async () => {
  try {
    const response = await eventApi.get('/events')
    posts.value = (response.data?.data || []).map(mapEvent)
  } catch (error) {
    loadError.value =
      error.response?.data?.message || 'We could not load the latest events. Please try again.'
  } finally {
    isLoading.value = false
  }
}

onMounted(loadEvents)

const searchTerm = computed(() => {
  const value = route.query.search
  return value ? String(value).trim().toLowerCase() : ''
})

const filteredPosts = computed(() => {
  if (!searchTerm.value) {
    return posts.value.slice(0, showAll.value ? posts.value.length : 4)
  }

  const matches = posts.value.filter((post) => {
    return [post.title, post.category, post.location, post.date, post.searchableDate].some((field) =>
      String(field).toLowerCase().includes(searchTerm.value),
    )
  })

  return showAll.value ? matches : matches.slice(0, 4)
})
</script>

<template>
  <div
    class="mx-auto my-20 w-full max-w-4/5 rounded-4xl border border-white/10 bg-linear-to-br from-[#24364d] to-[#1d2d42] p-10 text-white shadow-[0_10px_40px_rgba(0,0,0,0.35)] ring-1 ring-white/40 inset-0"
  >
    <div class="mb-10 flex w-full items-center justify-between">
      <h2 class="text-4xl font-bold capitalize text-white">our latest post</h2>

      <button
        v-if="posts.length > 4"
        @click="showAll = !showAll"
        class="cursor-pointer rounded-full bg-[#EE0034] px-14 py-3 text-white transition-all hover:scale-105"
      >
        {{ showAll ? 'Show Less' : 'View All' }}
      </button>
    </div>

    <div
      v-if="isLoading"
      class="rounded-2xl border border-white/10 bg-white/10 px-6 py-5 text-sm text-white/80"
    >
      Loading the latest events...
    </div>

    <div
      v-else-if="loadError"
      class="rounded-2xl border border-red-300/20 bg-red-500/10 px-6 py-5 text-sm text-red-100"
    >
      {{ loadError }}
    </div>

    <div
      v-else-if="filteredPosts.length === 0"
      class="rounded-2xl border border-white/10 bg-white/10 px-6 py-5 text-sm text-white/80"
    >
      No events match your search.
    </div>

    <div v-else class="grid w-full grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-4">
      <RouterLink
        v-for="post in filteredPosts"
        :key="post.id"
        :to="{ name: 'event-detail', params: { slug: post.id } }"
        class="flex h-80 flex-col items-start overflow-hidden rounded-2xl border border-white/5 bg-[#1d2d42]/50 shadow-md transition-all hover:-translate-y-1 hover:scale-[1.01]"
      >
        <img
          class="h-3/5 w-full object-cover object-center"
          :src="post.image"
          :alt="post.title"
          draggable="false"
          @error="$event.target.src = coverOne"
        />
        <div class="h-auto w-full p-5">
          <div class="mb-2 flex w-full">
            <div class="mr-3 w-fit rounded-full bg-white px-3">
              <p class="text-sm font-normal capitalize text-black">{{ post.category }}</p>
            </div>
            <p class="text-sm font-normal text-white">{{ post.date }}</p>
          </div>
          <p class="mb-1 text-xl font-semibold text-white">{{ post.title }}</p>
          <div class="flex w-full items-center text-white">
            <i class="fa fa-thumb-tack mr-2 text-sm" aria-hidden="true"></i>
            <p class="text-sm font-normal">{{ post.location }}</p>
          </div>
        </div>
      </RouterLink>
    </div>
  </div>
</template>
