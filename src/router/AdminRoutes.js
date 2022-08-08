const prefix = "/pages/admin";
const prefixName = "admin-";

const AdminRoutes = [
  {
    path: `${prefix}/homeLayout`,
    name: "AdminLayout",
    component: () => import("@/layouts/AdminLayout.vue"),
    redirect: `${prefix}/home`,
    children: [
      {
        path: `${prefix}/home`,
        name: `${prefixName}dashboard`,
        component: () => import("@/views/landing/HomeView.vue"),
      },
      {
        path: `${prefix}/about`,
        name: "admin-about",
        component: () => import("@/views/landing/AboutView.vue"),
      },
      {
        path: `${prefix}/ujian`,
        name: "admin-ujian",
        component: () => import("@/views/admin/ujian/UjianIndex.vue"),
      },
      {
        path: `${prefix}/ujian/:id?/mulai`,
        name: "admin-ujian-mulai",
        component: () =>
          import("@/views/admin/ujian/examples/UjianKonfirmasiMulai.vue"),
      },
      {
        path: `${prefix}/ujian/:id?/proses/:soal_id?`,
        name: "admin-ujian-proses",
        component: () => import("@/views/admin/ujian/examples/UjianProses.vue"),
      },
      {
        path: `${prefix}/login`,
        name: "admin-login",
        component: () => import("@/views/landing/LoginView.vue"),
      },
    ],
  },
];
export default AdminRoutes;
