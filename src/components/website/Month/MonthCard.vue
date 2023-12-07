<template>
  <v-card
    class="mx-auto"
    max-width="400"
    v-motion
  
  >
    <v-img
      class="align-end text-white"
      height="300"
      src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
      cover
    >
      <v-card-title>محتوي شهر ديسمبر</v-card-title>
    </v-img>

    <v-card-subtitle class="pt-4"> استاتيكا -</v-card-subtitle>

    <v-card-text>
      <div>مادة الاستاتيكا</div>

      <div
        class="w-25 mt-5 pa-2 text-center"
        style="
          border-radius: 20px;
          background: var(--seashell);
          color: var(--black-color);
          opacity: 0.6;
        "
      >
        150 جنيه
      </div>
    </v-card-text>

    <v-card-actions>
      <v-btn color="#01cda9" class="text-white" variant="flat"> الاشتراك</v-btn>

      <v-btn color="#01cda9"> مشاهدة المحتوي </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {};
</script>

<style></style>
