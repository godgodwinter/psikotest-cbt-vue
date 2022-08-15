<script setup>
import { ref } from "vue";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";
import API from "@/services/authServices";
import apiUjian from "@/services/api/apiUjian";
import Toast from "../components/lib/Toast";
const router = useRouter();

const doPeriksa = async () => {
  const res = await apiUjian.doPeriksaUjianSaya();
  if (res.success) {
    Toast.babeng("Info", "Ujian Aktif ditemukan !");
  } else {
    Toast.babeng("Info", "Ujian aktif tidak ditemukan!");
    apiUjian.doGetUjianList();
  }
};
doPeriksa();

const $q = useQuasar();
const menuList = [
  {
    icon: "home",
    label: "DASHBOARD",
    separator: true,
    link: "admin-dashboard",
  },
  {
    icon: "account_circle",
    label: "PROFILE",
    separator: false,
    link: "admin-about",
  },
  // {
  //   icon: "history",
  //   label: "Riwayat Ujian",
  //   separator: false,
  //   link: "admin-about",
  // },
  {
    icon: "cloud",
    label: "LIST UJIAN",
    separator: true,
    link: "admin-ujian",
  },
  {
    icon: "settings",
    label: "PENGATURAN",
    separator: false,
    link: "admin-about",
  },
];

// get status
// console.log($q.dark.isActive); // true, false

// get configured status
// console.log($q.dark.mode); // "auto", true, false

// set status
$q.dark.set(false); // or false or "auto"

// const onToggleThema = () => {
//   $q.dark.toggle();
//   // console.log($q.dark.mode);
// };

const leftDrawerOpen = ref(false);
const rightDrawerOpen = ref(false);

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value;
};

const toggleRightDrawer = () => {
  rightDrawerOpen.value = !rightDrawerOpen.value;
};

const timeWithSeconds = ref("00:90:00");

const doSoal = (id) => {
  console.log(id);
  router.push({
    name: "admin-ujian-detail-proses",
    params: { id: 1, kategori_id: 5, soal_id: id },
  });
};

const doLogout = async () => {
  const res = await API.doLogout();
  if (res === true) {
    router.push({ name: "login" });
  }
};
</script>

<template>
  <div>
    <q-layout view="hHh lpR fFf">
      <q-header elevated class="bg-secondary text-white" height-hint="98">
        <q-toolbar>
          <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

          <q-toolbar-title>
            <q-avatar>
              <!-- <img
                src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg"
              /> -->
              <img src="@/assets/img/logo/vue.svg" />
            </q-avatar>
            YPMT
          </q-toolbar-title>

          <q-btn dense flat round icon="menu" @click="toggleRightDrawer" />
        </q-toolbar>

        <q-tabs align="left">
          <q-route-tab :to="{ name: 'admin-dashboard' }" label="Home" />
          <q-route-tab :to="{ name: 'admin-ujian' }" label="Ujian" />
          <q-route-tab>Sisa waktu : 90:00</q-route-tab>
          <!-- <q-route-tab :to="{ name: 'admin-login' }" label="Login" /> -->
          <!-- <q-route-tab :to="{ name: 'home' }" label="Logout" /> -->
          <!-- <q-btn
            dense
            flat
            round
            icon="settings_brightness"
            @click="onToggleThema()"
          /> -->
        </q-tabs>
      </q-header>

      <q-drawer show-if-above v-model="leftDrawerOpen" side="left" bordered>
        <!-- drawer content -->
        <q-scroll-area class="fit">
          <q-list>
            <template v-for="(menuItem, index) in menuList" :key="index">
              <q-item
                clickable
                :to="{ name: menuItem.link }"
                :active="menuItem.label === 'Outbox'"
                v-ripple
              >
                <q-item-section avatar>
                  <q-icon :name="menuItem.icon" />
                </q-item-section>
                <q-item-section>
                  {{ menuItem.label }}
                </q-item-section>
              </q-item>
              <q-separator :key="'sep' + index" v-if="menuItem.separator" />
            </template>
            <q-item
              clickable
              :active="'active' === 'Outbox'"
              v-ripple
              @click="doLogout()"
            >
              <q-item-section avatar>
                <q-icon name="logout" />
              </q-item-section>
              <q-item-section> LOGOUT </q-item-section>
            </q-item>
          </q-list>
        </q-scroll-area>
      </q-drawer>

      <q-drawer show-if-above v-model="rightDrawerOpen" side="right" bordered>
        <q-scroll-area class="fit">
          <q-list>
            <q-item clickable v-ripple class="q-pb-xs">
              <q-item-section avatar>
                <q-icon name="work_history" />
                <q-tooltip> Siswa Waktu </q-tooltip>
              </q-item-section>
              <h4>{{ timeWithSeconds }}</h4>
            </q-item>
            <q-item>
              <div class="q-pa-md" style="max-width: 500px">
                <p class="q-mt-md">Soal :</p>
                <div class="q-gutter-sm">
                  <q-btn
                    color="teal"
                    v-for="n in 50"
                    :key="`sm-${n}`"
                    :label="n"
                    @click="doSoal(n)"
                  />
                </div>
              </div>
            </q-item>
            <q-item v-ripple clickable>
              <q-item-section top avatar>
                <q-avatar color="primary" text-color="white" icon="bluetooth" />
              </q-item-section>
              <q-item-section>
                <q-item-label>FINISH</q-item-label>
                <q-item-label caption lines="2">Akhiri Sesi ujian</q-item-label>
              </q-item-section>
              <q-item-section side top>
                <q-icon name="star" color="yellow" />
              </q-item-section>
            </q-item>
          </q-list>
        </q-scroll-area>
      </q-drawer>

      <q-page-container>
        <router-view />
      </q-page-container>

      <!-- <q-footer elevated class="bg-grey-8 text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" />
          </q-avatar>
          <div>Title</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer> -->
    </q-layout>
  </div>
</template>
