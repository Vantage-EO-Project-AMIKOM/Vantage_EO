<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'
import { ticketApi } from '@/lib/http'
import { useAuthStore } from '@/stores/auth'

import heroBgImport from '@/components/img/bg/hero-bg.jpg'

const authStore = useAuthStore()
const tickets = ref([])
const isLoading = ref(true)
const searchQuery = ref('')
const selectedTicket = ref(null)
const loadError = ref('')

const heroBg = heroBgImport

// State Parallax & Animasi Awal (Pop Up)
const parallaxOffset = ref(0)
const isPopUpActive = ref(false)

// State untuk mendeteksi arah scroll
const lastScrollY = ref(0)
const scrollDirection = ref('down')

const handleScroll = () => {
  // 1. Efek Parallax
  parallaxOffset.value = window.scrollY * 0.4

  // 2. Deteksi Arah Scroll
  if (window.scrollY > lastScrollY.value) {
    scrollDirection.value = 'down'
  } else {
    scrollDirection.value = 'up'
  }
  lastScrollY.value = window.scrollY
}

const observer = ref(null)

// Pengecekan status Admin
const isAdmin = computed(() => {
  return authStore.isAdmin || authStore.user?.role === 'admin'
})

// Function mengambil data tiket dari backend
const fetchMyTickets = async () => {
  isLoading.value = true
  loadError.value = ''
  try {
    const response = await ticketApi.get('/my-tickets')
    tickets.value = response.data?.data || response.data || []
  } catch (error) {
    console.error('Gagal mengambil data tiket:', error)
    tickets.value = []
    loadError.value = 'Tiket gagal dimuat. Silakan coba lagi.'
  } finally {
    isLoading.value = false
  }
}

// Filter Pencarian
const filteredTickets = computed(() => {
  if (!searchQuery.value) return tickets.value
  const query = searchQuery.value.toLowerCase()
  return tickets.value.filter(ticket => {
    const title = (ticket.event_title || ticket.event?.title || '').toLowerCase()
    const code = (ticket.ticket_code || '').toLowerCase()
    return title.includes(query) || code.includes(query)
  })
})

// Badge Status
const getStatusBadge = (status) => {
  switch (status?.toLowerCase()) {
    case 'used':
      return 'bg-gray-600/90 text-gray-200 border border-gray-500/30'
    case 'cancelled':
      return 'bg-red-600/90 text-white border border-red-500/30'
    default:
      return 'bg-emerald-600/90 text-white border border-emerald-500/30'
  }
}

const openTicketModal = (ticket) => {
  selectedTicket.value = ticket
}

onMounted(() => {
  fetchMyTickets()

  setTimeout(() => {
    isPopUpActive.value = true
  }, 100)

  window.addEventListener('scroll', handleScroll)

  observer.value = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        if (scrollDirection.value === 'down') {
          entry.target.classList.add('show-down')
          entry.target.classList.remove('show-up')
        } else {
          entry.target.classList.add('show-up')
          entry.target.classList.remove('show-down')
        }
      } else {
        entry.target.classList.remove('show-down', 'show-up')
      }
    })
  }, { threshold: 0.1 })

  document.querySelectorAll('.animate-on-scroll').forEach(el => observer.value.observe(el))
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  if (observer.value) observer.value.disconnect()
})
</script>

