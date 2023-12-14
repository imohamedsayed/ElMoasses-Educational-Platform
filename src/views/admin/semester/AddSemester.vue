<template>
  <DashLayout>
    <v-container>
      <v-card class="mt-10 dash-card pa-4" :loading="state.loading">
        <h2>
          <v-icon class="ml-2">mdi-plus-circle</v-icon>
          اضافة سنة دراسية جديدة
        </h2>
        <v-divider class="mt-4 mb-15"></v-divider>
        <form class="pa-10" @submit.prevent="add">
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                class="bg-white"
                label="الترم الدراسي"
                variant="outlined"
                prepend-inner-icon="mdi-calendar"
                color="teal-darken-1"
                hint="مثال: الترم الأول "
                v-model="state.semester"
                :error-messages="
                  v$.semester.$error ? v$.semester.$errors[0].$message : ''
                "
              >
              </v-text-field>
            </v-col>
          </v-row>
          <div class="text-center">
            <v-btn
              class="mt-10"
              color="teal-darken-1"
              size="large"
              type="submit"
              :loading="state.loading"
              >اضافة</v-btn
            >
          </div>
        </form>
      </v-card>
    </v-container>
  </DashLayout>
</template>

<script>
import DashLayout from "@/components/dashboard/layout/DashLayout.vue";
import { reactive, onMounted, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { toast } from "vue3-toastify";
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import axios from "axios";

export default {
  components: { DashLayout },
  props: ["yid"],
  setup(props) {
    const store = useStore();
    const router = useRouter();
    const state = reactive({
      semester: "",
      loading: false,
      admin: computed(() => store.state.admin),
    });

    onMounted(() => {
      if (!state.admin) router.push({ name: "adminLogin" });
    });

    const rules = computed(() => {
      return {
        semester: { required },
      };
    });
    const v$ = useVuelidate(rules, state);

    const add = async () => {
      v$.value.$validate();
      if (!v$.value.$error) {
        state.loading = true;
        try {
          const res = await axios.post("api_dashboard/semesters", {
            name: state.semester,
            year_id: props.yid,
          });
          if (res.status == 200) {
            toast.success("تم اضافة الترم الدراسي بنجاح");
          } else {
            throw new Error(res.response.data.message);
          }
        } catch (err) {
          toast.error(err.message, {
            autoClose: 1000,
          });
        }

        state.loading = false;
      } else {
        toast.error("ادخل الترم الدراسي", {
          autoClose: 1000,
        });
      }
    };
    return { state, add, v$ };
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
