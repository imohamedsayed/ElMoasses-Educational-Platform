<template>
  <AppLayout>
    <v-container class="form-container">
      <v-card
        class="mx-auto form-card pa-5"
        elevation="0"
        max-width="720"
        :loading="state.loading"
      >
        <v-card-title class="mb-4 text-center">تسجيل الدخول</v-card-title>
        <form @submit.prevent="login">
          <v-text-field
            label="البريد الالكتروني"
            variant="outlined"
            color="green-lighten-1"
            class="mb-5"
            v-model="state.email"
            :error-messages="
              v$.email.$error ? v$.email.$errors[0].$message : ''
            "
          ></v-text-field>
          <v-text-field
            :append-inner-icon="state.visible ? 'mdi-eye-off' : 'mdi-eye'"
            :type="state.visible ? 'text' : 'password'"
            placeholder="الرقم السرى"
            prepend-inner-icon="mdi-lock-outline"
            @click:append-inner="state.visible = !state.visible"
            variant="outlined"
            color="green-lighten-1"
            :counter="6"
            hint="علي الاقل 6 احرف"
            v-model="state.password"
            :error-messages="
              v$.password.$error ? v$.password.$errors[0].$message : ''
            "
          ></v-text-field>

          <v-btn
            class="me-4 w-100 mt-10"
            type="submit"
            color="green-lighten-1"
            size="large"
            :loading="state.loading"
          >
            تسجيل الدخول
          </v-btn>

          <v-btn
            class="w-100 mt-6"
            color="blue-darken-1"
            size="large"
            :to="{ name: 'signup' }"
          >
            انشاء حساب
          </v-btn>
        </form>
      </v-card>
    </v-container>
  </AppLayout>
</template>

<script>
import AppLayout from "@/components/website/AppLayout.vue";
import { reactive, computed, onMounted } from "vue";
import { toast } from "vue3-toastify";
import { useVuelidate } from "@vuelidate/core";
import { required, email, minLength } from "@vuelidate/validators";
export default {
  components: { AppLayout },
  setup() {
    const state = reactive({
      visible: false,
      level: "",
      levels: [
        {
          title: "الصف الدراسي الاول",
          value: 0,
        },
        {
          title: "الصف الدراسي الثاني",
          value: 1,
        },
        {
          title: "الصف الدراسي الثالث",
          value: 2,
        },
      ],
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
.form-container {
  background: url("@/assets/images/login.svg");
  background-size: cover;
}
.form-card {
  margin: 100px 0;
}
</style>
