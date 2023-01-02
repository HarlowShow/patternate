<template>
    <button @click="logGuideDimensions()">Give Me Triangle</button>
    <button>Save Guide</button>
    <div>
        <p>necessary info goes here</p>
    </div>
    <canvas ref="guideCanvas" class="guideCanvas" :width="guideCanvasWidth" :height="guideCanvasHeight">
    </canvas>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useConfigStore } from '~~/stores/config';
const store = useConfigStore()
const { guideDimensions } = storeToRefs(store);

const guideCanvasHeight = computed(() => guideDimensions.value.height + (guideDimensions.value.height / 10))
const guideCanvasWidth = computed(() => guideDimensions.value.width + (guideDimensions.value.width / 10))

const logGuideDimensions = (() => {
    console.log(guideDimensions.value.width, guideDimensions.value.height)
})
</script>

<style lang="scss">
.guideCanvas {
    border: 2px solid blue;
}
</style>