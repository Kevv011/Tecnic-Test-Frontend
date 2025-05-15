import axios from "axios";

const API_URL = "https://prize.manager.orangesoftco.com/api/v1/players";

// Funcion para hacer la solicitud POST con Axios y guardar la informacion del formulario
export async function submitForm(values, token) {
  try {
    const response = await axios.post(API_URL, values, {
      headers: {
        Authorization: 'Bearer 11|WtSjq2ZKMApxfJQcnhrKhMpTi8bhiSxaInb0dz1s', // Token
        "Content-Type": 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error al enviar el formulario:", error);
    throw error;
  }
}
