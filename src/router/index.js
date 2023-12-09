import { createRouter, createWebHistory } from "vue-router";
import LandingPage from "../views/LandingPage.vue";
import Signup from "../views/auth/Signup.vue";
import Login from "../views/auth/Login.vue";
import Home from "../views/website/Home.vue";
import Month from "../views/website/Month.vue";
import Lecture from "../views/website/Lecture.vue";
import Profile from "../views/website/Profile.vue";
import Settings from "../views/website/Settings.vue";
import Store from "../views/website/Store.vue";

// Dashboard Routes

import AdminLogin from "../views/auth/AdminLogin.vue";
import DashHome from "../views/admin/Home.vue";
import AddYear from "../views/admin/years/AddYear.vue";
import Years from "../views/admin/years/Years.vue";
import EditYear from "../views/admin/years/EditYear.vue";
import Semesters from "../views/admin/semester/Semesters.vue";
import AddSemester from "../views/admin/semester/AddSemester.vue";
import EditSemester from "../views/admin/semester/EditSemester.vue";
import AddMonth from "../views/admin/months/AddMonth.vue";
import Months from "../views/admin/months/Months.vue";
import EditMonth from "../views/admin/months/EditMonth.vue";
import DashMonth from "../views/admin/months/month/Month.vue";

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
  {
    path: "/settings",
    name: "settings",
    component: Settings,
    meta: {
      title: "اعدادات الحساب",
    },
  },
  {
    path: "/store",
    name: "store",
    component: Store,
    meta: {
      title: "المتجر",
    },
  },

  /*
    -->> Dashboard Routes
  */
  {
    path: "/dashboard/login",
    name: "adminLogin",
    component: AdminLogin,
    meta: {
      title: "تسجيل الدخول لوحدة التحكم",
    },
  },
  {
    path: "/dashboard/",
    name: "dashHome",
    component: DashHome,
    meta: {
      title: "وحدة التحكم",
    },
  },
  {
    path: "/dashboard/years",
    name: "years",
    component: Years,
    meta: {
      title: "السنوات الدراسية",
    },
  },
  {
    path: "/dashboard/years/add-year",
    name: "addYear",
    component: AddYear,
    meta: {
      title: "اضافة سنة دراسية",
    },
  },
  {
    path: "/dashboard/years/:id/edit",
    name: "editYear",
    component: EditYear,
    meta: {
      title: "تعديل السنة الدراسية",
    },
  },
  {
    path: "/dashboard/years/:yid/semesters",
    name: "semesters",
    component: Semesters,
    meta: {
      title: "انصاف السنة الدراسية",
    },
  },
  {
    path: "/dashboard/years/:yid/semesters/:id",
    name: "editSemester",
    component: EditSemester,
    meta: {
      title: "تعديل نصف السنة الدراسي",
    },
  },
  {
    path: "/dashboard/years/:yid/semesters/add",
    name: "addSemester",
    component: AddSemester,
    meta: {
      title: "اضافة نصف السنة الدراسي",
    },
  },
  {
    path: "/dashboard/years/:yid/semesters/:sid/months",
    name: "months",
    component: Months,
    meta: {
      title: "الشهور الدراسية",
    },
  },
  {
    path: "/dashboard/years/:yid/semesters/:sid/months/add",
    name: "addMonth",
    component: AddMonth,
    meta: {
      title: "اضافة شهر دراسي",
    },
  },
  {
    path: "/dashboard/years/:yid/semesters/:sid/months/:id/edit",
    name: "editMonth",
    component: EditMonth,
    meta: {
      title: "تعديل شهر دراسي",
    },
  },
  {
    path: "/dashboard/years/:yid/semesters/:sid/months/:id",
    name: "dashMonth",
    component: DashMonth,
    meta: {
      title: "محتوى الشهر الدراسي",
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
