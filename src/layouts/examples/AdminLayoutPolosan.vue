<script setup>
import { ref } from "vue";
import { useQuasar } from "quasar";

const $q = useQuasar();
const menuList = [
  {
    icon: "inbox",
    label: "Inbox",
    separator: true,
  },
  {
    icon: "send",
    label: "Outbox",
    separator: false,
  },
  {
    icon: "delete",
    label: "Trash",
    separator: false,
  },
  {
    icon: "error",
    label: "Spam",
    separator: true,
  },
  {
    icon: "settings",
    label: "Settings",
    separator: false,
  },
  {
    icon: "feedback",
    label: "Send Feedback",
    separator: false,
  },
  {
    icon: "help",
    iconColor: "primary",
    label: "Help",
    separator: false,
  },
];

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

const leftDrawerOpen = ref(false);
// const rightDrawerOpen = ref(false);

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value;
};

// const toggleRightDrawer = () => {
//   rightDrawerOpen.value = !rightDrawerOpen.value;
// };
</script>

<template>
  <div>
    <q-layout view="hHh lpR fFf">
      <q-header elevated class="bg-primary text-white" height-hint="98">
        <q-toolbar>
          <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

          <q-toolbar-title>
            <q-avatar>
              <img
                src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg"
              />
            </q-avatar>
            Admin
          </q-toolbar-title>

          <!-- <q-btn dense flat round icon="menu" @click="toggleRightDrawer" /> -->
        </q-toolbar>

        <q-tabs align="left">
          <q-route-tab :to="{ name: 'admin-dashboard' }" label="Home" />
          <q-route-tab :to="{ name: 'admin-about' }" label="About" />
          <q-route-tab :to="{ name: 'admin-login' }" label="Login" />
          <q-route-tab :to="{ name: 'home' }" label="Logout" />
          <q-btn
            dense
            flat
            round
            icon="settings_brightness"
            @click="onToggleThema()"
          />
        </q-tabs>
      </q-header>

      <q-drawer show-if-above v-model="leftDrawerOpen" side="left" bordered>
        <!-- drawer content -->
        <q-scroll-area class="fit">
          <q-list>
            <template v-for="(menuItem, index) in menuList" :key="index">
              <q-item clickable :active="menuItem.label === 'Outbox'" v-ripple>
                <q-item-section avatar>
                  <q-icon :name="menuItem.icon" />
                </q-item-section>
                <q-item-section>
                  {{ menuItem.label }}
                </q-item-section>
              </q-item>
              <q-separator :key="'sep' + index" v-if="menuItem.separator" />
            </template>
          </q-list>
        </q-scroll-area>
      </q-drawer>

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
