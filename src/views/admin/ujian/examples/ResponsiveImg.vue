<template>
  <q-img
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
  </q-img>
</template>
