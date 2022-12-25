
<template>
        <div>
          <div class="shell">
          <slot name="menu"></slot>
          <slot />
        </div>
        </div>
  </template>
  
  <style lang="scss" scoped>
    .shell {
      min-height: 100vh;
      display: flex;
      // flex-direction: column;
      background: #e1e1e1;
    }
  </style>