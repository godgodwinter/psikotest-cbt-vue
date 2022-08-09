<script setup>
// import { ref } from "vue";
// const leftDrawerOpen = ref(false);
// const rightDrawerOpen = ref(true);

// const toggleLeftDrawer = () => {
//   leftDrawerOpen.value = !leftDrawerOpen.value;
// };

// const toggleRightDrawer = () => {
//   rightDrawerOpen.value = !rightDrawerOpen.value;
// };

// const timeWithSeconds = ref("00:90:00");
</script>
<template>
  <div class="q-pa-md">
    <h5>Dashboard</h5>
  </div>
  <!-- <q-drawer show-if-above v-model="rightDrawerOpen" side="right" bordered>
    <q-scroll-area class="fit">
      <q-list>
        <q-item clickable v-ripple class="q-pb-xs">
          <q-item-section avatar>
            <q-icon name="work_history" />
            <q-tooltip> Siswa Waktu </q-tooltip>
          </q-item-section>
          <h4>{{ timeWithSeconds }}</h4>
        </q-item>
        <q-item>
          <div class="q-pa-md" style="max-width: 500px">
            <p class="q-mt-md">Soal :</p>
            <div class="q-gutter-sm">
              <q-btn
                color="teal"
                v-for="n in 50"
                :key="`sm-${n}`"
                :label="n"
                @click="doSoal(n)"
              />
            </div>
          </div>
        </q-item>
        <q-item v-ripple clickable>
          <q-item-section top avatar>
            <q-avatar color="primary" text-color="white" icon="bluetooth" />
          </q-item-section>
          <q-item-section>
            <q-item-label>FINISH</q-item-label>
            <q-item-label caption lines="2">Akhiri Sesi ujian</q-item-label>
          </q-item-section>
          <q-item-section side top>
            <q-icon name="star" color="yellow" />
          </q-item-section>
        </q-item>
      </q-list>
    </q-scroll-area>
  </q-drawer> -->
</template>
