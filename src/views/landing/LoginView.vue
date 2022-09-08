<script setup>
import { ref } from "vue";
import API from "@/services/authServices";
import { useRouter } from "vue-router";
const router = useRouter();
const username = ref("");
const password = ref("");
const onSubmit = async () => {
  // console.log(username.value, password.value);
  const res = await API.doLogin(username.value, password.value);
  if (res === true) {
    router.push({ name: "AdminLayout" });
  }
};
</script>
<template>
  <div class="row justify-center">
    <div class="q-pt-xl" style="width: 400px">
      <div class="q-pa-md pt-lg" style="max-width: 400px">
        <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-lg" style="max-width: 400px">
          <q-input filled v-model="username" label="Username *" hint="Usurname " lazy-rules :rules="[
            (val) => (val && val.length > 0) || 'Please type something',
            (val) => val.length > 2 || 'Min 3 Character',
          ]" />

          <q-input filled type="password" v-model="password" label="Your password *" lazy-rules :rules="[
            (val) =>
              (val !== null && val !== '') || 'Please type your password',
            (val) => val.length > 2 || 'Min 3 Character',
          ]" />

          <div class="row justify-center">
            <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
            <q-btn label="Login" type="submit" color="primary" />
            <!-- <RouterLink :to="{ name: 'admin-dashboard' }">
              <q-btn color="primary" label="LOGIN" class="q-ml-sm"
            /></RouterLink> -->
          </div>
        </q-form>
      </div>
    </div>
  </div>
</template>
