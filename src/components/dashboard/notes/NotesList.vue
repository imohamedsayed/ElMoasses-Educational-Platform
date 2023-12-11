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
          hint="مثال: ملخص"
        ></v-text-field>
      </template>
      <div class="text-end mb-3">
        <v-btn
          color="blue-grey-lighten-1"
          :to="{ name: 'addMonthNote', params: { yid: yid, sid: sid, mid: mid } }"
        >
          <v-icon class="ml-2">mdi-video-plus</v-icon>
          اضافة ملحق جديد</v-btn
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
            <v-btn color="red" class="ml-4" size="small"
              ><v-icon>mdi-delete</v-icon>
              <v-tooltip activator="parent" location="top">حذف</v-tooltip>
            </v-btn>
            <v-btn
              color="info ml-2"
              size="small"
              :to="{
                name: 'editMonthNote',
                params: { yid: yid, sid: sid, mid: mid, id: item.id },
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
  props: ["yid", "sid", "mid"],
  data: () => ({
    years: [],
    search: "",
    headers: [
      {
        key: "id",
        title: "ID",
      },
      { key: "name", title: "اسم المذكرة" },
      { key: "description", title: "الوصف" },
      { key: "actions" },
    ],
  }),
  async mounted() {
    this.years = [
      {
        id: 1,
        name: "قانون نيوتن الثاني",
        description: "مجرد وصف",
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
