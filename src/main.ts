import { createApp } from 'vue'
import './assets/css/main.css'
import App from './App.vue'
import router from './router/index'
import { createPinia } from 'pinia';




const app = createApp(App);
app.use(createPinia());
app.use(router)
app.mount('#app');
