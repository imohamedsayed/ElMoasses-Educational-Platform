<template>
  <v-navigation-drawer
    location="right"
    v-model="AppDrawer"
    :rail="AppRail"
    permanent
    @click="AppRail = false"
  >
    <v-list-item
      v-if="state.student"
      :prepend-avatar="require('@/assets/images/user.jpg')"
      :title="state.student.firstName + ' ' + state.student.lastName"
      nav
    >
      <template v-slot:append>
        <v-btn
          variant="text"
          icon="mdi-chevron-right"
          @click.stop="AppRail = !AppRail"
        ></v-btn>
      </template>
    </v-list-item>
    <v-list-item v-if="!state.student && !AppRail">
      <template v-slot:append>
        <v-btn
          variant="text"
          icon="mdi-chevron-right"
          @click.stop="AppRail = !AppRail"
        ></v-btn>
      </template>
    </v-list-item>

    <v-divider></v-divider>

    <v-list density="compact" nav>
      <v-list-item
        v-if="state.student"
        prepend-icon="mdi-account"
        title="حسابي"
        value="account"
        :to="{ name: 'profile' }"
        color="green-lighten-1"
      ></v-list-item>
      <v-list-item
        prepend-icon="mdi-home-city"
        title="الرئيسية"
        value="home"
        :to="{ name: 'landing' }"
        color="green-lighten-1"
      ></v-list-item>
      <v-list-item
        prepend-icon="mdi-bookshelf"
        value="studies"
        title="الصفوف الدراسية"
        :to="{ name: 'home' }"
        color="green-lighten-1"
      ></v-list-item>
      <v-list-item
        prepend-icon="mdi-storefront-outline"
        title="المتجر"
        value="store"
        color="green-lighten-1"
        :to="{ name: 'store' }"
      ></v-list-item>

    

      <v-divider></v-divider>

      <v-list-item
        v-if="state.student"
        prepend-icon="mdi-cog-outline"
        title="الاعدادات"
        value="settings"
        color="green-lighten-1"
        :to="{ name: 'settings' }"
      ></v-list-item>

      <v-list-item
        v-if="state.student"
        prepend-icon="mdi-logout"
        title="تسجيل الخروج"
        value="logout"
        color="green-lighten-1"
        @click="logout"
      ></v-list-item>

      <v-list-item
        v-if="!state.student"
        prepend-icon="mdi-login"
        title="تسجيل الدخول"
        value="login"
        color="green-lighten-1"
        :to="{ name: 'login' }"
      ></v-list-item>
      <v-list-item
        v-if="!state.student"
        prepend-icon="mdi-account"
        title="انشاء حساب"
        value="signup"
        color="green-lighten-1"
        :to="{ name: 'signup' }"
      ></v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { reactive, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default {
  inject: ["Emitter"],
  data: () => ({
    AppRail: true,
    AppDrawer: false,
  }),
  mounted() {
    this.Emitter.on(
      "toggleAppDrawer",
      () => (this.AppDrawer = !this.AppDrawer)
    );
  },
  setup() {
    const router = useRouter();

    const store = useStore();
    const state = reactive({
      student: computed(() => store.state.student),
    });
    const logout = async () => {
      await store.dispatch("logout");
      router.push({ name: "landing" });
    };
    return { state, logout };
  },
};
</script>

<style></style>
