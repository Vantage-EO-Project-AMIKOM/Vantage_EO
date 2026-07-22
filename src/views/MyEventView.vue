<template>
  <div class="w-full min-h-screen bg-[#1d2939] pt-28 pb-20 px-4">
    <div class="max-w-6xl mx-auto">
      
      <!-- Header Section -->
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 class="text-3xl md:text-4xl font-bold text-white">
            {{ isAdmin ? 'Kelola Semua Event (Admin)' : 'Event Saya' }}
          </h1>
          <p class="text-gray-400 mt-1">
            {{ isAdmin ? 'Daftar seluruh event yang dibuat oleh semua pengguna.' : 'Daftar event yang Anda buat dan selenggarakan.' }}
          </p>
        </div>

        <!-- Tombol Buat Event Baru -->
        <RouterLink 
          to="/event/create"
          class="inline-flex items-center justify-center gap-2 bg-[#EE0034] hover:bg-[#c9002c] text-white font-medium px-6 py-3 rounded-full transition-all duration-300 shadow-lg hover:scale-105 self-start md:self-auto"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          Buat Event Baru
        </RouterLink>
      </div>

      <!-- State: Loading -->
      <div v-if="isLoading" class="flex flex-col items-center justify-center py-20">
        <div class="w-12 h-12 border-4 border-[#EE0034] border-t-transparent rounded-full animate-spin"></div>
        <p class="text-gray-400 mt-4">Memuat data event...</p>
      </div>

      <div v-else-if="errorMessage" class="bg-red-950/40 border border-red-500/40 rounded-2xl p-8 text-center my-6">
        <p class="text-red-200 mb-4">{{ errorMessage }}</p>
        <button type="button" class="bg-[#EE0034] px-6 py-2.5 rounded-full text-white" @click="fetchMyEvents">
          Coba Lagi
        </button>
      </div>

      <!-- State: Empty (Belum Ada Event) -->
      <div v-else-if="events.length === 0" class="bg-[#2B3B4C] rounded-3xl p-10 text-center border border-gray-700/50 my-10">
        <div class="w-20 h-20 bg-gray-800/80 rounded-full flex items-center justify-center mx-auto mb-4 text-[#EE0034]">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <h3 class="text-xl font-bold text-white mb-2">Belum Ada Event</h3>
        <p class="text-gray-400 max-w-md mx-auto mb-6">
          {{ isAdmin ? 'Belum ada event yang dibuat di sistem ini.' : 'Anda belum membuat event apapun. Mulai buat event pertama Anda sekarang!' }}
        </p>
        <RouterLink 
          v-if="!isAdmin" 
          to="/event/create"
          class="inline-block bg-[#EE0034] hover:bg-[#c9002c] text-white px-6 py-2.5 rounded-full text-sm font-medium transition"
        >
          Buat Event Sekarang
        </RouterLink>
      </div>

      <!-- State: Display Grid Events -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div 
          v-for="event in events" 
          :key="event.id || event.slug"
          class="bg-[#2B3B4C] rounded-2xl overflow-hidden border border-gray-700/50 hover:border-[#EE0034]/50 transition-all duration-300 flex flex-col group shadow-lg"
        >
          <!-- Poster Event -->
          <div class="h-48 w-full overflow-hidden relative bg-gray-800">
            <img
              v-if="event.banner || event.image"
              :src="event.banner || event.image"
              :alt="event.title" 
              class="w-full h-full object-cover group-hover:scale-105 transition duration-300"
              @error="event.banner = null; event.image = null"
            />
            <div
              v-else
              class="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-[#34495E] to-[#17202A] px-6 text-center text-white/70"
            >
              <i class="fa fa-calendar mb-3 text-4xl text-[#EE0034]" aria-hidden="true"></i>
              <span class="line-clamp-2 font-semibold">{{ event.title || 'Vantage Event' }}</span>
            </div>
            <!-- Badge Status / Role Badge jika Admin -->
            <div v-if="isAdmin" class="absolute top-3 right-3 flex gap-2">
              <span class="bg-[#17202A]/90 text-amber-400 text-xs px-3 py-1 rounded-full border border-amber-400/30 backdrop-blur-sm">
                Owner: {{ event.creator_name || (event.creator_id ? `User #${event.creator_id}` : 'Unknown') }}
              </span>
            </div>
          </div>

          <!-- Event Detail Info -->
          <div class="p-5 flex-1 flex flex-col justify-between">
            <div>
              <h2 class="text-xl font-bold text-white capitalize group-hover:text-[#EE0034] transition line-clamp-1 mb-2">
                {{ event.title || event.name }}
              </h2>
              
              <div class="flex items-center text-gray-300 text-sm mb-2">
                <i class="fa fa-calendar text-[#EE0034] mr-2"></i>
                <span>{{ formatDate(event.event_date || event.date || event.start_date) }}</span>
              </div>

              <div class="flex items-center text-gray-300 text-sm mb-4">
                <i class="fa fa-map-marker text-[#EE0034] mr-2"></i>
                <span class="line-clamp-1">{{ event.venue?.name || event.location || 'Lokasi belum diatur' }}</span>
              </div>

              <p class="text-gray-400 text-sm line-clamp-2 mb-4">
                {{ event.description || 'Tidak ada deskripsi.' }}
              </p>
            </div>

            <!-- Action Buttons (Detail, Delete) -->
            <div class="pt-4 border-t border-gray-700/60 flex items-center justify-between gap-2">
              <RouterLink 
                :to="`/event/${event.slug || event.id}`"
                class="text-sm text-gray-300 hover:text-white flex items-center gap-1 transition"
              >
                <span>Lihat Detail</span>
                <i class="fa fa-arrow-right text-xs"></i>
              </RouterLink>

              <div class="flex items-center gap-2">
                <RouterLink
                  :to="`/event/${event.id}/edit`"
                  title="Edit Event"
                  class="p-2 text-gray-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition"
                >
                  <i class="fa fa-pencil"></i>
                </RouterLink>
                <button 
                  @click="deleteEvent(event.id)" 
                  title="Hapus Event" 
                  class="p-2 text-gray-400 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition cursor-pointer"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { eventApi } from '@/lib/http'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const events = ref([])
