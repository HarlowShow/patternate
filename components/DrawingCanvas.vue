<template>
    <div class="image-holder">
        <img ref="image" class="image" src="~/assets/patternate_demo.png"/>
    </div>
    <button @click="startDrawing()">Draw!</button>
    <button @click="resetCanvas()">Clear canvas!</button>
    <div>
        {{  width  }} {{  height }}
    </div>
    <canvas ref="canvas" class="canvas" :width="canvasWidth" :height="canvasHeight">
    </canvas>
</template>

<script setup lang="ts">
import { ref, Ref } from 'vue';
import { maybeNull } from '~~/models/models';
import { useConfigStore } from '~~/stores/config';

const { canvasDimensions, updateImageDimensions, imageDimensions } = useConfigStore()
// how many segments needed for an image set, in this case 6 for a hex;
const its = 6;
// counter for each turn
let count = 0;
// running coordinates for drawing the shapes
let shouldFlip = false;
const width = computed(() => canvasDimensions.width)
const height = computed(() => canvasDimensions.height)
const canvasWidth = computed(() => canvasDimensions.width * imageDimensions.width)
const canvasHeight = computed(() => canvasDimensions.height * imageDimensions.height)
let canvasX = -imageDimensions.width;
let canvasY = 0;

// TODO: clean this up so it doesn't throw error later on
function nullCheck<T>(element: Ref<T | null>): maybeNull<T> {
    if (element.value !== null && element !== undefined) {
        return { kind: 'success', value: element.value }
    }
    return { kind: 'failure', reason: 'element is null' }
}

const canvas: Ref <HTMLCanvasElement | null > = ref(null);
const ctx: Ref <CanvasRenderingContext2D | null > = ref(null);
const image = ref();

const resetCanvas = (() => {
    ctx.value.clearRect(0, 0, canvas.value.width, canvas.value.height)
    count = 0;
    canvasX = -imageDimensions.width;
    canvasY = 0;

})

const drawImage = (async (x: number, y: number, rotation: number) => {
    const ctxCheck = nullCheck<CanvasRenderingContext2D>(ctx);
    if (ctxCheck.kind === 'success' && ctx.value !== null) {
        ctx.value.translate(x, y);
        // ctx.value.translate(imageDimensions.width/2, 0);
        ctx.value.rotate(rotation);
    
    if (shouldFlip === true) {
        ctx.value.scale(1, -1);
        ctx.value.drawImage(image.value, 0, 0);
        ctx.value.scale(1, -1);
    } else {
        ctx.value.drawImage(image.value, 0, 0);
    } 
        ctx.value.rotate(-rotation);
        // ctx.value.translate(-imageDimensions.width/2, -0);
        ctx.value.translate(-x, -y);
        await nextTick()

       /*  translate(x, y);
        rotate(rads)
        if (shouldFlip === true) {
            scale(-1, 1);
            image(triangle, 0, 0)
            scale(-1, 1);
        } else {
            image(triangle, 0, 0)
        }
        // reset transformations (reverse order in which they were added)
        rotate(-rads)
        translate(-x, -y);
    */
    } else {
        console.error('CTX: is not null check passed but something else went wrong')
    }
});

// NOT IN USE, use DRAWIMAGESETTEST atm
const drawImageSet = (() => {
    const angle = Math.PI / 3;
    let rotation = angle;

  while (count < its) {
    rotation = angle * count;
    drawImage(canvasX, canvasY, rotation)

    shouldFlip = !shouldFlip;
    count +=1;
  }

    // aka drawHex
});

const drawImageSetTest = (() => {
    const angle = Math.PI / 3;
    let rotation = angle;
    console.log('count is: ' + count)
    console.log('its is : ' + its)

  while (count < its) {
    rotation = angle * count;
    drawImage(canvasX, canvasY, rotation)

    shouldFlip = !shouldFlip;
    count +=1;
  }

    // aka drawHex
});


function drawImageSetRow(num: number, offset: number) {
  console.log('drawing hex row: ' + num, offset)
  for (let i = 0; i <= canvasDimensions.width + 1; i += 1) {
    if ( i % 2 === 0) {
      drawImageSetTest();
    }
    canvasX += (imageDimensions.width);
    // canvasY += triangle.height;
    count = 0;
    console.log(canvasX);
  }
}

