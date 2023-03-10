<template>
  <InnerMenu>
        <div class="menu flex-column">
        <div class="controls">
          <Icon name="mdi:minus-box"
          v-if="isCollapsed===false"
          @click="isCollapsed=true">
          </Icon>
          <Icon name="mdi:plus-box"
          v-else
          @click="isCollapsed=false"
          ></Icon>
        </div>
        <div class="collapsible" v-if="isCollapsed===false">

          <div class="toggle menu-item">
            <h6 class="lh-spaced fw-medium">Mode</h6>
            <div class="flex-row">
              <Icon name="ion:easel-outline" :class="[mode === 'draw' ? activeClass : '']" @click="updateMode('draw')">Art</Icon>
              <Icon name="fluent:ruler-24-regular" :class="[mode === 'guide' ? activeClass : '']" @click="updateMode('guide')">Guide</Icon>
            </div>
        </div>
        <div class="btn-list menu-item">
          <h6 class="lh-spaced fw-medium">Patterns</h6>
          <div class="flex-row">
            <Icon name="mdi:hexagon-slice-1" :class="[submode === 'hex' ? activeClass : '']" @click="updateSubmode('hex')">Hexes</Icon>
            <Icon name="mdi:octagon-outline" :class="[submode === 'hexouter' ? activeClass : '']" @click="updateSubmode('hexouter')">Hexes</Icon>
            <Icon name="mdi:arrow-down-bold-box-outline" :class="[submode === 'arrow' ? activeClass : '']" @click="updateSubmode('arrow')">Arrow</Icon>
            <Icon v-if="currentMode.value === 'draw'" :class="[submode === 'rectangle' ? activeClass : '']" name="zondicons:view-tile" @click="updateSubmode('rectangle')">Rectangles</Icon>
          </div>
        </div>
        <div class="menu-item flex-column" v-if="currentMode.value === 'draw'">
          <h6 class="lh-spaced fw-medium">Settings</h6>
          <div class="inline-input">
            <label for="width">Width:</label>
            <input v-model.number="chosenWidth" 
            @change="updateCanvasWidth(chosenWidth)"
            name="width">
          </div>
          <div class="inline-input">
            <label for="height">Height:</label>
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
            <Icon name="material-symbols:check-circle-outline-rounded" @click="updateGuideDimensions('width', guideDimensions.width)">Update</Icon>
          </div>
          <div class="inline-input">
            <label for="height">Height (px):</label>
            <input v-model.number="guideDimensions.height">
              <Icon name="material-symbols:check-circle-outline-rounded" @click="updateGuideDimensions('height', guideDimensions.height)">Update</Icon>
          </div>
        </div>
        </div>
        
      </div>
      </InnerMenu>
        
  </template>
<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useConfigStore } from '~~/stores/config';

const { 
  // canvasDimensions, 
  updateCanvasWidth, 
  updateCanvasHeight,
  updateMode,
  updateSubmode,
  updateGuideDimensions,
} = useConfigStore()

const store = useConfigStore()
const { mode, submode } = storeToRefs(store);
const { guideDimensions } = storeToRefs(store);

// const width = computed(() => canvasDimensions.width)
// const height = computed(() => canvasDimensions.height)
const isCollapsed = ref(false)
const currentMode = computed(() => mode)
console.log('mode is: ' + mode)
console.log('current mode is: ' + currentMode)
const chosenWidth = 0;
const chosenHeight = 0;
const activeClass = 'active';
</script>

<style lang="scss" scoped>

input {
  height: 1.5rem;
  border-bottom: 2px solid #efefef;
  border-radius: 5px;
  padding-right: $xs;
}

    // .confirm {
    //   padding-bottom: 10px;
    // }

    .controls {
      display: flex;
      justify-content: flex-end;
    }

    // * :not(button, input) { color: #fefefe; }

    label {
      font-weight: $font-weight-light;
      padding-right: $xs;
      // font-size: 0.8rem;
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
    font-size: 0.8rem;
  }
}

// big screens
@media screen and (min-width: 1200px) {
  h5 {
    font-size: 1.3rem;
  }
  button, li, ul, label {
    font-size: 0.8rem;
  }
}

.active {
  background-color: #efefef;
  border-radius: 15px;
}

    .menu-item {
      padding: $sm;
    }

    .inline-input {
      display: flex;
      align-items: center;
      padding: $xs;
    }

    .inline-input > input {
      flex: 1;
      max-width: 2.5rem;
    }

    .inline-input > label {
      flex: 3;
    }

    .inline-input > .icon {
      padding: 0;
    }
</style>