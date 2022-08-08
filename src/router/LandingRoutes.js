const LandingRoutes = [
  {
    path: "/landing",
    name: "LandingLayout",
    component: () => import("@/layouts/LandingLayout.vue"),
    redirect: "/home",
    children: [
      {
        path: "/",
        name: "home",
        component: () => import("@/views/landing/HomeView.vue"),
      },
      {
        path: "/home",
        name: "homeIndex",
        component: () => import("@/views/landing/HomeView.vue"),
      },
      {
        path: "/about",
        name: "about",
        component: () => import("@/views/landing/AboutView.vue"),
      },
      {
        path: "/login",
        name: "login",
        component: () => import("@/views/landing/LoginView.vue"),
      },
      {
        path: "/404",
        name: "NotFound",
        component: () => import("@/views/landing/LoginView.vue"),
      },
    ],
  },
  {
    path: "/:catchAll(.*)",
    redirect: "/404",
  },
];
export default LandingRoutes;
