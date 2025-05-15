<script setup>
import { ref, onMounted } from "vue";                                             // Estado reactivo en VUE
import { fetchCharacters } from "../api/APIRest_RickMorty/characters";            // Funcion que procesa 6 personajes
import { getEpisodeName } from "../api/APIRest_RickMorty/firstAppearanceEpisode"; // Funcion que procesa la primera ubicacion

import rickMorty from '../assets/rickMorty.png';

// Definicion de estados reactivos con ref
const characters = ref([]);
const loading = ref(false);
const error = ref(null);

// Inicio de "load" para la carga de la informacion
async function load() {
  loading.value = true;
  error.value = null;

  try {
    // Obtener a los 6 personajes de la API
    const data = await fetchCharacters();

    // Obtencion de la primera aparicion (Donde se vio por primera vez)
    for (const char of data) {
      const firstEpisodeId = char.episode[0].split("/").pop(); // Extrae ID del final de la URL
      char.firstAppearanceName = await getEpisodeName(firstEpisodeId);
    }

    // Actualizacion para mostrar los datos (re-renderizado)
    characters.value = data;
  } catch (err) {
    error.value = err;
  } finally {
    loading.value = false;
  }
}

// Ejecutar "load" con onMounted para el montaje del componente
onMounted(load);
</script>

<template>
  <section class="text-center">
    <div class="flex justify-center mb-4">
      <img :src="rickMorty" alt="Rick&Morty" class="max-w-full h-auto w-70 sm:w-80 md:w-90" />
    </div>

    <div v-if="loading">Cargando personajes…</div>

    <div v-else-if="error">
      <p>Error al cargar personajes:</p>
      <pre>{{ error.message }}</pre>
    </div>

    <ul class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 list-none mt-8" v-else>
      <li class="border border-gray-200 shadow-lg rounded-2xl p-6 hover:scale-105 transition-transform duration-200" v-for="char in characters" :key="char.id">
        <div class="pb-4 flex flex-col items-center">

          <!-- Imagen -->
          <img class="rounded-xl w-32 h-32 object-cover mb-3 border-4 border-black shadow" :src="char.image" :alt="`imagen de ${char.name}`" />

          <!-- Nombre -->
          <h2 class="text-2xl font-extrabold">{{ char.name }}</h2>
        </div>

        <hr class="my-3 border-gray-300" />

        <p class="mb-1">

          <!-- Estado -->
          <span class="font-semibold">Estado: </span>
          <span
            :class="{
              'text-green-600': char.status === 'Alive',
              'text-red-600': char.status === 'Dead',
              'text-gray-500':
                char.status !== 'Alive' && char.status !== 'Dead',
            }"
          >
            {{ char.status || "Desconocido" }}
          </span>
        </p>

        <p class="mb-1">

          <!-- Ultima Ubicacion -->
          <span class="font-semibold font-extrabold">Última Ubicación:</span>
          {{ char.location?.name || "Desconocida" }}
        </p>
        <p>

          <!-- Donde se vio por primera vez -->
          <span class="font-semibold font-extrabold">Visto por primera vez:</span>
          {{ char.firstAppearanceName || "Desconocido" }}
        </p>
      </li>
    </ul>
  </section>
</template>
