<script setup>
import { Field, Form, ErrorMessage, useForm } from "vee-validate"; // Import de elementos de formulario vee-validate
import * as yup from "yup"; // Import de libreria YUP

import { ref } from 'vue';
import { submitForm } from '../api/formPost'; // Import de funcion para solicitud POST de formulario

// Manejo de mensajes al enviar la informacion
const messageSuccess = ref('');
const messageError = ref('');

// Valores iniciales para los campos con vee-validate
const formValues = {
  name:'',
  email: '',
  phone: '',
};

// Esquema de validación para cada campo con libreria YUP
const schema = yup.object({
  name: yup.string().required("El nombre es obligatorio"),
  email: yup
    .string()
    .required("El correo es obligatorio")
    .email("El correo no es válido"),
  phone: yup
    .string()
    .required("El teléfono es obligatorio")
    .matches(/^[0-9]{8,15}$/, "Número de teléfono inválido"),
});

// Manejo de solicitud POST del form
const sendDataForm = async (values, { resetForm }) => {
  try {
    const data = await submitForm(values);
    messageSuccess.value = 'Formulario enviado correctamente';
    console.log(data);

    resetForm();

  } catch(error) {
    messageError.value = 'Ocurrio un error al envia el formulario';
    console.error(error);
  }
};

</script>

<template>
  <section class="max-w-md mx-auto mt-10 p-8 rounded-lg shadow-md">
    <h2 class="text-3xl font-bold mb-6 text-center">Formulario de Registro</h2>

    <Form :validation-schema="schema" @submit="sendDataForm" :initial-values="formValues" class="space-y-6">
      <!-- Campo Nombre -->
      <div class="flex flex-col gap-1">
        <label class="font-medium mb-1" for="name">Nombre: </label>
        <Field class="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" name="name" id="name" />
        <ErrorMessage name="name" v-slot="{ message }">
          <p class="text-red-500 text-sm mt-1">{{ message }}</p>
        </ErrorMessage>
      </div>

      <!-- Campo Email -->
      <div class="flex flex-col gap-1">
        <label class="font-medium mb-1" for="email">Email: </label>
        <Field class="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" name="email" id="email" />
        <ErrorMessage name="email" v-slot="{ message }">
          <p class="text-red-500 text-sm mt-1">{{ message }}</p>
        </ErrorMessage>
      </div>

      <!-- Campo Teléfono -->
      <div class="flex flex-col gap-1">
        <label class="font-medium mb-1" for="phone">Teléfono: </label>
        <Field class="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" name="phone" id="phone" />
        <ErrorMessage name="phone" v-slot="{ message }">
          <p class="text-red-500 text-sm mt-1">{{ message }}</p>
        </ErrorMessage>
      </div>

      <button type="submit" class="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">Enviar</button>

      <!-- Mensaje de exito si los datos se procesaron correctamente -->
      <p class="text-green-600 text-center" v-if="messageSuccess">
        {{ messageSuccess }}
      </p>

      <!-- Mensaje de error si hubo alguna falla al enviar los datos -->
      <p class="text-red-600 text-center" v-if="messageError">
        {{ messageError }}
      </p>
    </Form>
  </section>
</template>
