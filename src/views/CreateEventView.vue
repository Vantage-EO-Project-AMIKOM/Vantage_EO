<script setup>
import { computed, onMounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { eventApi } from '@/lib/http'

const route = useRoute()
const router = useRouter()
const isSubmitting = ref(false)
const isLoading = ref(true)
const errorMessage = ref('')
const categories = ref([])
const venues = ref([])
const isEditing = computed(() => Boolean(route.params.id))

const form = reactive({
  title: '',
  category_id: '',
  venue_id: '',
  description: '',
  event_date: '',
  start_time: '',
  end_time: '',
  banner: '',
  price: '',
  quota: '',
  status: 'draft',
})

const apiErrorMessage = (error, fallback) => {
  const errors = error.response?.data?.errors
  return (errors && Object.values(errors).flat()[0]) || error.response?.data?.message || fallback
}

const loadForm = async () => {
  isLoading.value = true
  errorMessage.value = ''

  try {
    const requests = [eventApi.get('/categories'), eventApi.get('/venues')]
    if (isEditing.value) requests.push(eventApi.get(`/events/${route.params.id}`))

    const [categoryResponse, venueResponse, eventResponse] = await Promise.all(requests)
    categories.value = categoryResponse.data?.data || categoryResponse.data || []
    venues.value = venueResponse.data?.data || venueResponse.data || []

    if (eventResponse) {
      const event = eventResponse.data?.data || eventResponse.data
      Object.assign(form, {
        title: event.title || '',
        category_id: event.category_id || '',
        venue_id: event.venue_id || '',
        description: event.description || '',
        event_date: event.event_date?.slice(0, 10) || '',
        start_time: event.start_time?.slice(0, 5) || '',
        end_time: event.end_time?.slice(0, 5) || '',
        banner: event.banner || '',
        price: event.price ?? '',
        quota: event.quota ?? '',
        status: event.status || 'draft',
      })
    }
  } catch (error) {
    errorMessage.value = apiErrorMessage(error, 'Could not load the event form.')
  } finally {
    isLoading.value = false
  }
}

const submitEvent = async () => {
  isSubmitting.value = true

  try {
    errorMessage.value = ''
    if (isEditing.value) {
      await eventApi.put(`/events/${route.params.id}`, form)
    } else {
      await eventApi.post('/events', form)
    }
    router.push('/my-events')
  } catch (error) {
    errorMessage.value = apiErrorMessage(error, `Could not ${isEditing.value ? 'update' : 'create'} the event.`)
  } finally {
    isSubmitting.value = false
  }
}

onMounted(loadForm)
</script>

<template>
  <main
    class="min-h-screen bg-[#2B3B4C] -mt-10 mb-20 px-5 py-40 text-white md:px-12 rounded-b-[3rem] shadow-[0_0_80px_rgba(0,0,0,0.15)]"
  >
    <section class="mx-auto max-w-5xl">
      <div class="mb-8 flex items-center justify-between">
        <div>
          <h1 class="mt-2 text-3xl font-bold md:text-4xl">{{ isEditing ? 'Edit Event' : 'Create New Event' }}</h1>
        </div>

        <RouterLink
          to="/event"
          class="rounded-full border border-white/30 px-5 py-2 text-sm transition hover:bg-white/10"
        >
          Back to Events
        </RouterLink>
      </div>

      <form
        v-if="!isLoading"
        class="rounded-3xl border border-white/15 bg-[#34495E] p-6 shadow-xl md:p-10"
        @submit.prevent="submitEvent"
      >
        <div v-if="errorMessage" class="mb-6 rounded-xl bg-red-500/20 p-4 text-red-200">
          {{ errorMessage }}
        </div>
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

          <label class="flex flex-col gap-2 md:col-span-2">
            <span class="font-medium">Banner URL <span class="text-white/60">(optional)</span></span>
            <input
              v-model="form.banner"
              type="url"
              placeholder="https://example.com/event-banner.jpg"
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

              <option v-for="category in categories" :key="category.id" :value="category.id">
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

              <option v-for="venue in venues" :key="venue.id" :value="venue.id">
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
            {{ isSubmitting ? 'Saving...' : (isEditing ? 'Update Event' : 'Create Event') }}
          </button>
        </div>
      </form>
      <div v-else class="rounded-3xl border border-white/15 bg-[#34495E] p-10 text-center text-white/70">
        Loading event form...
      </div>
    </section>
  </main>
</template>
