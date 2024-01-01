<template>
  <v-app-bar id="appBar" elevation="0" class="px-2">
    <v-app-bar-nav-icon @click="openAppDrawer"></v-app-bar-nav-icon>
    <v-app-bar-title
      ><v-img src="@/assets/images/logo.png" width="100"></v-img
    ></v-app-bar-title>
    <v-btn
      color="red"
      variant="flat"
      class="d-none d-md-block"
      @click="logout"
      :loading="loading"
    >
      تسجيل الخروج
    </v-btn>
    <v-btn icon id="barDashMenu" class="d-block d-md-none"
      ><v-icon>mdi-dots-vertical</v-icon>
    </v-btn>
    <v-menu activator="#barDashMenu" offset="10" class="pa-4">
      <v-list>
        <v-list-item
          :title="admin.name"
          :prepend-avatar="require('@/assets/images/user.jpg')"
          class="mb-2"
        ></v-list-item>
        <v-divider></v-divider>
        <v-list-item
          @click="logout"
          title="تسجيل خروج"
          prepend-icon="mdi-logout"
          link
        ></v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
import { ref } from "vue";
import { computed } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

export default {
  inject: ["Emitter"],
  methods: {
    openAppDrawer() {
      this.Emitter.emit("toggleDashDrawer");
    },
  },

  setup() {
    const store = useStore();
    const router = useRouter();
    const admin = computed(() => store.state.admin);
    const loading = ref(false);
    const logout = async () => {
      loading.value = true;
      await store.dispatch("logout");
      loading.value = false;

      router.push({ name: "adminLogin" });
    };

    return { admin, logout, loading };
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
