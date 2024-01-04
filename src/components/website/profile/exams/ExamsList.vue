<template>
  <div class="exam-results">
    <v-row v-if="!loading && exams.length">
      <v-col cols="12" class="mt-5" v-for="exam in exams" :key="exam.id">
        <ExamCard :exam="exam" />
      </v-col>
    </v-row>
    <div v-if="loading">
      <v-skeleton-loader
        type="image"
        class="mt-5"
        v-for="i in 3"
        :key="i"
      ></v-skeleton-loader>
    </div>
    <div v-else-if="!exams.length && !loading" class="text-center pa-4">
      <v-img
        :src="require('@/assets/images/noExams.svg')"
        width="400"
        class="mx-auto mb-5"
      ></v-img>
      <h2>هنا ستظهر نتائج امتحاناتك السابقة</h2>
    </div>
  </div>
</template>

<script setup>
import ExamCard from "./ExamCard.vue";
import axios from "axios";
import { onMounted, ref } from "vue";

const exams = ref([]);
const loading = ref(false);

onMounted(async () => {
  loading.value = true;
  try {
    const res = await axios.get("api/get-all-pervious-exams");

    if (res.status == 200) {
      exams.value = res.data.data;
      console.log(exams.value);
    } else {
      throw new Error(res.response.data.message);
    }
  } catch (error) {}
  loading.value = false;
});
</script>

<style></style>
