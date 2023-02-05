<script setup>
import Api from "@/axios/axios";
import { ref } from "vue";
import BreadCrumb from "@/components/breadcrumb/BabengBreadcrumb.vue";
import { useRouter, useRoute } from "vue-router";
import moment from "moment/min/moment-with-locales";
import localization from "moment/locale/id";
import Toast from "@/components/lib/Toast";
import apiUjian from "@/services/api/apiUjian";
moment.updateLocale("id", localization);
const route = useRoute();
const router = useRouter();
const id = route.params.id;
const columns = [
  {
    name: "actions",
    label: "Actions",
    field: "actions",
    align: "center",
  },
  {
    name: "index",
    label: "#",
    field: "index",
    sortable: true,
    sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
  },
  {
    name: "nama",
    required: true,
    label: "Nama",
    align: "left",
    field: (row) => row.nama,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "waktu",
    align: "center",
    label: "Waktu (menit)",
    field: "waktu",
    sortable: true,
    sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
  },
  { name: "jml_soal", label: "Jumlah Soal", field: "jml_soal", sortable: true },
  // { name: "tipe", label: "Tipe", field: "tipe" },
  {
    name: "status",
    label: "Status",
    field: "status",
    sortable: true,
  },
];

const dataAsli = ref([]);
const getData = async (paketsoal_id) => {
  try {
    console.log(id, paketsoal_id);
    const response = await Api.get(
      `siswa/data/ujian/proses_kelas/${id}/paketsoal/${paketsoal_id}/kategori_soal`
    );
    if (response.success) {
      dataAsli.value = response.data;
      rows.value = rows.value.concat(dataAsli.value.slice(0).map((r) => ({ ...r })));
      // console.log(dataAsli.value);
    } else {
      // console.log('Lakukan Daftar');
      // doDaftar()
      console.log('Gagal mengambil data!');
    }

    rows.value.forEach((row, index) => {
      row.index = index + 1;
    });


    return response.data;
  } catch (error) {
    console.error(error);
  }
};
// getData();
const doDaftar = async () => {
  try {
    const response = await Api.post(`siswa/data/ujian/${id}/ujian_daftar`);
    // console.log(response);
    if (response.success) {
      getData(response.paketsoal_id);
    } else {
      getData(response.paketsoal_id);
      console.log('Gagal daftar');
    }
  } catch (error) {
    console.error(error);
  }
}
doDaftar();
const seed = [
  {
    nama: "Bahasa Indonesia",
    waktu: 60,
    jml_soal: 20,
    tipe: "Pilihan ganda",
    status: "Belum",
  },
  {
    nama: "Bahasa Inggris",
    waktu: 30,
    jml_soal: 10,
    tipe: "Pilihan ganda",
    status: "Belum",
  },
  {
    nama: "IPA",
    waktu: 90,
    jml_soal: 30,
    tipe: "Pilihan ganda",
    status: "Belum",
  },
  {
    nama: "IPA",
    waktu: 90,
    jml_soal: 30,
    tipe: "Pilihan ganda",
    status: "Belum",
  },
  {
    nama: "IPA",
    waktu: 90,
    jml_soal: 30,
    tipe: "Pilihan ganda",
    status: "Belum",
  },
  {
    nama: "IPA",
    waktu: 90,
    jml_soal: 30,
    tipe: "Pilihan ganda",
    status: "Belum",
  },
  {
    nama: "IPA",
    waktu: 90,
    jml_soal: 30,
    tipe: "Pilihan ganda",
    status: "Belum",
  },
  {
    nama: "IPA",
    waktu: 90,
    jml_soal: 30,
    tipe: "Pilihan ganda",
    status: "Belum",
  },
  {
    nama: "IPA",
    waktu: 90,
    jml_soal: 30,
    tipe: "Pilihan ganda",
    status: "Belum",
  },
  {
    nama: "IPA",
    waktu: 90,
    jml_soal: 30,
    tipe: "Pilihan ganda",
    status: "Belum",
  },
  {
    nama: "IPA",
    waktu: 90,
    jml_soal: 30,
    tipe: "Pilihan ganda",
    status: "Belum",
  },
  {
    nama: "IPA",
    waktu: 90,
    jml_soal: 30,
    tipe: "Pilihan ganda",
    status: "Belum",
  },
  {
    nama: "IPA",
    waktu: 90,
    jml_soal: 30,
    tipe: "Pilihan ganda",
    status: "Belum",
  },
];

let rows = ref([]);
// for (let i = 0; i < 1000; i++) {
// rows = rows.concat(seed.slice(0).map((r) => ({ ...r })));
// // }
// rows.forEach((row, index) => {
//   row.index = index + 1;
// });

const doMulai = (kategori_id) => {
  // console.log(kategori_id);
  router.push({
    name: "admin-ujian-detail-mulai",
    params: { id, kategori_id },
  });
};

