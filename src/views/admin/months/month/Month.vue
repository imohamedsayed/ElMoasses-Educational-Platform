<template>
  <DashLayout>
    <v-container>
      <v-sheet class="month-header text-center text-md-start">
        <v-row class="align-center pa-4">
          <v-col cols="12" md="2">
            <v-img
              src="../../../../assets/images/imgPlaceholder.jpg"
              width="200"
              class="mx-auto"
              height="200"
            ></v-img>
          </v-col>
          <v-col cols="12" md="6">
            <h2 class="mb-10">شهر نوفمبر</h2>
            <h3 class="text-green">150 جنيه مصري</h3>
            <h5 class="mt-6">
              <v-icon>mdi-check</v-icon>
              مفعل
            </h5>
          </v-col>
        </v-row>
      </v-sheet>

      <v-card class="pa-4 mt-15">
        <v-row>
          <v-col cols="12" md="4">
            <v-card
              class="mx-auto"
              height="200"
              :image="require('../../../../assets/images/lec.svg')"
              theme="light"
              style="cursor: pointer"
            >
              <v-card-title style="font-weight: bold">المحاضرات</v-card-title>
            </v-card>
          </v-col>

          <v-col cols="12" md="4">
            <v-card
              class="mx-auto"
              height="200"
              :image="require('../../../../assets/images/notes.svg')"
              theme="light"
              style="cursor: pointer"
            >
              <v-card-title style="font-weight: bold">المذكرات</v-card-title>
            </v-card>
          </v-col>

          <v-col cols="12" md="4">
            <v-card
              class="mx-auto"
              height="200"
              :image="require('../../../../assets/images/exam.svg')"
              theme="light"
              style="cursor: pointer"
            >
              <v-card-title style="font-weight: bold">الامتحانات</v-card-title>
            </v-card>
          </v-col>
        </v-row>
      </v-card>
    </v-container>
  </DashLayout>
</template>

<script>
import DashLayout from "@/components/dashboard/layout/DashLayout.vue";
export default {
  components: { DashLayout },
};
</script>

<style lang="scss" scoped>
.month-header {
  background: var(--martinique);
  color: var(--seashell);
}
</style>
