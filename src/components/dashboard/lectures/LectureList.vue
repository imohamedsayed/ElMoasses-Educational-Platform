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
          hint="مثال: قانون نيوتن"
        ></v-text-field>
      </template>
      <div class="text-end mb-3">
        <v-btn
          color="blue-grey-lighten-1"
          :to="{ name: 'addLecture', params: { yid: yid, sid: sid, mid: mid } }"
        >
          <v-icon class="ml-2">mdi-video-plus</v-icon>
          اضافة درس جديد</v-btn
        >
      </div>
      <v-data-table
        :headers="headers"
        :items="lectures"
        :search="search"
        hover
        class="table"
      >
        <template v-slot:item.actions="{ item }">
          <div class="text-end">
            <v-btn
              color="red"
              class="ml-4"
              size="small"
              @click="deleteLecture(item.id)"
              ><v-icon>mdi-delete</v-icon>
              <v-tooltip activator="parent" location="top">حذف</v-tooltip>
            </v-btn>
            <v-btn
              color="info ml-2"
              size="small"
              :to="{
                name: 'editLecture',
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
        <v-card-title> هل تريد فعلا حذف المحاضرة؟ </v-card-title>
        <v-card-text> بمجرد تأكيد للأمر لن يمكنك التراجع عن ذلك </v-card-text>
        <v-card-actions class="mt-5 text-center">
          <v-btn @click="dialog = false" color="green">
            <v-icon>mdi-close</v-icon> الغاء الامر
          </v-btn>
          <v-btn
            @click="confirmDeleteLecture"
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
  props: ["yid", "sid", "mid", "lectures"],
  data: () => ({
    search: "",
    dialog: false,
    id: "",
    loading: false,
    headers: [
      {
        key: "id",
        title: "ID",
      },
      { key: "name", title: "الدرس" },
      { key: "url", title: "الرابط" },
      { key: "status", title: "مفعل ؟" },
      { key: "actions" },
    ],
  }),
  methods: {
    async deleteLecture(id) {
      this.dialog = true;
      this.id = id;
    },
    async confirmDeleteLecture() {
      this.loading = true;
      try {
        const res = await axios.delete("api_dashboard/contents/" + this.id);
        if (res.status == 200) {
          toast.success("تم حذف المحاضرة بنجاح", { autoClose: 1000 });
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
