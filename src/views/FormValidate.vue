<script setup>
import { Field, Form, ErrorMessage } from "vee-validate"; // Import de elementos de formulario vee-validate
import * as yup from "yup"; // Import de libreria YUP

import { ref } from 'vue';
import { submitForm } from '../api/formPost'; // Import de funcion para solicitud POST de formulario

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

// Función de envío (solo log por ahora)
function onSubmit(values) {
  console.log("Formulario enviado:", values);
}
</script>

<template>
  <section class="max-w-md mx-auto mt-10 p-8 rounded-lg shadow-md">
    <h2 class="text-3xl font-bold mb-6 text-center">Formulario de Registro</h2>
    
    <Form :validation-schema="schema" @submit="onSubmit" class="space-y-6">
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
    </Form>
  </section>
</template>
