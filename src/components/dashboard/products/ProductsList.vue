<template>
  <div class="list">
    <v-card flat :loading="loading">
      <template v-slot:text>
        <v-text-field
          v-model="search"
          label="البحث"
          prepend-inner-icon="mdi-magnify"
          single-line
          variant="outlined"
          hint="مثال: ملزمة الهندسة"
        ></v-text-field>
      </template>
      <div class="text-end mb-3">
        <v-btn color="blue-grey-lighten-1" :to="{ name: 'addProduct' }">
          <v-icon class="ml-2">mdi-file-plus</v-icon>
          اضافة منتج جديد</v-btn
        >
      </div>
      <v-data-table
        :headers="headers"
        :items="products"
        :search="search"
        hover
        class="table"
      >
        <template v-slot:item.image="{ item }">
          <v-card class="my-2" elevation="2" rounded>
            <v-img
              :src="`http://localhost:8000/${item.image}`"
              height="64"
              cover
            ></v-img>
          </v-card>
        </template>
        <template v-slot:item.actions="{ item }">
          <div class="text-end">
            <v-btn
              color="red"
              class="ml-4 mb-2"
              size="small"
              @click="deleteProduct(item.id)"
              ><v-icon>mdi-delete</v-icon>
              <v-tooltip activator="parent" location="top">حذف</v-tooltip>
            </v-btn>
            <v-btn
              color="info ml-2 mb-2"
              class="ml-4"
              size="small"
              :to="{
                name: 'editProduct',
                params: { id: item.id },
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
        <v-card-title> هل تريد فعلا حذف المنتج؟ </v-card-title>
        <v-card-text> بمجرد تأكيد للأمر لن يمكنك التراجع عن ذلك </v-card-text>
        <v-card-actions class="mt-5 text-center">
          <v-btn @click="dialog = false" color="green">
            <v-icon>mdi-close</v-icon> الغاء الامر
          </v-btn>
          <v-btn
            @click="confirmDeleteProduct"
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
  props: ["products"],
  data: () => ({
    search: "",
    id: "",
    loading: false,
    dialog: false,
    headers: [
      {
        key: "id",
        title: "ID",
      },
      { key: "image", title: "صورة" },
      { key: "name", title: "الاسم " },
      { key: "descrption", title: "الوصف" },
      { key: "price", title: "السعر" },
      { key: "yearName", title: "السنة الدراسية" },
      { key: "status", title: "الحالة" },
      { key: "actions", title: "" },
    ],
  }),
  methods: {
    async deleteProduct(id) {
      this.dialog = true;
      this.id = id;
    },
    async confirmDeleteProduct() {
      this.loading = true;
      try {
        const res = await axios.delete("api_dashboard/products/" + this.id);
        console.log(res);
        if (res.status == 204) {
          toast.success("تم حذف المنتج بنجاح", { autoClose: 1000 });
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
