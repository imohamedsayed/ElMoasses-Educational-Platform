<template>
  <section class="service">
    <v-container>
      <div class="section-title text-center">
        <h2 class="mb-16">خدماتنا</h2>
      </div>
      <v-row class="align-center justify-center row">
        <v-col cols="12" md="6" lg="3" class="mb-15">
          <v-hover v-slot="{ isHovering, props }">
            <v-card
              class="text-center"
              v-bind="props"
              :elevation="isHovering ? 3 : 0"
              v-motion-pop-visible-once
            >
              <v-icon color="green-lighten-1" size="80" class="mb-4"
                >mdi-road-variant</v-icon
              >
              <v-card-text style="font-size: 1.2rem; font-weight: 700"
                >منصة منظمة</v-card-text
              >
            </v-card>
          </v-hover>
        </v-col>
        <v-col cols="12" md="6" lg="3" class="mb-15">
          <v-hover v-slot="{ isHovering, props }">
            <v-card
              class="text-center"
              v-bind="props"
              :elevation="isHovering ? 3 : 0"
              v-motion-pop-visible-once
              :delay="200"
            >
              <v-icon color="yellow-lighten-1" size="80" class="mb-4"
                >mdi-file-multiple-outline</v-icon
              >
              <v-card-text style="font-size: 1.2rem; font-weight: 700">
                اختبارات الكترونية</v-card-text
              >
            </v-card>
          </v-hover>
        </v-col>
        <v-col cols="12" md="6" lg="3" class="mb-15">
          <v-hover v-slot="{ isHovering, props }">
            <v-card
              class="text-center"
              v-bind="props"
              :elevation="isHovering ? 3 : 0"
              v-motion-pop-visible-once
              :delay="400"

            >
              <v-icon color="error" size="80" class="mb-4"
                >mdi-chat-outline</v-icon
              >
              <v-card-text style="font-size: 1.2rem; font-weight: 700">
                الرد علي الاستفسارات</v-card-text
              >
            </v-card>
          </v-hover>
        </v-col>
        <v-col cols="12" md="6" lg="3" class="mb-15">
          <v-hover v-slot="{ isHovering, props }">
            <v-card
              class="text-center"
              v-bind="props"
              :elevation="isHovering ? 3 : 0"
              v-motion-pop-visible-once
              :delay="600"

            >
              <v-icon color="teal" size="80" class="mb-4">mdi-arm-flex</v-icon>
              <v-card-text style="font-size: 1.2rem; font-weight: 700">
                جودة عالية في الشرح</v-card-text
              >
            </v-card>
          </v-hover>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
section {
  margin-top: 100px;
  h2 {
    font-size: 3rem;
  }
  .row {
    margin-top: 100px;
  }
}
</style>
