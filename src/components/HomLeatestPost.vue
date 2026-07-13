<script setup>
import { computed, ref, onMounted } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { eventApi } from '@/lib/http'

import coverOne from '@/components/img/bg/ulp.jpeg'
import coverTwo from '@/components/img/bg/hero-bg.jpg'

const route = useRoute()

const showAll = ref(false)
const loading = ref(true)
const loadError = ref('')

const apiPosts = ref([])

// ==========================
// Event bawaan (tetap ada)
// ==========================
const defaultPosts = [
  {
    slug: 'chatbots-and-virtual-assistants',
    title: 'Vantage Concert Night',
    category: 'Concert',
    date: '2026-08-18',
    location: 'Yogyakarta Convention Center',
    image: coverOne,
    isApi: false,
  },
  {
    slug: 'creative-innovation-summit',
    title: 'Creative Innovation Summit',
    category: 'Business',
    date: '2026-09-26',
    location: 'The Grand Hall',
    image: coverTwo,
    isApi: false,
  },
  {
    slug: 'future-of-ai-workshop',
    title: 'Future of AI Workshop',
    category: 'Workshop',
    date: '2026-10-12',
    location: 'Bandung Tech Hub',
    image: coverOne,
    isApi: false,
  },
  {
    slug: 'digital-creators-festival',
    title: 'Digital Creators Festival',
    category: 'Festival',
    date: '2026-11-03',
    location: 'Jakarta Creative District',
    image: coverTwo,
    isApi: false,
  },
  {
    slug: 'design-systems-summit',
    title: 'Design Systems Summit',
    category: 'Design',
    date: '2026-11-18',
    location: 'Surabaya Innovation Center',
    image: coverOne,
    isApi: false,
  },
  {
    slug: 'startup-networking-night',
    title: 'Startup Networking Night',
    category: 'Networking',
    date: '2026-12-08',
    location: 'Semarang Startup Hub',
    image: coverTwo,
    isApi: false,
  },
]

// ==========================
// Load Event API
// ==========================
async function loadEvents() {
  loading.value = true
  loadError.value = ''

  try {
    const response = await eventApi.get('/events')
    const events = response.data.data ?? []

    apiPosts.value = events
      .filter((e) => e.status === 'published')
      .map((e) => ({
        id: e.id,
        title: e.title,
        category: e.category?.name ?? 'Uncategorized',
        date: e.event_date,
        location: e.venue?.name ?? 'Venue belum ditentukan',
        image: e.banner || coverOne,
        isApi: true,
      }))
  } catch (err) {
    console.error(err)
    loadError.value =
      'Gagal memuat event dari server. Menampilkan event bawaan.'
  } finally {
    loading.value = false
  }
}

onMounted(loadEvents)

// ==========================
// Gabungkan Event API + Dummy
// ==========================
const posts = computed(() => {
  return [...apiPosts.value, ...defaultPosts]
})

// ==========================
// Search
// ==========================
const searchTerm = computed(() => {
  const value = route.query.search
  return value ? String(value).trim().toLowerCase() : ''
})

const filteredPosts = computed(() => {
  let result = posts.value

  if (searchTerm.value) {
    result = result.filter((post) =>
      [post.title, post.category, post.location, post.date].some((field) =>
        String(field).toLowerCase().includes(searchTerm.value),
      ),
    )
  }

  return showAll.value ? result : result.slice(0, 4)
})
</script>
