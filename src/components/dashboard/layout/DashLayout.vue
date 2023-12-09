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

<script>
import NavigationDrawer from "./parts/DashDrawer.vue";
import AppNav from "./parts/DashNav.vue";
import AppFooter from "./parts/Footer.vue";

export default {
  components: { NavigationDrawer, AppNav, AppFooter },
};
</script>

<style></style>
