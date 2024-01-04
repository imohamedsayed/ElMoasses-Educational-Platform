<template>
  <AppLayout>
    <v-container v-if="state.student">
      <div class="user">
        <v-card class="py-15">
          <div class="img">
            <v-img
              :src="require('../../assets/images/user.jpg')"
              max-width="400"
              class="mx-auto"
              style="border-radius: 50%"
            ></v-img>
            <v-file-input
              type="file"
              height=""
              style="visibility: hidden"
              id="pic"
            ></v-file-input>
            <label class="change-pic" id="chPic" v-bind="props" for="pic">
              <v-icon>mdi-camera</v-icon>
              <v-tooltip activator="parent" location="top">
                تغيير الصورة
              </v-tooltip>
            </label>
          </div>

          <v-card-title
            class="text-center"
            style="font-size: 2rem; margin-top: -3%"
          >
            {{ state.student.firstName + " " + state.student.lastName }}
          </v-card-title>
          <v-card-subtitle class="text-center">{{
            state.student.phone_name
          }}</v-card-subtitle>

          <v-divider class="my-15"></v-divider>

          <v-row class="user-content pa-3">
            <v-col col="12" md="2">
              <v-tabs v-model="state.tab" direction="vertical" color="teal">
                <v-tab
                  value="courses"
                  class="mb-4"
                  style="
                    border: 1px solid var(--caribian-green);
                    border-radius: 10px;
                  "
                >
                  <v-icon start> mdi-book-multiple-outline </v-icon>
                  اشتراكاتي
                </v-tab>

                <v-tab
                  value="option-2"
                  class="mb-4"
                  style="
                    border: 1px solid var(--caribian-green);
                    border-radius: 10px;
                  "
                >
                  <v-icon start> mdi-pdf-box </v-icon>
                  مذكراتي
                </v-tab>
                <v-tab
                  value="option-3"
                  class="mb-4"
                  style="
                    border: 1px solid var(--caribian-green);
                    border-radius: 10px;
                  "
                >
                  <v-icon start> mdi-file-multiple-outline </v-icon>
                  امتحاناتي
                </v-tab>
              </v-tabs>
            </v-col>
            <v-col cols="12" md="10">
              <v-window v-model="state.tab">
                <v-window-item value="courses">
                  <div v-if="state.tab == 'courses'"><MonthsList /></div>
                </v-window-item>
                <v-window-item value="option-2">
                  <div v-if="state.tab == 'option-2'">
                    <NotesList />
                  </div>
                </v-window-item>
                <v-window-item value="option-3">
                  <div v-if="state.tab == 'option-3'">
                    <ExamsList />
                  </div>
                </v-window-item>
              </v-window>
            </v-col>
          </v-row>
        </v-card>
      </div>
    </v-container>
  </AppLayout>
</template>

<script>
import AppLayout from "@/components/website/AppLayout.vue";
import MonthsList from "@/components/website/profile/months/MonthsList.vue";
import NotesList from "@/components/website/profile/notes/NotesList.vue";
import ExamsList from "@/components/website/profile/exams/ExamsList.vue";
import { reactive, computed, onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default {
  components: { AppLayout, MonthsList, NotesList, ExamsList },
  setup() {
    const store = useStore();
    const router = useRouter();

    const state = reactive({
      student: computed(() => store.state.student),
      tab: "courses",
    });

    onMounted(() => {
      if (!state.student) router.push({ name: "login" });
    });
    return { state };
  },
};
</script>

<style lang="scss" scoped>
.img {
  position: relative;
  .change-pic {
    position: absolute;
    bottom: 15%;
    left: 45%;
    transform: translateX(-45%);
    padding: 10px;
    background: white;
    border-radius: 50%;
    border: 1px solid #777;
    cursor: pointer;
    @media (max-width: 772px) {
      left: 30%;
    }
  }
}
.user-content {
  margin-top: 100px;
}
</style>
