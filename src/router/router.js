import { createMemoryHistory, createRouter } from "vue-router";

import FormValidate from "../views/FormValidate.vue";
import RickMortyCharacters from "../views/RickMortyCharacters.vue";

const routes = [
  { path: "/", component: FormValidate },
  { path: "/APIRest", component: RickMortyCharacters },
];

export const router = createRouter({
  history: createMemoryHistory(),
  routes,
});
