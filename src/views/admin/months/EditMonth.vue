<template>
  <DashLayout>
    <v-container>
      <v-card class="mt-10 dash-card pa-4" :loading="state.loading">
        <h2>
          <v-icon class="ml-2">mdi-calendar-edit</v-icon>
          تعديل الشهر الدراسي
        </h2>
        <v-divider class="mt-4 mb-15"></v-divider>
        <form class="pa-10" @submit.prevent="add">
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                class="bg-white"
                label="اسم الشهر"
                variant="outlined"
                prepend-inner-icon="mdi-calendar"
                color="teal-darken-1"
                hint="مثال: شهر نوفمبر"
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
                label="سعر الاشتراك"
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
              <p class="text-weight-bold">الحالة:</p>
              <v-switch
                :label="state.status ? 'مفعل' : 'غير مفعل'"
                true-icon="mdi-check"
                color="success"
                v-model="state.status"
              ></v-switch>
            </v-col>
            <v-col cols="12" md="6">
              <v-file-input
                class="bg-white"
                label="صورة الشهر"
                variant="outlined"
                prepend-inner-icon="mdi-image"
                color="teal-darken-1"
                v-model="state.image"
                prepend-icon="false"
                hint="لا تقم بتحميل صورة جديدة الا اذا اردت تغيير القديمة"
              >
                <template v-slot:prepend>
                  <v-img
                    v-if="state.image.length"
                    :src="getImageUrl()"
                    width="80"
                    height="53"
                  ></v-img>
                  <v-img
                    v-else
                    :src="appUrl + state.storedImage"
                    width="80"
                    height="53"
                  ></v-img>
                </template>
              </v-file-input>
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
import { reactive, computed, onMounted } from "vue";
import { toast } from "vue3-toastify";
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import axios from "axios";
export default {
  components: { DashLayout },
  props: ["id"],
  setup(props) {
    const appUrl = process.env.VUE_APP_API_URL;

    const store = useStore();
    const router = useRouter();
    const state = reactive({
      name: "",
      loading: false,
      price: "",
      status: false,
      image: "",
      storedImage: "",
      admin: computed(() => store.state.admin),
    });

    onMounted(async () => {
      if (!state.admin) router.push({ name: "adminLogin" });

      try {
        const res = await axios.get("api_dashboard/months/" + props.id);
        if (res.status == 200) {
          const month = res.data.data;
          state.name = month.name;
          state.price = month.price;
          state.storedImage = month.image;
          state.status = month.status == "On";
        } else {
          throw new Error(res.response.data.message);
        }
      } catch (error) {
        toast.error(error.message);
      }
    });
    const rules = computed(() => {
      return {
        name: { required },
        price: { required },
        status: { required },
      };
    });
    const v$ = useVuelidate(rules, state);

    const add = async () => {
      v$.value.$validate();
      if (!v$.value.$error) {
        state.loading = true;
        try {
          const data = {
            name: state.name,
            price: state.price,
            image: state.image[0] || null,
            status: Number(state.status).toString(),
          };
          console.log(props.id);
          const res = await axios.post(
            "api_dashboard/months/" + props.id,
            data,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
          if (res.status == 200) {
            toast.success("تم تعديل بيانات الشهر بنجاح");
          } else {
            throw new Error(
              res.response?.data?.message || "حدث خطأ ما, عاود المحاولة لاحقا"
            );
          }
        } catch (err) {
          toast.error(err.message, {
            autoClose: 1000,
          });
        }

        state.loading = false;
      } else {
        toast.warning("ادخل بيانات الشهر الدراسي بشكل صحيح", {
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

    return { state, add, v$, getImageUrl, appUrl };
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
