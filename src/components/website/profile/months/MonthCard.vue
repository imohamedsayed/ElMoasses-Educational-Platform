<template>
  <v-card class="mx-auto" max-width="400" v-motion>
    <v-img
      class="align-end text-white"
      height="300"
      :src="'http://localhost:8000/' + month.image"
      cover
    >
    </v-img>

    <v-card-subtitle class="pt-4">{{ month.created_at }}</v-card-subtitle>

    <v-card-title>
      <div style="font-size: 1.1rem; font-weight: bold">
        {{ month.name }} - {{ month.semester_name }}
      </div>
    </v-card-title>

    <v-card-actions>
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
  setup(props) {
    onMounted(() => {});
  },
};
</script>

<style></style>
