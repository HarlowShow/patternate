// import { Ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useConfigStore } from '~~/stores/config';
// import { useSideTriangle } from './sidetriangle';
export function useOct(canvas: HTMLCanvasElement, image: HTMLImageElement) {
    console.log('canvas:', canvas)
    const ctx = canvas.getContext('2d');
    console.log('ctx:', ctx);
    console.log('image: ' + image )
    const { canvasDimensions, imageDimensions } = useConfigStore()
    // how many segments needed for an image set, in this case 8 for an oct;
    const its = 8;
    // counter for each turn
    let count = 0;
    // running coordinates for drawing the shapes
    let shouldFlip = false;
    let canvasX = 0;
    let canvasY = 0;

    const drawOctTriangle = (async (x: number, y: number, rotation: number) => {
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
    
    const drawOctHex = (() => {
        // const angle = Math.PI / 4;
        // let rotation = angle;
        // console.log('count is: ' + count)
        // console.log('its is : ' + its)
        let angle = 45;
        let testIts = 6;
      while (count < testIts) {
        let rotation = angle * count;
        console.log('rotation is : ' + rotation)
        console.log('count is : ' + count)
        drawOctTriangle(canvasX, canvasY, rotation)
        count +=1;
      }
    });
    
    
    function drawOctHexRow(num: number, offset: number) {
      console.log('drawing hex row: ' + num, offset)
      for (let i = 0; i <= canvasDimensions.width + 1; i += 1) {
        if ( i % 2 === 0) {
          drawOctHex();
        }
        canvasX += (imageDimensions.width* 1.25);
        count = 0;
        console.log(canvasX);
      }
    }
    
    const drawPattern = (async () => {
        // drawOctHex();
      let addOffset = true;
      let offset = 0;
      const s = imageDimensions.width;
      const h = imageDimensions.height;
      for (let i = 0; i < canvasDimensions.height + 1; i += 1) {
        drawOctHexRow(i, offset)
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