<script setup>
import { RouterLink } from 'vue-router'

const posts = [
  {
    slug: 'chatbots-and-virtual-assistants',
    title: 'Vantage Concert Night',
    category: 'Concert',
    date: '2026-08-18',
    location: 'Yogyakarta Convention Center',
    image: './img/bg/ulp.jpeg',
  },
  {
    slug: 'creative-innovation-summit',
    title: 'Creative Innovation Summit',
    category: 'Business',
    date: '2026-09-26',
    location: 'The Grand Hall',
    image: './img/bg/hero-bg.jpg',
  },
]
</script>

<template>
  <div
    class="w-full max-w-4/5 mx-auto my-20 rounded-4xl border border-white/10 bg-linear-to-br from-[#24364d] to-[#1d2d42] shadow-[0_10px_40px_rgba(0,0,0,0.35)] overflow-hidden p-10 inset-0 ring-1 ring-white/40 text-white"
  >
    <div class="w-full flex justify-between items-center mb-10">
      <h2 class="text-4xl font-bold capitalize text-white">our latest post</h2>
      <button
        class="px-14 py-3 bg-[#EE0034] text-white rounded-full transition-all hover:-translate-x-2 cursor-pointer"
      >
        View All
      </button>
    </div>

    <div class="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
      <RouterLink
        v-for="post in posts"
        :key="post.slug"
        :to="`/event/${post.slug}`"
        class="flex h-80 flex-col items-start rounded-2xl shadow-md transition-all hover:scale-[1.01] hover:-translate-y-1"
      >
        <img
          class="w-full h-3/5 object-cover object-center rounded-t-xl"
          src="./../components/img/bg/ulp.jpeg"
          alt="post.title"
          draggable="false"
        />
        <div class="w-full h-auto p-5">
          <div class="w-full flex mb-2">
            <div class="w-fit bg-white px-3 mr-3 rounded-full">
              <p class="text-sm font-normal text-black capitalize">{{ post.category }}</p>
            </div>
            <p class="text-sm font-normal text-white">{{ post.date }}</p>
          </div>
          <p class="text-xl font-semibold text-white mb-1">{{ post.title }}</p>
          <div class="w-full flex items-center text-white">
            <i class="fa fa-thumb-tack text-sm mr-2" aria-hidden="true"></i>
            <p class="text-sm font-normal">{{ post.location }}</p>
          </div>
        </div>
      </RouterLink>
    </div>
  </div>
</template>
