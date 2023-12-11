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
        :items="years"
        :search="search"
        hover
        class="table"
      >
        <template v-slot:item.image="{ item }">
          <v-card class="my-2" elevation="2" rounded>
            <v-img
              :src="`https://cdn.vuetifyjs.com/docs/images/graphics/gpus/${item.image}`"
              height="64"
              cover
            ></v-img>
          </v-card>
        </template>
        <template v-slot:item.actions="{ item }">
          <div class="text-end">
            <v-btn color="red" class="ml-4 mb-2" size="small"
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
  </div>
</template>

<script>
export default {
  data: () => ({
    years: [],
    search: "",
    headers: [
      {
        key: "id",
        title: "ID",
      },
      { key: "image", title: "صورة" },
      { key: "name", title: "شهر " },
      { key: "description", title: "السعر" },
      { key: "year", title: "السعر" },
      { key: "price", title: "السعر" },
      { key: "status", title: "الحالة" },
      { key: "actions", title: "" },
    ],
  }),
  async mounted() {
    this.years = [
      {
        id: 1,
        name: "هندسة ",
        description: "تمارين وشرع الهندسة الفراغيى ",
        year: "اولي ثانوي ",
        price: 100,
        image: "3.png",
        status: false,
      },
    ];
  },
};
</script>

<style>
.table thead {
  background: var(--caribian-green);
  color: white;
}
</style>
