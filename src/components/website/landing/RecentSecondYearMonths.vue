<template>
  <section class="first-year">
    <v-container>
      <h2>
        أحدث شهور
        <span style="color: var(--caribian-green)">الصف الثاني الثانوي</span>
      </h2>
      <v-divider width="500" class="mt-2"></v-divider>
      <v-row class="row">
        <v-col
          cols="12"
          md="6"
          lg="3"
          v-for="num in 4"
          :key="num"
          v-motion
          :initial="{ opacity: 0, x: 200 }"
          :visibleOnce="{ opacity: 1, x: 0 }"
          :delay="200 * num"
        >
          <v-card class="mx-auto" max-width="400">
            <v-img
              class="align-end text-white"
              height="200"
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
              <v-btn color="#01cda9" class="text-white" variant="flat">
                الاشتراك</v-btn
              >

              <v-btn color="#01cda9"> مشاهدة المحتوي </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.first-year {
  margin-top: 200px;
  h2 {
    font-size: 1.9rem;
  }
  .row {
    margin-top: 100px;
  }
}
</style>
