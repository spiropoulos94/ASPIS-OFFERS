import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "@/views/HomeView.vue";
import Login from "@/views/LoginView.vue";

Vue.use(VueRouter);

let user = false;

const routes = [
  {
    path: "/login",
    name: "login",
    component: Login,
    beforeEnter(to, from, next) {
      // if (store.state.userIsLoggedIn) {
      if (user) {
        next("/");
      } else {
        next();
      }
    },
  },
  {
    path: "/",
    name: "home",
    component: HomeView,
    beforeEnter(to, from, next) {
      if (user) {
        next();
      } else {
        next("/login");
      }
    },
  },
  {
    path: "*",
    beforeEnter(to, from, next) {
      next("/");
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
