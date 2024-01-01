<template>
  <AppLayout>
    <Intro />
    <Services />

    <div v-if="years.length">
      <RecentFirstYearMonths :year="years[0]" v-if="years[0]" />
      <RecentSecondYearMonths :year="years[1]" v-if="years[1]"/>
      <RecentThirdYearMonths :year="years[2]" v-if="years[2]"/>
    </div>
  </AppLayout>
</template>

<script>
import Intro from "@/components/website/landing/Intro.vue";
import Services from "@/components/website/landing/Services.vue";
import RecentFirstYearMonths from "@/components/website/landing/RecentFirstYearMonths.vue";
import RecentSecondYearMonths from "@/components/website/landing/RecentSecondYearMonths.vue";
import RecentThirdYearMonths from "@/components/website/landing/RecentThirdYearMonths.vue";
import { defineComponent, ref } from "vue";
import AppLayout from "../components/website/AppLayout.vue";
import { onMounted } from "vue";
import axios from "axios";
export default defineComponent({
  name: "HomeView",
  components: {
    AppLayout,
    Intro,
    Services,
    RecentFirstYearMonths,
    RecentSecondYearMonths,
    RecentThirdYearMonths,
  },
  setup() {
    const years = ref([]);

    onMounted(async () => {
      try {
        const res = await axios.get("api/get-last-three-years");
        if (res.status == 200) {
          years.value = res.data.lastThreeYear;
        } else {
          throw new Error(res.response.data.message);
        }
      } catch (error) {
        console.log("Error fetching data: ", error.message);
      }
    });

    return { years };
  },
});
</script>
