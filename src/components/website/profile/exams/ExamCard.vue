<template>
  <v-card class="pa-5 bg-grey-lighten-4 border-md">
    <v-card-darken>
      <v-icon>mdi-file-outline</v-icon>
      {{ exam.name }} - {{ exam.MonthName }}</v-card-darken
    >
    <v-card-subtitle class="mr-1">
      <v-icon>mdi-text</v-icon>

      {{ exam.description }}</v-card-subtitle
    >
    <p class="mr-5 mt-5 font-weight-bold" style="font-size: 1.4rem">
      الدرجة: {{ exam.ExamResult[0].score }}
    </p>

    <div class="px-5 mt-5">
      <p>بدأ في : {{ exam.start_at }}</p>
      <p>انتهي في : {{ exam.start_at }}</p>
    </div>
  </v-card>
</template>

<script>
export default {
  props: ["exam"],
};
</script>

<style></style>
