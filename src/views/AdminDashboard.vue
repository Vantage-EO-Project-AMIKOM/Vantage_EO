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

      <div class="menu-section">
        <div class="menu-label">MENU UTAMA</div>
        <a href="#" class="nav-item active">
          <i class="fa fa-th-large"></i> Dashboard
        </a>
        <a href="#" class="nav-item">
          <i class="fa fa-calendar"></i> Event
          <span class="badge">12</span>
        </a>
        <a href="#" class="nav-item">
          <i class="fa fa-ticket"></i> Tiket
          <span class="badge">3</span>
        </a>
        <a href="#" class="nav-item">
          <i class="fa fa-users"></i> Peserta
        </a>
        <a href="#" class="nav-item">
          <i class="fa fa-map-marker"></i> Venue
        </a>
      </div>

      <div class="menu-section">
        <div class="menu-label">LAPORAN</div>
        <a href="#" class="nav-item">
          <i class="fa fa-bar-chart"></i> Analitik
        </a>
        <a href="#" class="nav-item">
          <i class="fa fa-file-text"></i> Laporan
        </a>
        <a href="#" class="nav-item">
          <i class="fa fa-qrcode"></i> QR Check-in
        </a>
      </div>

      <div class="menu-section">
        <div class="menu-label">SISTEM</div>
        <a href="#" class="nav-item">
          <i class="fa fa-cog"></i> Pengaturan
        </a>
      </div>

      <div class="sidebar-footer">
        <div class="admin-avatar">{{ (user?.name || 'AK').slice(0, 2).toUpperCase() }}</div>
        <div class="admin-info">
          <div class="admin-name">{{ user?.name || 'Admin Vantage' }}</div>
          <div class="admin-role">{{ user?.role === 'admin' ? 'Super Admin' : (user?.role || 'Admin') }}</div>
        </div>
        <button @click="handleLogout" class="logout-icon">
          <i class="fa fa-sign-out"></i>
        </button>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="main-content">
      <!-- Top Bar -->
      <div class="topbar">
        <div>
          <h1 class="page-title">Dashboard</h1>
          <p class="page-date">{{ todayLabel }}</p>
        </div>
        <div class="topbar-actions">
          <button class="icon-btn"><i class="fa fa-bell"></i></button>
          <button class="icon-btn"><i class="fa fa-search"></i></button>
          <RouterLink to="/event/create" class="btn-primary">+ Buat Event</RouterLink>
        </div>
      </div>

      <div v-if="loadError" class="load-error-banner">{{ loadError }}</div>

      <!-- Stats Cards -->
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-icon red">
            <i class="fa fa-calendar-check-o"></i>
          </div>
          <div class="stat-info">
            <div class="stat-number">{{ loading ? '—' : totalEvents }}</div>
            <div class="stat-label">Total event</div>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon blue">
            <i class="fa fa-users"></i>
          </div>
          <div class="stat-info">
            <div class="stat-number">{{ loading ? '—' : totalParticipants.toLocaleString('id-ID') }}</div>
            <div class="stat-label">Total peserta</div>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon green">
            <i class="fa fa-ticket"></i>
          </div>
          <div class="stat-info">
            <div class="stat-number">{{ loading ? '—' : totalTicketsSold.toLocaleString('id-ID') }}</div>
            <div class="stat-label">Tiket terjual</div>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon yellow">
            <i class="fa fa-money"></i>
          </div>
          <div class="stat-info">
            <div class="stat-number">{{ loading ? '—' : formatRupiah(totalRevenue) }}</div>
            <div class="stat-label">Total pendapatan</div>
          </div>
        </div>
      </div>

      <!-- Charts Row -->
      <div class="charts-row">
        <!-- Bar Chart -->
        <div class="chart-card wide">
          <div class="card-header">
            <span class="card-title">Event bulanan</span>
            <a href="#" class="card-link">Lihat detail →</a>
          </div>
          <div class="bar-chart">
            <div class="y-axis">
              <span>{{ maxMonthlyEvents }}</span>
              <span>0</span>
            </div>
            <div class="bars">
              <div class="bar-group" v-for="(item, index) in barData" :key="item.month">
                <div class="bar" :style="{ height: barHeight(item.count), background: index === barData.length - 1 ? '#EE0034' : '#FECDD3' }"></div>
                <span class="bar-label">{{ item.label }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Donut Chart -->
        <div class="chart-card">
          <div class="card-header">
            <span class="card-title">Kategori event</span>
            <span class="card-link">{{ categories.length }} kategori</span>
          </div>
          <div class="donut-wrapper">
            <div class="donut-ring" :style="{ background: categoryGradient }"></div>
          </div>
          <div class="donut-legend">
            <div class="legend-item" v-for="(category, index) in categories" :key="category.id">
              <span class="legend-dot" :style="{ background: categoryColors[index % categoryColors.length] }"></span>
              <span class="legend-label">{{ category.name }}</span>
              <span class="legend-value">{{ category.percentage }}%</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Upcoming Events -->
      <div class="table-card">
        <div class="card-header">
          <span class="card-title">Jadwal event mendatang</span>
          <a href="#" class="card-link">Lihat kalender →</a>
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
                <i class="fa fa-map-marker"></i> {{ event.location }} · {{ event.capacity }}
              </div>
            </div>
            <span class="event-status" :class="event.statusClass">{{ event.status }}</span>
          </div>
        </div>
      </div>

      <!-- Bottom Row -->
      <div class="bottom-row">
        <!-- Ticket Sales -->
        <div class="table-card half">
          <div class="card-header">
            <span class="card-title">Penjualan tiket</span>
            <a href="#" class="card-link">Kelola tiket →</a>
          </div>
          <div class="ticket-list">
            <div class="ticket-item" v-for="ticket in ticketSales" :key="ticket.id">
              <div class="ticket-icon" :style="{ background: ticket.color }">
                <i class="fa fa-music"></i>
              </div>
              <div class="ticket-info">
                <div class="ticket-name">{{ ticket.name }}</div>
                <div class="ticket-price">{{ ticket.price }}</div>
                <div class="ticket-bar-wrapper">
                  <div class="ticket-bar" :style="{ width: ticket.percent + '%', background: ticket.color }"></div>
                </div>
              </div>
              <div class="ticket-count">
                <span class="ticket-sold">{{ ticket.sold }}</span>
                <span class="ticket-total">/ {{ ticket.total }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Recent Activity -->
        <div class="table-card half">
          <div class="card-header">
            <span class="card-title">Aktivitas terbaru</span>
            <a href="#" class="card-link">Semua log</a>
          </div>
          <div class="activity-list">
            <div class="activity-item" v-for="activity in recentActivities" :key="activity.id">
              <div class="activity-icon" :style="{ background: activity.color }">
                <i :class="'fa ' + activity.icon"></i>
              </div>
              <div class="activity-info">
                <div class="activity-text" v-html="activity.text"></div>
                <div class="activity-time">{{ activity.time }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { eventApi, ticketApi } from '@/lib/http'

const router = useRouter()
const user = ref(JSON.parse(localStorage.getItem('user')))

const loading = ref(true)
const loadError = ref('')

const totalEvents = ref(0)
const totalParticipants = ref(0)
const totalTicketsSold = ref(0)
const totalRevenue = ref(0)
const analytics = ref({ monthly_events: [], categories: [] })
const categoryColors = ['#EE0034', '#3B82F6', '#22C55E', '#F97316', '#8B5CF6']
const todayLabel = new Intl.DateTimeFormat('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }).format(new Date())
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

const upcomingEvents = ref([])
const ticketSales = ref([])

function formatRupiah(value) {
  return 'Rp ' + Number(value || 0).toLocaleString('id-ID')
}

async function loadDashboard() {
  loading.value = true
  loadError.value = ''

  const [eventsResult, ticketsResult, analyticsResult] = await Promise.allSettled([
    eventApi.get('/events'),
    ticketApi.get('/tickets'),
    eventApi.get('/dashboard/analytics'),
  ])

  const events = eventsResult.status === 'fulfilled' ? (eventsResult.value.data.data ?? []) : []
  const tickets = ticketsResult.status === 'fulfilled' ? (ticketsResult.value.data.data ?? []) : []

  const failedParts = []
  if (eventsResult.status === 'rejected') failedParts.push('Event Service')
  if (ticketsResult.status === 'rejected') failedParts.push('Ticket Service')
  if (analyticsResult.status === 'rejected') failedParts.push('Event analytics')
  if (failedParts.length > 0) {
    loadError.value = `Gagal memuat data dari: ${failedParts.join(', ')}. Data lainnya tetap ditampilkan.`
    if (ticketsResult.status === 'rejected') {
      console.warn('Ticket Service unreachable:', ticketsResult.reason)
    }
    if (eventsResult.status === 'rejected') {
      console.error('Event Service unreachable:', eventsResult.reason)
    }
  }

  try {
    totalEvents.value = events.length
    totalTicketsSold.value = tickets.length
    totalParticipants.value = tickets.reduce((sum, t) => sum + (t.quantity || 0), 0)
    totalRevenue.value = tickets.reduce((sum, t) => sum + Number(t.amount || 0), 0)
    if (analyticsResult.status === 'fulfilled') {
      const analyticsData = analyticsResult.value.data?.data
      if (analyticsData && typeof analyticsData === 'object') {
        analytics.value = analyticsData
      } else {
        loadError.value = 'Respons analytics Event Service tidak valid. Periksa URL API di Netlify.'
      }
    }

    upcomingEvents.value = [...events]
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
          location: `${e.venue?.name ?? 'Venue belum ditentukan'} · ${e.quota} kuota`,
          capacity: `${e.quota} peserta`,
          status: e.status ?? 'draft',
          statusClass: e.status === 'published' ? 'status-green' : 'status-blue',
        }
      })

    // Aggregate raw tickets into per-event sales, since the ticket table
    // tracks individual transactions, not ticket "types".
    const salesByEvent = {}
    for (const t of tickets) {
      if (!salesByEvent[t.event_id]) {
        salesByEvent[t.event_id] = { sold: 0 }
      }
      salesByEvent[t.event_id].sold += t.quantity || 0
    }

    const colors = ['#EE0034', '#3B82F6', '#22C55E', '#F97316']
    ticketSales.value = Object.entries(salesByEvent)
      .map(([eventId, stats], index) => {
        const event = events.find((e) => e.id === Number(eventId))
        const quota = event?.quota || stats.sold || 1
        return {
          id: eventId,
          name: event?.title ?? `Event #${eventId}`,
          price: formatRupiah(event?.price) + '/tiket',
          sold: stats.sold,
          total: quota,
          percent: Math.min(100, Math.round((stats.sold / quota) * 100)),
          color: colors[index % colors.length],
        }
      })
      .slice(0, 4)
  } catch (err) {
    console.error('Failed to process dashboard data:', err)
    if (!loadError.value) {
      loadError.value = 'Terjadi kesalahan saat memproses data dashboard.'
    }
  } finally {
    loading.value = false
  }
}

onMounted(loadDashboard)

// Belum ada backing service untuk trend pendapatan bulanan, breakdown
// kategori event, dan activity log — masih data statis sampai ada
// endpoint/tabel yang mendukung.
function barHeight(count) {
  return `${Math.max(6, (count / maxMonthlyEvents.value) * 100)}%`
}

const recentActivities = ref([
  { id: 1, icon: 'fa-ticket', color: '#EE0034', text: '32 tiket baru terjual untuk <strong>Music Festival VIP</strong>', time: '2 menit lalu' },
  { id: 2, icon: 'fa-user-plus', color: '#3B82F6', text: 'Peserta baru terdaftar di <strong>Seminar Informatika</strong>', time: '14 menit lalu' },
  { id: 3, icon: 'fa-map-marker', color: '#22C55E', text: 'Venue <strong>Taman Budaya Yogyakarta</strong> dikonfirmasi', time: '1 jam lalu' },
  { id: 4, icon: 'fa-qrcode', color: '#F97316', text: 'QR Check-in selesai untuk <strong>Tech Summit Jogja</strong> — 442 hadir', time: '3 jam lalu' },
  { id: 5, icon: 'fa-envelope', color: '#8B5CF6', text: 'Email konfirmasi terkirim ke 120 peserta Workshop', time: '5 jam lalu' },
  { id: 6, icon: 'fa-file-text', color: '#6B7280', text: 'Laporan bulanan Mei 2026 tersedia <a href="#">untuk diunduh</a>', time: 'Kemarin' },
])

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
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0.6rem 0.75rem;
  border-radius: 8px;
  color: rgba(255,255,255,0.6);
  text-decoration: none;
  font-size: 13px;
  transition: all 0.2s;
  position: relative;
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

.nav-item.active .badge {
  background: rgba(255,255,255,0.3);
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

.icon-btn {
  width: 36px;
  height: 36px;
  border: 1px solid #E5E7EB;
  background: white;
  border-radius: 8px;
  cursor: pointer;
  color: #6B7280;
  font-size: 14px;
  transition: all 0.2s;
}

.icon-btn:hover { border-color: #EE0034; color: #EE0034; }

.btn-primary {
  display: inline-block;
  background: #EE0034;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  transition: background 0.2s;
}

.btn-primary:hover { background: #d6002f; }

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
  position: relative;
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
  line-height: 1;
}

.stat-label {
  font-size: 12px;
  color: #9CA3AF;
  margin-top: 4px;
}

.stat-badge {
  position: absolute;
  top: 1rem;
  right: 1rem;
  font-size: 11px;
  font-weight: 600;
  padding: 2px 6px;
  border-radius: 999px;
}

.stat-badge.green { background: #DCFCE7; color: #16A34A; }
.stat-badge.red { background: #FEE2E2; color: #DC2626; }

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
  text-decoration: none;
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
  min-width: 50px;
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

.donut-svg {
  width: 130px;
  height: 130px;
  transform: rotate(-90deg);
}

.donut-ring {
  width: 130px;
  height: 130px;
  border-radius: 50%;
  position: relative;
}

.donut-ring::after {
  content: '';
  position: absolute;
  inset: 28px;
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
  flex-shrink: 0;
}

.legend-label { flex: 1; color: #4B5563; }
.legend-value { font-weight: 600; color: #1C2431; }

/* ── Table Card ── */
.table-card {
  background: white;
  border-radius: 12px;
  padding: 1.25rem;
  box-shadow: 0 1px 4px rgba(0,0,0,0.06);
  margin-bottom: 1.25rem;
}

/* Events List */
.event-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem 0;
  border-bottom: 1px solid #F3F4F6;
}

.event-item:last-child { border-bottom: none; }

.event-date {
  text-align: center;
  min-width: 36px;
}

.event-day {
  font-size: 18px;
  font-weight: 700;
  color: #1C2431;
  line-height: 1;
}

.event-month {
  font-size: 10px;
  color: #9CA3AF;
  font-weight: 600;
}

.event-info { flex: 1; }

.event-name {
  font-size: 13px;
  font-weight: 600;
  color: #1C2431;
  margin-bottom: 3px;
}

.event-meta {
  font-size: 11px;
  color: #9CA3AF;
}

.event-status {
  font-size: 11px;
  font-weight: 600;
  padding: 3px 10px;
  border-radius: 999px;
}

.status-green { background: #DCFCE7; color: #16A34A; }
.status-yellow { background: #FEF9C3; color: #CA8A04; }
.status-blue { background: #DBEAFE; color: #2563EB; }
.status-gray { background: #F3F4F6; color: #6B7280; }

/* ── Bottom Row ── */
.bottom-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.half { margin-bottom: 0; }

/* Ticket Sales */
.ticket-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0.75rem 0;
  border-bottom: 1px solid #F3F4F6;
}

.ticket-item:last-child { border-bottom: none; }

.ticket-icon {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 14px;
  flex-shrink: 0;
  opacity: 0.85;
}

.ticket-info { flex: 1; }

.ticket-name {
  font-size: 13px;
  font-weight: 600;
  color: #1C2431;
  margin-bottom: 2px;
}

.ticket-price {
  font-size: 11px;
  color: #9CA3AF;
  margin-bottom: 6px;
}

.ticket-bar-wrapper {
  background: #F3F4F6;
  border-radius: 999px;
  height: 5px;
  width: 100%;
}

.ticket-bar {
  height: 5px;
  border-radius: 999px;
  transition: width 0.5s;
}

.ticket-count {
  text-align: right;
  font-size: 12px;
}

.ticket-sold { font-weight: 700; color: #1C2431; }
.ticket-total { color: #9CA3AF; }

/* Activity List */
.activity-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 0.75rem 0;
  border-bottom: 1px solid #F3F4F6;
}

.activity-item:last-child { border-bottom: none; }

.activity-icon {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 13px;
  flex-shrink: 0;
  opacity: 0.85;
}

.activity-text {
  font-size: 12px;
  color: #4B5563;
  line-height: 1.5;
}

.activity-time {
  font-size: 11px;
  color: #9CA3AF;
  margin-top: 3px;
}
</style>
