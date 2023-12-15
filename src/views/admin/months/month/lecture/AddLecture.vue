<template>
  <DashLayout>
    <v-container>
      <v-card class="mt-10 dash-card pa-4" :loading="state.loading">
        <h2>
          <v-icon class="ml-2">mdi-video-plus-outline</v-icon>
          اضافة محاضرة جديدة
        </h2>
        <v-divider class="mt-4 mb-15"></v-divider>
        <form class="pa-10" @submit.prevent="add">
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                class="bg-white"
                label="اسم المحاضرة"
                variant="outlined"
                prepend-inner-icon="mdi-video"
                color="teal-darken-1"
                hint="مثال:  الدرس الاول"
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
                label="رابط المحاضرة"
                variant="outlined"
                prepend-inner-icon="mdi-youtube"
                color="teal-darken-1"
                v-model="state.link"
                :error-messages="
                  v$.link.$error ? v$.link.$errors[0].$message : ''
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
  components: { DashLayout },
  props: ["mid"],
  setup(props) {
    const store = useStore();
    const router = useRouter();
    const state = reactive({
      name: "",
      loading: false,
      link: "",
      status: false,
      admin: computed(() => store.state.admin),
    });
    onMounted(() => {
      if (!state.admin) router.push({ name: "adminLogin" });
    });
    const rules = computed(() => {
      return {
        name: { required },
        link: { required },
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
            url: state.link,
            month_id: props.mid,
          };

          const res = await axios.post("api_dashboard/contents", data);
          if (res.status == 200) {
            toast.success("تم اضافة المحاضرة بنجاح");
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
        toast.error(" ادخل بيانات المحاضرة بشكل صحيح", {
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
