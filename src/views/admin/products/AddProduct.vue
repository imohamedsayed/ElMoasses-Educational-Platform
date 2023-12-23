<template>
  <DashLayout>
    <v-container>
      <v-card class="mt-10 dash-card pa-4" :loading="state.loading">
        <h2>
          <v-icon class="ml-2">mdi-file-plus-outline</v-icon>
          اضافة ملزمة للبيع
        </h2>
        <v-divider class="mt-4 mb-15"></v-divider>
        <form class="pa-10" @submit.prevent="add">
          <v-row class="align-center">
            <v-col cols="12" md="6">
              <v-file-input
                class="bg-white"
                label="المنتج"
                variant="outlined"
                prepend-inner-icon="mdi-file-upload-outline"
                color="teal-darken-1"
                hint=" مثال: المراجعة النهائية للهندسة الفراغية شاملة للاختبارات والحلول النموذجية"
                v-model="state.name"
                :error-messages="
                  v$.name.$error ? v$.name.$errors[0].$message : ''
                "
              >
              </v-file-input>
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
                :error-messages="
                  v$.description.$error
                    ? v$.description.$errors[0].$message
                    : ''
                "
              >
              </v-text-field>
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
                item-title="name"
                item-value="id"
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
import { reactive, computed, onMounted } from "vue";
import { toast } from "vue3-toastify";
import { useVuelidate } from "@vuelidate/core";
import { required, numeric } from "@vuelidate/validators";
import axios from "axios";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
export default {
  components: { DashLayout },
  setup() {
    const store = useStore(),
      router = useRouter();

    const state = reactive({
      name: "",
      loading: false,
      price: "",
      status: false,
      image: "",
      description: "",
      year: "",
      years: [],
      admin: computed(() => store.state.admin),
    });

    onMounted(async () => {
      if (!state.admin) router.push({ name: "adminLogin" });

      state.loading = true;

      try {
        const res = await axios.get("api_dashboard/years");

        if (res.status == 200) {
          state.years = res.data.data;
        } else {
          throw new Error(res.response.data.message);
        }
      } catch (error) {
        toast.error(error.message);
      }

      state.loading = false;
    });

    const rules = computed(() => {
      return {
        name: { required },
        price: { required, numeric },
        description: { required },
        status: { required },
        image: { required },
        year: { required },
      };
    });
    const v$ = useVuelidate(rules, state);

    const add = async () => {
      v$.value.$validate();
      if (!v$.value.$error) {
        state.loading = true;
        try {
          const data = {
            name: state.name[0],
            image: state.image[0],
            price: state.price,
            descrption: state.description,
            year_id: state.year,
            status: Number(state.status).toString(),
          };
          const res = await axios.post("api_dashboard/products", data, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });

          if (res.status == 201) {
            toast.success("تم اضافة المنتج بنجاح");
          } else {
            throw new Error(res.response.data.message);
          }
        } catch (err) {
          toast.error(err.message, {
            autoClose: 1000,
          });
        }
        state.loading = false;
      } else {
        toast.error("ادخل بيانات المنتج بشكل كامل وصحيح", {
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

    return { state, add, v$, getImageUrl };
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
