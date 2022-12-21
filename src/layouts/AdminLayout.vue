<script setup>
const BASE_URL = import.meta.env.VITE_API_URLFE
  ? import.meta.env.VITE_API_URLFE
  : "http://localhost:3333/";
import { ref, computed } from "vue";
import { useQuasar } from "quasar";
import { useRouter, useRoute } from "vue-router";
import API from "@/services/authServices";
import apiUjian from "@/services/api/apiUjian";
import apiUjianProses from "@/services/api/apiUjianProses";
import Toast from "../components/lib/Toast";
import { useStoreUjian } from "@/stores/ujian";
import moment from "moment/min/moment-with-locales";
import localization from "moment/locale/id";
moment.updateLocale("id", localization);
const storeUjian = useStoreUjian();
const router = useRouter();
const route = useRoute();
const soalList = computed(() => storeUjian.getSoalList);
const timer = computed(() => storeUjian.getTimer);
const timerSecond = computed(() => storeUjian.getUjianAktif.sisa_waktu);
const ujian_proses_kelas_id = ref(null);
const ujianAktif = computed(() => storeUjian.getUjianAktif);
storeUjian.$subscribe((mutation, state) => {
  // console.log('====================================');
  // console.log(storeUjian.getUjianAktif.ujian_proses_kelas_id);
  // console.log('====================================');
  if (ujian_proses_kelas_id.value == null) {
    ujian_proses_kelas_id.value = storeUjian.getUjianAktif.ujian_proses_kelas_id;
    console.log(ujian_proses_kelas_id.value);
  }
});
// const id = route.params.id ? router.params.id : null;
// const kategori_id = route.params.kategori_id ? router.params.kategori_id : null;
// const kategori_proses = route.params.kategori_proses ? router.params.kategori_proses : null;
// if (ujianAktif.value) {
//   console.log(soalList.value, ujianAktif.value.ujian_proses_kelas_id);
// }
function redir() {
  window.location = `${BASE_URL}pages/admin/ujian/${ujian_proses_kelas_id.value}/detailindex`;
  // window.location = `${BASE_URL}pages/admin/ujianindex`;
}
const timeWithSeconds = ref("-");
storeUjian.$subscribe((mutation, state) => {
  if (storeUjian.getUjianAktif) {
    if (Number.isInteger(storeUjian.getUjianAktif.sisa_waktu)) {
      if (timeWithSeconds.value == '-') {
        // console.log(loadTimer.value);
        if (loadTimer.value < 1) {
          loadTimer.value = 1;
          // console.log(loadTimer.value);

          let second = storeUjian.getUjianAktif.sisa_waktu;
          myInterval.value = setInterval(() => {
            // console.log(storeUjian.getUjianAktif.sisa_waktu)
            // console.log(fnTimer(second));
            timeWithSeconds.value = fnTimer(second);
            storeUjian.setTimer(fnTimer(second));
            if (second === 0) {
              Toast.babeng('Info', "Waktu Habis!")
              clearInterval(myInterval.value)
              redir();
            } else {
              second--
            }
          }, 1000);

        }
      }
    } else {
      // Toast.danger("Info", "Paket Soal tidak ditemukan!")
      localStorage.removeItem("soal");

      localStorage.removeItem("soalAktif");
    }
  }
});

const myInterval = ref(null);
// const fnTimerInterval = (second) => {
//   // setInterval(function () {
//   //   timeWithSeconds.value = fnTimer(second);
//   // }, 1000)
//   myInterval.value = setInterval(() => {
//     // console.log(storeUjian.getUjianAktif.sisa_waktu)
//     console.log(fnTimer(second));
//     timeWithSeconds.value = fnTimer(second);
//     storeUjian.setTimer(fnTimer(second));
//     if (second === 0) {
//       Toast.babeng('Info', "Waktu Habis!")
//       clearInterval(myInterval.value)
//     } else {
//       second--
//     }
//   }, 1000);
//   // console.log(tes);
// }

const fnTimer = (second) => moment.utc(second * 1000).format('HH:mm:ss');
const doPeriksa = async () => {
  const res = await apiUjian.doPeriksaUjianSaya();
  if (res) {
    // Toast.ujian("Info", "Ujian Aktif ditemukan !");
    // soalList.value = storeUjian.getSoalList;
    // console.log(storeUjian.getSoalList);
    // console.log('====================================');
    // console.log(storeUjian.getUjianAktif);
    // console.log(storeUjian.getUjianAktif.ujian_proses_kelas_id, storeUjian.getUjianAktif.ujian_paketsoal_kategori_id, storeUjian.getUjianAktif.id);
    // console.log('====================================');
  } else {
    // Toast.babeng("Info", "Ujian aktif tidak ditemukan!");
    apiUjian.doGetUjianList();
  }
};
doPeriksa();

