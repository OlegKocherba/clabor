import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: () => import("../components/StartPage.vue"),
    name: "start",
  },
  {
    path: "/game-setup",
    component: () => import("../components/GameSetup.vue"),
    name: "game-setup",
  },
  {
    path: "/round-setup",
    component: () => import("../components/RoundSetup.vue"),
    name: "round-setup",
  },
  {
    path: "/round-finish",
    component: () => import("../components/RoundFinish.vue"),
    name: "round-finish",
  },
  {
    path: "/scores",
    component: () => import("../components/ScoresTable.vue"),
    name: "/scores",
  },
  {
    path: "/end-game",
    component: () => import("../components/EndGame.vue"),
    name: "/end-game",
  },

  // {
  //   path: "/about",
  //   name: "About",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/About.vue")
  // }
];
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
