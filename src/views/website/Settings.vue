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
                  label="الاسم الاول"
                  color="green-lighten-1"
                  prepend-inner-icon="mdi-account"
                  v-model="state.firstName"
                  :error-messages="
                    v$.firstName.$error ? v$.firstName.$errors[0].$message : ''
                  "
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6" class="mb-5">
                <v-text-field
                  label="الاسم الاخير"
                  color="green-lighten-1"
                  prepend-inner-icon="mdi-account"
                  v-model="state.lastName"
                  :error-messages="
                    v$.lastName.$error ? v$.lastName.$errors[0].$message : ''
                  "
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6" class="mb-5">
                <v-text-field
                  label="ألرقم القومي"
                  color="green-lighten-1"
                  prepend-inner-icon="mdi-card-account-details-outline"
                  v-model="state.nationalId"
                  class="mb-4"
                  :counter="14"
                  :error-messages="
                    v$.nationalId.$error
                      ? v$.nationalId.$errors[0].$message
                      : ''
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
              <v-col cols="12" md="6">
                <v-text-field
                  type="password"
                  v-model="state.passwordConfirmation"
                  label="تأكيد كلمة المرور الجديدة"
                  prepend-inner-icon="mdi-lock"
                  color="green-lighten-1"
                  class="mb-5"
                  :counter="6"
                  :error-messages="
                    vPass$.passwordConfirmation.$error
                      ? vPass$.passwordConfirmation.$errors[0].$message
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
                color="brown-darken-1"
                >تغيير كلمة السر</v-btn
              >
            </div>
          </form>

          <v-divider class="my-10"></v-divider>
          <h3>
            <v-icon class="ml-2">mdi-folder-cog-outline</v-icon>
            اخرى
          </h3>

          <div class="text-center mt-6">
            <v-btn size="large" color="red" @click="state.dialog = true">
              <v-icon>mdi-account-cancel</v-icon>
              حذف الحساب
            </v-btn>
            <v-dialog
              v-model="state.dialog"
              width="500"
              transition="dialog-top-transition"
              persistent
            >
              <v-card class="pa-4">
                <v-card-title> هل تريد فعلا حذف حسابك ؟ </v-card-title>
                <v-card-text>
                  بمجرد تأكيد الامر لن تسطيع التراجع عن ذلك سوف تخسر كل بياناتك
                  واشتراكاتك ولا يمكنك استرجاعها لاحقا
                </v-card-text>
                <v-card-actions class="mt-5 text-center">
                  <v-btn @click="state.dialog = false" color="green-accent-1">
                    <v-icon>mdi-close</v-icon> الغاء الامر
                  </v-btn>
                  <v-btn @click="deleteAccount" color="red" class="mr-5">
                    <v-icon>mdi-check</v-icon> تأكيد الامر
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </div>
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
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { onMounted } from "vue";
import axios from "axios";
export default {
  components: { AppLayout },
  setup() {
    const store = useStore();
    const router = useRouter();

    const state = reactive({
      student: computed(() => store.state.student),
      levels: [
        {
          title: "الصف الاول الثانوى",
          value: 1,
        },
        {
          title: "الصف الثاني الثانوى",
          value: 1,
        },
        {
          title: "الصف الثالث الثانوى",
          value: 2,
        },
      ],
      level: "",
      firstName: "",
      lastName: "",
      email: "",
      nationalId: "",
      currentPassword: "",
      newPassword: "",
      passwordConfirmation: "",
      phone: "",
      fatherPhone: "",
      motherPhone: "",
      dialog: false,
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

    onMounted(() => {
      if (!state.student) {
        router.push({ name: "login" });
      }

      state.firstName = state.student.firstName;
      state.lastName = state.student.lastName;
      state.nationalId = state.student.national_id_card;
      state.phone = state.student.phone_name;
      state.fatherPhone = state.student.father_phone;
      state.motherPhone = state.student.mother_phone;
      state.level = state.student.acedemic_year.includes("الاول")
        ? 1
        : state.student.acedemic_year.includes("الثالث")
        ? 3
        : 2;
    });

    const rules = computed(() => {
      return {
        firstName: { required },
        lastName: { required },
        nationalId: { required, minLength: minLength(14) },
        phone: { required, minLength: minLength(11) },
        fatherPhone: { required, minLength: minLength(11) },
        motherPhone: { required, minLength: minLength(11) },
        level: { required },
      };
    });

    const passwordRules = computed(() => {
      return {
        newPassword: { required, minLength: minLength(6) },
        passwordConfirmation: { required, sameAs: sameAs(state.newPassword) },
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
          let data = {
            id: state.student.id,
            f_name: state.firstName,
            l_name: state.lastName,
            phone_number: state.phone,
            father_phone: state.fatherPhone,
            mother_phone: state.motherPhone,
            national_id_card: state.nationalId,
            acedemic_year: state.level,
          };

          await store.dispatch("studentUpdate", data);

          toast.success("تم تعديل بياناتك بنجاح", {
            autoClose: 1000,
          });
        } catch (err) {
          toast.error(err.message, {
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
          let data = {
            current_password: state.currentPassword,
            password: state.newPassword,
            password_confirmation: state.passwordConfirmation,
          };
          const res = await axios.post("/api/password-student", data);

          if (res.status == 200) {
            toast.success("تم تعديل كلمة السر بنجاح", {
              autoClose: 1000,
            });
          } else {
            throw new Error(res.response.data.message);
          }
        } catch (err) {
          toast.error(err.message, {
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

    const deleteAccount = async () => {
      try {
        state.dialog = false;
        const res = await axios.delete("api/students");

        if (res.status == 200) {
          toast.success("تم حذف حسابك بنجاح", { autoClose: 1000 });
          setTimeout(async () => {
            store.dispatch("removeStudent");
          }, 1000);
          router.push({ name: "landing" });
        } else {
          throw new Error(res.response.data.message);
        }
      } catch (error) {
        toast.error(error.message, {
          autoClose: 1500,
        });
      }
    };

    return { state, vPass$, v$, form1, passwordForm, deleteAccount };
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
