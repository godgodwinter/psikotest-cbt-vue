import { createApp } from "vue";
import { createPinia } from "pinia";

import { Quasar } from "quasar";

import App from "./App.vue";
import router from "./router";

// Import icon libraries
import "@quasar/extras/roboto-font-latin-ext/roboto-font-latin-ext.css";
import "@quasar/extras/material-icons/material-icons.css";
import "@quasar/extras/fontawesome-v6/fontawesome-v6.css";
import "@quasar/extras/themify/themify.css";
import "@quasar/extras/line-awesome/line-awesome.css";
// Import Quasar css
import "quasar/src/css/index.sass";

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.use(Quasar, {
  plugins: {}, // import Quasar plugins and add here
});

app.mount("#app");
