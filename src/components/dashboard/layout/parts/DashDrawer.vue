<template>
  <v-navigation-drawer
    location="right"
    v-model="AppDrawer"
    :rail="AppRail"
    permanent
    @click="AppRail = false"
    v-if="state.admin"
  >
    <v-list-item
      :prepend-avatar="require('@/assets/images/user.jpg')"
      :title="state.admin.name"
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
        prepend-icon="mdi-account-multiple"
        title="الطلاب"
        value="students"
        color="green-lighten-1"
        :to="{ name: 'students' }"
      ></v-list-item>
      <v-list-item
        prepend-icon="mdi-security"
        title="الأدمن"
        value="students"
        color="green-lighten-1"
        :to="{ name: 'admins' }"
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
          class="insider-list"
        ></v-list-item>
        <v-list-item
          prepend-icon="mdi-calendar"
          title="السنوات الدراسية"
          value="all years"
          :to="{ name: 'years' }"
          class="insider-list"
        ></v-list-item>
      </v-list-group>

      <v-list-group>
        <template v-slot:activator="{ props }">
          <v-list-item
            prepend-icon="mdi-store"
            title="المتجر"
            value="store"
            v-bind="props"
            link
          ></v-list-item>
        </template>

        <v-list-item
          prepend-icon="mdi-shopping-outline"
          title="المنتجات"
          value="all products"
          :to="{ name: 'dashStore' }"
          class="insider-list"
        ></v-list-item>

        <v-list-item
          prepend-icon="mdi-store-plus"
          title="اضافة منتج"
          value="add Product"
          :to="{ name: 'addProduct' }"
          class="insider-list"
        ></v-list-item>
      </v-list-group>
      <v-list-group>
        <template v-slot:activator="{ props }">
          <v-list-item
            prepend-icon="mdi-cash"
            title="الاشتراكات"
            value="subscriptions"
            v-bind="props"
            link
          ></v-list-item>
        </template>

        <v-list-item
          prepend-icon="mdi-cash-multiple"
          title="الاشتراكات"
          value="all subscriptions"
          :to="{ name: 'dashSubscriptions' }"
          class="insider-list"
        ></v-list-item>

        <v-list-item
          prepend-icon="mdi-account-cash"
          title="منح اشتراك"
          value="add subscription"
          :to="{ name: 'grantSubscription' }"
          class="insider-list"
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
import { computed } from "vue";
import { reactive } from "vue";
import { useStore } from "vuex";
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
  setup() {
    const store = useStore();
    const state = reactive({
      admin: computed(() => store.state.admin),
    });
    return { state };
  },
};
</script>

<style></style>
