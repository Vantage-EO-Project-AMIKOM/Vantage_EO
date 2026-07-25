<script setup>
import { RouterView, useRoute } from 'vue-router'
import Navbar from './components/Navbar.vue'
import AppFooter from './components/AppFooter.vue'

const route = useRoute()
</script>

<template>
  <Navbar v-if="route.name !== 'login' && route.name !== 'register' && route.name !== 'admin'" />

  <RouterView :key="$route.fullPath" />

  <AppFooter v-if="route.name !== 'login' && route.name !== 'register' && route.name !== 'admin'" />
</template>
