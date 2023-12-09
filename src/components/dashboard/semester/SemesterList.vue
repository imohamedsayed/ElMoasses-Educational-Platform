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
        :items="years"
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
            <v-btn color="red" class="ml-4" size="small"
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
  </div>
</template>

<script>
export default {
  props: ["yid"],
  data: () => ({
    years: [],
    search: "",
    headers: [
      {
        key: "id",
        title: "ID",
      },
      { key: "semester", title: "الصف الدراسي" },
      { key: "actions", title: "" },
    ],
  }),
  async mounted() {
    this.years = [
      {
        semester: "الترم الاول ",
        id: 1,
      },
      {
        semester: "الترم الثاني ",
        id: 2,
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
