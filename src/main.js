import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
import { MotionPlugin } from "@vueuse/motion";

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
