import Vue from "vue";
import Vuex from "vuex";
import router from "@/router";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userIsLoggedIn: false,
  },
  getters: {
    isUserLoggedIn(state) {
      return state.userIsLoggedIn;
    },
  },
  mutations: {
    login(state) {
      state.userIsLoggedIn = true;
      router.push("/");
    },
    logout(state) {
      state.userIsLoggedIn = false;
      router.push("/login");
    },
  },
  actions: {},
  modules: {},
});
