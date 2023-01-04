<template>
    <div class="menu flex-column">
        <h5 class="menu-item lh-spaced fw-medium">Patternate</h5>
        <div class="toggle menu-item flex">
          <MenuButton @click="updateMode('guide')">Guide Mode</MenuButton>
          <MenuButton @click="updateMode('draw')">Art Mode</MenuButton>
        </div>
        <div class="btn-list menu-item" v-if="currentMode.value === 'draw'">
          <h6 class="lh-spaced fw-medium">Patterns</h6>
          <MenuButton>Hex Triangles</MenuButton>
          <MenuButton>Coming Soon</MenuButton>
        </div>
        <div class="menu-item flex-column" v-if="currentMode.value === 'draw'">
          <h6 class="lh-spaced fw-medium">Draw Settings</h6>
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
        <div class="menu-item flex-column" v-else>
          <h6 class="lh-spaced fw-medium">Guide Settings</h6>
          <div class="inline-input">
            <label for="width">Width (px):</label>
            <input v-model.number="guideDimensions.width" 
            name="width">
            <MenuButton @click="updateGuideDimensions('width', guideDimensions.width)">Update</MenuButton>
          </div>
          <div class="inline-input">
            <label for="height">Height (px):</label>
            <input v-model.number="guideDimensions.height" 
            name="height">
            <MenuButton @click="updateGuideDimensions('height', guideDimensions.height)">Update</MenuButton>
          </div>
        </div>
    </div>
  </template>
<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useConfigStore } from '~~/stores/config';

const { 
  // canvasDimensions, 
  updateCanvasWidth, 
  updateCanvasHeight,
  updateMode,
  updateGuideDimensions,
} = useConfigStore()

const store = useConfigStore()
const { mode } = storeToRefs(store);
const { guideDimensions } = storeToRefs(store);


// const width = computed(() => canvasDimensions.width)
// const height = computed(() => canvasDimensions.height)
const currentMode = computed(() => mode)
console.log('mode is: ' + mode)
console.log('current mode is: ' + currentMode)
const chosenWidth = 0;
const chosenHeight = 0;
const guideWidth = 0;
const guideHeight = 0;
</script>

<style lang="scss" scoped>

    .menu {
      background: #212121;
      min-height: 100vh;
      // min-width: 400px;
    }

    * :not(button, input) { color: #fefefe; }

    .toggle {
      display: flex;
      justify-content: flex-start;
    }

    .toggle button {
      max-width: 50%;
    }

    label {
      font-weight: $font-weight-light;
    }

    .btn-list {
      display: flex;
      flex-direction: column;
    }
  
    h5 {
      font-size: 1rem;
    }

// tablets etc.
@media (min-width: 800px) {
  h5 {
    font-size: 1.2rem;
  }
  button, li, ul, label {
    font-size: 1rem;
  }
}

// big screens
@media screen and (min-width: 1200px) {
  h5 {
    font-size: 1.3rem;
  }
  button, li, ul, label {
    font-size: 1.1rem;
  }
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