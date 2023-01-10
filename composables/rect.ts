import { useConfigStore } from '~~/stores/config';
export function useRect(canvas: HTMLCanvasElement, image: HTMLImageElement) {
    const ctx = canvas.getContext('2d');
    const { canvasDimensions, imageDimensions, updateImageDimensions } = useConfigStore()
    let canvasX = 0;
    let canvasY = 0;

const drawRectPattern = (() => {
    console.log('drawRectPattern, image width is: ' + imageDimensions.width)
    const h = canvasDimensions.height;
    console.log(h)
    for (let i = 0; i < h; i+=1) {
        console.log('drawing rect row')
        drawRectRow()
        if (i === h-1) {
            canvasY = 0;
        } else {
            canvasY += imageDimensions.height;
        }
    }
    
})

const drawRectRow = (() => {
    const w = canvasDimensions.width;
    for (let i = 0; i < w; i+=1) {
    console.log('drawing rect number: ' + i)
    console.log('rects along to draw: ' + w)
    drawRect()
    if (i === w-1) {
        canvasX = 0
    } else {
        canvasX += imageDimensions.width;
    }
    }
})

const drawRect = (() => {
    if(ctx !== null) {
        ctx.drawImage(image, canvasX, canvasY)
    } else {
        console.error('drawRect: ctx was null')
    }
})
return {
    drawRectPattern,
}
    
}