const loadTimer = ref(0);
// if (storeUjian.getUjianAktif) {
//   console.log('1', Number.isInteger(storeUjian.getUjianAktif.sisa_waktu), ujianAktif.value.sisa_waktu);
//   // console.log(storeUjian.getUjianAktif.sisa_waktu, fnTimer(storeUjian.getUjianAktif.sisa_waktu));
//   if (Number.isInteger(storeUjian.getUjianAktif.sisa_waktu)) {
//     console.log('2');
//     if (timeWithSeconds.value == '-') {
//       console.log('atur waktu');
//       // fnTimerInterval(storeUjian.getUjianAktif.sisa_waktu)
//       let second = storeUjian.getUjianAktif.sisa_waktu;
//       myInterval.value = setInterval(() => {
//         // console.log(storeUjian.getUjianAktif.sisa_waktu)
//         console.log(fnTimer(second));
//         timeWithSeconds.value = fnTimer(second);
//         storeUjian.setTimer(fnTimer(second));
//         if (second === 0) {
//           Toast.babeng('Info', "Waktu Habis!")
//           clearInterval(myInterval.value)
//         } else {
//           second--
//         }
//       }, 1000);
//     }
//   } else {
//     // Toast.danger("Info", "Paket Soal tidak ditemukan!")
//     localStorage.removeItem("soal");

//     localStorage.removeItem("soalAktif");
//   }
// }

