import { createRouter, createWebHistory } from "vue-router";
import LandingRoutes from "./LandingRoutes";
import AdminRoutes from "./AdminRoutes";
import Toast from "@/components/lib/Toast";
// import { useStoreAuth } from "@/stores/auth";
// const storeAuth = useStoreAuth();
const routes = [];

routes.push(...LandingRoutes, ...AdminRoutes);

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// router.beforeEach((to, from) => {
//   if (to.matched.some((record) => record.meta.requiresAuth)) {
//     if (!localStorage.getItem("token")) {
//       return router.push("/login");
//     }
//   }
// });

router.beforeEach((to, from, next) => {
  if (
    to.matched.some((record) => record.meta.requireAuth) &&
    !localStorage.getItem("isLogin")
  ) {
    Toast.babeng("Info", "Login terlebih dahulu!");
    // console.log("belum login");
    // next("/login");
    next({ name: "login" });
    // console.log(to);
    // next({ name: "login", query: { next: to.fullPath } });
  } else {
    next();
  }
});

export default router;
