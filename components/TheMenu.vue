<template>
    <div class="menu flex-column">
        <h6 class="menu-item lh-spaced fw-medium">Logo Here</h6>
        <div class="toggle menu-item flex">
          <button @click="updateMode('guide')">Guide Mode</button>
          <button @click="updateMode('draw')">Art Mode</button>
        </div>
        <div class="btn-list menu-item" v-if="currentMode.value === 'draw'">
          <h6 class="lh-spaced fw-medium">Patterns</h6>
          <button>Hex Triangles</button>
          <button>Coming Soon</button>
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
            <button @click="updateGuideDimensions('width', guideDimensions.width)">Update</button>
          </div>
          <div class="inline-input">
            <label for="height">Height (px):</label>
            <input v-model.number="guideDimensions.height" 
            name="height">
            <button @click="updateGuideDimensions('height', guideDimensions.height)">Update</button>
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
      background: rgba(0, 0, 0, 0.8);
      min-height: 100vh;
      // min-width: 400px;
    }

    * :not(button, input) { color: #fefefe; }

    h6 {
      font-size: 1.5rem;
    }

    label { 
      font-size: 1.25rem;
    }

    .toggle {
      display: flex;
      justify-content: flex-start;
    }

    .toggle button {
      max-width: 50%;
    }

    .btn-list {
      display: flex;
      flex-direction: column;
    }

    button {
    display: inline-block;
    border: none;
    padding: 1rem 1rem;
    margin: 0;
    text-decoration: none;
    background: mediumslateblue;
    color: #ffffff;
    font-family: sans-serif;
    font-size: 1rem;
    cursor: pointer;
    text-align: center;
    transition: background 250ms ease-in-out, 
                transform 150ms ease;
    max-width: 80%;
    // -webkit-appearance: none;
    // -moz-appearance: none;
}

button:hover,
button:focus, button.active {
    background: #4A3ECC;
}

button:focus {
    outline: 1px solid #fff;
    outline-offset: -4px;
}

// tablets etc.
@media (min-width: 800px) {
  h6 {
    font-size: 1.3rem;
  }
  button, li, ul, label {
    font-size: 1rem;
  }
}

// big ass screens
@media screen and (min-width: 1200px) {
  h6 {
    font-size: 1.5rem;
  }
  button, li, ul, label {
    font-size: 1.2rem;
  }
}

button:active {
    transform: scale(0.99);
}

    button:active {
      background-color: darkseagreen;
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