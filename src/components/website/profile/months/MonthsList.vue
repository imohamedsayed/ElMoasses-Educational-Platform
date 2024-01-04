<template>
  <div class="months-list pa-3">
    <v-row v-if="months?.length && !loading">
      <v-col
        col="12"
        md="4"
        lg="4"
        xl="3"
        v-for="(month, i) in months"
        :key="month.id"
        ><MonthCard
          :initial="{ opacity: 0, y: -200 }"
          :enter="{ opacity: 1, y: 0 }"
          :delay="i * 300"
          :month="month"
        />
      </v-col>
    </v-row>
    <v-row v-else-if="loading">
      <v-col cols="12" md="4" lg="4" xl="3" v-for="i in 8" :key="i">
        <v-skeleton-loader
          class="mx-auto border"
          type="image, article"
        ></v-skeleton-loader>
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col>
        <div class="text-center">
          <v-img
            :src="require('@/assets/images/6.svg')"
            width="600"
            class="mx-auto"
          ></v-img>
          <h2 class="mt-8">ليس لديك أي اشتركات حتي الان</h2>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import axios from "axios";
import MonthCard from "./MonthCard.vue";
import { ref, onMounted } from "vue";
import { toast } from "vue3-toastify";

const loading = ref(false);
const months = ref([]);

onMounted(async () => {
  loading.value = true;
  try {
    const res = await axios.get("api/get-all-month-paid");
    if (res.status == 200) {
      months.value = res.data.data;
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
