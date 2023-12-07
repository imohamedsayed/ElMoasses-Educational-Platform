<template>
  <div class="month-list">
    <v-row v-if="!state.loading">
      <v-col col="12" md="4" lg="3" v-for="i in 8" :key="i"
        ><LectureCard
          :initial="{ opacity: 0, y: -200 }"
          :enter="{ opacity: 1, y: 0 }"
          :delay="i * 300"
        />
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col col="12" md="4" lg="3" v-for="i in 8" :key="i">
        <v-skeleton-loader
          class="mx-auto border"
          max-width="300"
          type="image, article"
        ></v-skeleton-loader>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import LectureCard from "./MonthCard.vue";
import { reactive, onMounted } from "vue";
export default {
  components: { LectureCard },
  setup() {
    const state = reactive({
      loading: true,
    });

    onMounted(() => {
      setTimeout(() => {
        state.loading = false;
      }, 5000);
    });

    return { state };
  },
};
</script>

<style></style>
