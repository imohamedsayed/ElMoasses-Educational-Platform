<template>
  <div class="teacher">
    <v-sheet
      class="text-body-2 mx-auto bg-grey-lighten-4 d-flex align-center"
      height="100%"
    >
      <v-container>
        <v-card class="text-center pa-4 bg-transparent" elevation="0">
          <v-img
            src="@/assets/images/user.jpg"
            width="200"
            class="mx-auto mb-10"
            style="border-radius: 50%; border: 1px solid #43A047"
          ></v-img>
          <v-card-title class="text-green-darken-1 text-h3"
            >الاستاذ محمد سليمان</v-card-title
          >
          <v-card-text class="mt-7" style="font-size: 1.3rem"
            >لا تيأس فالطريق طويل والوصول اليه حلم جميل
          </v-card-text>
          <v-card-actions>
            <v-btn
              class="mx-auto mt-5"
              color="green-darken-1"
              variant="flat"
              size="x-large"
              width="260"
              >عرض جميع المحاضرات</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-container>
    </v-sheet>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.teacher {
  margin-top: 200px;
  height: 60vh;
}
</style>
