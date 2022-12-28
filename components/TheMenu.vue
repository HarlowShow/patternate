<template>
    <div class="menu flex-column">
        <h6 class="menu-item lh-spaced fw-medium">Logo Here</h6>
        <div class="toggle menu-item flex">
          <button>Guide Mode</button>
          <button>Art Mode</button>
        </div>
        <div class="menu-item">
          <h6 class="lh-spaced fw-medium">Patterns</h6>
          <button>hex triangles</button>
        </div>
        <div class="menu-item flex-column">
          <h6 class="lh-spaced fw-medium">Settings</h6>
          <div class="inline-input">
            <label for="width">Width (hexes):</label>
            <input v-model.number="chosenWidth" 
            @change="updateCanvasWidth(chosenWidth)"
            name="width">
          </div>
          <div class="inline-input">
            <label for="height">Height (hexes):</label>
            <input v-model.number="chosenHeight" 
            @change="updateCanvasHeight(chosenHeight)"
            name="height">
          </div>
        </div>
    </div>
  </template>
<script setup lang="ts">
import { useConfigStore } from '~~/stores/config';

const { 
  // canvasDimensions, 
  updateCanvasWidth, 
  updateCanvasHeight 
} = useConfigStore()

// const width = computed(() => canvasDimensions.width)
// const height = computed(() => canvasDimensions.height)
const chosenWidth = 0;
const chosenHeight = 0;
</script>

<style lang="scss">

    .menu {
      background: rgba(0, 0, 0, 0.5);
    }

    .menu-item {
      padding: $sm;
    }

    .inline-input {
      display: flex;
    }

    .inline-input > input {
      flex: 1;
      max-width: 2.5rem;
    }

    .inline-input > label {
      flex: 3;
    }
</style>