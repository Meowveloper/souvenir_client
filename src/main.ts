import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "../node_modules/bootstrap-icons/font/bootstrap-icons.min.css";
import "../node_modules/aos/dist/aos.css";
import AOS from 'aos';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
import '../node_modules/html2pdf.js/dist/html2pdf.js';

AOS.init();
createApp(App).use(store).use(router).mount("#app");
