<template>
  <DashLayout>
    <v-container>
      <v-card class="mt-10 dash-card pa-4" :loading="state.loading">
        <h2>
          <v-icon class="ml-2">mdi-plus-circle</v-icon>
          اضافة ادمن جديد
        </h2>
        <v-divider class="mt-4 mb-15"></v-divider>
        <form class="pa-10" @submit.prevent="add">
          <v-row class="align-center">
            <v-col cols="12" md="6">
              <v-text-field
                class="bg-white"
                label="الاسم"
                variant="outlined"
                prepend-inner-icon="mdi-account"
                color="teal-darken-1"
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
                label="الايميل"
                variant="outlined"
                prepend-inner-icon="mdi-email"
                color="teal-darken-1"
                v-model="state.email"
                :error-messages="
                  v$.email.$error ? v$.email.$errors[0].$message : ''
                "
              >
              </v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                :append-inner-icon="state.visible ? 'mdi-eye-off' : 'mdi-eye'"
                :type="state.visible ? 'text' : 'password'"
                placeholder="الرقم السرى"
                prepend-inner-icon="mdi-lock-outline"
                @click:append-inner="state.visible = !state.visible"
                variant="outlined"
                color="green-lighten-1"
                class="mb-4"
                v-model="state.password"
                :counter="6"
                :error-messages="
                  v$.password.$error ? v$.password.$errors[0].$message : ''
                "
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                :append-inner-icon="state.visible2 ? 'mdi-eye-off' : 'mdi-eye'"
                :type="state.visible2 ? 'text' : 'password'"
                placeholder="تأكيد الرقم السري"
                prepend-inner-icon="mdi-lock-outline"
                @click:append-inner="state.visible2 = !state.visible2"
                variant="outlined"
                color="green-lighten-1"
                class="mb-4"
                v-model="state.passwordConfirm"
                :counter="6"
                :error-messages="
                  v$.passwordConfirm.$error
                    ? v$.passwordConfirm.$errors[0].$message
                    : ''
                "
              ></v-text-field>
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
import { required, email, minLength, sameAs } from "@vuelidate/validators";
import axios from "axios";

export default {
  components: { DashLayout },
  setup() {
    const state = reactive({
      name: "",
      email: "",
      password: "",
      passwordConfirm: "",
      loading: false,
      visible: false,
      visible2: false,
    });

    const rules = computed(() => {
      return {
        name: { required },
        email: { required, email },
        password: { required, minLength: minLength(6) },
        passwordConfirm: {
          required,
          minLength: minLength(6),
          sameAs: sameAs(state.password),
        },
      };
    });
    const v$ = useVuelidate(rules, state);

    const add = async () => {
      v$.value.$validate();
      if (!v$.value.$error) {
        state.loading = true;
        try {
          const res = await axios.post("api_dashboard/admins", {
            name: state.name,
            email: state.email,
            password: state.password,
            password_confirmation: state.passwordConfirm,
          });
          if (res.status == 201) {
            toast.success("تم اضافة الادمن الجديد بنجاح", {
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
        toast.error("ادخل بيانات الادمن كاملة بشكل صحيح", {
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
