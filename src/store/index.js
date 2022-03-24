import Vue from "vue";
import Vuex from "vuex";
import router from "@/router";

Vue.use(Vuex);

const storage = window.sessionStorage;

const persistedState = (storage) => {
  const state = storage.getItem("state");

  if (JSON.parse(state)) {
    console.log("state found in storage");
    return JSON.parse(state);
  } else {
    console.log("state is empty");
    return null;
  }
};

let initialState = {
  userIsLoggedIn: false,
};

let store = new Vuex.Store({
  state: persistedState(storage) || initialState,
  getters: {
    getGlobalState(state) {
      return state;
    },
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
    updatePersistedState(state, storage) {
      storage.setItem("state", JSON.stringify(store.state));
    },
  },
  actions: {},
  modules: {},
});

export default store;
