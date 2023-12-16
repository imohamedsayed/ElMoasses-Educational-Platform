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
          <MonthList :months="state.months" />
        </div>
      </v-card>
    </v-container>
  </DashLayout>
</template>

<script>
import DashLayout from "@/components/dashboard/layout/DashLayout.vue";
import MonthList from "@/components/dashboard/months/MonthsList.vue";
import { reactive, computed, onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { toast } from "vue3-toastify";
import axios from "axios";
export default {
  components: { DashLayout, MonthList },
  props: ["sid"],
  setup(props) {
    const store = useStore();
    const router = useRouter();
    const state = reactive({
      loading: false,
      admin: computed(() => store.state.admin),
      months: [],
    });

    onMounted(async () => {
      if (!state.admin) router.push({ name: "adminLogin" });

      try {
        const res = await axios.get(
          "api_dashboard/months/" + props.sid + "/semester"
        );
        if (res.status == 200) {
          state.months = res.data.data;
        } else {
          throw new Error(res.response.data.message);
        }
      } catch (error) {
        toast.error(error.message);
      }
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
