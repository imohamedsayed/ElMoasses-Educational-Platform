<template>
  <AppLayout>
    <v-container>
      <v-card class="my-15 text-center py-10">
        <v-img
          :src="require('@/assets/images/paymentSuccess.svg')"
          class="mx-auto"
          width="800"
        ></v-img>
        <h1>تم بنجاح!</h1>
        <h2 class="mt-3">عملية الشراء تمت بنجاح</h2>
      </v-card>
    </v-container>
  </AppLayout>
</template>

<script>
import AppLayout from "@/components/website/AppLayout.vue";

export default {
  components: {
    AppLayout,
  },
};
</script>

<style></style>
