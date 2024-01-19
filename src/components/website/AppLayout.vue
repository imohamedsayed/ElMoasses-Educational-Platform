<template>
  <v-app>
    <v-layout>
      <AppNav />
      <NavigationDrawer />
      <v-main>
        <slot></slot>
      </v-main>
      <AppFooter />
    </v-layout>
  </v-app>
</template>

<script setup>
import NavigationDrawer from "./layout/NavigationDrawer.vue";
import AppNav from "./layout/AppNav.vue";
import AppFooter from "./layout/AppFooter.vue";
var Tawk_API = Tawk_API || {},
  Tawk_LoadStart = new Date();
(function () {
  var s1 = document.createElement("script"),
    s0 = document.getElementsByTagName("script")[0];
  s1.async = true;
  s1.src = "https://embed.tawk.to/65aab5398d261e1b5f558964/1hkhd7qs8";
  s1.charset = "UTF-8";
  s1.setAttribute("crossorigin", "*");
  s0.parentNode.insertBefore(s1, s0);
})();
</script>

<style></style>
