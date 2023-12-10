import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import VueApexCharts from "vue3-apexcharts";
import router from '@/router/router';


loadFonts()

createApp(App)
  .use(vuetify).use(router).use(VueApexCharts)
  .mount('#app')
