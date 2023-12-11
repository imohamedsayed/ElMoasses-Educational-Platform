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
import Lectures from "../views/admin/months/month/lecture/Lectures.vue";
import AddLecture from "../views/admin/months/month/lecture/AddLecture.vue";
import EditLecture from "../views/admin/months/month/lecture/EditLecture.vue";
import DashNotes from "../views/admin/months/month/notes/Notes.vue";
import AddNote from "../views/admin/months/month/notes/AddNote.vue";
import EditNote from "../views/admin/months/month/notes/EditNote.vue";

import Products from "../views/admin/products/Products.vue";
import EditProduct from "../views/admin/products/EditProduct.vue";
import AddProduct from "../views/admin/products/AddProduct.vue";

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
    props: true,

    component: EditYear,
    meta: {
      title: "تعديل السنة الدراسية",
    },
  },
  {
    path: "/dashboard/years/:yid/semesters",
    name: "semesters",
    props: true,
    component: Semesters,
    meta: {
      title: "انصاف السنة الدراسية",
    },
  },
  {
    path: "/dashboard/years/:yid/semesters/:id",
    name: "editSemester",
    props: true,

    component: EditSemester,
    meta: {
      title: "تعديل نصف السنة الدراسي",
    },
  },
  {
    path: "/dashboard/years/:yid/semesters/add",
    name: "addSemester",
    component: AddSemester,
    props: true,

    meta: {
      title: "اضافة نصف السنة الدراسي",
    },
  },
  {
    path: "/dashboard/years/:yid/semesters/:sid/months",
    name: "months",
    component: Months,
    props: true,

    meta: {
      title: "الشهور الدراسية",
    },
  },
  {
    path: "/dashboard/years/:yid/semesters/:sid/months/add",
    name: "addMonth",
    component: AddMonth,
    props: true,

    meta: {
      title: "اضافة شهر دراسي",
    },
  },
  {
    path: "/dashboard/years/:yid/semesters/:sid/months/:id/edit",
    name: "editMonth",
    props: true,

    component: EditMonth,
    meta: {
      title: "تعديل شهر دراسي",
    },
  },
  {
    path: "/dashboard/years/:yid/semesters/:sid/months/:id",
    name: "dashMonth",
    props: true,

    component: DashMonth,
    meta: {
      title: "محتوى الشهر الدراسي",
    },
  },
  {
    path: "/dashboard/years/:yid/semesters/:sid/months/:mid/lectures",
    name: "lectures",
    component: Lectures,
    props: true,

    meta: {
      title: "المحاضرات",
    },
  },
  {
    path: "/dashboard/years/:yid/semesters/:sid/months/:mid/lectures/add",
    name: "addLecture",
    component: AddLecture,
    props: true,

    meta: {
      title: "اضافة محاضرة",
    },
  },
  {
    path: "/dashboard/years/:yid/semesters/:sid/months/:mid/lectures/:id/edit",
    name: "editLecture",
    props: true,

    component: EditLecture,
    meta: {
      title: "تعديل المحاضرة",
    },
  },
  {
    path: "/dashboard/years/:yid/semesters/:sid/months/:mid/notes",
    name: "monthNotes",
    component: DashNotes,
    props: true,
    meta: {
      title: "المذكرات",
    },
  },
  {
    path: "/dashboard/years/:yid/semesters/:sid/months/:mid/notes/add",
    name: "addMonthNote",
    component: AddNote,
    props: true,
    meta: {
      title: "اضافة مذكرة",
    },
  },
  {
    path: "/dashboard/years/:yid/semesters/:sid/months/:mid/notes/:id/edit",
    name: "editMonthNote",
    component: EditNote,
    props: true,
    meta: {
      title: "تعديل مذكرة",
    },
  },
  {
    path: "/dashboard/store",
    name: "dashStore",
    component: Products,
    meta: {
      title: "المتجر",
    },
  },
  {
    path: "/dashboard/store/add",
    name: "addProduct",
    component: AddProduct,
    meta: {
      title: "اضافة مذكرة للبيع",
    },
  },
  {
    path: "/dashboard/store/:id/edit",
    name: "editProduct",
    component: EditProduct,
    props: true,
    meta: {
      title: "تعديل المنتج",
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
