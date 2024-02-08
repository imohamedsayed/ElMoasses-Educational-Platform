<template>
  <v-card elevation="2">
    <v-img :src="apiUrl + note.image" height="200"></v-img>
    <v-card-title>{{ note.descrption }}</v-card-title>
    <v-card-subtitle>{{ note.year.name }} </v-card-subtitle>

    <span class="text-grey mr-4 my-8 d-block"
      ><v-chip color="red">{{ note.price }} جنيه</v-chip></span
    >
    <v-divider> </v-divider>
    <v-card-actions>
      <v-btn
        color="deep-orange-darken-1"
        variant="flat"
        :to="{ name: 'buy', params: { id: note.id } }"
        ><v-icon>mdi-cash-multiple</v-icon> شراء</v-btn
      >
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: ["note"],
  data() {
    return {
      apiUrl: process.env.VUE_APP_API_URL,
    };
  },
  mounted() {},
};
</script>

<style></style>
