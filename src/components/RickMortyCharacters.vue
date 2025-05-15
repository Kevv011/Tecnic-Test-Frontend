<script setup>
import { ref, onMounted } from "vue";                           // Estado reactivo en VUE
import { fetchCharacters } from "../api/characters";            // Funcion que procesa 6 personajes
import { getEpisodeName } from "../api/firstAppearanceEpisode"; // Funcion que procesa la primera ubicacion

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
  <section>
    <h1>Personajes Rick & Morty</h1>

    <div v-if="loading">Cargando personajes…</div>

    <div v-else-if="error">
      <p>Error al cargar personajes:</p>
      <pre>{{ error.message }}</pre>
    </div>

    <ul v-else>
      <li v-for="char in characters" :key="char.id">
        <img :src="char.image" :alt="`imagen de ${char.name}`" >
        <h2>{{ char.name }}</h2>
        <p><strong>Estado:</strong> {{ char.status }}</p>
        <p><strong>Ultima Ubicación:</strong> {{ char.location.name }}</p>
        <p>
          <strong>Visto por primera vez:</strong>
          {{ char.firstAppearanceName }}
        </p>
      </li>
    </ul>
  </section>
</template>
