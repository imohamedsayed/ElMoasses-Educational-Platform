<template>
  <router-view />
</template>

<script>
export default {
  name: "App",
  data: () => ({
    //
  }),
};
</script>
<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Cairo:wght@200;400;500;600;700;800;900;1000&display=swap");

:root {
  --black-color: #010101;
  --green-yellow: #bcfd49;
  --electric-violet: #9300fe;
  --aquamarine: #62fcaf;
  --ship-cove: #7483bd;
  --seashell: #f2f1f1;
  --bright-gray: #35374f;
  --martinique: #332d4f;
  --apple-blossom: #b14e36;
  --sushi: #7bae37;
  --tonys-pink: #e3a393;
  --caribian-green:#01cda9;
  --mandy-red:#e54461;
}

body {
  font-family: "Cairo", "Roboto" !important;
}
* {
  direction: rtl !important;
}
</style>
