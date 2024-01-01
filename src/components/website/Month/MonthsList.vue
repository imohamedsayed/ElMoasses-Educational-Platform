<template>
  <div class="month-list pa-3">
    <v-row v-if="state.months?.length && !state.loading">
      <v-col
        col="12"
        md="4"
        lg="4"
        xl="3"
        v-for="month in state.months"
        :key="month.id"
        ><MonthCard
          :initial="{ opacity: 0, y: -200 }"
          :enter="{ opacity: 1, y: 0 }"
          :delay="i * 300"
          :month="month"
        />
      </v-col>
    </v-row>
    <v-row v-else-if="state.loading">
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
          <h2 class="mt-8">لم يتم اضافة محتوي لهذا الترم الدراسي بعد</h2>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import axios from "axios";
import MonthCard from "./MonthCard.vue";
import { reactive, onMounted } from "vue";
export default {
  props: ["semester"],
  components: { MonthCard },
  setup(props) {
    const state = reactive({
      loading: false,
      months: [],
    });

    onMounted(async () => {
      state.loading = true;
      try {
        const res = await axios.get(
          "/api/get-all-active-months/" + props.semester
        );

        if (res.status == 200) {
          state.months = res.data.months;
        } else {
          throw new Error(res.response.data.message);
        }
      } catch (error) {}
      state.loading = false;
    });

    return { state };
  },
};
</script>

<style></style>
