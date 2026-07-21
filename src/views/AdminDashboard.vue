<template>
  <div class="dashboard-wrapper">
    <!-- Sidebar -->
    <aside class="sidebar">
      <div class="sidebar-brand">
        <div class="brand-icon">V</div>
        <div>
          <div class="brand-name">Vantage</div>
          <div class="brand-sub">EVENT ORGANIZER</div>
        </div>
      </div>

      <!-- Single Menu Group -->
      <div class="menu-section">
        <div class="menu-label">MENU UTAMA</div>
        <button 
          class="nav-item" 
          :class="{ active: currentTab === 'dashboard' }" 
          @click="currentTab = 'dashboard'"
        >
          <i class="fa fa-th-large"></i> Dashboard
        </button>
        <button 
          class="nav-item" 
          :class="{ active: currentTab === 'events' }" 
          @click="currentTab = 'events'"
        >
          <i class="fa fa-calendar"></i> Event
          <span class="badge">{{ eventsList.length }}</span>
        </button>
        <button 
          class="nav-item" 
          :class="{ active: currentTab === 'tickets' }" 
          @click="currentTab = 'tickets'"
        >
          <i class="fa fa-ticket"></i> Tiket
          <span class="badge">{{ ticketsList.length }}</span>
        </button>
      </div>

      <div class="sidebar-footer">
        <div class="admin-avatar">{{ (user?.name || 'AK').slice(0, 2).toUpperCase() }}</div>
        <div class="admin-info">
          <div class="admin-name">{{ user?.name || 'Admin Vantage' }}</div>
          <div class="admin-role">{{ user?.role === 'admin' ? 'Super Admin' : (user?.role || 'Admin') }}</div>
        </div>
        <button @click="handleLogout" class="logout-icon" title="Logout">
          <i class="fa fa-sign-out"></i>
        </button>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="main-content">
      <!-- Top Bar -->
      <div class="topbar">
        <div>
          <h1 class="page-title">
            {{ currentTab === 'dashboard' ? 'Dashboard Overview' : currentTab === 'events' ? 'Manajemen Event' : 'Manajemen Tiket' }}
          </h1>
          <p class="page-date">{{ todayLabel }}</p>
        </div>
        <div class="topbar-actions">
          <button v-if="currentTab === 'events'" class="btn-primary" @click="openEventModal()">
            <i class="fa fa-plus"></i> Tambah Event
          </button>
          <button v-if="currentTab === 'tickets'" class="btn-primary" @click="openTicketModal()">
            <i class="fa fa-plus"></i> Tambah Tiket
          </button>
        </div>
      </div>

      <div v-if="loadError" class="load-error-banner">{{ loadError }}</div>

      <!-- ================= TAB 1: DASHBOARD ================= -->
      <div v-if="currentTab === 'dashboard'" class="tab-content">
        <!-- Stats Cards -->
        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-icon red">
              <i class="fa fa-calendar-check-o"></i>
            </div>
            <div class="stat-info">
              <div class="stat-number">{{ loading ? '—' : totalEvents }}</div>
              <div class="stat-label">Total Event</div>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon blue">
              <i class="fa fa-users"></i>
            </div>
            <div class="stat-info">
              <div class="stat-number">{{ loading ? '—' : totalParticipants.toLocaleString('id-ID') }}</div>
              <div class="stat-label">Total Peserta</div>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon green">
              <i class="fa fa-ticket"></i>
            </div>
            <div class="stat-info">
              <div class="stat-number">{{ loading ? '—' : totalTicketsSold.toLocaleString('id-ID') }}</div>
              <div class="stat-label">Tiket Terjual</div>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon yellow">
              <i class="fa fa-money"></i>
            </div>
            <div class="stat-info">
              <div class="stat-number">{{ loading ? '—' : formatRupiah(totalRevenue) }}</div>
              <div class="stat-label">Total Pendapatan</div>
            </div>
          </div>
        </div>

        <!-- Charts Row -->
        <div class="charts-row">
          <div class="chart-card wide">
            <div class="card-header">
              <span class="card-title">Event Bulanan</span>
            </div>
            <div class="bar-chart">
              <div class="y-axis">
                <span>{{ maxMonthlyEvents }}</span>
                <span>0</span>
              </div>
              <div class="bars">
                <div class="bar-group" v-for="(item, index) in barData" :key="item.month || index">
                  <div class="bar" :style="{ height: barHeight(item.count), background: index === barData.length - 1 ? '#EE0034' : '#FECDD3' }"></div>
                  <span class="bar-label">{{ item.label || item.month }}</span>
                </div>
              </div>
            </div>
          </div>

          <div class="chart-card">
            <div class="card-header">
              <span class="card-title">Kategori Event</span>
              <span class="card-link">{{ categories.length }} kategori</span>
            </div>
            <div class="donut-wrapper">
              <div class="donut-ring" :style="{ background: categoryGradient }"></div>
            </div>
            <div class="donut-legend">
              <div class="legend-item" v-for="(category, index) in categories" :key="category.id || index">
                <span class="legend-dot" :style="{ background: categoryColors[index % categoryColors.length] }"></span>
                <span class="legend-label">{{ category.name }}</span>
                <span class="legend-value">{{ category.percentage }}%</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Upcoming Events Summary -->
        <div class="table-card">
          <div class="card-header">
            <span class="card-title">Jadwal Event Mendatang</span>
            <button class="card-link-btn" @click="currentTab = 'events'">Kelola Event →</button>
          </div>
          <div class="event-list">
            <div class="event-item" v-for="event in upcomingEvents" :key="event.id">
              <div class="event-date">
                <div class="event-day">{{ event.day }}</div>
                <div class="event-month">{{ event.month }}</div>
              </div>
              <div class="event-info">
                <div class="event-name">{{ event.name }}</div>
                <div class="event-meta">
                  <i class="fa fa-map-marker"></i> {{ event.location }}
                </div>
              </div>
              <span class="event-status" :class="event.statusClass">{{ event.status }}</span>
            </div>
            <div v-if="!upcomingEvents.length" class="empty-state">Belum ada event mendatang.</div>
          </div>
        </div>
      </div>

      <!-- ================= TAB 2: MANAGEMENT EVENT (CRUD) ================= -->
      <div v-else-if="currentTab === 'events'" class="tab-content">
        <div class="table-card">
          <div class="card-header table-actions-bar">
            <input 
              v-model="eventSearchQuery" 
              type="text" 
              placeholder="Cari event..." 
              class="search-input"
            />
            <div class="badge-info">Total: {{ filteredEvents.length }} Event</div>
          </div>

          <table class="data-table">
            <thead>
              <tr>
                <th>Judul Event</th>
                <th>Kategori</th>
                <th>Tanggal</th>
                <th>Harga</th>
                <th>Kuota</th>
                <th>Status</th>
                <th class="text-right">Aksi</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in filteredEvents" :key="item.id">
                <td>
                  <div class="font-bold">{{ item.title }}</div>
                  <div class="sub-text"><i class="fa fa-map-marker"></i> {{ item.venue?.name || item.location || 'Venue TBD' }}</div>
                </td>
                <td>
                  <span class="badge-category">{{ item.category || 'General' }}</span>
                </td>
                <td>{{ item.event_date ? formatDate(item.event_date) : '-' }}</td>
                <td>{{ formatRupiah(item.price) }}</td>
                <td>{{ item.quota || 0 }} Peserta</td>
                <td>
                  <span class="event-status" :class="item.status === 'published' ? 'status-green' : 'status-blue'">
                    {{ item.status || 'draft' }}
                  </span>
                </td>
                <td class="text-right actions-cell">
                  <button class="btn-icon edit" @click="openEventModal(item)" title="Edit">
                    <i class="fa fa-pencil"></i>
                  </button>
                  <button class="btn-icon delete" @click="deleteEvent(item.id)" title="Hapus">
                    <i class="fa fa-trash"></i>
                  </button>
                </td>
              </tr>
              <tr v-if="!filteredEvents.length">
                <td colspan="7" class="empty-state">Data event tidak ditemukan.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- ================= TAB 3: MANAGEMENT TIKET (CRUD) ================= -->
      <div v-else-if="currentTab === 'tickets'" class="tab-content">
        <div class="table-card">
          <div class="card-header table-actions-bar">
            <input 
              v-model="ticketSearchQuery" 
              type="text" 
              placeholder="Cari tiket / nama pemesan..." 
              class="search-input"
            />
            <div class="badge-info">Total: {{ filteredTickets.length }} Tiket</div>
          </div>

          <table class="data-table">
            <thead>
              <tr>
                <th>ID Tiket</th>
                <th>Event</th>
                <th>Jumlah (Qty)</th>
                <th>Total Bayar</th>
                <th>Status</th>
                <th class="text-right">Aksi</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="t in filteredTickets" :key="t.id">
                <td class="font-mono">#{{ t.id }}</td>
                <td>
                  <div class="font-bold">{{ getEventTitle(t.event_id) }}</div>
                  <div class="sub-text">Event ID: {{ t.event_id }}</div>
                </td>
                <td>{{ t.quantity || 1 }} Tiket</td>
                <td>{{ formatRupiah(t.amount) }}</td>
                <td>
                  <span class="event-status status-green">Terbayar</span>
                </td>
                <td class="text-right actions-cell">
                  <button class="btn-icon edit" @click="openTicketModal(t)" title="Edit">
                    <i class="fa fa-pencil"></i>
                  </button>
                  <button class="btn-icon delete" @click="deleteTicket(t.id)" title="Hapus">
                    <i class="fa fa-trash"></i>
                  </button>
                </td>
              </tr>
              <tr v-if="!filteredTickets.length">
                <td colspan="6" class="empty-state">Data tiket tidak ditemukan.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>

    <!-- ================= MODAL FORM EVENT ================= -->
    <div v-if="showEventModal" class="modal-backdrop" @click.self="showEventModal = false">
      <div class="modal-card">
        <h3 class="modal-title">{{ isEditingEvent ? 'Edit Event' : 'Tambah Event Baru' }}</h3>
        <form @submit.prevent="saveEvent">
          <div class="form-group">
            <label>Judul Event</label>
            <input v-model="eventForm.title" type="text" required class="form-control" placeholder="Nama event..." />
          </div>
          <div class="form-row">
            <div class="form-group">
              <label>Kategori</label>
              <input v-model="eventForm.category" type="text" required class="form-control" placeholder="Concert, Festival, dll." />
            </div>
            <div class="form-group">
              <label>Lokasi / Venue</label>
              <input v-model="eventForm.location" type="text" required class="form-control" placeholder="Lokasi event..." />
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label>Tanggal Event</label>
              <input v-model="eventForm.event_date" type="date" required class="form-control" />
            </div>
            <div class="form-group">
              <label>Status</label>
              <select v-model="eventForm.status" class="form-control">
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label>Harga (Rp)</label>
              <input v-model.number="eventForm.price" type="number" required min="0" class="form-control" />
            </div>
            <div class="form-group">
              <label>Kuota</label>
              <input v-model.number="eventForm.quota" type="number" required min="1" class="form-control" />
            </div>
          </div>
          <div class="modal-actions">
            <button type="button" class="btn-secondary" @click="showEventModal = false">Batal</button>
            <button type="submit" class="btn-primary">Simpan</button>
          </div>
        </form>
      </div>
    </div>

    <!-- ================= MODAL FORM TIKET ================= -->
    <div v-if="showTicketModal" class="modal-backdrop" @click.self="showTicketModal = false">
      <div class="modal-card">
        <h3 class="modal-title">{{ isEditingTicket ? 'Edit Tiket' : 'Tambah Tiket Baru' }}</h3>
        <form @submit.prevent="saveTicket">
          <div class="form-group">
            <label>Pilih Event</label>
            <select v-model="ticketForm.event_id" required class="form-control">
              <option value="" disabled>-- Pilih Event --</option>
              <option v-for="e in eventsList" :key="e.id" :value="e.id">
                {{ e.title }}
              </option>
            </select>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label>Jumlah Tiket</label>
              <input v-model.number="ticketForm.quantity" type="number" required min="1" class="form-control" />
            </div>
            <div class="form-group">
              <label>Total Harga (Rp)</label>
              <input v-model.number="ticketForm.amount" type="number" required min="0" class="form-control" />
            </div>
          </div>
          <div class="modal-actions">
            <button type="button" class="btn-secondary" @click="showTicketModal = false">Batal</button>
            <button type="submit" class="btn-primary">Simpan</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { eventApi, ticketApi } from '@/lib/http'

