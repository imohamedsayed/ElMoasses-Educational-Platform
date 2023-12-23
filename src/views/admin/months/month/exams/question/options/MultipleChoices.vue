<template>
  <DashLayout>
    <v-container>
      <v-card class="mt-10 dash-card pa-4" :loading="state.loading">
        <h2>
          <v-icon class="ml-2">mdi-plus-circle</v-icon>
          اضافة الاجابات
        </h2>
        <v-divider class="mt-4 mb-15"></v-divider>
        <form class="pa-10" @submit.prevent="add" v-if="!state.alreadyExisted">
          <v-radio-group v-model="state.correct">
            <v-text-field
              variant="outlined"
              label="الاجابة الاولي"
              color="green-darken-1"
              v-model="state.answer1"
              :error-messages="
                v$.answer1.$error ? v$.answer1.$errors[0].$message : ''
              "
            >
              <template v-slot:prepend>
                <v-radio
                  value="1"
                  true-icon="mdi-check-circle"
                  color="green"
                  name="correct"
                >
                </v-radio>
              </template>
            </v-text-field>
            <v-text-field
              variant="outlined"
              label="الاجابة الثانية"
              color="green-darken-1"
              v-model="state.answer2"
              :error-messages="
                v$.answer2.$error ? v$.answer2.$errors[0].$message : ''
              "
            >
              <template v-slot:prepend>
                <v-radio
                  value="2"
                  true-icon="mdi-check-circle"
                  color="green"
                  name="correct"
                >
                </v-radio>
              </template>
            </v-text-field>
            <v-text-field
              variant="outlined"
              label="الاجابة الثالثة"
              color="green-darken-1"
              v-model="state.answer3"
              :error-messages="
                v$.answer3.$error ? v$.answer3.$errors[0].$message : ''
              "
            >
              <template v-slot:prepend>
                <v-radio
                  value="3"
                  true-icon="mdi-check-circle"
                  color="green"
                  name="correct"
                >
                </v-radio>
              </template>
            </v-text-field>
            <v-text-field
              variant="outlined"
              label="الاجابة الرابعة"
              color="green-darken-1"
              v-model="state.answer4"
              :error-messages="
                v$.answer4.$error ? v$.answer4.$errors[0].$message : ''
              "
            >
              <template v-slot:prepend>
                <v-radio
                  value="4"
                  true-icon="mdi-check-circle"
                  color="green"
                  name="correct"
                >
                </v-radio>
              </template>
            </v-text-field>
          </v-radio-group>
          <v-alert type="warning" closable v-if="v$.correct.$error">
            من فضلك اختار الاجابة الصحيحة
          </v-alert>
          <div class="text-center">
            <v-btn
              class="mt-10"
              color="teal-darken-1"
              size="large"
              type="submit"
              :loading="state.loading"
              :disabled="state.disableAdd"
              >اضافة</v-btn
            >
          </div>
        </form>
        <div v-else class="text-center mb-15">
          <v-img
            :src="require('@/assets/images/warning.svg')"
            width="500"
            class="mx-auto"
          ></v-img>

          <h2 class="mt-10">تم ادخال الاجابات لهذا السؤال من قبل</h2>
          <h3>
            في حالة اردت استبدالها فقم بحذف جميع الاجابات واعادة ادخالها من جديد
          </h3>

          <v-btn
            color="red"
            class="mt-8"
            size="large"
            :loading="state.loading"
            @click="deleteAllAnswers"
          >
            <v-icon>mdi-delete</v-icon>
            حذف جميع الاجابات
          </v-btn>
        </div>
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
  props: ["eid", "qid"],
  components: { DashLayout },
  setup(props) {
    const store = useStore();
    const router = useRouter();

    const state = reactive({
      correct: "",
      answer1: "",
      answer2: "",
      answer3: "",
      answer4: "",
      loading: false,
      alreadyExisted: false,
      disableAdd: false,
      admin: computed(() => store.state.admin),
    });

    onMounted(async () => {
      if (!state.admin) router.push({ name: "adminLogin" });
      state.loading = true;
      try {
        const res = await axios.get("api_dashboard/options/" + props.qid);
        if (res.status == 200) {
          if (res.data.data.length) {
            state.alreadyExisted = true;
          }
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
        answer1: { required },
        answer2: { required },
        answer3: { required },
        answer4: { required },
        correct: { required },
      };
    });
    const v$ = useVuelidate(rules, state);

    const add = async () => {
      v$.value.$validate();
      if (!v$.value.$error) {
        state.loading = true;
        try {
          const data = {
            exam_id: props.eid,
            question_id: props.qid,
            option: {
              1: state.answer1,
              2: state.answer2,
              3: state.answer3,
              4: state.answer4,
            },
            is_correct: {
              1: state.correct === 1,
              2: state.correct === 2,
              3: state.correct === 3,
              4: state.correct === 4,
            },
          };

          state.disableAdd = true;
          const res = await axios.post("api_dashboard/options", data);

          if (res.status == 201) {
            toast.success("تم اضافة الاجابات بنجاح");
          } else {
            state.disableAdd = false;
            throw new Error(res.response.data.message);
          }
        } catch (err) {
          toast.error(err.message, {
            autoClose: 1000,
          });
        }

        state.loading = false;
      } else {
        toast.error("ادخل بيانات الاجابة بشكل صحيح", {
          autoClose: 1000,
        });
      }
    };

    const deleteAllAnswers = async () => {
      state.loading = true;
      try {
        const res = await axios.delete("api_dashboard/options/" + props.qid);
        console.log(res);
        if (res.status == 204) {
          state.alreadyExisted = false;
          toast.success("تم حذف الاجابات الموجودة مسبقا بنجاح");
        } else {
          throw new Error(res.response.data.message);
        }
      } catch (error) {
        toast.error(error.message);
      }
      state.loading = false;
    };

    return { state, add, v$, deleteAllAnswers };
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
