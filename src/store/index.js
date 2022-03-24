import Vue from "vue";
import Vuex from "vuex";
import router from "@/router";

Vue.use(Vuex);

const storage = window.sessionStorage;

const persistedState = (storage) => {
  const state = storage.getItem("state");

  if (JSON.parse(state)) {
    return JSON.parse(state);
  } else {
    return null;
  }
};

const updatePersistedState = (storage) => {
  storage.setItem("state", JSON.stringify(store.state));
};

let initialState = {
  userIsLoggedIn: false,
};

let store = new Vuex.Store({
  state: persistedState(storage) || initialState,
  getters: {
    isUserLoggedIn(state) {
      return state.userIsLoggedIn;
    },
  },
  mutations: {
    login(state) {
      state.userIsLoggedIn = true;
      updatePersistedState(storage);
      router.push("/");
    },
    logout(state) {
      state.userIsLoggedIn = false;
      updatePersistedState(storage);
      router.push("/login");
    },
  },
  actions: {},
  modules: {},
});

export default store;
