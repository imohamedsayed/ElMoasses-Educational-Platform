<template>
  <DashLayout>
    <v-container>
      <v-card class="mt-10 dash-card pa-4" :loading="state.loading">
        <h2>
          <v-icon class="ml-2">mdi-plus-circle</v-icon>
          تعديل السنة الدراسية
        </h2>
        <v-divider class="mt-4 mb-15"></v-divider>
        <form class="pa-10" @submit.prevent="edit">
          <v-row class="align-center">
            <v-col cols="12" md="6">
              <v-text-field
                class="bg-white"
                label="السنة الدراسية"
                variant="outlined"
                prepend-inner-icon="mdi-calendar"
                color="teal-darken-1"
                hint="مثال: الصف الأول الثانوي"
                v-model="state.year"
                :error-messages="
                  v$.year.$error ? v$.year.$errors[0].$message : ''
                "
              >
              </v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <p class="text-weight-bold">الحالة:</p>
              <v-switch
                :label="state.status ? 'مفعل' : 'غير مفعل'"
                true-icon="mdi-check"
                color="success"
                v-model="state.status"
              ></v-switch>
            </v-col>
          </v-row>
          <div class="text-center">
            <v-btn
              class="mt-10"
              color="teal-darken-1"
              size="large"
              type="submit"
              :loading="state.loading"
              >تعديل</v-btn
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
  props: ["id"],
  setup(props) {
    const store = useStore();
    const router = useRouter();
    const state = reactive({
      year: "",
      loading: false,
      status: true,
      admin: computed(() => store.state.admin),
    });

    const rules = computed(() => {
      return {
        year: { required },
      };
    });

    onMounted(async () => {
      if (!state.admin) router.push({ name: "adminLogin" });

      state.loading = true;

      try {
        const res = await axios.get("api_dashboard/years/" + props.id);
        if (res.status == 200) {
          state.year = res.data.data.name;
        } else {
          throw new Error(res.response.data.message);
        }
      } catch (error) {
        toast.error(error.message, {
          autoClose: 1500,
        });
      }

      state.loading = false;
    });

    const v$ = useVuelidate(rules, state);

    const edit = async () => {
      v$.value.$validate();
      if (!v$.value.$error) {
        state.loading = true;
        try {
          const res = await axios.post("api_dashboard/years/" + props.id, {
            name: state.year,
            status: Number(state.status).toString(),
          });

          if (res.status == 200) {
            toast.success("تم تعديل السنة الدراسية بنجاح");
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
        toast.error("ادخل الصف الدراسي", {
          autoClose: 1000,
        });
      }
    };
    return { state, edit, v$ };
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
