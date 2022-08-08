<script setup>
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();
const id = route.params.id;
const lorem =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

const onMulaiUjian = (soal_id = 0) => {
  router.push({
    name: "admin-ujian-proses",
    params: { id: id, soal_id: soal_id },
  });
};
</script>

<template>
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
    <h5>KATEGORI : {{ id }}</h5>
  </div>
  <div class="q-pa-md row items-start q-gutter-md">
    <q-card flat bordered style="width: 100%">
      <q-card-section>
        <div class="text-h6">Periksa data diri sebelum mulai</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </q-card-section>

      <q-separator inset />

      <q-card-section>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
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
    <q-btn
      color="primary"
      icon="check"
      label="MULAI UJIAN"
      @click="onMulaiUjian()"
    />
  </div>
</template>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 250px
</style>
