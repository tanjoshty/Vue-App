import { createApp } from 'vue';
import store from './store';
import router from './router';
import App from './App.vue';
import Axios from "axios";
Axios.defaults.baseURL = "http://localhost:8080";

const app = createApp(App);

app.provide("$store", store);
app.use(store);
app.use(router);

app.mount('#app');