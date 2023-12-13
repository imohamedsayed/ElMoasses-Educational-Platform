import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";
import * as cookies from "js-cookie";
import axios from "axios";
const state = {
  student: null,
  admin: null,
  token: null,
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
        fatherPhone,
        motherPhone,
        national_id_card: nationalId,
      };
      const res = await axios.post("register", data);

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
        const student = res.data.student.original.user;
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
      const res = await axios.post("login", { phone_number: phone, password });
      if (res.status == 200) {
        const token = res.data.access_token;
        const expiresIn = res.data.expires_in;
        const student = res.data.user;

        axios.defaults.headers.common["Authorization"] = "Bearer " + token;
        context.commit("setToken", token);
        context.commit("setStudent", student);
      } else {
        throw new Error(res.response.data.message);
      }
    } catch (error) {
      if (error.response) throw new Error(error.response.data.error);
      else throw new Error(error.message);
    }
  },
  async studentUpdate(context, data) {
    try {
      const res = await axios.post("students/" + data.id, data);

      if (res.status === 200) {
        console.log(res);
      } else {
        throw new Error(res.response.data.message);
      }
    } catch (error) {
      throw new Error(error.message);
    }
  },
  async logout(context) {
    try {
      let res = await axios.post("logout");
      context.commit("logout");
    } catch (error) {}
  },
  removeStudent(context) {
    context.commit("logout");
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
