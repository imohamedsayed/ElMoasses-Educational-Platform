<template>
  <v-app-bar id="appBar" elevation="0" class="px-2">
    <v-app-bar-nav-icon @click="openAppDrawer"></v-app-bar-nav-icon>
    <v-app-bar-title
      ><v-img src="@/assets/images/logo.png" width="60"></v-img
    ></v-app-bar-title>
    <v-btn class="d-none d-md-flex" :to="{ name: 'landing' }" color="teal">
      الرئيسية
      <template v-slot:prepend>
        <v-icon>mdi-home</v-icon>
      </template>
    </v-btn>
    <v-btn class="d-none d-md-flex mr-2" :to="{ name: 'home' }" color="teal">
      المحاضرات
      <template v-slot:prepend>
        <v-icon>mdi-monitor</v-icon>
      </template>
    </v-btn>
    <v-spacer></v-spacer>
    <v-btn
      class="ml-2 account-btn d-none d-md-flex"
      :to="{ name: 'profile' }"
      color="teal"
      v-if="state.student"
    >
      حسابي
      <template v-slot:prepend>
        <v-avatar
          color="grey-darken-1"
          size="30"
          :image="require('@/assets/images/user.jpg')"
          id="accountAvatar"
        ></v-avatar>
      </template>
    </v-btn>
    <v-btn
      v-if="!state.student"
      color="#01cda9"
      variant="flat"
      class="ml-2 d-none d-md-block text-white"
      :to="{ name: 'login' }"
    >
      تسجيل الدخول
    </v-btn>
    <v-btn
      v-if="!state.student"
      color="orange-darken-1"
      variant="flat"
      class="d-none d-md-block"
      :to="{ name: 'signup' }"
    >
      حساب جديد
    </v-btn>
    <v-btn
      v-if="state.student"
      color="red-darken-1"
      variant="flat"
      class="d-none d-md-block"
      @click="logout"
    >
      تسجيل خروج
    </v-btn>
    <v-btn icon id="barMenu" class="d-block d-md-none"
      ><v-icon>mdi-dots-vertical</v-icon>
    </v-btn>

    <v-menu activator="#barMenu" offset="10" class="pa-4">
      <v-list>
        <v-list-item
          title="حسابي"
          :prepend-avatar="require('@/assets/images/user.jpg')"
          link
          class="mb-2"
          :to="{ name: 'profile' }"
          v-if="state.student"
        ></v-list-item>
        <v-list-item
          title="الرئيسية"
          prepend-icon="mdi-home"
          link
          :to="{ name: 'landing' }"
        ></v-list-item>

        <v-list-item
          title="المحاضرات"
          prepend-icon="mdi-monitor"
          link
          :to="{ name: 'home' }"
        ></v-list-item>
        <v-list-item
          title="الاعدادات"
          prepend-icon="mdi-cog-outline"
          link
          :to="{ name: 'settings' }"
          v-if="state.student"
        ></v-list-item>
        <v-divider></v-divider>
        <v-list-item
          title="تسجيل دخول"
          link
          prepend-icon="mdi-login"
          v-if="!state.student"
          @click="$router.push({ name: 'login' })"
        >
        </v-list-item>
        <v-list-item
          title="انشاء حساب"
          link
          prepend-icon="mdi-account"
          v-if="!state.student"
          @click="$router.push({ name: 'signup' })"
        >
        </v-list-item>
        <v-list-item
          title="تسجيل خروج"
          prepend-icon="mdi-logout"
          link
          @click="logout"
          v-if="state.student"
        ></v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
import { computed, reactive } from "vue";
import { useStore } from "vuex";

export default {
  inject: ["Emitter"],
  methods: {
    openAppDrawer() {
      this.Emitter.emit("toggleAppDrawer");
    },
  },
  setup() {
    const store = useStore();
    const state = reactive({
      student: computed(() => store.state.student),
    });
    const logout = () => {
      store.dispatch("logout");
    };
    return { state, logout };
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
