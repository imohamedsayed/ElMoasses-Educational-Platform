<template>
  <div class="list pa-4 py-16" v-if="products.length">
    <v-row>
      <v-col cols="12" md="6" lg="3" v-for="note in products" :key="note.id"
        ><ProductCard :note="note" />
      </v-col>
    </v-row>
  </div>
  <div v-else-if="!loading" class="text-center pa-4">
    <v-img
      :src="require('@/assets/images/noProducts.svg')"
      width="600"
      class="mx-auto mb-5"
    ></v-img>
    <h2 class="mt-5">سوف يتم وضع المذكرات قريبا</h2>
  </div>
  <div class="v-else text-center pa-4" v-else>
    <v-row>
      <v-col cols="12" md="4" lg="4" xl="3" v-for="i in 16" :key="i">
        <v-skeleton-loader
          class="mx-auto border"
          type="image, article"
        ></v-skeleton-loader>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import { toast } from "vue3-toastify";
import ProductCard from "./ProductCard.vue";
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const loading = ref(true);
const products = ref([]);
const router = useRouter();
onMounted(async () => {
  try {
    const res = await axios.get("api/get-all-products");

    if (res.status == 200) {
      console.log(res);

      products.value = res.data.data;
    } else if (res.response.status == 401) {
      router.push({
        name: "monthSubscription",
        params: { id: props.month },
      });
    } else {
      throw new Error(res.response.data.message);
    }
  } catch (error) {
    toast.error(error.message);
  }
  loading.value = false;
});
</script>

<style></style>
