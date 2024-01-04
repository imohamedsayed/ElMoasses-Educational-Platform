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
import ResetPassword from "../views/auth/ResetPassword.vue";
import Subscribe from "../views/website/Subscribe.vue";
import Buy from "../views/website/Buy.vue";
import Exam from "../views/website/Exam.vue";
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

import Exams from "../views/admin/months/month/exams/Exams.vue";
import AddExam from "../views/admin/months/month/exams/AddExam.vue";
import EditExam from "../views/admin/months/month/exams/EditExam.vue";

import Questions from "../views/admin/months/month/exams/question/Questions.vue";
import AddQuestion from "../views/admin/months/month/exams/question/AddQuestion.vue";
import EditQuestion from "../views/admin/months/month/exams/question/EditQuestion.vue";

import MultipleChoices from "../views/admin/months/month/exams/question/options/MultipleChoices.vue";
import TF from "../views/admin/months/month/exams/question/options/TF.vue";

import Products from "../views/admin/products/Products.vue";
import EditProduct from "../views/admin/products/EditProduct.vue";
import AddProduct from "../views/admin/products/AddProduct.vue";

import Subscriptions from "../views/admin/subscription/Subscriptions.vue";
import GrantSubscription from "../views/admin/subscription/GrantSubscription.vue";

import PaymentSuccess from "../views/website/PaymentSuccess.vue";

import Students from "../views/admin/students/Students.vue";

import NotFound from "../views/NotFound.vue";

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
    path: "/reset_password",
    name: "resetPassword",
    component: ResetPassword,
    meta: {
      title: "اعادة ضبط كلمة المرور",
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
    props: true,
    meta: {
      title: "محتوى الشهر",
    },
  },
  {
    path: "/month/:id/subscribe",
    name: "monthSubscription",
    component: Subscribe,
    props: true,
    meta: {
      title: "الاشتراك",
    },
  },
  {
    path: "/month/:mid/lecture/:id",
    name: "lecture",
    component: Lecture,
    props: true,
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
  {
    path: "/store/product/:id/buy",
    name: "buy",
    component: Buy,
    props: true,
    meta: {
      title: "شراء المنتج",
    },
  },
  {
    path: "/month/:mid/exam/:id",
    name: "exam",
    props: true,
    component: Exam,
    meta: {
      title: "الامتحان",
    },
  },
  {
    path: "/payment/success",
    name: "paymentSuccess",
    component: PaymentSuccess,
    meta: {
      title: "عملية شراء ناجحة",
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
    path: "/dashboard/students",
    name: "students",
    component: Students,
    meta: {
      title: "الطلاب",
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
    path: "/dashboard/years/:yid/semesters/:sid/months/:mid/exams",
    name: "monthExams",
    component: Exams,
    props: true,
    meta: {
      title: "الامتحانات",
    },
  },
  {
    path: "/dashboard/years/:yid/semesters/:sid/months/:mid/exams/add",
    name: "addMonthExam",
    component: AddExam,
    props: true,
    meta: {
      title: "اضافة امتحان",
    },
  },
  {
    path: "/dashboard/years/:yid/semesters/:sid/months/:mid/exams/:id/edit",
    name: "editMonthExam",
    component: EditExam,
    props: true,
    meta: {
      title: "تعديل امتحان",
    },
  },
  {
    path: "/dashboard/years/:yid/semesters/:sid/months/:mid/exams/:eid/questions",
    name: "questions",
    component: Questions,
    props: true,
    meta: {
      title: "الاسئلة",
    },
  },
  {
    path: "/dashboard/years/:yid/semesters/:sid/months/:mid/exams/:eid/questions/add",
    name: "addQuestion",
    component: AddQuestion,
    props: true,
    meta: {
      title: "اضافة سؤال",
    },
  },
  {
    path: "/dashboard/years/:yid/semesters/:sid/months/:mid/exams/:eid/questions/:qid/mcq",
    name: "addMCQ",
    component: MultipleChoices,
    props: true,
    meta: {
      title: "اضافة الاجابات",
    },
  },
  {
    path: "/dashboard/years/:yid/semesters/:sid/months/:mid/exams/:eid/questions/:qid/tf",
    name: "addTF",
    component: TF,
    props: true,
    meta: {
      title: "اضافة الاجابات",
    },
  },

  {
    path: "/dashboard/years/:yid/semesters/:sid/months/:mid/exams/:eid/questions/:id/edit",
    name: "editQuestion",
    component: EditQuestion,
    props: true,
    meta: {
      title: "تعديل السؤال",
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
  {
    path: "/dashboard/subscriptions",
    name: "dashSubscriptions",
    component: Subscriptions,
    meta: {
      title: "الاشتراكات",
    },
  },
  {
    path: "/dashboard/subscriptions/add",
    name: "grantSubscription",
    component: GrantSubscription,
    meta: {
      title: "منح اشتراك",
    },
  },
  {
    path: "/:catchAll(.*)",
    name: "NotFound",
    component: NotFound,
    meta: {
      title: "الصفحة غير موجودة",
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
