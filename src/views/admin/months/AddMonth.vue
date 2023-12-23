<template>
  <DashLayout>
    <v-container>
      <v-card class="mt-10 dash-card pa-4" :loading="state.loading">
        <h2>
          <v-icon class="ml-2">mdi-plus-circle</v-icon>
          اضافة شهر جديد
        </h2>
        <v-divider class="mt-4 mb-15"></v-divider>
        <form class="pa-10" @submit.prevent="add">
          <v-row class="align-center">
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
import { required } from "@vuelidate/validators";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import axios from "axios";

export default {
  props: ["sid"],
  components: { DashLayout },
  setup(props) {
    const store = useStore();
    const router = useRouter();

    const state = reactive({
      name: "",
      loading: false,
      price: "",
      status: false,
      image: "",
      admin: computed(() => store.state.admin),
    });

    onMounted(() => {
      if (!state.admin) router.push({ name: "adminLogin" });
    });

    const rules = computed(() => {
      return {
        name: { required },
        price: { required },
        status: { required },
        image: { required },
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
            image: state.image[0],
            semester_id: props.sid,
          };

          const res = await axios.post("api_dashboard/months", data, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });

          if (res.status == 200) {
            toast.success("تم اضافة الشهر بنجاح");
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
        toast.error("ادخل بيانات الشهر بشكل صحيح", {
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
