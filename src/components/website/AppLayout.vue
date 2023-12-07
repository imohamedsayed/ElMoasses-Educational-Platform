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
import NavigationDrawer from "./layout/NavigationDrawer.vue";
import AppNav from "./layout/AppNav.vue";
import AppFooter from "./layout/AppFooter.vue";
export default {
  components: { NavigationDrawer, AppNav, AppFooter },
};
</script>

<style></style>
