// import { Ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useConfigStore } from '~~/stores/config';
// import { useSideTriangle } from './sidetriangle';
export function useHex(canvas: HTMLCanvasElement, image: HTMLImageElement) {
    console.log('canvas:', canvas)
    const ctx = canvas.getContext('2d');
    console.log('ctx:', ctx);
    console.log('image: ' + image )
    // const store = useConfigStore()
    // const { bg } = storeToRefs(store)
    // const testBg = '#000dbb'
    const { canvasDimensions, imageDimensions } = useConfigStore()
    // how many segments needed for an image set, in this case 6 for a hex;
    const its = 6;
    // counter for each turn
    let count = 0;
    // running coordinates for drawing the shapes
    let shouldFlip = false;
    // const width = computed(() => canvasDimensions.width)
    // const height = computed(() => canvasDimensions.height)
    // const canvasWidth = computed(() => canvasDimensions.width * imageDimensions.width)
    // const canvasHeight = computed(() => canvasDimensions.height * imageDimensions.height)
    let canvasX = -imageDimensions.width;
    let canvasY = 0;

    const drawTriangle = (async (x: number, y: number, rotation: number) => {
            if (ctx !== null) {
                // ctx.save();
                // const [one, two, three] = useSideTriangle(height.value, width.value)
                // ctx.beginPath();
                // ctx.moveTo(one.x, one.y);
                // ctx.lineTo(two.x, two.y);
                // ctx.lineTo(three.x, three.y);
                // ctx.closePath();
                // ctx.clip()
                ctx.translate(x, y);
                ctx.rotate(rotation);
            
            if (shouldFlip === true) {
                ctx.scale(1, -1);

                // add a clipping path
                

                ctx.drawImage(image, 0, 0);
                ctx.scale(1, -1);
         
            } else {
                ctx.drawImage(image, 0, 0);
         
            } 
                ctx.rotate(-rotation);
                ctx.translate(-x, -y);
                await nextTick()
                // ctx.restore();
            }
            else {
                console.error('cannot find ctx in drawTriangle: hex.ts')
            }
         
    });
    
    const drawTriangleHex = (() => {
        const angle = Math.PI / 3;
        let rotation = angle;
        console.log('count is: ' + count)
        console.log('its is : ' + its)
    
      while (count < its) {
        rotation = angle * count;
        drawTriangle(canvasX, canvasY, rotation)
    
        shouldFlip = !shouldFlip;
        count +=1;
      }
    });
    
    
    function drawTriangleHexRow(num: number, offset: number) {
      console.log('drawing hex row: ' + num, offset)
      for (let i = 0; i <= canvasDimensions.width + 1; i += 1) {
        if ( i % 2 === 0) {
          drawTriangleHex();
        }
        canvasX += (imageDimensions.width);
        count = 0;
        console.log(canvasX);
      }
    }
    
    const drawHexPatternNew = (async () => {
      // update the bg color: TEST MODE
      // const col = testBg;
      // if (ctx !== null) {
      //   ctx.fillStyle = 'red';
      //   ctx.fillRect(0, 0, canvasDimensions.height, canvasDimensions.width)
      // } else {
      //   console.error('ctx was null when applying color')
      // }

      let addOffset = true;
      let offset = 0;
      const s = imageDimensions.width;
      const h = imageDimensions.height;
      for (let i = 0; i < canvasDimensions.height + 1; i += 1) {
        drawTriangleHexRow(i, offset)
        if (addOffset === true) {
          offset = 0;
        } else {
          offset = -s;
        }
        canvasX = 0 - offset;
        canvasY += h * 1.5;
        addOffset = !addOffset;
    }
            
    });

    return {
        drawHexPatternNew,
    }
}