const isLoading = ref(true)
const errorMessage = ref('')

// Status Admin dari Auth Store
const isAdmin = computed(() => authStore.isAdmin || authStore.user?.role === 'admin')

// Ambil Data Event Khusus User / Semua Event jika Admin
const fetchMyEvents = async () => {
  isLoading.value = true
  errorMessage.value = ''
  try {
    // Memanggil API Event Service
    const response = await eventApi.get('/my-events')
    events.value = response.data?.data || response.data || []
  } catch (error) {
    console.error('Gagal mengambil data event:', error)
    events.value = []
    errorMessage.value = error.response?.data?.message || 'Gagal memuat event. Silakan coba lagi.'
  } finally {
    isLoading.value = false
  }
}

const formatDate = (value) => {
  if (!value) return 'Tanggal belum diatur'
  return new Intl.DateTimeFormat('id-ID', { dateStyle: 'medium' }).format(new Date(value))
}

// Menghapus Event
const deleteEvent = async (eventId) => {
  if (confirm('Apakah Anda yakin ingin menghapus event ini? Action ini tidak dapat dibatalkan.')) {
    try {
      await eventApi.delete(`/events/${eventId}`)
      events.value = events.value.filter(e => e.id !== eventId)
      alert('Event berhasil dihapus!')
    } catch (error) {
      console.error('Gagal menghapus event:', error)
      alert('Gagal menghapus event. Silakan coba lagi.')
    }
  }
}

onMounted(() => {
  fetchMyEvents()
})
</script>

<style scoped>
.line-clamp-1 {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  line-clamp: 1;
}

.line-clamp-2 {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  line-clamp: 2;
}
</style>
