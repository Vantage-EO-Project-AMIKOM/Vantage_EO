<script setup>
import { computed, ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

import coverOne from '@/components/img/bg/ulp.jpeg'
import coverTwo from '@/components/img/bg/hero-bg.jpg'

const route = useRoute()
const showAll = ref(false)

const posts = [
  {
    slug: 'chatbots-and-virtual-assistants',
    title: 'Vantage Concert Night',
    category: 'Concert',
    date: '2026-08-18',
    location: 'Yogyakarta Convention Center',
    image: coverOne,
  },
  {
    slug: 'creative-innovation-summit',
    title: 'Creative Innovation Summit',
    category: 'Business',
    date: '2026-09-26',
    location: 'The Grand Hall',
    image: coverTwo,
  },
  {
    slug: 'future-of-ai-workshop',
    title: 'Future of AI Workshop',
    category: 'Workshop',
    date: '2026-10-12',
    location: 'Bandung Tech Hub',
    image: coverOne,
  },
  {
    slug: 'digital-creators-festival',
    title: 'Digital Creators Festival',
    category: 'Festival',
    date: '2026-11-03',
    location: 'Jakarta Creative District',
    image: coverTwo,
  },
  {
    slug: 'design-systems-summit',
    title: 'Design Systems Summit',
    category: 'Design',
    date: '2026-11-18',
    location: 'Surabaya Innovation Center',
    image: coverOne,
  },
  {
    slug: 'startup-networking-night',
    title: 'Startup Networking Night',
    category: 'Networking',
    date: '2026-12-08',
    location: 'Semarang Startup Hub',
    image: coverTwo,
  },
]

const searchTerm = computed(() => {
  const value = route.query.search
  return value ? String(value).trim().toLowerCase() : ''
})

const filteredPosts = computed(() => {
  if (!searchTerm.value) {
    return posts.slice(0, showAll.value ? posts.length : 4)
  }

  const matches = posts.filter((post) => {
    return [post.title, post.category, post.location, post.date].some((field) =>
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
      v-if="filteredPosts.length === 0"
      class="rounded-2xl border border-white/10 bg-white/10 px-6 py-5 text-sm text-white/80"
    >
      No events match your search.
    </div>

    <div v-else class="grid w-full grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-4">
      <RouterLink
        v-for="post in filteredPosts"
        :key="post.slug"
        :to="`/event/${post.slug}`"
        class="flex h-80 flex-col items-start overflow-hidden rounded-2xl border border-white/5 bg-[#1d2d42]/50 shadow-md transition-all hover:-translate-y-1 hover:scale-[1.01]"
      >
        <img
          class="h-3/5 w-full object-cover object-center"
          :src="post.image"
          :alt="post.title"
          draggable="false"
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
