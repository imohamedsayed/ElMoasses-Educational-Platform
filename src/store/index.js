import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";
import * as cookies from "js-cookie";
import axios from "axios";
const state = {
  student: null,
  admin: null,
  token: null,
  semesters: [],
};
const getters = {};

const mutations = {
  setStudent(state, student) {
    state.student = student;
  },
  setAdmin(state, admin) {
    state.admin = admin;
  },
  setToken(state, token) {
    state.token = token;
  },
  logout(state) {
    state.student = null;
    state.admin = null;
    state.token = null;
  },
  setSemesters(state, semesters) {
    state.semesters.push(...semesters);
  },
  clearSemester(state) {
    state.semesters = [];
  },
};
const actions = {
  async studentRegister(
    context,
    {
      firstName,
      lastName,
      nationalId,
      phone,
      password,
      passwordConfirmation,
      fatherPhone,
      motherPhone,
      year,
    }
  ) {
    try {
      const data = {
        f_name: firstName,
        l_name: lastName,
        phone_number: phone,
        password,
        password_confirmation: passwordConfirmation,
        acedemic_year: year,
        father_phone: fatherPhone,
        mother_phone: motherPhone,
        national_id_card: nationalId,
      };
      const res = await axios.post("api/register", data);

      if (res.status !== 201) {
        let errors = res.response.data;
        if (Object.keys(errors).length > 0) {
          let firstKey = Object.keys(errors)[0];
          if (Array.isArray(errors[firstKey]) && errors[firstKey].length > 0) {
            let firstErrorMessage = errors[firstKey][0];
            throw new Error(firstErrorMessage);
          }
        }
      } else {
        const token = res.data.student.original.access_token;
        const expiresIn = res.data.student.original.expires_in;
        const student = res.data.student.original.Student;
        axios.defaults.headers.common["Authorization"] = "Bearer " + token;
        context.commit("setToken", token);
        context.commit("setStudent", student);
      }
    } catch (error) {
      throw error.message;
    }
  },
  async studentLogin(context, { phone, password }) {
    try {
      const res = await axios.post("api/login", {
        phone_number: phone,
        password,
      });
      if (res.status == 200) {
        if (res.data.message?.includes("limit")) {
          throw new Error(res.data.message);
        }

        const token = res.data.access_token;
        const student = res.data.Student;

        axios.defaults.headers.common["Authorization"] = "Bearer " + token;
        context.commit("setToken", token);
        context.commit("setStudent", student);
        context.commit("setAdmin", null);
      } else {
        throw new Error(res.response.data.error);
      }
    } catch (error) {
      if (error.response) throw new Error(error.response.data.error);
      else throw new Error(error.message);
    }
  },
  async studentUpdate(context, data) {
    try {
      const res = await axios.post("api/students", data);

      if (res.status == 200) {
        const studentRefresh = await axios.get("api/students-refresh");

        const { Student, access_token, expires_in } = studentRefresh.data;

        axios.defaults.headers.common["Authorization"] =
          "Bearer " + access_token;
        context.commit("setToken", access_token);
        context.commit("setStudent", Student);
      } else {
        throw new Error(res.response.data.message);
      }
    } catch (error) {
      throw new Error(error.message);
    }
  },
  async adminLogin(context, data) {
    try {
      const res = await axios.post("/api_dashboard/login", data);
      if (res.status == 200) {
        const { user, access_token } = res.data;

        axios.defaults.headers.common["Authorization"] =
          "Bearer " + access_token;
        context.commit("setToken", access_token);
        context.commit("setAdmin", user);
        context.commit("setStudent", null);
      } else {
        throw new Error(res.response.data.error);
      }
    } catch (error) {
      throw new Error(error.message);
    }
  },
  async refreshToken({ commit, state }) {
    try {
      if (state.user) {
      } else {
        const studentRefresh = await axios.get("api/students-refresh");
        const { access_token } = studentRefresh.data;
        axios.defaults.headers.common["Authorization"] =
          "Bearer " + access_token;
        context.commit("setToken", access_token);
      }
    } catch (error) {
      console.log("Error while refreshing token: ", error);
    }
  },
  async logout(context) {
    try {
      if (context.state.student) {
        await axios.post("api/logout");
      } else {
        await axios.post("api_dashboard/logout");
      }
      context.commit("logout");
    } catch (error) {
      console.error("Error while logging out: ", error);
    }
  },
  removeStudent(context) {
    context.commit("logout");
  },
  clearSemesters(context) {
    context.commit("clearSemester");
  },
  setSemesters(context, { semesters }) {
    context.commit("setSemesters", semesters);
  },
};

export default createStore({
  state,
  getters,
  mutations,
  actions,
  modules: {},

  plugins: [
    createPersistedState({
      getState: (key) => cookies.getJSON(key),
      setState: (key, state) =>
        cookies.set(key, state, { expires: 3, secure: true }),
    }),
  ],
});
