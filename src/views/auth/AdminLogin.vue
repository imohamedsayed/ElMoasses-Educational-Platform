<template>
  <div class="admin-login">
    <v-container>
      <v-card
        class="from-card pa-7 mx-auto"
        max-width="720px"
        :loading="state.loading"
      >
        <v-card-title class="text-center">
          <v-icon class="ml-2">mdi-monitor</v-icon>
          تسجيل الدخول الي لوحة التحكم
        </v-card-title>
        <v-divider class="my-4"></v-divider>
        <form @submit.prevent="login">
          <v-text-field
            label="البريد الالكتروني"
            v-model="state.email"
            variant="outlined"
            color="green-lighten-1"
            class="mb-5"
            prepend-inner-icon="mdi-email"
            :error-messages="
              v$.email.$error ? v$.email.$errors[0].$message : ''
            "
          ></v-text-field>
          <v-text-field
            type="password"
            label="الرقم السري"
            v-model="state.password"
            variant="outlined"
            color="green-lighten-1"
            class="mb-5"
            prepend-inner-icon="mdi-lock"
            :error-messages="
              v$.password.$error ? v$.password.$errors[0].$message : ''
            "
          ></v-text-field>
          <div class="text-center">
            <v-btn
              color="green-lighten-1"
              variant="flat"
              type="submit"
              :loading="state.loading"
              >تسجيل الدخول</v-btn
            >
          </div>
        </form>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import { reactive, computed, onMounted } from "vue";
import { toast } from "vue3-toastify";
import { useVuelidate } from "@vuelidate/core";
import { required, email, minLength } from "@vuelidate/validators";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
export default {
  setup() {
    const store = useStore();
    const router = useRouter();
    const state = reactive({
      email: "",
      password: "",
      loading: false,
    });

    const rules = computed(() => {
      return {
        email: { required, email },
        password: { required, minLength: minLength(6) },
      };
    });
    const v$ = useVuelidate(rules, state);

    const login = async () => {
      v$.value.$validate();
      if (!v$.value.$error) {
        state.loading = true;
        try {
          let data = {
            email: state.email,
            password: state.password,
          };
          await store.dispatch("adminLogin", data);
          toast.success("Login Successfully", {
            autoClose: 1000,
          });
          router.push({ name: "dashHome" });
        } catch (err) {
          toast.error(err.message, {
            autoClose: 1000,
          });
        }

        state.loading = false;
      } else {
        toast.error("ادخل بياناتك لتسجيل الدخول", {
          autoClose: 1000,
        });
      }
    };
    return { state, login, v$ };
  },
};
</script>

<style lang="scss" scoped>
.admin-login {
  height: 100vh;
  display: flex;
  align-items: center;
  background: url("../../assets/images/dashLogin.jpg") top center;
  background-size: cover;
}
</style>
