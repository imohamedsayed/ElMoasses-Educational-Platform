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
            <v-btn color="red" class="ml-4" size="small"
              ><v-icon>mdi-delete</v-icon>
              <v-tooltip activator="parent" location="top">حذف</v-tooltip>
            </v-btn>
            <v-btn color="info ml-2" size="small"
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
      { key: "year", title: "الصف الدراسي" },
      { key: "actions", title: "" },
    ],
  }),
  async mounted() {
    this.years = [
      {
        year: "الصف الاول الثانوي",
        id: 1,
      },
      {
        year: "الصف الثاني الثانوي",
        id: 2,
      },
      {
        year: "الصف الثالث الثانوي",
        id: 3,
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
