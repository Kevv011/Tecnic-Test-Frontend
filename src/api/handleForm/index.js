import axios from "axios";

const API_BASE_URL = "https://prize.manager.orangesoftco.com/api";
const TOKEN = "11|WtSjq2ZKMApxfJQcnhrKhMpTi8bhiSxaInb0dz1s";

// Instancia de Axios para HTTP (apiForm)
export const apiForm = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/json",
    },
    timeout: 5000,
});
