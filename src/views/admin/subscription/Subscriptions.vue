<template>
  <DashLayout>
    <v-container>
      <v-card class="mt-10 dash-card pa-4" :loading="state.loading">
        <h2>
          <v-icon class="ml-2">mdi-cash-multiple</v-icon>
          الاشتراكات 
        </h2>
        <v-divider class="mt-4 mb-15"></v-divider>
        <div class="mt-16">
          <SubscriptionsList :subscriptions="state.subscriptions" :loading="state.loading" />
        </div>
      </v-card>
    </v-container>
  </DashLayout>
</template>

<script>
import DashLayout from "@/components/dashboard/layout/DashLayout.vue";
import SubscriptionsList from "@/components/dashboard/subscriptions/SubscriptionsList.vue";
import { onMounted, reactive } from "vue";
import axios from "axios";
import { toast } from "vue3-toastify";
import { computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
export default {
  components: { DashLayout, SubscriptionsList },
  setup() {
    const store = useStore();
    const state = reactive({
      loading: false,
      subscriptions: [],
      admin: computed(() => store.state.admin),
    });
    const router = useRouter();
    onMounted(async () => {
      if (!state.admin) router.push({ name: "adminLogin" });

      state.loading = true;
      try {
        const res = await axios.get("api_dashboard/all-subscription");

        if (res.status == 200) {
          state.subscriptions = res.data.data;
        } else {
          throw new Error(res.response.data.message);
        }
      } catch (error) {
        toast.error(error.message, {
          autoClose: 3000,
        });
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
