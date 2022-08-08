import { createRouter, createWebHistory } from "vue-router";
import LandingRoutes from "./LandingRoutes";
import AdminRoutes from "./AdminRoutes";
const routes = [];

routes.push(...LandingRoutes, ...AdminRoutes);

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
