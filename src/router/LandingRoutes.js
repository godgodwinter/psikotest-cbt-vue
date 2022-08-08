const LandingRoutes = [
  {
    path: "/landing",
    name: "LandingLayout",
    component: () => import("@/layouts/LandingLayout.vue"),
    redirect: "/home",
    meta: {
      title: "Home",
      icon: "mdi-home",
      breadcrumb: {
        name: "Home",
        path: "/landing",
        goto: "LandingLayout",
      },
    },
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
        meta: {
          title: "About",
          breadcrumb: {
            name: "About",
            path: `/about`,
            goto: "about",
            icon: "account_circle",
          },
        },
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
