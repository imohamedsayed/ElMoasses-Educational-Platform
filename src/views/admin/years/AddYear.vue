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
import { reactive, computed } from "vue";
import { toast } from "vue3-toastify";
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import axios from "axios";

export default {
  components: { DashLayout },
  setup() {
    const state = reactive({
      year: "",
      status: true,
      loading: false,
    });

    const rules = computed(() => {
      return {
        year: { required },
      };
    });
    const v$ = useVuelidate(rules, state);

    const add = async () => {
      v$.value.$validate();
      if (!v$.value.$error) {
        state.loading = true;
        try {
          const res = await axios.post("api_dashboard/years", {
            name: state.year,
            status: Number(state.status).toString(),
          });
          if (res.status == 200) {
            toast.success("تم اضافة السنة الدراسية بنجاح", {
              autoClose: 1500,
            });
          } else {
            throw new Error(res.response.data.message);
          }
        } catch (err) {
          toast.error(err.message, {
            autoClose: 1500,
          });
        }

        state.loading = false;
      } else {
        toast.error("ادخل الصف الدراسي", {
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
