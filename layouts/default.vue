
<template>
        <div>
          <slot name="top-menu"></slot>
          <div class="flex">
          <slot name="menu"></slot>
          <slot />
        </div>
        </div>
  </template>