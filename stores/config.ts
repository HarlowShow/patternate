import { defineStore } from 'pinia'

export const useConfigStore = defineStore('config', () => {
    const canvasDimensions = ref({
        width: 4,
        height: 4,
    })

    const imageDimensions = ref({
        width: 200,
        height: 200,
    })

    const canvasWidth = computed(() => canvasDimensions.value.width * imageDimensions.value.width)
    const canvasHeight = computed(() => canvasDimensions.value.height * imageDimensions.value.height)

    const updateImageDimensions = ((width: number | SVGAnimatedLength, height: number | SVGAnimatedLength) => {
        if (typeof width !== 'number' || typeof height !== 'number') {
            console.error('non number dimensions are not supported')
        } else {
            imageDimensions.value.width = width;
            imageDimensions.value.height = height;
            console.log('dimension update successful: ' + imageDimensions.value)
        }
    })

    const updateCanvasWidth = ((width: number) => canvasDimensions.value.width = width)
    const updateCanvasHeight = ((height: number) => canvasDimensions.value.height = height)

    return {
        canvasDimensions,
        canvasWidth,
        canvasHeight,
        imageDimensions,
        updateCanvasWidth,
        updateCanvasHeight,
        updateImageDimensions,
    }
})