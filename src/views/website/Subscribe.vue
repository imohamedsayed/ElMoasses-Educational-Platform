<template>
  <AppLayout>
    <v-container>
      <v-sheet class="lectures-title" width="100%" height="20vh">
        <h1>المؤسس</h1>
        <v-breadcrumbs :items="items" class="mx-auto">
          <template v-slot:title="{ item }">
            {{ item.title.toUpperCase() }}
          </template>
        </v-breadcrumbs>
      </v-sheet>
      <v-card class="pa-10 mt-2" :loading="loading">
        <v-stepper
          :items="['ادخل بيانات كاملة', 'تأكيد الدفع']"
          elevation="0"
          color="teal"
          hide-actions
          :model-value="step"
        >
          <template v-slot:item.1>
            <form class="my-10" @submit.prevent="gatherUserInfo">
              <v-text-field
                label="رقم الهاتف (محفطة كاش)"
                prepend-inner-icon="mdi-phone"
                variant="outlined"
                class="my-5"
                v-model="state.phone"
                :error-messages="
                  v$.phone.$error ? v$.phone.$errors[0].$message : ''
                "
                color="success"
              >
              </v-text-field>

              <v-btn
                color="success"
                block
                size="large"
                :loading="loading"
                type="submit"
              >
                التالي</v-btn
              >
            </form>
          </template>

          <template v-slot:item.2>
            <iframe :src="paymentFrame" width="100%" height="900px"></iframe>
          </template>
        </v-stepper>
      </v-card>
    </v-container>
  </AppLayout>
</template>

<script setup>
import { ref, computed, onMounted, reactive } from "vue";
import AppLayout from "@/components/website/AppLayout.vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { toast } from "vue3-toastify";
import { useVuelidate } from "@vuelidate/core";
import { required, email, minLength } from "@vuelidate/validators";
import axios from "axios";

const props = defineProps({
  id: String,
});
const items = ref([
  {
    title: "الرئيسية",
    disabled: false,
    href: "/",
  },
  {
    title: "الاشتراك",
    disabled: true,
  },
]);

let step = ref(1);
let loading = ref(false);
const store = useStore();

const paymentFrame = ref("");

const state = reactive({
  student: computed(() => store.state.student),
  phone: "",
});

const rules = computed(() => {
  return {
    phone: { required, minLength: minLength(11) },
  };
});
const v$ = useVuelidate(rules, state);

onMounted(() => {
  if (!state.student) useRouter().push({ name: "login" });
});

const gatherUserInfo = async () => {
  v$.value.$validate();
  if (!v$.value.$error) {
    loading.value = true;
    try {
      let data = {
        Number: state.phone,
        month_id: props.id,
      };

      const res = await axios.post("api/pay", data);
      if (res.status == 200) {
        paymentFrame.value = res.data.redirect_url;
        console.log(paymentFrame.value);
        step.value = 2;
      } else {
        throw new Error(res.response.data.Message);
      }
    } catch (error) {
      toast.error(error.message);
    }

    loading.value = false;
  } else {
    toast.error("من فضلك ادخل بيانات صحيحة وكاملة");
  }
};

//end script
</script>

<style>
.lectures-title {
  background: var(--martinique);
  display: grid;
  place-content: center;
  color: var(--seashell);
  text-align: center;
}
</style>
