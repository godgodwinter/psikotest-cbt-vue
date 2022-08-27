<script setup>
import { ref } from "vue"
import BreadCrumb from "@/components/breadcrumb/BabengBreadcrumb.vue";
import ApiUjianProses from "@/services/api/apiUjianProses";
import Toast from "@/components/lib/Toast";
// import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStoreUjian } from "@/stores/ujian";
import { computed } from "@vue/reactivity";
import Fungsi from "@/components/lib/FungsiCampur"
const storeUjian = useStoreUjian();
const route = useRoute();
const router = useRouter();
const id = route.params.id ? route.params.id : null;
const kategori_id = route.params.kategori_id;
const kategori_proses = route.params.kategori_proses;
const no_soal = route.params.no_soal ? route.params.no_soal : 1;

storeUjian.$subscribe((mutation, state) => {
  // soal.value = dataSoal.value[dataSoalAktif.value];
  // console.log(dataSoalAktif.value, soal.value);
  // jika load data tidak melalui sidebar
  if (soal.value == null) {
    storeUjian.setSoalAktifDetail(storeUjian.getSoalList[parseInt(no_soal) - 1]);
    if (storeUjian.getSoalAktif !==
      localStorage.getItem("soalAktif", no_soal)) {
      // console.log(storeUjian.getSoalList.length);
      if (no_soal > storeUjian.getSoalList.length) {
        localStorage.setItem("soalAktif", 1);
      }
    }
    let getSoal = storeUjian.getSoalList[parseInt(no_soal) - 1];
    let nomer = no_soal;
    // console.log('a');
    if (no_soal > storeUjian.getSoalList.length) {
      // console.log('b');
      storeUjian.setSoalAktifDetail(storeUjian.getSoalList[0]);
      nomer = 1;
      getSoal = storeUjian.getSoalList[0];
    }

    // console.log(getSoal, parseInt(nomer));
    if (getSoal) {
      let getJawabanKu = storeUjian.getSoalList[parseInt(nomer) - 1]?.pilihan_jawaban.filter((item) => {
        if (item.kode_jawaban === storeUjian.getSoalList[parseInt(nomer) - 1].jawaban_ku)
          return item
      })
      // console.log(getSoal.jawaban_ku, getJawabanKu.length);
      if (getJawabanKu.length > 0) {
        // console.log(getJawabanKu[0]);
        storeUjian.setTempJawabanTerpilih(getJawabanKu[0])
        // console.log(storeUjian.getTempJawabanTerpilih);
      }

    }
  }

  // console.log(soal.value.jawaban_ku);
});



// periksa 
// a. apakah sudah terdaftar ujian ini,,
// b. sisa waktu apakah masi ada

// jika lolos periksa
// 1. get all soal with pilihan jawaban and jawaban_ku ? jika ada
const dataSoal = computed(() => storeUjian.getSoalList);
const dataSoalAktif = computed(() => storeUjian.getSoalAktif);
const soal = computed(() => storeUjian.getSoalAktifDetail);
const tempJawabanTerpilih = computed(() => storeUjian.getTempJawabanTerpilih);
const doPilihJawaban = (item, index) => {
  storeUjian.setTempJawabanTerpilih(item);
  // console.log(item, index);
}
// const soal = ref({});

// if (soal.value == null) {
//   storeUjian.setSoalAktifDetail(storeUjian.getSoalList[id ? id - 1 : 0]);
// }
storeUjian.setSoalAktif(no_soal);
// console.log(no_soal);

const getDataSoal = async () => {
  // post fungsi mulai ujian
  // jika berhasil redirect
  const resMulaiUjian = await ApiUjianProses.doGetSoal(id, kategori_id, kategori_proses);
  // jika gagal toast error
  if (resMulaiUjian) {
    Toast.babeng("Info", "Berhasil memuat soal ujian")
  } else {
    Toast.danger("Info", "Gagal memuat soal ujian 2")
    localStorage.removeItem("soal");
    localStorage.removeItem("soalAktif");
  }
};

if (dataSoal.value.length < 1) {
  getDataSoal();
}
// 2. save to local storage
// 3. go to last read
// const id = route.params.id;
const soal_id = route.params.soal_id;
// const lorem =
//   "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";
// dataSoal filter where index


const doSimpan = () => {
  // link:
  // ujian_proses_kategori_id ==kategori_proses
  //data :
  // ujian_paketsoal_soal_id,kode_soal,ujian_paketsoal_soal_pilihanjawaban_id,kode_jawaban
  if (tempJawabanTerpilih.value) {
    // const resMulaiUjian = await ApiUjianProses.doInsertJawaban(kategori_proses, soal.value.id, soal.value.kode_soal, tempJawabanTerpilih.value.id, tempJawabanTerpilih.value.kode_jawaban);
    console.log(kategori_proses);
    console.log(soal.value.id, soal.value.kode_soal, tempJawabanTerpilih.value.id, tempJawabanTerpilih.value.kode_jawaban);
  } else {
    Toast.babeng('Jawaban Belum dipilih')
  }
}

