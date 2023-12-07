<template>
  <AppLayout>
    <Intro />
    <Services />
    <RecentFirstYearMonths />
    <RecentSecondYearMonths />
    <RecentThirdYearMonths />
  </AppLayout>
</template>

<script>
import Intro from "@/components/website/landing/Intro.vue";
import Services from "@/components/website/landing/Services.vue";
import RecentFirstYearMonths from "@/components/website/landing/RecentFirstYearMonths.vue";
import RecentSecondYearMonths from "@/components/website/landing/RecentSecondYearMonths.vue";
import RecentThirdYearMonths from "@/components/website/landing/RecentThirdYearMonths.vue";
import { defineComponent } from "vue";
import AppLayout from "../components/website/AppLayout.vue";
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
});
</script>
