<script setup>
import { ref } from "vue";
import Api from "@/axios/axios";
import BreadCrumb from "@/components/breadcrumb/BabengBreadcrumb.vue";
import { useRouter } from "vue-router";
import moment from "moment/min/moment-with-locales";
import localization from "moment/locale/id";
moment.updateLocale("id", localization);
const router = useRouter();
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
    label: "Nama Paket",
    align: "left",
    field: (row) => row.nama,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "tgl",
    align: "center",
    label: "Batas Pengerjaan Ujian",
    field: "tgl",
    sortable: true,
    sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
  },
  {
    name: "jml_kategori",
    label: "Jumlah Kategori Soal",
    field: "jml_kategori",
    sortable: true,
  },
  {
    name: "status",
    label: "Status",
    field: "status",
    sortable: true,
  },
];

const dataAsli = ref([]);
const getData = async (kelas_id) => {
  try {
    const response = await Api.get(`siswa/data/ujian`);
    dataAsli.value = response.data;
    // console.log(dataAsli.value);

    rows.value = rows.value.concat(dataAsli.value.slice(0).map((r) => ({ ...r })));
    // }
    rows.value.forEach((row, index) => {
      row.index = index + 1;
    });

    return response.data;
  } catch (error) {
    console.error(error);
  }
};
getData();
const seed = [
  {
    nama: "Paket Ujian 1",
    tgl: "2022-02-02",
    jml_kategori: 20,
    status: "Belum",
  },
  {
    nama: "Paket Ujian 2",
    tgl: "2022-04-02",
    jml_kategori: 20,
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

const doDetail = (id) => {
  // console.log(id);
  router.push({ name: "admin-ujian-detail-index", params: { id } });
};

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
</script>
<template>
  <BreadCrumb />
  <div class="q-pa-md">
    <q-table title="LIST UJIAN" :rows="rows" :columns="columns" row-key="index">
      <template v-slot:body="props">
        <q-tr :props="props" :key="`m_${props.row.index}`">
          <q-td v-for="col in props.cols" :key="col.name" :props="props">
            <div v-if="col.name == 'actions'">
              <div class="q-pa-xs q-gutter-sm">
                <q-btn round @click="doDetail(props.row.id)" icon="not_started" color="teal"
                  v-if="selisihTgl(props.row.tgl) == 'Buka'">
                  <q-tooltip> Detail {{ selisihTgl(props.row.tgl) }} </q-tooltip>
                </q-btn>
                <q-btn round icon="not_started" color="red" v-else>
                  <q-tooltip> Detail {{ selisihTgl(props.row.tgl) }} </q-tooltip>
                </q-btn>
              </div>
            </div>
            <div v-else-if="col.name == 'tgl'">
              <div class="q-pa-xs q-gutter-sm">
                <!-- <q-btn round @click="doDetail(props.row.id)" icon="not_started" color="teal">
                  <q-tooltip> Detail {{ props.row.index }} </q-tooltip>
                </q-btn> -->

                {{ moment(props.row.tgl).format("DD MMMM YYYY") }} -
                {{ selisihTgl(props.row.tgl) }}
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
