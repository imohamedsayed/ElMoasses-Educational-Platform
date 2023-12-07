<template>
  <div class="list pa-4">
    <v-row>
      <v-col cols="12" md="6" lg="3" v-for="i in 4" :key="i"
        ><NoteCard />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import NoteCard from "./NoteCard.vue";
export default {
  components: { NoteCard },
};
</script>

<style></style>
