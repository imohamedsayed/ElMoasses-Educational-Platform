import { createRouter, createWebHistory } from "vue-router";
import LandingPage from "../views/LandingPage.vue";
import Signup from "../views/auth/Signup.vue";
import Login from "../views/auth/Login.vue";
import Home from "../views/website/Home.vue";
import Month from "../views/website/month/Month.vue";
import Lecture from "../views/website/Lecture.vue";
import Profile from "../views/website/Profile.vue";
const routes = [
  {
    path: "/",
    name: "landing",
    component: LandingPage,
    meta: {
      title: "الرئيسية",
    },
  },
  {
    path: "/signup",
    name: "signup",
    component: Signup,
    meta: {
      title: "انشاء حساب",
    },
  },
  {
    path: "/login",
    name: "login",
    component: Login,
    meta: {
      title: "تسجيل دخول",
    },
  },
  {
    path: "/home",
    name: "home",
    component: Home,
    meta: {
      title: "السنوات الدراسية",
    },
  },
  {
    path: "/month/:id",
    name: "month",
    component: Month,
    meta: {
      title: "محتوى الشهر",
    },
  },
  {
    path: "/month/:m/lecture/:id",
    name: "lecture",
    component: Lecture,
    meta: {
      title: "المحاضرة",
    },
  },
  {
    path: "/profile",
    name: "profile",
    component: Profile,
    meta: {
      title: "حسابي",
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | المؤسس للرياضيات`;
  next();
});
export default router;
