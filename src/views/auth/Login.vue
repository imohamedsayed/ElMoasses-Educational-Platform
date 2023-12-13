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
            label="رقم الهاتف"
            variant="outlined"
            color="green-lighten-1"
            class="mb-5"
            :counter="11"
            v-model="state.phone"
            :error-messages="
              v$.phone.$error ? v$.phone.$errors[0].$message : ''
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
          <v-list-item
            link
            color="blue"
            class="text-blue"
            :to="{ name: 'resetPassword' }"
            >هل نسيت كلمة السر ؟</v-list-item
          >
          <v-btn
            class="me-4 w-100 mt-10 text-white"
            type="submit"
            color="#01cda9"
            size="large"
            :loading="state.loading"
          >
            تسجيل الدخول
          </v-btn>

          <v-btn
            class="w-100 mt-6 text-white"
            color="#35374f"
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
import { useStore } from "vuex";
import { useRouter } from "vue-router";
export default {
  components: { AppLayout },
  setup() {
    const store = useStore();
    const router = useRouter();

    const state = reactive({
      student: computed(() => store.state.student),
      visible: false,
      phone: "",
      password: "",
      loading: false,
    });

    onMounted(() => {
      if (state.student) {
        router.push({ name: "home" });
      }
    });

    const rules = computed(() => {
      return {
        phone: { required, minLength: minLength(11) },
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
            phone: state.phone,
            password: state.password,
          };
          await store.dispatch("studentLogin", data);
          toast.success("تم تسجيل الدخول بنجاح", {
            autoClose: 1000,
          });
          router.push({ name: "home" });
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
