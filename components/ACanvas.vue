<template>
    <div class="image-holder">
        <img ref="image" class="image" src="~/assets/christmas_small.png"/>
    </div>
    <button @click="drawImage()">Draw!</button>
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
const width = computed(() => canvasDimensions.width)
const height = computed(() => canvasDimensions.height)
const canvasWidth = computed(() => canvasDimensions.width * imageDimensions.width)
const canvasHeight = computed(() => canvasDimensions.height * imageDimensions.height)

// TODO: clean this up so it doesn't throw error later on
function nullCheck<T>(element: T | null | undefined): maybeNull<T> {
    if (element !== null && element !== undefined) {
        return { kind: 'success', value: element }
    }
    return { kind: 'failure', reason: 'element is null' }
}

const canvas = ref<HTMLCanvasElement>()
const ctx: Ref <CanvasRenderingContext2D | null > = ref(null);

const drawImage = (async () => {
    console.log('on Mounted')
    const canvasCheck = nullCheck<HTMLCanvasElement>(canvas.value);
    if (canvasCheck.kind === 'success') {
    ctx.value = canvas.value.getContext('2d') as CanvasRenderingContext2D;
    console.log(ctx.value);
    const image = document.getElementsByClassName('image')[0] as CanvasImageSource;
    await nextTick()
    updateImageDimensions(image.width, image.height)
    ctx.value.drawImage(image as CanvasImageSource, 0, 0);
    } else {
        console.error(canvasCheck.reason);
    }
})

const drawImageSet = (() => {

});

onMounted(() => {
drawImage();
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