const router = useRouter()
const user = ref(JSON.parse(localStorage.getItem('user')))

// Navigation & State
const currentTab = ref('dashboard')
const loading = ref(true)
const loadError = ref('')

// Default initial events matching the design cards
const defaultEvents = [
  {
    id: 1,
    title: 'Vantage Concert Night',
    category: 'Concert',
    event_date: '2026-08-18',
    location: 'Yogyakarta Convention',
    venue: { name: 'Yogyakarta Convention' },
    price: 150000,
    quota: 500,
    status: 'published',
    image: './../components/img/bg/crsl-land.jpg'
  },
  {
    id: 2,
    title: 'Creative Innovation Summit',
    category: 'Business',
    event_date: '2026-09-26',
    location: 'The Grand Hall',
    venue: { name: 'The Grand Hall' },
    price: 250000,
    quota: 300,
    status: 'published',
    image: './../components/img/bg/hero-bg.jpg'
  },
  {
    id: 3,
    title: 'Future of AI Workshop',
    category: 'Workshop',
    event_date: '2026-10-12',
    location: 'Bandung Tech Hub',
    venue: { name: 'Bandung Tech Hub' },
    price: 100000,
    quota: 150,
    status: 'published',
    image: './../components/img/bg/crsl-land.jpg'
  },
  {
    id: 4,
    title: 'Digital Creators Festival',
    category: 'Festival',
    event_date: '2026-11-03',
    location: 'Jakarta Creative District',
    venue: { name: 'Jakarta Creative District' },
    price: 180000,
    quota: 1000,
    status: 'published',
    image: './../components/img/bg/hero-bg.jpg'
  },
  {
    id: 5,
    title: 'Design Systems Summit',
    category: 'Design',
    event_date: '2026-11-18',
    location: 'Surabaya Innovation',
    venue: { name: 'Surabaya Innovation' },
    price: 200000,
    quota: 250,
    status: 'published',
    image: './../components/img/bg/crsl-land.jpg'
  },
  {
    id: 6,
    title: 'Startup Networking Night',
    category: 'Networking',
    event_date: '2026-12-08',
    location: 'Semarang Startup Hub',
    venue: { name: 'Semarang Startup Hub' },
    price: 75000,
    quota: 200,
    status: 'published',
    image: './../components/img/bg/hero-bg.jpg'
  }
]

