<template>
  <AppLayout>
    <div class="settings">
      <v-container>
        <v-sheet class="lectures-title" width="100%" height="20vh">
          <h1>المؤسس للرياضيات</h1>
          <v-breadcrumbs :items="state.items" class="mx-auto">
            <template v-slot:title="{ item }">
              {{ item.title.toUpperCase() }}
            </template>
          </v-breadcrumbs>
        </v-sheet>

        <v-card class="pa-10" :loading="state.loading">
          <h2>
            <v-icon>mdi-cog-outline</v-icon>
            اعدادات الحساب
          </h2>
          <v-divider class="my-10"></v-divider>
          <form @submit.prevent="form1">
            <v-row>
              <v-col cols="12" md="6" class="mb-5">
                <v-text-field
                  label="الاسم"
                  color="green-lighten-1"
                  prepend-inner-icon="mdi-account"
                  :counter="10"
                  v-model="state.name"
                  :error-messages="
                    v$.name.$error ? v$.name.$errors[0].$message : ''
                  "
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6" class="mb-5">
                <v-text-field
                  type="email"
                  label="البريد الاكتروني"
                  color="green-lighten-1"
                  prepend-inner-icon="mdi-email"
                  v-model="state.email"
                  class="mb-4"
                  :error-messages="
                    v$.email.$error ? v$.email.$errors[0].$message : ''
                  "
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6" class="mb-5">
                <v-text-field
                  label="الهاتف"
                  color="green-lighten-1"
                  prepend-inner-icon="mdi-phone"
                  :counter="11"
                  :error-messages="
                    v$.phone.$error ? v$.phone.$errors[0].$message : ''
                  "
                  v-model="state.phone"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6" class="mb-5">
                <v-text-field
                  label="رقم الأب"
                  color="green-lighten-1"
                  prepend-inner-icon="mdi-phone"
                  :counter="11"
                  v-model="state.fatherPhone"
                  :error-messages="
                    v$.fatherPhone.$error
                      ? v$.fatherPhone.$errors[0].$message
                      : ''
                  "
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6" class="mb-5">
                <v-text-field
                  label="رقم الأم"
                  color="green-lighten-1"
                  prepend-inner-icon="mdi-phone"
                  :counter="11"
                  v-model="state.motherPhone"
                  :error-messages="
                    v$.motherPhone.$error
                      ? v$.motherPhone.$errors[0].$message
                      : ''
                  "
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6" class="mb-5">
                <v-select
                  :items="state.levels"
                  v-model="state.level"
                  label="الصف الدراسي"
                  class="mb-4"
                  color="green-lighten-1"
                  :error-messages="
                    v$.level.$error ? v$.level.$errors[0].$message : ''
                  "
                ></v-select>
              </v-col>
            </v-row>
            <div class="text-center">
              <v-btn
                class=""
                size="large"
                color="#332d4f"
                type="submit"
                :loading="state.loading"
                >تعديل</v-btn
              >
            </div>
          </form>

          <v-divider class="my-10"></v-divider>
          <form @submit.prevent="passwordForm">
            <h3>
              <v-icon>mdi-lock</v-icon>
              تعديل كلمة السر
            </h3>

            <v-row class="mt-5">
              <v-col cols="12" md="6">
                <v-text-field
                  type="password"
                  v-model="state.currentPassword"
                  label="كلمة المرور الحالية"
                  prepend-inner-icon="mdi-lock"
                  color="green-lighten-1"
                  class="mb-5"
                  :error-messages="
                    vPass$.currentPassword.$error
                      ? vPass$.currentPassword.$errors[0].$message
                      : ''
                  "
                  :counter="6"
                >
                </v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  type="password"
                  v-model="state.newPassword"
                  label="كلمة المرور الجديدة"
                  prepend-inner-icon="mdi-lock"
                  color="green-lighten-1"
                  class="mb-5"
                  :counter="6"
                  :error-messages="
                    vPass$.newPassword.$error
                      ? vPass$.newPassword.$errors[0].$message
                      : ''
                  "
                >
                </v-text-field>
              </v-col>
            </v-row>
            <div class="text-center">
              <v-btn
                type="submit"
                size="large"
                :loading="state.loading"
                color="red"
                >تغيير كلمة السر</v-btn
              >
            </div>
          </form>
        </v-card>
      </v-container>
    </div>
  </AppLayout>
</template>

<script>
import AppLayout from "@/components/website/AppLayout.vue";
import { reactive, computed } from "vue";
import { toast } from "vue3-toastify";
import { useVuelidate } from "@vuelidate/core";
import { required, email, minLength, not, sameAs } from "@vuelidate/validators";
export default {
  components: { AppLayout },
  setup() {
    const state = reactive({
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
      level: "",
      name: "",
      email: "",
      currentPassword: "",
      newPassword: "",
      phone: "",
      fatherPhone: "",
      motherPhone: "",
      loading: false,
      visible: false,
      items: [
        {
          title: "الرئيسية",
          disabled: false,
          href: "/landing",
        },
        {
          title: "حسابي",
          disabled: false,
          href: "/profile",
        },
        {
          title: "اعدادات الحساب",
          disabled: true,
          href: "/settings",
        },
      ],
    });
    const rules = computed(() => {
      return {
        email: { required, email },
        name: { required, minLength: minLength(10) },
        phone: { required, minLength: minLength(11) },
        fatherPhone: { required, minLength: minLength(11) },
        motherPhone: { required, minLength: minLength(11) },
        level: { required },
      };
    });

    const passwordRules = computed(() => {
      return {
        newPassword: { required, minLength: minLength(6) },
        currentPassword: {
          required,
          minLength: minLength(6),
         
        },
      };
    });

    const v$ = useVuelidate(rules, state);
    const vPass$ = useVuelidate(passwordRules, state);

    const form1 = async () => {
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
      } else {
        toast.error("بياناتك غير مكتملة او غير صحيحة", {
          autoClose: 1000,
        });
      }
      state.loading = false;
    };
    const passwordForm = async () => {
      vPass$.value.$validate();
      if (!vPass$.value.$error) {
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
      } else {
        toast.error("بياناتك غير مكتملة او غير صحيحة", {
          autoClose: 1000,
        });
      }
      state.loading = false;
    };
    return { state, vPass$, v$, form1, passwordForm };
  },
};
</script>

<style scoped>
.lectures-title {
  background: var(--martinique);
  display: grid;
  place-content: center;
  color: var(--seashell);
  text-align: center;
}
</style>
