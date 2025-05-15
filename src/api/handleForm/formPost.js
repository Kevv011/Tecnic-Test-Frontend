import axios from "axios";
import { apiForm } from './index';

// Funcion para hacer la solicitud POST con Axios y guardar la informacion del formulario
export async function submitForm(values) {
  try {
    const response = await apiForm.post('v1/players', values);
    return response.data;

  } catch (error) {
    console.error("Error al enviar el formulario:", error);
    throw error;
  }
}
