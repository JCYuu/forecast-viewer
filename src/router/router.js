import {createRouter, createWebHashHistory} from "vue-router";
import NavigationDrawer from "@/components/NavigationDrawer.vue";
import NotFound from "@/shared/components/NotFound.vue"
import Forecast from "@/components/Forecast.vue";
import ForecastTable from "@/components/ForecastTable.vue";

const routes = [
    { path: '/', component: Forecast },
    { path: '/tables', component: ForecastTable },
    { path: '/:pathMatch(.*)*', component: NotFound }
    // { path: '/tables', component: ForecastTables }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router