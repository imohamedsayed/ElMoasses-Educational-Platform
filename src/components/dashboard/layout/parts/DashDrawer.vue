<template>
  <v-navigation-drawer
    location="right"
    v-model="AppDrawer"
    :rail="AppRail"
    permanent
    @click="AppRail = false"
  >
    <v-list-item
      prepend-avatar="https://randomuser.me/api/portraits/men/85.jpg"
      title="John Leider"
      nav
    >
      <template v-slot:append>
        <v-btn
          variant="text"
          icon="mdi-chevron-left"
          @click.stop="AppRail = !AppRail"
        ></v-btn>
      </template>
    </v-list-item>

    <v-divider></v-divider>

    <v-list density="compact" nav>
      <v-list-item
        prepend-icon="mdi-home"
        title="الرئيسية"
        value="home"
        color="green-lighten-1"
        :to="{ name: 'dashHome' }"
      ></v-list-item>
      <v-list-item
        prepend-icon="mdi-account"
        title="حسابي"
        value="account"
        color="green-lighten-1"
      ></v-list-item>

      <v-list-group>
        <template v-slot:activator="{ props }">
          <v-list-item
            prepend-icon="mdi-calendar-text"
            title="السنوات الدراسية"
            value="years"
            v-bind="props"
            link
          ></v-list-item>
        </template>
        <v-list-item
          prepend-icon="mdi-calendar-plus"
          title="اضافة سنة"
          value="yearAdd"
          :to="{ name: 'addYear' }"
        ></v-list-item>
        <v-list-item
          prepend-icon="mdi-calendar"
          title="السنوات الدراسية"
          value="all years"
          :to="{ name: 'years' }"
        ></v-list-item>
      </v-list-group>

      <v-divider></v-divider>

      <v-list-item
        prepend-icon="mdi-logout"
        title="تسجيل الخروج"
        value="logout"
        color="green-lighten-1"
      ></v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  inject: ["Emitter"],
  data: () => ({
    AppRail: true,
    AppDrawer: false,
  }),
  mounted() {
    this.Emitter.on(
      "toggleDashDrawer",
      () => (this.AppDrawer = !this.AppDrawer)
    );
  },
};
</script>

<style></style>
