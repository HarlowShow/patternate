import { defineStore } from 'pinia'

export const useConfigStore = defineStore('config', () => {
    // mode options
    type Mode = 'draw' | 'guide'
    type Submode = 'hex' | 'rectangle'
    const mode = ref<Mode>('draw')
    const submode = ref<Submode>('hex')
    const shouldUpdateImageDimensions = ref(false)
    const bg = ref('#FFFFFF');

    // width of the canvas, in number of pattern sets to repeat (i.e. 4 * 4 hexes)
    const canvasDimensions = ref({
        width: 2,
        height: 2,
    })

    // image dimensions, on load updated to the dimensions of the uploaded image
    const imageDimensions = ref({
        width: 200,
        height: 200,
    })

    const guideDimensions = ref({
        width: 600,
        height: 519.61,
    })

    const updateMode = (async(opt: Mode) => {
        mode.value = opt;
        // console.log('mode updated to ' + mode.value)
        await nextTick()
    })

    const updateSubmode = (async(opt: Submode) => {
        submode.value = opt;
        // console.log('mode updated to ' + mode.value)
        shouldUpdateImageDimensions.value = true
        await nextTick()
    })

    const updateBgColor = ((e: Event) => {
        const canvas = document.getElementsByClassName('bgcanvas')[0]
        if (canvas instanceof HTMLCanvasElement) {
            const ctx = canvas.getContext('2d');
            if (ctx !== null) {
                const element = e.currentTarget as HTMLInputElement
                const value = element.value
                bg.value = value;
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.fillStyle = value;
                ctx.fillRect(0, 0, canvas.width, canvas.height)
                console.log(bg.value)
            } else {
                console.warn('error finding ctx')
            }
        } else {
            console.warn('bg canvas not found')
        }

      })
    const updateImageDimensions = ((width: number | SVGAnimatedLength, height: number | SVGAnimatedLength) => {
        if (typeof width !== 'number' || typeof height !== 'number') {
            console.error('non number dimensions are not supported')
        } else {
            imageDimensions.value.width = width;
            imageDimensions.value.height = height;
            // console.log('dimension update successful: ' + imageDimensions.value)
        }
    })

    const updateGuideDimensions = ((toChange: 'width' | 'height', x: number) => {
        if (toChange === 'width') { 
            guideDimensions.value.width = x;
            guideDimensions.value.height = (Math.sqrt(3)/2) * x
        } else if (toChange === 'height') {
            guideDimensions.value.height = x;
            // TODO: use formula, temp solution only
            guideDimensions.value.width = x * 1.154701;
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
        shouldUpdateImageDimensions,
        updateImageDimensions,
        updateGuideDimensions,
        guideDimensions,
        updateMode,
        updateSubmode,
        mode,
        submode,
        updateBgColor,
        bg,
    }
})