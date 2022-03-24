import Vue from "vue";
import Vuex from "vuex";

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
    },
    logout(state) {
      state.userIsLoggedIn = false;
    },
  },
  actions: {},
  modules: {},
});
