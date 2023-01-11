
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
  background-color: #efefef;
  width: 100%;
  height: 100%;
}
</style>