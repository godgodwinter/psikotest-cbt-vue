<script setup>
import BreadCrumb from "@/components/breadcrumb/BabengBreadcrumb.vue";
import Api from "@/axios/axios";
import Toast from "@/components/lib/Toast.js";
import { useStoreAuth } from "@/stores/auth";
import { ref } from "vue"
const storeAuth = useStoreAuth();
const token = storeAuth.getToken;
const data = ref(null);

const doGetMyProfile = async (token) => {
  try {
    const response = await Api.post(`siswa/auth/me_ujian`, {
      token: token,
    });
    console.log(response);
    data.value = response;

    // return true;
  } catch (error) {
    Toast.danger("Error", `Gagal menghubungkan ke Server!`);
    console.error(error);
    return false;
  }
};
doGetMyProfile(token);

</script>
<template>
  <BreadCrumb />
  <!-- <div class="about">
    <h1>This is an about page 2</h1>
  </div> -->
  <div class="q-pa-md q-gutter-lg" v-if="data">

    <div class="row">
      <div class="col-1">
        NIS
      </div>
      <div class="col-1">
        :
      </div>
      <div class="col">
        {{ data.identitas.profile.nomeridentitas }}
      </div>
    </div>
    <div class="row">
      <div class="col-1">
        NAMA
      </div>
      <div class="col-1">
        :
      </div>
      <div class="col">
        {{ data.identitas.profile.nama }}
      </div>
    </div>
    <div class="row">
      <div class="col-1">
        SEKOLAH
      </div>
      <div class="col-1">
        :
      </div>
      <div class="col">
        {{ data.identitas.sekolah.nama }}
      </div>
    </div>
    <div class="row">
      <div class="col-1">
        KELAS
      </div>
      <div class="col-1">
        :
      </div>
      <div class="col">
        {{ data.identitas.kelas.nama }}
      </div>
    </div>

  </div>
</template>

<style>
/* @media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
} */
</style>
