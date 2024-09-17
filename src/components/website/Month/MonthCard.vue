<template>
  <v-card class="mx-auto" max-width="400" v-motion>
    <v-img
      class="align-end text-white"
      height="300"
      :src="apiUrl + month.image"
      cover
    >
    </v-img>

    <v-card-subtitle class="pt-4">{{ month.created_at }}</v-card-subtitle>

    <v-card-title  style="font-size: 1.1rem; font-weight: bold mb-0">
        {{ month.name }}
    </v-card-title>
    <v-card-subtitle class="font-weight-bold">{{ month.semester_name }}</v-card-subtitle>

    <v-chip class="mt-7" color="green"> {{ month.price }} جنيه </v-chip>

    <v-card-actions>
      <v-btn
        color="#01cda9"
        class="text-white"
        variant="flat"
        @click="
          $router.push({ name: 'monthSubscription', params: { id: month.id } })
        "
      >
        الاشتراك</v-btn
      >

      <v-btn
        color="#01cda9"
        @click="$router.push({ name: 'month', params: { id: month.id } })"
      >
        مشاهدة المحتوي
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { onMounted } from "vue";

export default {
  props: ["month"],
  data() {
    return {
      apiUrl: process.env.VUE_APP_API_URL,
    };
  },
  setup(props) {
    onMounted(() => {});
  },
};
</script>

<style></style>
