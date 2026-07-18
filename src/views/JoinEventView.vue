<script setup>
import { reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { eventApi } from '@/lib/http'

const route = useRoute()
const router = useRouter()
const isSubmitting = ref(false)
const errorMessage = ref('')

const eventTitleMap = {
  'chatbots-and-virtual-assistants': 'Vantage Concert Night',
  'creative-innovation-summit': 'Creative Innovation Summit',
}

const eventTitle = eventTitleMap[route.params.slug] || 'Selected Event'

const form = reactive({
  fullName: '',
  email: '',
  phone: '',
  tickets: 1,
})

const submitJoinRequest = async () => {
  isSubmitting.value = true

  try {
    errorMessage.value = ''
    const eventsResponse = await eventApi.get('/events')
    const slugify = (value) => value.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
    const event = eventsResponse.data.data.find(
      (item) => String(item.id) === route.params.slug || slugify(item.title) === route.params.slug,
    )

    if (!event) throw new Error('Event not found')

    await eventApi.post(`/events/${event.id}/ticket-requests`, {
      full_name: form.fullName,
      email: form.email,
      phone: form.phone,
      quantity: form.tickets,
    })
    alert(
      `Thank you, ${form.fullName || 'guest'}! Your join request for ${eventTitle} has been received.`,
    )
    router.push({ name: 'event-detail', params: { slug: route.params.slug } })
  } catch (error) {
    errorMessage.value = error.response?.data?.message || error.message || 'Could not submit the ticket request.'
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <main class="relative z-10 -mt-10 mb-20 rounded-[3rem] min-h-screen bg-[#2B3B4C] px-5 py-50 text-white md:px-12">
    <section class="mx-auto max-w-5xl">
      <div class="mb-8 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p class="text-sm uppercase tracking-[0.25em] text-[#EE0034]">Join Event</p>
          <h1 class="mt-2 text-3xl font-bold md:text-4xl">Reserve your spot</h1>
          <p class="mt-2 text-sm text-slate-300">You are joining {{ eventTitle }}</p>
        </div>

        <RouterLink
          :to="{ name: 'event-detail', params: { slug: route.params.slug } }"
          class="rounded-full border border-white/30 px-5 py-2 text-sm transition hover:bg-white/10"
        >
          Back to event
        </RouterLink>
      </div>

      <div class="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <div class="rounded-3xl border border-white/15 bg-[#34495E] p-6 shadow-xl">
          <h2 class="text-2xl font-semibold">Event details</h2>
          <div class="mt-5 space-y-3 text-sm text-slate-300">
            <div class="rounded-2xl bg-white/10 p-4">
              <p class="font-medium text-white">Event</p>
              <p class="mt-1">{{ eventTitle }}</p>
            </div>
            <div class="rounded-2xl bg-white/10 p-4">
              <p class="font-medium text-white">What happens next?</p>
              <p class="mt-1">
                We will send your confirmation details to your email once your request is submitted.
              </p>
            </div>
            <div class="rounded-2xl bg-white/10 p-4">
              <p class="font-medium text-white">Need help?</p>
              <p class="mt-1">Contact our team at vantage@gmail.com for assistance.</p>
            </div>
          </div>
        </div>

        <form
          class="rounded-3xl border border-white/15 bg-[#34495E] p-6 shadow-xl md:p-8"
          @submit.prevent="submitJoinRequest"
        >
          <div v-if="errorMessage" class="mb-5 rounded-xl bg-red-500/20 p-4 text-red-200">
            {{ errorMessage }}
          </div>
          <div class="grid gap-5 md:grid-cols-2">
            <label class="flex flex-col gap-2 md:col-span-2">
              <span class="font-medium">Full Name</span>
              <input
                v-model="form.fullName"
                required
                type="text"
                placeholder="Enter your full name"
                class="rounded-xl bg-white px-4 py-3 text-slate-800 outline-none ring-[#EE0034] focus:ring-2"
              />
            </label>

            <label class="flex flex-col gap-2">
              <span class="font-medium">Email</span>
              <input
                v-model="form.email"
                required
                type="email"
                placeholder="you@example.com"
                class="rounded-xl bg-white px-4 py-3 text-slate-800 outline-none ring-[#EE0034] focus:ring-2"
              />
            </label>

            <label class="flex flex-col gap-2">
              <span class="font-medium">Phone Number</span>
              <input
                v-model="form.phone"
                required
                type="tel"
                placeholder="08xxxxxxxxxx"
                class="rounded-xl bg-white px-4 py-3 text-slate-800 outline-none ring-[#EE0034] focus:ring-2"
              />
            </label>

            <label class="flex flex-col gap-2">
              <span class="font-medium">Tickets</span>
              <input
                v-model.number="form.tickets"
                required
                min="1"
                type="number"
                class="rounded-xl bg-white px-4 py-3 text-slate-800 outline-none ring-[#EE0034] focus:ring-2"
              />
            </label>
          </div>

          <div class="mt-8 flex flex-wrap justify-end gap-3">
            <RouterLink
              :to="{ name: 'event-detail', params: { slug: route.params.slug } }"
              class="rounded-full border border-white/30 px-6 py-3 transition hover:bg-white/10"
            >
              Cancel
            </RouterLink>

            <button
              :disabled="isSubmitting"
              type="submit"
              class="rounded-full bg-[#EE0034] px-7 py-3 font-semibold transition hover:bg-[#c9002c] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {{ isSubmitting ? 'Submitting...' : 'Submit Join Request' }}
            </button>
          </div>
        </form>
      </div>
    </section>
  </main>
</template>
