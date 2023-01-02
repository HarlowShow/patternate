<template>
    <button @click="generateTriangle()">Give Me Triangle</button>
    <button @click="saveGuide()">Save Guide</button>
    <div>
        <p>necessary info goes here</p>
    </div>
    <canvas ref="guideCanvas" class="guideCanvas" :width="guideCanvasWidth" :height="guideCanvasHeight">
    </canvas>
</template>

<script setup lang="ts">
import { Ref } from 'vue'
import { storeToRefs } from 'pinia';
import { nullCheck } from '~~/models/models';
import { useConfigStore } from '~~/stores/config';
const store = useConfigStore()
const { guideDimensions } = storeToRefs(store);

const guideCanvasHeight = computed(() => guideDimensions.value.height + (guideDimensions.value.height / 10))
const guideCanvasWidth = computed(() => guideDimensions.value.width + (guideDimensions.value.width / 10))

const hOffset = computed(() => (guideDimensions.value.height / 10) / 2);
const wOffset = computed(() => (guideDimensions.value.width / 10) / 2);

const guideCanvas: Ref <HTMLCanvasElement | null > = ref(null);
const ctx: Ref <CanvasRenderingContext2D | null > = ref(null);

    onMounted(async() => {
    const canvasCheck = nullCheck<HTMLCanvasElement>(guideCanvas);
            if (canvasCheck.kind === 'success') {
                // TODO: look into this mysterious error message
                ctx.value = canvasCheck.value.getContext('2d') as CanvasRenderingContext2D;
            } else {
                console.error('GUIDE CANVAS: null check failed on mounted')
            }
        await nextTick()
})

const generateTriangle = (() => {
    const ctxCheck = nullCheck<CanvasRenderingContext2D>(ctx);
    if (ctxCheck.kind === 'success' && ctx.value !== null) {
        const baseY = guideCanvasHeight.value - hOffset.value; 
        ctx.value.beginPath();
        ctx.value.moveTo(wOffset.value, baseY);
        ctx.value.lineTo(guideCanvasWidth.value - wOffset.value, baseY);
        ctx.value.lineTo(guideCanvasWidth.value / 2, hOffset.value);
        ctx.value.closePath();
        ctx.value.stroke();

        // TODO: refactor so it's an accurate outline and not just hodgepodge
        ctx.value.beginPath();
        ctx.value.moveTo(0, guideCanvasHeight.value - hOffset.value * 0.4);
        ctx.value.lineTo(guideCanvasWidth.value, guideCanvasHeight.value - hOffset.value * 0.4);
        ctx.value.lineTo(guideCanvasWidth.value / 2, 0);
        ctx.value.closePath();
        ctx.value.stroke();
        // ctx.value.fill();
    } else {
        console.error('GUIDE CTX: null check failed')
    }
})

const saveGuide = (() => {
    if (guideCanvas.value !== null) {
        const dataURL = guideCanvas.value.toDataURL();
        const link = document.createElement('a');
        link.download = 'download.png';
        link.href = dataURL
        link.click();
    } else {
        console.error('GUIDE CANVAS: null check failed on attempted save')
    }
})
</script>

<style lang="scss">
.guideCanvas {
    border: 2px solid blue;
}
</style>