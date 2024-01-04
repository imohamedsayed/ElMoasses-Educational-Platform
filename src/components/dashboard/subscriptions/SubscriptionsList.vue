<template>
  <div class="list">
    <v-card flat>
      <template v-slot:text>
        <v-text-field
          v-model="search"
          label="البحث"
          prepend-inner-icon="mdi-magnify"
          single-line
          variant="outlined"
        ></v-text-field>
      </template>
      <div class="text-end mb-3">
        <v-btn color="blue-grey-lighten-1" :to="{ name: 'grantSubscription' }">
          <v-icon class="ml-2">mdi-account-cash</v-icon>
          منح اشتراك
        </v-btn>
      </div>
      <v-data-table
        :headers="headers"
        :items="subscriptions"
        :search="search"
        :loading="loading"
        hover
        class="table"
      >
        <template v-slot:item.status="{ item }">
          <div>
            <v-icon v-if="item.status == 'Verified'" color="green"
              >mdi-check</v-icon
            >
            <v-icon v-else color="red">mdi-close</v-icon>
          </div>
        </template>
        <template v-slot:item.action="{ item }">
          <div>
            <v-btn
              icon
              elevation="0"
              @click="changeStatus(item.id, item.status)"
            >
              <v-icon>mdi-swap-horizontal</v-icon>
              <v-tooltip activator="parent" location="top"
                >تغيير حالة الاشتراك</v-tooltip
              >
            </v-btn>
          </div>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
import axios from "axios";
import { toast } from "vue3-toastify";
export default {
  props: ["subscriptions", "loading"],
  data: () => ({
    search: "",
    headers: [
      {
        key: "id",
        title: "ID",
      },
      { key: "studentId", title: "ID الطالب" },
      { key: "StudentNationalId", title: "الرقم القومي" },
      { key: "MonthName", title: "اسم الشهر" },
      { key: "monthId", title: "ID الشهر" },
      { key: "paymentId", title: "رقم عملية الدفع" },
      { key: "status", title: "الحالة" },
      { key: "createdAt", title: "موعد الدفع" },
      { key: "action", title: "" },
    ],
  }),
  methods: {
    async changeStatus(id, currentStatus) {
      const status = currentStatus == "Verified" ? 0 : 1;

      try {
        const res = await axios.post("api_dashboard/changeStatus", {
          status: status.toString(),
          id,
        });
        if (res.status == 202) {
          toast.success("تم تغيير حالة الاشتراك بنجاح");
        } else {
          throw new Error(res.response.data.message);
        }
      } catch (error) {
        toast.error(error.message);
      }
    },
  },
};
</script>

<style>
.table thead {
  background: var(--caribian-green);
  color: white;
}
</style>
