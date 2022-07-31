import { createApp } from "vue";
import { createPinia } from "pinia";
import router from "./router/router";

import PrimeVue from "primevue/config";
import BadgeDirective from "primevue/badgedirective";
import App from "./App.vue";
import "primevue/resources/themes/saga-blue/theme.css  "; //theme
import "primevue/resources/primevue.min.css"; //core css
import "primeicons/primeicons.css";
import "primeflex/primeflex.scss";

const app = createApp(App);

app.use(PrimeVue);
app.use(router);
app.use(createPinia());
app.directive("badge", BadgeDirective);

app.mount("#app");