const $q = useQuasar();
const menuList = [
  // {
  //   icon: "home",
  //   label: "DASHBOARD",
  //   separator: true,
  //   link: "admin-dashboard",
  // },
  {
    icon: "account_circle",
    label: "UJIAN",
    separator: false,
    link: "admin-ujian",
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
  // {
  //   icon: "cloud",
  //   label: "LIST UJIAN",
  //   separator: true,
  //   link: "admin-ujian",
  // },
  // {
  //   icon: "settings",
  //   label: "PENGATURAN",
  //   separator: false,
  //   link: "admin-about",
  // },
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


const doSoal = (id) => {
  let no_soal_id = id + 1;

  if (id || id === 0) {
    localStorage.setItem('soalAktif', no_soal_id);
  }
  let nullId = localStorage.getItem('soalAktif') ? localStorage.getItem('soalAktif') : 1;
  let soal_id = id || id === 0 ? id : nullId;
  // console.log(soal_id);
  storeUjian.setSoalAktifDetail(storeUjian.getSoalList[id]);
  storeUjian.setSoalAktif(no_soal_id);
  storeUjian.setTempJawabanTerpilih(null);

  let getSoal = storeUjian.getSoalList[soal_id];
  let getJawabanKu = storeUjian.getSoalList[soal_id]?.pilihan_jawaban.filter((item) => {
    if (item.kode_jawaban === storeUjian.getSoalList[soal_id]?.jawaban_ku)
      return item
  })
  // console.log(id, getSoal, getSoal.jawaban_ku, getJawabanKu.length);
  if (getJawabanKu?.length > 0) {
    // console.log(getJawabanKu[0]);
    storeUjian.setTempJawabanTerpilih(getJawabanKu[0])
    // console.log(storeUjian.getTempJawabanTerpilih);
  }
  // console.log(no_soal_id, getSoal);
  router.push({
    name: "admin-ujian-detail-proses",
    params: {
      id: storeUjian.getUjianAktif.ujian_proses_kelas_id,
      kategori_id: storeUjian.getUjianAktif.ujian_paketsoal_kategori_id,
      kategori_proses: storeUjian.getUjianAktif.id,
      no_soal: id || id === 0 ? no_soal_id : nullId,
    },
  });
};

const doLogout = async () => {
  const res = await API.doLogout();
  if (res === true) {
    router.push({ name: "login" });
  }
};

const doFinish = async () => {
  if (confirm("Apakah anda yakin mengakhiri sesi ujian ini? jika iya tidak bisa di batalkan.")) {
    const res = await apiUjianProses.doFinish(storeUjian.getUjianAktif.id);
    if (res) {
      Toast.babeng("Sesi Ujian berhasil di akhiri!");
      localStorage.removeItem("soal");
      localStorage.removeItem("soalAktif");
      storeUjian.setSoalList([]);
      storeUjian.setSoalAktif(0);
      storeUjian.setSoalAktifDetail([]);
      storeUjian.setTempJawabanTerpilih(null);
      storeUjian.setTimer(null);
      storeUjian.setIsUjianAktif(false);
      storeUjian.setUjianAktif({
        id: "",
        nama: "",
        waktu: "",
        tgl_mulai: "",
        tgl_selesai: "",
        soal: [],
      });
      // clear Interval
      // fnTimerInterval(0)
      clearInterval(myInterval.value)
      router.push({ name: 'admin-ujian-detail-index', params: { id: ujian_proses_kelas_id.value } });
      // router.push({ name: 'admin-ujian-index' });

    } else {
      Toast.warning("Info", "Gagal mengakhiri sesi ujian");
    }
    // console.log(storeUjian.getUjianAktif.id);
  }
};

const fnToSecond = (timer) => {
  let seconds = 0;
  if (timer) {
    let hms = timer;   // your input string
    let a = hms.split(':'); // split it at the colons

    // minutes are worth 60 seconds. Hours are worth 60 minutes.
    seconds = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]);
  }
  return seconds;
}
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
          <!-- <q-route-tab :to="{ name: 'admin-dashboard' }" label="Home" /> -->
          <q-route-tab :to="{ name: 'admin-ujian' }" label="Ujian" />
          <q-route-tab v-if="storeUjian.getIsUjianAktif" @click="doSoal(null)">
            <p v-if="fnToSecond(timer) <= 120" class="q-gutter-sm text-red"> {{ timer }}</p>
            <p v-else class="q-gutter-sm text-gray">{{ timer }} </p>
          </q-route-tab>
          <q-route-tab v-if="storeUjian.getIsUjianAktif" @click="toggleRightDrawer">MENU SOAL
          </q-route-tab>
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
              <q-item clickable :to="{ name: menuItem.link }" :active="menuItem.label === 'Outbox'" v-ripple>
                <q-item-section avatar>
                  <q-icon :name="menuItem.icon" />
                </q-item-section>
                <q-item-section>
                  {{ menuItem.label }}
                </q-item-section>
              </q-item>
              <q-separator :key="'sep' + index" v-if="menuItem.separator" />
            </template>
            <q-item clickable :active="'active' === 'Outbox'" v-ripple @click="doLogout()">
              <q-item-section avatar>
                <q-icon name="logout" />
              </q-item-section>
              <q-item-section> LOGOUT </q-item-section>
            </q-item>
          </q-list>
        </q-scroll-area>
      </q-drawer>

      <q-drawer show-if-above v-model="rightDrawerOpen" side="right" bordered v-if="storeUjian.getIsUjianAktif">
        <q-scroll-area class="fit">
          <q-list>
            <q-item clickable v-ripple class="q-pb-xs">
              <q-item-section avatar>
                <q-icon name="work_history" />
                <q-tooltip> Siswa Waktu </q-tooltip>
              </q-item-section>
              <h4 v-if="fnToSecond(timer) <= 120" class="text-red text-italic">{{ timer }} </h4>
              <h4 v-else class="text-gray">{{ timer }} </h4>
            </q-item>
            <q-item>
              <div class="q-pa-md" style="max-width: 500px">
                <p class="q-mt-md">Soal Aktif : {{ storeUjian.getSoalAktif }}</p>
                <p class="q-mt-md">Soal :</p>
                <div class="q-gutter-sm">
                  <span v-for="n, index in soalList" :key="`sm-${n.id}`" class="q-gutter-md">
                    <q-btn :label="index + 1
                      // +'(' + n.jawaban_ku + ')'
                    " :color="'blue'" @click="doSoal(index)" class="q-mx-md " v-if="n.jawaban_ku != '-'" />
                    <q-btn :label="index + 1" color="orange" @click="doSoal(index)" class="q-mx-md " v-else />
                  </span>

                </div>
              </div>
              <!-- <div class="q-pa-md" style="max-width: 500px">
                <p class="q-mt-md">Soal :</p>
                <div class="q-gutter-sm">
                  <q-btn color="teal" v-for="n in 50" :key="`sm-${n}`" :label="n" @click="doSoal(n)" />
                </div>
              </div> -->
            </q-item>
            <q-item v-ripple clickable @click="doFinish()">
              <q-item-section top avatar>
                <!-- <q-avatar color="primary" text-color="white" icon="mdiContentSaveCheck" /> -->

                <q-btn color="primary" icon="save" label="FINISH" />

                <!-- <q-btn clickable v-ripple class="q-pb-xs"> -->
                <!-- <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                  stroke="currentColor" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M9 3.75H6.912a2.25 2.25 0 00-2.15 1.588L2.35 13.177a2.25 2.25 0 00-.1.661V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 00-2.15-1.588H15M2.25 13.5h3.86a2.25 2.25 0 012.012 1.244l.256.512a2.25 2.25 0 002.013 1.244h3.218a2.25 2.25 0 002.013-1.244l.256-.512a2.25 2.25 0 012.013-1.244h3.859M12 3v8.25m0 0l-3-3m3 3l3-3" />
                </svg> -->
                <!-- </q-btn> -->

              </q-item-section>
              <q-item-section>

                <!-- <q-item-label>FINISH</q-item-label> -->
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
