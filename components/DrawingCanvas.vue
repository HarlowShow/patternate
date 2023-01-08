<template>
    <div class="image-holder">
        <img ref="image" class="image" src="~/assets/images/demo_5.png"/>
        <img class="image-rect" src="~/assets/demo_output.png"/>
    </div>
      <InnerMenu>
        <InnerMenuButton @click="resetCanvas()">Clear Canvas</InnerMenuButton>
        <InnerMenuButton @click="saveCanvas()">Save Canvas</InnerMenuButton>
        <InnerMenuButton v-if="submode === 'hex'" @click="drawHexPattern()">Draw Hex</InnerMenuButton>
        <InnerMenuButton v-else-if="submode === 'rectangle'" @click="drawRectPattern()">Draw Rect</InnerMenuButton>
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
const { submode } = storeToRefs(store);
const { canvasDimensions, updateImageDimensions, imageDimensions } = useConfigStore()
const canvasWidth = computed(() => canvasDimensions.width * imageDimensions.width)
const canvasHeight = computed(() => canvasDimensions.height * imageDimensions.height)


const canvas: Ref <HTMLCanvasElement | null > = ref(null);
const ctx: Ref <CanvasRenderingContext2D | null > = ref(null);
const image = ref();

const drawHexPattern = (() => {
  const image = document.getElementsByClassName('image')[0];
  // TBC move all null checks here, could pass in image as well(?)
  if (canvas.value !== null && image instanceof HTMLImageElement) {
    const { drawHexPatternNew } = useHex(canvas.value, image);
    drawHexPatternNew();
  } else {
    console.error('error in drawHexNew')
  }
})

const drawRectPattern = (() => {
  console.log('drawRectPattern')
  const image = document.getElementsByClassName('image-rect')[0] as HTMLImageElement;
  updateImageDimensions(image.width, image.height)   
  const w = canvasDimensions.width;
  const h = canvasDimensions.height;

  if (canvas.value !== null && image instanceof HTMLImageElement) {
    ctx.value?.drawImage(image, 0, 0)
  } else {
    console.error('error in drawRectPattern')
  }
})
const resetCanvas = (() => {
    updateImageDimensions(image.value.width, image.value.height);
    if (ctx.value !== null && canvas.value !== null) { 
    ctx.value.clearRect(0, 0, canvas.value.width, canvas.value.height);
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

.canvas {
  // background-color: azure;
}
</style>

