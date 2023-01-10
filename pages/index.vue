<template>
  <div>
    <NuxtLayout>
    <template #menu>
      <TheMenu />
      </template>
      <div class="outer-wrapper main">
        <div v-if="chosenMode.value==='draw' && chosenSubmode.value === 'hex'">
          <HexCanvas />
        </div>
        <div v-if="chosenMode.value==='draw' && chosenSubmode.value === 'rectangle'">
          <RectCanvas />
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
const { mode, submode } = storeToRefs(store);
const chosenMode = computed(() => mode );
const chosenSubmode = computed(() => submode );
</script>

<style lang="scss">
.main {
  width: 100%;
  padding: 0;
  margin: 0;
}
</style>