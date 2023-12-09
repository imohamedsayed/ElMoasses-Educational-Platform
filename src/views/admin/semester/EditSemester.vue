<template>
  <DashLayout>
    <v-container>
      <v-card class="mt-10 dash-card pa-4" :loading="state.loading">
        <h2>
          <v-icon class="ml-2">mdi-plus-circle</v-icon>
          اضافة سنة دراسية جديدة
        </h2>
        <v-divider class="mt-4 mb-15"></v-divider>
        <form class="pa-10" @submit.prevent="edit">
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
import { reactive, computed } from "vue";
import { toast } from "vue3-toastify";
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";

export default {
  components: { DashLayout },
  setup() {
    const state = reactive({
      semester: "",
      loading: false,
    });

    const rules = computed(() => {
      return {
        semester: { required },
      };
    });
    const v$ = useVuelidate(rules, state);

    const edit = async () => {
      v$.value.$validate();
      if (!v$.value.$error) {
        state.loading = true;
        try {
          // let data = {
          //   email: state.email,
          //   password: state.password,
          // };
          // await store.dispatch("customerLogin", data);
          toast.success("Login Successfully", {
            autoClose: 1000,
          });
          // router.push("/home");
        } catch (err) {
          toast.error(err, {
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
