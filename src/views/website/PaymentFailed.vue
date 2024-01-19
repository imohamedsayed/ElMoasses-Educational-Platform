<template>
  <v-container>
    <v-card class="my-15 text-center py-10">
      <v-img
        :src="require('@/assets/images/paymentFailed.svg')"
        class="mx-auto"
        width="500"
      ></v-img>
      <h1 class="text-error">عملية الدفع فشلت !</h1>
      <h2 class="mt-3">
        عملية الشراء فشلت. تحقق من رصيدك او تواصل مع مالك خدمة الدفع الخاصة بك
      </h2>
    </v-card>
  </v-container>
</template>

<script setup></script>

<style></style>
