<template>
  <DashLayout>
    <v-container>
      <v-sheet class="month-header text-center text-md-start">
        <v-row class="align-center pa-4">
          <v-col cols="12" md="2">
            <v-img
              v-if="state.image"
              :src="'http://localhost:8000/' + state.image"
              width="200"
              class="mx-auto"
              height="200"
            ></v-img>
          </v-col>
          <v-col cols="12" md="6">
            <h2 class="mb-10">{{ state.name }}</h2>
            <h3 class="text-green">{{ state.price }} جنيه مصري</h3>
            <h5 class="mt-6">
              <v-icon>mdi-check</v-icon>
              مفعل
            </h5>
          </v-col>
        </v-row>
      </v-sheet>

      <v-card class="pa-4 mt-15">
        <v-row>
          <v-col
            cols="12"
            md="4"
            @click="
              $router.push({
                name: 'lectures',
                params: { yid: yid, sid: sid, mid: id },
              })
            "
          >
            <v-card
              class="mx-auto"
              height="200"
              :image="require('../../../../assets/images/lec.svg')"
              theme="light"
              style="cursor: pointer"
            >
              <v-card-title style="font-weight: bold">المحاضرات</v-card-title>
            </v-card>
          </v-col>

          <v-col cols="12" md="4">
            <v-card
              class="mx-auto"
              height="200"
              :image="require('../../../../assets/images/notes.svg')"
              theme="light"
              style="cursor: pointer"
              @click="
                $router.push({
                  name: 'monthNotes',
                  params: { yid: yid, sid: sid, mid: id },
                })
              "
            >
              <v-card-title style="font-weight: bold">المذكرات</v-card-title>
            </v-card>
          </v-col>

          <v-col cols="12" md="4">
            <v-card
              class="mx-auto"
              height="200"
              :image="require('../../../../assets/images/exam.svg')"
              theme="light"
              style="cursor: pointer"
            >
              <v-card-title style="font-weight: bold">الامتحانات</v-card-title>
            </v-card>
          </v-col>
        </v-row>
      </v-card>
    </v-container>
  </DashLayout>
</template>

<script>
import DashLayout from "@/components/dashboard/layout/DashLayout.vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { reactive, computed, onMounted } from "vue";
import axios from "axios";
import { toast } from "vue3-toastify";

export default {
  props: ["yid", "sid", "id"],
  components: { DashLayout },
  setup(props) {
    const store = useStore();
    const router = useRouter();
    const state = reactive({
      admin: computed(() => store.state.admin),
      name: "",
      price: "",
      image: "",
    });

    onMounted(async () => {
      if (!state.admin) router.push({ name: "adminLogin" });

      try {
        const res = await axios.get("api_dashboard/months/" + props.id);
        if (res.status == 200) {
          state.name = res.data.data.name;
          state.price = res.data.data.price;
          state.image = res.data.data.image;
        } else {
          throw new Error(res.response.data.message);
        }
      } catch (error) {
        toast.error(error.message);
      }
    });

    return { state };
  },
};
</script>

<style lang="scss" scoped>
.month-header {
  background: var(--martinique);
  color: var(--seashell);
}
</style>
