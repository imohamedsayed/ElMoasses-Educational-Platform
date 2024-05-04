<template>
  <AppLayout>
    <v-container>
      <v-sheet class="lectures-title" width="100%" height="20vh">
        <h1>المؤسس </h1>
        <v-breadcrumbs :items="items" class="mx-auto">
          <template v-slot:title="{ item }">
            {{ item.title.toUpperCase() }}
          </template>
        </v-breadcrumbs>
      </v-sheet>
      <v-row class="home-content ga-5 mb-16">
        <v-col cols="12" lg="3">
          <v-tabs
            v-model="tab"
            direction="vertical"
            color="teal-accent-3"
            class="content-nav"
          >
            <h3>الصفوف الدراسية</h3>
            <v-list v-if="!loading">
              <v-list-group v-for="year in years" :key="year.id">
                <template v-slot:activator="{ props }">
                  <v-list-item
                    prepend-icon="mdi-folder-outline"
                    :title="year.name"
                    value="form"
                    v-bind="props"
                  ></v-list-item>
                </template>
                <Semesters :id="year.id" />
              </v-list-group>
            </v-list>
            <v-list v-else>
              <v-skeleton-loader :loading="loading" type="list-item-two-line">
                <v-list-item title="Title"></v-list-item>
              </v-skeleton-loader>
              <v-skeleton-loader :loading="loading" type="list-item-two-line">
                <v-list-item title="Title"></v-list-item>
              </v-skeleton-loader>
              <v-skeleton-loader :loading="loading" type="list-item-two-line">
                <v-list-item title="Title"></v-list-item>
              </v-skeleton-loader>
            </v-list>
          </v-tabs>
        </v-col>
        <v-col>
          <h3 class="mb-10">المحتوى الدراسي</h3>
          <v-window
            v-model="tab"
            class="lec"
            v-if="state.semesters.length && !loading"
          >
            <v-window-item
              v-for="semester in state.semesters"
              :key="semester.id"
              :value="semester.id"
            >
              <v-card flat v-if="tab == semester.id">
                <MonthsList :semester="semester.id" />
              </v-card>
            </v-window-item>
          </v-window>
          <div class="text-center" v-else-if="!loading">
            <v-img
              :src="require('@/assets/images/4.svg')"
              width="600"
              class="mx-auto"
            ></v-img>
            <h2 class="mt-8">لم يتم اضافة محتوي بعد</h2>
          </div>
          <div class="text-center" v-else>
            <v-progress-circular
              :width="5"
              color="green"
              size="200"
              indeterminate
            ></v-progress-circular>
            <h2 class="mt-8 text-grey">تحميل المحتوي ...</h2>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </AppLayout>
</template>

<script>
import AppLayout from "@/components/website/AppLayout.vue";
import axios from "axios";
import { onMounted, computed } from "vue";
import { ref } from "vue";
import Semesters from "@/components/website/home/Semesters.vue";
import MonthsList from "@/components/website/Month/MonthsList.vue";
import { useStore } from "vuex";
import { reactive } from "vue";
export default {
  components: { AppLayout, Semesters, MonthsList },
  data: () => ({
    items: [
      {
        title: "الرئيسية",
        disabled: false,
        href: "/",
      },
      {
        title: "الصفوف الدراسية",
        disabled: true,
        href: "/home",
      },
    ],
  }),
  setup() {
    let years = ref([]);
    let loading = ref(false);
    const store = useStore();
    const tab = ref(0);
    const state = reactive({
      semesters: computed(() => store.state.semesters),
    });

    onMounted(async () => {
      loading.value = true;
      try {
        const res = await axios.get("api/get-all-active-years");
        if (res.status == 200) {
          years.value = res.data.Year;
          store.dispatch("clearSemesters");
        } else {
          throw new Error(res.response.data.message);
        }
      } catch (error) {
        console.log("Error while fetching years: " + error);
      }
      loading.value = false;
    });
    tab.value = state.semesters[0]?.id || 1;

    return { years, loading, state, tab };
  },
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
h3 {
  text-align: center;
  background: var(--caribian-green);
  color: var(--seashell);
  padding: 10px;
}
</style>
