<script setup>
import CardA from "@/components/skeleton/CardA.vue";
import { useQuasar } from "quasar";

const $q = useQuasar();

const showNotif = () => {
  $q.notify({
    color: "teal",
    message: "Quasar is cool! Right?",
    icon: "tag_faces",
    position: "top-right",
    timeout: 1000,
  });
};

const showNotifTwo = () => {
  $q.notify({
    message: "Jim pinged you.",
    color: "purple",
  });
};
</script>
<template>
  <div>
    <q-btn round size="sm" color="accent" @click="showNotif('left')">
      <q-icon name="arrow_back" />
    </q-btn>
    <q-btn round size="sm" color="accent" @click="showNotifTwo('left')">
      <q-icon name="arrow_forward" />
    </q-btn>
  </div>
  <card-a />
  <div class="q-pa-xl row items-start q-gutter-lg">
    <q-card
      class="my-card text-white"
      style="background: radial-gradient(circle, #35a2ff 0%, #014a88 100%)"
    >
      <q-card-section>
        <div class="text-h6">Our Changing Planet</div>
        <div class="text-subtitle2">by John Doe</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        {{ lorem }}
      </q-card-section>
    </q-card>

    <q-card dark bordered class="bg-grey-9 my-card">
      <q-card-section>
        <div class="text-h6">Our Changing Planet</div>
        <div class="text-subtitle2">by John Doe</div>
      </q-card-section>

      <q-separator dark inset />

      <q-card-section>
        {{ lorem }}
      </q-card-section>
    </q-card>

    <q-card flat bordered class="my-card">
      <q-card-section>
        <div class="text-h6">Our Changing Planet</div>
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
</template>
