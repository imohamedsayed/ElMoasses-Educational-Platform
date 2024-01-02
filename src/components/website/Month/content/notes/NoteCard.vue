<template>
  <v-card elevation="2">
    <v-img src="../../../../../assets/images/pdf.png" height="200"></v-img>
    <v-card-title>{{ note.descrption }}</v-card-title>
    <v-card-subtitle>{{ note.month_name }} </v-card-subtitle>

    <span class="text-grey mr-4 mt-8 d-block">{{ note.created_at }}</span>
    <v-divider> </v-divider>
    <v-card-actions>
      <a :href="'http://localhost:8000/' + note.name" download target="_blank">
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
  mounted() {
    console.log(this.note);
  },
};
</script>

<style></style>
