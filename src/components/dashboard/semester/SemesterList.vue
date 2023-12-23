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
          hint="مثال: الترم الاول"
        ></v-text-field>
      </template>
      <div class="text-end mb-3">
        <v-btn
          color="blue-grey-lighten-1"
          :to="{ name: 'addSemester', params: { yid: yid } }"
        >
          <v-icon class="ml-2">mdi-plus-circle</v-icon>
          اضافة ترم دراسي</v-btn
        >
      </div>
      <v-data-table
        :headers="headers"
        :items="semesters"
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
              :to="{ name: 'months', params: { yid: yid, sid: item.id } }"
              ><v-icon>mdi-eye</v-icon>
              <v-tooltip activator="parent" location="top"
                >عرض المحتوى</v-tooltip
              >
            </v-btn>
            <v-btn color="red" class="ml-4" size="small" @click="deleteSemester(item.id)"
              ><v-icon>mdi-delete</v-icon>
              <v-tooltip activator="parent" location="top">حذف</v-tooltip>
            </v-btn>
            <v-btn
              color="info ml-2"
              size="small"
              :to="{ name: 'editSemester', params: { yid: yid, id: item.id } }"
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
      <v-card class="pa-4">
        <v-card-title> هل تريد فعلا حذف الترم الدراسي ؟ </v-card-title>
        <v-card-text>
          بمجرد تأكيد للأمر لن يمكنك التراجع عن ذلك سوف يتم حذف:
          <v-list>
            <v-list-item> محتوى الشهور لهذا الترم الدراسي</v-list-item>
          </v-list>
        </v-card-text>
        <v-card-actions class="mt-5 text-center">
          <v-btn @click="dialog = false" color="green">
            <v-icon>mdi-close</v-icon> الغاء الامر
          </v-btn>
          <v-btn @click="confirmDeleteSemester" color="red" class="mr-5">
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
  props: ["semesters"],
  data: () => ({
    search: "",
    dialog: false,
    id: "",
    headers: [
      {
        key: "id",
        title: "ID",
      },
      { key: "name", title: "الترم الدراسي" },
      { key: "status", title: "الحالة" },
      { key: "actions", title: "" },
    ],
  }),

  methods: {
    async deleteSemester(id) {
      this.dialog = true;
      this.id = id;
    },
    async confirmDeleteSemester() {
      try {
        const res = await axios.delete("api_dashboard/semesters/" + this.id);
        if (res.status == 200) {
          toast.success("تم حذف الترم الدراسي بنجاح", { autoClose: 1000 });
          setTimeout(() => {
            location.reload();
          }, 1000);
        } else {
          throw new Error(res.response.data.message);
        }
      } catch (error) {
        console.log(error);
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