<template>
  <div class="overflow-x-hidden">
    <!-- HERO SECTION (Disamakan persis dengan Event View) -->
    <section class="w-full h-130 z-10 flex justify-center items-center relative overflow-hidden pt-16">
      <div class="absolute inset-0 bg-black/60">
        <img :src="heroBg" alt="Event crowd" draggable="false"
          class="w-full h-full object-cover brightness-[0.4] saturate-50 absolute top-0 left-0 opacity-100 bg-size-cover animate-hero-pop"
          :style="{ transform: `translateY(${parallaxOffset}px)` }">
      </div>
      <!-- Konten teks utama menggunakan animasi Pop Up -->
      <div class="w-full max-w-3/4 mx-auto z-20 text-white text-shadow-lg/30 shadow-black transition-all duration-1000 transform scale-90 opacity-0"
           :class="{ 'scale-100 opacity-100': isPopUpActive }">
        <h1 class="capitalize text-7xl font-bold mb-4 drop-shadow-md">My Ticket Event View</h1>
        <p class="text-xl font-normal text-white">Discover global tech conferences, hands-on workshops,</p>
        <p class="text-xl font-normal text-white">and networking opportunities that shape the future.</p>
      </div>
    </section>

    <!-- MAIN CONTENT (Container Melayang Berbentuk Card Besar) -->
    <main class="relative z-20 mx-auto mt-6 mb-20 w-[calc(100%-2rem)] max-w-6xl rounded-[3rem] bg-[#2B3B4C] px-4 py-12 shadow-[0_0_80px_rgba(0,0,0,0.15)] sm:px-8 md:px-12">
      
      <!-- Sub-Header & Search Input -->
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 pb-6 border-b border-gray-700/60">
        <div>
          <h2 class="text-2xl md:text-3xl font-bold text-white tracking-tight">
            {{ isAdmin ? 'Semua Transaksi Tiket (Admin)' : 'Tiket Saya' }}
          </h2>
          <p class="text-gray-400 mt-1 text-sm sm:text-base">
            {{ isAdmin ? 'Daftar seluruh tiket yang dibeli oleh semua pengguna.' : 'Daftar tiket event yang telah Anda miliki dan pesan.' }}
          </p>
        </div>

        <!-- Search Bar -->
        <div class="relative w-full md:w-80">
          <input 
            v-model="searchQuery"
            type="text" 
            placeholder="Cari event atau kode tiket..." 
            class="w-full bg-[#17202A] border border-gray-700/80 rounded-full py-3 pl-11 pr-4 text-white text-sm placeholder-gray-400 focus:outline-none focus:border-[#EE0034] transition-all shadow-inner"
          />
          <i class="fa fa-search absolute left-4 top-3.5 text-gray-400 text-sm"></i>
        </div>
      </div>

      <!-- State: Loading -->
      <div v-if="isLoading" class="flex flex-col items-center justify-center py-20">
        <div class="w-12 h-12 border-4 border-[#EE0034] border-t-transparent rounded-full animate-spin"></div>
        <p class="text-gray-400 mt-4 text-sm animate-pulse">Memuat data tiket Anda...</p>
      </div>

      <div v-else-if="loadError" class="bg-red-950/40 border border-red-500/40 rounded-2xl p-8 text-center my-6">
        <p class="text-red-200 mb-4">{{ loadError }}</p>
        <button type="button" class="bg-[#EE0034] hover:bg-[#c9002c] text-white px-6 py-2.5 rounded-full" @click="fetchMyTickets">
          Coba Lagi
        </button>
      </div>

      <!-- State: Empty -->
      <div v-else-if="filteredTickets.length === 0" class="bg-[#17202A]/70 backdrop-blur-md rounded-3xl p-10 sm:p-14 text-center border border-gray-700/50 my-6 shadow-xl">
        <div class="w-20 h-20 bg-gray-800/90 rounded-full flex items-center justify-center mx-auto mb-5 text-[#EE0034] shadow-inner">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 001 1.71l.71.71a1 1 0 010 1.41l-.71.71A2 2 0 003 14v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 00-1-1.71l-.71-.71a1 1 0 010-1.41l.71-.71A2 2 0 0021 10V7a2 2 0 00-2-2H5z" />
          </svg>
        </div>
        <h3 class="text-2xl font-bold text-white mb-2">
          {{ searchQuery ? 'Tiket Tidak Ditemukan' : 'Belum Ada Tiket' }}
        </h3>
        <p class="text-gray-400 max-w-md mx-auto mb-8 text-sm sm:text-base leading-relaxed">
          {{ searchQuery ? 'Tidak ada tiket yang cocok dengan kata kunci pencarian Anda.' : (isAdmin ? 'Belum ada transaksi tiket tercatat di dalam sistem.' : 'Anda belum membeli tiket event apapun. Jelajahi event menarik dan pesan tiketmu sekarang!') }}
        </p>
        <RouterLink 
          v-if="!searchQuery" 
          to="/event" 
          class="inline-flex items-center justify-center bg-[#EE0034] hover:bg-[#c9002c] text-white px-8 py-3 rounded-full text-sm font-semibold transition-all shadow-lg hover:scale-105"
        >
          Cari Event Sekarang
        </RouterLink>
      </div>

      <!-- State: Display List Tickets -->
      <div v-else class="space-y-6">
        <div 
          v-for="ticket in filteredTickets" 
          :key="ticket.id"
          class="bg-[#17202A] rounded-2xl overflow-hidden border border-gray-700/60 hover:border-[#EE0034]/60 transition-all duration-300 flex flex-col md:flex-row shadow-lg group"
        >
          <!-- Gambar Event -->
          <div class="md:w-1/3 h-52 md:h-auto relative overflow-hidden bg-gray-900 shrink-0">
            <img 
              :src="ticket.event_image || ticket.event?.image || '/placeholder-event.jpg'" 
              :alt="ticket.event_title || ticket.event?.title" 
              class="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              @error="(e) => e.target.src = 'https://via.placeholder.com/400x300?text=Vantage+Ticket'"
            />
            <span 
              class="absolute top-3 left-3 text-xs font-semibold px-3 py-1.5 rounded-full text-white shadow-md backdrop-blur-md uppercase tracking-wide"
              :class="getStatusBadge(ticket.status)"
            >
              {{ ticket.status || 'Active' }}
            </span>
          </div>

          <!-- Detail Tiket -->
          <div class="p-6 flex-1 flex flex-col justify-between">
            <div>
              <div class="flex flex-wrap items-center justify-between gap-2 mb-3">
                <span class="text-xs font-mono text-gray-400 tracking-wider">
                  KODE: <strong class="text-[#EE0034] font-semibold">{{ ticket.ticket_code || `#TCK-${ticket.id}` }}</strong>
                </span>
                <span v-if="isAdmin" class="text-xs bg-[#2B3B4C] text-amber-400 px-3 py-1 rounded-full border border-amber-400/20 shadow-sm">
                  <i class="fa fa-user mr-1.5"></i> Pembeli: {{ ticket.user_name || ticket.user?.name || 'User' }}
                </span>
              </div>

              <h2 class="text-xl sm:text-2xl font-bold text-white capitalize group-hover:text-[#EE0034] transition-colors mb-3 leading-snug">
                {{ ticket.event_title || ticket.event?.title || 'Nama Event Tidak Tersedia' }}
              </h2>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-sm text-gray-300 mb-5 bg-[#2B3B4C]/50 p-3.5 rounded-xl border border-gray-800/60">
                <div class="flex items-center gap-2.5">
                  <i class="fa fa-calendar text-[#EE0034] w-4 text-center"></i>
                  <span>{{ ticket.event_date || ticket.event?.date || '-' }}</span>
                </div>
                <div class="flex items-center gap-2.5">
                  <i class="fa fa-clock-o text-[#EE0034] w-4 text-center"></i>
                  <span>{{ ticket.event_time || '19:00 WIB' }}</span>
                </div>
                <div class="flex items-center gap-2.5 sm:col-span-2">
                  <i class="fa fa-map-marker text-[#EE0034] w-4 text-center shrink-0"></i>
                  <span class="line-clamp-1">{{ ticket.event_location || ticket.event?.location || '-' }}</span>
                </div>
              </div>
            </div>

            <!-- Bottom Card Action -->
            <div class="pt-4 border-t border-gray-700/60 flex flex-wrap items-center justify-between gap-4">
              <div>
                <p class="text-xs text-gray-400 font-medium">Tipe Tiket & Qty</p>
                <p class="text-sm font-bold text-white mt-0.5">
                  {{ ticket.ticket_type || 'VIP Pass' }} <span class="text-gray-400 font-normal">({{ ticket.quantity || 1 }}x)</span>
                </p>
              </div>

              <div>
                <button 
                  @click="openTicketModal(ticket)"
                  class="px-6 py-2.5 bg-[#2B3B4C] hover:bg-[#EE0034] border border-gray-600/80 hover:border-[#EE0034] text-white rounded-full text-sm font-semibold transition-all duration-300 cursor-pointer flex items-center gap-2 shadow-md hover:scale-105"
                >
                  <i class="fa fa-qrcode text-base"></i>
                  <span>Lihat E-Ticket</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </main>

    <!-- MODAL POPUP E-TICKET -->
    <div 
      v-if="selectedTicket" 
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md transition-all"
      @click.self="selectedTicket = null"
    >
      <div class="bg-[#2B3B4C] border border-gray-700/80 w-full max-w-md rounded-3xl p-6 sm:p-8 text-white text-center relative shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        
        <button 
          @click="selectedTicket = null" 
          class="absolute top-5 right-5 text-gray-400 hover:text-white w-8 h-8 rounded-full bg-gray-800/80 flex items-center justify-center transition cursor-pointer"
        >
          <i class="fa fa-times text-sm"></i>
        </button>

        <h3 class="text-2xl font-bold mb-1 tracking-tight">E-Ticket Vantage</h3>
        <p class="text-xs text-gray-400 mb-6">Tunjukkan QR Code ini kepada petugas di lokasi acara.</p>

        <!-- QR Code Container -->
        <div class="bg-white p-5 rounded-2xl inline-block mb-6 shadow-inner border border-gray-200">
          <img 
            :src="`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${selectedTicket.ticket_code || selectedTicket.id}`" 
            alt="QR Ticket Code"
            class="w-44 h-44 mx-auto object-contain"
          />
        </div>

        <div class="space-y-2.5 text-left bg-[#17202A] p-4 sm:p-5 rounded-2xl text-sm mb-6 border border-gray-800 shadow-inner">
          <div class="flex justify-between items-center">
            <span class="text-gray-400 text-xs">Kode Tiket:</span>
            <span class="font-mono text-[#EE0034] font-bold text-xs tracking-wider">{{ selectedTicket.ticket_code || `#TCK-${selectedTicket.id}` }}</span>
          </div>
          <div class="flex justify-between items-center">
            <span class="text-gray-400 text-xs">Event:</span>
            <span class="font-semibold text-white truncate max-w-52.5 text-right">{{ selectedTicket.event_title || selectedTicket.event?.title }}</span>
          </div>
          <div class="flex justify-between items-center">
            <span class="text-gray-400 text-xs">Pemilik Tiket:</span>
            <span class="font-semibold text-white truncate max-w-52.5 text-right">{{ selectedTicket.user_name || authStore.user?.name || 'User' }}</span>
          </div>
        </div>

        <button 
          @click="selectedTicket = null"
          class="w-full bg-[#EE0034] hover:bg-[#c9002c] text-white py-3.5 rounded-full font-semibold transition-all shadow-lg hover:shadow-red-900/30 cursor-pointer"
        >
          Tutup E-Ticket
        </button>
      </div>
    </div>

  </div>
</template>

<style scoped>
/* ==========================================
   ANIMASI HERO POP & SCROLL
   ========================================== */
@keyframes heroPop {
  0% {
    transform: scale(1.15);
    filter: brightness(0.1);
  }
  100% {
    filter: brightness(0.4) saturate-50;
  }
}
.animate-hero-pop {
  animation: heroPop 1.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.animate-on-scroll {
  opacity: 0;
  transform: translateY(60px);
  transition: opacity 0.8s ease, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}

.animate-on-scroll.show-down,
.animate-on-scroll.show-up {
  opacity: 1;
  transform: translateY(0);
}

.animate-on-scroll:not(.show-down):not(.show-up) {
  opacity: 0;
  transform: translateY(-60px);
}

.line-clamp-1 {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  line-clamp: 1;
}
</style>
