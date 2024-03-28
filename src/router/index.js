import { createRouter, createWebHistory } from "vue-router";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [
    {
      path: "/",
      name: "login",
      component: () => import("../components/Login.vue"),
      meta: { hideForAuth: true, requiresAuth: false },
    },
    {
      path: "/sign-up",
      name: "signup",
      component: () => import("../components/SignUp.vue"),
      meta: { requiresAuth: false },
    },
    {
      path: "/to-do-list",
      name: "ToDoList",
      component: () => import("../components/ToDoList.vue"),
      meta: { requiresAuth: false },
    },
  ],
});

// Auth Hnadling using navigation gaurd

router.beforeEach(function (to, _, next) {
  if (to.meta.requiresAuth && !localStorage.getItem("auth_token")) {
    window.location.href = "/";
  } else {
    next();

    if (to.meta.hideForAuth && localStorage.getItem("auth_token")) {
      window.location.href = "/to-do-list";
    }
  }
});

export default router;
