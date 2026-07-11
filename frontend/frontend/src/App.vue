<script setup>
import { RouterView, useRoute } from 'vue-router'
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';

const route = useRoute()
</script>

<template>
  <Navbar v-if="route.name !== 'login' && route.name !== 'register' && route.name !== 'admin'" />
  <RouterView />
  <Footer v-if="route.name !== 'login' && route.name !== 'register' && route.name !== 'admin'"/>
</template>