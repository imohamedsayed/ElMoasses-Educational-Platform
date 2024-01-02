<template>
  <AppLayout>
    <v-container>
      <v-sheet class="lectures-title" width="100%" height="20vh">
        <h1 v-motion-slide-top>المؤسس للرياضيات</h1>
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
                    :src="'http://127.0.0.1:8000/' + question.image"
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
                  />
                  {{ option.option }}
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
                    :src="'http://127.0.0.1:8000/' + question.image"
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
                  />
                  <span>{{ option.option }}</span>
                </div>
              </div>
            </v-card>

            <v-alert type="warning" closable
              >من فضلك لاحظ ان عدم اختيارك لاجابة معينة سوف يكلفك درجة
              السؤال</v-alert
            >

            <v-btn
              color="blue"
              block
              size="large"
              class="mt-13"
              :loading="submitting"
              type="submit"
              >ارسال</v-btn
            >
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
      <v-card
        v-if="!loading && !exam && !alreadyExistedBefore"
        class="my-10 text-center py-13"
      >
        <v-img
          :src="require('@/assets/images/notAllowed.svg')"
          width="600"
          class="mx-auto mb-5"
        ></v-img>
        <h2>غير مسموح لك بالوصول لمحتوي هذه الصفحة الان</h2>
      </v-card>
      <v-card
        v-if="!loading && alreadyExistedBefore"
        class="my-10 text-center py-13"
      >
        <v-img
          :src="require('@/assets/images/alreadySend.svg')"
          width="600"
          class="mx-auto mb-5"
        ></v-img>
        <h2>لقد تم ارسال اجاباتك لهذا الامتحان من قبل</h2>
      </v-card>
    </v-container>
  </AppLayout>
</template>

<script setup>
import AppLayout from "@/components/website/AppLayout.vue";
import axios from "axios";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { toast } from "vue3-toastify";
const props = defineProps({
  mid: String,
  id: String,
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
const router = useRouter();
const questions = ref([]);

const alreadyExistedBefore = ref(false);
const submitting = ref(false);

const examForm = ref(null);

onMounted(async () => {
  try {
    const res = await axios.get(`api/view-exam/${props.id}/${props.mid}`);
    if (res.status == 200) {
      exam.value = res.data.data;
      questions.value = exam.value.questions;
    } else if (res.response.status == 401) {
      if (res.response.data.message.includes("Your Response is send before")) {
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

const submitExam = async () => {
  submitting.value = true;
  const myFormData = new FormData(examForm.value);
  const formDataObj = {};

  let answers = {};

  myFormData.forEach((value, key) => {
    if (key in answers) {
      answers[key].push(value);
    } else {
      answers[key] = [];
      answers[key].push(value);
    }
  });
  let data = {
    answers: answers,
  };

  if (Object.keys(data.answers).length == 0) {
    data.answers[state.questions[0].id] = ["1"];
  }

  let dataInJson = JSON.stringify(data);
  let back = JSON.parse(dataInJson);

  try {
    let res = await axios.post(
      "api/submit_exam/" + props.id + "/" + props.mid,
      back,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (res.status == 200) {
      toast.success("تم ارسال اجاباتك بنجاح", {
        autoClose: 3000,
      });
      setTimeout(() => {
        location.reload();
      }, 3000);
    } else {
      toast.error(
        res.response?.data?.message || "حدث خطأ ما, عاود المحاولة في وقت اخر"
      );
    }
  } catch (err) {
    toast.error(err.response.data.message);
  }

  submitting.value = false;
};
</script>

<style></style>
