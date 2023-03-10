<template>
    <div class="image-holder">
        <img ref="image" class="image" src="~/assets/images/demo_rect.png"/>
    </div>
      <InnerMenu>
        <Icon name="fluent:draw-image-20-regular" @click="drawRectPattern()"></Icon>
        <Icon name="fluent:save-16-regular" @click="saveCanvas()"></Icon>
        <Icon name="grommet-icons:power-reset" @click="resetCanvas()"></Icon>
        <div class="flex">
          <Icon name="fluent:zoom-in-16-regular" @click="zoomIn"></Icon>
          <Icon name="fluent:zoom-out-16-regular" @click="zoomOut"></Icon>
        </div>
      </InnerMenu>

    <div class="shell">
      <div class="canvas-wrapper">
        <canvas ref="canvas" class="canvas" :width="canvasWidth" :height="canvasHeight"
        :class="zoom">
        </canvas>
      </div>
    </div>
</template>

<script setup lang="ts">
import { ref, Ref } from 'vue';
import { nullCheck } from '~~/models/models';
import { useSave } from '~~/composables/save';
import { useConfigStore } from '~~/stores/config';
import { useRect } from '~~/composables/rect';

const { canvasDimensions, updateImageDimensions, imageDimensions } = useConfigStore()
const canvasWidth = computed(() => canvasDimensions.width * imageDimensions.width)
const canvasHeight = computed(() => canvasDimensions.height * imageDimensions.height)

const canvas: Ref <HTMLCanvasElement | null > = ref(null);
const ctx: Ref <CanvasRenderingContext2D | null > = ref(null);
const image = ref();
const zoomAmount = ref(3);

const zoomIn = (() => {
  if (zoomAmount.value < 10 && zoomAmount.value >= 0) {
    zoomAmount.value += 1;
  }
})

const zoomOut = (() => {
  if (zoomAmount.value <= 10 && zoomAmount.value > 1) {
    zoomAmount.value -= 1;
  }
})

const drawRectPattern = (() => {
  const image = document.getElementsByClassName('image')[0];
  // TBC move all null checks here, could pass in image as well(?)
  if (canvas.value !== null && image instanceof HTMLImageElement) {
    const { drawRectPattern } = useRect(canvas.value, image);
    drawRectPattern();
  } else {
    console.error('error in drawHexNew')
  }
})
 

const zoom = computed(() => {
  let output = 'transform-100'
  switch(zoomAmount.value) {
    case 10:
      output = 'transform-100'
      break;
    case 9: 
      output = 'transform-90'
      break;
    case 8:
      output = 'transform-80'
      break;
    case 7:
      output = 'transform-70'
      break;
    case 6:
      output = 'transform-60'
      break;
    case 5:
      output = 'transform-50'
    break;
    case 4:
      output = 'transform-40'
    break;
    case 3:
      output = 'transform-30'
    break;
    case 2:
      output = 'transform-20'
    break;
    case 1:
      output = 'transform-10'
    break;
  }
  return output;
})

const resetCanvas = (() => {
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
</script>

<style lang="scss">

.image-holder {
    width: 400px;
    background: #ffd9d9;
    height: 400px;
    display: none;
}

.transform-100 {
  transform: scale(1);
}

.transform-90 {
  transform: scale(0.9);
}

.transform-80 {
  transform: scale(0.8);
}

.transform-70 {
  transform: scale(0.7);
}

.transform-60 {
  transform: scale(0.6);
}

.transform-50 {
  transform: scale(0.5);
}

.transform-40 {
  transform: scale(0.4);
}

.transform-30 {
  transform: scale(0.3);
}

.transform-20 {
  transform: scale(0.2);
}

.transform-10 {
  transform: scale(0.1);
}

.icon {
  font-size: 2rem;
}

.canvas {
  // background-color: azure;
  transform-origin: top left;
  // transform: scale(0.5);
  // position: absolute;
  // top: 0;
  // left: 0;
}
</style>

