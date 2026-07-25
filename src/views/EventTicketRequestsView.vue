<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { eventApi } from '@/lib/http'

const route = useRoute()
const event = ref(null)
const requests = ref([])
const activeStatus = ref('pending')
const isLoading = ref(true)
const loadError = ref('')
const actionError = ref('')
const processingId = ref(null)

const statusOptions = [
  { value: 'pending', label: 'Menunggu' },
  { value: 'approved', label: 'Disetujui' },
  { value: 'rejected', label: 'Ditolak' },
  { value: 'all', label: 'Semua' },
]

const filteredRequests = computed(() =>
  activeStatus.value === 'all'
    ? requests.value
    : requests.value.filter((request) => request.status === activeStatus.value),
)

const statusCount = (status) =>
  status === 'all'
    ? requests.value.length
    : requests.value.filter((request) => request.status === status).length

const loadRequests = async () => {
  isLoading.value = true
  loadError.value = ''

  try {
    const [eventResponse, requestsResponse] = await Promise.all([
      eventApi.get(`/events/${route.params.id}`),
      eventApi.get(`/events/${route.params.id}/ticket-requests`),
    ])

    event.value = eventResponse.data?.data
    requests.value = requestsResponse.data?.data || []
  } catch (error) {
    loadError.value =
      error.response?.status === 403
        ? 'Anda tidak memiliki izin untuk mengelola permintaan tiket event ini.'
        : error.response?.data?.message || 'Permintaan tiket gagal dimuat.'
  } finally {
    isLoading.value = false
  }
}

const approveRequest = async (ticketRequest) => {
  if (
    !window.confirm(
      `Setujui ${ticketRequest.quantity} tiket untuk ${ticketRequest.full_name}?`,
    )
  ) {
    return
  }

  await processRequest(ticketRequest, 'approve')
}

const rejectRequest = async (ticketRequest) => {
  const reason = window.prompt(
    `Alasan penolakan untuk ${ticketRequest.full_name} (opsional):`,
    '',
  )

  if (reason === null) return
  await processRequest(ticketRequest, 'reject', { reason })
}

const processRequest = async (ticketRequest, action, payload = {}) => {
  processingId.value = ticketRequest.id
  actionError.value = ''

  try {
    const response = await eventApi.patch(
      `/ticket-requests/${ticketRequest.id}/${action}`,
      payload,
    )
    const updatedRequest = response.data?.data
    const index = requests.value.findIndex((item) => item.id === ticketRequest.id)
    if (index !== -1) requests.value[index] = updatedRequest

    if (action === 'approve') {
      event.value.issued_tickets_count =
        Number(event.value.issued_tickets_count || 0) + Number(ticketRequest.quantity)
      event.value.remaining_quota = Math.max(
        0,
        Number(event.value.quota) - event.value.issued_tickets_count,
      )
    }
  } catch (error) {
    const validationErrors = error.response?.data?.errors
    actionError.value =
      (validationErrors && Object.values(validationErrors).flat()[0]) ||
      error.response?.data?.message ||
      'Permintaan tidak dapat diproses.'
  } finally {
    processingId.value = null
  }
}

const formatDateTime = (value) => {
  if (!value) return '-'
  return new Intl.DateTimeFormat('id-ID', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value))
}

const statusClass = (status) =>
  ({
    pending: 'border-amber-400/30 bg-amber-400/10 text-amber-300',
    approved: 'border-emerald-400/30 bg-emerald-400/10 text-emerald-300',
    rejected: 'border-red-400/30 bg-red-400/10 text-red-300',
  })[status] || 'border-slate-400/30 bg-slate-400/10 text-slate-300'

onMounted(loadRequests)
</script>

