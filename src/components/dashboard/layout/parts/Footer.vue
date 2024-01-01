<template>
  <v-footer class="d-flex flex-column" style="margin-top: 40px" :app="true">
    <div
      class="d-flex w-100 align-center px-4"
      style="background: var(--caribian-green); color: var(--seashell)"
    >
      <strong>تواصل معنا عبر مواقع التواصل الاجتماعي!</strong>

      <v-spacer></v-spacer>

      <v-btn
        v-for="icon in icons"
        :key="icon"
        class="mx-4"
        :icon="icon"
        variant="plain"
        size="small"
      ></v-btn>
    </div>

    <div class="px-4 py-2 bg-white text-center w-100">
      <v-container>
        <v-row>
          <v-col cols="12" md="6" v-motion-slide-right>
            <v-card elevation="0">
              <v-img  width="300" class="my-10" src="@/assets/images/logo.png"> </v-img>
              <v-card-text class="text-start">
                المؤسس للرياضيات مع مستر محمد سليمان نظام متابعه متكامل لشرح
                وتبسيط ماده الرياضيات للمرحله الثانوية لا تيأس فالطريق طويل
                والوصول اليه حلم جميل
              </v-card-text>
              <v-card-actions>
                <v-btn icon color="green-lighten-1"
                  ><v-icon> mdi-facebook </v-icon></v-btn
                >
                <v-btn icon color="green-lighten-1"
                  ><v-icon> mdi-whatsapp </v-icon></v-btn
                >
                <v-btn icon color="green-lighten-1"
                  ><v-icon> mdi-instagram </v-icon></v-btn
                >
              </v-card-actions>
            </v-card>
          </v-col>
          <v-col cols="12" md="6" class="text-start" v-motion-slide-left>
            <p class="mr-2 text-weight-bold text-h5">روابط هامة</p>
            <v-list>
              <v-list-item title="المحاضرات" link prepend-icon="mdi-monitor">
              </v-list-item>
              <v-list-item title="تسجيل دخول" link prepend-icon="mdi-login">
              </v-list-item>
              <v-list-item title="انشاء حساب" link prepend-icon="mdi-account">
              </v-list-item>
            </v-list>
            <v-divider class="mb-4" color="green" thickness="4"></v-divider>
            <p class="mr-2 text-weight-bold text-h5">تواصل معنا</p>
            <v-list-item prepend-icon="mdi-phone"> 01092607114 </v-list-item>
            <v-list-item prepend-icon="mdi-email"> xxx@emaple.com </v-list-item>
          </v-col>
        </v-row>
        <v-sheet w-100 class="mt-4">
          تم تطوير الموقع بواسطة
          <a href="https://imohamedsayed.vercel.app/"> د. محمد سيد عثمان</a> و
          <a href="https://github.com/m7hmoud-Kh">م. محمود خيري</a>
        </v-sheet>
      </v-container>
    </div>
  </v-footer>
</template>

<script>
export default {
  data: () => ({
    icons: ["mdi-facebook", "mdi-twitter", "mdi-linkedin", "mdi-instagram"],
  }),
};
</script>

<style lang="scss" scoped>
a {
  text-decoration: none;
  color: darkblue;
  transition: all 0.3s ease-out;
  font-weight: bold;
  &:hover {
    font-size: 1.3rem;
  }
}
</style>
