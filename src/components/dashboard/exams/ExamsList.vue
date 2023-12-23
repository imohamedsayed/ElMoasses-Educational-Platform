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
        <v-btn
          color="blue-grey-lighten-1"
          :to="{
            name: 'addMonthExam',
            params: { yid: yid, sid: sid, mid: mid },
          }"
        >
          <v-icon class="ml-2">mdi-file-document</v-icon>
          اضافة امتحان جديد</v-btn
        >
      </div>
      <v-data-table
        :headers="headers"
        :items="exams"
        :search="search"
        hover
        class="table"
      >
        <template v-slot:item.actions="{ item }">
          <div class="text-end">
            <v-btn
              color="teal-darken-1"
              class="ml-4"
              size="small"
              :to="{
                name: 'questions',
                params: { yid: yid, sid: sid, mid: mid, eid: item.id },
              }"
              ><v-icon>mdi-eye</v-icon>
              <v-tooltip activator="parent" location="top"
                >عرض الاسئلة</v-tooltip
              >
            </v-btn>
            <v-btn
              color="red"
              class="ml-4"
              size="small"
              @click="deleteExam(item.id)"
              ><v-icon>mdi-delete</v-icon>
              <v-tooltip activator="parent" location="top">حذف</v-tooltip>
            </v-btn>
            <v-btn
              color="info ml-4"
              size="small"
              :to="{
                name: 'editMonthExam',
                params: { yid: yid, sid: sid, mid: mid, id: item.id },
              }"
              ><v-icon>mdi-pencil</v-icon>
              <v-tooltip activator="parent" location="top">تعديل </v-tooltip>
            </v-btn>
          </div>
        </template>
      </v-data-table>
    </v-card>
    <v-dialog
      v-model="dialog"
      width="500"
      transition="dialog-top-transition"
      persistent
    >
      <v-card class="pa-4" :loading="loading">
        <v-card-title> هل تريد فعلا حذف الامتحان؟ </v-card-title>
        <v-card-text> بمجرد تأكيد للأمر لن يمكنك التراجع عن ذلك </v-card-text>
        <v-card-actions class="mt-5 text-center">
          <v-btn @click="dialog = false" color="green">
            <v-icon>mdi-close</v-icon> الغاء الامر
          </v-btn>
          <v-btn
            @click="confirmDeleteExam"
            color="red"
            class="mr-5"
            :loading="loading"
          >
            <v-icon>mdi-check</v-icon> تأكيد الامر
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import axios from "axios";
import { toast } from "vue3-toastify";

export default {
  props: ["yid", "sid", "mid", "exams"],
  data: () => ({
    dialog: false,
    id: "",
    loading: false,
    search: "",
    headers: [
      {
        key: "id",
        title: "ID",
      },
      { key: "name", title: "الملف" },
      { key: "description", title: "الوصف" },
      { key: "start_at", title: "موعد البدء" },
      { key: "end_at", title: "موعد الانتهاء" },
      { key: "status", title: "الحالة" },
      { key: "actions" },
    ],
  }),
  methods: {
    async deleteExam(id) {
      this.dialog = true;
      this.id = id;
    },
    async confirmDeleteExam() {
      this.loading = true;
      try {
        const res = await axios.delete("api_dashboard/exams/" + this.id);
        console.log(res);
        if (res.status == 204) {
          toast.success("تم حذف الامتحان بنجاح", { autoClose: 1000 });
          setTimeout(() => {
            location.reload();
          }, 1000);
        } else {
          throw new Error(
            res.response?.data?.message || "حدث خطأ ما, عاود المحاولة لاحقا"
          );
        }
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
      this.loading = false;
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