// Raw Master Data
const eventsList = ref(defaultEvents)
const ticketsList = ref([
  { id: 101, event_id: 1, quantity: 2, amount: 300000 },
  { id: 102, event_id: 2, quantity: 1, amount: 250000 },
  { id: 103, event_id: 4, quantity: 4, amount: 720000 }
])

// Analytics & Dashboard Metrics
const totalEvents = ref(defaultEvents.length)
const totalParticipants = ref(7)
const totalTicketsSold = ref(3)
const totalRevenue = ref(1270000)
const analytics = ref({ 
  monthly_events: [
    { month: 'Jul', count: 2 },
    { month: 'Aug', count: 1 },
    { month: 'Sep', count: 1 },
    { month: 'Oct', count: 1 },
    { month: 'Nov', count: 2 },
    { month: 'Dec', count: 1 }
  ], 
  categories: [
    { name: 'Concert', percentage: 20 },
    { name: 'Business', percentage: 15 },
    { name: 'Workshop', percentage: 15 },
    { name: 'Festival', percentage: 20 },
    { name: 'Design', percentage: 15 },
    { name: 'Networking', percentage: 15 }
  ] 
})
const categoryColors = ['#EE0034', '#3B82F6', '#22C55E', '#F97316', '#8B5CF6', '#EC4899']
const todayLabel = new Intl.DateTimeFormat('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }).format(new Date())

// Search Filters
const eventSearchQuery = ref('')
const ticketSearchQuery = ref('')

// Computed Helpers Dashboard
const monthlyEvents = computed(() => Array.isArray(analytics.value?.monthly_events) ? analytics.value.monthly_events : [])
const categories = computed(() => Array.isArray(analytics.value?.categories) ? analytics.value.categories : [])
const maxMonthlyEvents = computed(() => Math.max(1, ...monthlyEvents.value.map((item) => item.count)))
const barData = computed(() => monthlyEvents.value.slice(-6))

const categoryGradient = computed(() => {
  if (!categories.value.length) return '#E5E7EB'
  let offset = 0
  const parts = categories.value.map((category, index) => {
    const end = offset + category.percentage
    const part = `${categoryColors[index % categoryColors.length]} ${offset}% ${end}%`
    offset = end
    return part
  })
  return `conic-gradient(${parts.join(', ')})`
})

const upcomingEvents = computed(() => {
  return [...eventsList.value]
    .filter((e) => e.event_date)
    .sort((a, b) => new Date(a.event_date) - new Date(b.event_date))
    .slice(0, 5)
    .map((e) => {
      const date = new Date(e.event_date)
      return {
        id: e.id,
        day: date.getDate().toString().padStart(2, '0'),
        month: date.toLocaleDateString('id-ID', { month: 'short' }).toUpperCase(),
        name: e.title,
        location: `${e.venue?.name || e.location || 'Venue TBD'} · ${e.quota || 0} kuota`,
        status: e.status ?? 'draft',
        statusClass: e.status === 'published' ? 'status-green' : 'status-blue',
      }
    })
})

// Filtered Tables
const filteredEvents = computed(() => {
  if (!eventSearchQuery.value) return eventsList.value
  const q = eventSearchQuery.value.toLowerCase()
  return eventsList.value.filter(e => 
    e.title?.toLowerCase().includes(q) || 
    e.category?.toLowerCase().includes(q) ||
    e.location?.toLowerCase().includes(q) ||
    e.venue?.name?.toLowerCase().includes(q)
  )
})

const filteredTickets = computed(() => {
  if (!ticketSearchQuery.value) return ticketsList.value
  const q = ticketSearchQuery.value.toLowerCase()
  return ticketsList.value.filter(t => {
    const eventName = getEventTitle(t.event_id).toLowerCase()
    return String(t.id).includes(q) || eventName.includes(q)
  })
})

// General Helpers
function formatRupiah(value) {
  return 'Rp ' + Number(value || 0).toLocaleString('id-ID')
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
}

function getEventTitle(eventId) {
  const ev = eventsList.value.find(e => e.id === Number(eventId))
  return ev ? ev.title : `Event #${eventId}`
}

function barHeight(count) {
  return `${Math.max(6, (count / maxMonthlyEvents.value) * 100)}%`
}

// Data Fetching
async function loadDashboard() {
  loading.value = true
  loadError.value = ''

  try {
    const [eventsResult, ticketsResult, analyticsResult] = await Promise.allSettled([
      eventApi.get('/events'),
      ticketApi.get('/tickets'),
      eventApi.get('/dashboard/analytics'),
    ])

    const events = eventsResult.status === 'fulfilled' && eventsResult.value.data.data?.length 
      ? eventsResult.value.data.data 
      : defaultEvents

    const tickets = ticketsResult.status === 'fulfilled' && ticketsResult.value.data.data?.length 
      ? ticketsResult.value.data.data 
      : ticketsList.value

    eventsList.value = events
    ticketsList.value = tickets

    totalEvents.value = events.length
    totalTicketsSold.value = tickets.length
    totalParticipants.value = tickets.reduce((sum, t) => sum + (t.quantity || 0), 0)
    totalRevenue.value = tickets.reduce((sum, t) => sum + Number(t.amount || 0), 0)

    if (analyticsResult.status === 'fulfilled' && analyticsResult.value.data?.data) {
      analytics.value = analyticsResult.value.data.data
    }
  } catch (err) {
    loadError.value = 'Menggunakan data lokal event Vantage.'
  } finally {
    loading.value = false
  }
}

onMounted(loadDashboard)

// ================= CRUD EVENT =================
const showEventModal = ref(false)
const isEditingEvent = ref(false)
const eventForm = ref({ id: null, title: '', category: '', location: '', event_date: '', price: 0, quota: 100, status: 'draft' })

function openEventModal(item = null) {
  if (item) {
    isEditingEvent.value = true
    eventForm.value = { 
      ...item, 
      location: item.location || item.venue?.name || '' 
    }
  } else {
    isEditingEvent.value = false
    eventForm.value = { 
      id: Date.now(), 
      title: '', 
      category: 'General', 
      location: '', 
      event_date: new Date().toISOString().slice(0, 10), 
      price: 0, 
      quota: 100, 
      status: 'published' 
    }
  }
  showEventModal.value = true
}

async function saveEvent() {
  const payload = {
    ...eventForm.value,
    venue: { name: eventForm.value.location }
  }

  if (isEditingEvent.value) {
    const idx = eventsList.value.findIndex(e => e.id === payload.id)
    if (idx !== -1) eventsList.value[idx] = payload
    try { await eventApi.put(`/events/${payload.id}`, payload) } catch (e) { console.warn(e) }
  } else {
    eventsList.value.unshift(payload)
    try { await eventApi.post('/events', payload) } catch (e) { console.warn(e) }
  }
  totalEvents.value = eventsList.value.length
  showEventModal.value = false
}

async function deleteEvent(id) {
  if (confirm('Yakin ingin menghapus event ini?')) {
    eventsList.value = eventsList.value.filter(e => e.id !== id)
    totalEvents.value = eventsList.value.length
    try { await eventApi.delete(`/events/${id}`) } catch (e) { console.warn(e) }
  }
}

// ================= CRUD TIKET =================
const showTicketModal = ref(false)
const isEditingTicket = ref(false)
const ticketForm = ref({ id: null, event_id: '', quantity: 1, amount: 0 })

function openTicketModal(item = null) {
  if (item) {
    isEditingTicket.value = true
    ticketForm.value = { ...item }
  } else {
    isEditingTicket.value = false
    ticketForm.value = { id: Date.now(), event_id: eventsList.value[0]?.id || '', quantity: 1, amount: 50000 }
  }
  showTicketModal.value = true
}

async function saveTicket() {
  if (isEditingTicket.value) {
    const idx = ticketsList.value.findIndex(t => t.id === ticketForm.value.id)
    if (idx !== -1) ticketsList.value[idx] = { ...ticketForm.value }
    try { await ticketApi.put(`/tickets/${ticketForm.value.id}`, ticketForm.value) } catch (e) { console.warn(e) }
  } else {
    const newObj = { ...ticketForm.value }
    ticketsList.value.unshift(newObj)
    try { await ticketApi.post('/tickets', ticketForm.value) } catch (e) { console.warn(e) }
  }
  totalTicketsSold.value = ticketsList.value.length
  totalParticipants.value = ticketsList.value.reduce((sum, t) => sum + (t.quantity || 0), 0)
  totalRevenue.value = ticketsList.value.reduce((sum, t) => sum + Number(t.amount || 0), 0)
  showTicketModal.value = false
}

async function deleteTicket(id) {
  if (confirm('Yakin ingin menghapus data tiket ini?')) {
    ticketsList.value = ticketsList.value.filter(t => t.id !== id)
    totalTicketsSold.value = ticketsList.value.length
    totalParticipants.value = ticketsList.value.reduce((sum, t) => sum + (t.quantity || 0), 0)
    totalRevenue.value = ticketsList.value.reduce((sum, t) => sum + Number(t.amount || 0), 0)
    try { await ticketApi.delete(`/tickets/${id}`) } catch (e) { console.warn(e) }
  }
}

function handleLogout() {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
  router.push('/login')
}
</script>

<style scoped>
* { box-sizing: border-box; margin: 0; padding: 0; }

.dashboard-wrapper {
  display: flex;
  min-height: 100vh;
  font-family: 'Inter', sans-serif;
  background: #F8F9FA;
}

/* ── Sidebar ── */
.sidebar {
  width: 220px;
  min-width: 220px;
  background: #1C2431;
  display: flex;
  flex-direction: column;
  padding: 1.25rem 0.75rem;
  position: fixed;
  height: 100vh;
  overflow-y: auto;
}

.sidebar-brand {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0 0.5rem 1.5rem;
  border-bottom: 1px solid rgba(255,255,255,0.08);
  margin-bottom: 1rem;
}

.brand-icon {
  width: 36px;
  height: 36px;
  background: #EE0034;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 800;
  font-size: 16px;
}

.brand-name {
  color: white;
  font-weight: 700;
  font-size: 15px;
}

.brand-sub {
  color: rgba(255,255,255,0.4);
  font-size: 9px;
  letter-spacing: 1px;
}

.menu-section {
  margin-bottom: 1.25rem;
}

.menu-label {
  color: rgba(255,255,255,0.3);
  font-size: 10px;
  letter-spacing: 1.5px;
  font-weight: 600;
  padding: 0 0.5rem;
  margin-bottom: 0.4rem;
}

.nav-item {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0.6rem 0.75rem;
  border-radius: 8px;
  color: rgba(255,255,255,0.6);
  background: transparent;
  border: none;
  font-size: 13px;
  transition: all 0.2s;
  cursor: pointer;
  text-align: left;
  margin-bottom: 2px;
}

.nav-item:hover {
  background: rgba(255,255,255,0.08);
  color: white;
}

.nav-item.active {
  background: #EE0034;
  color: white;
}

.nav-item i {
  width: 16px;
  text-align: center;
}

.badge {
  margin-left: auto;
  background: rgba(255,255,255,0.2);
  color: white;
  font-size: 10px;
  padding: 1px 6px;
  border-radius: 999px;
}

.badge-category {
  font-size: 11px;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: 6px;
  background: #F3F4F6;
  color: #374151;
}

.sidebar-footer {
  margin-top: auto;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0.75rem 0.5rem;
  border-top: 1px solid rgba(255,255,255,0.08);
}

.admin-avatar {
  width: 32px;
  height: 32px;
  background: #EE0034;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 11px;
  font-weight: 700;
  flex-shrink: 0;
}

.admin-info { flex: 1; }

.admin-name {
  color: white;
  font-size: 12px;
  font-weight: 600;
}

.admin-role {
  color: rgba(255,255,255,0.4);
  font-size: 10px;
}

.logout-icon {
  background: none;
  border: none;
  color: rgba(255,255,255,0.4);
  cursor: pointer;
  font-size: 14px;
  padding: 4px;
  transition: color 0.2s;
}

.logout-icon:hover { color: #EE0034; }

/* ── Main Content ── */
.main-content {
  margin-left: 220px;
  flex: 1;
  padding: 1.5rem;
  overflow-x: hidden;
}

/* ── Topbar ── */
.topbar {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1.5rem;
}

.page-title {
  font-size: 22px;
  font-weight: 700;
  color: #1C2431;
}

.page-date {
  font-size: 12px;
  color: #9CA3AF;
  margin-top: 2px;
}

.topbar-actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: #EE0034;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}

.btn-primary:hover { background: #d6002f; }

.btn-secondary {
  background: #E5E7EB;
  color: #374151;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
}

/* ── Stats Grid ── */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  margin-bottom: 1.25rem;
}

.stat-card {
  background: white;
  border-radius: 12px;
  padding: 1.25rem;
  display: flex;
  align-items: flex-start;
  gap: 12px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.06);
}

.stat-icon {
  width: 42px;
  height: 42px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  flex-shrink: 0;
}

.stat-icon.red { background: #FEE2E2; color: #EE0034; }
.stat-icon.blue { background: #DBEAFE; color: #3B82F6; }
.stat-icon.green { background: #DCFCE7; color: #22C55E; }
.stat-icon.yellow { background: #FEF9C3; color: #EAB308; }

.stat-number {
  font-size: 22px;
  font-weight: 700;
  color: #1C2431;
}

.stat-label {
  font-size: 12px;
  color: #9CA3AF;
  margin-top: 4px;
}

.load-error-banner {
  background: #FEE2E2;
  color: #B91C1C;
  border-radius: 10px;
  padding: 0.75rem 1rem;
  font-size: 13px;
  margin-bottom: 1.25rem;
}

/* ── Charts Row ── */
.charts-row {
  display: grid;
  grid-template-columns: 1.8fr 1fr;
  gap: 1rem;
  margin-bottom: 1.25rem;
}

.chart-card {
  background: white;
  border-radius: 12px;
  padding: 1.25rem;
  box-shadow: 0 1px 4px rgba(0,0,0,0.06);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.card-title {
  font-size: 14px;
  font-weight: 600;
  color: #1C2431;
}

.card-link {
  font-size: 12px;
  color: #EE0034;
}

.card-link-btn {
  background: none;
  border: none;
  color: #EE0034;
  font-size: 12px;
  cursor: pointer;
}

/* Bar Chart */
.bar-chart {
  display: flex;
  gap: 8px;
  height: 180px;
}

.y-axis {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size: 10px;
  color: #9CA3AF;
  text-align: right;
  padding-bottom: 20px;
  min-width: 30px;
}

.bars {
  display: flex;
  align-items: flex-end;
  gap: 12px;
  flex: 1;
  padding-bottom: 20px;
}

.bar-group {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  flex: 1;
}

.bar {
  width: 100%;
  border-radius: 6px 6px 0 0;
  transition: height 0.3s;
}

.bar-label {
  font-size: 11px;
  color: #9CA3AF;
}

/* Donut Chart */
.donut-wrapper {
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
}

.donut-ring {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  position: relative;
}

.donut-ring::after {
  content: '';
  position: absolute;
  inset: 26px;
  background: white;
  border-radius: 50%;
}

.donut-legend {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
}

.legend-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.legend-label { flex: 1; color: #4B5563; }
.legend-value { font-weight: 600; color: #1C2431; }

/* ── Table & Cards ── */
.table-card {
  background: white;
  border-radius: 12px;
  padding: 1.25rem;
  box-shadow: 0 1px 4px rgba(0,0,0,0.06);
}

.table-actions-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.search-input {
  padding: 0.5rem 0.75rem;
  border: 1px solid #E5E7EB;
  border-radius: 6px;
  font-size: 13px;
  width: 260px;
  outline: none;
}

.search-input:focus {
  border-color: #EE0034;
}

.badge-info {
  font-size: 12px;
  font-weight: 600;
  color: #6B7280;
  background: #F3F4F6;
  padding: 4px 10px;
  border-radius: 999px;
}

/* Data Table */
.data-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  font-size: 13px;
}

.data-table th {
  background: #F9FAFB;
  padding: 0.75rem 1rem;
  color: #6B7280;
  font-weight: 600;
  border-bottom: 1px solid #E5E7EB;
}

.data-table td {
  padding: 0.85rem 1rem;
  border-bottom: 1px solid #F3F4F6;
  color: #1C2431;
}

.font-bold { font-weight: 600; }
.font-mono { font-family: monospace; }
.sub-text { font-size: 11px; color: #9CA3AF; margin-top: 2px; }
.text-right { text-align: right; }

.actions-cell {
  display: flex;
  justify-content: flex-end;
  gap: 6px;
}

.btn-icon {
  border: none;
  width: 28px;
  height: 28px;
  border-radius: 6px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
}

.btn-icon.edit { background: #DBEAFE; color: #2563EB; }
.btn-icon.delete { background: #FEE2E2; color: #DC2626; }

.empty-state {
  text-align: center;
  padding: 2rem;
  color: #9CA3AF;
}

/* Status Badges */
.event-status {
  font-size: 11px;
  font-weight: 600;
  padding: 3px 10px;
  border-radius: 999px;
  display: inline-block;
}

.status-green { background: #DCFCE7; color: #16A34A; }
.status-blue { background: #DBEAFE; color: #2563EB; }

/* Upcoming Event Item list */
.event-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.event-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 10px 0;
  border-bottom: 1px solid #F3F4F6;
}

.event-item:last-child {
  border-bottom: none;
}

.event-date {
  background: #F9FAFB;
  border: 1px solid #E5E7EB;
  border-radius: 8px;
  padding: 6px 12px;
  text-align: center;
  min-width: 50px;
}

.event-day {
  font-size: 16px;
  font-weight: 700;
  color: #1C2431;
  line-height: 1;
}

.event-month {
  font-size: 10px;
  font-weight: 600;
  color: #EE0034;
  margin-top: 2px;
}

.event-info {
  flex: 1;
}

.event-name {
  font-size: 14px;
  font-weight: 600;
  color: #1C2431;
}

.event-meta {
  font-size: 12px;
  color: #6B7280;
  margin-top: 2px;
}

/* Modal Backdrop & Form */
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 99;
}

.modal-card {
  background: white;
  border-radius: 12px;
  width: 100%;
  max-width: 500px;
  padding: 1.5rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.modal-title {
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 1.25rem;
}

.form-group {
  margin-bottom: 1rem;
  flex: 1;
}

.form-row {
  display: flex;
  gap: 12px;
}

.form-group label {
  display: block;
  font-size: 12px;
  font-weight: 600;
  margin-bottom: 4px;
  color: #4B5563;
}

.form-control {
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: 1px solid #D1D5DB;
  border-radius: 6px;
  font-size: 13px;
  outline: none;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 1.25rem;
}

/* Event List Dashboard */
.event-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem 0;
  border-bottom: 1px solid #F3F4F6;
}

.event-date { text-align: center; min-width: 36px; }
.event-day { font-size: 18px; font-weight: 700; color: #1C2431; }
.event-month { font-size: 10px; color: #9CA3AF; font-weight: 600; }
.event-info { flex: 1; }
.event-name { font-size: 13px; font-weight: 600; color: #1C2431; }
.event-meta { font-size: 11px; color: #9CA3AF; }
</style>