<template>
  <main class="min-h-screen bg-[#1d2939] px-4 pb-20 pt-28 text-white">
    <div class="mx-auto max-w-6xl">
      <RouterLink
        to="/my-events"
        class="mb-6 inline-flex items-center gap-2 text-sm text-slate-300 transition hover:text-white"
      >
        <i class="fa fa-arrow-left"></i>
        Kembali ke Event Saya
      </RouterLink>

      <div v-if="isLoading" class="flex min-h-96 flex-col items-center justify-center">
        <div
          class="h-12 w-12 animate-spin rounded-full border-4 border-[#EE0034] border-t-transparent"
        ></div>
        <p class="mt-4 text-slate-400">Memuat permintaan tiket...</p>
      </div>

      <div
        v-else-if="loadError"
        class="rounded-3xl border border-red-500/30 bg-red-950/30 p-10 text-center"
      >
        <p class="text-red-200">{{ loadError }}</p>
        <button
          class="mt-5 rounded-full bg-[#EE0034] px-6 py-2.5 font-semibold"
          @click="loadRequests"
        >
          Coba Lagi
        </button>
      </div>

      <template v-else>
        <section
          class="overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#34495E] to-[#24364d] p-6 shadow-2xl md:p-8"
        >
          <div class="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <p class="text-sm font-semibold uppercase tracking-[0.25em] text-[#EE0034]">
                Manajemen Tiket
              </p>
              <h1 class="mt-2 text-3xl font-bold md:text-4xl">{{ event?.title }}</h1>
              <p class="mt-2 text-slate-300">
                Tinjau permintaan peserta sebelum tiket diterbitkan.
              </p>
            </div>

            <div class="grid grid-cols-3 gap-3">
              <div class="rounded-2xl bg-black/20 px-5 py-4 text-center">
                <p class="text-xs uppercase tracking-wide text-slate-400">Kuota</p>
                <p class="mt-1 text-2xl font-bold">{{ event?.quota || 0 }}</p>
              </div>
              <div class="rounded-2xl bg-black/20 px-5 py-4 text-center">
                <p class="text-xs uppercase tracking-wide text-slate-400">Terbit</p>
                <p class="mt-1 text-2xl font-bold text-emerald-300">
                  {{ event?.issued_tickets_count || 0 }}
                </p>
              </div>
              <div class="rounded-2xl bg-black/20 px-5 py-4 text-center">
                <p class="text-xs uppercase tracking-wide text-slate-400">Tersisa</p>
                <p class="mt-1 text-2xl font-bold text-[#EE0034]">
                  {{ event?.remaining_quota ?? event?.quota ?? 0 }}
                </p>
              </div>
            </div>
          </div>
        </section>

        <div
          v-if="actionError"
          class="mt-6 flex items-start justify-between gap-4 rounded-2xl border border-red-500/30 bg-red-950/30 p-4 text-red-200"
        >
          <p>{{ actionError }}</p>
          <button aria-label="Tutup pesan" @click="actionError = ''">×</button>
        </div>

        <section class="mt-8 rounded-3xl border border-white/10 bg-[#2B3B4C] p-5 md:p-8">
          <div class="flex flex-wrap gap-2 border-b border-white/10 pb-5">
            <button
              v-for="option in statusOptions"
              :key="option.value"
              class="rounded-full px-4 py-2 text-sm font-semibold transition"
              :class="
                activeStatus === option.value
                  ? 'bg-[#EE0034] text-white'
                  : 'bg-[#17202A] text-slate-300 hover:text-white'
              "
              @click="activeStatus = option.value"
            >
              {{ option.label }}
              <span class="ml-1 opacity-70">{{ statusCount(option.value) }}</span>
            </button>
          </div>

          <div v-if="filteredRequests.length === 0" class="py-16 text-center">
            <i class="fa fa-inbox text-5xl text-slate-600"></i>
            <h2 class="mt-4 text-xl font-bold">Tidak ada permintaan</h2>
            <p class="mt-2 text-slate-400">Belum ada data untuk status yang dipilih.</p>
          </div>

          <div v-else class="mt-6 space-y-4">
            <article
              v-for="ticketRequest in filteredRequests"
              :key="ticketRequest.id"
              class="rounded-2xl border border-white/10 bg-[#17202A] p-5 transition hover:border-white/20"
            >
              <div class="flex flex-col justify-between gap-5 md:flex-row md:items-center">
                <div class="min-w-0">
                  <div class="flex flex-wrap items-center gap-3">
                    <h2 class="truncate text-lg font-bold">{{ ticketRequest.full_name }}</h2>
                    <span
                      class="rounded-full border px-3 py-1 text-xs font-semibold uppercase"
                      :class="statusClass(ticketRequest.status)"
                    >
                      {{ ticketRequest.status }}
                    </span>
                  </div>
                  <div class="mt-3 grid gap-x-8 gap-y-2 text-sm text-slate-300 sm:grid-cols-2">
                    <p><i class="fa fa-envelope mr-2 text-[#EE0034]"></i>{{ ticketRequest.email }}</p>
                    <p><i class="fa fa-phone mr-2 text-[#EE0034]"></i>{{ ticketRequest.phone }}</p>
                    <p>
                      <i class="fa fa-ticket mr-2 text-[#EE0034]"></i>
                      {{ ticketRequest.quantity }} tiket
                    </p>
                    <p>
                      <i class="fa fa-clock-o mr-2 text-[#EE0034]"></i>
                      {{ formatDateTime(ticketRequest.created_at) }}
                    </p>
                  </div>
                  <p
                    v-if="ticketRequest.rejection_reason"
                    class="mt-3 rounded-xl bg-red-500/10 px-3 py-2 text-sm text-red-200"
                  >
                    Alasan: {{ ticketRequest.rejection_reason }}
                  </p>
                </div>

                <div v-if="ticketRequest.status === 'pending'" class="flex shrink-0 gap-3">
                  <button
                    :disabled="processingId === ticketRequest.id"
                    class="rounded-full border border-red-400/40 px-5 py-2.5 text-sm font-semibold text-red-300 transition hover:bg-red-500/10 disabled:opacity-50"
                    @click="rejectRequest(ticketRequest)"
                  >
                    Tolak
                  </button>
                  <button
                    :disabled="processingId === ticketRequest.id"
                    class="rounded-full bg-emerald-600 px-5 py-2.5 text-sm font-semibold transition hover:bg-emerald-500 disabled:opacity-50"
                    @click="approveRequest(ticketRequest)"
                  >
                    {{ processingId === ticketRequest.id ? 'Memproses...' : 'Setujui' }}
                  </button>
                </div>
              </div>
            </article>
          </div>
        </section>
      </template>
    </div>
  </main>
</template>
