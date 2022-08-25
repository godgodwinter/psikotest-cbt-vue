const prefix = "/pages/admin";
const prefixName = "admin-";

const AdminRoutes = [
  {
    path: `${prefix}/homeLayout`,
    name: "AdminLayout",
    component: () => import("@/layouts/AdminLayout.vue"),
    redirect: `${prefix}/home`,
    meta: {
      requireAuth: true,
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
        component: () => import("@/views/admin/dashboard/DashboardIndex.vue"),
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
        component: () => import("@/views/admin/ujian/UjianLayout.vue"),
        meta: {
          title: "Ujian",
          icon: "mdi-home",
          breadcrumb: {
            name: "List Ujian",
            path: `${prefix}/ujian`,
            goto: "admin-ujian",
          },
        },
        redirect: `${prefix}/ujianindex`,
        children: [
          {
            path: `${prefix}/ujianindex/`,
            name: "admin-ujian-index",
            component: () => import("@/views/admin/ujian/UjianIndex.vue"),
            meta: {
              title: "Ujian",
              icon: "mdi-home",
              breadcrumb: {
                name: "Index",
                path: `${prefix}/ujian`,
                goto: "admin-ujian-index",
              },
            },
          },
          {
            path: `${prefix}/ujian/:id/detail`,
            name: "admin-ujian-detail",
            component: () => import("@/views/admin/ujian/UjianDetail.vue"),
            meta: {
              title: "Ujian",
              icon: "mdi-home",
              breadcrumb: {
                name: " Kategori Soal",
                path: `${prefix}/ujian`,
                goto: "admin-ujian-detail-index",
              },
            },
            redirect: `${prefix}/ujian/:id/detailindex`,
            children: [
              {
                path: `${prefix}/ujian/:id/detailindex`,
                name: "admin-ujian-detail-index",
                component: () =>
                  import("@/views/admin/ujian/detail/UjianDetailIndex.vue"),
                meta: {
                  title: "Index",
                  icon: "mdi-home",
                  breadcrumb: {
                    name: "Index",
                    path: `${prefix}/ujian`,
                    goto: "admin-ujian-detail-index",
                  },
                },
              },
              {
                path: `${prefix}/ujian/:id/detail/:kategori_id/mulai`,
                name: "admin-ujian-detail-mulai",
                component: () =>
                  import("@/views/admin/ujian/detail/UjianDetailMulai.vue"),
                meta: {
                  title: "Ujian",
                  icon: "mdi-home",
                  breadcrumb: {
                    name: "Mulai",
                    goto: "admin-ujian-detail-mulai",
                    params: {
                      id: "id",
                    },
                  },
                },
              },
              {
                path: `${prefix}/ujian/:id/detail/:kategori_id/proses/:kategori_proses/soal/:no_soal?`,
                name: "admin-ujian-detail-proses",
                component: () =>
                  import("@/views/admin/ujian/detail/UjianDetailProses.vue"),
                meta: {
                  title: "Ujian",
                  icon: "mdi-home",
                  breadcrumb: {
                    name: "Proses Ujian",
                    path: `${prefix}/ujian/:id?/proses/:soal_id?`,
                    goto: "admin-ujian-detail-proses",
                    params: {
                      id: "id",
                      soal_id: "soal_id",
                    },
                  },
                },
              },
            ],
          },
        ],
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