// console.log('====================================');
// console.log(storeUjian.getSoalList.length);
// console.log('====================================');
if (no_soal > storeUjian.getSoalList.length) {
  Toast.babeng('Soal tidak ditemukan');
  storeUjian.setSoalAktifDetail(storeUjian.getSoalList[0]);
  storeUjian.setSoalAktif(0);
  storeUjian.setTempJawabanTerpilih(null);

  let getSoal = storeUjian.getSoalList[0];
  let getJawabanKu = storeUjian.getSoalList[0]?.pilihan_jawaban.filter((item) => {
    if (item.kode_jawaban === storeUjian.getSoalList[0].jawaban_ku)
      return item
  })
  if (getJawabanKu?.length > 0) {
    // console.log(getJawabanKu[0]);
    storeUjian.setTempJawabanTerpilih(getJawabanKu[0])
    // console.log(storeUjian.getTempJawabanTerpilih);
  }
  router.push({
    name: "admin-ujian-detail-proses",
    params: {
      id,
      kategori_id,
      kategori_proses,
      no_soal: 1,
    },
  });
}
// const getSoalBelumDijawab= ()=>{

// }
let soalBelumDiJawab = dataSoal.value.filter((item) => {
  if (item.jawaban_ku == '-') {
    return item;
  }
});

</script>

<template>
  <BreadCrumb />
  <div class="q-pa-md q-gutter-md">
    <div>
      <q-chip size="18px" icon="bookmark" dense color="secondary" text-color="white">
        NO SOAL : {{ dataSoalAktif }}
      </q-chip>
      <q-chip size="18px" icon="bookmark" dense color="deep-orange" text-color="white">
        STATUS : {{ soalBelumDiJawab.length }} SOAL BELUM DIJAWAB
        <!-- {{ dataSoal.length }} -
        {{ dataSoal }} -->
      </q-chip>
    </div>
  </div>
  <div v-if="soal">
    <div class="q-pa-md row items-start q-gutter-md">
      <q-card flat bordered style="width: 100%">
        <q-card-section>
          <div class="text-h6">Pertanyaan</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          {{ soal.pertanyaan }}
          <!-- --
          {{ soal.jawaban_ku }}
          -- {{ tempJawabanTerpilih }} -->
        </q-card-section>

        <q-separator inset />

        <q-card-section>
          <div class="q-pa-md">
            <div class="q-col-gutter-md row items-start">
              <div class="col-6">

                <!-- <q-img
                src="https://cdn.quasar.dev/img/image-src.png"
                srcset="https://cdn.quasar.dev/img/image-1x.png 400w,
                https://cdn.quasar.dev/img/image-2x.png 800w,
                https://cdn.quasar.dev/img/image-3x.png 1200w,
                https://cdn.quasar.dev/img/image-4x.png 1600w"
                sizes="(max-width: 400px) 400w,
              (min-width: 400px) and (max-width: 800px) 800w,
              (min-width: 800px) and (max-width: 1200px) 1200w,
              (min-width: 1200px) 1600w"
                style="height: 280px; max-width: 300px"
              >
                <div class="absolute-bottom text-body1 text-center">
                  With srcset & sizes
                </div>
              </q-img> -->
                <!-- <q-img
                src="https://cdn.quasar.dev/img/parallax2.jpg"
                srcset="https://cdn.quasar.dev/img/parallax2.jpg 400w,
                https://cdn.quasar.dev/img/parallax2.jpg 800w,
                https://cdn.quasar.dev/img/parallax2.jpg 1200w,
                https://cdn.quasar.dev/img/parallax2.jpg 1600w,
                "
                sizes="(max-width: 400px) 400w,
              (min-width: 400px) and (max-width: 800px) 800w,
              (min-width: 800px) and (max-width: 1200px) 1200w,
              (min-width: 1200px) 1600w"
                style="width: 500px"
              >
                <div class="absolute-bottom text-subtitle1 text-center">
                  Caption
                </div>
              </q-img> -->
              </div>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>
    <div class="q-pa-md">
      <q-list bordered class="q-pa-md">
        <!-- <q-item clickable v-ripple class="bg-teal-5 text-white" v-for="item, index in soal.pilihan_jawaban"> -->
        <q-item clickable v-ripple v-for="item, index in soal.pilihan_jawaban" @click="doPilihJawaban(item, index)"
          :class="{ 'bg-teal-5 text-white': tempJawabanTerpilih?.kode_jawaban == item.kode_jawaban }">
          <q-card-section>
            <div class=" text-h6">{{ Fungsi.fnNumberToAlphabet(index + 1) }}
            </div>
          </q-card-section>
          <q-card-section class="q-pt-md bi-align-bottom">
            {{ item.jawaban }}
          </q-card-section>
        </q-item>
        <!-- <q-item clickable v-ripple>
        <q-card-section>
          <div class="text-h6">D</div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Possimus,
          ipsam! Modi voluptatibus nam aut fugiat qui expedita quo laborum
          eveniet, maiores ducimus, dolores dignissimos delectus earum
          temporibus fuga. Voluptatibus, suscipit.
        </q-card-section>
      </q-item> -->
      </q-list>
    </div>

    <div style="width: 100%" class="row justify-end q-gutter-md q-pa-md">
      <q-btn color="primary" icon="check" label="simpan" @click="doSimpan()" />
    </div>
    <div style="width: 100%" class="row justify-end q-gutter-md q-pa-md">
      <q-btn color="green" icon="arrow_back_ios" @click="doBack()" />
      <q-btn color="info" icon="arrow_forward_ios" @click="doNext()" />
    </div>
  </div>
</template>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 250px
</style>
