<template>
  <section class="first-year" v-if="months.length">
    <v-img :src="require('@/assets/images/3.svg')" alt="" class="img"></v-img>

    <v-container>
      <h2>
        أحدث شهور
        <span style="color: var(--caribian-green)">{{ year.name }}</span>
      </h2>
      <v-divider width="500" class="mt-2"></v-divider>

      <v-row class="row">
        <v-col
          cols="12"
          md="6"
          lg="3"
          v-for="(month, index) in months"
          :key="month.id"
          v-motion
          :initial="{ opacity: 0, x: 400 }"
          :visibleOnce="{ opacity: 1, x: 0 }"
          :delay="200 * index"
        >
          <MonthCard :month="month" />
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script setup>
import { ref } from "vue";
import MonthCard from "../Month/MonthCard.vue";
const props = defineProps({
  year: Object,
});
const months = ref([]);
const semesters = props.year.semester;
semesters.forEach((sem) => {
  months.value.push(...sem.months);
});
</script>

<style lang="scss" scoped>
.first-year {
  position: relative;
  margin-top: 200px;
  h2 {
    font-size: 1.9rem;
    z-index: 900;
  }
  .row {
    margin-top: 100px;
  }
  .img {
    position: absolute;
    width: 500px;
    right: 40%;
    transform: translateX(-50);
    top: -150px;
    opacity: 0.7;
    z-index: -1;
  }
}
</style>
