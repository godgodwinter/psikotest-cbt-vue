<script setup>
const BASE_URL = import.meta.env.VITE_API_URLFE
  ? import.meta.env.VITE_API_URLFE
  : "http://localhost:3333/";
import Api from "@/axios/axios";
import { ref } from "vue";
import BreadCrumb from "@/components/breadcrumb/BabengBreadcrumb.vue";
import { useRoute, useRouter } from "vue-router";
import ApiUjianProses from "@/services/api/apiUjianProses";
import ApiUjian from "@/services/api/apiUjian";
import { useStoreUjian } from "@/stores/ujian";
import moment from "moment/min/moment-with-locales";
import localization from "moment/locale/id";
import Toast from "@/components/lib/Toast";
moment.updateLocale("id", localization);
const storeUjian = useStoreUjian();
const route = useRoute();
const router = useRouter();
const id = route.params.id;
const kategori_id = route.params.kategori_id;


const dataParrent = ref(null)
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
// const doSoal = (id) => {
//   let no_soal_id = id + 1;

//   if (id || id === 0) {
//     localStorage.setItem('soalAktif', no_soal_id);
//   }
//   let nullId = localStorage.getItem('soalAktif') ? localStorage.getItem('soalAktif') : 1;
//   let soal_id = id || id === 0 ? id : nullId;
//   // console.log(soal_id);
//   storeUjian.setSoalAktifDetail(storeUjian.getSoalList[id]);
//   storeUjian.setSoalAktif(no_soal_id);
//   storeUjian.setTempJawabanTerpilih(null);

