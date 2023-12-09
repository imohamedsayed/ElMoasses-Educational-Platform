<template>
  <v-app-bar id="appBar" elevation="0" class="px-2">
    <v-app-bar-nav-icon @click="openAppDrawer"></v-app-bar-nav-icon>
    <v-app-bar-title
      ><v-img src="@/assets/images/logo.png" width="60"></v-img
    ></v-app-bar-title>
    <v-btn color="red" variant="flat" class="d-none d-md-block">
      تسجيل الخروج
    </v-btn>
    <v-btn icon id="barDashMenu" class="d-block d-md-none"
      ><v-icon>mdi-dots-vertical</v-icon>
    </v-btn>
    <v-menu activator="#barDashMenu" offset="10" class="pa-4">
      <v-list>
        <v-list-item
          title="حسابي"
          prepend-avatar="https://randomuser.me/api/portraits/men/85.jpg"
          link
          class="mb-2"
        ></v-list-item>
        <v-divider></v-divider>
        <v-list-item
          title="تسجيل خروج"
          prepend-icon="mdi-logout"
          link
        ></v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
export default {
  inject: ["Emitter"],
  methods: {
    openAppDrawer() {
      this.Emitter.emit("toggleDashDrawer");
    },
  },
};
</script>

<style lang="scss">
#appBar {
  border-bottom: 1px solid #01cda9;
  button {
    &:hover {
      color: #01cda9;
    }
  }

  .account-btn:hover {
    #accountAvatar {
      background-color: #01cda9 !important;
    }
  }
}
</style>
