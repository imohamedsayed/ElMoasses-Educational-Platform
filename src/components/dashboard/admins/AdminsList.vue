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
        <v-btn color="blue-grey-lighten-1" :to="{ name: 'addAdmin' }">
          <v-icon class="ml-2">mdi-plus-circle</v-icon>
          اضافة ادمن جديد</v-btn
        >
      </div>
      <v-data-table
        :headers="headers"
        :items="admins"
        :search="search"
        :loading="loading"
        hover
        class="table"
      >
        <template v-slot:item.actions="{ item }">
          <div class="text-end">
            <v-btn
              color="red"
              class="ml-4"
              size="small"
              @click="deleteItem(item.id)"
              ><v-icon>mdi-delete</v-icon>
              <v-tooltip activator="parent" location="top">حذف</v-tooltip>
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
        <v-card class="pa-4" :loading="loading2">
          <v-card-title> هل تريد فعلا حذف الادمن ؟ </v-card-title>
          <v-card-text> بمجرد تأكيد للأمر لن يمكنك التراجع عن ذلك </v-card-text>
          <v-card-actions class="mt-5 text-center">
            <v-btn @click="dialog = false" color="green">
              <v-icon>mdi-close</v-icon> الغاء الامر
            </v-btn>
            <v-btn
              @click="confirmDeleteItem()"
              color="red"
              class="mr-5"
              :loading="loading2"
            >
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
  props: ["admins", "loading"],
  data: () => ({
    search: "",
    dialog: false,
    loading2: false,
    id: "",
    headers: [
      {
        key: "id",
        title: "ID",
      },
      { key: "name", title: "الاسم" },
      { key: "email", title: "الايميل" },
      { key: "role_name", title: "الوظيفة" },
      { key: "actions", title: "" },
    ],
  }),
  methods: {
    async deleteItem(id) {
      this.dialog = true;
      this.id = id;
    },
    async confirmDeleteItem() {
      this.loading2 = true;
      try {
        const res = await axios.delete("api_dashboard/admins/" + this.id);
        if (res.status == 204) {
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
      this.loading2 = false;
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
