
<template>
        <div>
          <slot name="top-menu"></slot>
          <div class="flex app">
          <slot name="menu"></slot>
          <slot />
        </div>
        </div>
  </template>

<style lang="scss" scoped>
.app {
  background-color: #DAE0F2;
  width: 100%;
}
</style>