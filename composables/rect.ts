import { useConfigStore } from '~~/stores/config';
export function useRect(canvas: HTMLCanvasElement, image: HTMLImageElement) {
    const ctx = canvas.getContext('2d');
    const { canvasDimensions, imageDimensions, updateImageDimensions } = useConfigStore()
    let canvasX = 0;
    let canvasY = 0;

const drawRectPattern = (() => {
    console.log('drawRectPattern, image width is: ' + imageDimensions.width)
    
    const w = canvasDimensions.width;
    for (let i = 0; i < w; i+=1) {
    console.log('drawing rect number: ' + i)
    console.log('rects along to draw: ' + w)
    drawRect()
    canvasX += imageDimensions.width;
    }
})

const drawRect = (() => {
    if(ctx !== null) {
        ctx.translate(canvasX, canvasY)
        ctx.drawImage(image, 0, 0)
    } else {
        console.error('drawRect: ctx was null')
    }
})
return {
    drawRectPattern,
}
    
}