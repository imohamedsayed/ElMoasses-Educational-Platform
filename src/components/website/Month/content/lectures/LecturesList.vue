<template>
  <div class="div lectures">
    <div v-if="lectures.length">
      <LectureCard
        v-for="lecture in lectures"
        :key="lecture.id"
        :lecture="lecture"
      />
    </div>
    <div v-else-if="!loading" class="text-center">
      <v-img
        :src="require('@/assets/images/noContent.svg')"
        width="600"
        class="mx-auto mb-5"
      ></v-img>
      <h2>لم يتم رفع المحاضرات بعد</h2>
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
import LectureCard from "./LectureCard.vue";
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const props = defineProps({
  month: String,
});
const loading = ref(true);
const lectures = ref([]);
const router = useRouter();
onMounted(async () => {
  try {
    const res = await axios.get("api/get-all-active-contents/" + props.month);

    if (res.status == 200) {
      lectures.value = res.data.data;
    } else if (res.response.status == 401) {
      router.push({
        name: "monthSubscription",
        params: { id: props.month },
      });
    } else {
      console.log(res);
      throw new Error(res.response.data.message);
    }
  } catch (error) {
    toast.error(error.message);
  }
  loading.value = false;
});
</script>

<style></style>
