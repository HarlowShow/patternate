<template>
  <div>
    <NuxtLayout>
    <template #menu>
      <TheMenu />
      </template>
      <div class="outer-wrapper main">
          <ACanvas />
      </div>
    </NuxtLayout>
    </div>
</template>
<script setup lang="ts">
// import { useCounter } from '../stores/counter'
definePageMeta({
  layout: 'default'
})
// const counter = useCounter()
</script>

<style lang="scss">
.main {
  width: 100vh;
  padding: $sm;
}
</style>