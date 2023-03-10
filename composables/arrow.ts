
import { useConfigStore } from '~~/stores/config';

export function useArrow(canvas: HTMLCanvasElement, image: HTMLImageElement) {
    console.log('canvas:', canvas)
    const ctx = canvas.getContext('2d');
    console.log('ctx:', ctx);
    console.log('image: ' + image )
    const { canvasDimensions, imageDimensions } = useConfigStore()

    let canvasX = 0;
    let canvasY = - imageDimensions.height;

    const drawArrow = (async (x: number, y: number) => {
            if (ctx !== null) {
                ctx.translate(x, y);
                ctx.drawImage(image, 0, 0);
                ctx.translate(-x, -y);
                await nextTick()
            }
            else {
                console.error('cannot find ctx in drawTriangle: hex.ts')
            }
         
    });
    
    
    function drawArrowRow(num: number, offset: number) {
      console.log('drawing hex row: ' + num, offset)
      for (let i = 0; i <= canvasDimensions.width + 1; i += 1) {
        if ( i % 2 === 0) {
          drawArrow(canvasX, canvasY);
        }
        canvasX += (imageDimensions.width/2);
        console.log(canvasX);
      }
    }
    
    const drawPattern = (async () => {
      let offset = 0;
      const s = imageDimensions.width;
      const h = imageDimensions.height;
      for (let i = 0; i < canvasDimensions.height + 1; i += 1) {
        drawArrowRow(i, offset)
        canvasX = 0 - offset;
        canvasY += h - h/4;
    }
            
    });

    return {
        drawPattern,
    }
}