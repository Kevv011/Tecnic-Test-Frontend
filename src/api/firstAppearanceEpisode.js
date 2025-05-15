import { apiClient } from "./index";

// Función para obtener el nombre del episodio a partir de su ID (Donde se vio por primera vez)
export async function getEpisodeName(id_episode) {
  try {
    const response = await apiClient.get(`/episode/${id_episode}`);
    return response.data.name;
  } catch (error) {
    console.error("Error al obtener el nombre del episodio:", error);
    return "Nombre desconocido";
  }
}
