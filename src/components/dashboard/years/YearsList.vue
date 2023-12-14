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
          hint="مثال: الصف الاول الاعداي"
        ></v-text-field>
      </template>

      <v-data-table
        :headers="headers"
        :items="years"
        :search="search"
        :loading="loading"
        hover
        class="table"
      >
        <template v-slot:item.actions="{ item }">
          <div class="text-end">
            <v-btn
              color="teal-darken-1"
              class="ml-4"
              size="small"
              :to="{ name: 'semesters', params: { yid: item.id } }"
              ><v-icon>mdi-eye</v-icon>
              <v-tooltip activator="parent" location="top"
                >عرض المحتوى</v-tooltip
              >
            </v-btn>
            <v-btn
              color="red"
              class="ml-4"
              size="small"
              @click="deleteYear(item.id)"
              ><v-icon>mdi-delete</v-icon>
              <v-tooltip activator="parent" location="top">حذف</v-tooltip>
            </v-btn>
            <v-btn
              color="info ml-2"
              size="small"
              :to="{ name: 'editYear', params: { id: item.id } }"
              ><v-icon>mdi-pencil</v-icon>
              <v-tooltip activator="parent" location="top">تعديل </v-tooltip>
            </v-btn>
          </div>
        </template>
      </v-data-table>
      <v-dialog
        v-model="dialog"
        width="500"
        transition="dialog-top-transition"
        persistent
      >
        <v-card class="pa-4">
          <v-card-title> هل تريد فعلا حذف السنة الدراسية ؟ </v-card-title>
          <v-card-text>
            بمجرد تأكيد للأمر لن يمكنك التراجع عن ذلك سوف يتم حذف:
            <v-list>
              <v-list-item>انضاف السنة الدراسية لهذه السنة</v-list-item>
              <v-list-item> محتوى الشهور لهذه السنة</v-list-item>
            </v-list>
          </v-card-text>
          <v-card-actions class="mt-5 text-center">
            <v-btn @click="dialog = false" color="green">
              <v-icon>mdi-close</v-icon> الغاء الامر
            </v-btn>
            <v-btn @click="confirmDeleteYear()" color="red" class="mr-5">
              <v-icon>mdi-check</v-icon> تأكيد الامر
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-card>
  </div>
</template>

<script>
import axios from "axios";
import { toast } from "vue3-toastify";
export default {
  props: ["years", "loading"],
  data: () => ({
    search: "",
    dialog: false,
    id: "",
    headers: [
      {
        key: "id",
        title: "ID",
      },
      { key: "name", title: "الصف الدراسي" },
      { key: "actions", title: "" },
    ],
  }),

  methods: {
    async deleteYear(id) {
      this.dialog = true;
      this.id = id;
    },
    async confirmDeleteYear() {
      try {
        const res = await axios.delete("api_dashboard/years/" + this.id);
        if (res.status == 200) {
          toast.success("تم حذف السنة بنجاح", { autoClose: 1000 });
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
