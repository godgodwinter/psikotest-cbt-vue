<script setup>
import { ref } from "vue";
import { useQuasar } from "quasar";

const $q = useQuasar();

// get status
console.log($q.dark.isActive); // true, false

// get configured status
console.log($q.dark.mode); // "auto", true, false

// set status
$q.dark.set(false); // or false or "auto"

const onToggleThema = () => {
  $q.dark.toggle();
  console.log($q.dark.mode);
};

// const leftDrawerOpen = ref(false);
// const rightDrawerOpen = ref(false);

// const toggleLeftDrawer = () => {
//   leftDrawerOpen.value = !leftDrawerOpen.value;
// };

// const toggleRightDrawer = () => {
//   rightDrawerOpen.value = !rightDrawerOpen.value;
// };
</script>

<template>
  <div>
    <q-layout view="hHh lpR fFf">
      <q-header elevated class="bg-secondary text-white" height-hint="98">
        <q-toolbar>
          <!-- <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" /> -->

          <q-toolbar-title>
            <q-avatar>
              <img src="@/assets/img/logo/vue.svg" />
            </q-avatar>
            YPMT
          </q-toolbar-title>

          <!-- <q-btn dense flat round icon="menu" @click="toggleRightDrawer" /> -->
        </q-toolbar>

        <q-tabs align="left">
          <q-route-tab to="/" label="Home" />
          <q-route-tab to="/about" label="About" />
          <q-route-tab to="/login" label="Login" />
          <q-btn
            dense
            flat
            round
            icon="settings_brightness"
            @click="onToggleThema()"
          />
        </q-tabs>
      </q-header>

      <!-- <q-drawer show-if-above v-model="leftDrawerOpen" side="left" bordered>
      </q-drawer> -->

      <!-- <q-drawer show-if-above v-model="rightDrawerOpen" side="right" bordered>
      </q-drawer> -->

      <q-page-container>
        <router-view />
      </q-page-container>

      <!-- <q-footer elevated class="bg-grey-8 text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" />
          </q-avatar>
          <div>Title</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer> -->
    </q-layout>
  </div>
</template>
