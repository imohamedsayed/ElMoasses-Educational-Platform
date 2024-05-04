<template>
  <AppLayout>
    <v-container>
      <v-sheet class="lectures-title" width="100%" height="20vh">
        <h1 v-motion-slide-top>المؤسس </h1>
        <v-breadcrumbs :items="items" class="mx-auto" v-motion-slide-bottom>
          <template v-slot:title="{ item }">
            {{ item.title.toUpperCase() }}
          </template>
        </v-breadcrumbs>
      </v-sheet>
      <v-card v-if="exam && !loading" class="my-10">
        <v-container>
          <form
            v-if="exam"
            class="exam-form"
            @submit.prevent="submitExam()"
            ref="examForm"
          >
            <v-card
              class="question my-5 pa-4"
              v-for="question in questions"
              :key="question.id"
            >
              <div
                class="single-choice-question"
                v-if="question.type.toLowerCase() == 'single choice'"
              >
                <p
                  class="font-weight-bold question-title d-flex justify-space-between bg-blue pa-2 mb-4"
                >
                  <span
                    ><i class="fa-solid fa-circle-question ms-2"></i
                    >{{ question.question }}</span
                  >
                  <span class="text-white">({{ question.point }}) درجة</span>
                </p>

                <div v-if="question.image">
                  <v-img
                    :src="apiUrl + question.image"
                    width="100%"
                    height="400px"
                    class="mx-auto"
                  ></v-img>
                </div>
                <p class="text-muted" v-if="question.explanation">
                  توضيح : {{ question.explanation }}
                </p>
                <v-divider class="my-7"></v-divider>

                <div
                  class="choice ml-2 fw-semibold mb-4 d-flex align-center ga-2"
                  v-for="option in question.options"
                  :key="option.id"
                  style="font-size: 1.4rem"
                >
                  <input
                    type="radio"
                    style="width: 25px; height: 25px"
                    :name="question.id"
                    :value="option.id"
                    disabled
                    :checked="my_options.includes(option.id) ? true : false"
                  />
                  {{ option.option }}
                  <span
                    class="true_answer text-success"
                    v-if="my_options.includes(option.id) && option.is_correct"
                  >
                    اجابتك صحيحة
                  </span>
                  <span
                    class="false_answer text-error"
                    color="error"
                    v-else-if="
                      my_options.includes(option.id) && !option.is_correct
                    "
                    >اجابتك خاطئة</span
                  >
                  <span
                    class="true_answer text-success"
                    v-else-if="
                      !my_options.includes(option.id) && option.is_correct
                    "
                    >الاجابة الصحيحة
                  </span>
                </div>
              </div>

              <div
                class="TF-choice-question"
                v-if="question.type.toLowerCase() == 't/f'"
              >
                <p
                  class="font-weight-bold question-title d-flex justify-space-between bg-blue pa-2 mb-4"
                >
                  <span
                    ><i class="fa-solid fa-circle-question ms-2"></i
                    >{{ question.question }}</span
                  >
                  <span class="text-white">({{ question.point }}) درجة</span>
                </p>

                <div v-if="question.image">
                  <v-img
                    :src="apiUrl + question.image"
                    width="100%"
                    height="400px"
                    class="mx-auto"
                  ></v-img>
                </div>
                <p class="text-muted" v-if="question.explanation">
                  توضيح : {{ question.explanation }}
                </p>
                <v-divider class="my-7"></v-divider>
                <div
                  class="choice ml-2 fw-semibold mb-4 d-flex align-center ga-2"
                  v-for="option in question.options"
                  :key="option.id"
                  style="font-size: 1.4rem"
                >
                  <input
                    type="radio"
                    style="width: 25px; height: 25px"
                    class="ms-2"
                    :name="question.id"
                    :value="option.id"
                    :checked="my_options.includes(option.id) ? true : false"
                    disabled
                  />
                  <span>{{ option.option }}</span>
                  <span
                    class="true_answer text-success"
                    v-if="my_options.includes(option.id) && option.is_correct"
                  >
                    اجابتك صحيحة
                  </span>
                  <span
                    class="false_answer text-error"
                    color="error"
                    v-else-if="
                      my_options.includes(option.id) && !option.is_correct
                    "
                    >اجابتك خاطئة</span
                  >
                  <span
                    class="true_answer text-success"
                    v-else-if="
                      !my_options.includes(option.id) && option.is_correct
                    "
                    >الاجابة الصحيحة
                  </span>
                </div>
              </div>
            </v-card>
          </form>
        </v-container>
      </v-card>
      <v-card v-if="loading" class="my-10" :loading="loading">
        <v-container>
          <v-skeleton-loader
            height="240"
            class="my-15"
            type="image, list-item-two-line, list-item-two-line"
            v-for="i in 5"
            :key="i"
          >
          </v-skeleton-loader>
        </v-container>
      </v-card>
      <v-card v-if="!loading && !exam" class="my-10 text-center py-13">
        <v-img
          :src="require('@/assets/images/notAllowed.svg')"
          width="600"
          class="mx-auto mb-5"
        ></v-img>
        <h2>غير مسموح لك بالوصول لمحتوي هذه الصفحة</h2>
      </v-card>
    </v-container>
  </AppLayout>
</template>

<script setup>
import AppLayout from "@/components/website/AppLayout.vue";
import axios from "axios";
import { ref, onMounted, reactive, computed } from "vue";
import { useRouter } from "vue-router";
import { toast } from "vue3-toastify";
import { useStore } from "vuex";
const apiUrl = process.env.VUE_APP_API_URL;

const props = defineProps({
  mid: String,
  id: String,
});
const state = reactive({
  student: computed(() => useStore().state.student),
  token: computed(() => useStore().state.token),
});

const items = ref([
  {
    title: "الرئيسية",
    disabled: false,
    href: "/",
  },
  {
    title: "الصفوف الدراسية",
    disabled: false,
    href: "/home",
  },
  {
    title: "الامتحان",
    disabled: true,
    href: "/exam/" + props.id,
  },
]);
const loading = ref(true);
const exam = ref(null);
const exam_result = ref("");
const Choices = ref([]);
const my_options = ref([]);
const router = useRouter();
const questions = ref([]);

const alreadyExistedBefore = ref(false);
const examForm = ref(null);

onMounted(async () => {
  if (!state.student) useRouter().push({ name: "login" });

  try {
    const res = await axios.get(`api/show-answer/${props.id}/${props.mid}`);

    if (res.status == 200) {
      exam.value = res.data.data.preview.exam;
      questions.value = res.data.data.preview.questions;
      Choices.value = res.data.data.preview.Choices;
      // get my options
      questions.value.forEach((question) => {
        Choices.value.forEach((choice) => {
          if (question.id === choice.question_id) {
            question.options.forEach((option) => {
              if (option.id === choice.studnet_choice) {
                my_options.value.push(option.id);
              }
            });
          }
        });
      });
    } else if (res.response.status == 401) {
      if (
        res.response.data.message.includes("Your Response is send before") ||
        res.response.data.message.includes("exam")
      ) {
        alreadyExistedBefore.value = true;
      } else if (!res.response.data.message.includes("exam will")) {
        router.push({
          name: "monthSubscription",
          params: { id: props.month },
        });
      }
    } else {
      throw new Error(res.response.data.message);
    }
  } catch (error) {
    toast.error(error.message);
  }

  loading.value = false;
});
</script>

<style></style>
