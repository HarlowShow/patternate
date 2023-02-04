import { useConfigStore } from '~~/stores/config';

export function useOct(canvas: HTMLCanvasElement, image: HTMLImageElement) {
    console.log('canvas:', canvas)
    const ctx = canvas.getContext('2d');
    console.log('ctx:', ctx);
    console.log('image: ' + image )
    const { canvasDimensions, imageDimensions } = useConfigStore()
    // how many segments needed for an image set, in this case 8;
    const its = 6;
    // counter for each turn
    let count = 0;
    // running coordinates for drawing the shapes
    let canvasX = -imageDimensions.width;
    let canvasY = 0;

    const drawTriangle = (async (x: number, y: number, rotation: number) => {
            if (ctx !== null) {
                ctx.translate(x, y);
                ctx.rotate(rotation);
                ctx.drawImage(image, 0, 0);

                ctx.rotate(-rotation);
                ctx.translate(-x, -y);
                await nextTick()
            }
            else {
                console.error('cannot find ctx in drawTriangle: hex.ts')
            }
         
    });
    
    const drawHex = (() => {
        let angle = 45;
      while (count < its) {
        let rotation = angle * count;
        drawTriangle(canvasX, canvasY, rotation)
        count +=1;
      }
    });
    
    
    function drawHexRow() {
      for (let i = 0; i <= canvasDimensions.width + 1; i += 1) {
        if ( i % 2 === 0) {
          drawHex();
        }
        canvasX += (imageDimensions.width * 1.25);
        count = 0;
        console.log(canvasX);
      }
    }
    
    const drawPattern = (async () => {
      let addOffset = true;
      let offset = 0;
      const s = imageDimensions.width;
      const h = imageDimensions.height;
      for (let i = 0; i < canvasDimensions.height + 1; i += 1) {
        drawHexRow()
        if (addOffset === true) {
          offset = 0;
        } else {
          offset = -s;
        }
        canvasX = 0 - offset;
        canvasY += h * 2;
        addOffset = !addOffset;
    }
            
    });

    return {
        drawPattern,
    }
}