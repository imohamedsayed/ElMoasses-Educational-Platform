<template>
  <v-alert
    elevation="2"
    class="exam-box mb-5"
    icon="mdi-file-multiple-outline"
    :title="exam.name + ' - ' + exam.MonthName"
    :text="exam.description"
    @click="
      $router.push({ name: 'exam', params: { id: exam.id, mid: exam.MonthId } })
    "
  >
    <v-divider color="white" thickness="4" class="mt-3"></v-divider>
    <p class="mt-4">موعد البدء : {{ exam.start_at }}</p>
    <p class="mt-4">موعد الانتهاء : {{ exam.end_at }}</p>
  </v-alert>
</template>

<script>
export default {
  props: ["exam"],
};
</script>

<style lang="scss">
.exam-box {
  background: #e0f2f1;
  color: black;
  transition: all 0.3s ease;
  cursor: pointer;
  &:hover {
    box-shadow: 2px 4px 16px rgba(0, 0, 0, 0.25);
    margin-right: 20px;
  }
}
</style>
