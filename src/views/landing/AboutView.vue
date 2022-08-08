<script setup>
import BreadCrumb from "@/components/breadcrumb/BabengBreadcrumb.vue";
</script>
<template>
  <BreadCrumb />
  <div class="about">
    <h1>This is an about page 2</h1>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
