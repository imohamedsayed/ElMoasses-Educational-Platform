<template>
  <div class="content" dir="rtl">
    <v-tabs
      class="mb-15 tabs mt-5"
      v-model="state.tab"
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
    <v-window v-model="state.tab" class="mt-16">
      <v-window-item value="lec">
        <LecturesList />
      </v-window-item>
      <v-window-item value="notes">
        <NotesList />
      </v-window-item>
      <v-window-item value="exams">
        <p>exams</p>
      </v-window-item>
    </v-window>
  </div>
</template>

<script>
import { reactive } from "vue";
import NotesList from "./notes/NotesList.vue";
import LecturesList from "./lectures/LecturesList.vue";
export default {
  components: { NotesList, LecturesList },
  setup() {
    const state = reactive({
      tab: "lec",
    });

    return { state };
  },
};
</script>

<style lang="scss" scoped></style>
