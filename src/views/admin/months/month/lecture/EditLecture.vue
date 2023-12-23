<template>
  <DashLayout>
    <v-container>
      <v-card class="mt-10 dash-card pa-4" :loading="state.loading">
        <h2>
          <v-icon class="ml-2">mdi-video-outline</v-icon>
          تعديل المحاضرة رقم {{ id }}
        </h2>
        <v-divider class="mt-4 mb-15"></v-divider>
        <form class="pa-10" @submit.prevent="edit">
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
    const store = useStore();
    const router = useRouter();
    const state = reactive({
      name: "",
      loading: false,
      link: "",
      status: false,
      admin: computed(() => store.state.admin),
    });
    onMounted(async () => {
      if (!state.admin) router.push({ name: "adminLogin" });
      state.loading = true;
      try {
        const res = await axios.get("api_dashboard/contents/" + props.id);
        if (res.status == 200) {
          const content = res.data.data;
          state.name = content.name;
          state.link = content.url;
          state.status = content.status == "On";
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
        link: { required },
        status: { required },
      };
    });
    const v$ = useVuelidate(rules, state);

    const edit = async () => {
      v$.value.$validate();
      if (!v$.value.$error) {
        state.loading = true;
        try {
          const data = {
            name: state.name,
            url: state.link,
            status: Number(state.status).toString(),
          };

          const res = await axios.post(
            "api_dashboard/contents/" + props.id,
            data
          );
          if (res.status == 200) {
            toast.success("تم تعديل المحاضرة بنجاح");
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
        toast.error("ادخل بيانات المحاضرة بشكل صحيح", {
          autoClose: 1000,
        });
      }
    };

    return { state, edit, v$ };
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
