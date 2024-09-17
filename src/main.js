import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { loadFonts } from "./plugins/webfontloader";
import { MotionPlugin } from "@vueuse/motion";
import { createVuetify } from 'vuetify'
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css' // Import MDI CSS

import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
    icons: {
        defaultSet: 'mdi',
  },
  components,
  directives,
})
import "./axios";

import "vue3-toastify/dist/index.css";

import mitt from "mitt";
const Emitter = mitt();

loadFonts();

createApp(App)
  .provide("Emitter", Emitter)
  .use(router)
  .use(store)
  .use(vuetify)
  .use(MotionPlugin)
  .mount("#app");
