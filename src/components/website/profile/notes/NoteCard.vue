<template>
  <v-card elevation="2">
    <v-img :src="'http://localhost:8000/' + note.image" height="200"></v-img>
    <v-card-title>{{ note.descrption }}</v-card-title>

    <span class="text-grey mr-4 my-8 d-block"
      ><v-chip color="red">{{ note.price }} جنيه</v-chip></span
    >
    <v-divider> </v-divider>
    <v-card-actions>
      <a :href="apiUrl + note.name" download target="_blank">
        <v-btn color="deep-orange-darken-1" variant="flat"
          ><v-icon>mdi-download</v-icon> تحميل</v-btn
        >
      </a>
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
};
</script>

<style></style>
