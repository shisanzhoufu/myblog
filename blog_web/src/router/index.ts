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
  },
  {
    path: "/cardList",
    name: "cardList",
    component: () =>
        import( "../views/article/index.vue")
  },
  {
    path: "/addArticle",
    name: "addArticle",
    component: () =>
    import( "../views/addArticle/index.vue")
  },
  {
    path: "/comment",
    name: "comment",
    component: () =>
    import( "../views/comment/index.vue")
  },
  {
    path: "/interest",
    name: "interest",
    component: () =>
      import( "../views/article/interest.vue")
  },
  {
    path: "/technology",
    name: "technology",
    component: () =>
    import( "../views/article/technology.vue")
  },
  {
    path: "/life",
    name: "life",
    component: () =>
    import( "../views/article/life.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
