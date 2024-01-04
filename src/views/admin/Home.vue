<template>
  <DashLayout>
    <v-container>
      <v-card class="my-10 pa-10">
        <v-row v-if="!loading">
          <v-col cols="12" md="6" lg="4">
            <div
              class="students text-center elevation-4 pa-5 bg-blue-grey-lighten-1"
            >
              <v-img
                :src="require('@/assets/images/graduated.png')"
                width="80"
                class="mx-auto mb-6"
              ></v-img>
              <p class="font-weight-bold text-h5">{{ students }} طالب</p>
            </div>
          </v-col>
          <v-col cols="12" md="6" lg="4">
            <div
              class="students text-center elevation-4 pa-5 bg-blue-lighten-1"
            >
              <v-img
                :src="require('@/assets/images/folders.png')"
                width="80"
                class="mx-auto mb-6"
              ></v-img>
              <p class="font-weight-bold text-h5">{{ months }} شهر دراسي</p>
            </div>
          </v-col>

          <v-col cols="12" md="6" lg="4">
            <div class="students text-center elevation-4 pa-5 bg-red">
              <v-img
                :src="require('@/assets/images/pdf2.png')"
                width="80"
                class="mx-auto mb-6"
              ></v-img>
              <p class="font-weight-bold text-h5">{{ notes }} مذكرة</p>
            </div>
          </v-col>
          <v-col cols="12" md="6" lg="4">
            <div
              class="students text-center elevation-4 pa-5 bg-green-accent-1"
            >
              <v-img
                :src="require('@/assets/images/money.png')"
                width="80"
                class="mx-auto mb-6"
              ></v-img>
              <p class="font-weight-bold text-h5">{{ monthsIncome }}</p>
              <p>اجمالي الربح من اشتراكات الشهور</p>
            </div>
          </v-col>
          <v-col cols="12" md="6" lg="4">
            <div class="students text-center elevation-4 pa-5 bg-teal-accent-1">
              <v-img
                :src="require('@/assets/images/money2.png')"
                width="80"
                class="mx-auto mb-6"
              ></v-img>
              <p class="font-weight-bold text-h5">{{ storeIncome }}</p>
              <p>اجمالي الربح من المتجر</p>
            </div>
          </v-col>
          <v-col cols="12" md="6" lg="4">
            <div
              class="students text-center elevation-4 pa-5 bg-orange-accent-1"
            >
              <v-img
                :src="require('@/assets/images/money3.png')"
                width="80"
                class="mx-auto mb-6"
              ></v-img>
              <p class="font-weight-bold text-h5">{{ totalIncome }}</p>
              <p>اجمالي الربح</p>
            </div>
          </v-col>
        </v-row>
        <v-row v-else>
          <v-col cols="12" md="6" lg="4" v-for="i in 6" :key="i">
            <v-skeleton-loader type="image"></v-skeleton-loader>
          </v-col>
        </v-row>
      </v-card>
    </v-container>
  </DashLayout>
</template>

<script setup>
import DashLayout from "@/components/dashboard/layout/DashLayout.vue";
import axios from "axios";
import { ref } from "vue";
import { reactive, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { toast } from "vue3-toastify";
import { useStore } from "vuex";

const store = useStore();
const router = useRouter();
const state = reactive({
  admin: computed(() => store.state.admin),
});
const loading = ref(true);

const students = ref(0);
const months = ref(0);
const notes = ref(0);
const monthsIncome = ref(0);
const storeIncome = ref(0);

const totalIncome = ref(0);

onMounted(async () => {
  if (!state.admin) {
    router.push("/dashboard/login");
  }

  try {
    let studentsRes = await axios.get("api_dashboard/count-all-students");
    students.value = studentsRes.data.countStudent;

    let monthsRes = await axios.get("api_dashboard/count-all-months");
    months.value = monthsRes.data.countMonths;

    let notesRes = await axios.get("api_dashboard/count-all-notes");
    notes.value = notesRes.data.countAllNotes;

    let monthsIncomeRes = await axios.get("api_dashboard/income-subscription");
    monthsIncome.value = monthsIncomeRes.data.data.incomeFromSubscription;
    console.log(monthsIncome.value);

    let productsIncomeRes = await axios.get("api_dashboard/income-product");
    storeIncome.value = productsIncomeRes.data.data.incomeFromPurchaseNote;

    totalIncome.value = monthsIncome.value + storeIncome.value;
  } catch (error) {}

  loading.value = false;
});
</script>

<style lang="scss" scoped></style>
