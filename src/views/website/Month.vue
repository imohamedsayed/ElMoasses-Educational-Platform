<template>
  <AppLayout>
    <v-container>
      <v-sheet class="lectures-title" width="100%" height="20vh">
        <h1 v-motion-slide-top>المؤسس للرياضيات</h1>
        <v-breadcrumbs :items="items" class="mx-auto" v-motion-slide-bottom>
          <template v-slot:title="{ item }">
            {{ item.title.toUpperCase() }}
          </template>
        </v-breadcrumbs>
      </v-sheet>
      <h1 class="mt-10 text-center" v-motion-slide-right>
        <v-icon>mdi-calendar</v-icon>
        شهر نوفمبر
      </h1>
      <v-divider
        width="200"
        class="mx-auto mt-5"
        thickness="5"
        color="teal"
      ></v-divider>
      <div class="month-content">
        <Content />
      </div>
    </v-container>
  </AppLayout>
</template>

<script>
import AppLayout from "@/components/website/AppLayout.vue";
import Content from "@/components/website/Month/content/Content.vue";
export default {
  components: { AppLayout, Content },
  data: () => ({
    items: [
      {
        title: "الرئيسية",
        disabled: false,
        href: "/",
      },
      {
        title: "الصفوف الدراسية",
        disabled: false,
        href: "/home",
      },
      {
        title: "شهر نوفمبر",
        disabled: true,
        href: "/month/1",
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
.month-content {
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
