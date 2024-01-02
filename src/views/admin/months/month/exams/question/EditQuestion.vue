<template>
  <DashLayout>
    <v-container>
      <v-card class="mt-10 dash-card pa-4" :loading="state.loading">
        <h2>
          <v-icon class="ml-2">mdi-table-question</v-icon>
          تعديل السؤال
        </h2>
        <v-divider class="mt-4 mb-15"></v-divider>
        <form class="pa-10" @submit.prevent="edit">
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                class="bg-white"
                label="السؤال"
                variant="outlined"
                prepend-inner-icon="mdi-head-question-outline"
                color="teal-darken-1"
                v-model="state.question"
                :error-messages="
                  v$.question.$error ? v$.question.$errors[0].$message : ''
                "
              >
              </v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-select
                label="نوع السؤال"
                prepend-inner-icon="mdi-folder-question-outline"
                variant="outlined"
                v-model="state.type"
                color="teal-darken-1"
                :items="state.types"
                :error-messages="
                  v$.type.$error ? v$.type.$errors[0].$message : ''
                "
              >
              </v-select>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                class="bg-white"
                label="الدرجة"
                variant="outlined"
                prepend-inner-icon="mdi-counter"
                color="teal-darken-1"
                v-model="state.point"
                :error-messages="
                  v$.point.$error ? v$.point.$errors[0].$message : ''
                "
              >
              </v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                class="bg-white"
                label="توضيح للسؤال (اختياري)"
                variant="outlined"
                prepend-inner-icon="mdi-cash-multiple"
                color="teal-darken-1"
                v-model="state.explanation"
              >
              </v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-file-input
                class="bg-white"
                label="ارفاق صورة (اختياري)"
                variant="outlined"
                prepend-inner-icon="mdi-image"
                color="teal-darken-1"
                v-model="state.image"
                prepend-icon="false"
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
                    :src="'http://localhost:8000/' + state.storedImage"
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
import { required, numeric } from "@vuelidate/validators";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import axios from "axios";

export default {
  props: ["eid", "id"],
  components: { DashLayout },
  setup(props) {
    const store = useStore();
    const router = useRouter();

    const state = reactive({
      question: "",
      type: "",
      point: "",
      image: "",
      explanation: "",
      storedImage: "",
      loading: false,
      admin: computed(() => store.state.admin),
      types: [
        {
          value: 1,
          title: "الاختيار من متعدد",
        },
        {
          value: 2,
          title: "صح او خطأ",
        },
      ],
    });

    onMounted(async () => {
      if (!state.admin) router.push({ name: "adminLogin" });

      try {
        const res = await axios.get("api_dashboard/questions/" + props.id);
        if (res.status == 200) {
          const question = res.data.data;
          state.question = question.question;
          state.type = question.type == "T/F" ? 1 : 0;
          state.storedImage = question.image;
          state.explanation = question.explanation;
          state.point = question.point;
        } else {
          throw new Error(res.response.data.message);
        }
      } catch (error) {
        toast.error(error.message);
      }
    });

    const rules = computed(() => {
      return {
        question: { required },
        type: { required },
        point: { required, numeric },
      };
    });
    const v$ = useVuelidate(rules, state);

    const edit = async () => {
      v$.value.$validate();
      if (!v$.value.$error) {
        state.loading = true;
        try {
          const data = {
            question: state.question,
            type: state.type,
            point: state.point,
            explanation: state.explanation,
            image: state.image[0],
            exam_id: props.eid,
          };

          const res = await axios.post(
            "api_dashboard/questions/" + props.id,
            data,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
          if (res.status == 202) {
            toast.success("تم تعديل السؤال بنجاح");
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
        toast.error("ادخل بيانات السؤال بشكل صحيح", {
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
