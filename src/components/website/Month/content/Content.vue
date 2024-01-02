<template>
  <div class="content" dir="rtl">
    <v-tabs
      class="mb-15 tabs mt-5"
      v-model="tab"
      color="white"
      style="background: var(--caribian-green)"
    >
      <v-tab value="lec">
        محاضرات
        <template v-slot:prepend>
          <v-icon>mdi-monitor</v-icon>
        </template>
      </v-tab>
      <v-tab value="notes">
        مذكرات
        <template v-slot:prepend>
          <v-icon>mdi-file-pdf-box</v-icon>
        </template>
      </v-tab>
      <v-tab value="exams">
        امتاحانات
        <template v-slot:prepend>
          <v-icon>mdi-file-multiple-outline</v-icon>
        </template>
      </v-tab>
    </v-tabs>
    <v-window v-model="tab" class="mt-16">
      <v-window-item value="lec">
        <LecturesList :month="props.month" />
      </v-window-item>
      <v-window-item value="notes">
        <NotesList :month="props.month" />
      </v-window-item>
      <v-window-item value="exams">
        <ExamsList :month="props.month" />
      </v-window-item>
    </v-window>
  </div>
</template>

<script setup>
import { ref } from "vue";
import NotesList from "./notes/NotesList.vue";
import LecturesList from "./lectures/LecturesList.vue";
import ExamsList from "./exams/ExamsList.vue";
const tab = ref("lec");
const props = defineProps({
  month: String,
});
</script>

<style lang="scss" scoped></style>
