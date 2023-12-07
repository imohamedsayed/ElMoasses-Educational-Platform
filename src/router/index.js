import { createRouter, createWebHistory } from "vue-router";
import LandingPage from "../views/LandingPage.vue";
import Signup from "../views/auth/Signup.vue";
import Login from "../views/auth/Login.vue";
import Home from "../views/website/Home.vue";
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
    path: "/lectures",
    name: "lectures",
    component: Home,
    meta: {
      title: "المحاضرات",
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
