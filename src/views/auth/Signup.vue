<template>
  <AppLayout>
    <v-container class="form-container">
      <v-card
        class="mx-auto form-card pa-5"
        elevation="0"
        max-width="720"
        :loading="state.loading"
      >
        <v-card-title class="mb-4 text-center">انشاء حساب جديد</v-card-title>
        <form @submit.prevent="signup">
          <v-text-field
            :counter="10"
            label="الاسم"
            variant="outlined"
            color="green-lighten-1"
            v-model="state.name"
            :error-messages="v$.name.$error ? v$.name.$errors[0].$message : ''"
            class="mb-4"
          ></v-text-field>
          <v-text-field
            label="البريد الالكتروني"
            variant="outlined"
            color="green-lighten-1"
            v-model="state.email"
            class="mb-4"
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
            class="mb-4"
            v-model="state.password"
            :counter="6"
            :error-messages="
              v$.password.$error ? v$.password.$errors[0].$message : ''
            "
          ></v-text-field>

          <v-text-field
            :counter="11"
            label="رقم الهاتف"
            variant="outlined"
            color="green-lighten-1"
            class="mb-4"
            :error-messages="
              v$.phone.$error ? v$.phone.$errors[0].$message : ''
            "
            v-model="state.phone"
          ></v-text-field>
          <v-text-field
            :counter="11"
            label="رقم الاب"
            variant="outlined"
            color="green-lighten-1"
            class="mb-4"
            v-model="state.fatherPhone"
            :error-messages="
              v$.fatherPhone.$error ? v$.fatherPhone.$errors[0].$message : ''
            "
          ></v-text-field>
          <v-text-field
            :counter="11"
            label="رقم الام"
            variant="outlined"
            color="green-lighten-1"
            class="mb-4"
            v-model="state.motherPhone"
            :error-messages="
              v$.motherPhone.$error ? v$.motherPhone.$errors[0].$message : ''
            "
          ></v-text-field>

          <v-select
            :items="state.levels"
            v-model="state.level"
            label="الصف الدراسي"
            variant="outlined"
            class="mb-4"
            color="green-lighten-1"
            :error-messages="
              v$.level.$error ? v$.level.$errors[0].$message : ''
            "
          ></v-select>

          <v-btn
            class="me-4 w-100 mt-10 text-white"
            type="submit"
            color="#01cda9"
            size="large"
            :loading="state.loading"
          >
            انشاء حساب
          </v-btn>

          <v-btn
            class="w-100 mt-6 text-white"
            color="#35374f"
            size="large"
            :to="{ name: 'login' }"
          >
            تسجيل الدخول
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
      name: "",
      email: "",
      password: "",
      phone: "",
      fatherPhone: "",
      motherPhone: "",
      loading: false,
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
    });
    const rules = computed(() => {
      return {
        email: { required, email },
        password: { required, minLength: minLength(6) },
        name: { required, minLength: minLength(10) },
        phone: { required, minLength: minLength(11) },
        fatherPhone: { required, minLength: minLength(11) },
        motherPhone: { required, minLength: minLength(11) },
        level: { required },
      };
    });
    const v$ = useVuelidate(rules, state);

    const signup = async () => {
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
    return { state, signup, v$ };
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
