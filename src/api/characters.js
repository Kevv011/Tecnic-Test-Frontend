import { apiClient } from './index';

// Funcion fetchCharacters para obtener a los personajes de la API (limit = 6 por defecto para los 6 personajes)
export function fetchCharacters(limit = 6) {
    return apiClient.get('/character')                                  
    .then(response => response.data.results.slice(0, limit))
    .catch(error => {
        console.error('Hubo un problema al obtener a los personajes:', error);
        throw error;
    });
}