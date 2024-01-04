<template>
  <DashLayout>
    <v-container>
      <v-card class="mt-10 dash-card pa-4" :loading="state.loading">
        <h2>
          <v-icon class="ml-2">mdi-account-cash</v-icon>
          منح اشتراك للطلاب
        </h2>
        <v-divider class="mt-4 mb-15"></v-divider>
        <form class="pa-10" @submit.prevent="add">
          <v-row class="align-center">
            <v-col cols="12" md="6">
              <v-select
                label="الطالب"
                :items="state.students"
                variant="outlined"
                item-value="id"
                item-title="national_id_card"
                prepend-inner-icon="mdi-account"
                color="green"
                v-model="state.studentId"
                :error-messages="
                  v$.studentId.$error ? v$.studentId.$errors[0].$message : ''
                "
              >
              </v-select>
            </v-col>
            <v-col cols="12" md="6">
              <v-select
                label="الشهر"
                :items="state.months"
                item-value="id"
                item-title="name"
                variant="outlined"
                prepend-inner-icon="mdi-calendar"
                color="green"
                v-model="state.monthId"
                :error-messages="
                  v$.monthId.$error ? v$.monthId.$errors[0].$message : ''
                "
              >
              </v-select>
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
import { reactive, computed, onMounted } from "vue";
import { toast } from "vue3-toastify";
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import axios from "axios";

export default {
  components: { DashLayout },
  setup() {
    const state = reactive({
      studentId: "",
      students: [],
      months: [],
      monthId: "",
      status: true,
      loading: false,
    });

    onMounted(async () => {
      state.loading = true;
      try {
        const monthRes = await axios.get("api_dashboard/months");
        state.months = monthRes.data.data;
        const studentRes = await axios.get(
          "api_dashboard/get-select-info-of-student"
        );
        state.students = studentRes.data.data;
      } catch (error) {
        toast.error(error.message);
      }
      state.loading = false;
    });

    const rules = computed(() => {
      return {
        studentId: { required },
        monthId: { required },
      };
    });
    const v$ = useVuelidate(rules, state);

    const add = async () => {
      v$.value.$validate();
      if (!v$.value.$error) {
        state.loading = true;
        try {
          let data = {
            student_id: state.studentId,
            month_id: state.monthId,
            status: Number(state.status).toString(),
          };
          const res = await axios.post("api_dashboard/subscriptions", data);
          if (res.status == 201) {
            toast.success("تم اضافة الاشتراك  ", {
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
        toast.error("ادخل البيانات كاملة و صحيحة", {
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
