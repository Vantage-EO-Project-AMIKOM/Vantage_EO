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
        <div class="admin-avatar">AK</div>
        <div class="admin-info">
          <div class="admin-name">Admin Vantage</div>
          <div class="admin-role">Super Admin</div>
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
          <p class="page-date">Minggu, 21 Juni 2026</p>
        </div>
        <div class="topbar-actions">
          <button class="icon-btn"><i class="fa fa-bell"></i></button>
          <button class="icon-btn"><i class="fa fa-search"></i></button>
          <button class="btn-primary">+ Buat Event</button>
        </div>
      </div>

      <!-- Stats Cards -->
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-icon red">
            <i class="fa fa-calendar-check-o"></i>
          </div>
          <div class="stat-info">
            <div class="stat-number">47</div>
            <div class="stat-label">Total event aktif</div>
          </div>
          <div class="stat-badge green">↑ 1.8%</div>
        </div>
        <div class="stat-card">
          <div class="stat-icon blue">
            <i class="fa fa-users"></i>
          </div>
          <div class="stat-info">
            <div class="stat-number">8.420</div>
            <div class="stat-label">Total peserta</div>
          </div>
          <div class="stat-badge green">↑ 1.14%</div>
        </div>
        <div class="stat-card">
          <div class="stat-icon green">
            <i class="fa fa-ticket"></i>
          </div>
          <div class="stat-info">
            <div class="stat-number">12.670</div>
            <div class="stat-label">Tiket terjual</div>
          </div>
          <div class="stat-badge green">↑ 1.22%</div>
        </div>
        <div class="stat-card">
          <div class="stat-icon yellow">
            <i class="fa fa-money"></i>
          </div>
          <div class="stat-info">
            <div class="stat-number">Rp 284jt</div>
            <div class="stat-label">Pendapatan bulan ini</div>
          </div>
          <div class="stat-badge red">↓ 3%</div>
        </div>
      </div>

      <!-- Charts Row -->
      <div class="charts-row">
        <!-- Bar Chart -->
        <div class="chart-card wide">
          <div class="card-header">
            <span class="card-title">Pendapatan bulanan</span>
            <a href="#" class="card-link">Lihat detail →</a>
          </div>
          <div class="bar-chart">
            <div class="y-axis">
              <span>Rp 350jt</span>
              <span>Rp 300jt</span>
              <span>Rp 250jt</span>
              <span>Rp 200jt</span>
              <span>Rp 150jt</span>
              <span>Rp 100jt</span>
              <span>Rp 50jt</span>
              <span>Rp 0jt</span>
            </div>
            <div class="bars">
              <div class="bar-group" v-for="(item, index) in barData" :key="index">
                <div class="bar" :style="{ height: item.height, background: item.active ? '#EE0034' : '#FECDD3' }"></div>
                <span class="bar-label">{{ item.label }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Donut Chart -->
        <div class="chart-card">
          <div class="card-header">
            <span class="card-title">Kategori event</span>
            <a href="#" class="card-link">Lihat semua</a>
          </div>
          <div class="donut-wrapper">
            <svg viewBox="0 0 120 120" class="donut-svg">
              <circle cx="60" cy="60" r="45" fill="none" stroke="#EE0034" stroke-width="20" stroke-dasharray="99 183" stroke-dashoffset="0" />
              <circle cx="60" cy="60" r="45" fill="none" stroke="#3B82F6" stroke-width="20" stroke-dasharray="80 202" stroke-dashoffset="-99" />
              <circle cx="60" cy="60" r="45" fill="none" stroke="#22C55E" stroke-width="20" stroke-dasharray="63 219" stroke-dashoffset="-179" />
              <circle cx="60" cy="60" r="45" fill="none" stroke="#F97316" stroke-width="20" stroke-dasharray="43 239" stroke-dashoffset="-242" />
            </svg>
          </div>
          <div class="donut-legend">
            <div class="legend-item">
              <span class="legend-dot" style="background:#EE0034"></span>
              <span class="legend-label">Konser</span>
              <span class="legend-value">35%</span>
            </div>
            <div class="legend-item">
              <span class="legend-dot" style="background:#3B82F6"></span>
              <span class="legend-label">Seminar</span>
              <span class="legend-value">28%</span>
            </div>
            <div class="legend-item">
              <span class="legend-dot" style="background:#22C55E"></span>
              <span class="legend-label">Festival</span>
              <span class="legend-value">22%</span>
            </div>
            <div class="legend-item">
              <span class="legend-dot" style="background:#F97316"></span>
              <span class="legend-label">Workshop</span>
              <span class="legend-value">15%</span>
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
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const user = ref(JSON.parse(localStorage.getItem('user')))

const barData = ref([
  { label: 'Jan', height: '45%', active: false },
  { label: 'Feb', height: '55%', active: false },
  { label: 'Mar', height: '65%', active: false },
  { label: 'Apr', height: '50%', active: false },
  { label: 'Mei', height: '70%', active: false },
  { label: 'Jun', height: '90%', active: true },
])

const upcomingEvents = ref([
  { id: 1, day: '24', month: 'JUN', name: 'Vantage Music Festival 2026', location: 'Alun-alun Yogyakarta', capacity: '2.500 peserta', status: 'Segera', statusClass: 'status-green' },
  { id: 2, day: '28', month: 'JUN', name: 'Seminar Nasional Informatika 2026', location: 'UGM Convention Hall', capacity: '800 peserta', status: 'Hampir penuh', statusClass: 'status-yellow' },
  { id: 3, day: '05', month: 'JUL', name: 'Workshop UI/UX Design Thinking', location: 'Co-working Space Malioboro', capacity: '120 peserta', status: 'Mendatang', statusClass: 'status-blue' },
  { id: 4, day: '12', month: 'JUL', name: 'Pameran Seni & Budaya Nusantara', location: 'Taman Budaya Yogyakarta', capacity: '1.350 peserta', status: 'Mendatang', statusClass: 'status-blue' },
  { id: 5, day: '15', month: 'JUL', name: 'Tech Summit Jogja 2026', location: 'Hotel Hyatt', capacity: '400 peserta', status: 'Selesai', statusClass: 'status-gray' },
])

const ticketSales = ref([
  { id: 1, name: 'Music Festival - VIP', price: 'Rp 350.000/tiket', sold: '1.640', total: '2.000', percent: 82, color: '#EE0034' },
  { id: 2, name: 'Seminar Informatika - Regular', price: 'Rp 75.000/tiket', sold: '728', total: '800', percent: 91, color: '#3B82F6' },
  { id: 3, name: 'Workshop UI/UX - Early Bird', price: 'Rp 150.000/tiket', sold: '72', total: '120', percent: 60, color: '#22C55E' },
  { id: 4, name: 'Pameran Seni - Umum', price: 'Rp 25.000/tiket', sold: '456', total: '1.000', percent: 46, color: '#F97316' },
])

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