<template>
  <AppLayout>
    <v-container>
      <v-card class="py-10">
        
      
      </v-card>
    </v-container>
  </AppLayout>
</template>

<script setup>
import { ref } from "vue";
import AppLayout from "@/components/website/AppLayout.vue";

const props = defineProps({
  id: Number,
});

const step = ref(1);

//end script
</script>

<style></style>
