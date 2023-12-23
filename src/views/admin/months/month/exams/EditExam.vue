<template>
  <DashLayout>
    <v-container>
      <v-card class="mt-10 dash-card pa-4" :loading="state.loading">
        <h2>
          <v-icon class="ml-2">mdi-file-document-edit</v-icon>
          تعديل الامتحان
        </h2>
        <v-divider class="mt-4 mb-15"></v-divider>
        <form class="pa-10" @submit.prevent="edit">
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                class="bg-white"
                label="اسم الامتحان"
                variant="outlined"
                prepend-inner-icon="mdi-file-document-outline"
                color="teal-darken-1"
                hint="مثال: امتحان الوحدة الأولي"
                v-model="state.name"
                :error-messages="
                  v$.name.$error ? v$.name.$errors[0].$message : ''
                "
              >
              </v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                class="bg-white"
                label="وصف الامتحان"
                variant="outlined"
                prepend-inner-icon="mdi-file-document-check-outline"
                color="teal-darken-1"
                v-model="state.description"
                :error-messages="
                  v$.description.$error
                    ? v$.description.$errors[0].$message
                    : ''
                "
              >
              </v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                type="datetime-local"
                class="bg-white"
                label="معاد البدء"
                variant="outlined"
                prepend-inner-icon="mdi-calendar-clock-outline"
                color="teal-darken-1"
                v-model="state.start_at"
                :error-messages="
                  v$.start_at.$error ? v$.start_at.$errors[0].$message : ''
                "
              >
              </v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                type="datetime-local"
                class="bg-white"
                label="معاد الانتهاء"
                variant="outlined"
                prepend-inner-icon="mdi-calendar-clock-outline"
                color="teal-darken-1"
                v-model="state.end_at"
                :error-messages="
                  v$.end_at.$error ? v$.end_at.$errors[0].$message : ''
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
import { reactive, computed, onMounted } from "vue";
import { toast } from "vue3-toastify";
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import axios from "axios";
export default {
  components: { DashLayout },
  props: ["mid", "id"],
  setup(props) {
    const store = useStore();
    const router = useRouter();
    const state = reactive({
      name: "",
      description: "",
      start_at: "",
      end_at: "",
      loading: false,
      status: false,
      admin: computed(() => store.state.admin),
    });
    onMounted(async () => {
      if (!state.admin) router.push({ name: "adminLogin" });
      state.loading = true;

      try {
        const res = await axios.get("api_dashboard/exams/" + props.id);

        if (res.status == 200) {
          console.log(res.data.data);
          const exam = res.data.data;
          state.name = exam.name;
          state.description = exam.description;
          state.start_at = exam.start_at;
          state.end_at = exam.end_at;
          state.status = exam.status == "Puplished" ? true : false;
        }
      } catch (error) {
        toast.error(error.message);
      }

      state.loading = false;
    });
    const rules = computed(() => {
      return {
        name: { required },
        description: { required },
        start_at: { required },
        end_at: { required },
        status: { required },
      };
    });
    const v$ = useVuelidate(rules, state);

    const edit = async () => {
      v$.value.$validate();
      if (!v$.value.$error) {
        state.loading = true;
        try {
          let start_at = state.start_at.replace("T", " ");
          let end_at = state.end_at.replace("T", " ");

          if (start_at.length == 19)
            start_at = start_at.substring(0, start_at.length - 3);
          if (end_at.length == 19)
            end_at = end_at.substring(0, end_at.length - 3);

          const data = {
            name: state.name,
            description: state.description,
            start_at,
            end_at,
            status: Number(state.status),
          };
          const res = await axios.post("api_dashboard/exams/" + props.id, data);
          if (res.status == 202) {
            toast.success("تعديل الامتحان بنجاح");
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
        toast.error(" ادخل بيانات الامتحان بشكل صحيح", {
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
