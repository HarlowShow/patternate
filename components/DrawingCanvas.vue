<template>
    <div class="image-holder">
        <img ref="image" class="image" src="~/assets/clipping_demo_three.png"/>
    </div>
      <InnerMenu>
        <InnerMenuButton @click="drawHexPattern()">Draw</InnerMenuButton>
        <InnerMenuButton @click="resetCanvas()">Clear Canvas</InnerMenuButton>
        <InnerMenuButton @click="saveCanvas()">Save Canvas</InnerMenuButton>
        <InnerMenuButton @click="drawHexNew()">Draw Hex New</InnerMenuButton>
      </InnerMenu>

    <div class="shell">
      <canvas ref="canvas" class="canvas" :width="canvasWidth" :height="canvasHeight">
      </canvas>
    </div>
</template>

<script setup lang="ts">
import { ref, Ref } from 'vue';
import { storeToRefs } from 'pinia';
import { nullCheck } from '~~/models/models';
// import { useTriangle } from '~~/composables/triangle';
import { useSave } from '~~/composables/save';
import { useConfigStore } from '~~/stores/config';
import { useHex } from '~~/composables/hex';

const store = useConfigStore();
const mode = storeToRefs(store);
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

const canvas: Ref <HTMLCanvasElement | null > = ref(null);
const ctx: Ref <CanvasRenderingContext2D | null > = ref(null);
const image = ref();

const drawHexNew = (() => {
  const image = document.getElementsByClassName('image')[0];
  // TBC move all null checks here, could pass in image as well(?)
  if (canvas.value !== null && image instanceof HTMLImageElement) {
    const { drawHexPatternNew } = useHex(canvas.value, image);
    drawHexPatternNew();
  } else {
    console.error('error in drawHexNew')
  }
})

const resetCanvas = (() => {
    updateImageDimensions(image.value.width, image.value.height);
    if (ctx.value !== null && canvas.value !== null) { 
    ctx.value.clearRect(0, 0, canvas.value.width, canvas.value.height);
    count = 0;
    canvasX = -imageDimensions.width;
    canvasY = 0;
    } else {
      console.warn('problem in reset canvas finding ctx and/or canvas value')
    }
})

const saveCanvas = (() => {
  if (canvas.value !== null) {
    const dataURL = canvas.value.toDataURL();
          useSave('newdrawing', dataURL) 
  }
})

const drawTriangle = (async (x: number, y: number, rotation: number) => {
    const ctxCheck = nullCheck<CanvasRenderingContext2D>(ctx);
    if (ctxCheck.kind === 'success' && ctx.value !== null) {
        ctx.value.translate(x, y);
        ctx.value.rotate(rotation);
    
    if (shouldFlip === true) {
        ctx.value.scale(1, -1);
        ctx.value.drawImage(image.value, 0, 0);
        ctx.value.scale(1, -1);
    } else {
        ctx.value.drawImage(image.value, 0, 0);
    } 
        ctx.value.rotate(-rotation);
        ctx.value.translate(-x, -y);
        await nextTick()
    } else {
        console.error('CTX: is not null check passed but something else went wrong')
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

const drawHexPattern = (async () => {
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
        } else {
                console.error('IMAGE: error loading image')
            }
        resetCanvas();
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

.image-holder {
    width: 400px;
    background: #ffd9d9;
    height: 400px;
    display: none;
}
</style>

