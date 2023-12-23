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
        <v-btn
          color="blue-grey-lighten-1"
          :to="{
            name: 'addQuestion',
            params: { yid: yid, sid: sid, mid: mid, eid: eid },
          }"
        >
          <v-icon class="ml-2">mdi-plus-circle</v-icon>
          اضافة سؤال جديد</v-btn
        >
      </div>
      <v-data-table
        :headers="headers"
        :items="questions"
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
        <template v-slot:item.options="{ item }">
          <div>
            <v-btn
              v-if="item.type != 'T/F'"
              color="blue-grey-darken-1"
              class="ml-4 mb-2"
              size="small"
              :to="{
                name: 'addMCQ',
                params: { yid: yid, sid: sid, eid: eid, qid: item.id },
              }"
              ><v-icon>mdi-forum</v-icon>
              <v-tooltip activator="parent" location="top"
                >اضافة الاجابات</v-tooltip
              >
            </v-btn>
            <v-btn
              v-else
              color="blue-grey-darken-1"
              class="ml-4 mb-2"
              size="small"
              :to="{
                name: 'addTF',
                params: { yid: yid, sid: sid, eid: eid, qid: item.id },
              }"
              ><v-icon>mdi-forum</v-icon>
              <v-tooltip activator="parent" location="top"
                >اضافة الاجابات</v-tooltip
              >
            </v-btn>
            <v-btn
              color="red"
              class="ml-4 mb-2"
              size="small"
              @click="deleteOptions(item.id)"
              ><v-icon>mdi-delete-empty</v-icon>
              <v-tooltip activator="parent" location="top"
                >حذف الاجابات</v-tooltip
              >
            </v-btn>
          </div>
        </template>
        <template v-slot:item.actions="{ item }">
          <div class="text-end">
            <v-btn
              color="red"
              class="ml-4 mb-2"
              size="small"
              @click="deleteQuestion(item.id)"
              ><v-icon>mdi-delete</v-icon>
              <v-tooltip activator="parent" location="top">حذف</v-tooltip>
            </v-btn>
            <v-btn
              color="info ml-2 mb-2"
              class="ml-4"
              size="small"
              :to="{
                name: 'editQuestion',
                params: { yid: yid, sid: sid, eid: eid, id: item.id },
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
      <v-card class="pa-4">
        <v-card-title> هل تريد فعلا حذف الشهر ؟ </v-card-title>
        <v-card-text>
          بمجرد تأكيد للأمر لن يمكنك التراجع عن ذلك سوف يتم حذف:
          <v-list>
            <v-list-item> محتوى الشهور </v-list-item>
            <v-list-item
              >المذكرات والدروس وايضا الامتحانات ونتائج الامتحانات سيتم
              حذفها</v-list-item
            >
          </v-list>
        </v-card-text>
        <v-card-actions class="mt-5 text-center">
          <v-btn @click="dialog = false" color="green">
            <v-icon>mdi-close</v-icon> الغاء الامر
          </v-btn>
          <v-btn @click="confirmDeleteQuestion" color="red" class="mr-5">
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
  props: ["yid", "sid", "mid", "eid", "questions"],
  data: () => ({
    search: "",
    dialog: false,
    id: "",
    headers: [
      {
        key: "id",
        title: "ID",
      },
      { key: "question", title: "السؤال " },
      { key: "type", title: "النوع" },
      { key: "point", title: "الدرجة" },
      { key: "image", title: "صورة" },
      { key: "explanation", title: "التوضيح" },
      { key: "options", title: "الاجابات" },
      { key: "actions", title: "" },
    ],
  }),
  methods: {
    async deleteQuestion(id) {
      this.dialog = true;
      this.id = id;
    },
    async confirmDeleteQuestion() {
      try {
        const res = await axios.delete("api_dashboard/questions/" + this.id);
        if (res.status == 204) {
          toast.success("تم حذف السؤال  بنجاح", { autoClose: 1000 });
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
    async deleteOptions(id) {
      try {
        const res = await axios.delete("api_dashboard/options/" + id);
        if (res.status == 204) {
          toast.success("تم حذف الاجابات بنجاح");
        } else {
          toast.error(res.response.data.message);
        }
      } catch (error) {
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
