<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const isSubmitting = ref(false)

const categories = [
  { id: 1, name: 'Concert' },
  { id: 2, name: 'Seminar' },
  { id: 3, name: 'Workshop' },
  { id: 4, name: 'Festival' },
]

const venues = [
  { id: 1, name: 'Jogja Expo Center' },
  { id: 2, name: 'Auditorium Universitas' },
  { id: 3, name: 'Convention Hall' },
]

const  rm = reactive({
  title: '',
  category_id: '',
  venue_id: '',
  description: '',
  event_date: '',
  start_time: '',
  end_time: '',
  price: '',
  quota: '',
  status: 'draft',
})

const submitEvent = async () => {
  isSubmitting.value = true

  try {
    // Sementara hanya cek data form.
    // Nanti ganti dengan request POST ke Event Service.
    console.log('Data event:', form)

    alert('Event berhasil disiapkan.')
    router.push('/event')
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <main class="min-h-screen bg-[#2B3B4C] -mt-10 mb-20 px-5 py-28 text-white md:px-12 rounded-b-[3rem] shadow-[0_0_80px_rgba(0,0,0,0.15)]">
    <section class="mx-auto max-w-5xl">
      <div class="mb-8 flex items-center justify-between">
        <div>
          <p class="text-sm text-white/60">VANTAGE &gt; Event &gt; Create</p>
          <h1 class="mt-2 text-3xl font-bold md:text-4xl">Create New Event</h1>
        </div>

        <RouterLink
          to="/event"
          class="rounded-full border border-white/30 px-5 py-2 text-sm transition hover:bg-white/10"
        >
          Back to Events
        </RouterLink>
      </div>

      <form
        class="rounded-3xl border border-white/15 bg-[#34495E] p-6 shadow-xl md:p-10"
        @submit.prevent="submitEvent"
      >
        <div class="grid gap-6 md:grid-cols-2">
          <label class="flex flex-col gap-2 md:col-span-2">
            <span class="font-medium">Event Title</span>
            <input
              v-model="form.title"
              required
              type="text"
              placeholder="Contoh: Vantage Tech Conference 2026"
              class="rounded-xl bg-white px-4 py-3 text-slate-800 outline-none ring-[#EE0034] focus:ring-2"
            />
          </label>

          <label class="flex flex-col gap-2">
  <span class="font-medium">Category</span>

  <select
    v-model="form.category_id"
    required
    class="rounded-xl bg-white px-4 py-3 text-slate-800 outline-none ring-[#EE0034] focus:ring-2"
  >
    <option disabled value="">Select category</option>

    <option
      v-for="category in categories"
      :key="category.id"
      :value="category.id"
    >
      {{ category.name }}
    </option>
  </select>
</label>

          <label class="flex flex-col gap-2">
  <span class="font-medium">Venue</span>

  <select
    v-model="form.venue_id"
    required
    class="rounded-xl bg-white px-4 py-3 text-slate-800 outline-none ring-[#EE0034] focus:ring-2"
  >
    <option disabled value="">Select venue</option>

    <option
      v-for="venue in venues"
      :key="venue.id"
      :value="venue.id"
    >
      {{ venue.name }}
    </option>
  </select>
</label>

          <label class="flex flex-col gap-2">
            <span class="font-medium">Event Date</span>
            <input
              v-model="form.event_date"
              required
              type="date"
              class="rounded-xl bg-white px-4 py-3 text-slate-800 outline-none ring-[#EE0034] focus:ring-2"
            />
          </label>

          <label class="flex flex-col gap-2">
            <span class="font-medium">Ticket Price</span>
            <input
              v-model="form.price"
              required
              min="0"
              type="number"
              class="rounded-xl bg-white px-4 py-3 text-slate-800 outline-none ring-[#EE0034] focus:ring-2"
            />
          </label>

          <label class="flex flex-col gap-2">
            <span class="font-medium">Start Time</span>
            <input
              v-model="form.start_time"
              required
              type="time"
              class="rounded-xl bg-white px-4 py-3 text-slate-800 outline-none ring-[#EE0034] focus:ring-2"
            />
          </label>

          <label class="flex flex-col gap-2">
            <span class="font-medium">End Time</span>
            <input
              v-model="form.end_time"
              required
              type="time"
              class="rounded-xl bg-white px-4 py-3 text-slate-800 outline-none ring-[#EE0034] focus:ring-2"
            />
          </label>

          <label class="flex flex-col gap-2">
            <span class="font-medium">Quota</span>
            <input
              v-model="form.quota"
              required
              min="1"
              type="number"
              placeholder="Contoh: 100"
              class="rounded-xl bg-white px-4 py-3 text-slate-800 outline-none ring-[#EE0034] focus:ring-2"
            />
          </label>

          <label class="flex flex-col gap-2">
            <span class="font-medium">Status</span>
            <select
              v-model="form.status"
              class="rounded-xl bg-white px-4 py-3 text-slate-800 outline-none ring-[#EE0034] focus:ring-2"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </label>

          <label class="flex flex-col gap-2 md:col-span-2">
            <span class="font-medium">Description</span>
            <textarea
              v-model="form.description"
              required
              rows="5"
              placeholder="Tulis deskripsi event..."
              class="resize-none rounded-xl bg-white px-4 py-3 text-slate-800 outline-none ring-[#EE0034] focus:ring-2"
            ></textarea>
          </label>
        </div>

        <div class="mt-8 flex flex-wrap justify-end gap-3">
          <RouterLink
            to="/event"
            class="rounded-full border border-white/30 px-6 py-3 transition hover:bg-white/10"
          >
            Cancel
          </RouterLink>

          <button
            :disabled="isSubmitting"
            type="submit"
            class="rounded-full bg-[#EE0034] px-7 py-3 font-semibold transition hover:bg-[#c9002c] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {{ isSubmitting ? 'Saving...' : 'Save Event' }}
          </button>
        </div>
      </form>
    </section>
  </main>
</template>
