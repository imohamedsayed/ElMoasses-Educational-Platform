<template>
  <AppLayout>
    <v-container v-if="loading">
      <v-skeleton-loader type="image" height="184"></v-skeleton-loader>

      <v-divider class="my-16"></v-divider>

      <v-skeleton-loader
        :loading="true"
        type="list-item-two-line"
        v-for="i in 5"
        :key="i"
      >
        <v-list-item
          title="Title"
          subtitle="Subtitle"
          lines="two"
          rounded
        ></v-list-item>
      </v-skeleton-loader>
    </v-container>
    <v-container v-else>
      <iframe
        v-if="lec"
        width="100%"
        height="615"
        :src="lec.url"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
      ></iframe>
      <div v-else>
        <v-alert type="warning" closable
          >المحاضرة التي طلبتها غير موجودة. من فضلك تحقق من الرابط الذي
          ادخلته</v-alert
        >
      </div>
      <v-divider class="my-10"></v-divider>
      <v-list v-if="lectures.length">
        <h2 class="mb-7">باقي محاضرات الشهر</h2>
        <v-list-item
          v-for="lec in lectures"
          :key="lec.id"
          :title="lec.name"
          subtitle="اضغط للاستماع"
          link
          :active="lec.id == props.id"
          color="teal"
          class="pa-4 mb-5"
          prepend-icon="mdi-video"
          :to="{ name: 'lecture', params: { mid: lec.month_id, id: lec.id } }"
          @click="location.reload()"
        >
        </v-list-item>
      </v-list>
    </v-container>
  </AppLayout>
</template>

<script setup>
import AppLayout from "@/components/website/AppLayout.vue";
import axios from "axios";
import { onMounted, ref, reactive, computed } from "vue";
import { useRouter } from "vue-router";
import { toast } from "vue3-toastify";
import { useStore } from "vuex";

const props = defineProps({
  mid: String,
  id: String,
});

const loading = ref(true);
const lec = ref("");
const lectures = ref([]);
const router = useRouter();

const state = reactive({
  student: computed(() => useStore().state.student),
});

onMounted(async () => {
  if (!state.student) router.push({ name: "login" });

  try {
    const res = await axios.get("api/get-all-active-contents/" + props.mid);
    if (res.status == 200) {
      lectures.value = res.data.data;
      lec.value = lectures.value.find((l) => l.id == props.id);
    } else if (res.response.status == 401) {
      router.push({
        name: "monthSubscription",
        params: { id: props.mid },
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
