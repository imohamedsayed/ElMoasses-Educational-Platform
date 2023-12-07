<template>
  <AppLayout>
    <v-container>
      <v-sheet class="lectures-title" width="100%" height="20vh">
        <h1>المؤسس للرياضيات</h1>
        <v-breadcrumbs :items="items" class="mx-auto">
          <template v-slot:title="{ item }">
            {{ item.title.toUpperCase() }}
          </template>
        </v-breadcrumbs>
      </v-sheet>
      <v-row class="home-content ga-5">
        <v-col cols="12" lg="3">
          <v-tabs
            v-model="tab"
            direction="vertical"
            color="teal-accent-3"
            class="content-nav"
          >
            <h3>الصفوف الدراسية</h3>
            <v-list>
              <v-list-group>
                <template v-slot:activator="{ props }">
                  <v-list-item
                    prepend-icon="mdi-login"
                    title="الصف الأول الثانوي"
                    value="form"
                    v-bind="props"
                  ></v-list-item>
                </template>
                <v-list-item>
                  <v-tab value="option-1">
                    <v-icon start> mdi-account </v-icon>
                    الترم الأول
                  </v-tab>
                </v-list-item>
                <v-list-item>
                  <v-tab value="option-2">
                    <v-icon start> mdi-lock </v-icon>
                    الترم الثاني
                  </v-tab>
                </v-list-item>
              </v-list-group>
              <v-list-group>
                <template v-slot:activator="{ props }">
                  <v-list-item
                    prepend-icon="mdi-login"
                    title="الصف الثاني الثانوي"
                    value="form"
                    v-bind="props"
                  ></v-list-item>
                </template>
                <v-list-item>
                  <v-tab value="option-3">
                    <v-icon start> mdi-account </v-icon>
                    الترم الأول
                  </v-tab>
                </v-list-item>
              </v-list-group>
            </v-list>
          </v-tabs>
        </v-col>
        <v-col>
          <v-window v-model="tab" class="lec">
            <h3 class="mb-10">المحتوى الدراسي</h3>
            <v-window-item value="option-1">
              <v-card flat v-if="tab == 'option-1'">
                <MonthsList />
              </v-card>
            </v-window-item>
            <v-window-item value="option-2">
              <v-card flat v-if="tab == 'option-2'">
                <MonthsList />
              </v-card>
            </v-window-item>
            <v-window-item value="option-3">
              <v-card flat v-if="tab == 'option-3'">
                <MonthsList />
              </v-card>
            </v-window-item>
          </v-window>
        </v-col>
      </v-row>
    </v-container>
  </AppLayout>
</template>

<script>
import AppLayout from "@/components/website/AppLayout.vue";
import MonthsList from "@/components/website/Month/MonthsList.vue";
export default {
  components: { AppLayout, MonthsList },
  data: () => ({
    items: [
      {
        title: "الرئيسية",
        disabled: false,
        href: "/landing",
      },
      {
        title: "الصفوف الدراسية",
        disabled: true,
        href: "/home",
      },
    ],
    tab: "option-1",
  }),
};
</script>

<style lang="scss" scoped>
.lectures-title {
  background: var(--martinique);
  display: grid;
  place-content: center;
  color: var(--seashell);
  text-align: center;
}
.home-content {
  margin-top: 200px;
  margin-bottom: 200px;
  min-height: 50vh;
}

.content-nav {
  h3 {
    text-align: center;
    background: var(--caribian-green);
    color: var(--seashell);
    padding: 10px;
  }
}

.lec {
  h3 {
    text-align: center;
    background: var(--caribian-green);
    color: var(--seashell);
    padding: 10px;
  }
}
</style>
