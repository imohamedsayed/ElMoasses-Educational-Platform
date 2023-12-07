<template>
  <AppLayout>
    <v-container>
      <video height="560" controls autoplay class="w-100">
        <source
          :src="require('../../assets/video/intro.mp4')"
          type="video/mp4"
        />
      </video>
      <v-divider class="my-10"></v-divider>
      <v-list>
        <h2 class="mb-7">باقي محاضرات الشهر</h2>
        <v-list-item
          title="المحاضرة الأولي"
          subtitle="اضغط للاستماع"
          link
          :active="i == 1"
          color="teal"
          class="pa-4 mb-5"
          prepend-icon="mdi-video"
          v-for="i in 5"
          :key="i"
        >
        </v-list-item>
      </v-list>
    </v-container>
  </AppLayout>
</template>

<script>
import AppLayout from "@/components/website/AppLayout.vue";
export default {
  components: { AppLayout },
};
</script>

<style></style>
