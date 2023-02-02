<template>
    <InnerMenu>
            <Icon name="fluent:draw-shape-24-regular" @click="generateTriangle()">Give Me Triangle</Icon>
            <Icon name="fluent:save-16-regular" @click="saveGuide()">Save Guide</Icon>
    </InnerMenu>
    <div class="shell">
        <canvas ref="guideCanvas" class="guide-canvas" :width="guideCanvasWidth" :height="guideCanvasHeight">
        </canvas>
    </div>
</template>

<script setup lang="ts">
import { Ref } from 'vue'
import { storeToRefs } from 'pinia';
import { nullCheck } from '~~/models/models';
import { useConfigStore } from '~~/stores/config';
import { useTriangle } from '~~/composables/triangle';
import { useSave } from '~~/composables/save';
const store = useConfigStore()
const { guideDimensions, submode } = storeToRefs(store);

const guideCanvasHeight = computed(() => guideDimensions.value.height + (guideDimensions.value.height / 10))
const guideCanvasWidth = computed(() => guideDimensions.value.width + (guideDimensions.value.width / 10))

// const guideCanvasHeight = computed(() => refCanvasHeight.value + 10)
// const guideCanvasWidth = computed(() => refCanvasWidth.value + 10)

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

    const generateHexTriangle = (() => {
        const ctxCheck = nullCheck<CanvasRenderingContext2D>(ctx);
        if (ctxCheck.kind === 'success' && ctx.value !== null) {
        const [coordsOne, coordsTwo, coordsThree] = useTriangle(guideCanvasHeight.value, guideCanvasWidth.value)

        ctx.value.lineWidth = 0.5;
        ctx.value.strokeStyle = 'white';
        ctx.value.beginPath();
        ctx.value.moveTo(coordsOne.x, coordsOne.y);
        ctx.value.lineTo(coordsTwo.x, coordsTwo.y);
        ctx.value.lineTo(coordsThree.x, coordsThree.y);
        ctx.value.closePath();
        ctx.value.fillStyle = 'white';
        ctx.value.fill();
        ctx.value.stroke();
        } else {
            console.error('GUIDE CTX: null check failed in generateHexTriangle')
        }
    })
const generateOctTriangle = (() => {
    console.log('generateOctTriangle')
})
const generateTriangle = (() => {
    const ctxCheck = nullCheck<CanvasRenderingContext2D>(ctx);
    if (ctxCheck.kind === 'success' && ctx.value !== null) {
        const [coordsOne, coordsTwo, coordsThree] = useTriangle(guideCanvasHeight.value, guideCanvasWidth.value)

        // make bg black
        ctx.value.beginPath();
        ctx.value.rect(0, 0, guideCanvasWidth.value, guideCanvasHeight.value);
        ctx.value.fillStyle = 'black';
        ctx.value.fill();
        
        switch(submode.value) {
            case 'hex':
            generateHexTriangle()
            break;
            case 'hexouter':
            generateOctTriangle()
            break;
        } 
    } else {
        console.error('GUIDE CTX: null check failed')
    }
})

const saveGuide = (() => {
    if (guideCanvas.value !== null) {
        const dataURL = guideCanvas.value.toDataURL();
        useSave('guidetri', dataURL)
        // const link = document.createElement('a');
        // link.download = 'download.png';
        // link.href = dataURL
        // link.click();
        // TODO remove link after
    } else {
        console.error('GUIDE CANVAS: null check failed on attempted save')
    }
})
</script>

<style lang="scss" scoped>
// .guide-canvas {
//     // background-color: black;
// }
</style>