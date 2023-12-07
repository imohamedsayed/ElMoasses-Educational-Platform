<template>
  <v-alert
    class="lec-box mb-5"
    icon="mdi-video"
    title="الوحدة الاولي"
    text="اضغط للاستماع الي المحاضرة"
  >
  </v-alert>
</template>

<script>
export default {};
</script>

<style lang="scss">
.lec-box {
  background: var(--ship-cove);
  color: white;
  transition: all 0.3s ease;
  cursor: pointer;
  &:hover {
    box-shadow: 2px 4px 16px rgba(0, 0, 0, 0.25);
    margin-right: 20px;
  }
}
</style>
