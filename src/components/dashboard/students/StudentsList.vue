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

      <v-data-table
        :headers="headers"
        :items="students"
        :search="search"
        :loading="loading"
        hover
        class="table"
      >
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
export default {
  props: ["students", "loading"],
  data: () => ({
    search: "",
    headers: [
      {
        key: "id",
        title: "ID",
      },
      { key: "national_id_card", title: "الرقم القومي" },
      { key: "full_name", title: "الاسم" },
      { key: "acedemic_year", title: "السنة الدراسية" },
      { key: "phone_name", title: "رقم الهاتف " },
      { key: "father_phone", title: "رقم الاب" },
      { key: "mother_phone", title: "رقم الام" },
    ],
  }),
};
</script>

<style>
.table thead {
  background: var(--caribian-green);
  color: white;
}
</style>
