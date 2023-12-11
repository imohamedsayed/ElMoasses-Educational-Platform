<template>
  <DashLayout>
    <v-container>
      <v-card class="mt-10 dash-card pa-4" :loading="state.loading">
        <h2>
          <v-icon class="ml-2">mdi-file-edit-outline</v-icon>
          تعديل المنتج : {{ id }}
        </h2>
        <v-divider class="mt-4 mb-15"></v-divider>
        <form class="pa-10" @submit.prevent="edit">
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                class="bg-white"
                label="اسم الملزمة"
                variant="outlined"
                prepend-inner-icon="mdi-file-document-outline"
                color="teal-darken-1"
                hint="مثال: المراجعة النهائية للهندسة الفراغية"
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
                label="الوصف"
                variant="outlined"
                prepend-inner-icon="mdi-text-box-multiple-outline"
                color="teal-darken-1"
                hint=" مثال: المراجعة النهائية للهندسة الفراغية شاملة للاختبارات والحلول النموذجية"
                v-model="state.description"
              >
              </v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-file-input
                class="bg-white"
                label="المنتج"
                variant="outlined"
                prepend-inner-icon="mdi-file-upload-outline"
                color="teal-darken-1"
                hint=" مثال: المراجعة النهائية للهندسة الفراغية شاملة للاختبارات والحلول النموذجية"
                v-model="state.file"
                :error-messages="
                  v$.file.$error ? v$.file.$errors[0].$message : ''
                "
              >
              </v-file-input>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                class="bg-white"
                label="سعر المنتج"
                variant="outlined"
                prepend-inner-icon="mdi-cash-multiple"
                color="teal-darken-1"
                hint="مثال: 150  "
                v-model="state.price"
                :error-messages="
                  v$.price.$error ? v$.price.$errors[0].$message : ''
                "
              >
              </v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-file-input
                class="bg-white"
                label="صورة للمنتج"
                variant="outlined"
                prepend-inner-icon="mdi-image"
                color="teal-darken-1"
                v-model="state.image"
                :error-messages="
                  v$.image.$error ? v$.image.$errors[0].$message : ''
                "
                prepend-icon="false"
              >
                <template v-slot:prepend>
                  <v-img
                    v-if="state.image.length"
                    :src="getImageUrl()"
                    width="80"
                    height="53"
                  ></v-img>
                </template>
              </v-file-input>
            </v-col>
            <v-col cols="12" md="6">
              <v-select
                class="bg-white"
                label="السنة الدراسية"
                variant="outlined"
                prepend-inner-icon="mdi-calendar"
                color="teal-darken-1"
                v-model="state.year"
                :error-messages="
                  v$.year.$error ? v$.year.$errors[0].$message : ''
                "
                :items="state.years"
              >
              </v-select>
            </v-col>
            <v-col cols="12" md="6" class="pr-10">
              <p class="text-weight-bold">الحالة:</p>
              <v-switch
                :label="state.status ? 'مفعل' : 'غير مفعل'"
                true-icon="mdi-check"
                color="success"
                v-model="state.status"
              ></v-switch>
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
import { required, numeric } from "@vuelidate/validators";

export default {
  components: { DashLayout },
  props: ["id"],
  setup() {
    const state = reactive({
      name: "",
      loading: false,
      price: "",
      status: false,
      image: "",
      description: "",
      file: "",
      year: "",
      years: [
        { title: "الصف الاول الثانوي", value: 0 },
        { title: "الصف الثاني الثانوي", value: 1 },
        { title: "الصف الثالث الثانوي", value: 2 },
      ],
    });

    const rules = computed(() => {
      return {
        name: { required },
        price: { required, numeric },
        status: { required },
        image: { required },
        year: { required },
        file: { required },
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
        toast.error("ادخل الصف الدراسي", {
          autoClose: 1000,
        });
      }
    };

    const getImageUrl = () => {
      if (state.image.length) {
        return window.URL.createObjectURL(state.image[0]);
      } else {
        return "";
      }
    };

    return { state, edit, v$, getImageUrl };
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
