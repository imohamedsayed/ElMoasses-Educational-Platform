<template>
  <div class="list pa-4" v-if="notes.length">
    <v-row>
      <v-col cols="12" md="6" lg="3" v-for="note in notes" :key="note.id"
        ><NoteCard :note="note" />
      </v-col>
    </v-row>
  </div>
  <div v-else-if="!loading" class="text-center">
    <v-img
      :src="require('@/assets/images/noNotes.svg')"
      width="600"
      class="mx-auto mb-5"
    ></v-img>
    <h2>لم يتم اضافة مذكرات لهذا الشهر حتي الان</h2>
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
</template>

<script setup>
import { toast } from "vue3-toastify";
import NoteCard from "./NoteCard.vue";
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const props = defineProps({
  month: String,
});
const loading = ref(true);
const notes = ref([]);
const router = useRouter();
onMounted(async () => {
  try {
    const res = await axios.get("api/get-all-attachments/" + props.month);

    if (res.status == 200) {
      notes.value = res.data.data;
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
