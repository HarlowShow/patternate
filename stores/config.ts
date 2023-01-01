import { defineStore } from 'pinia'

export const useConfigStore = defineStore('config', () => {
    // mode options
    type Mode = 'draw' | 'guide'
    const mode = ref<Mode>('draw')

    // width of the canvas, in number of pattern sets to repeat (i.e. 4 * 4 hexes)
    const canvasDimensions = ref({
        width: 4,
        height: 4,
    })

    // image dimensions, on load updated to the dimensions of the uploaded image
    const imageDimensions = ref({
        width: 200,
        height: 200,
    })

    const guideImageDimensions = ref({
        width: 300,
        height: 400,
    })

    const updateMode = (async(opt: Mode) => {
        mode.value = opt;
        console.log('mode updated to ' + mode.value)
        await nextTick()
    })
    const updateImageDimensions = ((width: number | SVGAnimatedLength, height: number | SVGAnimatedLength) => {
        if (typeof width !== 'number' || typeof height !== 'number') {
            console.error('non number dimensions are not supported')
        } else {
            imageDimensions.value.width = width;
            imageDimensions.value.height = height;
            console.log('dimension update successful: ' + imageDimensions.value)
        }
    })

    const updateGuideImageDimensions = ((toChange: 'width' | 'height', x: number) => {
        if (toChange === 'width') { 
            guideImageDimensions.value.width = x;
            // TODO calc goes here
            guideImageDimensions.value.height = x * 1;
        } else if (toChange === 'height') {
            guideImageDimensions.value.height = x;
            // TODO calc goes here
        }
    })

    // update width and height on user input
    const updateCanvasWidth = (async (width: number) => {
        canvasDimensions.value.width = width;
        await nextTick()
    })
    const updateCanvasHeight = (async (height: number) => {
        canvasDimensions.value.height = height;
        await nextTick()
    })

    return {
        canvasDimensions,
        imageDimensions,
        updateCanvasWidth,
        updateCanvasHeight,
        updateImageDimensions,
        updateMode,
        mode,
    }
})