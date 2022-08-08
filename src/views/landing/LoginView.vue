<script setup>
import { ref } from "vue";
const username = ref("");
const password = ref("");
</script>
<template>
  <div class="row justify-center">
    <div class="q-pt-xl" style="width: 400px">
      <div class="q-pa-md pt-lg" style="max-width: 400px">
        <q-form
          @submit="onSubmit"
          @reset="onReset"
          class="q-gutter-lg"
          style="max-width: 400px"
        >
          <q-input
            filled
            v-model="username"
            label="Username *"
            hint="Usurname "
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || 'Please type something',
            ]"
          />

          <q-input
            filled
            type="password"
            v-model="password"
            label="Your password *"
            lazy-rules
            :rules="[
              (val) =>
                (val !== null && val !== '') || 'Please type your password',
            ]"
          />

          <div class="row justify-center">
            <q-btn label="Submit" type="submit" color="primary" />
            <q-btn
              label="Reset"
              type="reset"
              color="primary"
              flat
              class="q-ml-sm"
            />
            <RouterLink :to="{ name: 'admin-dashboard' }">
              <q-btn color="primary" label="LOGIN" class="q-ml-sm"
            /></RouterLink>
          </div>
        </q-form>
      </div>
    </div>
  </div>
</template>
