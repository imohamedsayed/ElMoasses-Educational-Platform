<template>
  <AppLayout>
    <v-container class="form-container">
      <v-card
        class="mx-auto form-card pa-5"
        elevation="0"
        max-width="720"
        :loading="state.loading"
      >
        <v-card-title class="mb-4 text-center">تغيير كلمة المرور</v-card-title>

        <v-stepper
          :items="['ادخل الرقم القومي', 'ادخل كلمة السر الجديدة']"
          elevation="0"
          color="teal"
          hide-actions
          :model-value="state.step"
        >
          <template v-slot:item.1>
            <form class="mt-5" @submit.prevent="checkNationalId">
              <v-text-field
                label="اكتب الرقم القومي"
                prepend-inner-icon="mdi-card-account-details-outline"
                :counter="14"
                variant="outlined"
                v-model="state.nationalId"
                :error-messages="
                  v$.nationalId.$error ? v$.nationalId.$errors[0].$message : ''
                "
              >
              </v-text-field>

              <div class="text-center mt-5">
                <v-btn
                  flat
                  color="green-lighten-1"
                  type="submit"
                  :loading="state.loading"
                >
                  <v-icon class="ml-2">mdi-credit-card-search-outline</v-icon>
                  تحقق</v-btn
                >
              </div>
            </form>
          </template>

          <template v-slot:item.2>
            <form class="mt-5" @submit.prevent="changePassword">
              <v-text-field
                :append-inner-icon="state.visible ? 'mdi-eye-off' : 'mdi-eye'"
                :type="state.visible ? 'text' : 'password'"
                placeholder="كلمة السر الجديدة"
                prepend-inner-icon="mdi-lock-outline"
                @click:append-inner="state.visible = !state.visible"
                variant="outlined"
                color="green-lighten-1"
                class="mb-4"
                v-model="state.password"
                :counter="6"
                :error-messages="
                  passCheck$.password.$error
                    ? passCheck$.password.$errors[0].$message
                    : ''
                "
              ></v-text-field>
              <v-text-field
                :append-inner-icon="state.visible2 ? 'mdi-eye-off' : 'mdi-eye'"
                :type="state.visible2 ? 'text' : 'password'"
                placeholder="تأكيد كلمة السر"
                prepend-inner-icon="mdi-lock-outline"
                @click:append-inner="state.visible2 = !state.visible2"
                variant="outlined"
                color="green-lighten-1"
                class="mb-4"
                v-model="state.passwordConfirmation"
                :counter="6"
                :error-messages="
                  passCheck$.passwordConfirmation.$error
                    ? passCheck$.passwordConfirmation.$errors[0].$message
                    : ''
                "
              ></v-text-field>

              <div class="text-center mt-5">
                <v-btn
                  flat
                  color="green-lighten-1"
                  type="submit"
                  :loading="state.loading"
                >
                  <v-icon class="ml-2">mdi-lock-reset</v-icon>
                  تغيير كلمة السر</v-btn
                >
              </div>
            </form>
          </template>
        </v-stepper>
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
      loading: false,
      visible: false,
      visible2: false,
      step: 1,
      nationalId: "",
      password: "",
      passwordConfirmation: "",
      id: "",
    });

    onMounted(() => {
      if (state.student) {
        router.push({ name: "home" });
      }
    });

    const rules = computed(() => {
      return {
        nationalId: { required, minLength: minLength(14) },
      };
    });
    const passwordRules = computed(() => {
      return {
        password: { required, minLength: minLength(6) },
        passwordConfirmation: {
          required,
          minLength: minLength(6),
          sameAs: sameAs(state.password),
        },
      };
    });

    const v$ = useVuelidate(rules, state);
    const passCheck$ = useVuelidate(passwordRules, state);

    const checkNationalId = async () => {
      v$.value.$validate();
      if (!v$.value.$error) {
        state.loading = true;
        try {
          const res = await axios.post("api/check-nationalId", {
            national_id_card: state.nationalId,
          });
          if (res.data.message.includes("not Found")) {
            toast.error(res.data.message, {
              autoClose: 1000,
            });
          } else {
            state.id = res.data.data.id;
            state.step = 2;
          }
        } catch (error) {
          toast.error(error.message, {
            autoClose: 1000,
          });
        }
        state.loading = false;
      } else {
        toast.error("ادخل الرقم القومي بشكل صحيح", {
          autoClose: 1000,
        });
      }
    };

    const changePassword = async () => {
      passCheck$.value.$validate();
      if (!passCheck$.value.$error) {
        state.loading = true;
        try {
          const res = await axios.post("api/reset-password", {
            id: state.id,
            password: state.password,
            password_confirmation: state.passwordConfirmation,
          });

          if (res.status != 200) {
            throw new Error(res.response.data.message);
          } else {
            toast.success("تم تغيير كلمة السر بنجاح", {
              autoClose: 1000,
            });
            setTimeout(() => {
              router.push("/login");
            }, 1000);
          }
        } catch (error) {
          toast.error(error.message, {
            autoClose: 1000,
          });
        }
        state.loading = false;
      } else {
        toast.error("ادخل الرقم كلمة السر بشكل صحيح", {
          autoClose: 1000,
        });
      }
    };

    return { state, v$, passCheck$, checkNationalId, changePassword };
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