const startDrawing = (async () => {
        // TEST
        let addOffset = true;
  let offset = 0;
  const s = imageDimensions.width;
  const h = imageDimensions.height;
  for (let i = 0; i < canvasDimensions.height + 1; i += 1) {
    drawImageSetRow(i, offset)
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

onMounted(async() => {
    image.value = document.getElementsByClassName('image')[0];
    console.log('on mounted' + image.value);
    const canvasCheck = nullCheck<HTMLCanvasElement>(canvas);
            if (canvasCheck.kind === 'success') {
                // TODO: look into this mysterious error message
                ctx.value = canvasCheck.value.getContext('2d') as CanvasRenderingContext2D;
            } else {
                console.error('CANVAS: is not null check passed but something else went wrong')
            }
        console.log('start Drawing')
        await nextTick()
        if (image.value instanceof HTMLImageElement) {
            updateImageDimensions(image.value.width, image.value.height)    
            drawImageSet()
        } else {
                console.error('IMAGE: error loading image')
            }
})


    
/* 
let triangle;


// s - the length of a single side
let s;
let h;
// the length of the canvas, determined by the number of hexes along
let canvasLength;
let canvasHeight;
// number of hexagons to tile horizontally. Must be an even no.
let hexLength = 6;
let hexHeight = 6;

// running coordinates for drawing the shapes
let canvasX = 0;
let canvasY = 0;

shouldFlip = false;

// how many segments needed, in this case 6;
const its = 6;
// how many hexes to draw;
const turns = hexHeight + 1;
// counts the number of segments used
let count = 0;

function preload() {
  triangle = loadImage('../images/triangle_small.png');

}

function setup() {
  s = triangle.width;
  h = triangle.height;
  canvasLength = hexLength * (s * 1.5);
  canvasHeight = hexHeight * h;
  canvasX = s;
  canvasY = 0;
  createCanvas(canvasLength, canvasHeight);
  // imageMode(CENTER);
  // angleMode(DEGREES);
  noLoop();
}

function drawTriangle(num, x, y, rads) {
  // move to starting coordinates
  translate(x, y);
  rotate(rads)
  if (shouldFlip === true) {
    scale(-1, 1);
    image(triangle, 0, 0)
    scale(-1, 1);
  } else {
    image(triangle, 0, 0)
  }
  // reset transformations (reverse order in which they were added)
  rotate(-rads)
  translate(-x, -y);
  }


function drawHex() {
  const angle = PI / 3;
  let rotation = angle;

  while (count < its) {
    rotation = angle * count;
    drawTriangle(count, canvasX, canvasY, rotation)
    shouldFlip = !shouldFlip;
    count +=1;
    // console.log(`just drew triangle at: ${count -1} with rotation: ${rotation}`);
  }
  // TODO: on button press:
  // saveCanvas('myCanvas', 'png');
}

function drawHexRow(i, offset) {
  console.log('drawing hex row: ' + i, offset)
  for (let i = 0; i <= hexLength; i += 1) {
    if ( i % 2 === 0) {
      drawHex();
    }
    canvasX += (s * 1.5);
    // canvasY += triangle.height;
    count = 0;
    console.log(canvasX);
  }
}

function drawHexes() {
  let addOffset = true;
  let offset = 0;
  for (let i = 0; i < hexHeight + 1; i += 1) {
    drawHexRow(i, offset)
    if (addOffset == true) {
      offset = s/2;
    } else {
      offset = -s;
    }
    canvasX = 0 - offset;
    canvasY += h;
    addOffset = !addOffset;
  }
}

function mousePressed() {
  // // TODO: on button press:
  // saveCanvas('myCanvas', 'png');
}

function draw() {
  background(230);
  drawHexes();
}
*/
</script>

<style lang="scss">
.canvas {
    border: 2px solid blue;
}

.image-holder {
    width: 400px;
    background: #ffd9d9;
    height: 400px;
    display: none;
}
</style>

