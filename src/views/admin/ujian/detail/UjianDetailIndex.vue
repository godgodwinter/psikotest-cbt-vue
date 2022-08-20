<script setup>
import Api from "@/axios/axios";
import { ref } from "vue";
import BreadCrumb from "@/components/breadcrumb/BabengBreadcrumb.vue";
import { useRouter, useRoute } from "vue-router";
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
  { name: "tipe", label: "Tipe", field: "tipe" },
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
    const response = await Api.get(
      `siswa/data/ujian/${id}/kategori_soal`
    );
    if (response.success) {
      dataAsli.value = response.data;
      rows.value = rows.value.concat(dataAsli.value.slice(0).map((r) => ({ ...r })));
    } else {
      console.log('Lakukan Daftar');
      doDaftar()
    }

    rows.value.forEach((row, index) => {
      row.index = index + 1;
    });


    return response.data;
  } catch (error) {
    console.error(error);
  }
};
getData();
const doDaftar = async () => {
  try {
    const response = await Api.post(`siswa/data/ujian/${id}/ujian_daftar`);
    if (response.success) {
      getData();
    } else {
      console.log('Gagal daftar');
    }
  } catch (error) {
    console.error(error);
  }
}
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
</script>
<template>
  <BreadCrumb />
  <div class="q-pa-md">
    <q-table title="KATEGORI SOAL" :rows="rows" :columns="columns" row-key="index">
      <template v-slot:body="props">
        <q-tr :props="props" :key="`m_${props.row.index}`">
          <q-td v-for="col in props.cols" :key="col.name" :props="props">
            <div v-if="col.name == 'actions'">
              <div class="q-pa-xs q-gutter-sm">
                <q-btn round @click="doMulai(props.row.index)" icon="not_started" color="teal">
                  <q-tooltip> Mulai {{ props.row.index }} </q-tooltip>
                </q-btn>
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