const doResume = (id) => {
  console.log(id);
}
const dataParrent = ref(null)
console.log('====================================');
console.log(`proses_kelas_id:${id}`);
console.log('====================================');
const getDataParrent = async () => {
  try {
    const response = await Api.get(
      `siswa/data/ujian/${id}`
    );
    // da
    dataParrent.value = response.data;
    console.log(dataParrent.value);
    if (selisihTgl(dataParrent.value.tgl) != 'Buka') {
      Toast.babeng("Warning", "Ujian telah berakhir")
      router.push({
        name: "admin-ujian-index"
      });
    }

    return response.data;
  } catch (error) {
    console.error(error);
  }
};
getDataParrent();


const selisihTgl = (tgl) => {
  let a = moment(tgl).add(0, 'hours');
  let b = moment().format("YYYY-MM-DD");
  let result = a.diff(b, 'hours');
  // console.log(a, b, result);
  if (result < 0) {
    return "Ujian telah berakhir";
  } else {
    return "Buka";
  }
}

const periksa = ref(true);
const doPeriksa = async () => {
  const res = await apiUjian.doPeriksaUjianSaya();
  periksa.value = res;
  if (res) {
    console.log(res);
    // Toast.ujian("Info", "Ujian Aktif ditemukan !");
    // soalList.value = storeUjian.getSoalList;
    // console.log(storeUjian.getSoalList);
    // console.log('====================================');
    // console.log(storeUjian.getUjianAktif);
    // console.log(storeUjian.getUjianAktif.ujian_proses_kelas_id, storeUjian.getUjianAktif.ujian_paketsoal_kategori_id, storeUjian.getUjianAktif.id);
    // console.log('====================================');
  }
};
doPeriksa();
</script>
<template>
  <div class="q-pa-md q-gutter-md">
    <q-btn color="primary" @click="router.go()">Refresh</q-btn>
  </div>
  <!-- <BreadCrumb /> -->
  <div class="q-pa-md">
    <q-table title="KATEGORI SOAL " :rows="rows" :columns="columns" row-key="index" :rows-per-page-options="[100]">
      <template v-slot:body="props">
        <q-tr :props="props" :key="`m_${props.row.index}`">
          <q-td v-for="col in props.cols" :key="col.name" :props="props">
            <div v-if="col.name == 'actions'">
              <div class="q-pa-xs q-gutter-sm" v-if="periksa !== true">
                <q-btn round @click="doMulai(props.row.id)" icon="not_started" color="teal"
                  v-if="props.row.status == 'Belum'">
                  <q-tooltip> Mulai </q-tooltip>
                </q-btn>
                <q-btn round color="blue" icon="not_started" v-else-if="props.row.status == 'Aktif'"
                  @click="doMulai(props.row.id)">
                  <q-tooltip> Aktif </q-tooltip>
                </q-btn>
                <q-btn round color="orange" icon="not_started" v-else-if="props.row.status == 'Reset'"
                  @click="doMulai(props.row.id)">
                  <q-tooltip> Aktif </q-tooltip>
                </q-btn>
                <q-btn round color="red" v-else icon="not_started">
                  <q-tooltip> Selesai </q-tooltip>
                </q-btn>
              </div>
            </div>
            <div v-if="col.name == 'status'">
              <div class="q-pa-xs q-gutter-sm" v-if="periksa !== true">
                <q-btn color="secondary" text-color="black" :label="props.row.status" @click="doMulai(props.row.id)"
                  v-if="props.row.status == 'Belum'" />
                <q-btn color="blue" text-color="white" :label="props.row.status" v-else-if="props.row.status == 'Aktif'"
                  @click="doMulai(props.row.id)" />
                <q-btn color="orange" text-color="white" :label="props.row.status"
                  v-else-if="props.row.status == 'Reset'" @click="doMulai(props.row.id)" />
                <q-btn color="red" text-color="white" :label="props.row.status" v-else />
              </div>
              <div v-else>
                <q-btn color="secondary" text-color="black" :label="props.row.status"
                  v-if="props.row.status == 'Belum'" />
                <q-btn color="blue" text-color="white" :label="props.row.status"
                  v-else-if="props.row.status == 'Aktif'" />
                <q-btn color="orange" text-color="white" :label="props.row.status"
                  v-else-if="props.row.status == 'Reset'" />
                <q-btn color="red" text-color="white" :label="props.row.status" v-else />
              </div>
            </div>
            <div v-else>{{ col.value }}</div>
          </q-td>
        </q-tr>
        <q-tr v-show="props.expand" :props="props" :key="`e_${props.row.index}`" class="q-virtual-scroll--with-prev">
          <q-td colspan="100%">
            <div class="text-left">
              This is expand slot for row above: {{ props.row.name }} (Index:
              {{ props.row.index }}).
            </div>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>
