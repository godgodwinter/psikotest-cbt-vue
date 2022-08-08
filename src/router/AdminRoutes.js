const prefix = "/pages/admin";
const prefixName = "admin-";

const AdminRoutes = [
  {
    path: `${prefix}/homeLayout`,
    name: "AdminLayout",
    component: () => import("@/layouts/AdminLayout.vue"),
    redirect: `${prefix}/home`,
    meta: {
      requiresAuth: true,
      title: "Admin",
      icon: "mdi-home",
      breadcrumb: {
        name: "Home",
        path: "/pages/admin/home",
        goto: "AdminLayout",
      },
    },
    children: [
      {
        path: `${prefix}/home`,
        name: `${prefixName}dashboard`,
        meta: {
          title: "Beranda",
          icon: "mdi-home",
          breadcrumb: {
            name: "Beranda",
            path: `${prefix}/home`,
            goto: `${prefixName}dashboard`,
          },
        },
        component: () => import("@/views/landing/HomeView.vue"),
      },
      {
        path: `${prefix}/about`,
        name: "admin-about",
        component: () => import("@/views/landing/AboutView.vue"),
        meta: {
          title: "About",
          breadcrumb: {
            name: "About",
            path: `${prefix}/about`,
            goto: "admin-about",
            icon: "account_circle",
          },
        },
      },
      {
        path: `${prefix}/ujian`,
        name: "admin-ujian",
        component: () => import("@/views/admin/ujian/UjianIndex.vue"),
        meta: {
          title: "Ujian",
          icon: "mdi-home",
          breadcrumb: {
            name: "Ujian",
            path: `${prefix}/ujian`,
            goto: "admin-ujian",
          },
        },
      },
      {
        path: `${prefix}/ujian/:id?/mulai`,
        name: "admin-ujian-mulai",
        component: () =>
          import("@/views/admin/ujian/examples/UjianKonfirmasiMulai.vue"),
        meta: {
          title: "Ujian",
          icon: "mdi-home",
          breadcrumb: {
            name: "admin-ujian-mulai",
            path: `${prefix}/ujian/:id?/mulai`,
            goto: "admin-ujian-mulai",
            params: {
              id: "id",
            },
          },
        },
      },
      {
        path: `${prefix}/ujian/:id?/proses/:soal_id?`,
        name: "Proses Ujian",
        component: () => import("@/views/admin/ujian/examples/UjianProses.vue"),
        meta: {
          title: "Ujian",
          icon: "mdi-home",
          breadcrumb: {
            name: "admin-ujian-proses",
            path: `${prefix}/ujian/:id?/proses/:soal_id?`,
            goto: "admin-ujian-proses",
            params: {
              id: "id",
              soal_id: "soal_id",
            },
          },
        },
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
