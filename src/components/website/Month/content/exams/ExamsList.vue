<template>
  <div class="div exams">
    <div v-if="exams.length">
      <ExamCard v-for="exam in exams" :exam="exam" :key="exam.id"/>
    </div>
    <div v-else-if="!loading" class="text-center">
      <v-img
        :src="require('@/assets/images/noExams.svg')"
        width="600"
        class="mx-auto mb-5"
      ></v-img>
      <h2>لا توجد امتحانات حتي هذه اللحظة</h2>
    </div>
    <div class="v-else text-center" v-else>
      <v-progress-circular
        :width="8"
        color="green"
        size="200"
        indeterminate
      ></v-progress-circular>
      <h2 class="mt-8 text-grey-lighten-2">جار التحميل ....</h2>
    </div>
  </div>
</template>

<script setup>
import { toast } from "vue3-toastify";
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import ExamCard from "./ExamCard.vue";
const props = defineProps({
  month: String,
});
const loading = ref(true);
const exams = ref([]);
const router = useRouter();
onMounted(async () => {
  try {
    const res = await axios.get("api/get-all-active-exams/" + props.month);

    if (res.status == 200) {
      exams.value = res.data.data;
      console.log(exams.value);
    } else if (res.response.status == 401) {
      router.push({
        name: "monthSubscription",
        params: { id: props.month },
      });
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
