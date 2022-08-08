<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();
const id = route.params.id;
const soal_id = route.params.soal_id;
const lorem =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";
</script>

<template>
  <div class="q-pa-md q-gutter-md">
    <div>
      <q-chip
        size="18px"
        icon="bookmark"
        dense
        color="secondary"
        text-color="white"
      >
        NO SOAL : {{ parseInt(soal_id) + 1 }}
      </q-chip>
      <q-chip
        size="18px"
        icon="bookmark"
        dense
        color="deep-orange"
        text-color="white"
      >
        STATUS : BELUM DIJAWAB
      </q-chip>
    </div>
  </div>
  <div class="q-pa-md row items-start q-gutter-md">
    <q-card flat bordered style="width: 100%">
      <q-card-section>
        <div class="text-h6">Pertanyaan</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
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
      <q-item clickable v-ripple class="bg-teal-5 text-white">
        <q-card-section>
          <div class="text-h6">A</div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Possimus,
          ipsam! Modi voluptatibus nam aut fugiat qui expedita quo laborum
          eveniet, maiores ducimus, dolores dignissimos delectus earum
          temporibus fuga. Voluptatibus, suscipit.
        </q-card-section>
      </q-item>
      <q-item clickable v-ripple>
        <q-card-section>
          <div class="text-h6">B</div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Possimus,
          ipsam! Modi voluptatibus nam aut fugiat qui expedita quo laborum
          eveniet, maiores ducimus, dolores dignissimos delectus earum
          temporibus fuga. Voluptatibus, suscipit.
        </q-card-section>
      </q-item>
      <q-item clickable v-ripple>
        <q-card-section>
          <div class="text-h6">C</div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Possimus,
          ipsam! Modi voluptatibus nam aut fugiat qui expedita quo laborum
          eveniet, maiores ducimus, dolores dignissimos delectus earum
          temporibus fuga. Voluptatibus, suscipit.
        </q-card-section>
      </q-item>
      <q-item clickable v-ripple>
        <q-card-section>
          <div class="text-h6">D</div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Possimus,
          ipsam! Modi voluptatibus nam aut fugiat qui expedita quo laborum
          eveniet, maiores ducimus, dolores dignissimos delectus earum
          temporibus fuga. Voluptatibus, suscipit.
        </q-card-section>
      </q-item>
    </q-list>
  </div>

  <div style="width: 100%" class="row justify-end q-gutter-md q-pa-md">
    <q-btn color="primary" icon="check" label="simpan" @click="doBack()" />
  </div>
  <div style="width: 100%" class="row justify-end q-gutter-md q-pa-md">
    <q-btn color="green" icon="arrow_back_ios" @click="doBack()" />
    <q-btn color="info" icon="arrow_forward_ios" @click="doNext()" />
  </div>
</template>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 250px
</style>
