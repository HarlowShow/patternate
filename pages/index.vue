<template>
  <div>
    <NuxtLayout>
    <template #menu>
      <TheMenu />
      </template>
      <div class="outer-wrapper main">
        <div v-if="chosenMode.value==='draw'">
          <DrawingCanvas />
        </div>
        <div v-else>
          <GuideCanvas />
        </div>
      </div>
    </NuxtLayout>
    </div>
</template>
<script setup lang="ts">
import { useConfigStore } from '~~/stores/config';
import { storeToRefs } from 'pinia';
definePageMeta({
  layout: 'default'
})
const store = useConfigStore()
const { mode } = storeToRefs(store);
const chosenMode = computed(() => mode )
</script>

<style lang="scss">
.main {
  width: 100vh;
  padding: $sm;
}
</style>