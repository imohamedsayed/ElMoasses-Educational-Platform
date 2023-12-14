<template>
  <DashLayout> </DashLayout>
</template>

<script>
import DashLayout from "@/components/dashboard/layout/DashLayout.vue";
import { reactive, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
export default {
  components: { DashLayout },
  setup() {
    const store = useStore();
    const router = useRouter();
    const state = reactive({
      admin: computed(() => store.state.admin),
    });

    onMounted(() => {
      if (!state.admin) {
        router.push("/dashboard/login");
      }
    });
  },
};
</script>

<style lang="scss" scoped></style>
