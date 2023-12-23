<template>
  <DashLayout>
    <v-container>
      <v-card class="mt-10 dash-card pa-4" :loading="state.loading">
        <h2>
          <v-icon class="ml-2">mdi-chat-question-outline</v-icon>
          الاسئلة
        </h2>
        <v-divider class="mt-4 mb-15"></v-divider>
        <div class="mt-16">
          <QuestionsList :questions="state.questions" />
        </div>
      </v-card>
    </v-container>
  </DashLayout>
</template>

<script>
import DashLayout from "@/components/dashboard/layout/DashLayout.vue";
import { reactive, computed, onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { toast } from "vue3-toastify";
import axios from "axios";
import QuestionsList from "@/components/dashboard/questions/QuestionsList.vue";
export default {
  components: { DashLayout, QuestionsList },
  props: ["eid"],
  setup(props) {
    const store = useStore();
    const router = useRouter();

    const state = reactive({
      loading: false,
      questions: [],
      admin: computed(() => store.state.admin),
    });

    onMounted(async () => {
      if (!state.admin) router.push({ name: "adminLogin" });
      state.loading = true;
      try {
        const res = await axios.get(
          "api_dashboard/questions/" + props.eid + "/exam"
        );
        if (res.status == 200) {
          state.questions = res.data.data;
        } else {
          throw new Error(res.response.data.message);
        }
      } catch (error) {
        toast.error(error.message);
      }
      state.loading = false;
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
