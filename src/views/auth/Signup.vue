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
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                label="الاسم الاول"
                variant="outlined"
                color="green-lighten-1"
                v-model="state.firstName"
                :error-messages="
                  v$.firstName.$error ? v$.firstName.$errors[0].$message : ''
                "
                class="mb-4"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                label="الاسم الاخير"
                variant="outlined"
                color="green-lighten-1"
                v-model="state.lastName"
                :error-messages="
                  v$.lastName.$error ? v$.lastName.$errors[0].$message : ''
                "
                class="mb-4"
              ></v-text-field>
            </v-col>
          </v-row>
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
            :append-inner-icon="state.visible2 ? 'mdi-eye-off' : 'mdi-eye'"
            :type="state.visible2 ? 'text' : 'password'"
            placeholder="تأكيد الرقم السري"
            prepend-inner-icon="mdi-lock-outline"
            @click:append-inner="state.visible2 = !state.visible2"
            variant="outlined"
            color="green-lighten-1"
            class="mb-4"
            v-model="state.passwordConfirmation"
            :counter="6"
            :error-messages="
              v$.passwordConfirmation.$error
                ? v$.passwordConfirmation.$errors[0].$message
                : ''
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
          ></v-text-field>
          <v-text-field
            :counter="11"
            label="رقم الام"
            variant="outlined"
            color="green-lighten-1"
            class="mb-4"
            v-model="state.motherPhone"
          ></v-text-field>
          <v-text-field
            :counter="14"
            label="الرقم القومي"
            variant="outlined"
            color="green-lighten-1"
            v-model="state.nationalId"
            class="mb-4"
            :error-messages="
              v$.nationalId.$error ? v$.nationalId.$errors[0].$message : ''
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
import { required, email, minLength, sameAs } from "@vuelidate/validators";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import axios from "axios";
export default {
  components: { AppLayout },
  setup() {
    const store = useStore();
    const router = useRouter();

    const state = reactive({
      student: computed(() => store.state.student),
      visible: false,
      visible2: false,
      level: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      passwordConfirmation: "",
      phone: "",
      fatherPhone: "",
      motherPhone: "",
      loading: false,
      nationalId: "",
      levels: [
        {
          title: "الصف الدراسي الاول",
          value: 1,
        },
        {
          title: "الصف الدراسي الثاني",
          value: 2,
        },
        {
          title: "الصف الدراسي الثالث",
          value: 3,
        },
      ],
    });

    onMounted(async () => {
      if (state.student) {
        router.push({ name: "home" });
      }
    });

    const rules = computed(() => {
      return {
        firstName: { required },
        lastName: { required },
        nationalId: { required, minLength: minLength(14) },
        password: { required, minLength: minLength(6) },
        passwordConfirmation: { required, sameAs: sameAs(state.password) },
        phone: { required, minLength: minLength(11) },
        level: { required },
      };
    });
    const v$ = useVuelidate(rules, state);

    const signup = async () => {
      v$.value.$validate();
      if (!v$.value.$error) {
        state.loading = true;
        try {
          let data = {
            firstName: state.firstName,
            lastName: state.lastName,
            nationalId: state.nationalId,
            password: state.password,
            passwordConfirmation: state.passwordConfirmation,
            phone: state.phone,
            year: state.level,
          };

          if (state.fatherPhone) data.fatherPhone = state.fatherPhone;
          if (state.motherPhone) data.motherPhone = state.motherPhone;

          await store.dispatch("studentRegister", data);

          toast.success("تم انشاء حسابك بنجاح", {
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
        toast.error("ادخل بياناتك  الصحيحة كاملة لانشاء حسابك", {
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
