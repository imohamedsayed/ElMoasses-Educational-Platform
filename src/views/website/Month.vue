<template>
  <AppLayout>
    <v-container>
      <v-sheet class="lectures-title" width="100%" height="20vh">
        <h1 v-motion-slide-top>المؤسس </h1>
        <v-breadcrumbs :items="items" class="mx-auto" v-motion-slide-bottom>
          <template v-slot:title="{ item }">
            {{ item.title.toUpperCase() }}
          </template>
        </v-breadcrumbs>
      </v-sheet>
      <h1 class="mt-10 text-center" v-motion-slide-right v-if="month">
        <v-icon>mdi-calendar</v-icon>
        محتوى {{ month.name || "الشهر الدراسي" }}
      </h1>
      <v-divider
        width="200"
        class="mx-auto mt-5"
        thickness="5"
        color="teal"
      ></v-divider>
      <div class="month-content">
        <Content :month="props.id" />
      </div>
    </v-container>
  </AppLayout>
</template>

<script setup>
import AppLayout from "@/components/website/AppLayout.vue";
import Content from "@/components/website/Month/content/Content.vue";
import axios from "axios";
import { computed } from "vue";
import { reactive } from "vue";
import { onMounted } from "vue";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const props = defineProps({
  id: String,
});

const items = ref([
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
    title: "محتوى الشهر الدراسي",
    disabled: true,
    href: "/month/" + props.id,
  },
]);

const state = reactive({
  student: computed(() => useStore().state.student),
});

const month = ref("");

onMounted(async () => {
  if (!state.student) useRouter().push({ name: "login" });

  try {
    const res = await axios.get("api/get-month-byId/" + props.id);
    if (res.status == 200) month.value = res.data.data;
  } catch (error) {}
});
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
