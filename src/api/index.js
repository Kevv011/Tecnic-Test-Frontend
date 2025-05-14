import axios from 'axios';

const API_BASE_URL = 'https://rickandmortyapi.com/api';

// Instancia de Axios para HTTP (apiClient)
export const apiClient = axios.create({
    baseURL: API_BASE_URL,
    timeout: 5000,
});