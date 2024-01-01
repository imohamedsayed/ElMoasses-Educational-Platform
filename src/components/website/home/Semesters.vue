<template>
  <p v-if="loading">
    <v-progress-circular
      :width="5"
      color="green"
      indeterminate
    ></v-progress-circular>
  </p>
  <div v-if="semesters.length">
    <v-list-item v-for="semester in semesters" :key="semester.id">
      <v-tab :value="semester.id">
        <v-icon start> mdi-file-multiple-outline </v-icon>
        {{ semester.name }}
      </v-tab>
    </v-list-item>
  </div>
  <v-alert type="info" v-else
    >لم يتم اضافة محتويات دراسية لهذه السنة بعد</v-alert
  >
</template>

<script setup>
import axios from "axios";
import { onMounted, ref } from "vue";
import { useStore } from "vuex";

let props = defineProps({
  id: Number,
});
const loading = ref(false);
const semesters = ref([]);
const store = useStore();
onMounted(async () => {
  loading.value = true;
  try {
    const res = await axios("api/get-all-active-semesters/" + props.id);

    if (res.status == 200) {
      semesters.value = res.data.Semester;
      store.dispatch("setSemesters", { semesters: res.data.Semester });
    } else {
      throw new Error(res.response.data.message);
    }
  } catch (error) {
    console.log("Error while fetching semesters: " + error);
  }
  loading.value = false;
});
</script>

<style></style>
