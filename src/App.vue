<script setup>
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
  <nav class="mb-4 space-x-4">
    <RouterLink to="/" class="px-4 py-2 border border-black bg-white text-black rounded">Form Vee-Validate</RouterLink>
    <RouterLink to="/APIRest" class="px-4 py-2 border border-black bg-black text-white rounded">API Rest</RouterLink>
  </nav>

  <hr class="mb-5">

  <router-view />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
