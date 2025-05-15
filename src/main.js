import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { router } from './router/router'; // Configuracion de ruteo

createApp(App).use(router).mount('#app')
