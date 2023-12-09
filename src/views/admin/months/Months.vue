<template>
  <DashLayout>
    <v-container>
      <v-card class="mt-10 dash-card pa-4" :loading="state.loading">
        <h2>
          <v-icon class="ml-2">mdi-calendar-multiple-check</v-icon>
          الشهور الدراسية
        </h2>
        <v-divider class="mt-4 mb-15"></v-divider>
        <div class="mt-16">
          <MonthList />
        </div>
      </v-card>
    </v-container>
  </DashLayout>
</template>

<script>
import DashLayout from "@/components/dashboard/layout/DashLayout.vue";
import MonthList from "@/components/dashboard/months/MonthsList.vue";
import { reactive } from "vue";
export default {
  components: { DashLayout, MonthList },
  setup() {
    const state = reactive({
      loading: false,
    });

    return { state };
  },
};
</script>

<style lang="scss">
.dash-card {
  background-color: #f8fbfe;
  input {
    background: white;
  }
}
</style>