//   let getSoal = storeUjian.getSoalList[soal_id];
//   let getJawabanKu = storeUjian.getSoalList[soal_id]?.pilihan_jawaban.filter((item) => {
//     if (item.kode_jawaban === storeUjian.getSoalList[soal_id]?.jawaban_ku)
//       return item
//   })
//   // console.log(id, getSoal, getSoal.jawaban_ku, getJawabanKu.length);
//   if (getJawabanKu?.length > 0) {
//     // console.log(getJawabanKu[0]);
//     storeUjian.setTempJawabanTerpilih(getJawabanKu[0])
//     // console.log(storeUjian.getTempJawabanTerpilih);
//   }
//   // console.log(no_soal_id, getSoal);
//   router.push({
//     name: "admin-ujian-detail-proses",
//     params: {
//       id: storeUjian.getUjianAktif.ujian_proses_kelas_id,
//       kategori_id: storeUjian.getUjianAktif.ujian_paketsoal_kategori_id,
//       kategori_proses: storeUjian.getUjianAktif.id,
//       no_soal: id || id === 0 ? no_soal_id : nullId,
//     },
//   });
// };
function redir(id, kategori_id, kategori_proses, no_soal) {
  // localStorage.setItem("soalAktif", 1)
  // storeUjian.setSoalAktif(1);
  window.location = `${BASE_URL}pages/admin/ujian/${id}/detail/${kategori_id}/proses/${kategori_proses}/soal/${no_soal}`;
}
const getUjianAktif = async () => {
  // 1. load ujian aktif

  const resGetUjianAktif = await ApiUjian.doPeriksaUjianSaya();
  // 2. jika berhail load get Data then redirect
  if (resGetUjianAktif) {
    // router.push({
    //   name: "admin-ujian-detail-proses",
    //   params: {
    //     id: storeUjian.getUjianAktif.ujian_proses_kelas_id,
    //     kategori_id: storeUjian.getUjianAktif.ujian_paketsoal_kategori_id,
    //     kategori_proses: storeUjian.getUjianAktif.id,
    //     no_soal: 1,
    //   },
    // });
    // doSoal(1);

    let kategori_proses = storeUjian.getUjianAktif.id;
    let no_soal = 1;
    redir(id, kategori_id, kategori_proses, no_soal);

  } else {
    Toast.danger('Info', 'Gagal memuat ujian aktif')
  }
}
const onMulaiUjian = async () => {
  storeUjian.setSoalList([]);
  if (confirm("Apakah anda yakin memulai ujian ini?")) {
    // post fungsi mulai ujian
    // jika berhasil redirect
    const resMulaiUjian = await ApiUjianProses.doMulaiUjian(id, kategori_id);
    // jika gagal toast error
    if (resMulaiUjian) {
      Toast.babeng("Info", "Berhasil memulai ujian")

      getUjianAktif();
    } else {
      Toast.danger("Info", "Gagal memulai ujian")
    }
  };
};
const dataAsli = ref([]);
const getDataId = async () => {
  try {
    const response = await Api.get(
      `siswa/data/ujian/${id}/kategori_soal_detail/${kategori_id}`
    );
    if (response.success) {
      dataAsli.value = response.data;
    } else {
      // console.log('Belum Daftar');
      Toast.danger('Anda belum mendaftar untuk ujian ini');
    }
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
getDataId();
</script>

<template>
  <BreadCrumb />
  <!-- <div class="q-pa-md">
    <q-card class="my-card">
      <q-parallax
        src="https://cdn.quasar.dev/img/parallax1.jpg"
        :height="150"
      />

      <q-card-section>
        <div class="text-h6">Our Changing Planet</div>
        <div class="text-subtitle2">by John Doe</div>
      </q-card-section>
    </q-card>
  </div> -->
  <!-- <q-space /> -->
  <div class="q-pa-md">
    <h5>KATEGORI : {{ dataAsli.nama }}</h5>
  </div>
  <div class="q-pa-md row items-start q-gutter-md">
    <q-card flat bordered style="width: 100%">
      <q-card-section>
        <div class="text-h6">Periksa data diri sebelum mulai</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        Pastikan identitas anda telah sesuai.
      </q-card-section>

      <q-separator inset />

      <!-- <q-card-section>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </q-card-section> -->
    </q-card>
  </div>


  <div class="q-pa-md row items-start q-gutter-md" v-if="dataAsli.instruksi_status == 'Aktif'">
    <q-card flat bordered style="width: 100%">
      <q-card-section>
        <div class="text-h6">Instruksi</div>
      </q-card-section>
      <q-card-section class="q-pt-none">
        {{ dataAsli.instruksi }}
      </q-card-section>
    </q-card>
  </div>

  <div class="q-pa-md row items-start q-gutter-md" v-if="dataAsli.lembar_prasoal_status == 'Aktif'">
    <q-card flat bordered style="width: 100%">
      <q-card-section>
        <div class="text-h6">Lembar Prasoal</div>
      </q-card-section>
      <q-card-section class="q-pt-none">
        {{ dataAsli.lembar_prasoal }}
      </q-card-section>
    </q-card>
  </div>

  <div class="q-pa-md row items-start q-gutter-md" v-if="dataAsli.instruksi_pengerjaan_status == 'Aktif'">
    <q-card flat bordered style="width: 100%">
      <q-card-section>
        <div class="text-h6">Instruksi Pengerjaan</div>
      </q-card-section>
      <q-card-section class="q-pt-none">
        {{ dataAsli.instruksi_pengerjaan }}
      </q-card-section>
    </q-card>
  </div>


  <div class="q-pa-md row items-start q-gutter-md">
    <q-card flat bordered style="width: 100%">
      <q-card-section>
        <div class="text-h6">Konfirmasi mulai ujian</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        Persiapkan diri anda untuk mengerjakan ujian ini. Anda tidak dapat
        membatalkan proses ini setelah menekan tombol mulai.
      </q-card-section>
    </q-card>
  </div>
  <div style="width: 100%" class="row justify-end q-pa-md">
    <q-btn color="primary" icon="check" label="MULAI UJIAN" @click="onMulaiUjian()" />
  </div>
</template>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 250px
</style>
