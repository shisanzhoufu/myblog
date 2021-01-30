import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: () =>
    import( "../views/index/index.vue")
  },
  {
    path: "/sign-in",
    name: "login",
    component: () =>
    import( "../views/login/sign-in.vue")
  },
  {
    path: "/sign-up",
    name: "register",
    component: () =>
    import( "../views/login/sign-up.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
