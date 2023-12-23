<template>
  <DashLayout>
    <v-container>
      <v-card class="mt-10 dash-card pa-4" :loading="state.loading">
        <h2>
          <v-icon class="ml-2">mdi-file-edit-outline</v-icon>
          تعديل الملف
        </h2>
        <v-divider class="mt-4 mb-15"></v-divider>
        <form class="pa-10" @submit.prevent="edit">
          <v-row>
            <!-- <v-col cols="12" md="6">
              <v-file-input
                class="bg-white"
                label="المف"
                variant="outlined"
                prepend-inner-icon="mdi-file-upload-outline"
                color="teal-darken-1"
                v-model="state.name"
              >
              </v-file-input>
              <v-alert type="warning" closable
                >فقط ارفق ملف جديد في حالة اردت استبدال الملف الموجود
                مسبقا</v-alert
              >
            </v-col> -->
            <v-col cols="12" md="6">
              <v-text-field
                class="bg-white"
                label="وصف"
                variant="outlined"
                prepend-inner-icon="mdi-text"
                color="teal-darken-1"
                v-model="state.description"
                :error-messages="
                  v$.description.$error
                    ? v$.description.$errors[0].$message
                    : ''
                "
              >
              </v-text-field>
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
  props: ["mid", "id"],
  setup(props) {
    const store = useStore();
    const router = useRouter();
    const state = reactive({
      name: "",
      loading: false,
      description: "",
      status: false,
      admin: computed(() => store.state.admin),
    });

    onMounted(async () => {
      if (!state.admin) router.push({ name: "adminLogin" });

      try {
        const res = await axios.get("api_dashboard/attachments/" + props.id);
        if (res.status == 200) {
          const attachment = res.data.data;

          state.description = attachment.descrption;
        } else {
          throw new Error(res.response.data.message);
        }
      } catch (error) {
        toast.error(error.message);
      }
    });

    const rules = computed(() => {
      return {
        description: { required },
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
            descrption: state.description,
          };

          const res = await axios.post(
            "api_dashboard/attachments/" + props.id,
            data
          );
          if (res.status == 202) {
            toast.success("تم تعديل الملحق بنجاح");
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
        toast.error("ادخل بيانات الملحق بشكل كامل وصحيح", {
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
